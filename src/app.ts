import express, { Request, Response, NextFunction } from 'express';
import taskRoutes from './routes/tasks';

const app = express();
app.use(express.json());
app.get("/", (_req: Request, res: Response) => {
  res.send("<h1>Welcome to the Task API</h1>");
});
app.use("/tasks", taskRoutes);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});
export default app;