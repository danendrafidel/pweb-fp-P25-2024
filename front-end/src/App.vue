<script setup>
import { RouterLink, RouterView, useRouter } from "vue-router";
import { authState, logout } from "./store/auth";
import { computed } from "vue";

const router = useRouter();

const isLoggedIn = computed(() => authState.isLoggedIn);
const username = localStorage.getItem("username");

function handleLogout() {
  logout();
  router.push("/");
}

function handleHashScroll(hash) {
  router.push(hash).then(() => {
    const targetElement = document.querySelector(hash);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  });
}
</script>

<template>
  <header>
    <div
      class="flex flex-col md:flex-row justify-between items-center text-white bg-gradient-to-r from-blue-600 to-blue-800 py-5 px-6 sm:px-8 md:px-10 shadow-lg"
    >
      <h1 class="text-2xl md:text-3xl font-bold tracking-wider bg-clip-text">
        Web Peminjaman Barang KCKS P25
      </h1>

      <nav
        class="space-x-4 sm:space-x-5 font-semibold flex flex-col md:flex-row items-center mt-4 md:mt-0"
      >
        <RouterLink
          v-if="!isLoggedIn"
          to="/"
          class="px-4 py-2 mb-2 md:mb-0 rounded-md bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-green-400 hover:to-blue-500 hover:scale-105 transition-all duration-700 shadow-md"
        >
          Login
        </RouterLink>

        <RouterLink
          v-if="isLoggedIn"
          to="/admin"
          class="px-4 py-2 mb-2 md:mb-0 rounded-md text-yellow-300 hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 hover:from-red-500 hover:to-yellow-500 transition-all duration-700"
        >
          Welcome, {{ username }}
        </RouterLink>

        <button
          v-if="!isLoggedIn"
          @click="handleHashScroll('#rules')"
          class="px-4 py-2 mb-2 md:mb-0 rounded-md bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-purple-500 hover:to-indigo-500 hover:scale-105 transition-all duration-700 shadow-md"
        >
          Rules
        </button>

        <button
          v-if="isLoggedIn"
          @click="handleLogout"
          class="px-4 py-2 mb-2 md:mb-0 rounded-md bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-yellow-500 hover:to-orange-500 hover:scale-105 transition-all duration-700 shadow-lg"
        >
          Logout
        </button>
      </nav>
    </div>
  </header>
  <RouterView />
</template>
