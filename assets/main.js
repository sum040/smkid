/* SMKID — main script
   Content lives in the two arrays below. Replace the placeholder
   text (and later, add image paths) without touching the layout. */

const PRODUCTS = [
  {
    name: "Lift-to-Start Brushing Timer",
    desc: "Lifting the toothbrush is the start button of a three-minute timer.",
    year: "2026", category: "Bath", material: "ABS, Silicone",
    image: "assets/img/product-01.jpg",
    credit: "Rendered by Gemini",
    alt: "Two white toothbrush holders with sage green cups. One holds a toothbrush with a dark screen, the other is empty and shows 2:59.",
    // Kept for a future detail page (not shown yet)
    problem: "There is no easy way to know how long you have brushed, so most people stop before the recommended two to three minutes. Turning on a timer with wet hands is a hassle too.",
    solution: [
      "A small toothbrush holder with a number display. A push switch sits at the bottom of the brush slot.",
      "While the toothbrush rests in the slot, its weight presses the switch and the display stays off.",
      "Lift the toothbrush and the switch pops up: the display lights up at 3:00 and starts counting down.",
      "At 0:00 a short sound and light signal the end of brushing. Put the brush back and it resets to 3:00.",
      "After 180 uses (about three months) a replace-brush icon appears. Reset with the button on the back."
    ]
  },
  {
    name: "Name Tag Power Strip",
    desc: "See at a glance which switch powers which device.",
    year: "2026", category: "Living", material: "PC, ABS",
    image: "assets/img/product-02.jpg",
    credit: "Rendered by Gemini",
    alt: "A white four-outlet power strip with a switch for each outlet and a black panel showing a device icon above every switch.",
    // Kept for a future detail page (not shown yet)
    forWhom: "Anyone who uses a power strip, in a studio flat, an office or anywhere else.",
    problem: [
      "When turning a switch off, you cannot tell which switch belongs to which device, so you end up flipping them one by one.",
      "Switching off the wrong one can cut the Wi-Fi router by mistake."
    ],
    solution: [
      "A power strip with four or more outlets, each with its own switch.",
      "Next to every switch sits an icon roulette (TV, router, charger and more) that you turn sideways to match the plugged-in device.",
      "The roulette is built in, so it never gets lost.",
      "One look at the icons tells you exactly which switch to turn off."
    ]
  },
  { name: "Product Three", desc: "A short line that explains what this object does.", year: "2026", category: "Desk",     material: "ABS" },
  { name: "Product Four",  desc: "A short line that explains what this object does.", year: "2026", category: "Living",   material: "Ceramic" },
  { name: "Product Five",  desc: "A short line that explains what this object does.", year: "2026", category: "Personal", material: "Stainless steel" },
  { name: "Product Six",   desc: "A short line that explains what this object does.", year: "2026", category: "Home",     material: "Wood" }
];

/* Sketches: add `image` (and `alt`) to replace a gray frame */
const SKETCHES = [
  { title: "Brushing Timer", image: "assets/img/sketch-01.jpg", alt: "Pencil sketches of the toothbrush timer holder: brush in, brush lifted, and a two-slot version showing 2:59." },
  { title: "Name Tag Power Strip", image: "assets/img/sketch-02.jpg", alt: "Pencil sketch of a four-outlet power strip with a long panel, and a close-up of the panel showing kettle, Wi-Fi and battery icons." },
  { title: "Weight Study" },
  { title: "Folded Edge" },
  { title: "Hold Point" },
  { title: "Quiet Timer" },
  { title: "Pocket Form" },
  { title: "Tilt Test" },
  { title: "One Action" },
  { title: "Round Grip" },
  { title: "Slide Lock" },
  { title: "Rest Angle" },
  { title: "Cap Study" },
  { title: "Balance Note" },
  { title: "Daily Hook" },
  { title: "Small Tray" },
  { title: "Open Close" },
  { title: "Clip Form" },
  { title: "Drop Shape" },
  { title: "Light Touch" },
  { title: "Stack Study" },
  { title: "Hidden Loop" },
  { title: "Line Grip" },
  { title: "Turn Point" },
  { title: "Simple Stand" },
  { title: "Fold Twice" },
  { title: "Soft Corner" },
  { title: "Cord Study" },
  { title: "Last Step" },
  { title: "Final Form" }
];

