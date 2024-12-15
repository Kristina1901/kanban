<template>
  <div>
    <li
      :class="[
        'border items-center p-2 mb-2 rounded-lg flex justify-between cursor-grab',
        priorityClass,
      ]"
    >
      <h3 class="text-white font-bold">{{ task.title }}</h3>
      <div class="task-actions flex">
        <button @click="editTask" class="px-1 py-1 rounded border-2 mr-1">
          <PencilIcon class="h-5 w-5 text-white" />
        </button>
        <button @click="deleteTask" class="px-1 py-1 rounded border-2">
          <TrashIcon class="h-5 w-5 text-white" />
        </button>
      </div>
    </li>
    <Modal ref="modalRef">
      <template #content>
        <Form :task="selectedTask" :closeTheModal="closeTheModal" />
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, computed } from "vue";
import { useTasksStore } from "../store/tasks";
import type { Task } from "../interfaces/task";
import { TaskPriority, TaskStatus } from "../interfaces/task";
import { TrashIcon, PencilIcon } from "@heroicons/vue/24/solid";

const props = defineProps<{
  task: Task;
  status: TaskStatus;
}>();

const tasksStore = useTasksStore();
const modalRef = ref();
const selectedTask = ref<Task | undefined>(undefined);
const deleteTask = () => {
  tasksStore.removeTask(props.task.id, props.status);
};
const opendModal = () => {
  modalRef.value?.openModal();
};
const closeTheModal = () => {
  modalRef.value?.closeModal();
};
const editTask = () => {
  selectedTask.value = props.task;
  opendModal();
};
const priorityClass = computed(() => {
  switch (props.task.priority) {
    case TaskPriority.LOW:
      return "bg-green-400";
    case TaskPriority.MEDIUM:
      return "bg-blue-400";
    case TaskPriority.HIGH:
      return "bg-red-400";
    default:
      return "bg-blue-400";
  }
});
</script>

<style scoped>
.cursor-grab {
  cursor: grab;
}
</style>
