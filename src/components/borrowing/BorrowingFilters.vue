<template>
  <div class="bg-white p-4 rounded-lg shadow mb-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Start Date Picker -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Start Date
        </label>
        <DatePicker
          v-model="startDate"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Select start date"
        />
      </div>

      <!-- End Date Picker -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          End Date
        </label>
        <DatePicker
          v-model="endDate"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Select end date"
        />
      </div>

      <!-- Borrower Input -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Search Borrower
        </label>
        <input
          v-model="selectedBorrower"
          type="text"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Enter borrower name"
        />
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/dist/vue-datepicker-next.css";

export default {
  components: {
    DatePicker,
  },
  props: {
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
    selectedBorrower: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      // Using local reactive data for binding
      startDate: this.startDate,
      endDate: this.endDate,
      selectedBorrower: this.selectedBorrower,
    };
  },
  watch: {
    // Watch changes to sync with parent
    startDate(newVal) {
      this.$emit("update:startDate", newVal);
    },
    endDate(newVal) {
      this.$emit("update:endDate", newVal);
    },
    selectedBorrower(newVal) {
      this.$emit("update:selectedBorrower", newVal);
    },
  },
};
</script>
