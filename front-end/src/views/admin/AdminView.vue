<script setup>
import apiClient from '@/config/apiConfig';
import moment from 'moment';
import { ref, onMounted } from 'vue'
import AdminMenu from '@/components/AdminMenu.vue';
import Footer from '@/components/Footer.vue';
import router from '@/router';

const items = ref([])
const totalAmount = ref(0)

async function fetchItemsAndSum() {
    const token = localStorage.getItem('authToken');
    try {
        const [itemsResp, sumResp] = await Promise.all([
            apiClient.get("/admin/all-equipment", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            apiClient.get("/admin/all-equipment/sum", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        ]);
        items.value = itemsResp.data;
        totalAmount.value = sumResp.data.totalAmount;
    } catch (err) {
        console.error("Error retrieving the data:", err);
    }
}

onMounted(fetchItemsAndSum)

async function deleteItem(itemId) {
    const token = localStorage.getItem('authToken');
    try {
        await apiClient.delete(`/admin/delete/${itemId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        items.value = items.value.filter(item => item.id !== itemId);
        alert("Item deleted successfully.");
    } catch (err) {
        console.error("Error deleting the item:", err);
        alert("Failed to delete the item. Please try again.");
    }
}

function confirmDelete(itemId){
    const confirmation = confirm("Are you sure want to delete this item?");
    if(confirmation){
        deleteItem(itemId)
    }else{
        alert("Delete action canceled");
    }
}

function navigateToCreateBarang() {
    router.push('/admin/create-barang');
}

function navigateToEditBarang(itemId, name, amount, condition){
    router.push(
    {
        path:`/admin/edit-barang`,
        query: {itemId,name, amount, condition}
    })
}

</script>
<template>
    <main>
        <div class="flex flex-col">
            <AdminMenu />
            <div class="w-3/4 mx-auto pt-10 pb-28">
                <h1 class="text-center font-bold text-4xl py-4">Data Barang</h1>
                <div class="flex flex-row justify-between py-2">
                    <p class="font-bold text-xl">Total Barang: {{ totalAmount }}</p>
                    <button @click="navigateToCreateBarang"
                        class="py-2 px-4 bg-green-500 rounded-lg text-white shadow">
                        Tambah Barang
                    </button>
                </div>
                <table class="w-full table-auto border border-slate-700 bg-white shadow-md">
                    <thead class="bg-blue-500 text-white">
                        <tr>
                            <th class="px-4 py-2 border border-slate-300">No.</th>
                            <th class="px-4 py-2 border border-slate-300">Barang</th>
                            <th class="px-4 py-2 border border-slate-300">Jumlah</th>
                            <th class="px-4 py-2 border border-slate-300">Kondisi</th>
                            <th class="px-4 py-2 border border-slate-300">Registrasi Barang</th>
                            <th class="px-4 py-2 border border-slate-300">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(i, index) in items" :key="i._id">
                            <td class="px-4 max-w-10 border border-slate-300 font-bold">{{ index + 1 }}</td>
                            <td class="px-4 py-1 border border-slate-300 font-bold">{{ i.name }}</td>
                            <td class="px-4 py-1 border border-slate-300 font-bold text-center">{{ i.amount }}</td>
                            <td class="px-4 py-1 border border-slate-300 font-bold" :class="{
                                'text-green-500': i.condition === 'Baik',
                                'text-red-500': i.condition === 'Rusak'
                            }">{{ i.condition }}</td>
                            <td class="px-4 py-1 border border-slate-300 font-bold text-center">{{
                                moment(i.created_at).format('YYYY-MM-DD') }}</td>
                            <td class="px-4 max-w-32 min-w-16 py-1 border border-slate-300 space-x-3">
                                <button @click="navigateToEditBarang(i._id, i.name, i.amount, i.condition)" class="bg-yellow-500 text-white py-1 px-5 rounded-md">Edit</button>
                                <button @click="confirmDelete(i._id)" class="bg-red-500 text-white py-1 px-5 rounded-md">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    </main>
</template>