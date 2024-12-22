<script setup>
import apiClient from "@/config/apiConfig";
import moment from "moment";
import { ref, onMounted } from "vue";
import Footer from "@/components/Footer.vue";
import OperatorMenu from "@/components/OperatorMenu.vue";

const items = ref([]);
const totalAmount = ref(0);

async function fetchItemsAndSum() {
  const token = localStorage.getItem("authToken");
  try {
    const [itemsResp, sumResp] = await Promise.all([
      apiClient.get("/summary", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      apiClient.get("/operator/equipment/sum", {
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
</script>
<template>
  <main>
    <div class="flex flex-col">
      <OperatorMenu />
      <div class="w-3/4 mx-auto pt-10 pb-28">
        <h1 class="text-center font-bold text-4xl py-4">
          Data Summary Barang Pinjam
        </h1>
        <div class="flex flex-row justify-between py-2">
          <p class="font-bold text-lg">
            Total Barang yang Dipinjam: {{ totalAmount }}
          </p>
        </div>
        <table
          class="w-full table-auto border border-slate-700 bg-white shadow-md"
        >
          <thead class="bg-blue-500 text-white">
            <tr>
              <th class="px-4 py-2 border border-slate-300">No.</th>
              <th class="px-4 py-2 border border-slate-300">Barang</th>
              <th class="px-4 py-2 border border-slate-300">Jumlah</th>
              <th class="px-4 py-2 border border-slate-300">Tanggal Pinjam</th>
              <th class="px-4 py-2 border border-slate-300">Tanggal Kembali</th>
              <th class="px-4 py-2 border border-slate-300">Peminjam</th>
              <th class="px-4 py-2 border border-slate-300">Petugas</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(i, index) in items" :key="i._id">
              <td class="px-4 max-w-10 border border-slate-300 font-bold">
                {{ index + 1 }}
              </td>
              <td class="px-4 py-1 border border-slate-300 font-bold">
                {{ i.item_id["name"] }}
              </td>
              <td
                class="px-4 py-1 border border-slate-300 font-bold text-center"
              >
                {{ i.amount }}
              </td>
              <td
                class="px-4 py-1 border border-slate-300 font-bold text-center"
              >
                {{ moment(i.borrow_date).format("YYYY-MM-DD HH:mm") }}
              </td>
              <td
                class="px-4 py-1 border border-slate-300 font-bold text-center"
              >
                {{ moment(i.return_date).format("YYYY-MM-DD HH:mm") }}
              </td>
              <td class="px-4 py-1 border border-slate-300 font-bold">
                {{ i.borrower_name }}
              </td>
              <td class="px-4 py-1 border border-slate-300 font-bold">
                {{ i.officer_name }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  </main>
</template>
