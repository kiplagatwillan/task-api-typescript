"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasks_1 = __importDefault(require("./routes/tasks"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Routes
app.get("/", (_req, res) => {
    res.send("<h1>Welcome to the Task API</h1>");
});
app.use("/tasks", tasks_1.default);
// Error handling middleware
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
});
exports.default = app;
