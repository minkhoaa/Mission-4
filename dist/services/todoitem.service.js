"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDoItemService = void 0;
const todoitem_1 = require("../schemas/todoitem");
exports.ToDoItemService = {
    async CreateToDoItem(data) {
        return todoitem_1.ToDoItem.create({
            todoList: data.todoGroupId,
            name: data.name,
            des: data.des,
            dueAt: data.dueAt ? new Date(data.dueAt) : undefined,
        });
    },
    async GetToDoItemList() {
        return todoitem_1.ToDoItem.find().populate("todoList");
    },
    async GetToDoItemByListId(todoGroupId) {
        return todoitem_1.ToDoItem.find({ todoList: todoGroupId }).populate("todoList");
    },
    async UpdateTodoItem(id, data) {
        const updateData = {};
        if (data.todoGroupId)
            updateData.todoList = data.todoGroupId;
        if (data.name)
            updateData.name = data.name;
        if (data.des !== undefined)
            updateData.des = data.des;
        if (data.dueAt)
            updateData.dueAt = new Date(data.dueAt);
        return todoitem_1.ToDoItem.findByIdAndUpdate(id, updateData, { new: true });
    },
    async DeleteTodoItem(id) {
        return todoitem_1.ToDoItem.findByIdAndDelete(id);
    },
};
