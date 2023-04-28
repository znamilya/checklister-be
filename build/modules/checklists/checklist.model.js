"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checklistUpdateDTOSchema = exports.checklistCreateDTOSchema = exports.checklistIdSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.checklistIdSchema = zod_1.default.string().uuid();
exports.checklistCreateDTOSchema = zod_1.default.object({
    title: zod_1.default.string().min(3).max(30),
    itemsTitles: zod_1.default.array(zod_1.default.string().min(3).max(30)).nonempty(),
});
exports.checklistUpdateDTOSchema = zod_1.default.object({
    title: zod_1.default.string().min(3).max(30),
    itemsTitles: zod_1.default.array(zod_1.default.string().min(3).max(30)).nonempty(),
});
