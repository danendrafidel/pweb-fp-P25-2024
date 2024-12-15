<template>
  <DataTable :columns="columns" :data="data" />
</template>

<script>
import DataTable from "../Table.vue"; // Make sure the DataTable is a Vue component
import { ref } from "vue";

export default {
  components: {
    DataTable,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const columns = ref([
      {
        accessorKey: "item_name",
        header: "Nama Barang",
      },
      {
        accessorKey: "amount",
        header: "Jumlah Pinjam",
      },
      {
        accessorKey: "borrow_date",
        header: "Tgl. Pinjam",
        cell: (row) => new Date(row.original.borrow_date).toLocaleDateString(),
      },
      {
        accessorKey: "return_date",
        header: "Tgl. Kembali",
        cell: (row) => new Date(row.original.return_date).toLocaleDateString(),
      },
      {
        accessorKey: "borrower_name",
        header: "Peminjam",
      },
      {
        accessorKey: "officer_name",
        header: "Petugas",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (row) => {
          const status = row.original.status;
          return status === "BORROWED"
            ? `<span class="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">${status}</span>`
            : `<span class="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">${status}</span>`;
        },
      },
    ]);

    return {
      columns,
    };
  },
};
</script>
