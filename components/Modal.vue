<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-gray-500/75 transition-opacity flex justify-center items-center"
    @click="closeModal"
  >
    <div
      class="bg-white px-4 py-4 rounded-lg relative max-w-lg w-full h-[537px]"
      @click.stop
    >
      <button
        class="absolute top-2 right-2 bg-transparent border-none text-xl cursor-pointer"
        @click="closeModal"
      >
        <XMarkIcon class="h-5 w-5 text-gray-700" />
      </button>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/solid";

const isVisible = ref(false);
const openModal = () => {
  isVisible.value = true;
};
const closeModal = () => {
  isVisible.value = false;
};
defineExpose({
  openModal,
  closeModal,
});
</script>
