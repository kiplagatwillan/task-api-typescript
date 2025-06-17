"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTaskById = exports.getAllTasks = void 0;
const client_1 = require(".prisma/client");
const prisma = new client_1.PrismaClient();
const getAllTasks = async (req, res) => {
    try {
        const tasks = await prisma.task.findMany();
        res.status(200).json(tasks);
    }
    catch (e) {
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getAllTasks = getAllTasks;
const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await prisma.task.findUnique({
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
};
exports.getTaskById = getTaskById;
const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title) {
            res.status(400).json({ message: "Title is required" });
            return;
        }
        const newTask = await prisma.task.create({
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
};
exports.createTask = createTask;
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, isComplete } = req.body;
        const updatedTask = await prisma.task.update({
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
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.task.delete({
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
};
exports.deleteTask = deleteTask;
