# 🚀 GAS Project Hub - Portal Showcase Google Apps Script (GAS)

Portal portofolio premium bertema gelap (*dark mode*) dengan efek *glassmorphism* untuk menyajikan dan membungkus aplikasi hasil build **Google Apps Script (GAS)** Anda menggunakan kontainer *iframe* layar penuh.

Portal ini menampilkan 3 proyek utama Anda:
1. **SCA-BOS-GAS** (Sistem Cetak Keuangan BOS)
2. **LMS Sekolah GAS** (Sistem Pembelajaran Digital)
3. **CBT System Pro** (Sistem Ujian Proteksi Exambrowser)

---

## 📁 Struktur Direktori Portal

```text
gas-portal/
├── index.html            # Antarmuka Dashboard Portal Utama
├── styles.css            # Desain & Animasi Tema Gelap (CSS Kustom)
├── script.js            # Logika Interaktif & Data Kredensial Proyek
├── vercel.json           # Konfigurasi URL Bersih untuk Vercel
├── .gitignore            # File yang diabaikan oleh Git (seperti .DS_Store)
├── images/               # File Gambar Mockup Pratinjau Proyek
├── sca-bos/              # Subfolder Kontainer untuk SCA-BOS
│   ├── index.html        # Wrapper Iframe Aplikasi Spoke (Sekolah)
│   └── master.html       # Wrapper Iframe Aplikasi Master Hub (Pusat)
├── lms-sekolah/          # Subfolder Kontainer untuk LMS Sekolah
│   └── index.html        # Wrapper Iframe Aplikasi LMS
└── cbt-system/           # Subfolder Kontainer untuk CBT System Pro
    └── index.html        # Wrapper Iframe Aplikasi CBT
```

---

## 🛠️ Panduan Pengaturan URL Web App (GAS)

Setiap kali Anda membuat deployment baru (*New Deployment*) di Google Apps Script Anda sebagai **Aplikasi Web (Web App)** dengan akses **Anyone**, Anda harus memperbarui tautan URL-nya di folder portal agar demo langsung berfungsi.

### Langkah 1: Perbarui URL pada File Kontainer
Buka file HTML berikut dan cari baris tag `<iframe>` dengan atribut `src` untuk diganti dengan URL Web App (exec) asli Anda:

1. **SCA-BOS-GAS (Sekolah)**:
   - Edit berkas: `sca-bos/index.html` pada baris `src`
2. **SCA-BOS-GAS (Master Hub/Pusat)**:
   - Edit berkas: `sca-bos/master.html` pada baris `src`
3. **LMS Sekolah GAS**:
   - Edit berkas: `lms-sekolah/index.html` pada baris `src`
4. **CBT System Pro**:
   - Edit berkas: `cbt-system/index.html` pada baris `src`

---

## 💻 Alur Perintah Git & Update ke GitHub

Agar perubahan URL atau perubahan desain lokal yang Anda simpan di laptop terkirim dan ter-update di repositori GitHub, jalankan urutan perintah berikut di terminal Anda (di dalam direktori `gas-portal`):

```bash
# 1. Daftarkan seluruh file yang diubah/ditambahkan ke dalam antrean Git
git add .

# 2. Catat perubahan ke dalam riwayat commit lokal (ubah pesan commit sesuai keinginan)
git commit -m "chore: perbarui url web app atau perbaikan antarmuka"

# 3. Kirim pembaruan tersebut ke GitHub
git push -u origin main
```

---

## 🌐 Cara Deploy ke Vercel (Sekali Setup)

Setelah repositori GitHub Anda diperbarui, ikuti langkah berikut untuk mengonlinekan portal Anda di internet secara gratis:

1. Masuk ke [Dashboard Vercel](https://vercel.com/dashboard).
2. Klik **Add New** > **Project**.
3. Cari repositori **`gas-projects-portal`** Anda di daftar repositori GitHub, lalu klik **Import**.
4. Biarkan semua setelan konfigurasi dalam kondisi default bawaan (Vercel otomatis mendeteksi konfigurasi statis `vercel.json`).
5. Klik **Deploy**.
6. Selesai! Anda akan mendapatkan domain `.vercel.app` gratis. Setiap kali Anda melakukan `git push` di masa mendatang, Vercel akan otomatis melakukan pembaruan secara instan tanpa perlu setup ulang.

---

## 🚨 Pemecahan Masalah (Troubleshooting)

### 1. Masalah Buffer Gagal Saat Push (HTTP 400 RPC Failed)
Jika Anda mengedit gambar atau menambahkan file besar lalu mendapatkan pesan error `RPC failed; HTTP 400` saat melakukan `git push`, hal ini disebabkan oleh batasan kapasitas transfer HTTP default pada Git Anda. 

**Solusi**: Jalankan perintah berikut satu kali di terminal untuk memperbesar buffer transfer Git menjadi 500MB:
```bash
git config http.postBuffer 524288000
```

### 2. Memaksa Pembaruan di Server (Force Push)
Jika riwayat commit lokal Anda bentrok dengan yang ada di GitHub dan Anda ingin menimpa file di GitHub dengan versi lokal Anda sepenuhnya:
```bash
git push -u origin main --force
```
