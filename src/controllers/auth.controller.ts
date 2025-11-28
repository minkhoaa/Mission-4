import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { rsort } from "semver";

export const AuthController = {
  async register(req: Request, res: Response) {
    try {
      const { name, gender, dob, username, password } = req.body;
      const result = await AuthService.Resgister({
        name,
        gender,
        dob: new Date(dob),
        username,
        password,
      });
      return res.status(201).json({
        message: "Register successfully",
        data: result,
      });
    } catch (err) {
      return res.status(400).json({
        message: "Fail while registering",
        error: (err as any)?.message,
      });
    }
  },
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const result = await AuthService.Login({ username, password });
      return res
        .status(200)
        .json({ message: "Login successfully", data: result });
    } catch (err) {
      return res.status(400).json({ message: "Cannot login", error: err });
    }
  },
};