const pad = (n) => String(n).padStart(2, "0");

/* ---------- Render products ---------- */
const workGrid = document.getElementById("work-grid");
workGrid.innerHTML = PRODUCTS.map((p, i) => `
  <article class="product reveal" tabindex="0" aria-label="${p.name}">
    <div class="product__frame placeholder${p.image ? " has-image" : ""}">
      <div class="product__img">${p.image
        ? `<img src="${p.image}" alt="${p.alt || p.name}${p.credit ? ` (${p.credit})` : ""}" loading="lazy" decoding="async">`
        : `Product ${pad(i + 1)} — Render`}</div>
      <div class="product__info" aria-hidden="true">
        <h3 class="product__info-name">${p.name}</h3>
        <p class="product__info-desc">${p.desc}</p>
        <dl class="product__info-specs">
          <div><dt>Year</dt><dd>${p.year}</dd></div>
          <div><dt>Category</dt><dd>${p.category}</dd></div>
          <div><dt>Material</dt><dd>${p.material}</dd></div>
        </dl>
        ${p.credit ? `<p class="product__info-credit">${p.credit}</p>` : ""}
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
sketchGrid.innerHTML = SKETCHES.map((sk, i) => `
  <button class="sketch reveal" type="button" data-index="${i}" aria-label="Open sketch ${pad(i + 1)}, ${sk.title}">
    <div class="sketch__frame placeholder${sk.image ? " has-image" : ""}">${sk.image
      ? `<img src="${sk.image}" alt="${sk.alt || sk.title}" loading="lazy" decoding="async">`
      : `S—${pad(i + 1)}`}</div>
    <p class="sketch__caption"><span>${pad(i + 1)}</span><span>${sk.title}</span></p>
  </button>
`).join("");

/* ---------- Smooth scroll (Lenis) ---------- */
// Motion is always on, even when the OS "reduce motion" setting is enabled (owner request).
const reduceMotion = false;
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
const lbFrame = document.getElementById("lb-frame");
let lbIndex = 0;
let lastFocus = null;

const showSketch = (i) => {
  lbIndex = (i + SKETCHES.length) % SKETCHES.length;
  lbFrame.style.opacity = 0;
  setTimeout(() => {
    const sk = SKETCHES[lbIndex];
    lbCount.textContent = `${pad(lbIndex + 1)} / ${SKETCHES.length}`;
    lbTitle.textContent = sk.title;
    lbFrame.classList.toggle("has-image", !!sk.image);
    lbFrame.innerHTML = sk.image
      ? `<img src="${sk.image}" alt="${sk.alt || sk.title}">`
      : `<span>S—${pad(lbIndex + 1)}</span>`;
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

/* ---------- Works tabs (Products / Sketches) ---------- */
const tabs = [...document.querySelectorAll(".tabs__btn")];
const worksSection = document.getElementById("works");

const selectTab = (btn) => {
  if (btn.classList.contains("is-active")) return;
  const nextPanel = document.getElementById(btn.getAttribute("aria-controls"));
  const currentBtn = tabs.find((t) => t.classList.contains("is-active"));
  const currentPanel = document.getElementById(currentBtn.getAttribute("aria-controls"));

  tabs.forEach((t) => {
    const on = t === btn;
    t.classList.toggle("is-active", on);
    t.setAttribute("aria-selected", on);
    t.tabIndex = on ? 0 : -1;
  });

  // fade out current, then fade in next
  currentPanel.classList.remove("is-active");
  setTimeout(() => {
    currentPanel.hidden = true;
    nextPanel.hidden = false;
    nextPanel.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));

    // keep the tabs in view if the user had scrolled past them
    if (worksSection.getBoundingClientRect().top < 0) {
      if (lenis) lenis.scrollTo(worksSection, { immediate: true });
      else window.scrollTo(0, worksSection.offsetTop);
    }
    if (lenis) lenis.resize();

    requestAnimationFrame(() => requestAnimationFrame(() => nextPanel.classList.add("is-active")));
  }, 350);
};

tabs.forEach((btn) => btn.addEventListener("click", () => selectTab(btn)));

document.querySelector(".tabs").addEventListener("keydown", (e) => {
  if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
  const i = tabs.findIndex((t) => t.classList.contains("is-active"));
  const next = tabs[(i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
  next.focus();
  selectTab(next);
});
