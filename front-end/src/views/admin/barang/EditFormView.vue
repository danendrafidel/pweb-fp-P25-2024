<script setup>
import { ref, onMounted } from "vue";
import apiClient from "@/config/apiConfig";
import Footer from "@/components/Footer.vue";
import router from "@/router";
import { useRoute } from "vue-router";

const route = useRoute();

const name = ref(route.query.name);
const amount = ref(route.query.amount);
const selectedCondition = ref(route.query.condition);

const errorMessage = ref("");

async function handleFormSubmit() {
  if (!name.value || !amount.value || !selectedCondition.value) {
    errorMessage.value = "Please fill in all fields.";
    return;
  }

  if (amount.value < 1) {
    errorMessage.value = "Item must be bigger than 0.";
    return;
  }

  errorMessage.value = "";

  const token = localStorage.getItem("authToken");
  const request = {
    name: name.value,
    amount: amount.value,
    condition: selectedCondition.value,
  };

  try {
    await apiClient.put(`/admin/update/${route.query.itemId}`, request, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Item updated successfully!");
    router.push("/admin");
  } catch (error) {
    console.error(error);
    errorMessage.value = "An error occurred while editing the item.";
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
        <h1 class="text-2xl font-bold text-center my-5">Edit Barang</h1>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            Nama Barang
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Nama Barang"
            v-model="name"
          />
        </div>
        <div class="flex flex-row justify-between">
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Jumlah
            </label>
            <input
              v-model="amount"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="amount"
              type="number"
              placeholder="1"
              min="1"
              value=""
            />
          </div>
          <div class="mb-4 w-2/4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="role"
            >
              Kondisi
            </label>
            <select
              class="min-w-36 bg-slate-50 p-2 border border-gray-300 rounded"
              id="condition"
              name="condition"
              v-model="selectedCondition"
            >
              <option>Baik</option>
              <option>Rusak</option>
            </select>
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
