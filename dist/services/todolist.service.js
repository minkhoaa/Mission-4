"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoListsService = void 0;
const todolist_1 = require("../schemas/todolist");
const todoitem_1 = require("../schemas/todoitem");
exports.todoListsService = {
    async createList(data) {
        if (!data.userId) {
            throw new Error("userId is required to create a todo list");
        }
        return todolist_1.ToDoList.create({
            name: data.name,
            user: data.userId,
            status: data.status ?? "UNFINISHED",
        });
    },
    async getLists() {
        return todolist_1.ToDoList.find().populate("user").populate("items");
    },
    async getById(id) {
        return todolist_1.ToDoList.findById(id).populate("items").populate("user");
    },
    async updateToDoList(id, data) {
        const updateData = {};
        if (data.name)
            updateData.name = data.name;
        if (data.userId)
            updateData.user = data.userId;
        if (data.status)
            updateData.status = data.status;
        return todolist_1.ToDoList.findByIdAndUpdate(id, updateData, { new: true });
    },
    async deleteToDoList(id) {
        const deleted = await todolist_1.ToDoList.findByIdAndDelete(id);
        if (deleted) {
            await todoitem_1.ToDoItem.deleteMany({ todoList: id });
        }
        return deleted;
    },
};
