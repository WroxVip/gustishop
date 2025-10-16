// Pastikan CONFIG dari config.js sudah ada di window
const CONFIG = window.CONFIG || {}; // ← Ambil CONFIG dari file config.js

/* ============================== UTIL ============================== */

/** Selektor cepat: $('css') */
const $ = (sel, ctx = document) => ctx.querySelector(sel); // ← Helper pilih elemen

/** Formatter rupiah (tanpa desimal) */
const IDR = new Intl.NumberFormat('id-ID', {               // ← Format harga ke IDR
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0
});

/** Bangun URL checkout:
 * - Jika checkoutPath sudah URL http(s) → pakai langsung
 * - Jika hanya '/path' → digabung ke CONFIG.site.lynkBase
 */
function checkoutUrl(pathOrId){                             // ← Utility untuk gabung URL
  if (!pathOrId) return CONFIG.site.lynkBase || '#';        // ← Fallback kalau kosong
  if (/^https?:\/\//i.test(pathOrId)) return pathOrId;      // ← Jika sudah URL absolut
  const base = (CONFIG.site.lynkBase || '').replace(/\/$/, ''); // ← Hilangkan '/' di akhir base
  const path = pathOrId.startsWith('/') ? pathOrId : '/' + pathOrId; // ← Pastikan path diawali '/'
  return base + path;                                       // ← Gabungkan base + path
}

/* ========================= THEME & LAYOUT =========================
 * Menyuntik semua angka/warna dari CONFIG → CSS variables (di :root)
 * Supaya kamu tidak perlu sentuh CSS kalau hanya ubah tema/ukuran.
 * ================================================================= */
function applyThemeAndLayout(){
  const r = document.documentElement.style;   // ← Akses inline style :root
  const c = CONFIG.colors || {};              // ← Palet warna dari config
  const l = CONFIG.layout || {};              // ← Ukuran & grid dari config

  // --- Warna (semua di-mapping ke --var) ---
  r.setProperty('--bg', c.bg || '#0c0f13');                 // ← Background body
  r.setProperty('--bg-soft', c.bgSoft || '#10151c');        // ← Background lembut/topbar
  r.setProperty('--card', c.card || '#151b23');             // ← Latar kartu produk
  r.setProperty('--card-hover', c.cardHover || '#1b2430');  // ← Latar kartu saat hover
  r.setProperty('--text', c.text || '#e6e8eb');             // ← Teks utama
  r.setProperty('--muted', c.muted || '#9aa3ad');           // ← Teks sekunder
  r.setProperty('--line', c.line || '#232c37');             // ← Border halus
  r.setProperty('--accent', c.accent || '#22c55e');         // ← Tombol
  r.setProperty('--accent-2', c.accent2 || '#ef4444');      // ← Pita BEST PRICE
  r.setProperty('--accentText', c.accentText || '#0a0f14'); // ← Teks tombol

  // --- Grid & ukuran ---
  r.setProperty('--cols-mobile', l.columnsMobile ?? 1);     // ← Kolom hp kecil
  r.setProperty('--cols-tablet', l.columnsTablet ?? 2);     // ← Kolom tablet
  r.setProperty('--cols-desktop', l.columnsDesktop ?? 3);   // ← Kolom desktop

  r.setProperty('--gap', (l.gap ?? 12) + 'px');             // ← Jarak antar kartu
  r.setProperty('--card-pad', (l.cardPadding ?? 12) + 'px');// ← Padding dalam kartu
  r.setProperty('--radius', (l.radius ?? 16) + 'px');       // ← Lengkungan kartu
  r.setProperty('--ratio', l.imageRatio || '4/3');          // ← Rasio gambar

  r.setProperty('--title-size', (l.titleSize ?? 15) + 'px');// ← Font judul
  r.setProperty('--price-size', (l.priceSize ?? 18) + 'px');// ← Font harga
  r.setProperty('--compare-size', (l.compareSize ?? 12) + 'px');// ← Font harga coret
  r.setProperty('--badge-size', (l.badgeSize ?? 12) + 'px');// ← Font badge terjual
  r.setProperty('--ribbon-size', (l.ribbonSize ?? 11) + 'px');// ← Font pita

  r.setProperty('--btn-pady', (l.buttonPadY ?? 12) + 'px'); // ← Padding Y tombol
  r.setProperty('--btn-padx', (l.buttonPadX ?? 14) + 'px'); // ← Padding X tombol
  r.setProperty('--btn-radius', (l.buttonRadius ?? 12) + 'px'); // ← Radius tombol
}

/* ============================= PROFILE ============================
 * Mengisi profil: slug, username, tagline, avatar (gambar/huruf),
 * dan link WhatsApp melayang di kanan bawah.
 * ================================================================= */
function fillBasics() {
  // Isi slug toko di navbar
  const slug = document.getElementById('slug');
  if (slug) slug.textContent = (CONFIG.site.slug || '').toUpperCase();

  // === Username + centang biru ===
  const usernameEl = document.getElementById('username');
  if (usernameEl) {
    usernameEl.innerHTML = `
      ${CONFIG.site.username || ''}
      <img src="assets/images/verified.png" alt="verified" class="verified-icon" />
    `;
  }

  // Subjudul / tagline
  const tagline = document.getElementById('tagline');
  if (tagline) tagline.textContent = CONFIG.site.tagline || '';

  // Avatar (gambar / fallback huruf)
  const img = document.getElementById('avatarImg');
  const txt = document.getElementById('avatarText');
  if (CONFIG.site.avatarImage) {
    img.src = CONFIG.site.avatarImage;
    img.style.display = 'block';
    if (txt) txt.style.display = 'none';
  } else {
    img.removeAttribute('src');
    img.style.display = 'none';
    if (txt) {
      txt.textContent = CONFIG.site.avatarText || '';
      txt.style.display = 'grid';
    }
  }

  // Tombol WhatsApp di pojok bawah
  const wa = document.getElementById('waBtn');
  if (wa) wa.href = `https://wa.me/${CONFIG.site.waNumber || ''}`;
}

/* =========================== RENDER PRODUK ========================
 * Loop CONFIG.products → buat kartu HTML → pasang ke grid.
 * Klik kartu (di area kosong) = trigger klik tombol beli.
 * ================================================================= */
function renderProducts(){
  const grid = $('#grid');                  // ← Container grid
  if (!grid) return;                        // ← Guard: kalau nggak ada elemen grid, stop

  const items = Array.isArray(CONFIG.products) ? CONFIG.products : []; // ← Ambil array produk aman
  if (!items.length){                       // ← Jika belum ada produk
    grid.innerHTML =                       // ← Tampilkan info kosong
      `<div style="color:var(--muted);padding:12px;border:1px dashed var(--line);border-radius:12px">
        Belum ada produk. Tambahkan di <code>config.js → products</code>.
      </div>`;
    return;
  }

  // Bangun kartu per produk dalam satu string HTML
  const html = items.map(p => `
    <article class="card" data-id="${p.id || ''}">                                          <!-- Kartu -->
      ${p.ribbonText ? `<div class="ribbon">${p.ribbonText}</div>` : ''}                          <!-- Pita -->
      <a class="img-link" href="${checkoutUrl(p.checkoutPath || p.id)}" target="_blank" rel="noopener" aria-label="Checkout ${p.title}"> <!-- Link gambar -->
        <img class="card-img" src="${p.image}" alt="${p.title}" loading="lazy" />           <!-- Gambar -->
      </a>
      <div class="card-body">                                                                <!-- Body -->
        ${p.soldText ? `<span class="sold-badge">${p.soldText}</span>` : ''}                <!-- Badge terjual -->
        <h3 class="title">${p.title}</h3>                                                    <!-- Judul -->
        <div>                                                                               <!-- Harga -->
          <div class="price">${IDR.format(p.price || 0)}</div>                              
          ${p.compareAt ? `<div class="compare">${IDR.format(p.compareAt)}</div>` : ''}     <!-- Harga coret -->
        </div>
        <a class="buy" href="${checkoutUrl(p.checkoutPath || p.id)}" target="_blank" rel="noopener">Beli Sekarang</a> <!-- Tombol beli -->
      </div>
    </article>
  `).join('');

  grid.innerHTML = html;                   // ← Tempelkan seluruh kartu ke grid

  // Biar klik di area kartu (bukan link) juga membuka checkout
  grid.querySelectorAll('.card').forEach(card => {      // ← Ambil semua kartu
    card.addEventListener('click', (e) => {             // ← Pasang event klik
      if (e.target.closest('a')) return;                // ← Kalau klik di <a>, biarkan default
      card.querySelector('.buy')?.click();              // ← Klik tombol "Beli Sekarang"
    }, { passive: true });
  });
}

/* ============================== BOOT ==============================
 * Urutan eksekusi saat halaman siap.
 * ================================================================= */
(function init(){
  try{
    applyThemeAndLayout(); // ← 1) Terapkan warna & ukuran
    fillBasics();          // ← 2) Isi profil & WA
    renderProducts();      // ← 3) Render kartu produk
  }catch(e){
    const grid = $('#grid'); // ← Jika ada error tak terduga, tampilkan ke UI
    if (grid){
      grid.innerHTML =
        `<div style="padding:12px;border:1px dashed var(--line);border-radius:12px;color:#ef4444">
           JS error: ${String(e)}
         </div>`;
    }
  }
})();
// =============== FITUR PENCARIAN PRODUK (AMAN) ===============
function setupSearch(){
  const grid = document.getElementById('grid');
  const btn  = document.getElementById('searchBtn');
  const inp  = document.getElementById('searchInput');
  if (!grid || !btn || !inp) return;

  const cards = () => Array.from(grid.querySelectorAll('.card'));

  // Pastikan semua kartu muncul saat load
  const showAll = () => cards().forEach(c => c.style.display = '');

  // Filter kartu berdasar judul/badge
  const filter = (q) => {
    const kw = (q || '').trim().toLowerCase();
    if (!kw) { showAll(); return; }
    cards().forEach(c => {
      const title = (c.querySelector('.title')?.textContent || '').toLowerCase();
      const badge = (c.querySelector('.sold-badge')?.textContent || '').toLowerCase();
      c.style.display = (title.includes(kw) || badge.includes(kw)) ? '' : 'none';
    });
  };

  // Reset semua kartu saat pertama kali jalan
  showAll();

  // Klik ikon search → tampilkan input + fokus (1x klik saja)
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    inp.classList.add('show');
    inp.focus();
  });

  // Ketik → langsung filter
  inp.addEventListener('input', (e) => filter(e.target.value));

  // ESC → bersihkan & tutup
  inp.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      inp.value = '';
      filter('');
      inp.blur();
      inp.classList.remove('show');
    }
  });

  // Klik di luar area actions → sembunyikan input (kartu tidak disentuh)
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.actions')) inp.classList.remove('show');
  });
}

