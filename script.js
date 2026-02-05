// ===============================
// SLIDER FOTO + TEKS HALUS
// ===============================

// ambil semua slide & teks
const slides = document.querySelectorAll(".slide");
const textEl = document.getElementById("message");

// teks ucapan (sesuai urutan foto)
const messages = [
  "Selamat ulang tahun sayang 🤍",
  "Semoga hari ini penuh senyum",
  "Semoga semua hal baik selalu datang ke kamu",
  "Terima kasih sudah jadi diri kamu yang luar biasa",
  "Aku selalu doakan yang terbaik buat kamu"
];

// index slide aktif
let index = 0;

// set awal
slides[0].classList.add("active");
textEl.textContent = messages[0];
textEl.classList.add("show");

// interval waktu (ms)
const SLIDE_DURATION = 4500;
const TEXT_DELAY = 600; // jeda teks setelah slide mulai

function startSlider(){
  setInterval(() => {

    // ===== 1. SEMBUNYIKAN TEKS =====
    textEl.classList.remove("show");
    textEl.classList.add("hide");

    // ===== 2. FOTO LAMA KELUAR =====
    slides[index].classList.remove("active");
    slides[index].classList.add("exit");

    // hitung slide berikutnya
    const next = (index + 1) % slides.length;

    // ===== 3. FOTO BARU MASUK =====
    slides[next].classList.remove("exit");
    slides[next].classList.add("active");

    // ===== 4. GANTI TEKS SETELAH JEDA =====
    setTimeout(() => {
      textEl.textContent = messages[next % messages.length];
      textEl.classList.remove("hide");
      textEl.classList.add("show");
    }, TEXT_DELAY);

    index = next;

  }, SLIDE_DURATION);
}

// mulai slider
startSlider();
