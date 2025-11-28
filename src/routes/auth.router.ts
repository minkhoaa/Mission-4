import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validateRequest } from "../middlewares";
import { loginSchema, registerSchema } from "../validations/auth.schema";

const authrouter = Router();

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Đăng nhập
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Đăng nhập thành công
 *       '401':
 *         description: Sai thông tin đăng nhập
 * /auth/register:
 *   post:
 *     summary: Đăng kí
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, gender, dob, username, password]
 *             properties:
 *               name:
 *                 type: string
 *               gender:
 *                 type: string
 *               dob:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Đăng kí thành công
 *       '400':
 *         description: Thiếu hoặc sai dữ liệu đầu vào
 */
export interface RegisterDto {
  name: string;
  gender: "M" | "F";
  dob: Date;
  username: string;
  password: string;
}

authrouter.post("/login", validateRequest(loginSchema), AuthController.login);
authrouter.post(
  "/register",
  validateRequest(registerSchema),
  AuthController.register
);
export default authrouter;
