import morgan from "morgan";
import { Env } from "./types";

morgan.token("body", (req, res) => {
  // @ts-ignore
  return JSON.stringify(req.body);
});

export const httpLogger = (env: Env) =>
  env === "development"
    ? morgan(":method :url :status \n:body")
    : morgan("common", {
        skip: function (req, res) {
          return res.statusCode < 400;
        },
      });
