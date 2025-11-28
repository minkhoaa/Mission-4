import { NextFunction, Request, Response } from "express";
import { todoListsService } from "../services/todolist.service";
import {
  CreateTodoListBody,
  UpdateTodoListBody,
} from "../validations/todo.schema";
import { AuthRequest } from "../middlewares/auth.middleware";
import { AppError } from "../core/errors/AppError";
import { User } from "../schemas/user";

export const ToDoListController = {
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { name, status } = req.body;
      const userId = req.user?.userId;
      if (!userId) throw new AppError("Unauthorized", 401);
      const existedUser = await User.exists({ _id: userId });
      console.log(userId);
      if (!existedUser) throw new AppError("User not found", 404);
      const todo = await todoListsService.createList({
        name: name,
        userId: userId,
        status: status,
      });
      res.status(201).json(todo);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const body: UpdateTodoListBody = req.body;
      const todo = await todoListsService.updateToDoList(req.params.id, body);
      if (!todo) return res.status(404).json({ message: "List not found" });
      res.json(todo);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  async findAll(req: Request, res: Response, next: NextFunction) {
    const list = await todoListsService.getLists();
    res.json(list);
  },
  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const list = await todoListsService.getById(req.params.id);

      if (!list) {
        return res.status(404).json({
          message: "List not found",
        });
      }

      return res.json(list);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await todoListsService.hardDeleteToDolist(req.params.id);
      if (!deleted)
        return res.status(404).json({
          message: "List not found",
        });
      res.status(204).json({
        message: "Xóa oke rồi đó",
      });
    } catch (err) {
      next(err);
    }
  },
};
