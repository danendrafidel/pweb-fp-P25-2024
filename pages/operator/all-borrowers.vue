<template>
    <div>
      <h1 class="text-2xl font-bold mb-4">Data Peminjam</h1>
      <table class="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th class="border px-4 py-2">No</th>
            <th class="border px-4 py-2">Nama Barang</th>
            <th class="border px-4 py-2">Jumlah Pinjam</th>
            <th class="border px-4 py-2">Tgl. Pinjam</th>
            <th class="border px-4 py-2">Tgl. Kembali</th>
            <th class="border px-4 py-2">Peminjam</th>
            <th class="border px-4 py-2">Petugas</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(peminjam, index) in peminjamList" :key="index">
            <td class="border px-4 py-2">{{ index + 1 }}</td>
            <td class="border px-4 py-2">{{ peminjam.namaBarang }}</td>
            <td class="border px-4 py-2">{{ peminjam.jumlahPinjam }}</td>
            <td class="border px-4 py-2">{{ peminjam.tglPinjam }}</td>
            <td class="border px-4 py-2">{{ peminjam.tglKembali }}</td>
            <td class="border px-4 py-2">{{ peminjam.peminjam }}</td>
            <td class="border px-4 py-2">{{ peminjam.petugas }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  const peminjamList = ref([
    {
      namaBarang: "Laptop",
      jumlahPinjam: 2,
      tglPinjam: "2024-12-10",
      tglKembali: "2024-12-15",
      peminjam: "John Doe",
      petugas: "Jane Smith",
    },
  ]);
  </script>
  