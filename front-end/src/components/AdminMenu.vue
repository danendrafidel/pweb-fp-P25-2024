<script setup>
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const tabs = [
  { name: "Data Barang", path: "/admin" },
  { name: "Data Operator", path: "/admin/all-operator" },
  { name: "Data Summary", path: "/admin/summary" },
];

function navigateToTab(tabPath) {
  router.push(tabPath);
}
</script>

<template>
  <div class="text-center space-x-5 mt-10 py-5 font-bold">
    <button
      v-for="tab in tabs"
      :key="tab.path"
      @click="navigateToTab(tab.path)"
      class="py-2 px-6 rounded-lg text-white shadow-md transform transition-all duration-300 ease-in-out"
      :class="{
        'bg-gradient-to-r from-blue-500 to-blue-700 text-white':
          route.path === tab.path,
        'bg-blue-100 hover:bg-gradient-to-r hover:from-blue-200 hover:to-blue-500 text-blue-500 border border-blue-300':
          route.path !== tab.path,
      }"
    >
      {{ tab.name }}
    </button>
  </div>
</template>

<style scoped>
button:hover {
  transform: scale(1.1);
}

button.bg-gradient-to-r {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

@media (max-width: 640px) {
  .space-x-5 {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
