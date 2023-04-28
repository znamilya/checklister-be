"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checklistsRouter = void 0;
const express_1 = __importDefault(require("express"));
const checklist_model_1 = require("./checklist.model");
const checklists_controllers_1 = require("./checklists.controllers");
const checklistsRouter = express_1.default.Router();
exports.checklistsRouter = checklistsRouter;
const isChecklistExists = (req, res, next) => {
    const { checklistId } = req.params;
    const validation = checklist_model_1.checklistIdSchema.safeParse(checklistId);
    if (!validation.success) {
        console.log(validation.error.errors);
        res.status(400).send("Invalid checklist ID");
        return;
    }
    next();
};
checklistsRouter.get("/", checklists_controllers_1.getChecklists);
checklistsRouter.get("/:checklistId", [isChecklistExists], checklists_controllers_1.getChecklistById);
checklistsRouter.post("/", checklists_controllers_1.createChecklist);
checklistsRouter.put("/:checklistId", [isChecklistExists], checklists_controllers_1.updateChecklist);
checklistsRouter.delete("/:checklistId", [isChecklistExists], checklists_controllers_1.deleteChecklist);
