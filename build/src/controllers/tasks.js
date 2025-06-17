"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTaskById = exports.getAllTasks = void 0;
const client_1 = require(".prisma/client");
const prisma = new client_1.PrismaClient();
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield prisma.task.findMany();
        res.status(200).json(tasks);
    }
    catch (e) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllTasks = getAllTasks;
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const task = yield prisma.task.findUnique({
            where: { id }
        });
        if (!task) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
        res.status(200).json(task);
    }
    catch (e) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getTaskById = getTaskById;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        if (!title) {
            res.status(400).json({ message: "Title is required" });
            return;
        }
        const newTask = yield prisma.task.create({
            data: {
                title,
                description: description || ""
            }
        });
        res.status(201).json(newTask);
    }
    catch (e) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description, isComplete } = req.body;
        const updatedTask = yield prisma.task.update({
            where: { id },
            data: {
                title,
                description,
                isComplete
            }
        });
        res.status(200).json(updatedTask);
    }
    catch (e) {
        if (e.code === 'P2025') {
            res.status(404).json({ message: "Task not found" });
        }
        else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prisma.task.delete({
            where: { id }
        });
        res.status(204).send();
    }
    catch (e) {
        if (e.code === 'P2025') {
            res.status(404).json({ message: "Task not found" });
        }
        else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
});
exports.deleteTask = deleteTask;
