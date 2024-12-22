<script setup>
import { ref } from "vue";
import apiClient from "@/config/apiConfig"; 
import Footer from "@/components/Footer.vue";
import router from "@/router";

const username = ref("");
const password = ref("");
const role = ref("operator");
const errorMessage = ref("");

async function handleFormSubmit() {
  if (!username.value || !password.value) {
    errorMessage.value = "Please fill in all fields.";
    return;
  }

  errorMessage.value = "";

  const token = localStorage.getItem("authToken");
  const request = {
    username: username.value,
    password: password.value,
    role: role.value,
  };
  console.log(request)
  try {
    await apiClient.post("/admin/all-operator/create", request, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("User added successfully!");
    router.push("/admin");
  } catch (error) {
    console.error(error);
    errorMessage.value = "An error occurred while adding the item.";
  }
}
function handleCancel(){
    router.push('/admin')
}
</script>

<template>
  <main>
    <div class="w-2/4 mx-auto py-10">
      <form
        @submit.prevent="handleFormSubmit"
        class="bg-white shadow-md rounded px-8 py-10"
      >
        <h1 class="text-2xl font-bold text-center my-5">Tambah Operator</h1>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            Nama Operator
          </label>
          <input
            v-model="username"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Nama Operator"
          />
        </div>
        <div class="flex flex-row justify-between">
          <div class="mb-4 w-2/4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              v-model="password"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="text"
              placeholder="Password"
            />
          </div>
          <div class="mb-4 w-1/4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="role"
            >
              Role
            </label>
            <input
              v-model="role"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="role"
              type="text"
              disabled
            />
          </div>
        </div>
        <p v-if="errorMessage" class="text-red-500 text-sm italic pb-2">
          {{ errorMessage }}
        </p>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Tambah
          </button>
          <button
            @click="handleCancel"
            class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </main>
  <Footer :class="'absolute bottom-0 w-full'" />
</template>
