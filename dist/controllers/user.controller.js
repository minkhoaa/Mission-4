"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
exports.UserController = {
    async create(req, res) {
        try {
            const user = await user_service_1.userService.createUser(req.body);
            res.status(201).json(user);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error creating user" });
        }
    },
    async findAll(req, res) {
        try {
            const users = await user_service_1.userService.getUsers();
            return res.json(users);
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Error fetching users" });
        }
    },
    async findById(req, res) {
        try {
            const user = await user_service_1.userService.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                });
            }
            return res.json(user);
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Error fetching user" });
        }
    },
    async updateUser(req, res) {
        try {
            const user = await user_service_1.userService.updateUserById(req.params.id, req.body);
            if (!user)
                return res.status(404).json("User not found");
            res.json(user);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error while updating" });
        }
    },
    async deleteUser(req, res) {
        try {
            const deleted = await user_service_1.userService.deleteUserById(req.params.id);
            if (!deleted)
                return res.status(404).json("User not found");
            return res.status(204).send();
        }
        catch (err) {
            res.status(500).json({ mesage: "Error while deleting" });
        }
    },
};
