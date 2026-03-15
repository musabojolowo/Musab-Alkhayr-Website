/* ===============================
   DARK MODE
================================= */
const toggle = document.getElementById("darkModeToggle");

if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
}

if (toggle) {
    toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }
    });
}


/* ===============================
   SMOOTH SCROLL
================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            window.scrollTo({
                top: target.offsetTop - 60,
                behavior: "smooth"
            });
        }
    });
});


/* ===============================
   MOBILE SIDEBAR
================================= */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const overlay = document.getElementById("overlay");

function closeMenu() {
    navLinks.classList.remove("open");
    overlay.classList.remove("active");
    hamburger.classList.remove("active");
}

if (hamburger) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("open");
        overlay.classList.toggle("active");
        hamburger.classList.toggle("active");
    });
}

if (overlay) {
    overlay.addEventListener("click", closeMenu);
}

/* Auto close when clicking nav links */
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", closeMenu);
});

/* Swipe to close */
let startX = 0;

if (navLinks) {
    navLinks.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });

    navLinks.addEventListener("touchmove", (e) => {
        let moveX = e.touches[0].clientX;
        if (moveX - startX < -50) {
            closeMenu();
        }
    });
}


/* ===============================
   STICKY NAV SHADOW
================================= */
window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");
    if (window.scrollY > 20) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});


/* ===============================
   ACTIVE PAGE HIGHLIGHT
================================= */
let currentPage = location.pathname.split("/").pop();

if (currentPage === "") {
    currentPage = "index.html";
}

document.querySelectorAll(".nav-links a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});


/* ===============================
   SECTION SCROLL REVEAL
================================= */
const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => {
    observer.observe(section);
});
// Register Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js")
      .then(() => console.log("Service Worker Registered"));
  });
}


// PWA Install Button
let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  if (installBtn) {
    installBtn.style.display = "block";
  }
});

if (installBtn) {
  installBtn.addEventListener("click", () => {
    deferredPrompt.prompt();
  });
}
