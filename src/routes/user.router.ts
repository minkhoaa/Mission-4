import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const userRouter = Router();

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Tạo user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, gender, dob]
 *             properties:
 *               name:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [M, F]
 *               dob:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Tạo thành công
 *   get:
 *     summary: Lấy danh sách user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Thành công
 * /users/{id}:
 *   get:
 *     summary: Lấy chi tiết user
 *     tags: [User]
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
 *     summary: Cập nhật user
 *     tags: [User]
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
 *               gender:
 *                 type: string
 *                 enum: [M, F]
 *               dob:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Thành công
 *   delete:
 *     summary: Xóa user
 *     tags: [User]
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
userRouter.post("/", UserController.create);
userRouter.get("/", UserController.findAll);
userRouter.get("/:id", UserController.findById);
userRouter.patch("/:id", UserController.updateUser);
userRouter.delete("/:id", UserController.deleteUser);

export default userRouter;
