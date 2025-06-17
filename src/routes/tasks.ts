import { Router } from 'express';
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} from '../controllers/tasks';

const router = Router();

// Corrected route definitions
router.get("/", (req, res, next) => getAllTasks(req, res).catch(next));
router.get("/:id", (req, res, next) => getTaskById(req, res).catch(next));
router.post("/", (req, res, next) => createTask(req, res).catch(next));
router.put("/:id", (req, res, next) => updateTask(req, res).catch(next));
router.delete("/:id", (req, res, next) => deleteTask(req, res).catch(next));

export default router;