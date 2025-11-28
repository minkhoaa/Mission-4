"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const AppError_1 = require("../core/errors/AppError");
/**
 * Express middleware for centralized error handling.
 *
 * Handles errors thrown in the application. If the error is an instance of `AppError`,
 * it responds with the specific status code and error message. Otherwise, it returns
 * a generic 500 status code with a "System Error" message.
 *
 * @param err - The error object thrown in the application.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function in the stack.
 */
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof AppError_1.AppError) {
        res.status(Number(err.statusCode)).json({
            message: err.message
        });
    }
    else {
        res.status(500).json({
            message: "System Error"
        });
    }
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
