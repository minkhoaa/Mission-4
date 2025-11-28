import { NextFunction, Request, Response } from "express";
import { ToDoItemService } from "../services/todoitem.service";
import { createToDoItemBody, updateToDoItemBody } from "../schemas/todo.schema";

export const TodoItemController = {
  async Create(req: Request, res: Response, next: NextFunction) {
    try {
      const data: createToDoItemBody = req.body;
      const newItem = await ToDoItemService.CreateToDoItem(data);
      res.status(201).json(newItem);
    } catch (err) {
      next(err);
    }
  },
  async GetAll(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await ToDoItemService.GetToDoItemList();
      if (!items) return res.status(404).json({ message: "List empty" });
      return res.status(200).json(items);
    } catch (err) {
      next(err);
    }
  },
  async GetByGroupId(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await ToDoItemService.GetToDoItemByListId(
        req.params.todoGroupId
      );
      if (!items) return res.status(404).json("Not found item");
      return res.status(200).json(items);
    } catch (err) {
      next(err);
    }
  },
  async Update(req: Request, res: Response, next: NextFunction) {
    try {
      var data: updateToDoItemBody = req.body;
      const updatedItem = await ToDoItemService.UpdateTodoItem(
        req.params.id,
        data
      );
      if (!updatedItem) return res.status(404).json("Item not found");
      return res.json(updatedItem);
    } catch (err) {
      next(err);
    }
  },
  async Delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedItem = await ToDoItemService.DeleteTodoItem(req.params.id);
      if (!deletedItem) return res.status(404).json("Item not found");
      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
