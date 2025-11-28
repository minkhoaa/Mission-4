import "./core/envLoader";
import express from "express";
import {
  errorHandlerMiddleware,
  loggerMiddleware,
  validateRequest,
} from "./middlewares";
import { connectMongoDB } from "./config/mongodb";
import indexRouter from "./routes";

import cors from "cors";

const PORT = process.env.PORT;
console.log("PORT ==> ", PORT);
const app = express();

(async () => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(loggerMiddleware);

  app.use("/api", indexRouter);

  app.use(errorHandlerMiddleware);

  // Start HTTP server first so Swagger/UI remains accessible even if DB is down.
  app.listen(PORT, () => {
    console.log(`🚀 Server running at ${process.env.SERVER_URL}`);
    console.log(
      `🚀 APIs document running at ${process.env.SERVER_URL}/api/docs`
    );
  });

  // Connect to MongoDB in the background; log errors but don't crash the server.
  connectMongoDB().catch((err) => {
    console.error("Mongo connection error ==> ", err);
  });
})();
