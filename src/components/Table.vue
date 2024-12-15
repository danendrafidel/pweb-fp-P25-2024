<template>
  <div class="rounded-md border">
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b bg-gray-50">
          <th class="px-4 py-3 text-left font-medium text-gray-500">No</th>
          <th
            v-for="(header, index) in headers"
            :key="header.id"
            class="px-4 py-3 text-left font-medium text-gray-500"
          >
            <div
              class="flex items-center space-x-2"
              @click="handleSorting(header)"
              :class="{
                'cursor-pointer select-none': header.canSort,
              }"
            >
              {{ header.header }}
              <ArrowUpDown v-if="header.canSort" class="h-4 w-4" />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in sortedRows"
          :key="row.id"
          class="border-b"
        >
          <td class="px-4 py-3">{{ rowIndex + 1 }}</td>
          <td
            v-for="(cell, cellIndex) in row.cells"
            :key="cell.id"
            class="px-4 py-3"
          >
            {{ cell.value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ArrowUpDown } from "lucide-vue";

export default {
  components: {
    ArrowUpDown,
  },
  props: {
    columns: Array,
    data: Array,
  },
  data() {
    return {
      sorting: [],
    };
  },
  computed: {
    headers() {
      return this.columns.map((column) => ({
        ...column,
        canSort: !!column.sortable,
      }));
    },
    sortedRows() {
      let sortedData = [...this.data];
      this.sorting.forEach((sort) => {
        sortedData = sortedData.sort((a, b) => {
          const valA = a[sort.id];
          const valB = b[sort.id];
          if (valA < valB) return sort.desc ? 1 : -1;
          if (valA > valB) return sort.desc ? -1 : 1;
          return 0;
        });
      });
      return sortedData.map((row) => ({
        ...row,
        cells: this.columns.map((col) => ({
          value: row[col.id],
          column: col,
        })),
      }));
    },
  },
  methods: {
    handleSorting(header) {
      if (!header.canSort) return;

      const index = this.sorting.findIndex((sort) => sort.id === header.id);
      if (index === -1) {
        this.sorting.push({ id: header.id, desc: false });
      } else {
        this.sorting[index].desc = !this.sorting[index].desc;
      }
    },
  },
};
</script>
