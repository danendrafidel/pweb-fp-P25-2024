<script setup>
import { ref, onMounted } from "vue";
import apiClient from "@/config/apiConfig"; // Replace with your actual API client
import Footer from "@/components/Footer.vue";
import OperatorMenu from "@/components/OperatorMenu.vue";

const itemsRef = ref({});
const errorMessage = ref("");

const amount = ref("");
const selectedBarang = ref("");
const return_date = ref("");
const borrower_name = ref("")
const officer_name = ref(localStorage.getItem("username"));

onMounted(getAllItems);

async function getAllItems() {
  const token = localStorage.getItem("authToken");
  try {
    const itemsResp = await apiClient.get("/operator/items", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    itemsRef.value = itemsResp.data;
  } catch (err) {
    console.error("Error retrieving the data");
  }
}

async function handleFormSubmit() {
  errorMessage.value = "";
  if (!amount.value || !borrower_name.value || !selectedBarang.value || !return_date.value) {
    errorMessage.value = "Please fill in all fields.";
    return;
  }

  if (amount.value < 1) {
    errorMessage.value = "Item must be bigger than 0.";
    return;
  }

  const token = localStorage.getItem("authToken");

  const request = {
    item_id: selectedBarang.value,
    amount: amount.value,
    return_date: return_date.value,
    borrower_name: borrower_name.value,
    officer_name: officer_name.value
  };

  try {
    await apiClient.post("/operator/book-equipment", request, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Borrow unit added successfully!");

    amount.value = "";
    selectedBarang.value = "";
    return_date.value = "";
    borrower_name.value = ""

  } catch (error) {
    if(!error.response.data["message"]){
        errorMessage.value = "An error occurred while adding the data.";
    }
    errorMessage.value = error.response.data["message"];
  }
}
</script>

<template>
  <main>
    <OperatorMenu />
    <div class="w-2/4 mx-auto py-10">
      <form
        @submit.prevent="handleFormSubmit"
        class="bg-white shadow-md rounded px-8 py-10"
      >
        <h1 class="text-2xl font-bold text-center my-5">
          Form Peminjam Barang
        </h1>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="item">
            Nama Barang
          </label>
          <select
            v-model="selectedBarang"
            class="w-2/4 bg-slate-50 border border-gray-500 rounded"
            id="item"
            name="item"
            size="3"
          >
            <option
              class="border space-y-2 p-2"
              v-for="obj in itemsRef"
              :key="obj._id"
              :value="obj._id"
            >
              {{ obj.name }} - {{ obj.condition }}
            </option>
          </select>
          <input
            disabled
            v-model="selectedBarang"
            class="shadow appearance-none border w-3/4 rounded py-2 my-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="selectedItem"
            type="text"
            placeholder="Selected Item Id"
          />
        </div>
        <div class="flex flex-row justify-between">
          <div class="mb-4 w-2/5">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="amount"
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
            />
          </div>
          <div class="mb-4 w-2/4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="return_date"
            >
              Tanggal Pengembalian
            </label>
            <input
              v-model="return_date"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="amount"
              type="datetime-local"
            />
          </div>
        </div>
        <div class="flex flex-row justify-between">
          <div class="mb-4 w-2/5">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="borrower_name"
            >
              Peminjam
            </label>
            <input
              v-model="borrower_name"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="amount"
              type="text"
              placeholder="Nama Peminjam"
            />
          </div>
          <div class="mb-4 w-2/4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="officer_name"
            >
              Petugas
            </label>
            <input
              v-model="officer_name"
              disabled
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="amount"
              type="text"
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
        </div>
      </form>
    </div>
  </main>
  <Footer />
</template>
