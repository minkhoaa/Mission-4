"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("../config/swagger");
const swaggerRouter = (0, express_1.Router)();
// Serve Swagger UI
swaggerRouter.use("/", swagger_ui_express_1.default.serve);
swaggerRouter.get("/", swagger_ui_express_1.default.setup(swagger_1.swaggerDocs));
// Expose raw OpenAPI JSON for debugging/export
swaggerRouter.get("/api-document.json", (_req, res) => {
    res.json(swagger_1.swaggerDocs);
});
exports.default = swaggerRouter;
