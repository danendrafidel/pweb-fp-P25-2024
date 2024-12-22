<script setup>
import { ref, onMounted } from "vue";
import apiClient from "@/config/apiConfig";
import Footer from "@/components/Footer.vue";
import router from "@/router";

const userIdRef = ref("")
const usernameRef = ref("");
const passwordRef = ref("");
const roleRef = ref("operator");
const errorMessage = ref("");

onMounted(() => {
  const { userId, username, password, role } = history.state;
  if (userId) {
    userIdRef.value = userId;
    usernameRef.value = username;
    passwordRef.value = password;
    roleRef.value = role || "operator";
  } else {
    console.error("No operator data found in session storage");
  }
});

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

  try {
    await apiClient.put(
      `/admin/all-operator/update/${userIdRef.value}`,
      request,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("User updated successfully!");
    router.push("/admin");
  } catch (error) {
    console.error(error);
    errorMessage.value = "An error occurred while editing user.";
  }
}

function handleCancel() {
  router.push("/admin");
}
</script>

<template>
  <main>
    <div class="w-2/4 mx-auto py-10">
      <form
        @submit.prevent="handleFormSubmit"
        class="bg-white shadow-md rounded px-8 py-10"
      >
        <h1 class="text-2xl font-bold text-center my-5">Edit Operator</h1>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            Nama Operator
          </label>
          <input
            v-model="usernameRef"
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
              v-model="passwordRef"
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
              v-model="roleRef"
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
            Edit
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
