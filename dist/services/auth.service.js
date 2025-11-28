"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const account_1 = require("../schemas/account");
const user_1 = require("../schemas/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../utils/jwt");
exports.AuthService = {
    async Resgister(registerDto) {
        const existingUser = await account_1.Account.findOne({
            username: registerDto.username,
        });
        if (existingUser)
            throw new Error("Username is already used");
        const user = new user_1.User({
            name: registerDto.name,
            gender: registerDto.gender,
            dob: registerDto.dob,
        });
        const hashedPassword = await bcrypt_1.default.hash(registerDto.password, 10);
        const account = new account_1.Account({
            username: registerDto.username,
            user: user._id,
            hashedPassword: hashedPassword,
            status: "ACTIVATE",
        });
        const payload = {
            sub: account._id.toString(),
            userId: user._id.toString(),
            userName: account.username,
        };
        const { accessToken, refreshToken } = (0, jwt_1.generateTokens)(payload);
        account.accessToken = accessToken;
        account.refreshToken = refreshToken;
        await account.save();
        return {
            user,
            accessToken,
            refreshToken,
        };
    },
    async Login(dto) {
        var account = await account_1.Account.findOne({ username: dto.username }).populate("user");
        if (!account)
            throw new Error("User is not existed");
        if (account.status !== "ACTIVATE")
            throw new Error("User account is DEACTIVATED");
        const isMatch = await bcrypt_1.default.compare(dto.password, account.hashedPassword);
        if (!isMatch)
            throw new Error("Invalid credentials");
        const user = account.user;
        const payload = {
            sub: account._id.toString(),
            userId: user.id.toString(),
            userName: account.username.toString(),
        };
        const { accessToken, refreshToken } = (0, jwt_1.generateTokens)(payload);
        account.accessToken = accessToken;
        account.refreshToken = refreshToken;
        await account.save();
        return {
            user,
            accessToken,
            refreshToken,
        };
    },
};
