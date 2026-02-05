// ELEMEN DOM
const slides = document.querySelectorAll(".slide");
const textEl = document.getElementById("message");
const sliderScreen = document.getElementById("slider");
const introScreen = document.getElementById("intro");
const proposalScreen = document.getElementById("proposal");
const finalScreen = document.getElementById("final");
const music = document.getElementById("music");

// TOMBOL
const startBtn = document.getElementById("startBtn"); // Tombol di Intro
const yesBtn = document.getElementById("yesBtn");     // Tombol Sayang
const noBtn = document.getElementById("noBtn");       // Tombol Enggak
const replayBtn = document.getElementById("replay");

// PESAN SLIDER (Hanya 8 pesan)
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

// TEKS UNTUK TOMBOL NO
const noTexts = [
  "Yakin gak sayang?", "Masa sih?", "Jangan bohong 😢", 
  "Masa iyaa", "Masihh kann", "Awas ya kalau enggak 😡"
];

let index = 0;
let interval;
let yesFontSize = 1; 
let noClickCount = 0;

// Set slide pertama
if (slides.length > 0) {
  slides[0].classList.add("active");
  textEl.textContent = messages[0];
}

// ==========================================
// 1. LOGIKA TOMBOL 'NO' (JAIL)
// ==========================================
noBtn.addEventListener("click", () => {
  if (noClickCount < noTexts.length) {
    noBtn.textContent = noTexts[noClickCount];
  } else {
    noBtn.textContent = "IYAIN AJA DEH! 😤";
  }
  noClickCount++;
  
  // Perbesar tombol YES
  yesFontSize += 0.4;
  yesBtn.style.transform = `scale(${yesFontSize})`;
});

// ==========================================
// 2. LOGIKA TOMBOL 'YES' (PINDAH KE INTRO)
// ==========================================
yesBtn.addEventListener("click", () => {
  // Sembunyikan Pertanyaan
  proposalScreen.style.opacity = 0;
  
  setTimeout(() => {
    proposalScreen.style.display = "none";
    
    // Munculkan Intro Ulang Tahun
    introScreen.classList.add("show");
  }, 1000);
});

// ==========================================
// 3. LOGIKA TOMBOL START (MULAI MUSIK & FOTO)
// ==========================================
startBtn.onclick = () => {
  introScreen.style.opacity = 0;
  
  // Putar Musik
  music.play().catch(err => console.log("Gagal putar musik otomatis:", err));

  setTimeout(() => {
    introScreen.style.display = "none";
    
    // Munculkan Slider
    sliderScreen.classList.add("show");
    textEl.classList.add("show");
    
    startSlider();
  }, 800);
};

// ==========================================
// 4. FUNGSI SLIDER
// ==========================================
function startSlider() {
  interval = setInterval(() => {
    // Cek Selesai
    if (index === slides.length - 1) {
      clearInterval(interval);
      endScene();
      return;
    }

    // Ganti Slide & Teks
    textEl.classList.remove("show");
    textEl.classList.add("hide");

    slides[index].classList.remove("active");
    slides[index].classList.add("exit");

    index++;
    slides[index].classList.add("active");

    // Tampilkan pesan jika masih ada (foto 1-8)
    if (index < messages.length) {
      setTimeout(() => {
        textEl.textContent = messages[index];
        textEl.classList.remove("hide");
        textEl.classList.add("show");
      }, 600);
    }

  }, 4500);
}

// ==========================================
// 5. AKHIR (FINAL SCREEN)
// ==========================================
function endScene() {
  textEl.classList.remove("show");
  textEl.classList.add("hide");

  setTimeout(() => {
    sliderScreen.style.opacity = 0;
    setTimeout(() => {
      finalScreen.classList.add("show");
    }, 1500);
  }, 2000);
}

// Ulang
replayBtn.onclick = () => location.reload();