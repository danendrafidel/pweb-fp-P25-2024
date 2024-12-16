<template>
    <div>
      <h1 class="text-2xl font-bold mb-4">Data Barang</h1>
      <table class="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th class="border px-4 py-2">No</th>
            <th class="border px-4 py-2 cursor-pointer" @click="sort('namaBarang')">Nama Barang</th>
            <th class="border px-4 py-2">Kondisi</th>
            <th class="border px-4 py-2">Jumlah</th>
            <th class="border px-4 py-2">Tanggal Registrasi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(barang, index) in filteredItems" :key="index">
            <td class="border px-4 py-2">{{ index + 1 }}</td>
            <td class="border px-4 py-2">{{ barang.namaBarang }}</td>
            <td class="border px-4 py-2">{{ barang.kondisi }}</td>
            <td class="border px-4 py-2">{{ barang.jumlah }}</td>
            <td class="border px-4 py-2">{{ barang.tanggalRegistrasi }}</td>
          </tr>
        </tbody>
      </table>
    </div>
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
  