<template>
  <nav class="bg-indigo-600 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <NuxtLink :to="getHomeLink" class="font-bold text-xl">
            Lab KCKS
          </NuxtLink>
        </div>

        <div class="hidden md:block">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/rules" class="hover:text-indigo-200">
              Aturan & Alur
            </NuxtLink>
            <template v-if="!user">
              <NuxtLink to="/" class="hover:text-indigo-200"> Login </NuxtLink>
            </template>
            <template v-if="user">
              <div class="flex items-center space-x-4">
                <span>Welcome, {{ user.username }}</span>
                <button
                  @click="logout"
                  class="flex items-center hover:text-indigo-200"
                >
                  <LogOut class="w-4 h-4 mr-1" />
                  Logout
                </button>
              </div>
            </template>
          </div>
        </div>

        <div class="md:hidden">
          <button
            @click="toggleMenu"
            class="inline-flex items-center justify-center p-2 rounded-md hover:text-indigo-200 hover:bg-indigo-700"
          >
            <Menu class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>

    <div v-if="isMenuOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <NuxtLink
          to="/rules"
          class="block px-3 py-2 rounded-md hover:bg-indigo-700"
        >
          Aturan & Alur
        </NuxtLink>
        <template v-if="!user">
          <NuxtLink
            to="/"
            class="block px-3 py-2 rounded-md hover:bg-indigo-700"
          >
            Login
          </NuxtLink>
        </template>
        <template v-if="user">
          <div class="px-3 py-2">Welcome, {{ user.username }}</div>
          <button
            @click="logout"
            class="flex items-center w-full px-3 py-2 rounded-md hover:bg-indigo-700"
          >
            <LogOut class="w-4 h-4 mr-1" />
            Logout
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from "../store/authStore";
import { LogOut, Menu } from "lucide-vue"; // assuming you are using lucide-vue
import { computed, ref } from "vue";

export default {
  setup() {
    const authStore = useAuthStore();
    const user = computed(() => authStore.user);
    const logout = authStore.logout;
    const isMenuOpen = ref(false);

    const getHomeLink = computed(() => {
      if (!user.value) return "/";
      return user.value.role === "ADMIN"
        ? "/admin"
        : "/operator/book-equipment";
    });

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    return {
      user,
      logout,
      isMenuOpen,
      getHomeLink,
      toggleMenu,
    };
  },
};
</script>
