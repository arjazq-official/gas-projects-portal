// Data lengkap proyek-proyek GAS
const projectData = {
  "sca-bos": {
    title: "SCA-BOS-GAS",
    subtitle: "Sistem Cetak Administrasi BOS & Perencanaan Keuangan",
    badge: "Sistem Keuangan",
    color: "purple",
    techStack: ["Google Apps Script", "Google Sheets", "HTML5", "Tailwind CSS", "JavaScript", "Telegram API"],
    githubUrl: "https://github.com/arjazq/sca-bos-gas",
    demoUrl: "sca-bos/",
    features: [
      "Arsitektur Hub & Spoke memisahkan Master Hub (Pusat) dan Spoke (Sekolah) secara otomatis.",
      "Manajemen Lisensi Terpusat (License Hub) dengan inisialisasi regional Kabupaten NTB.",
      "Otomatisasi masa berlaku lisensi selama 1 tahun dan validasi ID laptop pengguna.",
      "Panduan konsultasi Telegram terintegrasi langsung pada halaman login.",
      "Otomatis menyiapkan struktur spreadsheet dan kolom master lisensi lewat sekali run.",
      "Sistem multi-deploy massal untuk update instan ke ratusan sekolah client via CLI."
    ],
    credentials: [
      { role: "Master Hub (Pusat)", user: "admin", pass: "master123" },
      { role: "Sekolah / Client (Spoke)", user: "admin", pass: "123456" }
    ],
    setupGuide: `// Langkah 1: Persiapan Lingkungan
// Pastikan Node.js terinstal, lalu instal clasp & login:
npm install -g @google/clasp
clasp login

// Langkah 2: Inisialisasi Master Hub (Pusat)
// Buka Spreadsheet Master Lisensi Anda, hubungkan dengan clasp dan push folder:
node multi-deploy.js Master

// Langkah 3: Setup Kolom & Triggers Master
// Di editor GAS Master, jalankan fungsi:
1. apiInitMasterSheet  // Menyiapkan susunan kolom
2. apiInitHubData      // Mengisi data dropdown Kabupaten NTB
3. installMasterTriggers // Mengaktifkan durasi expired otomatis 1 tahun

// Langkah 4: Hubungkan Sekolah (Client/Spoke)
// Deploy GAS Master sebagai Web App (Access: Anyone) dan salin URL-nya.
// Di setiap naskah GAS sekolah, tambahkan Script Property:
LICENSE_SERVER_URL = "URL_WEB_APP_MASTER_ANDA"

// Langkah 5: Distribusikan Update Massal
// Jalankan update ke seluruh sekolah terdaftar secara otomatis:
node multi-deploy.js --all-schools`
  },
  "lms-sekolah": {
    title: "LMS Sekolah GAS",
    subtitle: "Sistem Manajemen Pembelajaran Digital Modern",
    badge: "E-Learning Hub",
    color: "green",
    techStack: ["Google Apps Script", "Google Sheets", "HTML5", "Alpine.js (SPA)", "Tailwind CSS", "SweetAlert2", "FontAwesome"],
    githubUrl: "https://github.com/arjazq/lms-sekolah-gas",
    demoUrl: "lms-sekolah/",
    features: [
      "Menggunakan pola Single Page Application (SPA) reaktif berkecepatan tinggi dengan Alpine.js.",
      "Dasbor terpadu menampilkan visualisasi data statistik siswa, kelas, dan tugas aktif secara real-time.",
      "Manajemen mata pelajaran dengan hak unggah materi digital (PDF, Link, Dokumen).",
      "Pemantauan dan penilaian pengumpulan tugas/evaluasi siswa langsung dalam satu antarmuka.",
      "Manajemen akun siswa, guru, dan admin yang dinamis serta fitur ganti kata sandi.",
      "Desain antarmuka premium yang responsif dengan animasi transisi yang halus."
    ],
    credentials: [
      { role: "Akun Administrator", user: "admin", pass: "admin123" },
      { role: "Akun Guru Pengajar", user: "guru", pass: "guru123" },
      { role: "Akun Siswa / Pelajar", user: "siswa", pass: "siswa123" }
    ],
    setupGuide: `// Langkah 1: Kloning & Buat Proyek Web App
cd lms-sekolah-gas
clasp create --title "LMS Sekolah GAS" --type webapp

// Langkah 2: Unggah Kode ke Google Apps Script
clasp push

// Langkah 3: Deploy Aplikasi Web
clasp open
// Di Editor GAS, klik Deploy > New Deployment > Web App
// Konfigurasikan: Execute as: "Me", Who has access: "Anyone"
// Salin URL Web App yang dihasilkan.

// Langkah 4: Setup Database Otomatis (Spreadsheet)
1. Buka Google Spreadsheet yang terikat dengan proyek ini.
2. Refresh halaman, Anda akan melihat menu baru di atas bernama "🚀 LMS GAS".
3. Klik "🚀 LMS GAS" > "Setup Database".
4. Script akan otomatis memformat semua sheet (Users, Courses, dll) beserta akun demo.`
  },
  "cbt-arjazq": {
    title: "CBT System Pro",
    subtitle: "Sistem Ujian Computer Based Test Proteksi Exambrowser",
    badge: "Ujian Digital",
    color: "gold",
    techStack: ["Google Apps Script", "Google Sheets", "HTML5", "ExcelJS", "JavaScript", "Android Exambro SDK"],
    githubUrl: "https://github.com/arjazq/cbt-arjazq",
    demoUrl: "cbt-system/",
    features: [
      "Pembuat soal pintar terintegrasi serta sistem manajemen bank soal yang komprehensif.",
      "Fitur Bulk Excel Import (.xlsx) untuk admin, kurikulum, mata pelajaran, dan ribuan soal ujian.",
      "Sistem multi-deploy otomatis berbasis npsn yang diatur di file 'config/schools.json'.",
      "Proteksi layar penuh otomatis (Auto-Fullscreen) mendeteksi jika siswa menekan tombol keluar.",
      "Penghitung pelanggaran otomatis dan sanksi diskualifikasi paksa untuk meminimalisir kecurangan.",
      "Integrasi QR-Code cepat untuk mempermudah siswa mengakses ujian melalui aplikasi Exambrowser Android."
    ],
    credentials: [
      { role: "Akun Administrator Default", user: "admin", pass: "cbt123" }
    ],
    setupGuide: `// Langkah 1: Setup Daftar Sekolah (Sekolah Mandiri/Cabang)
// Edit file 'config/schools.json' untuk mendaftarkan instansi baru:
{
  "npsn": "12345678",
  "nama": "SMA Antigravity",
  "scriptId": "ID_SCRIPT_GOOGLE_APPS_SCRIPT_SEKOLAH",
  "email": "admin@sekolah.sch.id"
}

// Langkah 2: Deploy Otomatis Menggunakan Node.js
// Untuk mendeploy naskah ke SEMUA sekolah sekaligus:
node deploy.js

// Atau deploy khusus ke SATU target sekolah saja (filter NPSN):
node deploy.js 12345678

// Langkah 3: Konfigurasi Keamanan Android (Integritas Ujian)
1. Buka aplikasi Exambrowser (misalnya Zen Exam Browser) di HP siswa.
2. Generate QR Code dari URL Web App ujian menggunakan QRCode Monkey.
3. Siswa cukup melakukan Scan QR Code yang disediakan oleh pengawas ujian.
4. Aplikasi akan mengunci layar siswa dan langsung membuka halaman login ujian.`
  }
};

