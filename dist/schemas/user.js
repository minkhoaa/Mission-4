"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    gender: { type: String, enum: ["M", "F"], required: true },
    dob: { type: Date, required: true },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
UserSchema.virtual("todoLists", {
    ref: "todolist",
    localField: "_id",
    foreignField: "user",
});
exports.User = mongoose_2.default.model("user", UserSchema);
