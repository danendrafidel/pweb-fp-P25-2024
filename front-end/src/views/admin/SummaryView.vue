<script setup>
import apiClient from '@/config/apiConfig';
import moment from 'moment';
import { ref, onMounted } from 'vue'
import AdminMenu from '@/components/AdminMenu.vue';
import Footer from '@/components/Footer.vue';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const items = ref([])

onMounted(async () => {
    const token = localStorage.getItem('authToken');
    try {
        const resp = await apiClient.get("/summary", {
            headers: {
                Authorization: `Bearer${token}`,
            }
        });
        items.value = resp.data
    } catch (err) {
        console.error("Error retrieving the data")
    }
})

function exportToPDF(){
    const doc = new jsPDF();

    const table = document.getElementById('pdf-printable');
    doc.autoTable({html:table});

    doc.save('summary.pdf')
}
</script>
<template>
    <main>
        <div class="flex flex-col">
            <AdminMenu />
            <div class="w-3/4 mx-auto pt-10 pb-28">
                    <h1 class="text-center font-bold text-3xl py-4">Peminjaman Barang Summary</h1>
                    <table id="pdf-printable" class="w-full table-auto border border-slate-700 bg-white shadow-md">
                        <thead class="bg-blue-500 text-white">
                            <tr>
                                <th class="px-4 py-2 border border-slate-300">No.</th>
                                <th class="px-4 py-2 border border-slate-300">Barang</th>
                                <th class="px-4 py-2 border border-slate-300">Jumlah</th>
                                <th class="px-4 py-2 border border-slate-300">Tanggal Pinjam</th>
                                <th class="px-4 py-2 border border-slate-300">Tanggal Kembali</th>
                                <th class="px-4 py-2 border border-slate-300">Peminjam</th>
                                <th class="px-4 py-2 border border-slate-300">Petugas</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(i, index) in items" :key="i._id">
                                <td class="px-4 max-w-10 border border-slate-300 font-bold">{{ index + 1 }}</td>
                                <td class="px-4 py-1 border border-slate-300 font-bold">{{ i.item_id["name"] }}</td>
                                <td class="px-4 py-1 border border-slate-300 font-bold text-center">{{ i.amount }}</td>
                                <td class="px-4 py-1 border border-slate-300 font-bold text-center">{{
                                    moment(i.borrow_date).format('YYYY-MM-DD') }}</td>
                                <td class="px-4 py-1 border border-slate-300 font-bold text-center">{{
                                    moment(i.return_date).format('YYYY-MM-DD') }}</td>
                                <td class="px-4 py-1 border border-slate-300 font-bold">
                                    {{ i.borrower_name }}
                                </td>
                                <td class="px-4 py-1 border border-slate-300 font-bold">{{ i.officer_name }}</td>
                            </tr>
                        </tbody>
                    </table>

                <button
                    @click="exportToPDF()"
                    class="mt-5 py-2 px-3 bg-green-500 rounded-xl text-white font-semibold shadow-xl hover:bg-green-700">Cetak
                    PDF</button>

            </div>
        </div>
    </main>
    <Footer :class="'absolute bottom-0 w-full'" />
</template>