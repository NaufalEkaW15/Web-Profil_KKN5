# Web-Profil_KKN5
Web ini menjadi Program Kerja dari kami Kelompok 5 Universitas Bhayangkara Jakarta Raya, Lokasi KKN kelompok kami berada di Desa Setiamekar Kabupaten Bekasi. Maaf masih pemula jangan dihujat.

## Cara aman mengunggah foto agar tidak berantakan
1. Simpan semua foto di satu folder khusus, misalnya `assets/img/`, lalu rujuk dengan path yang rapi seperti `<img src="assets/img/profil.jpg" alt="Foto Profil">`.
2. Gunakan nama file sederhana tanpa spasi (contoh: `kegiatan-1.jpg`, `profil-ibu-rt.png`) supaya mudah dicari dan tidak error.
3. Samakan ukuran/aspek rasio foto (misal 16:9 atau 1:1) dan kompres lebih dulu agar halaman tidak berat dan layout tetap rapi.
4. Gunakan kelas CSS yang konsisten (contoh: `.foto-kegiatan { max-width: 100%; height: auto; }`) agar gambar responsif dan mengikuti grid/tata letak yang sudah ada, hindari menetapkan lebar langsung di atribut HTML.
5. Jika perlu caption, bungkus dengan `<figure>` dan `<figcaption>` agar teks keterangan tetap rata walau foto berbeda ukuran.
6. Isi atribut `alt` dengan deskripsi singkat isi foto (contoh: `alt="Foto kegiatan penyuluhan kesehatan"`) supaya aksesibilitas dan SEO tetap baik.
