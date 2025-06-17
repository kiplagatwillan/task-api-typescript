import { PrismaClient } from '.prisma/client'
const prisma = new PrismaClient();

export const getAllTasks = async() =>{
  return await prisma.task.findMany();
};
export const getTaskById = async(id: string) => {
  return await prisma.task.findUnique({
    where: { id }
  });
};
export const createTask = async (title: string, description: string) => {
  return await prisma.task.create({
    data: {title, description }
  });
};

export const updateTask = async (
  id: string,
  data: { title?: string; description?: string; isComplete?: boolean }
) => {
  return await prisma.task.update({
    where: { id },
    data
  });
};
export const deleteTask = async (id: string) => {
  return await prisma.task.delete({
    where: { id }
  });
};