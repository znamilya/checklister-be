import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../../libs/prisma";
import { checklistCreateDTOSchema, checklistUpdateDTOSchema } from "./checklist.model";

export const getChecklists = async (_req: Request, res: Response) => {
  try {
    const query = await prisma.checklist.findMany({
      include: {
        items: true,
      },
    });

    res.json(query);
  } catch (error) {
    // @ts-ignore
    res.status(500).send(error.message);
  }
};

export const getChecklistById = async (req: Request, res: Response) => {
  try {
    const query = await prisma.checklist.findUnique({
      where: {
        id: req.params.checklistId,
      },
      include: {
        items: true,
      },
    });

    if (!query) {
      res.sendStatus(404);
      return;
    }

    return res.json(query);
  } catch (error) {
    // @ts-ignore
    res.status(500).send(error.message);
  }
};

export const createChecklist = async (req: Request, res: Response) => {
  const body = req.body;

  const bodyValidation = checklistCreateDTOSchema.safeParse(body);

  if (!bodyValidation.success) {
    res.status(400).send("Invalid params");
    return;
  }

  const { data } = bodyValidation;

  try {
    const newChecklist = await prisma.checklist.create({
      data: {
        title: data.title,
        items: {
          create: data.itemsTitles.map((itemTitle) => ({
            title: itemTitle,
          })),
        },
      },
    });

    res.status(201).json(newChecklist);
  } catch (error) {
    // @ts-ignore
    res.status(500).send(error.message);
  }
};

export const updateChecklist = async (req: Request, res: Response) => {
  const bodyValidation = checklistUpdateDTOSchema.safeParse(req.body);
  const { checklistId } = req.params;

  if (!bodyValidation.success) {
    console.log(bodyValidation.error.errors);
    res.status(400).send("Invalid params");
    return;
  }

  const { data } = bodyValidation;

  try {
    const updatedChecklist = await prisma.checklist.update({
      where: {
        id: checklistId,
      },
      data: {
        title: data.title,
        items: {
          deleteMany: {
            checklistsId: checklistId,
          },
          createMany: {
            data: data.itemsTitles.map((itemTitle) => ({
              title: itemTitle,
            })),
          },
        },
      },
    });

    res.json(updatedChecklist);
  } catch (error) {
    console.log(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        res.sendStatus(404);
      }

      res.status(500).send(error?.code);
    } else {
      res.status(500).send("Unknown error");
    }
  }
};

export const deleteChecklist = async (req: Request, res: Response) => {
  const { checklistId } = req.params;

  try {
    const checklistToDelete = await prisma.checklist.delete({
      where: {
        id: checklistId,
      },
    });

    res.json(checklistToDelete);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        res.sendStatus(404);
      }

      res.status(500).send(error?.code);
    } else {
      res.status(500).send("Unknown error");
    }
  }
};
