"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checklistDTOSchema = exports.checklistIdSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const checklistIdSchema = zod_1.default.number();
exports.checklistIdSchema = checklistIdSchema;
const checklistDTOSchema = zod_1.default.object({
    title: zod_1.default.string().min(3).max(100),
});
exports.checklistDTOSchema = checklistDTOSchema;
