<script setup>
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const tabs = [
  { name: "Booking Peminjam", path: "/operator/book-equipment" },
  { name: "Data Barang", path: "/operator/all-equipment" },
  { name: "Data Summary", path: "/operator/summary" },
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
      class="py-3 px-6 rounded-lg text-white shadow-lg transform transition-all duration-300"
      :class="{
        'bg-gradient-to-r from-blue-500 to-indigo-600 text-white scale-105':
          route.path === tab.path,
        'bg-blue-300 border border-blue-500 text-blue-700 hover:bg-blue-500 hover:text-white hover:scale-110':
          route.path !== tab.path,
      }"
    >
      {{ tab.name }}
    </button>
  </div>
</template>

<style scoped>
button {
  transition: transform 0.3s ease, background-color 0.3s ease;
}

button:hover {
  transform: scale(1.1);
}

button.scale-105 {
  transform: scale(1.05);
}

button.bg-gradient-to-r {
  background: linear-gradient(45deg, #3b82f6, #6366f1);
}

button.hover\:border-blue-500:hover {
  border-color: #3b82f6;
}

button.hover\:text-white:hover {
  color: white;
}
</style>
