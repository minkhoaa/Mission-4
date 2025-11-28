"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDocs = exports.swaggerOptions = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const loadYAMLs_1 = require("../utils/loadYAMLs");
const components = (0, loadYAMLs_1.loadAllYAMLFromDir)("src/docs");
const server_url = process.env.SERVER_URL ?? "http://localhost:3000";
exports.swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "ExpressJS Template",
            version: "1.0.0",
            description: "API documentation",
        },
        externalDocs: {
            description: "api-document.json",
            url: "/api/docs/api-document.json",
        },
        servers: [
            {
                url: `${server_url}/api`,
            },
        ],
        ...components,
    },
    apis: [
        "./src/routes/user.router.ts",
        "./src/routes/todolist.router.ts",
        "./src/routes/todoitem.router.ts",
        "./src/routes/test.router.ts",
        "./src/routes/auth.router.ts",
    ],
};
exports.swaggerDocs = (0, swagger_jsdoc_1.default)(exports.swaggerOptions);
