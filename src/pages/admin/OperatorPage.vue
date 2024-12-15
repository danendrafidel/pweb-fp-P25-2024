<template>
  <div class="min-h-screen bg-gray-50">
    <AdminNav />
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Data Petugas</h1>
        <button
          @click="openModal()"
          class="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus class="w-4 h-4 mr-2" />
          Tambah Petugas
        </button>
      </div>

      <DataTable :columns="columns" :data="operators" />

      <Modal v-if="isModalOpen" @close="closeModal">
        <template #header>
          <h2 class="text-xl font-bold">
            {{ editingOperator ? "Edit Petugas" : "Tambah Petugas Baru" }}
          </h2>
        </template>
        <template #body>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Nama Petugas</label
              >
              <input
                v-model="formData.name"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Username</label
              >
              <input
                v-model="formData.username"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Password</label
              >
              <input
                v-model="formData.password"
                type="password"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </form>
        </template>
        <template #footer>
          <div class="flex justify-end space-x-3">
            <button
              @click="closeModal"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              @click="handleSubmit"
              class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              {{ editingOperator ? "Update" : "Save" }}
            </button>
          </div>
        </template>
      </Modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Plus } from 'lucide-vue';
import AdminNav from '@/components/AdminNav.vue';
import DataTable from '@/components/DataTable.vue';
import Modal from '@/components/Modal.vue';
import { useOperatorsStore } from '@/store/operatorsStore';

const { operators, addOperator, updateOperator, deleteOperator } = useOperatorsStore();
const isModalOpen = ref(false);
const editingOperator = ref(null);
const formData = ref({ name: '', username: '', password: '' });

const columns = [
  { accessorKey: 'name', header: 'Nama Petugas' },
  { accessorKey: 'username', header: 'Username' },
  {
    id: 'actions',
    cell: ({ row }: any) => (
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
    )
  }
];

function openModal() {
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
  editingOperator.value = null;
  formData.value = { name: '', username: '', password: '' };
}

function handleSubmit() {
  if (editingOperator.value) {
    updateOperator(editingOperator.value.id, formData.value);
  } else {
    addOperator(formData.value);
  }
  closeModal();
}

function handleEdit(operator: any) {
  editingOperator.value = operator;
  formData.value = {
    name: operator.name,
    username: operator.username,
    password: operator.password,
  };
  openModal();
}

function handleDelete(id: string) {
  if (confirm('Are you sure you want to delete this operator?')) {
    deleteOperator(id);
  }
}
</script>

<style scoped></style>
