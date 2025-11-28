import { Router } from "express";
import { upload } from "../middlewares/upload.middleware";
import { FileController } from "../controllers/file.controller";
import { validateRequest } from "../middlewares";

const fileRouter = Router();

/**
 * @openapi
 * /file/upload:
 *   post:
 *     summary: Upload file
 *     tags:
 *       - File
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Upload thành công
 *       400:
 *         description: Không có file hoặc lỗi upload
 *       401:
 *         description: Chưa login
 */
fileRouter.post("/upload", upload.single("file"), FileController.upload);
export default fileRouter;
