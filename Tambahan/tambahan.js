// Toggle mobile menu
const mobileToggle = document.getElementById("mobile-menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileToggle && mobileMenu) {
  mobileToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// Dropdown STRUKTUR (desktop)
const strukturToggle = document.getElementById("menu-struktur-toggle");
const strukturDropdown = document.getElementById("menu-struktur-dropdown");
const strukturChevron = document.getElementById("menu-struktur-chevron");
const strukturWrapper = document.getElementById("menu-struktur-wrapper");

if (strukturToggle && strukturDropdown && strukturChevron && strukturWrapper) {
  strukturToggle.addEventListener("click", () => {
    const isHidden = strukturDropdown.classList.contains("hidden");
    if (isHidden) {
      strukturDropdown.classList.remove("hidden");
      strukturChevron.classList.add("rotate-180");
    } else {
      strukturDropdown.classList.add("hidden");
      strukturChevron.classList.remove("rotate-180");
    }
  });

  // Tutup dropdown jika klik di luar area menu
  document.addEventListener("click", (e) => {
    if (!strukturWrapper.contains(e.target)) {
      if (!strukturDropdown.classList.contains("hidden")) {
        strukturDropdown.classList.add("hidden");
        strukturChevron.classList.remove("rotate-180");
      }
    }
  });
}

// Dropdown STRUKTUR (desktop)
const dokumentasiToggle = document.getElementById("menu-dokumentasi-toggle");
const dokumentasiDropdown = document.getElementById(
  "menu-dokumentasi-dropdown"
);
const dokumentasiChevron = document.getElementById("menu-dokumentasi-chevron");
const dokumentasiWrapper = document.getElementById("menu-dokumentasi-wrapper");

if (
  dokumentasiToggle &&
  dokumentasiDropdown &&
  dokumentasiChevron &&
  dokumentasiWrapper
) {
  dokumentasiToggle.addEventListener("click", () => {
    const isHidden = dokumentasiDropdown.classList.contains("hidden");
    if (isHidden) {
      dokumentasiDropdown.classList.remove("hidden");
      dokumentasiChevron.classList.add("rotate-180");
    } else {
      dokumentasiDropdown.classList.add("hidden");
      dokumentasiChevron.classList.remove("rotate-180");
    }
  });
  // Tutup dropdown jika klik di luar area menu
  document.addEventListener("click", (e) => {
    if (!strukturWrapper.contains(e.target)) {
      if (!strukturDropdown.classList.contains("hidden")) {
        strukturDropdown.classList.add("hidden");
        strukturChevron.classList.remove("rotate-180");
      }
    }
  });
}

// Animasi fade-in ketika elemen masuk / keluar viewport (scroll down & up)
document.addEventListener("DOMContentLoaded", () => {
  const fadeEls = document.querySelectorAll(".fade-in-on-scroll");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Elemen masuk viewport -> fade-in
            entry.target.classList.add("is-visible");
          } else {
            // Elemen keluar viewport -> fade-out lagi
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: 0.2, // 20% elemen terlihat baru dianggap "masuk"
      }
    );
    fadeEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback browser lama: tampilkan tanpa animasi scroll
    fadeEls.forEach((el) => el.classList.add("is-visible"));
  }
});

// === IZIN MEMUTAR MUSIK DI HALAMAN PROGRAM ===
document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bg-music");
  const popup = document.getElementById("music-permission");
  const allowBtn = document.getElementById("music-allow");
  const denyBtn = document.getElementById("music-deny");

  if (!audio || !popup || !allowBtn || !denyBtn) return;

  // Tampilkan popup di Program.html dan dkkkn.html
  const path = window.location.pathname.toLowerCase();
  const isProgramPage = path.includes("program.html");
  const isDokumentasiPage = path.includes("dkkkn.html");

  if (!isProgramPage && !isDokumentasiPage) return;

  // SELALU tampilkan popup setiap kali halaman Program.html dibuka
  popup.style.display = "flex";

  allowBtn.addEventListener("click", async () => {
    try {
      await audio.play(); // play setelah user klik
    } catch (err) {
      console.error("Gagal memutar musik:", err);
    } finally {
      popup.style.display = "none";
    }
  });

  denyBtn.addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0;
    popup.style.display = "none";
    // tidak ada localStorage, jadi pilihan tidak disimpan
  });
});

