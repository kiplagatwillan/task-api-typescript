import { Request, Response } from 'express';
import { PrismaClient } from '.prisma/client'

const prisma = new PrismaClient();

export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTaskById = async (req: Request, res: Response): Promise<void> => {
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
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
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
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
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
  } catch (e: any) {
    if (e.code === 'P2025') {
      res.status(404).json({ message: "Task not found" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.task.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (e: any) {
    if (e.code === 'P2025') {
      res.status(404).json({ message: "Task not found" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};