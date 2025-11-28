import { ToDoList, TodoListStatus } from "../schemas/todolist";
import { ToDoItem } from "../schemas/todoitem";
import { AppError } from "../core/errors/AppError";

export interface CreateToDoListDto {
  name: string;
  userId: string;
  status?: "FINISH" | "UNFINISHED";
}

export interface UpdateToDoListDto {
  name?: string;
  userId?: string;
  status?: "FINISH" | "UNFINISHED";
}

export const todoListsService = {
  async createList(data: CreateToDoListDto) {
    if (!data.userId) {
      throw new Error("userId is required to create a todo list");
    }

    return ToDoList.create({
      name: data.name,
      user: data.userId,
      status: (data.status as TodoListStatus) ?? "UNFINISHED",
    });
  },
  async getLists() {
    return ToDoList.find().populate("user").populate("items");
  },
  async getById(id: string) {
    return ToDoList.findById(id).populate("items").populate("user");
  },
  async updateToDoList(id: string, data: UpdateToDoListDto) {
    const updateData: Record<string, unknown> = {};

    if (data.name) updateData.name = data.name;
    if (data.userId) updateData.user = data.userId;
    if (data.status) updateData.status = data.status as TodoListStatus;

    return ToDoList.findByIdAndUpdate(id, updateData, { new: true });
  },
  async deleteToDoList(id: string) {
    const deleted = await ToDoList.findByIdAndDelete(id);

    if (deleted) {
      await ToDoItem.deleteMany({ todoList: id });
    }

    return deleted;
  },
  async hardDeleteToDolist(listId: string) {
    const list = await ToDoList.findById(listId).exec();
    if (!list) throw new AppError("Todolist not found", 404);

    const items = await ToDoItem.find({ todoList: listId })
      .select("_id")
      .exec();
    const itemIds = items.map((i) => i._id);
    if (itemIds.length) await ToDoItem.deleteMany({ _id: { $in: itemIds } });
    await ToDoList.deleteOne({ _id: listId });
    return true;
  },
};
