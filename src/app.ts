import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { httpLogger } from "./logger";
import { Env } from "./types";
import { v1Router } from "./v1Router";

const app = express();
const PORT = process.env.PORT || 5467;
const env: Env = app.get("env");

app.use(cors());
app.use(httpLogger(env));
app.use(bodyParser.json());

app.use("/api/v1", v1Router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
