import { Router } from "express";
import { TodoItemController } from "../controllers/todoitem.controller";
import { requireAuth } from "../middlewares/auth.middleware";
import { validateRequest } from "../middlewares";
import {
  createToDoItemSchema,
  updateTodoItemSchema,
} from "../schemas/todo.schema";

const todoItemRouter = Router();

/**
 * @openapi
 * /todoitem:
 *   post:
 *     summary: Tạo todoitem
 *     tags: [todoitem]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [todoList, name, dueAt]
 *             properties:
 *               todoList:
 *                 type: string
 *               name:
 *                 type: string
 *               des:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [TODO, IN_PROCESS, FINISH]
 *               dueAt:
 *                 type: string
 *                 format: date-time

 *     responses:
 *       201:
 *         description: Tạo thành công
 *   get:
 *     summary: Lấy toàn bộ danh sách todoitem
 *     tags: [todoitem]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thành công
 * /todoitem/{todoGroupId}:
 *   get:
 *     summary: Lấy danh sách todoitem bằng theo todolist
 *     tags: [todoitem]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: todoGroupId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 *       404:
 *         description: Không tìm thấy
 * /todoitem/{id}:
 *   patch:
 *     summary: Cập nhật todoitem
 *     tags: [todoitem]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               todoList:
 *                 type: string
 *               name:
 *                 type: string
 *               des:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [TODO, IN_PROCESS, FINISH]
 *               dueAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Thành công
 *   delete:
 *     summary: Xóa todoitem
 *     tags: [todoitem]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Xóa thành công
 */
todoItemRouter.post(
  "/",
  requireAuth,
  validateRequest(createToDoItemSchema),
  TodoItemController.Create
);
todoItemRouter.get("/", requireAuth, TodoItemController.GetAll);
todoItemRouter.get(
  "/:todoGroupId",
  requireAuth,
  TodoItemController.GetByGroupId
);
todoItemRouter.patch(
  "/:id",
  requireAuth,
  validateRequest(updateTodoItemSchema),
  TodoItemController.Update
);
todoItemRouter.delete("/:id", requireAuth, TodoItemController.Delete);

export default todoItemRouter;
