import { NextFunction, Request, Response } from "express";
import { userService } from "../services/user.service";

export const UserController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getUsers();
      return res.json(users);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.getUserById(req.params.id);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      return res.json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.updateUserById(req.params.id, req.body);
      if (!user) return res.status(404).json("User not found");
      res.json(user);
    } catch (err: any) {
      console.error(err);
      next(err);
    }
  },
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await userService.hardDeleteUser(req.params.id);

      if (!deleted) return res.status(404).json("User not found");

      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
