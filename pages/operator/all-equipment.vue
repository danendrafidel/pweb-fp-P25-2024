<template>
  <main class="mt-16 mx-auto pb-24 max-w-4xl">
    <h1 class="font-extrabold text-4xl text-center text-gray-800 mb-8">
      🛠️ Data Barang
    </h1>
    <div class="bg-gray-100 p-4 rounded-2xl shadow-2xl" style="border-radius: 20px; overflow: hidden;">
      <table
        class="table-auto w-full border-collapse border border-gray-200 overflow-hidden"
        style="border-radius: 16px; overflow: hidden;"
      >
        <thead>
          <tr class="bg-blue-100">
            <th class="border px-4 py-2 text-left text-gray-800">No</th>
            <th
              class="border px-4 py-2 text-left text-gray-800 cursor-pointer"
              @click="sort('namaBarang')"
            >
              Nama Barang
            </th>      
            <th class="border px-4 py-2 text-left text-gray-800">Kondisi</th>
            <th class="border px-4 py-2 text-left text-gray-800">Jumlah</th>
            <th class="border px-4 py-2 text-left text-gray-800">Tanggal Registrasi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(barang, index) in filteredItems"
            :key="index"
            class="hover:bg-blue-50 transition-colors"
          >
            <td class="border px-4 py-2 text-gray-700">{{ index + 1 }}</td>
            <td class="border px-4 py-2 text-gray-700">{{ barang.namaBarang }}</td>
            <td class="border px-4 py-2 text-gray-700">{{ barang.kondisi }}</td>
            <td class="border px-4 py-2 text-gray-700">{{ barang.jumlah }}</td>
            <td class="border px-4 py-2 text-gray-700">{{ barang.tanggalRegistrasi }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";

const items = ref([
  { namaBarang: "Laptop", kondisi: "Baik", jumlah: 10, tanggalRegistrasi: "2024-12-01" },
  { namaBarang: "Proyektor", kondisi: "Rusak", jumlah: 3, tanggalRegistrasi: "2024-12-05" },
]);

const sortBy = ref("");
const filteredItems = ref([...items.value]);

const sort = (key) => {
  if (sortBy.value === key) {
    filteredItems.value.reverse();
  } else {
    filteredItems.value = [...items.value].sort((a, b) =>
      a[key] > b[key] ? 1 : -1
    );
    sortBy.value = key;
  }
};
</script>

<style scoped>
th {
  cursor: pointer;
}
</style>
