<template>
  <div class="min-h-screen bg-gray-50">
    <AdminNav />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Data Peminjaman</h1>
        <button
          @click="handleDownloadPDF"
          class="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <DownloadIcon class="w-4 h-4 mr-2" />
          Download PDF
        </button>
      </div>

      <BorrowingFilters
        :startDate="startDate"
        :endDate="endDate"
        :selectedBorrower="selectedBorrower"
        @startDateChange="setStartDate"
        @endDateChange="setEndDate"
        @borrowerChange="setSelectedBorrower"
      />

      <div ref="tableRef">
        <BorrowingTable :data="filteredBorrowings" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { usePDF } from "@vue-pdf";
import AdminNav from "@/components/AdminNav.vue";
import BorrowingFilters from "@/components/borrowing/BorrowingFilters.vue";
import BorrowingTable from "@/components/borrowing/BorrowingTable.vue";
import DownloadIcon from "@/components/icons/DownloadIcon.vue";
import { useBorrowingsStore } from "@/store/borrowingsStore";

const tableRef = ref(null);
const startDate = ref(null);
const endDate = ref(null);
const selectedBorrower = ref("");
const { borrowings } = useBorrowingsStore();
const { toPDF } = usePDF();

const filteredBorrowings = computed(() => {
  return borrowings.value.filter((borrowing) => {
    const matchesDateRange =
      (!startDate.value ||
        new Date(borrowing.borrow_date) >= startDate.value) &&
      (!endDate.value || new Date(borrowing.borrow_date) <= endDate.value);

    const matchesBorrower =
      !selectedBorrower.value ||
      borrowing.borrower_name
        .toLowerCase()
        .includes(selectedBorrower.value.toLowerCase());

    return matchesDateRange && matchesBorrower;
  });
});

const handleDownloadPDF = async () => {
  if (tableRef.value) {
    try {
      await toPDF(tableRef.value, {
        filename: "borrowing-summary.pdf",
        page: { margin: 20 },
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  }
};

const setStartDate = (value) => {
  startDate.value = value;
};

const setEndDate = (value) => {
  endDate.value = value;
};

const setSelectedBorrower = (value) => {
  selectedBorrower.value = value;
};
</script>
