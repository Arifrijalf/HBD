// ==========================================
// DEFINISI ELEMEN DOM
// ==========================================
const slides = document.querySelectorAll(".slide");
const textEl = document.getElementById("message");
const sliderScreen = document.getElementById("slider");
const introScreen = document.getElementById("intro");
const proposalScreen = document.getElementById("proposal");

// Elemen Final
const finalScreen = document.getElementById("final");
const finalTextContainer = document.getElementById("final-text-container"); 
const finalImage = document.getElementById("final-image"); 
const pauseBtn = document.getElementById("pauseBtn"); // Tombol Pause Baru

const music = document.getElementById("music");

// Tombol
const startBtn = document.getElementById("startBtn");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const replayBtn = document.getElementById("replay");

// PESAN SLIDER
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

// TEKS TOMBOL NO
const noTexts = [
  "Yakin gak sayang?", "Masa sih?", "Jangan bohong 😢", 
  "Tega banget..", "Pencet Masih dong!", "Awas ya kalau enggak 😡"
];

let index = 0;
let interval;
let yesFontSize = 1; 
let noClickCount = 0;

// Variabel untuk Timer Final
let finalTimeLeft = 10;
let finalInterval;
let isFinalPaused = false;

// SETUP AWAL
if (slides.length > 0) {
  slides[0].classList.add("active");
  textEl.textContent = messages[0];
}

// 1. LOGIKA TOMBOL 'NO'
noBtn.addEventListener("click", () => {
  if (noClickCount < noTexts.length) {
    noBtn.textContent = noTexts[noClickCount];
  } else {
    noBtn.textContent = "IYAIN AJA DEH! 😤";
  }
  noClickCount++;
  yesFontSize += 0.4;
  yesBtn.style.transform = `scale(${yesFontSize})`;
});

// 2. LOGIKA TOMBOL 'YES' (KE INTRO)
yesBtn.addEventListener("click", () => {
  proposalScreen.style.opacity = 0;
  setTimeout(() => {
    proposalScreen.style.display = "none";
    introScreen.classList.add("show");
  }, 1000);
});

// 3. LOGIKA TOMBOL START (KE SLIDER)
startBtn.onclick = () => {
  introScreen.style.opacity = 0;
  music.play().catch(err => console.log("Gagal play musik:", err));
  setTimeout(() => {
    introScreen.style.display = "none";
    sliderScreen.classList.add("show");
    textEl.classList.add("show");
    startSlider();
  }, 800);
};

// 4. FUNGSI SLIDER
function startSlider() {
  interval = setInterval(() => {
    if (index === slides.length - 1) {
      clearInterval(interval);
      endScene(); // Pindah ke Final
      return;
    }

    textEl.classList.remove("show");
    textEl.classList.add("hide");
    slides[index].classList.remove("active");
    slides[index].classList.add("exit");

    index++;
    slides[index].classList.add("active");

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
// 5. LOGIKA TOMBOL PAUSE TIMER FINAL
// ==========================================
pauseBtn.addEventListener("click", () => {
  isFinalPaused = !isFinalPaused; // Toggle status
  
  if (isFinalPaused) {
    pauseBtn.textContent = "▶ Lanjut Baca";
    pauseBtn.classList.add("paused");
  } else {
    pauseBtn.textContent = `⏸ Jeda (${finalTimeLeft}s)`;
    pauseBtn.classList.remove("paused");
  }
});

// ==========================================
// 6. AKHIR (FINAL SCENE + TIMER)
// ==========================================
function endScene() {
  // 1. Hilangkan teks slider terakhir
  textEl.classList.remove("show");
  textEl.classList.add("hide");

  setTimeout(() => {
    // 2. Hilangkan slider
    sliderScreen.style.opacity = 0;

    setTimeout(() => {
      // 3. Munculkan layar akhir (Teks muncul duluan)
      finalScreen.classList.add("show");

      // 4. Mulai Hitung Mundur 10 Detik
      finalTimeLeft = 10;
      isFinalPaused = false;
      pauseBtn.textContent = `⏸ Jeda (${finalTimeLeft}s)`;

      finalInterval = setInterval(() => {
        // Kalau TIDAK di-pause, waktu berkurang
        if (!isFinalPaused) {
          finalTimeLeft--;
          pauseBtn.textContent = `⏸ Jeda (${finalTimeLeft}s)`;

          // Kalau waktu habis
          if (finalTimeLeft <= 0) {
            clearInterval(finalInterval);
            munculkanFotoTerakhir();
          }
        }
      }, 1000); // 1000ms = 1 detik

    }, 1500); // Delay muncul final screen
  }, 2000); // Delay slider hilang
}

// Fungsi untuk mengganti Teks Akhir menjadi Foto Terakhir
function munculkanFotoTerakhir() {
  // a. Sembunyikan wadah teks (termasuk tombol pause di dalamnya)
  finalTextContainer.classList.add("hide");

  // b. Munculkan gambar akhir setelah teks hilang (delay 1 detik)
  setTimeout(() => {
     finalImage.classList.add("show");
  }, 1000);
}

// Ulang
replayBtn.onclick = () => location.reload();