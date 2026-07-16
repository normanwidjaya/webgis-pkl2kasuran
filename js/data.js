/**
 * WebGIS Dusun Kasuran - Data Configuration
 * 
 * Sumber data: Wonderful Dusun Kasuran (StoryMaps ArcGIS, Juli 2025)
 * Tim C5 Kasuran | PKL 2 Sumberarum | SIG - UGM
 * 
 * Update data sesuai hasil survei terbaru di sini.
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
    tahunSurvei: "2025",

    // Koordinat Pusat Dusun
    center: [-7.5532, 110.1784],
    zoom: 16,

    // ==================== DEMOGRAFI & DATA UTAMA ====================
    demografi: {
        populasi: 0,            // Jumlah jiwa (isi setelah survei penduduk)
        bangunan: 119,          // Total bangunan yang disurvei
        luasHektar: 29.17,      // ±291.699 m²
        kk: 0,                  // Kartu Keluarga (isi setelah survei)
        luasM2: 291699,
    },

    // ==================== BANGUNAN DETAIL ====================
    bangunan: {
        total: 119,
        tempatTinggal: 101,
        umkm: 16,
        fasilitasUmum: 6,
        masjid: 1,
        posRonda: 2,
        toko: 1,
        industriProduksi: 1,
    },

    // ==================== MATERIAL BANGUNAN ====================
    materialBangunan: {
        tembok: 97,
        kayu: 8,
        bambu: 4,
        tembokCampurKayu: 2,
        tanpaDinding: 2,
        lainnya: 5,
    },

    // ==================== JENIS LANTAI ====================
    jenisLantai: {
        keramik: 71,
        tanah: 26,
        beton: 9,
        lainnya: 12,
        kayu: 1,
    },

    // ==================== PENGGUNAAN LAHAN ====================
    penggunaanLahan: {
        hutan: 60,              // 60% tutupan hutan alami (barat & selatan)
        perkebunan: 30,         // 30% perkebunan hortikultura (melon greenhouse)
        permukiman: 10,         // 10% area permukiman
    },

    // ==================== EKONOMI & UMKM ====================
    umkm: {
        total: 16,
        jenis: [
            "Produksi Usus Ayam (komoditas camilan khas)",
            "Wisata Melon (agrowisata panen langsung di kebun)",
            "Pengrajin Miniatur",
            "Pengrajin Replika Candi",
            "Warung-warung kecil",
            "dan UMKM lainnya",
        ],
    },

    sektorPendapatan: {
        primer: "Pertanian, peternakan, pekebun (dominan di RT 03)",
        sekunder: "Pengolahan, tukang kayu, penjahit (terbatas)",
        tersier: "Jasa, perdagangan, warung (dominan di RT 01 & RT 02, PALING DOMINAN secara keseluruhan)",
        kuartener: "Pengetahuan, profesional, pengajar (sangat minim)",
    },

    // ==================== KESEHATAN ====================
    kesehatan: {
        dominan: "Penyakit Tidak Menular (PTM)",
        ptm: ["Hipertensi", "Diabetes", "Stroke", "Penyakit Jantung"],
        faktorRisiko: "Gaya hidup sedentari, konsumsi tinggi gula/garam/lemak, merokok",
        catatan: "Penyakit menular rendah → sanitasi cukup baik, tapi PTM jadi perhatian serius",
    },

    // ==================== NDVI (Indeks Vegetasi) ====================
    ndvi: {
        sumber: "Citra Sentinel-2, 2024",
        rentang: "0.0075 – 0.6352",
        tinggi: "Bagian utara, timur, barat (lahan pertanian aktif, pekarangan, semak alami)",
        rendah: "Zona tengah-selatan, RT 01 & RT 02 (permukiman padat, bangunan, jalan)",
    },

    // ==================== NDMI (Kelembapan Vegetasi) ====================
    ndmi: {
        sumber: "Citra Sentinel-2, 2023",
        rentang: "-0.150196 – 0.337077",
        tinggi: "Barat dan tenggara (sawah, kebun, pekarangan hijau)",
        rendah: "Tengah, timur, utara (permukiman, jalan, lahan terbuka)",
    },

    // ==================== ELEVASI & BANJIR ====================
    elevasi: {
        sumber: "DEM (Digital Elevation Model)",
        aman: "Barat hingga tengah (RT 01 & RT 02) — elevasi menengah-tinggi, aman dari banjir",
        rawan: "Timur (RT 03) — zona rendah, dekat sungai, rentan genangan & banjir",
        catatan: "Sungai di sisi timur menjadi batas alam dengan Desa Pasuruhan & Wringinputih",
    },

    // ==================== JARINGAN JALAN ====================
    jalan: {
        utama: "Jalan Kyai Zainudin (satu-satunya jalan bernama, membentang barat ke tengah dusun)",
        lainnya: "Jalan lingkungan kecil (tidak bernama resmi, vital untuk mobilitas harian)",
        pusatMobilitas: "RT 02 sebagai simpul utama, terhubung ke RT 01 (barat laut) dan RT 03 (tenggara)",
    },

    // ==================== BATAS ADMINISTRASI ====================
    batasRT: {
        rt01: {
            nama: "RT 01",
            posisi: "Barat laut dusun",
            karakter: "Relatif terbuka, menyatu dengan perbatasan Dusun Dimajar 3",
            ekonomi: "Didominasi sektor tersier (jasa & perdagangan)",
        },
        rt02: {
            nama: "RT 02",
            posisi: "Bagian tengah",
            karakter: "Zona transisi RT 01–RT 03, akses baik ke jalan utama",
            ekonomi: "Paling beragam — primer, sekunder, tersier, kuartener tersebar merata",
        },
        rt03: {
            nama: "RT 03",
            posisi: "Tenggara dusun",
            karakter: "Dekat zona pertanian & perbukitan timur, area rendah rawan banjir",
            ekonomi: "Didominasi sektor primer (petani, pekebun, peternak kambing)",
        },
    },

    // ==================== TOPONIMI ====================
    toponimi: {
        versi1: "Berasal dari nama tokoh sesepuh: Mbah Kyai Kasur, cikal bakal dusun Kasuran.",
        versi2: "Berasal dari kisah Perang Diponegoro. Para pahlawan yang kalah perang melarikan diri ke wilayah dusun ini, sehingga disebut 'Kasoran' (bahasa Jawa: orang-orang yang melarikan diri).",
        sumber: "Cerita sesepuh dusun",
    },

    // ==================== KONTAK ====================
    kontak: {
        alamat: "Dusun Kasuran, Desa Sumberarum, Kecamatan Tempuran, Kabupaten Magelang, Jawa Tengah",
        email: "kasurandusun@gmail.com",
        whatsapp: "08xx-xxxx-xxxx",
    },

    // ==================== 10 PETA (5 DASAR + 5 TEMATIK) ====================
    petaDasar: [
        { id: 'd-1', name: 'Peta Persil & Bangunan', icon: 'fa-building', desc: 'Sebaran bidang tanah dan bangunan berdasarkan material dan jenis lantai.', stats: { total: 119, rumah: 101, tembok: 97, keramik: 71 } },
        { id: 'd-2', name: 'Peta Citra Foto Udara', icon: 'fa-drone', desc: 'Citra udara skala 1:5.000 hasil akuisisi Drone UAV tahun 2025.', stats: { skala: '1:5.000', wahana: 'UAV', tahun: 2025, cakupan: '±29 Ha' } },
        { id: 'd-3', name: 'Peta Penggunaan Lahan', icon: 'fa-tree', desc: 'Distribusi fungsi lahan: hutan 60%, perkebunan 30%, permukiman 10%.', stats: { hutan: '60%', perkebunan: '30%', permukiman: '10%' } },
        { id: 'd-4', name: 'Peta Sarana & Prasarana', icon: 'fa-landmark', desc: 'Persebaran bangunan berdasarkan fungsi: tempat tinggal, UMKM, fasilitas umum.', stats: { tinggal: 101, umkm: 16, masjid: 1, posRonda: 2 } },
        { id: 'd-5', name: 'Peta Batas Administrasi RT/RW', icon: 'fa-border-all', desc: 'Pembagian wilayah RT 01, 02, 03 di RW 17 Dusun Kasuran.', stats: { rt: '3 RT', rw: 'RW 17', luas: '±29 Ha' } },
    ],

    petaTematik: [
        { id: 't-1', name: 'Peta Sektor Pekerjaan Penduduk', icon: 'fa-briefcase', desc: 'Klasifikasi 4 sektor ekonomi per bangunan di masing-masing RT.', dataReady: true },
        { id: 't-2', name: 'Peta Potensi Desa', icon: 'fa-star', desc: 'Identifikasi potensi unggulan: wisata melon, usus ayam, kerajinan, hutan.', dataReady: true },
        { id: 't-3', name: 'Peta Komoditas Usaha', icon: 'fa-store', desc: 'Sebaran 16 unit UMKM berdasarkan jenis komoditas di Dusun Kasuran.', dataReady: true },
        { id: 't-4', name: 'Peta Pendidikan Formal per-RT', icon: 'fa-graduation-cap', desc: 'Jumlah penduduk menempuh pendidikan formal (SD, SMP, SMA, PT) per RT.', dataReady: false, pendingNote: 'Data akan diisi setelah survei pendidikan selesai. Tampilan akhir: peta choropleth per-RT.' },
        { id: 't-5', name: 'Peta Akses Internet Masyarakat', icon: 'fa-wifi', desc: 'Tingkat akses dan jenis koneksi internet (fiber, mobile data, WiFi umum) per RT.', dataReady: false, pendingNote: 'Data akan diisi setelah survei akses internet selesai.' },
    ],

    // ==================== DATA PENDIDIKAN (placeholder) ====================
    pendidikan: {
        rt01: { sd: null, smp: null, sma: null, pt: null },
        rt02: { sd: null, smp: null, sma: null, pt: null },
        rt03: { sd: null, smp: null, sma: null, pt: null },
    },

    // ==================== DATA AKSES INTERNET (placeholder) ====================
    internet: {
        rt01: { fiber: null, mobile: null, wifiUmum: null, tidakAda: null },
        rt02: { fiber: null, mobile: null, wifiUmum: null, tidakAda: null },
        rt03: { fiber: null, mobile: null, wifiUmum: null, tidakAda: null },
    },

    // ==================== LAYER PETA INTERAKTIF ====================
    mapLayers: [
        // Peta Dasar
        { id: 'batas', group: 'dasar', name: 'Batas Administrasi', color: '#e74c3c', weight: 3, fillOpacity: 0.08, visible: true },
        { id: 'bangunan', group: 'dasar', name: 'Persil/Bangunan', color: '#2d6a4f', weight: 1.5, fillOpacity: 0.3, visible: false },
        { id: 'jalan', group: 'dasar', name: 'Jaringan Jalan', color: '#7f8c8d', weight: 2.5, fillOpacity: 0, visible: false },
        { id: 'sungai', group: 'dasar', name: 'Sungai', color: '#3498db', weight: 2, fillOpacity: 0.2, visible: false },
        // Peta Tematik
        { id: 'sektor', group: 'tematik', name: 'Sektor Pekerjaan', color: '#e67e22', weight: 1, fillOpacity: 0.35, visible: false },
        { id: 'umkmLayer', group: 'tematik', name: 'Komoditas UMKM', color: '#e91e63', weight: 1, fillOpacity: 0.4, visible: false },
        { id: 'pendidikan', group: 'tematik', name: 'Pendidikan', color: '#9b59b6', weight: 1, fillOpacity: 0.35, visible: false },
        { id: 'internet', group: 'tematik', name: 'Akses Internet', color: '#1abc9c', weight: 1, fillOpacity: 0.35, visible: false },
    ],

    // GeoJSON data (null = belum di-export dari ArcGIS, isi dengan fetch/import nanti)
    batas: null,
    pertanian: null,
    pemukiman: null,
    sungai: null,
    fasilitas: null,
    rt: null,
    jalan: null,
    umkmLayer: null,

    // ==================== GALERI ====================
    galeri: [
        { src: 'assets/images/galeri/kantor-desa.jpg', caption: 'Kantor Desa', category: 'PEMERINTAHAN' },
        { src: 'assets/images/galeri/rumah-kadus.jpg', caption: 'Rumah Kepala Dusun', category: 'PEMERINTAHAN' },
        { src: 'assets/images/galeri/lahan-pertanian.jpg', caption: 'Lahan Pertanian', category: 'PERTANIAN' },
        { src: 'assets/images/galeri/masjid.jpg', caption: 'Masjid', category: 'PERIBADATAN' },
        { src: 'assets/images/galeri/mushola.jpg', caption: 'Mushola', category: 'PERIBADATAN' },
        { src: 'assets/images/galeri/pos-ronda.jpg', caption: 'Pos Ronda', category: 'KEAMANAN' },
        { src: 'assets/images/galeri/sumber-air.jpg', caption: 'Sumber Air', category: 'SUMBER AIR' },
        { src: 'assets/images/galeri/dokumentasi-pkl.jpg', caption: 'Dokumentasi Lapangan', category: 'DOKUMENTASI' },
        { src: 'assets/images/galeri/umkm-usus.jpg', caption: 'UMKM Usus Ayam', category: 'UMKM' },
        { src: 'assets/images/galeri/wisata-melon.jpg', caption: 'Wisata Melon', category: 'UMKM' },
        { src: 'assets/images/galeri/pengrajin-miniatur.jpg', caption: 'Pengrajin Miniatur', category: 'UMKM' },
        { src: 'assets/images/galeri/batas-dusun.jpg', caption: 'Pengukuran Batas Dusun', category: 'DOKUMENTASI' },
    ],

    // ==================== VIDEO ====================
    video: {
        title: "DUSUN KASURAN - GEOSPATIAL SIDE",
        url: null, // Isi dengan YouTube embed URL
    },
};
