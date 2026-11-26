/* SMKID — main script
   Content lives in the two arrays below. Replace the placeholder
   text (and later, add image paths) without touching the layout. */

const PRODUCTS = [
  { name: "Product One",   desc: "A short line that explains what this object does.", year: "2026", category: "Kitchen",  material: "Aluminium" },
  { name: "Product Two",   desc: "A short line that explains what this object does.", year: "2026", category: "Bath",     material: "Silicone" },
  { name: "Product Three", desc: "A short line that explains what this object does.", year: "2026", category: "Desk",     material: "ABS" },
  { name: "Product Four",  desc: "A short line that explains what this object does.", year: "2026", category: "Living",   material: "Ceramic" },
  { name: "Product Five",  desc: "A short line that explains what this object does.", year: "2026", category: "Personal", material: "Stainless steel" },
  { name: "Product Six",   desc: "A short line that explains what this object does.", year: "2026", category: "Home",     material: "Wood" }
];

const SKETCH_TITLES = [
  "Morning Ritual", "Soft Hinge", "Weight Study", "Folded Edge", "Hold Point",
  "Quiet Timer", "Pocket Form", "Tilt Test", "One Action", "Round Grip",
  "Slide Lock", "Rest Angle", "Cap Study", "Balance Note", "Daily Hook",
  "Small Tray", "Open Close", "Clip Form", "Drop Shape", "Light Touch",
  "Stack Study", "Hidden Loop", "Line Grip", "Turn Point", "Simple Stand",
  "Fold Twice", "Soft Corner", "Cord Study", "Last Step", "Final Form"
];

const pad = (n) => String(n).padStart(2, "0");

/* ---------- Render products ---------- */
const workGrid = document.getElementById("work-grid");
workGrid.innerHTML = PRODUCTS.map((p, i) => `
  <article class="product reveal" tabindex="0" aria-label="${p.name}">
    <div class="product__frame placeholder">
      <div class="product__img">Product ${pad(i + 1)} — Render</div>
      <div class="product__info" aria-hidden="true">
        <h3 class="product__info-name">${p.name}</h3>
        <p class="product__info-desc">${p.desc}</p>
        <dl class="product__info-specs">
          <div><dt>Year</dt><dd>${p.year}</dd></div>
          <div><dt>Category</dt><dd>${p.category}</dd></div>
          <div><dt>Material</dt><dd>${p.material}</dd></div>
        </dl>
      </div>
    </div>
    <p class="product__caption">
      <span>${pad(i + 1)}</span>
      <span>${p.name}</span>
      <span>${p.category}</span>
    </p>
  </article>
`).join("");

/* ---------- Render sketches ---------- */
const sketchGrid = document.getElementById("sketch-grid");
sketchGrid.innerHTML = SKETCH_TITLES.map((t, i) => `
  <button class="sketch reveal" type="button" data-index="${i}" aria-label="Open sketch ${pad(i + 1)}, ${t}">
    <div class="sketch__frame placeholder">S—${pad(i + 1)}</div>
    <p class="sketch__caption"><span>${pad(i + 1)}</span><span>${t}</span></p>
  </button>
`).join("");

/* ---------- Smooth scroll (Lenis) ---------- */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let lenis = null;

if (window.Lenis && !reduceMotion) {
  lenis = new Lenis({ duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
  const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
}

document.querySelectorAll("[data-scroll]").forEach((link) => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    const target = id === "#top" ? 0 : document.querySelector(id);
    if (target === null) return;
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(target, { offset: 0, duration: 1.6 });
    } else {
      const y = target === 0 ? 0 : target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" });
    }
    history.replaceState(null, "", id === "#top" ? location.pathname : id);
  });
});

/* ---------- Active nav item ---------- */
const navLinks = [...document.querySelectorAll(".header__nav a")];
const sections = navLinks.map((a) => document.querySelector(a.getAttribute("href")));

const updateActive = () => {
  const mid = window.innerHeight * 0.4;
  let current = -1;
  sections.forEach((s, i) => { if (s.getBoundingClientRect().top <= mid) current = i; });
  navLinks.forEach((a, i) => a.classList.toggle("is-active", i === current));
};
window.addEventListener("scroll", updateActive, { passive: true });
updateActive();

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    }
  });
}, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ---------- Lightbox ---------- */
const lb = document.getElementById("lightbox");
const lbCount = document.getElementById("lb-count");
const lbTitle = document.getElementById("lb-title");
const lbLabel = document.getElementById("lb-label");
const lbFrame = document.getElementById("lb-frame");
let lbIndex = 0;
let lastFocus = null;

const showSketch = (i) => {
  lbIndex = (i + SKETCH_TITLES.length) % SKETCH_TITLES.length;
  lbFrame.style.opacity = 0;
  setTimeout(() => {
    lbCount.textContent = `${pad(lbIndex + 1)} / ${SKETCH_TITLES.length}`;
    lbTitle.textContent = SKETCH_TITLES[lbIndex];
    lbLabel.textContent = `S—${pad(lbIndex + 1)}`;
    lbFrame.style.opacity = 1;
  }, 150);
};

const openLightbox = (i) => {
  lastFocus = document.activeElement;
  lb.hidden = false;
  showSketch(i);
  requestAnimationFrame(() => lb.classList.add("is-open"));
  if (lenis) lenis.stop();
  document.getElementById("lb-close").focus();
};

const closeLightbox = () => {
  lb.classList.remove("is-open");
  setTimeout(() => { lb.hidden = true; }, 400);
  if (lenis) lenis.start();
  if (lastFocus) lastFocus.focus();
};

sketchGrid.addEventListener("click", (e) => {
  const item = e.target.closest(".sketch");
  if (item) openLightbox(Number(item.dataset.index));
});

document.getElementById("lb-close").addEventListener("click", closeLightbox);
document.getElementById("lb-prev").addEventListener("click", () => showSketch(lbIndex - 1));
document.getElementById("lb-next").addEventListener("click", () => showSketch(lbIndex + 1));

document.addEventListener("keydown", (e) => {
  if (lb.hidden) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") showSketch(lbIndex + 1);
  if (e.key === "ArrowLeft") showSketch(lbIndex - 1);
});
