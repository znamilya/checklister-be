import express, { NextFunction, Request, Response } from "express";
import { checklistIdSchema } from "./checklist.model";

import {
  getChecklists,
  getChecklistById,
  createChecklist,
  deleteChecklist,
  updateChecklist,
} from "./checklists.controllers";

const checklistsRouter = express.Router();

const isChecklistExists = (req: Request, res: Response, next: NextFunction) => {
  const { checklistId } = req.params;

  const validation = checklistIdSchema.safeParse(checklistId);

  if (!validation.success) {
    console.log(validation.error.errors);
    res.status(400).send("Invalid checklist ID");
    return;
  }

  next();
};

checklistsRouter.get("/", getChecklists);
checklistsRouter.get("/:checklistId", [isChecklistExists], getChecklistById);
checklistsRouter.post("/", createChecklist);
checklistsRouter.put("/:checklistId", [isChecklistExists], updateChecklist);
checklistsRouter.delete("/:checklistId", [isChecklistExists], deleteChecklist);

export { checklistsRouter };
