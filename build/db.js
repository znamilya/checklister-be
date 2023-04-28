"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pgClient = void 0;
const pg_1 = __importDefault(require("pg"));
const pgClient = new pg_1.default.Client({
    user: "user1",
    password: "password",
    host: "localhost",
    database: "checklists_app",
    port: 5432,
});
exports.pgClient = pgClient;
