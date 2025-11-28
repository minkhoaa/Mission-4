"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDoListController = void 0;
const todolist_service_1 = require("../services/todolist.service");
exports.ToDoListController = {
    async create(req, res) {
        try {
            const todo = await todolist_service_1.todoListsService.createList(req.body);
            res.status(201).json(todo);
        }
        catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
    async update(req, res) {
        try {
            const todo = await todolist_service_1.todoListsService.updateToDoList(req.params.id, req.body);
            if (!todo)
                return res.status(404).json({ message: "List not found" });
            res.json(todo);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error while updating" });
        }
    },
    async findAll(req, res) {
        const list = await todolist_service_1.todoListsService.getLists();
        res.json(list);
    },
    async findById(req, res) {
        try {
            const list = await todolist_service_1.todoListsService.getById(req.params.id);
            if (!list) {
                return res.status(404).json({
                    message: "List not found",
                });
            }
            return res.json(list);
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Error while fetching" });
        }
    },
    async delete(req, res) {
        try {
            const deleted = await todolist_service_1.todoListsService.deleteToDoList(req.params.id);
            if (!deleted)
                return res.status(404).json({
                    message: "List not found",
                });
            res.status(204).json({
                message: "Xóa oke rồi đó",
            });
        }
        catch (err) {
            res.status(500).json({ mesage: "Error while deleting" });
        }
    },
};
