<template>
  <div class="min-h-screen bg-gray-50">
    <AdminNav />
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Data Barang</h1>
        <button
          @click="isModalOpen = true"
          class="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus class="w-4 h-4 mr-2" />
          Tambah Barang
        </button>
      </div>

      <DataTable :columns="columns" :data="items" />

      <div
        v-if="isModalOpen"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div class="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 class="text-xl font-bold mb-4">
            {{ editingItem ? "Edit Barang" : "Tambah Barang Baru" }}
          </h2>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Nama Barang
              </label>
              <input
                type="text"
                v-model="formData.name"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Jumlah
              </label>
              <input
                type="number"
                v-model="formData.amount"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Kondisi
              </label>
              <input
                type="text"
                v-model="formData.condition"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div class="flex justify-end space-x-3">
              <button
                type="button"
                @click="resetForm"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                {{ editingItem ? "Update" : "Save" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Plus, Pencil, Trash2 } from 'lucide-vue';
import AdminNav from '@/components/AdminNav.vue';
import DataTable from '@/components/Table.vue';
import { useItemsStore } from '@/store/itemsStore';

const itemsStore = useItemsStore();
const items = computed(() => itemsStore.items);
const isModalOpen = ref(false);
const editingItem = ref(null);
const formData = ref({
  name: '',
  amount: 0,
  condition: '',
});

const columns = [
  { accessorKey: 'name', header: 'Nama Barang' },
  { accessorKey: 'amount', header: 'Jumlah' },
  { accessorKey: 'condition', header: 'Kondisi' },
  {
    accessorKey: 'created_at',
    header: 'Tanggal Registrasi',
    cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString(),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div class="flex space-x-2">
        <button
          @click="handleEdit(row.original)"
          class="p-2 text-blue-600 hover:text-blue-800"
        >
          <Pencil class="w-4 h-4" />
        </button>
        <button
          @click="handleDelete(row.original.id)"
          class="p-2 text-red-600 hover:text-red-800"
        >
          <Trash2 class="w-4 h-4" />
        </button>
      </div>
    ),
  },
];

const handleSubmit = () => {
  if (editingItem.value) {
    itemsStore.updateItem(editingItem.value.id, { ...formData.value });
  } else {
    itemsStore.addItem({ ...formData.value, created_at: new Date() });
  }
  resetForm();
};

const handleEdit = (item) => {
  editingItem.value = item;
  formData.value = { ...item };
  isModalOpen.value = true;
};

const handleDelete = (id) => {
  if (confirm('Are you sure you want to delete this item?')) {
    itemsStore.deleteItem(id);
  }
};

const resetForm = () => {
  isModalOpen.value = false;
  editingItem.value = null;
  formData.value = { name: '', amount: 0, condition: '' };
};
</script>
