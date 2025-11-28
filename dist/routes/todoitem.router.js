"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todoitem_controller_1 = require("../controllers/todoitem.controller");
const todoItemRouter = (0, express_1.Router)();
/**
 * @openapi
 * /todoitem:
 *   post:
 *     summary: Tạo todoitem
 *     tags: [todoitem]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [todoGroupId, name, des, dueAt]
 *             properties:
 *               todoGroupId:
 *                 type: string
 *               name:
 *                 type: string
 *               des:
 *                 type: string
 *               dueAt:
 *                 type: string
 *                 format: date-time

 *     responses:
 *       201:
 *         description: Tạo thành công
 *   get:
 *     summary: Lấy toàn bộ danh sách todoitem
 *     tags: [todoitem]
 *     responses:
 *       200:
 *         description: Thành công
 * /todoitem/{todoGroupId}:
 *   get:
 *     summary: Lấy danh sách todoitem bằng theo todolist
 *     tags: [todoitem]
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
 *               todoGroupId:
 *                 type: string
 *               name:
 *                 type: string
 *               des:
 *                 type: string
 *               dueAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Thành công
 *   delete:
 *     summary: Xóa todoitem
 *     tags: [todoitem]
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
todoItemRouter.post("/", todoitem_controller_1.TodoItemController.Create);
todoItemRouter.get("/", todoitem_controller_1.TodoItemController.GetAll);
todoItemRouter.get("/:todoGroupId", todoitem_controller_1.TodoItemController.GetByGroupId);
todoItemRouter.patch("/:id", todoitem_controller_1.TodoItemController.Update);
todoItemRouter.delete("/:id", todoitem_controller_1.TodoItemController.Delete);
exports.default = todoItemRouter;
