"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const authrouter = (0, express_1.Router)();
authrouter.post("/login", auth_controller_1.AuthController.login);
authrouter.post("/register", auth_controller_1.AuthController.register);
exports.default = authrouter;
