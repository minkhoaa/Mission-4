import swaggerJsDoc from "swagger-jsdoc";
import type { Options } from "swagger-jsdoc";
import { loadAllYAMLFromDir } from "../utils/loadYAMLs";

const components = loadAllYAMLFromDir("src/docs");
const server_url = process.env.SERVER_URL ?? "http://localhost:3000";
const yamlComponents = (components as any)?.components ?? {};
const restYaml = { ...components };
delete (restYaml as any).components;

export const swaggerOptions: Options = {
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
    ...restYaml,
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      ...yamlComponents,
    },
  },
  apis: [
    "./src/routes/user.router.ts",
    "./src/routes/todolist.router.ts",
    "./src/routes/todoitem.router.ts",
    "./src/routes/test.router.ts",
    "./src/routes/auth.router.ts",
    "./src/routes/file.router.ts",
  ],
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
