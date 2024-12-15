<template>
  <div class="min-h-screen bg-gray-50">
    <OperatorNav />
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">Data Barang</h1>
      <DataTable :columns="columns" :data="items" />
    </div>
  </div>
</template>

<script>
import { useItemsStore } from "../../store/itemsStore";
import OperatorNav from "../../components/OperatorNav";
import DataTable from "../../components/Table";

export default {
  components: {
    OperatorNav,
    DataTable,
  },
  computed: {
    items() {
      return useItemsStore().items;
    },
    columns() {
      return [
        {
          accessorKey: "name",
          header: "Nama Barang",
        },
        {
          accessorKey: "amount",
          header: "Jumlah",
        },
        {
          accessorKey: "condition",
          header: "Kondisi",
        },
        {
          accessorKey: "created_at",
          header: "Tanggal Registrasi",
          cell: (row) => new Date(row.created_at).toLocaleDateString(),
        },
      ];
    },
  },
};
</script>
