import express from "express";
import { checklistsRouter } from "./modules/checklists/checklists.routes";

const v1Router = express.Router();

v1Router.use("/checklists", checklistsRouter);

export { v1Router };
