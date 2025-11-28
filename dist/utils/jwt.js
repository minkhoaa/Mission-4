"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokens = generateTokens;
exports.verifyAccessToken = verifyAccessToken;
exports.verifyRefreshToken = verifyRefreshToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;
if (!ACCESS_SECRET || !REFRESH_SECRET) {
    throw new Error("ACCESS_TOKEN_SECRET or REFRESH_TOKEN_SECRET is not set");
}
const accessExpiresIn = (process.env
    .ACCESS_TOKEN_SECRET || "15m");
const refreshExpiresIn = process.env.REFRESH_TOKEN_EXPIRES || "7d";
function generateTokens(payload) {
    const accessToken = jsonwebtoken_1.default.sign(payload, ACCESS_SECRET, {
        expiresIn: accessExpiresIn,
    });
    const refreshToken = jsonwebtoken_1.default.sign(payload, ACCESS_SECRET, {
        expiresIn: refreshExpiresIn,
    });
    return { accessToken, refreshToken };
}
function verifyAccessToken(token) {
    return jsonwebtoken_1.default.verify(token, ACCESS_SECRET);
}
function verifyRefreshToken(token) {
    return jsonwebtoken_1.default.verify(token, REFRESH_SECRET);
}
