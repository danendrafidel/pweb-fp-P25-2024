<template>
  <footer class="bg-gray-800 text-white py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-lg font-semibold mb-4">Lab KCKS</h3>
          <p class="text-gray-400">
            Sistem Manajemen Peminjaman Barang untuk memudahkan tracking
            peminjaman peralatan laboratorium.
          </p>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Kontak</h3>
          <p class="text-gray-400">
            Email: lab.kcks@its.ac.id<br />
            Telepon: (021) 123-4567<br />
            Alamat: Tower 2 Lt. 9
          </p>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Jam Operasional</h3>
          <p class="text-gray-400">
            Senin - Jumat: 08:00 - 16:00<br />
            Sabtu: 09:00 - 13:00<br />
            Minggu: Tutup
          </p>
        </div>
      </div>
      <div class="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
        <p>&copy; {{ currentYear }} Lab KCKS. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>
