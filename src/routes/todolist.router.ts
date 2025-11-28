import { Router } from "express";
import { ToDoListController } from "../controllers/todolist.controller";
import { requireAuth } from "../middlewares/auth.middleware";
import { validateRequest } from "../middlewares";
import {
  createTodoListSchema,
  updateTodoListSchema,
} from "../schemas/todo.schema";

const todolistRouter = Router();

/**
 * @openapi
 * /todolist:
 *   post:
 *     summary: Tạo todolist
 *     tags: [todolist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, status]
 *             properties:
 *               name:
 *                 type: string
 *               status:
 *                 type: string

 *     responses:
 *       201:
 *         description: Tạo thành công
 *   get:
 *     summary: Lấy danh sách todolist
 *     tags: [todolist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thành công
 * /todolist/{id}:
 *   get:
 *     summary: Lấy chi tiết todolist
 *     tags: [todolist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 *       404:
 *         description: Không tìm thấy
 *   patch:
 *     summary: Cập nhật todolist
 *     tags: [todolist]
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
 *               name:
 *                 type: string
 *               userId:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Thành công
 *   delete:
 *     summary: Xóa todolist
 *     tags: [todolist]
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
todolistRouter.post(
  "/",
  requireAuth,
  validateRequest(createTodoListSchema),
  ToDoListController.create
);
todolistRouter.get("/", requireAuth, ToDoListController.findAll);
todolistRouter.get("/:id", requireAuth, ToDoListController.findById);
todolistRouter.patch(
  "/:id",
  requireAuth,
  validateRequest(updateTodoListSchema),
  ToDoListController.update
);
todolistRouter.delete("/:id", requireAuth, ToDoListController.delete);

export default todolistRouter;
