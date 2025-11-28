"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectMongoDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.DATABASE_URL ?? 'mongodb://localhost:27017');
    }
    catch (err) {
        console.log("Mongo connection error ==> ", err);
        throw err;
    }
};
exports.connectMongoDB = connectMongoDB;
