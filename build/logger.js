"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpLogger = void 0;
const morgan_1 = __importDefault(require("morgan"));
morgan_1.default.token("body", (req, res) => {
    // @ts-ignore
    return JSON.stringify(req.body);
});
const httpLogger = (env) => env === "development"
    ? (0, morgan_1.default)(":method :url :status \n:body")
    : (0, morgan_1.default)("common", {
        skip: function (req, res) {
            return res.statusCode < 400;
        },
    });
exports.httpLogger = httpLogger;
