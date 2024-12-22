<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { authState, logout } from './store/auth';
import { computed} from 'vue';

const router = useRouter();

const isLoggedIn = computed(() => authState.isLoggedIn);
const username = localStorage.getItem('username');

function handleLogout(){
  logout();
  router.push("/");
}

function handleHashScroll(hash) {
  router.push(hash).then(() =>{
    const targetElement = document.querySelector(hash);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

</script>
<template>
  <header>
    <div class="flex flex-row justify-between text-white bg-green-600 py-7 px-10">
      <h1 class="text-xl font-bold">Web Peminjaman Barang</h1>
      <nav class="space-x-5 font-bold focus:underline">
        <RouterLink v-if="!isLoggedIn" to="/">Login</RouterLink>
        <RouterLink v-if="isLoggedIn" to="/admin">Welcome, {{username}}</RouterLink>
        <button v-if="!isLoggedIn" @click="handleHashScroll('#rules')" >
          Rules
        </button>
        <button v-if="isLoggedIn" @click="handleLogout" class="py-2 px-3 rounded-md shadow-xl text-white bg-red-600 hover:bg-red-800 font-bold">Logout</button>
      </nav>
    </div>
  </header>
  <RouterView />
</template>