// DOM Elements
const modal = document.getElementById("detail-modal");
const modalTitle = document.getElementById("modal-title");
const modalSubtitle = document.getElementById("modal-subtitle");
const modalBadge = document.getElementById("modal-badge");
const modalTech = document.getElementById("modal-tech");
const closeBtn = document.getElementById("modal-close");
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanes = document.querySelectorAll(".tab-pane");

// Active Project Key
let activeProjectKey = null;

// Open Modal with Data
function openProjectDetails(key) {
  const data = projectData[key];
  if (!data) return;

  activeProjectKey = key;

  // Set Modal Header
  modalTitle.textContent = data.title;
  modalSubtitle.textContent = data.subtitle;
  modalBadge.textContent = data.badge;

  // Reset Badge Color Classes
  modalBadge.className = "badge";
  modalBadge.classList.add(`badge-${data.color}`);

  // Populate Tech Stack Badges
  modalTech.innerHTML = "";
  data.techStack.forEach(tech => {
    const badge = document.createElement("span");
    badge.className = "badge badge-tech";
    badge.textContent = tech;
    modalTech.appendChild(badge);
  });

  // Populate Features
  const featuresList = document.getElementById("features-container");
  featuresList.innerHTML = "";
  data.features.forEach(feat => {
    const li = document.createElement("li");
    li.innerHTML = `<i class="fas fa-check-circle"></i> <span>${feat}</span>`;
    featuresList.appendChild(li);
  });

  // Populate Credentials Table
  const credsBody = document.getElementById("credentials-table-body");
  credsBody.innerHTML = "";
  data.credentials.forEach(cred => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${cred.role}</td>
      <td>
        <div class="copy-wrapper">
          <code>${cred.user}</code>
          <button class="copy-btn" title="Salin Username" onclick="copyText('${cred.user}', this)"><i class="far fa-copy"></i></button>
        </div>
      </td>
      <td>
        <div class="copy-wrapper">
          <code>${cred.pass}</code>
          <button class="copy-btn" title="Salin Password" onclick="copyText('${cred.pass}', this)"><i class="far fa-copy"></i></button>
        </div>
      </td>
    `;
    credsBody.appendChild(tr);
  });

  // Populate Setup Code Block
  const codeBlock = document.getElementById("setup-code-block");
  codeBlock.textContent = data.setupGuide;

  // Open first tab by default
  switchTab("features");

  // Open Modal Native (Handles top layer, ESC key, and backdrop blur)
  modal.showModal();
}

// Tab Switching Logic
function switchTab(tabId) {
  tabButtons.forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-tab") === tabId);
  });

  tabPanes.forEach(pane => {
    pane.classList.toggle("active", pane.id === `pane-${tabId}`);
  });

  // Load / Clear Iframe dynamically for live demo
  const iframe = document.getElementById("modal-demo-iframe");
  if (tabId === "demo" && activeProjectKey) {
    const project = projectData[activeProjectKey];
    if (project && project.demoUrl) {
      // Avoid reloading if it's already set to the same target
      const targetUrl = project.demoUrl;
      if (!iframe.src.includes(targetUrl)) {
        iframe.src = targetUrl;
      }
    }
  } else {
    // Clear iframe when switching away to stop scripts from running
    iframe.src = "";
  }
}

// Copy Text to Clipboard with visual effect
async function copyText(text, btnElement) {
  try {
    await navigator.clipboard.writeText(text);
    
    // Success UI Feedback
    const icon = btnElement.querySelector("i");
    if (icon) {
      icon.className = "fas fa-check text-green";
      btnElement.style.color = "var(--accent-green)";
      
      setTimeout(() => {
        icon.className = "far fa-copy";
        btnElement.style.color = "";
      }, 2000);
    }
  } catch (err) {
    console.error("Gagal menyalin teks: ", err);
  }
}

// Setup Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Card Buttons
  document.querySelectorAll(".btn-detail").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const projKey = btn.getAttribute("data-project");
      openProjectDetails(projKey);
    });
  });

  // Modal Close Button
  closeBtn.addEventListener("click", () => {
    document.getElementById("modal-demo-iframe").src = "";
    modal.close();
  });

  // Tab Buttons Click
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const tabId = btn.getAttribute("data-tab");
      switchTab(tabId);
    });
  });

  // Setup Code block Copy Button click handler
  document.getElementById("code-copy-btn").addEventListener("click", function() {
    const code = document.getElementById("setup-code-block").textContent;
    copyText(code, this);
  });

  // Click outside Dialog to Close (Detects click on native backdrop overlay)
  modal.addEventListener("click", (e) => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      document.getElementById("modal-demo-iframe").src = "";
      modal.close();
    }
  });

  // Ensure iframe is cleared on ESC key native close
  modal.addEventListener("close", () => {
    document.getElementById("modal-demo-iframe").src = "";
  });
});
