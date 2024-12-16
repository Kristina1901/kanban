import { defineStore } from "pinia";
import { TaskStatus } from "../interfaces/task";
import type { Task } from "../interfaces/task";

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: {
      [TaskStatus.TODO]: {
        taskStatus: TaskStatus.TODO,
        items: [] as Task[],
      },
      [TaskStatus.IN_PROGRESS]: {
        taskStatus: TaskStatus.IN_PROGRESS,
        items: [] as Task[],
      },
      [TaskStatus.DONE]: {
        taskStatus: TaskStatus.DONE,
        items: [] as Task[],
      },
    } as Record<TaskStatus, { taskStatus: TaskStatus; items: Task[] }>,
  }),
  getters: {
    taskStatuses: () => Object.values(TaskStatus),
    taskCountByStatus: (state) => {
      return {
        [TaskStatus.TODO]: state.tasks[TaskStatus.TODO].items.length,
        [TaskStatus.IN_PROGRESS]:
          state.tasks[TaskStatus.IN_PROGRESS].items.length,
        [TaskStatus.DONE]: state.tasks[TaskStatus.DONE].items.length,
      };
    },
  },
  actions: {
    addTask(task: Task, taskStatus: TaskStatus) {
      this.tasks[taskStatus].items.push(task);
    },
    removeTask(taskId: string, taskStatus: TaskStatus) {
      this.tasks[taskStatus].items = this.tasks[taskStatus].items.filter(
        (task) => task.id !== taskId
      );
    },
    updateTask(updatedTask: Task) {
      const status = updatedTask.taskStatus;
      const index = this.tasks[status].items.findIndex(
        (task) => task.id === updatedTask.id
      );
      if (index !== -1) {
        this.tasks[status].items.splice(index, 1, updatedTask);
      }
    },
    moveTask(
      taskId: string,
      fromTaskStatus: TaskStatus,
      toTaskStatus: TaskStatus
    ) {
      if (fromTaskStatus === toTaskStatus) return;
      const taskIndex = this.tasks[fromTaskStatus].items.findIndex(
        (task) => task.id === taskId
      );
      if (taskIndex !== -1) {
        const [task] = this.tasks[fromTaskStatus].items.splice(taskIndex, 1);
        this.tasks[toTaskStatus].items.push(task);
      }
    },
  },
});
