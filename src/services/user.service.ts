import { AppError } from "../core/errors/AppError";
import { ToDoItem } from "../models/todoitem";
import { ToDoList } from "../models/todolist";
import { Gender, User } from "../models/user";

export interface CreateUserDto {
  name: string;
  gender: "M" | "F";
  dob: string;
}

export interface UpdateUserDto {
  name?: string;
  gender?: "M" | "F";
  dob?: string;
}

export const userService = {
  async createUser(dto: CreateUserDto) {
    return User.create({
      name: dto.name,
      gender: dto.gender,
      dob: dto.dob,
    });
  },
  async getUsers() {
    return User.find().populate("todoLists");
  },

  async getUserById(id: string) {
    return User.findById(id).populate("todoLists");
  },

  async updateUserById(id: string, data: UpdateUserDto) {
    const updateData: Record<string, unknown> = {};

    if (data.name) updateData.name = data.name;
    if (data.gender) updateData.gender = data.gender as Gender;
    if (data.dob) updateData.dob = new Date(data.dob);

    return User.findByIdAndUpdate(id, updateData, { new: true });
  },
  async deleteUserById(id: string) {
    return User.findByIdAndDelete(id);
  },
  async hardDeleteUser(userId: string) {
    const user = await User.findById(userId).exec();
    if (!user) throw new AppError("User not found", 404);

    const lists = await ToDoList.find({ user: userId }).select("_id").exec();
    const listIds = lists.map((l) => l._id);

    const items = await ToDoItem.find({ todoList: { $in: listIds } })
      .select("_id")
      .exec();
    const itemIds = items.map((i) => i._id);

    if (itemIds.length) await ToDoItem.deleteMany({ _id: { $in: itemIds } });
    if (listIds.length) await ToDoList.deleteMany({ _id: { $in: listIds } });

    await User.deleteOne({ _id: userId });
    return true;
  },
};
