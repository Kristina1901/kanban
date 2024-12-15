<template>
  <Form
    @submit="submit"
    :initial-values="task"
    :validation-schema="taskSchema"
    class="flex flex-col"
    ref="form"
  >
    <div class="min-h-[94px]">
      <label for="title" class="block font-bold mb-2">Title</label>
      <Field
        name="title"
        as="input"
        type="text"
        id="title"
        placeholder="Enter task title"
        class="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ErrorMessage name="title" class="text-red-500 text-sm" />
    </div>
    <div class="min-h-[175px]">
      <label for="description" class="block font-bold mb-2">Description</label>
      <Field
        name="description"
        as="textarea"
        id="description"
        placeholder="Enter task description"
        class="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-28 resize-none"
      />
      <ErrorMessage name="description" class="text-red-500 text-sm" />
    </div>
    <div class="flex justify-between items-center min-h-[90px]">
      <div class="flex flex-col min-h-[90px]">
        <label for="responsiblePerson" class="block font-bold mb-2"
          >Responsible Person</label
        >
        <Field
          name="responsiblePerson"
          as="input"
          type="text"
          id="responsiblePerson"
          placeholder="Enter responsible person"
          class="w-[185px] px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <ErrorMessage name="responsiblePerson" class="text-red-500 text-sm" />
      </div>
      <div class="flex flex-col min-h-[90px]">
        <label for="executors" class="block font-bold mb-2">Executors</label>
        <Field
          name="executors"
          as="input"
          type="text"
          id="executors"
          placeholder="Enter executors"
          class="w-[185px] px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <ErrorMessage name="executors" class="text-red-500 text-sm" />
      </div>
    </div>
    <div class="mb-4 flex justify-between items-center min-h-[90px]">
      <div class="flex flex-col min-h-[90px]">
        <label for="taskStatus" class="block font-bold mb-2">Status</label>
        <Field
          name="taskStatus"
          as="select"
          id="taskStatus"
          class="w-[185px] px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="DONE">DONE</option>
        </Field>
        <ErrorMessage name="status" class="text-red-500 text-sm" />
      </div>
      <div class="flex flex-col min-h-[90px]">
        <label for="priority" class="block font-bold mb-2">Priority</label>
        <Field
          name="priority"
          as="select"
          id="priority"
          class="w-[185px] px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </Field>
        <ErrorMessage name="priority" class="text-red-500 text-sm" />
      </div>
    </div>
    <button
      type="submit"
      class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 self-end"
    >
      Submit
    </button>
  </Form>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { TaskPriority, TaskStatus } from "../interfaces/task";
import type { Task } from "../interfaces/task";
import { useTasksStore } from "../store/tasks";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

const props = defineProps({
  task: {
    type: Object as PropType<Task>,
    default: null,
  },
});
const { addTask, updateTask, moveTask } = useTasksStore();
const task = reactive<Task>({
  id: props.task?.id || "",
  title: props.task?.title || "",
  description: props.task?.description || "",
  responsiblePerson: props.task?.responsiblePerson || "",
  executors: props.task?.executors || "",
  taskStatus: props.task?.taskStatus || TaskStatus.TODO,
  priority: props.task?.priority || TaskPriority.LOW,
});
const form = ref<InstanceType<typeof Form> | null>(null);
watch(
  () => props.task,
  (newTask) => {
    if (newTask) {
      task.id = newTask.id;
      task.title = newTask.title;
      task.description = newTask.description;
      task.responsiblePerson = newTask.responsiblePerson;
      task.executors = newTask.executors;
      task.taskStatus = newTask.taskStatus;
      task.priority = newTask.priority;
    }
  },
  { immediate: true }
);
const submit = (values: Partial<Task>) => {
  if (props.task && props.task.id) {
    const updatedTask: Task = { ...task, ...values };
    if (updatedTask.taskStatus !== props.task.taskStatus) {
      moveTask(props.task.id, props.task.taskStatus, updatedTask.taskStatus);
    }
    updateTask(updatedTask);
  } else {
    const newTask: Task = { ...task, ...values, id: generateId() };
    addTask(newTask, newTask.taskStatus);
    form.value?.resetForm();
  }
};
const generateId = () => Date.now().toString();
const taskSchema = yup.object({
  title: yup.string().required("Title is required."),
  description: yup.string().required("Description is required."),
  responsiblePerson: yup.string().required("Responsible person is required."),
  executors: yup.string().required("Executors are required."),
  taskStatus: yup.string().required("Status is required."),
  priority: yup.string().required("Priority is required."),
});
</script>
