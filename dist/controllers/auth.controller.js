"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
exports.AuthController = {
    async register(req, res) {
        try {
            const { name, gender, dob, username, password } = req.body;
            const result = await auth_service_1.AuthService.Resgister({
                name,
                gender,
                dob: new Date(dob),
                username,
                password,
            });
            return res.status(201).json({
                message: "Register successfully",
                data: result,
            });
        }
        catch (err) {
            res.status(400).json({ message: "Fail while registering", error: err });
        }
    },
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const result = await auth_service_1.AuthService.Login({ username, password });
            return res
                .status(200)
                .json({ message: "Login successfully", data: result });
        }
        catch (err) {
            return res.status(400).json({ message: "Cannot login", error: err });
        }
    },
};
