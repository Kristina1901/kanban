import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { TaskStatus } from "../interfaces/task";
import type { Task } from "../interfaces/task";

export const useTasksStore = defineStore("tasks", () => {
  const tasks = ref<{
    [key in TaskStatus]: {
      taskStatus: TaskStatus;
      items: Task[];
    };
  }>({
    [TaskStatus.TODO]: {
      taskStatus: TaskStatus.TODO,
      items: [],
    },
    [TaskStatus.IN_PROGRESS]: {
      taskStatus: TaskStatus.IN_PROGRESS,
      items: [],
    },
    [TaskStatus.DONE]: {
      taskStatus: TaskStatus.DONE,
      items: [],
    },
  });
  const taskStatuses = computed(() => Object.values(TaskStatus));
  const taskCountByStatus = computed(() => {
    return {
      [TaskStatus.TODO]: tasks.value[TaskStatus.TODO].items.length,
      [TaskStatus.IN_PROGRESS]:
        tasks.value[TaskStatus.IN_PROGRESS].items.length,
      [TaskStatus.DONE]: tasks.value[TaskStatus.DONE].items.length,
    };
  });
  const addTask = (task: Task, taskStatus: TaskStatus) => {
    tasks.value[taskStatus].items.push(task);
  };
  const removeTask = (taskId: string, taskStatus: TaskStatus) => {
    tasks.value[taskStatus].items = tasks.value[taskStatus].items.filter(
      (task) => task.id !== taskId
    );
  };
  const updateTask = (updatedTask: Task) => {
    const status = updatedTask.taskStatus;
    const index = tasks.value[status].items.findIndex(
      (task) => task.id === updatedTask.id
    );
    if (index !== -1) {
      tasks.value[status].items.splice(index, 1, updatedTask);
    }
  };
  const moveTask = (
    taskId: string,
    fromTaskStatus: TaskStatus,
    toTaskStatus: TaskStatus
  ) => {
    if (fromTaskStatus === toTaskStatus) return;
    const taskIndex = tasks.value[fromTaskStatus].items.findIndex(
      (task) => task.id === taskId
    );
    if (taskIndex !== -1) {
      const [task] = tasks.value[fromTaskStatus].items.splice(taskIndex, 1);
      tasks.value[toTaskStatus].items.push(task);
    }
  };
  return {
    tasks,
    taskStatuses,
    taskCountByStatus,
    addTask,
    removeTask,
    moveTask,
    updateTask,
  };
});
