<template>
  <div class="min-h-screen bg-gray-50">
    <OperatorNav />
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Form Peminjaman</h2>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Nama Barang</label
            >
            <select
              v-model="formData.item_name"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Pilih Barang</option>
              <option v-for="item in items" :key="item.id" :value="item.name">
                {{ item.name }} (Tersedia: {{ item.amount }})
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Jumlah Pinjam</label
            >
            <input
              type="number"
              v-model.number="formData.amount"
              min="1"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Tanggal Pengembalian</label
            >
            <DatePicker
              v-model="formData.return_date"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              :min-date="new Date()"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Nama Peminjam</label
            >
            <input
              type="text"
              v-model="formData.borrower_name"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Nama Petugas</label
            >
            <input
              type="text"
              v-model="formData.officer_name"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Peminjaman
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useItemsStore } from "../../store/itemsStore";
import { useBorrowingsStore } from "../../store/borrowingsStore";
import DatePicker from "vue-datepicker";

export default {
  components: {
    OperatorNav,
    DatePicker,
  },
  data() {
    return {
      formData: {
        item_name: "",
        amount: 1,
        return_date: new Date(),
        borrower_name: "",
        officer_name: "",
      },
    };
  },
  computed: {
    items() {
      return useItemsStore().items;
    },
  },
  methods: {
    handleSubmit() {
      useBorrowingsStore().addBorrowing({
        ...this.formData,
        borrow_date: new Date(),
        status: "BORROWED",
      });

      // Reset form
      this.formData = {
        item_name: "",
        amount: 1,
        return_date: new Date(),
        borrower_name: "",
        officer_name: "",
      };

      alert("Peminjaman berhasil dicatat!");
    },
  },
};
</script>
