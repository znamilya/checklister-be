"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checklistsRouter = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = __importDefault(require("zod"));
const checklists_controllers_mjs_1 = require("./checklists.controllers.mjs");
const checklistsRouter = express_1.default.Router();
exports.checklistsRouter = checklistsRouter;
const isChecklistExists = (req, res, next) => {
    const checklistId = parseInt(req.params.checklistId, 10);
    const validation = checklistIdSchema.safeParse(checklistId);
    if (!validation.success) {
        res.status(400).send("Invalid checklist ID");
        return;
    }
    next();
};
checklistsRouter.get("/", checklists_controllers_mjs_1.getChecklists);
checklistsRouter.get("/:checklistId", [isChecklistExists], checklists_controllers_mjs_1.getChecklistById);
checklistsRouter.post("/", checklists_controllers_mjs_1.createChecklist);
checklistsRouter.delete("/:checklistId", [isChecklistExists], checklists_controllers_mjs_1.deleteChecklist);
