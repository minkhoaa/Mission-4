import { userInfo } from "os";
import { ToDoItem, TodoItemStatus } from "../models/todoitem";
import { da } from "zod/v4/locales";
import { AppError } from "../core/errors/AppError";
import { ToDoList } from "../models/todolist";
import { neverOrAny } from "mongoose";

export interface CreateToDoItemDto {
  todoList: string;
  name: string;
  des?: string;
  dueAt: Date;
  status?: TodoItemStatus;
}

export interface UpdateToDoItemDto {
  todoGroupId?: string;
  name?: string;
  des?: string;
  dueAt?: Date;
  status?: TodoItemStatus;
}

export const ToDoItemService = {
  async CreateToDoItem(data: CreateToDoItemDto) {
    if (!data.todoList)
      throw new AppError("list Id is required to create new items");
    var existedList = await ToDoList.exists({ _id: data.todoList });
    if (!existedList) throw new AppError("List not found", 404);
    return ToDoItem.create({
      todoList: data.todoList,
      name: data.name,
      des: data.des,
      dueAt: data.dueAt ? new Date(data.dueAt) : undefined,
      status: data.status ?? "TODO",
    });
  },
  async GetToDoItemList() {
    return ToDoItem.find().populate("todoList");
  },
  async GetToDoItemByListId(todoGroupId: string) {
    return ToDoItem.find({ todoList: todoGroupId }).populate("todoList");
  },
  async UpdateTodoItem(id: string, data: UpdateToDoItemDto) {
    const updateData: Record<string, unknown> = {};

    if (data.todoGroupId) updateData.todoList = data.todoGroupId;
    if (data.name) updateData.name = data.name;
    if (data.des !== undefined) updateData.des = data.des;
    if (data.dueAt) updateData.dueAt = new Date(data.dueAt);

    return ToDoItem.findByIdAndUpdate(id, updateData, { new: true });
  },
  async DeleteTodoItem(id: string) {
    var existedItem = await ToDoItem.exists({ _id: id });
    if (!existedItem) throw new AppError("Item not found", 404);
    return ToDoItem.findByIdAndDelete(id);
  },
};
