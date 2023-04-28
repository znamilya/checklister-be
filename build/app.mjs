"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_mjs_1 = require("./db.mjs");
const v1Router_mjs_1 = require("./v1Router.mjs");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5467;
db_mjs_1.pgClient.connect();
db_mjs_1.pgClient.query(`
  CREATE TABLE IF NOT EXISTS checklists (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL
  );
`);
// CREATE TABLE IF NOT EXISTS checklists (
//   id uuid DEFAULT uuid_generate_v4(),
//   title VARCHAR(255) NOT NULL,
//   PRIMARY KEY (id)
// );
app.use(body_parser_1.default.json());
app.use("/api/v1", v1Router_mjs_1.v1Router);
const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
function exitHandler(options = {}) {
    server.close(() => {
        console.log("Server successfully closed");
        if (options.exit)
            process.exit();
    });
}
// // do something when app is closing
process.on("exit", exitHandler);
// // catches ctrl+c event
process.on("SIGINT", exitHandler.bind(null, { exit: true }));
// // catches "kill pid" (for example: nodemon restart)
process.on("SIGUSR1", exitHandler.bind(null, { exit: true }));
process.on("SIGUSR2", exitHandler.bind(null, { exit: true }));
// process.on("uncaughtException", exitHandler.bind(null, { exit: true }));
process.on("uncaughtException", () => {
    server.close(() => {
        console.log("Server successfully closed");
        process.exit();
    });
});
