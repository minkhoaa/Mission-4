"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = loggerMiddleware;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const ulid_1 = require("ulid");
const logFilePath = path_1.default.join(__dirname, `../../logs/[${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}]-access.log`);
if (!fs_1.default.existsSync(path_1.default.dirname(logFilePath))) {
    fs_1.default.mkdirSync(path_1.default.dirname(logFilePath), { recursive: true });
}
function writeLog(message) {
    const logLine = `${message}\n`;
    fs_1.default.appendFileSync(logFilePath, logLine, 'utf8');
}
/**
 * Express middleware that logs the HTTP method and URL of each incoming request.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function in the stack.
 *
 * @remarks
 * This middleware outputs a log message to the console in the format: `[METHOD] URL`.
 * It should be placed early in the middleware chain to capture all requests.
 */
function loggerMiddleware(req, res, next) {
    if (req.originalUrl.includes('.well-known'))
        return next();
    const startTime = Date.now();
    const id = (0, ulid_1.ulid)();
    // console.log(`\n[TIME = ${new Date().toISOString()}]`)
    // console.log(`➡️  [ID = ${id}] Request: ${req.method} ${req.originalUrl}`);
    // console.log(`Headers:`, req.headers);
    // if (req.method !== 'GET') {
    //   console.log(`Body:`, req.body);
    // }
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        // console.log(`⬅️  [ID = ${id}] Response: ${res.statusCode} ${res.statusMessage}; Duration: ${duration}ms`);
        writeLog(`➡️ [TIME = ${new Date().toISOString()}, ID = ${id}]]`);
        writeLog(`Request: ${req.method} ${req.originalUrl}`);
        writeLog(`Headers: ${JSON.stringify(req.headers)}`);
        if (req.method !== 'GET') {
            console.log(`Body: ${JSON.stringify(req.body)}`);
        }
        writeLog(`Response: ${res.statusCode} ${res.statusMessage}; Duration: ${duration}ms`);
        writeLog('-------------------------------------------------------------------------------------------------------');
    });
    next();
}
