/**
 * ===================== CONFIG (EDIT DI SINI) =====================
 * Semua yang bisa kamu kustom mulai dari teks, warna, ukuran,
 * hingga daftar produk ada di file ini. app.js & styles.css
 * akan membaca nilai di sini, jadi kamu edit dari satu tempat.
 */

export const CONFIG = {                                     // ← Ekspor objek CONFIG agar app.js bisa mengimpor
  site: {                                                   // ← Bagian info situs/profil
    slug: 'GUSTISHOP',                                    // ← Teks setelah "lynk.id/" di navbar
    lynkBase: 'https://lynk.id/igustimr',                   // ← Base URL lynk (akan digabung dengan checkoutPath)
    waNumber: '6281234567890',                              // ← Nomor WA tanpa tanda + (untuk tombol wa)
    avatarImage: './assets/images/logobaru.png',               // ← Path PNG avatar lokal (boleh URL full juga)
    avatarText: 'G',                                       // ← Huruf fallback jika avatarImage kosong/error
    username: 'GUSTI',                                 // ← Username besar di bawah avatar
    tagline: 'PRODUCTS ALWAYS READY!!'                     // ← Subjudul kecil
  },

  colors: {                                                // ← Palet warna tema (dipakai jadi CSS variable)
    bg: '#0c0f13',                                         // ← Warna latar halaman
    bgSoft: '#000000',                                     // ← Latar bagian atas (topbar/overlay)
    card: '#151b23',                                       // ← Latar kartu produk
    cardHover: '#1b2430',                                  // ← Latar kartu saat hover
    text: '#e6e8eb',                                       // ← Warna teks utama
    muted: '#9aa3ad',                                      // ← Warna teks sekunder
    line: '#232c37',                                       // ← Warna garis border halus
    accent: '#22c55e',                                     // ← Warna tombol "Beli Sekarang"
    accent2: '#ef4444',                                    // ← Warna label "BEST PRICE"
    accentText: '#0a0f14'                                  // ← Warna teks di dalam tombol (kontras)
  },

  layout: {                                                // ← Semua ukuran/tata letak
    columnsMobile: 2,                                      // ← Jumlah kolom grid di hp kecil
    columnsTablet: 2,                                      // ← Jumlah kolom grid di tablet
    columnsDesktop: 4,                                     // ← Jumlah kolom grid di desktop
    gap: 12,                                               // ← Jarak antar kartu (px)
    cardPadding: 12,                                       // ← Padding dalam kartu (px)
    radius: 16,                                            // ← Lengkungan sudut kartu (px)
    imageRatio: '1/1',                                     // ← Rasio gambar: '1/1', '4/3', '16/9', dst.
    titleSize: 15,                                         // ← Ukuran font judul produk (px)
    priceSize: 18,                                         // ← Ukuran font harga (px)
    compareSize: 12,                                       // ← Ukuran font harga coret (px)
    badgeSize: 12,                                         // ← Ukuran font badge "Terjual ..."
    ribbonSize: 11,                                        // ← Ukuran font pita "BEST PRICE"
    buttonPadY: 12,                                        // ← Padding vertikal tombol (px)
    buttonPadX: 14,                                        // ← Padding horizontal tombol (px)
    buttonRadius: 12                                       // ← Lengkungan tombol (px)
  },

  // WAJIB: pastikan CONFIG ada di window (global)
window.CONFIG = {
  site: {
    slug: "gustishop",
    username: "@igustimr",
    tagline: "PRODUCTS ALWAYS READY!!",
    avatarImage: true,
    waNumber: "6285xxxxxxx"
  },
  products: [
  // 1
  {
    id: 'canva-1bln',
    title: 'Canva Pro 1 Tahun',
    price: 25000,
    compareAt: 799000,
    soldText: 'Terjual 3,1k+',
    bestPrice: true,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZvsUvFSTxnBHKpdu7oOBwfGK6Y4U8Bz-Vp0ZtK81pB125JLV4CYzu5CA&s=10',
    checkoutPath: 'http://lynk.id/igustimr/qg01o8x79l6p/checkout'
  },
  // 2
  {
    id: 'canva-1th',
    title: 'Canva Pro 1 Bulan',
    price: 5000,
    compareAt: 99000,
    soldText: 'Terjual 4,2k+',
    ribbonText: 'HOT',   // <— teks khusus
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZvsUvFSTxnBHKpdu7oOBwfGK6Y4U8Bz-Vp0ZtK81pB125JLV4CYzu5CA&s=10',
    checkoutPath: 'http://lynk.id/igustimr/mdkyvz3ew5m9/checkout'
  },
  // 3
  {
    id: 'copyai-1bln',
    title: 'Capcut Pro 7 Hari',
    price: 13000,
    compareAt: 78200,
    soldText: 'Best Price',
    bestPrice: true,
    image: 'https://a.allegroimg.com/s128/11ceef/d9eccc0c434b945c4bf7ddffa3ff/CapCut-Pro-1-MIESIAC-30-DNI',
    checkoutPath: 'http://lynk.id/igustimr/vky2gq98rvly/checkout'
  },
  // 4
  {
    id: 'netflix-1bln',
    title: 'Canva Pro 4 Bulan',
    price: 15000,
    compareAt: 359000,
    soldText: 'Terjual 1,7k+',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZvsUvFSTxnBHKpdu7oOBwfGK6Y4U8Bz-Vp0ZtK81pB125JLV4CYzu5CA&s=10',
    checkoutPath: 'http://lynk.id/igustimr/5wpgk9keped9/checkout'
  },
  // 5
  {
    id: 'spotify-1bln',
    title: 'Netflix Premium 1 Bulan',
    price: 20000,
    compareAt: 85000,
    soldText: 'Terjual 1k+',
    image: 'https://assets.b9.com.br/wp-content/uploads/2016/06/netflix-logo-thumb.jpg',
    checkoutPath: 'http://lynk.id/igustimr/eq6xyqqp4o97/checkout'
  },
  // 6
  {
    id: 'ytp-1bln',
    title: 'Spotify Premium 1 Bulan',
    price: 30000,
    compareAt: 90000,
    soldText: 'Laris!',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgDbAShmwhKIx2qsE6pgcMD28GYOJaQqTZS1KKVHA3JyJbATZyOYcVJbo&s=10',
    checkoutPath: 'http://lynk.id/igustimr/8k4mwogw7xpv/checkout'
  },
  // 7
  {
    id: 'capcut-1bln',
    title: 'Get Contact Pro 1 Bulan',
    price: 18000,
    compareAt: 60000,
    soldText: 'Best Seller',
    image: 'https://kuotareguler.com/wp-content/uploads/2023/12/getcontact-premium.webp',
    checkoutPath: 'http://lynk.id/igustimr/8892xkmkgn12/checkout'
  },
  // 8
  {
    id: 'midjourney-1bln',
    title: 'Youtube Pro 1 Bulan',
    price: 16000,
    compareAt: 149000,
    soldText: 'Terjual 1,2k+',
    image: 'https://bdtechpark.com/wp-content/uploads/2024/12/Untitled-design22.png',
    checkoutPath: 'http://lynk.id/igustimr/w2l78g1ezw67/checkout'
  },
  // 9
  {
    id: 'grammarly-1bln',
    title: 'Remini Pro 7 Hari',
    price: 13000,
    compareAt: 60000,
    soldText: 'Terjual 837+',
    image: 'https://static.republika.co.id/uploads/member/images/news/8dg160f5kt.jpg',
    checkoutPath: 'http://lynk.id/igustimr/llmyk11ooe47/checkout'
  },
  // 10
  {
    id: 'figma-1bln',
    title: 'Apple Music 1 Bulan',
    price: 22000,
    compareAt: 99000,
    soldText: 'Music ios',
    image: 'https://routenote.com/blog/wp-content/uploads/2024/01/Apple-Music-for-Artists.jpg',
    checkoutPath: 'http://lynk.id/igustimr/l4xkdqek8p87/checkout'
  },
  // 11
  {
    id: 'canva-team',
    title: 'WeTv Premium 1 Bulan',
    price: 25000,
    compareAt: 129000,
    soldText: 'Laris!',
    image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/98/MTA-182205772/wetv_wetv_vip_1_bulan_full02_t9vlxpzb.jpg',
    checkoutPath: 'http://lynk.id/igustimr/6852xk9920le/checkout'
  },
  // 12
  {
    id: 'capcut-6bln',
    title: 'DramaBox Vip 1 Bulan',
    price: 25000,
    compareAt: 150000,
    soldText: 'Laris!',
    image: 'https://pnghdpro.com/wp-content/themes/pnghdpro/download/social-media-and-brands/dramabox-logo-icon-hd.png',
    checkoutPath: 'http://lynk.id/igustimr/9nq2wgm344j0/checkout'
  },
  // 13
  {
    id: 'notion-1th',
    title: 'RCTI+ 1 Bulan',
    price: 30000,
    compareAt: 799000,
    soldText: 'Terjual 450+',
    image: 'https://img.inews.co.id/media/800/files/inews_new/2024/09/21/cara_bayar_dan_berlangganan_rcti_plus.jpg',
    checkoutPath: 'http://lynk.id/igustimr/o9p3xdkwzdv8/checkout'
  },
  // 14
  {
    id: 'adobe-cc-1bln',
    title: 'Zoom 1 Bulan',
    price: 25000,
    compareAt: 879000,
    soldText: 'Paling dicari',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYgNOfQe7ZV41Lo_fR3Yuz6D-Eg8_fJ2pa2r78zsjsUMW3BVPK9B7BQ58&s=10',
    checkoutPath: 'http://lynk.id/igustimr/wvqzmxl8e8rl/checkout'
  },
  // 15
  {
    id: 'office-365-1th',
    title: 'Vision+ 1 Bulan',
    price: 35000,
    compareAt: 90000,
    soldText: 'Laris!',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS46BQd_XqRZ2hw0Tc6uNxpNbMQ7b89MI8dcQj3hyzBacyIU0FA9RqL76Jt&s=10',
    checkoutPath: 'http://lynk.id/igustimr/60715ekx2vn0/checkout'
  },
  // 16
  {
    id: 'drive-2tb-1bln',
    title: 'Disney+ 1 Bulan',
    price: 28000,
    compareAt: 135000,
    soldText: 'Laris!',
    image: 'https://www.animationxpress.com/wp-content/uploads/2020/03/DisneyHotstar-Logo.png',
    checkoutPath: 'http://lynk.id/igustimr/l521qnxvlymo/checkout'
  },
  // 17
  {
    id: 'dropbox-2tb-1bln',
    title: 'Viu 1 Bulan',
    price: 15000,
    compareAt: 199000,
    soldText: 'Laris!',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEaqX5YcFtZwbKiQk_ZVg1fiDKv_LwH35bAFx8CP4xXuUwTU2lIwk8Lsc&s=10',
    checkoutPath: 'http://lynk.id/igustimr/zq7rk2kzdeo8/checkout'
  },
  // 18
  {
    id: 'deezer-1bln',
    title: 'Lightroom 1 Tahun',
    price: 25000,
    compareAt: 749000,
    soldText: 'Terjual 249+',
    image: 'https://lightroompro.app/wp-content/uploads/2024/10/Lightoom-Hero-300x300.webp',
    checkoutPath: 'http://lynk.id/igustimr/9r37zwz73p1y/checkout'
  },
  // 19
  {
    id: 'canva-edu-1th',
    title: 'iQIYI 1 Bulan',
    price: 15000,
    compareAt: 799000,
    soldText: 'terjual 86+',
    image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/106/MTA-178521784/iqiyi_iqiyi_premium_full01_hw2nvn7u.jpg',
    checkoutPath: 'http://lynk.id/igustimr/4e7ozk5e81vg/checkout'
  },
  // 20
  {
    id: 'Dazz-Cam',
    title: 'Dazz Cam 1 Tahun IOS',
    price: 22000,
    compareAt: 74900,
    soldText: 'Terjual 104+',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/0d/49/74/0d4974de-0ce9-ba1c-a189-4a3378e1a7a2/AppIcon-0-0-1x_U007epad-0-11-0-sRGB-85-220.png/1024x1024bb.png',
    checkoutPath: 'http://lynk.id/igustimr/p72dpz4xde8v/checkout'
  },
{
    id: 'Dazz-Cam',
    title: 'Dazz Cam 1 Tahun IOS',
    price: 22000,
    compareAt: 74900,
    soldText: 'Terjual 104+',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/0d/49/74/0d4974de-0ce9-ba1c-a189-4a3378e1a7a2/AppIcon-0-0-1x_U007epad-0-11-0-sRGB-85-220.png/1024x1024bb.png',
    checkoutPath: 'http://lynk.id/igustimr/p72dpz4xde8v/checkout'
  }
],                                                        // ← Akhir array products
};                                                         // ← Akhir objek CONFIG
