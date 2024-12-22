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
      apiClient.get("/operator/equipment", {
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
      <div class="w-11/12 mx-auto pt-10 pb-28">
        <h1
          class="text-center font-bold text-4xl py-4 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600"
        >
          Data Barang Pinjam
        </h1>
        <div class="flex flex-row justify-between py-2">
          <p class="font-bold text-lg">
            Total Barang yang Dipinjam: {{ totalAmount }}
          </p>
        </div>
        <table
          class="w-full table-auto border-collapse bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <thead class="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
            <tr>
              <th class="px-6 py-3 border-b-2 border-slate-300">No.</th>
              <th class="px-6 py-3 border-b-2 border-slate-300">Barang</th>
              <th class="px-6 py-3 border-b-2 border-slate-300">Jumlah</th>
              <th class="px-6 py-3 border-b-2 border-slate-300">Kondisi</th>
              <th class="px-6 py-3 border-b-2 border-slate-300">
                *Tanggal Barang Teregistrasi
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(i, index) in items"
              :key="i._id"
              class="transition-all duration-300 hover:bg-blue-100 hover:shadow-lg"
            >
              <td class="px-6 py-3 text-center border-b border-slate-300">
                {{ index + 1 }}
              </td>
              <td class="px-6 py-3 border-b border-slate-300">
                {{ i.itemName }}
              </td>
              <td class="px-6 py-3 text-center border-b border-slate-300">
                {{ i.totalAmount }}
              </td>
              <td
                class="px-6 py-3 border-b border-slate-300 text-center"
                :class="{
                  'text-green-500': i.condition === 'Baik',
                  'text-red-500': i.condition === 'Rusak',
                  'text-yellow-500': i.condition === 'Rusak Ringan',
                }"
              >
                {{ i.condition }}
              </td>
              <td class="px-6 py-3 text-center border-b border-slate-300">
                {{ moment(i.registered_at).format("YYYY-MM-DD HH:mm") }}
              </td>
            </tr>
          </tbody>
        </table>
        <p class="pt-3 font-bold text-lg">*Keterangan:</p>
        <p class="text-sm p-2">
          Tanggal barang teregistrasi merupakan tanggal dimana barang tersebut
          pertama kali tercatat ke dalam sistem, bukan tanggal barang tersebut
          dipinjamkan.
        </p>
      </div>
      <Footer :class="'absolute w-full bottom-0'" />
    </div>
  </main>
</template>

<style scoped>
tr:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2.5rem;
  text-align: center;
  font-weight: bold;
  letter-spacing: 1px;
  transition: all 0.3s ease-in-out;
}

h1:hover {
  transform: scale(1.1);
}

table th,
table td {
  padding: 1rem;
  text-align: left;
  border: 1px solid #e5e7eb;
}

table {
  width: 100%;
  border-collapse: collapse;
}

@media (max-width: 768px) {
  table th,
  table td {
    padding: 0.5rem;
  }

  table th {
    font-size: 0.9rem;
  }

  table td {
    font-size: 0.8rem;
  }
}
</style>
