export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export enum TaskPriority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}
export interface Task {
  id: string;
  title: string;
  description: string;
  responsiblePerson: string;
  executors: string;
  taskStatus: TaskStatus;
  priority: TaskPriority;
}
