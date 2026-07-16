# WebGIS Dusun Kasuran

Sistem Informasi Geospasial Terintegrasi untuk Pemerintah dan Masyarakat Dusun Kasuran, Desa Sumberarum, Kecamatan Tempuran, Kabupaten Magelang, Jawa Tengah.

## 📁 Struktur Proyek

```
WebGIS/
├── index.html              # Halaman utama
├── css/
│   └── style.css           # Stylesheet utama
├── js/
│   ├── data.js             # Konfigurasi data dusun
│   ├── map.js              # Modul peta Leaflet
│   └── main.js             # Interaktivitas utama
├── assets/
│   └── images/             # Gambar dan aset
│       ├── logo-kasuran.svg
│       ├── citra-satelit.jpg      # (akan diisi)
│       ├── foto-udara.jpg         # (akan diisi)
│       └── galeri/                # Foto galeri (akan diisi)
└── data/
    └── batas_dusun_sample.geojson # Sample GeoJSON
```

## 🚀 Cara Menjalankan

1. Buka `index.html` di browser (cukup double-click)
2. Atau gunakan live server (misal: Live Server extension di VS Code)

## 📝 Panduan Update Data

### 1. Data Demografi
Edit file `js/data.js`, ubah nilai di bagian `demografi`:
```js
demografi: {
    populasi: 385,     // Jumlah jiwa
    bangunan: 138,     // Jumlah bangunan
    luasHektar: 41.7,  // Luas (hektar)
    kk: 120,           // Kartu Keluarga
}
```

### 2. Data GIS (GeoJSON)
- Export layer dari ArcGIS/QGIS ke format **GeoJSON** (.geojson)
- Simpan file di folder `data/`
- Update `DUSUN_DATA` di `js/data.js` dengan path file
- Atau gunakan fungsi `loadGeoJSONFromURL()` di `main.js`

### 3. Foto & Gambar
- Simpan foto di `assets/images/` dan `assets/images/galeri/`
- Update path di `DUSUN_DATA.galeri`

### 4. Koordinat Pusat Dusun
- Update `center` di `js/data.js` dengan koordinat yang akurat

### 5. Video Profil
- Upload video ke YouTube
- Update section video di `index.html` dengan embed link

## 🛠️ Teknologi

- **Leaflet.js** - Peta interaktif (OpenStreetMap basemap)
- **AOS.js** - Animasi scroll
- **Font Awesome** - Ikon
- **Vanilla JS** - Tanpa framework

## 📋 TODO (Untuk Update Selanjutnya)

- [ ] Export batas dusun dari ArcGIS ke GeoJSON
- [ ] Export layer lahan pertanian
- [ ] Export layer fasilitas umum
- [ ] Export layer sungai/sumber air
- [ ] Isi data demografi hasil survei
- [ ] Isi cerita toponimi dari wawancara Kadus
- [ ] Tambahkan foto galeri
- [ ] Tambahkan foto citra satelit dan drone
- [ ] Buat video profil dan upload
- [ ] Update kontak yang akurat
- [ ] Tambahkan layer peta tematik lainnya

---

© 2025 Tim PKL 2 - Sistem Informasi Geografis, Sekolah Vokasi UGM