// Validasi form + tampilkan notifikasi demo (auto-close 2 detik + reset form)
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("kirim-demo-btn");
  const notif = document.getElementById("demo-notif");
  const notifClose = document.getElementById("demo-notif-close");

  if (!btn) return;

  let notifTimeoutId = null; // <- penting: deklarasi di sini

  btn.addEventListener("click", () => {
    const form = btn.closest("form"); // cari elemen form terdekat
    const namaInput = document.getElementById("nama");
    const telpInput = document.getElementById("telepon");
    const emailInput = document.getElementById("email");
    const kategoriSelect = document.getElementById("kategori");
    const pesanInput = document.getElementById("pesan");

    const nama = namaInput?.value.trim() || "";
    const telepon = telpInput?.value.trim() || "";
    const email = emailInput?.value.trim() || "";
    const kategoriValue = kategoriSelect?.value || "";
    const pesan = pesanInput?.value.trim() || "";

    // Validasi sederhana: field wajib
    if (!nama) {
      alert("Silakan isi Nama terlebih dahulu.");
      namaInput?.focus();
      return;
    }
    if (!/^[0-9]+$/.test(telepon)) {
      alert("Nomor WhatsApp hanya boleh berisi angka (0-9).");
      telpInput?.focus();
      return;
    }
    if (!email) {
      alert("Silakan isi Email terlebih dahulu.");
      emailInput?.focus();
      return;
    }
    if (!email.includes("@")) {
      alert("Format email tidak valid. Pastikan mengandung tanda '@'.");
      emailInput?.focus();
      return;
    }
    if (!kategoriValue) {
      alert("Silakan pilih Kategori Masukan terlebih dahulu.");
      kategoriSelect?.focus();
      return;
    }
    if (!pesan) {
      alert("Silakan isi Pesan / Masukan terlebih dahulu.");
      pesanInput?.focus();
      return;
    }

    // Jika semua valid -> tampilkan notifikasi demo
    if (notif) {
      notif.classList.remove("hidden");

      // Reset timer sebelumnya jika ada
      if (notifTimeoutId) {
        clearTimeout(notifTimeoutId);
      }

      // Auto-close setelah 2 detik (2000 ms)
      notifTimeoutId = setTimeout(() => {
        notif.classList.add("hidden");
      }, 2000);
    }

    // Reset form setelah kirim demo
    if (form) {
      form.reset();
    }
  });

  // Tombol tutup notifikasi (menutup lebih cepat dari 2 detik)
  if (notif && notifClose) {
    notifClose.addEventListener("click", () => {
      notif.classList.add("hidden");
      if (notifTimeoutId) {
        clearTimeout(notifTimeoutId);
      }
    });
  }
});

// Toggle mobile menu
document.addEventListener("DOMContentLoaded", () => {
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
});

// Hero slider otomatis dengan indikator (dipakai oleh .hero-slide dan .slide-indicator)
(function () {
  const slides = document.querySelectorAll(".hero-slide");
  const indicators = document.querySelectorAll(".slide-indicator");
  const totalSlides = slides.length;
  const intervalTime = 4000;
  let currentSlide = 0;
  let sliderInterval;

  if (!totalSlides || !indicators.length) return;
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("opacity-100", i === index);
      slide.classList.toggle("opacity-0", i !== index);
    });
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle("bg-emerald-600", i === index);
      indicator.classList.toggle("bg-slate-300", i !== index);
    });
    currentSlide = index;
  }
  function nextSlide() {
    const nextIndex = (currentSlide + 1) % totalSlides;
    showSlide(nextIndex);
  }
  // Klik indikator pindah slide
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      showSlide(index);
      // reset interval supaya tidak langsung loncat setelah klik
      clearInterval(sliderInterval);
      sliderInterval = setInterval(nextSlide, intervalTime);
    });
  });
  // Inisialisasi: selalu mulai dari slide 0 dan indikator kiri pertama
  showSlide(0);
  // Mulai autoplay
  sliderInterval = setInterval(nextSlide, intervalTime);
})();

// Animasi fade-in on scroll (dipakai oleh .fade-in-on-scroll)
document.addEventListener("DOMContentLoaded", () => {
  const fadeEls = document.querySelectorAll(".fade-in-on-scroll");

  if (!fadeEls.length) return;

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    fadeEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback browser lama
    fadeEls.forEach((el) => el.classList.add("is-visible"));
  }
});

// Set tahun berjalan di footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const filterButtons = document.querySelectorAll(".fasilitas-filter-btn");
const fasilitasCards = document.querySelectorAll(".fasilitas-card");

if (filterButtons.length && fasilitasCards.length) {
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      // Set state tombol aktif
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Tampilkan / sembunyikan kartu
      fasilitasCards.forEach((card) => {
        const kategori = card.getAttribute("data-kategori") || "";
        if (filter === "all") {
          card.classList.remove("hidden");
        } else {
          // jika kategori card mengandung filter (bisa lebih dari satu, mis: "umum kkn")
          if (kategori.split(" ").includes(filter)) {
            card.classList.remove("hidden");
          } else {
            card.classList.add("hidden");
          }
        }
      });
    });
  });
}
