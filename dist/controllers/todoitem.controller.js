"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoItemController = void 0;
const todoitem_service_1 = require("../services/todoitem.service");
exports.TodoItemController = {
    async Create(req, res) {
        try {
            const newItem = await todoitem_service_1.ToDoItemService.CreateToDoItem(req.body);
            res.status(201).json(newItem);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async GetAll(req, res) {
        try {
            const items = await todoitem_service_1.ToDoItemService.GetToDoItemList();
            if (!items)
                return res.status(404).json({ message: "List empty" });
            return res.status(200).json(items);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    async GetByGroupId(req, res) {
        try {
            const items = await todoitem_service_1.ToDoItemService.GetToDoItemByListId(req.params.todoGroupId);
            if (!items)
                return res.status(404).json("Not found item");
            return res.status(200).json(items);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    async Update(req, res) {
        try {
            const updatedItem = await todoitem_service_1.ToDoItemService.UpdateTodoItem(req.params.id, req.body);
            if (!updatedItem)
                return res.status(404).json("Item not found");
            return res.json(updatedItem);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    async Delete(req, res) {
        try {
            const deletedItem = await todoitem_service_1.ToDoItemService.DeleteTodoItem(req.params.id);
            if (!deletedItem)
                return res.status(404).json("Item not found");
            return res.status(204).send();
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
};
