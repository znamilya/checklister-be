"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const logger_1 = require("./logger");
const v1Router_1 = require("./v1Router");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5467;
const env = app.get("env");
app.use((0, cors_1.default)());
app.use((0, logger_1.httpLogger)(env));
app.use(body_parser_1.default.json());
app.use("/api/v1", v1Router_1.v1Router);
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
