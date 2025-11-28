"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_1 = require("../schemas/user");
exports.userService = {
    async createUser(dto) {
        return user_1.User.create({
            name: dto.name,
            gender: dto.gender,
            dob: dto.dob,
        });
    },
    async getUsers() {
        return user_1.User.find().populate("todoLists");
    },
    async getUserById(id) {
        return user_1.User.findById(id).populate("todoLists");
    },
    async updateUserById(id, data) {
        const updateData = {};
        if (data.name)
            updateData.name = data.name;
        if (data.gender)
            updateData.gender = data.gender;
        if (data.dob)
            updateData.dob = new Date(data.dob);
        return user_1.User.findByIdAndUpdate(id, updateData, { new: true });
    },
    async deleteUserById(id) {
        return user_1.User.findByIdAndDelete(id);
    },
};
