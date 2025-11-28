import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "../config/swagger";

const swaggerRouter = Router();

// Serve Swagger UI
swaggerRouter.use("/", swaggerUi.serve);
swaggerRouter.get("/", swaggerUi.setup(swaggerDocs));

// Expose raw OpenAPI JSON for debugging/export
swaggerRouter.get("/api-document.json", (_req, res) => {
  res.json(swaggerDocs);
});

export default swaggerRouter;
