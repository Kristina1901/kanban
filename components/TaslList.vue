<template>
  <div class="flex justify-between w-[1020px] mx-auto">
    <div
      v-for="status in taskStatuses"
      :key="status"
      class="shadow-lg bg-slate-50 p-4 rounded min-w-80"
      @dragover.prevent="onDragOver"
      @drop="onDrop(status)"
    >
      <h2 class="mb-2 font-bold">
        {{ status === "IN_PROGRESS" ? "IN PROGRESS" : status }}
      </h2>
      <ul class="h-[330px] overflow-y-auto scrollable-container px-1">
        <Task
          v-for="task in tasks[status].items"
          :key="task.id"
          :task="task"
          :status="status"
          draggable="true"
          @dragstart="onDragStart(task, status)"
        />
      </ul>
      <button
        @click="opendModal"
        class="py-2 w-full text-left flex items-center"
      >
        <PlusIcon class="h-5 w-5 text-gray-700" />
        <span class="ml-1">Add a task</span>
      </button>
    </div>
    <Modal ref="modalRef">
      <template #content>
        <Form :status="currentStatus" :closeTheModal="closeTheModal" />
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { useTasksStore } from "../store/tasks";
import { computed, ref } from "vue";
import { TaskStatus } from "../interfaces/task";
import type { Task } from "../interfaces/task";
import { PlusIcon } from "@heroicons/vue/24/solid";

const taskStore = useTasksStore();
const tasks = computed(() => taskStore.tasks);
const taskStatuses = computed(() => taskStore.taskStatuses);
const currentStatus = ref<TaskStatus | null>(null);
const draggedTask = ref<Task | null>(null);
const draggedFromStatus = ref<TaskStatus | null>(null);
const modalRef = ref();

const opendModal = () => {
  modalRef.value?.openModal();
};
const closeTheModal = () => {
  modalRef.value?.closeModal();
};
const onDragStart = (task: Task, status: TaskStatus) => {
  draggedTask.value = task;
  draggedFromStatus.value = status;
};
const onDragOver = (event: DragEvent) => {
  event.preventDefault();
};
const onDrop = (targetStatus: TaskStatus) => {
  if (
    draggedTask.value &&
    draggedFromStatus.value &&
    draggedFromStatus.value !== targetStatus
  ) {
    taskStore.moveTask(
      draggedTask.value.id,
      draggedFromStatus.value,
      targetStatus
    );
    draggedTask.value = null;
    draggedFromStatus.value = null;
  }
};
</script>

<style scoped>
.scrollable-container::-webkit-scrollbar {
  width: 8px;
}
.scrollable-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.scrollable-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}
.scrollable-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.scrollable-container {
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}
</style>
