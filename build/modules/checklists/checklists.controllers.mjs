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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChecklist = exports.createChecklist = exports.getChecklistById = exports.getChecklists = void 0;
const express_1 = __importDefault(require("express"));
const db_mjs_1 = require("../../db.mjs");
const checklist_model_mjs_1 = require("./checklist.model.mjs");
const checklistsController = express_1.default.Router();
const getChecklists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    user.name;
    try {
        const query = yield db_mjs_1.pgClient.query(`
    SELECT * FROM checklists;
  `);
        res.json(query.rows);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getChecklists = getChecklists;
const getChecklistById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const checklistId = parseInt(req.params.checklistId, 10);
    try {
        const query = yield db_mjs_1.pgClient.query(`
    SELECT * FROM checklists
    WHERE id = $1
    ;
  `, [checklistId]);
        if (query.rows.length > 0) {
            return res.json(query.rows[0]);
        }
        res.sendStatus(404);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getChecklistById = getChecklistById;
const createChecklist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const bodyValidation = checklist_model_mjs_1.checklistDTOSchema.safeParse(body);
    if (!bodyValidation.success) {
        res.status(400).send(query.error.issues[0].message);
        return;
    }
    try {
        const query = yield db_mjs_1.pgClient.query(`
      INSERT INTO checklists (title)
      VALUES ($1)
      RETURNING *;
      `, [body.title]);
        res.json(query.rows[0]);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.createChecklist = createChecklist;
const deleteChecklist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const checklistId = parseInt(req.params.checklistId, 10);
    try {
        const query = yield db_mjs_1.pgClient.query(`
      DELETE FROM checklists
      WHERE id = $1
      RETURNING *;
    `, [checklistId]);
        if (query.rowCount > 0) {
            res.json(query.rows[0]);
            return;
        }
        res.sendStatus(404);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.deleteChecklist = deleteChecklist;
