"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./core/envLoader");
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("./middlewares");
const mongodb_1 = require("./config/mongodb");
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const PORT = process.env.PORT;
console.log("PORT ==> ", PORT);
const app = (0, express_1.default)();
(async () => {
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.static("public"));
    app.use(middlewares_1.loggerMiddleware);
    app.use("/api", routes_1.default);
    app.use(middlewares_1.errorHandlerMiddleware);
    // Start HTTP server first so Swagger/UI remains accessible even if DB is down.
    app.listen(PORT, () => {
        console.log(`🚀 Server running at ${process.env.SERVER_URL}`);
        console.log(`🚀 APIs document running at ${process.env.SERVER_URL}/api/docs`);
    });
    // Connect to MongoDB in the background; log errors but don't crash the server.
    (0, mongodb_1.connectMongoDB)().catch((err) => {
        console.error("Mongo connection error ==> ", err);
    });
})();
