<template>
  <main class="mt-16 mx-auto pb-24 max-w-4xl">
    <h1 class="font-extrabold text-4xl text-center text-gray-800 mb-8">
      📋 Data Peminjam Barang
    </h1>
    <div class="bg-gray-100 p-4 rounded-2xl shadow-2xl"
        style="border-radius: 20px; overflow: hidden;">
      <table 
        class="table-auto w-full border-collapse border border-gray-200 overflow-hidden"
        style="border-radius: 16px; overflow: hidden;">
        <thead>
          <tr class="bg-blue-100">
            <th class="border px-4 py-2 text-left text-gray-800">No</th>
            <th class="border px-4 py-2 text-left text-gray-800">Nama Barang</th>
            <th class="border px-4 py-2 text-left text-gray-800">Jumlah Pinjam</th>
            <th class="border px-4 py-2 text-left text-gray-800">Tgl. Pinjam</th>
            <th class="border px-4 py-2 text-left text-gray-800">Tgl. Kembali</th>
            <th class="border px-4 py-2 text-left text-gray-800">Peminjam</th>
            <th class="border px-4 py-2 text-left text-gray-800">Petugas</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(peminjam, index) in peminjamList"
            :key="index"
            class="hover:bg-blue-50 transition-colors"
          >
            <td class="border px-4 py-2 text-gray-700">{{ index + 1 }}</td>
            <td class="border px-4 py-2 text-gray-700">{{ peminjam.namaBarang }}</td>
            <td class="border px-4 py-2 text-gray-700">{{ peminjam.jumlahPinjam }}</td>
            <td class="border px-4 py-2 text-gray-700">{{ peminjam.tglPinjam }}</td>
            <td class="border px-4 py-2 text-gray-700">{{ peminjam.tglKembali }}</td>
            <td class="border px-4 py-2 text-gray-700">{{ peminjam.peminjam }}</td>
            <td class="border px-4 py-2 text-gray-700">{{ peminjam.petugas }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";

const peminjamList = ref([
  {
    namaBarang: "Laptop",
    jumlahPinjam: 2,
    tglPinjam: "2024-12-10",
    tglKembali: "2024-12-15",
    peminjam: "John Doe",
    petugas: "Jane Smith",
  },
  {
    namaBarang: "Proyektor",
    jumlahPinjam: 1,
    tglPinjam: "2024-12-11",
    tglKembali: "2024-12-16",
    peminjam: "Alice",
    petugas: "Bob",
  },
]);
</script>
