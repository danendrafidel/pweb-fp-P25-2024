<script setup>
import apiClient from '@/config/apiConfig';
import { ref, onMounted } from 'vue'
import AdminMenu from '@/components/AdminMenu.vue';
import Footer from '@/components/Footer.vue';
import router from '@/router';
const operators = ref([])
const totalOperator = ref(0)

async function getOperatorData() {
    const token = localStorage.getItem('authToken');
    try {
        const [userResp, sumResp] = await Promise.all([
            apiClient.get("/admin/all-operator", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            apiClient.get("/admin/all-operator/sum", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        ]);
        operators.value = userResp.data;
        totalOperator.value = sumResp.data.totalAmount;
    } catch (err) {
        console.error("Error retrieving the data")
    }
}
onMounted(getOperatorData)

function navigateToAddOperator(){
    router.push("/admin/create-operator")
}

function navigateToEditOperator(userId, username, password, role){
    router.push({
        path: `/admin/edit-operator`,
        state: { userId, username, password, role },
    });
}

async function deleteOperator(opId) {
    const token = localStorage.getItem('authToken');
    try {
        await apiClient.delete(`/admin/all-operator/delete/${opId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        operators.value = operators.value.filter(i => i.id !== opId);
        alert("Item deleted successfully.");
    } catch (err) {
        console.error("Error deleting the item:", err);
        alert("Failed to delete the item. Please try again.");
    }
}

function confirmDelete(operatorId) {
    const confirmation = confirm("Are you sure want to delete this operator?");
    if(confirmation){
        deleteOperator(operatorId)
    }else{
        alert("Delete action canceled");
    }
}

</script>
<template>
    <main>
        <div class="flex flex-col">
            <AdminMenu />
            <div class="w-3/4 mx-auto pt-10 pb-28">
                <h1 class="text-center font-bold text-3xl py-4">Data Operator</h1>
                <div class="flex flex-row justify-between py-2">
                    <p class="font-bold text-xl">Total Operator: {{ totalOperator }}</p>
                    <button @click="navigateToAddOperator"
                        class="py-2 px-4 bg-green-500 rounded-lg text-white shadow">
                        Tambah Operator
                    </button>
                </div>
                <table class="w-full table-auto border border-slate-700 bg-white shadow-md">
                    <thead class="bg-blue-500 text-white">
                        <tr>
                            <th class="px-4 py-2 border border-slate-300">No.</th>
                            <th class="px-4 py-2 border border-slate-300">Username</th>
                            <th class="px-4 py-2 border border-slate-300">Password</th>
                            <th class="px-4 py-2 border border-slate-300">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(i, index) in operators" :key="i._id">
                            <td class="px-4 max-w-10 border border-slate-300 font-bold">{{ index + 1 }}</td>
                            <td class="px-4 py-1 border border-slate-300 font-bold ">{{ i.username }}</td>
                            <td class="px-4 py-1 border border-slate-300 font-bold ">{{ i.password }}</td>
                            <td class="px-4 max-w-24 min-w-16 py-1 border border-slate-300 space-x-3">
                                <button @click="navigateToEditOperator(i._id, i.username, i.password, i.role)" class="bg-yellow-500 text-white py-1 px-5 rounded-md">Edit</button>
                                <button @click="confirmDelete(i._id)"
                                    class="bg-red-500 text-white py-1 px-5 rounded-md">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <Footer :class="'absolute bottom-0 w-full'" />
    </main>
</template>