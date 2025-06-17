"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tasks_1 = require("../controllers/tasks");
const router = (0, express_1.Router)();
// Corrected route definitions
router.get("/", (req, res, next) => (0, tasks_1.getAllTasks)(req, res).catch(next));
router.get("/:id", (req, res, next) => (0, tasks_1.getTaskById)(req, res).catch(next));
router.post("/", (req, res, next) => (0, tasks_1.createTask)(req, res).catch(next));
router.put("/:id", (req, res, next) => (0, tasks_1.updateTask)(req, res).catch(next));
router.delete("/:id", (req, res, next) => (0, tasks_1.deleteTask)(req, res).catch(next));
exports.default = router;
