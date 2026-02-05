// Ambil elemen dari DOM
const slides = document.querySelectorAll(".slide");
const textEl = document.getElementById("message");
const slider = document.getElementById("slider");
const intro = document.getElementById("intro");
const finalScreen = document.getElementById("final");
const music = document.getElementById("music");
const startBtn = document.getElementById("startBtn");
const replayBtn = document.getElementById("replay");

// Daftar Pesan (Hanya 8 pesan)
const messages = [
  "Selamat ulang tahun sayang ehh elaa 🤍",
  "Semoga hari ini penuh senyum",
  "Semoga semua doa baik elaa terkabul",
  "Semoga panjang umur, sehat selalu",
  "Rip selalu doakan yang terbaik buat elaa",
  "Rip hanya bisa bikin ini ajaa",
  "Maap yaa kalau gak sesuai harapan elaa",
  "ada pesan di akhir nanti untuk elaa"
];

let index = 0;
let interval;

// Inisialisasi slide pertama
if (slides.length > 0) {
  slides[0].classList.add("active");
  // Set teks awal (karena index 0 pasti ada pesannya)
  textEl.textContent = messages[0];
}

// Tombol Mulai
startBtn.onclick = () => {
  intro.style.opacity = 0; 
  setTimeout(() => {
    intro.style.display = "none";
    slider.classList.add("show");
    
    music.play().catch(error => console.log("Playback error:", error));
    
    // Tampilkan teks pertama
    textEl.classList.add("show");
    
    startSlider();
  }, 800);
};

function startSlider() {
  interval = setInterval(() => {
    // Cek apakah sudah di slide terakhir (Foto ke-15)
    if (index === slides.length - 1) {
      clearInterval(interval);
      endScene();
      return;
    }

    // 1. Sembunyikan teks lama (Setiap ganti slide, teks wajib hilang dulu)
    textEl.classList.remove("show");
    textEl.classList.add("hide");

    // 2. Ganti slide foto
    slides[index].classList.remove("active");
    slides[index].classList.add("exit");

    index++;
    slides[index].classList.add("active");

    // 3. Cek: Apakah untuk foto ini ada pesannya?
    if (index < messages.length) {
      // KALAU ADA PESAN (Foto 1-8):
      setTimeout(() => {
        textEl.textContent = messages[index];
        textEl.classList.remove("hide");
        textEl.classList.add("show");
      }, 600); // Muncul setelah delay dikit
    } 
    else {
      // KALAU TIDAK ADA PESAN (Foto 9-15):
      // Biarkan tetap tersembunyi (hide), jangan lakukan apa-apa.
      // Teks akan tetap hilang sampai slide habis.
    }

  }, 4500); // Ganti slide setiap 4.5 detik
}

function endScene() {
  // Pastikan teks benar-benar hilang sebelum layar akhir
  textEl.classList.remove("show");
  textEl.classList.add("hide");

  setTimeout(() => {
    slider.style.opacity = 0;
    setTimeout(() => {
      finalScreen.classList.add("show");
    }, 1500);
  }, 2000);
}

replayBtn.onclick = () => {
  location.reload();
};