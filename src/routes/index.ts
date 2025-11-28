import { Router } from "express";
import swaggerRouter from "./swagger.router";
import testRouter from "./test.router";
import userRouter from "./user.router";
import todolistRouter from "./todolist.router";
import todoItemRouter from "./todoitem.router";
import authrouter from "./auth.router";
import fileRouter from "./file.router";

const indexRouter = Router();

indexRouter.use("/docs", swaggerRouter);
indexRouter.use("/tests", testRouter);
indexRouter.use("/users", userRouter);
indexRouter.use("/todolist", todolistRouter);
indexRouter.use("/todoitem", todoItemRouter);
indexRouter.use("/auth", authrouter);
indexRouter.use("/file", fileRouter);
export default indexRouter;
