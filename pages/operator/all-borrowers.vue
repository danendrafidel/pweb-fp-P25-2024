<template>
  <main class="mt-16 mx-auto pb-24 max-w-4xl">
    <h1 class="font-extrabold text-4xl text-center text-gray-800 mb-8">
      📋 Data Peminjam Barang
    </h1>

    <!-- Dropdown Sort-->
    <div class="flex justify-between mb-5">
      <button
          @click="toggleSortMenu"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            class="w-4 h-4 mr-2"
          >
            <path
              d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8L32 224c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8l256 0c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"
              :class="sortOrder === 'asc' ? 'fill-blue-200' : 'fill-gray-200'"
            />
          </svg>
          Sort
      </button>
      <div v-if="showSortMenu" class="absolute bg-white border rounded-lg shadow-lg mt-12 z-10">
        <div class="p-4">
          <p class="font-bold text-gray-700 mb-2">Sort By:</p>
          <ul>
            <li
              v-for="option in sortOptions"
              :key="option.key"
              class="cursor-pointer py-1 hover:bg-gray-200 transition-colors duration-200 ease-in-out rounded-lg"
              @click="setSortKey(option.key)"
            >
              <span :class="{'text-blue-500': sortKey === option.key}" class="flex items-center">
                <!-- Dot Indicator -->
                <span v-if="sortKey === option.key" class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                {{ option.label }}
              </span>
            </li>
          </ul>
          <hr class="my-2 border-gray-300" />
          <div>
            <ul class="space-y-2">
              <li
                class="cursor-pointer py-1 hover:bg-gray-200 transition-colors duration-200 ease-in-out rounded-lg"
                @click="setSortOrder('asc')"
                @mouseenter="showTooltip('Mengurutkan item dengan nilai terkecil di atas.')"
                @mouseleave="hideTooltip"
              >
                <span class="flex items-center">
                  <span
                    v-if="sortOrder === 'asc'"
                    class="w-2 h-2 bg-blue-500 rounded-full mr-2"
                  ></span>
                  Ascending
                </span>
              </li>
              <li
                class="cursor-pointer py-1 hover:bg-gray-200 transition-colors duration-200 ease-in-out rounded-lg"
                @click="setSortOrder('desc')"
                @mouseenter="showTooltip('Mengurutkan item dengan nilai terbesar di atas.')"
                @mouseleave="hideTooltip"
              >
                <span class="flex items-center">
                  <span
                    v-if="sortOrder === 'desc'"
                    class="w-2 h-2 bg-blue-500 rounded-full mr-2"
                  ></span>
                  Descending
                </span>
              </li>
            </ul>
          </div>
          <button
            @click="applySort"
            class="bg-blue-600 text-white mt-2 py-2 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:bg-blue-800 hover:scale-110 hover:ring-4 hover:ring-blue-500 hover:ring-opacity-50 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Apply
          </button>
        </div>
      </div>
    </div>

  <!-- Tooltip for Ascending and Descending -->
    <div
      v-if="tooltip"
      class="absolute bg-gray-500 text-white p-2 rounded-lg text-sm mt-1 z-20 transition-opacity duration-500 opacity-0 shadow-lg"
      :class="{'opacity-100': tooltipVisible}"
    >
      {{ tooltip }}
    </div>

    <!-- Tabel -->
    <div class="bg-gray-100 p-4 rounded-2xl shadow-2xl" style="border-radius: 20px; overflow: hidden;">
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
            v-for="(peminjam, index) in sortedPeminjamList"
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
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// Data peminjam
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
  {
    namaBarang: "Proyektor",
    jumlahPinjam: 1,
    tglPinjam: "2024-12-08",
    tglKembali: "2024-12-14",
    peminjam: "Eko",
    petugas: "Bob",
  },
]);

// Sort state
const showSortMenu = ref(false);
const sortKey = ref("");
const sortOrder = ref("asc");

// Opsi sorting
const sortOptions = [
  { key: "namaBarang", label: "Nama Barang" },
  { key: "jumlahPinjam", label: "Jumlah Pinjam" },
  { key: "tglPinjam", label: "Tgl. Pinjam" },
  { key: "tglKembali", label: "Tgl. Kembali" },
  { key: "peminjam", label: "Peminjam" },
];

const tooltip = ref("");
const tooltipVisible = ref(false);
let tooltipTimeout;

// Fungsi untuk membuka/tutup menu
const toggleSortMenu = () => {
  showSortMenu.value = !showSortMenu.value;
};

// Fungsi untuk memilih key sort
const setSortKey = (key) => {
  sortKey.value = key;
};

// Fungsi untuk memilih order sort
const setSortOrder = (order) => {
  sortOrder.value = order;
};

// Fungsi untuk apply sorting
const applySort = () => {
  showSortMenu.value = false; // Tutup menu setelah apply
};

const showTooltip = (text) => {
  tooltipTimeout = setTimeout(() => {
    tooltip.value = text;
    tooltipVisible.value = true;
  }, 800);
};

const hideTooltip = () => {
  clearTimeout(tooltipTimeout);
  tooltipVisible.value = false;
};

// Data yang sudah disortir
const sortedPeminjamList = computed(() => {
  if (!sortKey.value) return peminjamList.value;
  return [...peminjamList.value].sort((a, b) => {
    const order = sortOrder.value === "asc" ? 1 : -1;
    if (a[sortKey.value] < b[sortKey.value]) return -1 * order;
    if (a[sortKey.value] > b[sortKey.value]) return 1 * order;
    return 0;
  });
});

onMounted(() => {
  const newPeminjam = route.query;
  if (newPeminjam && newPeminjam.namaBarang) {
    peminjamList.value.push({
      namaBarang: newPeminjam.namaBarang,
      jumlahPinjam: newPeminjam.jumlahPinjam,
      tglPinjam: newPeminjam.tglPinjam,
      tglKembali: newPeminjam.tglKembali,
      peminjam: newPeminjam.peminjam,
      petugas: newPeminjam.petugas,
    });
  }
});

</script>
