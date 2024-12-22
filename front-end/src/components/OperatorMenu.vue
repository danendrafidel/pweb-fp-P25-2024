<script setup>
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const tabs = [
  { name: 'Booking Peminjam', path: '/operator/book-equipment' },
  { name: 'Data Barang', path: '/operator/all-equipment' },
  { name: 'Data Summary', path: '/operator/summary' },
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
      class="py-2 px-4 rounded-lg text-green-500 shadow"
      :class="{
        'bg-green-500 text-white': route.path === tab.path,
        'border border-green-500': route.path !== tab.path
      }"
    >
      {{ tab.name }}
    </button>
  </div>
</template>