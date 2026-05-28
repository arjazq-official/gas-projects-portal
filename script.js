// State data proyek dinamis
let projectData = {};
let activeProjectKey = null;

// DOM Elements
const elements = {
  projectsShowcase: document.getElementById("projects-showcase"),
  modal: document.getElementById("detail-modal"),
  modalTitle: document.getElementById("modal-title"),
  modalSubtitle: document.getElementById("modal-subtitle"),
  modalBadge: document.getElementById("modal-badge"),
  modalTech: document.getElementById("modal-tech"),
  closeBtn: document.getElementById("modal-close"),
  tabButtons: document.querySelectorAll(".tab-btn"),
  tabPanes: document.querySelectorAll(".tab-pane"),
  featuresContainer: document.getElementById("features-container"),
  credentialsBody: document.getElementById("credentials-table-body"),
  codeBlock: document.getElementById("setup-code-block"),
  guideLink: document.getElementById("modal-guide-link"),
  copyGuideBtn: document.getElementById("code-copy-btn")
};

// Fetch data projects.json secara dinamis
async function fetchProjects() {
  try {
    const response = await fetch("projects.json");
    const data = await response.json();
    
    // Simpan ke state global yang diindeks berdasarkan key untuk pencarian detail modal cepat
    data.projects.forEach(proj => {
      projectData[proj.key] = proj;
    });

    // Render kartu proyek secara dinamis ke grid
    renderProjectCards(data.projects);
  } catch (err) {
    console.error("Gagal mengambil data projects.json: ", err);
    if (elements.projectsShowcase) {
      elements.projectsShowcase.innerHTML = `
        <div class="col-span-full text-center py-10" style="grid-column: 1 / -1;">
          <i class="fas fa-exclamation-triangle" style="font-size: 2.5rem; color: var(--accent-gold); margin-bottom: 1rem;"></i>
          <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">Gagal Memuat Daftar Proyek</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Pastikan berkas <code>projects.json</code> ada di direktori utama dan memiliki format JSON yang valid.</p>
        </div>
      `;
    }
  }
}

// Render kartu-kartu proyek secara dinamis pada grid portal utama
function renderProjectCards(projects) {
  if (!elements.projectsShowcase) return;
  elements.projectsShowcase.innerHTML = "";

  projects.forEach(project => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.setAttribute("data-color", project.color);
    card.id = `card-${project.key}`;

    // Tampilkan 3 badge stack teknologi pertama sebagai penanda ringkas
    const techBadges = project.techStack.slice(0, 3).map(tech => 
      `<span class="badge badge-tech">${tech}</span>`
    ).join("");

    card.innerHTML = `
      <div class="project-body">
        <div class="project-meta">
          <span class="badge badge-${project.color}">${project.badge}</span>
          ${techBadges}
        </div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.desc}</p>
        <div class="project-footer">
          <a href="${project.demoUrl}" target="_blank" class="btn btn-primary" style="flex: 1;" id="btn-open-${project.key}">
            <i class="fas fa-external-link-alt"></i>
            <span>Buka Demo</span>
          </a>
          <button class="btn btn-secondary" style="flex: 1;" id="btn-detail-${project.key}" onclick="openProjectDetails('${project.key}')">
            <i class="fas fa-info-circle"></i>
            <span>Detail</span>
          </button>
        </div>
      </div>
    `;

    elements.projectsShowcase.appendChild(card);
  });
}

// Buka Dialog Modal Detail Proyek
window.openProjectDetails = function(key) {
  const data = projectData[key];
  if (!data) return;

  activeProjectKey = key;

  // Set Identitas Header
  elements.modalTitle.textContent = data.title;
  elements.modalSubtitle.textContent = data.subtitle;
  elements.modalBadge.textContent = data.badge;

  // Set Warna Badge Kategori
  elements.modalBadge.className = "badge";
  elements.modalBadge.classList.add(`badge-${data.color}`);

  // Render Daftar Lengkap Teknologi
  elements.modalTech.innerHTML = "";
  data.techStack.forEach(tech => {
    const badge = document.createElement("span");
    badge.className = "badge badge-tech";
    badge.textContent = tech;
    elements.modalTech.appendChild(badge);
  });

  // Render Daftar Fitur Utama
  elements.featuresContainer.innerHTML = "";
  data.features.forEach(feat => {
    const li = document.createElement("li");
    li.innerHTML = `<i class="fas fa-check-circle"></i> <span>${feat}</span>`;
    elements.featuresContainer.appendChild(li);
  });

  // Render Tabel Akun Uji Kredensial
  elements.credentialsBody.innerHTML = "";
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
    elements.credentialsBody.appendChild(tr);
  });

  // Render Kode Panduan deploy
  elements.codeBlock.textContent = data.setupGuide;

  // Set Tautan Panduan Khusus
  elements.guideLink.href = data.demoUrl + "panduan.html";

  // Tampilkan tab pertama (Features & Tech) secara default
  switchTab("features");

  // Buka modal native HTML dialog
  elements.modal.showModal();
};

// Logika Perpindahan Sistem Tab di dalam Modal
function switchTab(tabId) {
  elements.tabButtons.forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-tab") === tabId);
  });

  elements.tabPanes.forEach(pane => {
    pane.classList.toggle("active", pane.id === `pane-${tabId}`);
  });

  // Muat iframe demo dinamis saat tab demo dibuka
  const iframe = document.getElementById("modal-demo-iframe");
  if (tabId === "demo" && activeProjectKey) {
    const project = projectData[activeProjectKey];
    if (project && project.demoUrl) {
      const targetUrl = project.demoUrl;
      if (!iframe.src.includes(targetUrl)) {
        iframe.src = targetUrl;
      }
    }
  } else {
    // Kosongkan src iframe saat pindah tab agar proses/skrip iframe berhenti berjalan di latar
    iframe.src = "";
  }
}

// Fungsi menyalin teks ke clipboard dengan umpan balik visual
async function copyText(text, btnElement) {
  try {
    await navigator.clipboard.writeText(text);
    
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

// Pasang Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Inisialisasi pengambilan data JSON proyek
  fetchProjects();

  // Tombol Tutup Modal
  if (elements.closeBtn) {
    elements.closeBtn.addEventListener("click", () => {
      document.getElementById("modal-demo-iframe").src = "";
      elements.modal.close();
    });
  }

  // Interaksi Klik Tombol Tab Modal
  elements.tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const tabId = btn.getAttribute("data-tab");
      switchTab(tabId);
    });
  });

  // Salin seluruh isi panduan terminal deploy
  if (elements.copyGuideBtn) {
    elements.copyGuideBtn.addEventListener("click", function() {
      const code = elements.codeBlock.textContent;
      copyText(code, this);
    });
  }

  // Klik di area luar modal (backdrop) otomatis menutup modal dialog
  if (elements.modal) {
    elements.modal.addEventListener("click", (e) => {
      const dialogDimensions = elements.modal.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        document.getElementById("modal-demo-iframe").src = "";
        elements.modal.close();
      }
    });

    // Event listener native close (misal menekan tombol ESC)
    elements.modal.addEventListener("close", () => {
      document.getElementById("modal-demo-iframe").src = "";
    });
  }
});
