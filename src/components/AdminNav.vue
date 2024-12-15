<template>
  <nav class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex space-x-8">
        <router-link
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="flex items-center px-3 py-4 text-sm font-medium"
          :class="{
            'text-indigo-600 border-b-2 border-indigo-600': isActiveLink(
              link.to
            ),
            'text-gray-500 hover:text-gray-700': !isActiveLink(link.to),
          }"
        >
          <component :is="link.icon" class="w-5 h-5" />
          <span class="ml-2">{{ link.label }}</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { Package, Users, FileText } from "lucide-vue";

export default {
  components: {
    Package,
    Users,
    FileText,
  },
  data() {
    return {
      links: [
        { to: "/admin", icon: "Package", label: "Data Barang" },
        { to: "/admin/all-operator", icon: "Users", label: "Data Petugas" },
        { to: "/admin/summary", icon: "FileText", label: "Data Peminjaman" },
      ],
    };
  },
  methods: {
    isActiveLink(path) {
      return this.$route.path === path;
    },
  },
};
</script>
