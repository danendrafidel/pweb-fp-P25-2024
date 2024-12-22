<script setup>
import apiClient from "@/config/apiConfig";
import moment from "moment";
import { ref, onMounted } from "vue";
import AdminMenu from "@/components/AdminMenu.vue";
import Footer from "@/components/Footer.vue";
import router from "@/router";

const items = ref([]);
const totalAmount = ref(0);

async function fetchItemsAndSum() {
  const token = localStorage.getItem("authToken");
  try {
    const [itemsResp, sumResp] = await Promise.all([
      apiClient.get("/admin/all-equipment", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      apiClient.get("/admin/all-equipment/sum", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ]);
    items.value = itemsResp.data;
    totalAmount.value = sumResp.data.totalAmount;
  } catch (err) {
    console.error("Error retrieving the data:", err);
  }
}

onMounted(fetchItemsAndSum);

async function deleteItem(itemId) {
  const token = localStorage.getItem("authToken");
  try {
    await apiClient.delete(`/admin/delete/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    items.value = items.value.filter((item) => item.id !== itemId);
    alert("Item deleted successfully.");
  } catch (err) {
    console.error("Error deleting the item:", err);
    alert("Failed to delete the item. Please try again.");
  }
}

function confirmDelete(itemId) {
  const confirmation = confirm("Are you sure want to delete this item?");
  if (confirmation) {
    deleteItem(itemId);
  } else {
    alert("Delete action canceled");
  }
}

function navigateToCreateBarang() {
  router.push("/admin/create-barang");
}

function navigateToEditBarang(itemId, name, amount, condition) {
  router.push({
    path: `/admin/edit-barang`,
    query: { itemId, name, amount, condition },
  });
}
</script>

<template>
  <main>
    <div class="flex flex-col">
      <AdminMenu />
      <div class="w-3/4 mx-auto pt-10 pb-28">
        <h1 class="text-center font-extrabold text-4xl py-4 text-blue-600">
          Data Barang
        </h1>
        <div class="flex flex-row justify-between py-2">
          <p class="font-bold text-xl text-blue-500">
            Total Barang: {{ totalAmount }}
          </p>
          <button
            @click="navigateToCreateBarang"
            class="py-3 px-6 font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            Tambah Barang
          </button>
        </div>
        <table
          class="w-full table-auto border border-slate-700 bg-white shadow-md rounded-lg overflow-hidden"
        >
          <thead class="bg-blue-600 text-white">
            <tr>
              <th class="px-6 py-3 text-left">No.</th>
              <th class="px-6 py-3 text-left">Barang</th>
              <th class="px-6 py-3 text-left">Jumlah</th>
              <th class="px-6 py-3 text-left">Kondisi</th>
              <th class="px-6 py-3 text-left">Registrasi Barang</th>
              <th class="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(i, index) in items"
              :key="i._id"
              class="hover:bg-blue-50 transition duration-300"
            >
              <td class="px-6 py-3 font-semibold border-b border-slate-300">
                {{ index + 1 }}
              </td>
              <td class="px-6 py-3 font-semibold border-b border-slate-300">
                {{ i.name }}
              </td>
              <td
                class="px-6 py-3 font-semibold border-b border-slate-300 text-center"
              >
                {{ i.amount }}
              </td>
              <td
                class="px-6 py-3 border-b border-slate-300"
                :class="{
                  'text-green-500 font-bold': i.condition === 'Baik',
                  'text-red-500 font-bold': i.condition === 'Rusak',
                }"
              >
                {{ i.condition }}
              </td>
              <td
                class="px-6 py-3 font-semibold border-b border-slate-300 text-center"
              >
                {{ moment(i.created_at).format("YYYY-MM-DD") }}
              </td>
              <td
                class="px-6 py-3 border-b border-slate-300 flex justify-start space-x-3"
              >
                <button
                  @click="
                    navigateToEditBarang(i._id, i.name, i.amount, i.condition)
                  "
                  class="bg-yellow-500 text-white py-2 px-4 font-bold rounded-md transform transition duration-300 hover:scale-105 hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  @click="confirmDelete(i._id)"
                  class="bg-red-500 text-white py-2 px-4 font-bold rounded-md transform transition duration-300 hover:scale-105 hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  </main>
</template>

<style scoped>
table {
  border-spacing: 0;
  width: 100%;
  background-color: #fff;
}

thead th {
  padding: 12px 16px;
  text-align: left;
  background-color: #4f86f5;
}

tbody tr {
  transition: background-color 0.3s ease;
}

tbody tr:hover {
  background-color: #f0f9ff;
}

button {
  transition: transform 0.3s ease, background-color 0.3s ease,
    box-shadow 0.3s ease;
}

button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

button:hover:bg-yellow-600 {
  background-color: #eab308;
}

button:hover:bg-red-600 {
  background-color: #e11d48;
}

button.bg-gradient-to-r {
  background: linear-gradient(45deg, #3b82f6, #6366f1);
}

button:hover:scale-105 {
  transform: scale(1.05);
}

footer {
  background-color: #4f86f5;
  padding: 20px;
  color: white;
  text-align: center;
}
</style>
