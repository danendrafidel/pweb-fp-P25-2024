<template>
    <div>
      <h1 class="text-2xl font-bold mb-4">Form Peminjaman Barang</h1>
      <form class="space-y-4">
        <div>
          <label class="block text-sm font-medium">Nama Barang</label>
          <input type="text" v-model="form.namaBarang" class="input" />
        </div>
        <div>
          <label class="block text-sm font-medium">Jumlah Pinjam</label>
          <input type="number" v-model="form.jumlahPinjam" class="input" />
        </div>
        <div>
          <label class="block text-sm font-medium">Tanggal Pengembalian</label>
          <input type="date" v-model="form.tglKembali" class="input" />
        </div>
        <div>
          <label class="block text-sm font-medium">Nama Peminjam</label>
          <input type="text" v-model="form.namaPeminjam" class="input" />
        </div>
        <div>
          <label class="block text-sm font-medium">Nama Petugas</label>
          <input type="text" v-model="form.namaPetugas" class="input" />
        </div>
        <button type="submit" class="btn">Submit</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const form = ref({
    namaBarang: "",
    jumlahPinjam: "",
    tglKembali: "",
    namaPeminjam: "",
    namaPetugas: "",
  });
  </script>
  
  <style scoped>
  .input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .btn {
    padding: 0.5rem 1rem;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>
  