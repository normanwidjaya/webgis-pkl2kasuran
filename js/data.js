/**
 * WebGIS Dusun Kasuran — Data Configuration v3 (2026)
 * 
 * Survei Lapangan: 6–9 Juli 2026 — Kelompok C5, PKL 2 SIG, SV UGM
 * Kompilasi dari: Foto Udara Drone skala 1:5.000 (2025) secara Fotogrametri
 * Skala Peta Final: 1:3.500
 * 
 * ⚠️ Data 2025 = dari StoryMaps tahun lalu (referensi)
 * ✅ Data 2026 = dari survei lapangan terbaru
 */

const DUSUN_DATA = {

    // ==================== INFORMASI DASAR ====================
    nama: "Dusun Kasuran",
    desa: "Desa Sumberarum",
    kecamatan: "Tempuran",
    kabupaten: "Magelang",
    provinsi: "Jawa Tengah",
    rw: "RW 17",
    rt: ["RT 01", "RT 02", "RT 03"],
    tahunSurvei: "2026",
    timSurvei: "Kelompok C5 — PKL 2 SIG, SV UGM",
    tanggalSurvei: "6–9 Juli 2026",
    skalaPeta: "1:3.500",
    sumberCitra: "Foto Udara Drone skala 1:5.000 (2025)",
    koordinatTengah: "7°34'26.6\"LS, 110°11'13.4\"BT",

    // Koordinat pusat untuk Leaflet
    center: [-7.57406, 110.18705],
    zoom: 16,

    // ==================== DEMOGRAFI ====================
    demografi: {
        // 2026: data dari survei lapangan terbaru
        populasi_2026: 320,         // hasil survei lapangan 2026
        bangunan_2026: 102,         // dari Peta Bangunan (2026) — total 102
        kk_2026: 0,                 // TODO: isi
        luasM2: 291699,
        luasHektar: 29.17,
        // 2025: data referensi tahun lalu (StoryMaps)
        populasi_2025: 0,
        bangunan_2025: 119,
    },

    // ==================== BANGUNAN (2026) ====================
    bangunan2026: {
        total: 119,
        tempatTinggal: 101,
        gedung: "terdata di peta",
        catatan: "Data dari Peta Bangunan Kasuran, skala 1:3.500, survei 2026",
    },

    // ==================== PENGGUNAAN LAHAN (2026 Revisi) ====================
    penggunaanLahan2026: {
        sumber: "Peta Penggunaan Lahan Revisi (2026)",
        hutan: 60,
        perkebunan: 30,
        permukiman: 10,
    },

    // ==================== BATAS ADMINISTRASI ====================
    batasRT: {
        rt01: { nama: "RT 01", posisi: "Barat laut", tetangga: "Dusun Dimajar 3" },
        rt02: { nama: "RT 02", posisi: "Tengah", akses: "Jalan Kasuran" },
        rt03: { nama: "RT 03", posisi: "Tenggara", catatan: "Dekat pertanian & perbukitan" },
    },

    batasDesa: ["Desa Sumberarum", "Desa Ringinanom", "Desa Wringinputih", "Desa Pasuruhan"],
    dusunTetangga: ["Dusun Dimajar 1", "Dusun Dimajar 3"],

    // ==================== JARINGAN JALAN ====================
    infrastruktur: {
        jalanLokal: "Jalan Kasuran (jalan utama)",
        jalanLain: "Jalan lingkungan (tidak bernama resmi)",
        jalanSetapak: "Jalan setapak",
        sungai: "Sungai Progo (batas alam timur)",
    },

    // ==================== TOPONIMI ====================
    toponimi: {
        versi1: "Mbah Kyai Kasur — tokoh sesepuh cikal bakal dusun",
        versi2: "\"Kasoran\" — bahasa Jawa: orang yang melarikan diri (Perang Diponegoro)",
        sumber: "Cerita sesepuh dusun",
    },

    // ==================== KONTAK ====================
    kontak: {
        alamat: "Dusun Kasuran, Desa Sumberarum, Kecamatan Tempuran, Kabupaten Magelang, Jawa Tengah",
        email: "kasurandusun@gmail.com",
        whatsapp: "08xx-xxxx-xxxx",
    },

    // ================================================================
    //  5 PETA DASAR (2026)
    // ================================================================
    petaDasar: [
        {
            id: 'd-1', tabId: 'd-1',
            name: 'Peta Foto Udara',
            icon: 'fa-drone',
            filePDF: 'Peta Foto Udara.pdf',
            tahun: 2026,
            desc: 'Peta citra udara hasil akuisisi drone UAV tahun 2025, diolah secara fotogrametri. Menampilkan visualisasi wilayah Dusun Kasuran secara komprehensif: jaringan jalan, permukiman, vegetasi, lahan pertanian, dan fitur hidrografi.',
            stats: [
                { label: 'Skala', value: '1:3.500' },
                { label: 'Wahana', value: 'Drone UAV' },
                { label: 'Sumber', value: 'Foto Udara 2025' },
                { label: 'Cakupan', value: '±29 Ha' },
            ],
            legend: [
                { color: '#7f8c8d', label: 'Jalan Lokal' },
                { color: '#bdc3c7', label: 'Jalan Lain' },
                { color: '#ecf0f1', label: 'Jalan Setapak' },
                { color: '#3498db', label: 'Sungai Progo' },
            ],
        },
        {
            id: 'd-2', tabId: 'd-2',
            name: 'Peta Bangunan',
            icon: 'fa-building',
            filePDF: 'Peta_Bangunan_Kasuran.pdf',
            tahun: 2026,
            desc: 'Peta sebaran bangunan di Dusun Kasuran berdasarkan hasil digitasi foto udara dan verifikasi lapangan 2026. Mencakup klasifikasi bangunan: Gedung dan Tempat Tinggal.',
            stats: [
                { label: 'Total Bangunan', value: '119' },
                { label: 'Tempat Tinggal', value: '101' },
                { label: 'Skala', value: '1:3.500' },
                { label: 'Survei', value: 'Juli 2026' },
            ],
            legend: [
                { color: '#e74c3c', label: 'Tempat Tinggal' },
                { color: '#8e44ad', label: 'Gedung' },
                { color: '#7f8c8d', label: 'Jalan Lokal' },
                { color: '#3498db', label: 'Sungai' },
            ],
        },
        {
            id: 'd-3', tabId: 'd-3',
            name: 'Peta Batas Administrasi RT/RW',
            icon: 'fa-border-all',
            filePDF: 'Peta_Batas Admin RTRW_Kasuran.pdf',
            tahun: 2026,
            desc: 'Peta pembagian wilayah administratif tingkat RT di RW 17 Dusun Kasuran. Menampilkan batas dusun, batas desa, dan tiga wilayah RT untuk mendukung kegiatan administratif dan perencanaan.',
            stats: [
                { label: 'RT', value: '3 (01-03)' },
                { label: 'RW', value: 'RW 17' },
                { label: 'Skala', value: '1:3.500' },
                { label: 'Survei', value: 'Juli 2026' },
            ],
            legend: [
                { color: '#e74c3c', label: 'Batas Dusun' },
                { color: '#c0392b', label: 'Batas Desa' },
                { color: '#e67e22', label: 'RT 01' },
                { color: '#2ecc71', label: 'RT 02' },
                { color: '#f5e6ca', label: 'RT 03' },
            ],
            rtDetail: [
                { nama: 'RT 01', warna: '#e67e22', deskripsi: 'Barat laut — terbuka, berbatasan Dusun Dimajar 3' },
                { nama: 'RT 02', warna: '#2ecc71', deskripsi: 'Tengah — pusat mobilitas, akses Jalan Kasuran' },
                { nama: 'RT 03', warna: '#f5e6ca', deskripsi: 'Tenggara — dekat pertanian & perbukitan' },
            ],
        },
        {
            id: 'd-4', tabId: 'd-4',
            name: 'Peta Sarana & Prasarana',
            icon: 'fa-landmark',
            filePDF: 'Peta Sarana dan Prasarana.pdf',
            tahun: 2026,
            desc: 'Peta tematik persebaran sarana dan prasarana di Dusun Kasuran. Mencakup fasilitas umum, peribadatan, keamanan, dan infrastruktur pendukung kehidupan masyarakat.',
            stats: [
                { label: 'Bangunan', value: '119' },
                { label: 'Skala', value: '1:3.500' },
                { label: 'Survei', value: 'Juli 2026' },
                { label: 'Sumber', value: 'Foto Udara 2025' },
            ],
            legend: [
                { color: '#e74c3c', label: 'Tempat Tinggal' },
                { color: '#f39c12', label: 'Fasilitas Umum' },
                { color: '#3498db', label: 'Peribadatan' },
                { color: '#2ecc71', label: 'Pendidikan' },
            ],
        },
        {
            id: 'd-5', tabId: 'd-5',
            name: 'Peta Penggunaan Lahan',
            icon: 'fa-tree',
            filePDF: 'Peta Penggunaan Lahan Revisi.pdf',
            tahun: 2026,
            desc: 'Peta penggunaan lahan revisi 2026 — hasil interpretasi citra dan verifikasi lapangan. Klasifikasi berdasarkan jenis aktivitas dan penutup lahan: hutan, perkebunan, permukiman.',
            stats: [
                { label: 'Hutan', value: '60%' },
                { label: 'Perkebunan', value: '30%' },
                { label: 'Permukiman', value: '10%' },
                { label: 'Skala', value: '1:3.500' },
            ],
            chartBars: [
                { label: 'Hutan Alami', pct: 60, color: '#2d6a4f' },
                { label: 'Perkebunan', pct: 30, color: '#52b788' },
                { label: 'Permukiman', pct: 10, color: '#f39c12' },
            ],
        },
    ],

    // ================================================================
    //  5 PETA TEMATIK (2026)
    // ================================================================
    petaTematik: [
        {
            id: 't-1', tabId: 't-1',
            name: 'Peta Jenis Usaha',
            icon: 'fa-store',
            filePDF: 'Peta Jenis Usaha.pdf',
            tahun: 2026,
            desc: 'Peta komposisi jenis usaha rumah tangga di Dusun Kasuran berdasarkan survei 6–9 Juli 2026. Mengklasifikasikan usaha ke dalam 4 kategori: Perdagangan, Jasa, Industri Rumah Tangga, dan Pertanian/Perkebunan/Peternakan.',
            stats: [
                { label: 'Skala', value: '1:3.500' },
                { label: 'Survei', value: '6–9 Juli 2026' },
                { label: 'Tim', value: 'Kelompok C5' },
                { label: 'Kategori', value: '4 Jenis' },
            ],
            jenisUsaha: [
                { icon: 'fa-shopping-basket', nama: 'Perdagangan', warna: '#e74c3c', contoh: 'Warung, toko kelontong' },
                { icon: 'fa-handshake', nama: 'Jasa', warna: '#3498db', contoh: 'Jahit, bengkel, layanan' },
                { icon: 'fa-industry', nama: 'Industri Rumah Tangga', warna: '#f39c12', contoh: 'Usus ayam, kerajinan' },
                { icon: 'fa-seedling', nama: 'Pertanian/Perkebunan/Peternakan', warna: '#2ecc71', contoh: 'Melon, kambing, kebun' },
            ],
        },
        {
            id: 't-2', tabId: 't-2',
            name: 'Peta Persebaran Fungsi Bangunan',
            icon: 'fa-home',
            filePDF: 'Peta Persebaran Fungsi Bangunan.pdf',
            tahun: 2026,
            desc: 'Peta yang menunjukkan klasifikasi fungsi setiap bangunan di Dusun Kasuran — membedakan bangunan tempat tinggal dari bangunan dengan fungsi khusus lainnya (usaha, fasilitas umum, dll).',
            stats: [
                { label: 'Bangunan', value: '119' },
                { label: 'Skala', value: '1:3.500' },
                { label: 'Survei', value: '6–9 Juli 2026' },
                { label: 'Tim', value: 'Kelompok C5' },
            ],
            fungsiList: [
                { fungsi: 'Tempat Tinggal', jumlah: 101, warna: '#e74c3c' },
                { fungsi: 'Usaha/UMKM', jumlah: 16, warna: '#f39c12' },
                { fungsi: 'Fasilitas Umum', jumlah: 2, warna: '#3498db' },
                { fungsi: 'Lainnya', jumlah: '—', warna: '#95a5a6' },
            ],
        },
        {
            id: 't-3', tabId: 't-3',
            name: 'Peta Persebaran Jumlah Penduduk',
            icon: 'fa-users',
            filePDF: 'Peta Persebaran Jumlah Penduduk.pdf',
            tahun: 2026,
            desc: 'Peta sebaran jumlah penduduk berdasarkan RT di Dusun Kasuran. Data hasil survei 6–9 Juli 2026, ditampilkan per RT untuk mendukung perencanaan pelayanan publik dan pembangunan.',
            stats: [
                { label: 'RT', value: '3 (01-03)' },
                { label: 'Survei', value: '6–9 Juli 2026' },
                { label: 'Skala', value: '1:3.500' },
                { label: 'Total Jiwa', value: '320' },
            ],
            populasiPerRT: {
                rt01: '124 Jiwa', rt02: '70 Jiwa', rt03: '126 Jiwa',
                note: 'Data jumlah jiwa per RT hasil survei lapangan 6–9 Juli 2026',
            },
            genderPerRT: {
                rt01: { laki: 62, perempuan: 62 },
                rt02: { laki: 35, perempuan: 35 },
                rt03: { laki: 69, perempuan: 57 },
            },
        },
        {
            id: 't-4', tabId: 't-4',
            name: 'Peta Tingkat Akses Internet',
            icon: 'fa-wifi',
            filePDF: 'Peta Tingkat Akses Internet.pdf',
            tahun: 2026,
            desc: 'Peta tingkat akses internet rumah tangga di Dusun Kasuran berdasarkan survei 2026. Mengklasifikasikan akses internet per rumah tangga di masing-masing RT.',
            stats: [
                { label: 'RT', value: '3 (01-03)' },
                { label: 'Survei', value: '6–9 Juli 2026' },
                { label: 'Skala', value: '1:3.500' },
                { label: 'Kategori', value: 'Bertingkat' },
            ],
            kategoriAkses: [
                { level: 'Akses Tinggi (Fiber/4G)', warna: '#2ecc71' },
                { level: 'Akses Sedang (Mobile Data)', warna: '#f39c12' },
                { level: 'Akses Rendah (Terbatas)', warna: '#e74c3c' },
                { level: 'Tidak Ada Akses', warna: '#95a5a6' },
            ],
            dataPerRT: {
                rt01: { fiber: '68,9%', mobile: 'Rendah', terbatas: null, tidakAda: null, persen: 68.9 },
                rt02: { fiber: '75%', mobile: 'Sedang', terbatas: null, tidakAda: null, persen: 75 },
                rt03: { fiber: '78,8%', mobile: 'Tinggi', terbatas: null, tidakAda: null, persen: 78.8 },
            },
        },
        {
            id: 't-5', tabId: 't-5',
            name: 'Peta Tingkat Pendidikan',
            icon: 'fa-graduation-cap',
            filePDF: 'Peta Tingkat Pendidikan.pdf',
            tahun: 2026,
            desc: 'Peta komposisi tingkat pendidikan penduduk berdasarkan RT di Dusun Kasuran. Data hasil survei 6–9 Juli 2026, mengklasifikasikan jenjang pendidikan dari tidak sekolah hingga perguruan tinggi.',
            stats: [
                { label: 'RT', value: '3 (01-03)' },
                { label: 'Survei', value: '6–9 Juli 2026' },
                { label: 'Skala', value: '1:3.500' },
                { label: 'Jenjang', value: 'Bertingkat' },
            ],
            jenjangPendidikan: ['Tidak/Belum Sekolah', 'SD/Sederajat', 'SMP/Sederajat', 'SMA/Sederajat', 'Perguruan Tinggi'],
            dataPerRT: {
                rt01: { tidakSekolah: 93, sd: 21, smp: 5, sma: 5, pt: 0 },
                rt02: { tidakSekolah: 53, sd: 9, smp: 4, sma: 3, pt: 1 },
                rt03: { tidakSekolah: 24, sd: 43, smp: 25, sma: 29, pt: 5 },
            },
        },
    ],

    // ==================== LAYER PETA INTERAKTIF ====================
    mapLayers: [
        { id: 'batas', group: 'dasar', name: 'Batas Administrasi', color: '#e74c3c', weight: 3, fillOpacity: 0.08, visible: true },
        { id: 'bangunan', group: 'dasar', name: 'Bangunan', color: '#2d6a4f', weight: 1.5, fillOpacity: 0.3, visible: false },
        { id: 'jalan', group: 'dasar', name: 'Jaringan Jalan', color: '#7f8c8d', weight: 2.5, fillOpacity: 0, visible: false },
        { id: 'sungai', group: 'dasar', name: 'Sungai', color: '#3498db', weight: 2, fillOpacity: 0.2, visible: false },
        { id: 'jenisUsaha', group: 'tematik', name: 'Jenis Usaha', color: '#e67e22', weight: 1, fillOpacity: 0.35, visible: false },
        { id: 'fungsiBangunan', group: 'tematik', name: 'Fungsi Bangunan', color: '#8e44ad', weight: 1, fillOpacity: 0.35, visible: false },
        { id: 'populasiLayer', group: 'tematik', name: 'Jumlah Penduduk', color: '#e91e63', weight: 1, fillOpacity: 0.35, visible: false },
        { id: 'internet', group: 'tematik', name: 'Akses Internet', color: '#1abc9c', weight: 1, fillOpacity: 0.35, visible: false },
        { id: 'pendidikan', group: 'tematik', name: 'Pendidikan', color: '#9b59b6', weight: 1, fillOpacity: 0.35, visible: false },
    ],

    // GeoJSON data (null = belum di-export, isi nanti)
    batas: null, bangunan: null, jalan: null, sungai: null,
    jenisUsaha: null, fungsiBangunan: null, populasiLayer: null, internet: null, pendidikan: null,

    // ==================== GALERI ====================
    galeri: [
        // Dokumentasi Survei Juli 2026
        { src: 'assets/images/galeri/IMG_20260707_151057.jpg', caption: 'Survei Lapangan Dusun Kasuran', category: 'DOKUMENTASI' },
        { src: 'assets/images/galeri/IMG_20260708_100719.jpg', caption: 'Dokumentasi Wilayah Kasuran', category: 'DOKUMENTASI' },
    ],
};
