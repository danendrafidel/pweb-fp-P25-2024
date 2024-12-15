<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to Lab KCKS
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div
            v-if="error"
            class="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded"
          >
            {{ error }}
          </div>

          <div>
            <label
              for="username"
              class="block text-sm font-medium text-gray-700"
              >Username</label
            >
            <input
              id="username"
              v-model="formData.username"
              type="text"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
              >Password</label
            >
            <input
              id="password"
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <div class="mt-2">
              <label class="inline-flex items-center">
                <input
                  type="checkbox"
                  v-model="showPassword"
                  class="form-checkbox"
                />
                <span class="ml-2 text-sm text-gray-600">Show Password</span>
              </label>
            </div>
          </div>

          <div>
            <label for="role" class="block text-sm font-medium text-gray-700"
              >Role</label
            >
            <select
              id="role"
              v-model="formData.role"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="ADMIN">Admin</option>
              <option value="OPERATOR">Operator</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <LogIn class="w-4 h-4 mr-2" />
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";

const router = useRouter();
const authStore = useAuthStore();

const formData = ref({
  username: "",
  password: "",
  role: "ADMIN",
});
const error = ref("");
const showPassword = ref(false);

const handleSubmit = () => {
  const success = authStore.login(
    formData.value.username,
    formData.value.password,
    formData.value.role
  );

  if (success) {
    if (formData.value.role === "ADMIN") {
      router.push("/admin");
    } else if (formData.value.role === "OPERATOR") {
      router.push("/operator/book-equipment");
    }
  } else {
    error.value = "Invalid credentials. Please try again.";
  }
};
</script>

<script lang="ts">
import { LogIn } from "lucide-vue";
</script>
