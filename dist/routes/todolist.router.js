"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todolist_controller_1 = require("../controllers/todolist.controller");
const todolistRouter = (0, express_1.Router)();
/**
 * @openapi
 * /todolist:
 *   post:
 *     summary: Tạo todolist
 *     tags: [todolist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, userId, status]
 *             properties:
 *               name:
 *                 type: string
 *               userId:
 *                 type: string
 *               status:
 *                 type: string

 *     responses:
 *       201:
 *         description: Tạo thành công
 *   get:
 *     summary: Lấy danh sách todolist
 *     tags: [todolist]
 *     responses:
 *       200:
 *         description: Thành công
 * /todolist/{id}:
 *   get:
 *     summary: Lấy chi tiết todolist
 *     tags: [todolist]
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
todolistRouter.post("/", todolist_controller_1.ToDoListController.create);
todolistRouter.get("/", todolist_controller_1.ToDoListController.findAll);
todolistRouter.get("/:id", todolist_controller_1.ToDoListController.findById);
todolistRouter.patch("/:id", todolist_controller_1.ToDoListController.update);
todolistRouter.delete("/:id", todolist_controller_1.ToDoListController.delete);
exports.default = todolistRouter;
