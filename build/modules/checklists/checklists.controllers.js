"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChecklist = exports.updateChecklist = exports.createChecklist = exports.getChecklistById = exports.getChecklists = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../libs/prisma");
const checklist_model_1 = require("./checklist.model");
const getChecklists = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = yield prisma_1.prisma.checklist.findMany({
            include: {
                items: true,
            },
        });
        res.json(query);
    }
    catch (error) {
        // @ts-ignore
        res.status(500).send(error.message);
    }
});
exports.getChecklists = getChecklists;
const getChecklistById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = yield prisma_1.prisma.checklist.findUnique({
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
    }
    catch (error) {
        // @ts-ignore
        res.status(500).send(error.message);
    }
});
exports.getChecklistById = getChecklistById;
const createChecklist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const bodyValidation = checklist_model_1.checklistCreateDTOSchema.safeParse(body);
    if (!bodyValidation.success) {
        res.status(400).send("Invalid params");
        return;
    }
    const { data } = bodyValidation;
    try {
        const newChecklist = yield prisma_1.prisma.checklist.create({
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
    }
    catch (error) {
        // @ts-ignore
        res.status(500).send(error.message);
    }
});
exports.createChecklist = createChecklist;
const updateChecklist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyValidation = checklist_model_1.checklistUpdateDTOSchema.safeParse(req.body);
    const { checklistId } = req.params;
    if (!bodyValidation.success) {
        console.log(bodyValidation.error.errors);
        res.status(400).send("Invalid params");
        return;
    }
    const { data } = bodyValidation;
    try {
        const updatedChecklist = yield prisma_1.prisma.checklist.update({
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
    }
    catch (error) {
        console.log(error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                res.sendStatus(404);
            }
            res.status(500).send(error === null || error === void 0 ? void 0 : error.code);
        }
        else {
            res.status(500).send("Unknown error");
        }
    }
});
exports.updateChecklist = updateChecklist;
const deleteChecklist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { checklistId } = req.params;
    try {
        const checklistToDelete = yield prisma_1.prisma.checklist.delete({
            where: {
                id: checklistId,
            },
        });
        res.json(checklistToDelete);
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                res.sendStatus(404);
            }
            res.status(500).send(error === null || error === void 0 ? void 0 : error.code);
        }
        else {
            res.status(500).send("Unknown error");
        }
    }
});
exports.deleteChecklist = deleteChecklist;