document.addEventListener('DOMContentLoaded', setupSearch);
// === MENU POPUP ===
function setupMenu() {
  const btn = document.getElementById("menuBtn");
  const popup = document.getElementById("menuPopup");

  if (!btn || !popup) return; // keamanan biar gak error

  btn.addEventListener("click", () => {
    popup.classList.toggle("show");
  });

  // Tutup saat klik di luar menu
  document.addEventListener("click", (e) => {
    if (!popup.contains(e.target) && !btn.contains(e.target)) {
      popup.classList.remove("show");
    }
  });
}

// Jalankan menu setelah halaman siap
document.addEventListener("DOMContentLoaded", () => {
  setupMenu();
/* === MENU: toggle tampil/sembunyi === */
(function setupMenu(){
  const menuBtn = document.getElementById('menuBtn');
  const popup = document.getElementById('menuPopup');

  if (!menuBtn || !popup) return;

  // buka/tutup
  menuBtn.addEventListener('click', (e)=>{
    e.stopPropagation();
    popup.classList.toggle('show');
  });

  // klik luar -> tutup
  document.addEventListener('click', (e)=>{
    if (!e.target.closest('#menuPopup') && !e.target.closest('#menuBtn')) {
      popup.classList.remove('show');
    }
  });

  // Escape -> tutup
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape') popup.classList.remove('show');
  });
})();
/* === MENU: toggle tampil/sembunyi === */
(function setupMenu(){
  const menuBtn = document.getElementById('menuBtn');
  const popup   = document.getElementById('menuPopup');

  if (!menuBtn || !popup) return;

  menuBtn.addEventListener('click', (e)=>{
    e.stopPropagation();
    popup.classList.toggle('show');
  });

  // klik luar -> tutup
  document.addEventListener('click', (e)=>{
    if (!e.target.closest('#menuPopup') && !e.target.closest('#menuBtn')) {
      popup.classList.remove('show');
    }
  });

  // Esc -> tutup
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape') popup.classList.remove('show');
  });
})();
});
