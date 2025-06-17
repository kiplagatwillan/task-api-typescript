import { Task } from '@prisma/client';

export type CreateTaskInput = {
  title: string;
  description?: string;
};
export type UpdateTaskInput = {
  title?: string;
  description?: string;
  isComplete?: boolean;
};
export type TaskResponse = Task;