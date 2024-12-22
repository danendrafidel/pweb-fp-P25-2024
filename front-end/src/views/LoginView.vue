<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import apiClient from "@/config/apiConfig";
import { login } from "@/store/auth";

const username = ref("");
const password = ref("");
const errorMessage = ref("");
const selectedRole = ref("");
const router = useRouter();

async function handleLogin() {
  errorMessage.value = "";

  if (!username.value || !password.value || !selectedRole.value) {
    errorMessage.value = "All fields are required.";
    return;
  }

  try {
    const response = await apiClient.post("/", {
      username: username.value,
      password: password.value,
      role: selectedRole.value,
    });

    const token = response.data.token;
    const user = response.data.user.username;
    const role = response.data.user.role;

    localStorage.setItem("authToken", token);
    localStorage.setItem("username", user);
    localStorage.setItem("userRole", role);
    alert("Login successful!");
    login(user);
    router.push(role === "admin" ? "/admin" : "/operator/book-equipment");
  } catch (error) {
    if (error.response) {
      errorMessage.value = error.response.data.message || "Login failed.";
    } else {
      errorMessage.value = "An error occurred. Please try again.";
    }
  }
}
</script>

<template>
  <main>
    <div
      class="w-full max-w-lg mx-auto block min-h-screen content-center px-4 sm:px-6 md:px-8"
    >
      <form
        @submit.prevent="handleLogin"
        class="bg-white shadow-xl rounded px-8 pt-5 pb-8 mb-4 transform transition-all duration-700 ease-in-out opacity-0 animate-fadeInUp"
      >
        <h1
          class="text-3xl font-extrabold text-center my-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 animate-slideIn"
        >
          LOGIN
        </h1>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            Username
          </label>
          <input
            v-model="username"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transform transition-all duration-300 ease-in-out"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            v-model="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transform transition-all duration-300 ease-in-out"
            id="password"
            type="password"
            placeholder="******************"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="role">
            Role
          </label>
          <div class="grid">
            <select
              class="row-start-1 col-start-1 bg-slate-50 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              id="role"
              name="role"
              v-model="selectedRole"
            >
              <option>admin</option>
              <option>operator</option>
            </select>
          </div>
        </div>

        <p
          v-if="errorMessage"
          class="text-red-500 text-xs italic pb-2 animate-bounce"
        >
          {{ errorMessage }}
        </p>

        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 transform hover:scale-110 transition-all duration-300 ease-in-out shadow-lg"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>

    <section
      id="rules"
      class="py-5 px-10 mb-10 w-full sm:w-3/4 mx-auto bg-gradient-to-r from-green-300 to-blue-300 rounded shadow-2xl transform transition-all duration-700 ease-in-out opacity-0 animate-fadeInUp"
    >
      <h2 class="text-2xl font-bold text-center py-10">
        Aturan Peminjaman Barang
      </h2>
      <ul class="list list-decimal list-inside space-y-5 text-base">
        <li>Peminjam alat datang ke bagian tata usaha prodi.</li>
        <li>
          Pegawai Tata Usaha Prodi Teknologi Informasi melakukan pemeriksaan
          alat dan memberikan ijin apabila alat ada dan layak dipinjamkan.
        </li>
        <li>
          Peminjam alat mencatatkan informasi lengkap yang diperlukan untuk
          proses peminjaman.
        </li>
        <li>
          Operator mencatatkan alat dan barang yang dipinjamkan ke dalam sistem.
        </li>
        <li>
          Peminjam alat mengembalikan alat sesuai waktu yang ditentukan, pegawai
          TU memeriksa keadaan alat sebelum diterima.
        </li>
      </ul>
      <h1
        class="text-center font-bold pt-14 pb-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600"
      >
        Mohon agar aturan ini diperhatikan dengan seksama
      </h1>
    </section>
  </main>
</template>

<style scoped>
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 1s ease-in-out forwards;
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slideIn {
  animation: slideIn 1s ease-in-out forwards;
}
</style>
