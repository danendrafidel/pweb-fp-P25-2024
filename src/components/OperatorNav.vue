<template>
  <nav class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex space-x-8">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          :class="[
            'flex items-center px-3 py-4 text-sm font-medium',
            $route.path === link.to
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500 hover:text-gray-700',
          ]"
        >
          <component :is="link.icon" class="w-5 h-5" />
          <span class="ml-2">{{ link.label }}</span>
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script>
import { BookOpen, Package, Users } from "lucide-vue"; // Assuming you're using lucide-vue

export default {
  data() {
    return {
      links: [
        {
          to: "/operator/book-equipment",
          icon: BookOpen,
          label: "Form Peminjaman",
        },
        {
          to: "/operator/all-equipment",
          icon: Package,
          label: "Data Barang",
        },
        {
          to: "/operator/borrowers",
          icon: Users,
          label: "Data Peminjam",
        },
      ],
    };
  },
};
</script>
