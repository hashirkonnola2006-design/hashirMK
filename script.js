import { createWebStrands, createParticleEngine, createSpiderSense } from "./fx.js";

/* ==========================================================================
   CUSTOMIZE HERE
   Edit name, tagline, About copy/dossier, contact details, Formspree endpoint,
   and your 12 projects below.
   ========================================================================== */
const SITE_CONFIG = {
  name: "Hashir Muhiyudheen Konnola",
  tagline: "Full-stack developer building clean, fast web experiences.",
  email: "hashirkonnola2006@gmail.com",
  phone: "7012999011",
  formspreeEndpoint: "", // e.g. "https://formspree.io/f/your-form-id" (empty = mailto fallback)
  links: {
    github: "https://github.com/hashirkonnola2006-design",
    linkedin: "https://www.linkedin.com/in/hashir-muhiyudheen-konnola-8342aa1b9/",
    instagram: "https://www.instagram.com/m.hashirr_/",
  },
};

const ABOUT = {
  label: "ABOUT ME",
  heading: "Self-taught.\nAlways shipping.",
  paragraph1:
    "Second-year B.Tech Computer Science student at the College of Engineering Thalassery, Kerala. Most of what I know about coding didn't come from a classroom. It's self-taught, by building real web apps, documenting the process publicly and working closely with AI developer tools.",
  paragraph2Before: "On the side I build freelance projects for clients, including ",
  link1: { label: "Mandhi Resto", projectIndex: 4 },
  paragraph2Middle: ", a digital restaurant menu, and ",
  link2: { label: "KTU PrepHub", projectIndex: 0 },
  paragraph2After: ", an academic resources platform used by university students.",
  nowLabel: "NOW",
  nowMain:
    "Building cleaner interfaces and teaching myself more backend systems, for larger and more reliable codebases.",
  nowMuted:
    "The goal stays simple: build tools that work well, keep shipping code, and learn as I go.",
  stats: [
    { target: 12, suffix: "", label: "LIVE PROJECTS" },
    { target: 3, suffix: "+", label: "MAJOR PROJECTS" },
    { target: 12, suffix: "+", label: "TECHS & TOOLS" },
  ],
  expertiseLabel: "TECHNICAL EXPERTISE",
  expertise: [
    {
      group: "FRONTEND",
      items: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "Next.js", "Responsive Design"],
    },
    {
      group: "BACKEND & DATABASE",
      items: ["Node.js", "Express.js", "REST APIs", "JSON Databases", "Lowdb"],
    },
    {
      group: "WORKFLOW & DEPLOY",
      items: ["Git & GitHub", "npm / Node Package Manager", "Vercel hosting", "Chrome DevTools"],
    },
  ],
  ctaLabel: "See my work →",
};

const PROJECTS = [
  { id: 1,  title: "KTU Prep Hub",                   description: "Module notes, interactive quizzes, and PDF resources for KTU exam prep.",               image: "assets/projects/project1.webp",  url: "https://ktuprephub.vercel.app/" },
  { id: 2,  title: "Family Fit",                     description: "Simple, balanced daily meal plans and nutrition routines for families.",                  image: "assets/projects/project2.webp",  url: "https://familyfit-frontend.vercel.app/" },
  { id: 3,  title: "LinkedIn Undo",                  description: "Clean utility to unmeet, rewind, and reconnect LinkedIn network actions.",               image: "assets/projects/project3.webp",  url: "https://linkdln-undo.vercel.app/" },
  { id: 4,  title: "Train IRCTC",                    description: "AI-powered railway maintenance block planning console for Palakkad Division.",           image: "assets/projects/project4.webp",  url: "https://files-pasted-by-the-user-build-dun.vercel.app/" },
  { id: 5,  title: "Mandhi",                         description: "Authentic Arabian cuisine showcase with digital menu and restaurant ordering.",           image: "assets/projects/project5.webp",  url: "https://mandhi-website.vercel.app/" },
  { id: 6,  title: "Onam Resolve",                   description: "Interactive festival event showcase and cultural fest portal.",                          image: "assets/projects/project6.webp",  url: "https://onamresolve.vercel.app/" },
  { id: 7,  title: "Experimental Samurai Portfolio", description: "Atmospheric samurai-themed developer portfolio with gold-on-noir aesthetics.",          image: "assets/projects/project7.webp",  url: "https://hmk-delta.vercel.app/" },
  { id: 8,  title: "PES Competition Website",        description: "MUFIFA eFootball Championship portal with fixtures and match standings.",                image: "assets/projects/project8.webp",  url: "https://mufifa-pes-plum.vercel.app/" },
  { id: 9,  title: "Mova",                           description: "Real-time sign language translation web app making every sign understood.",               image: "assets/projects/project9.webp",  url: "https://mova-three-puce.vercel.app/" },
  { id: 10, title: "Midhula Farm Hut, Design 2",     description: "Vibrant aquatic & farm hut experience with WhatsApp ordering flow.",                    image: "assets/projects/project10.webp", url: "https://midhula-family-hut-v20.vercel.app/" },
  { id: 11, title: "Midhula Farm Hut, Design 1",     description: "Atmospheric dark editorial showcase for Midhula aquatic farm hut.",                     image: "assets/projects/project11.webp", url: "https://midhula-family-hut.vercel.app/" },
  { id: 12, title: "Terracode",                      description: "Interactive climate storytelling experience exploring rising ocean levels.",             image: "assets/projects/project12.webp", url: "https://terracode-sand.vercel.app/" },
];

/* Debris kept on left half & edge bands; newspaper blurred behind scrim top-right, can bottom-right */
const DEBRIS_LAYOUT = [
  { file: "broken-clock", depth: "near", left: "-4%",  top: "66%", width: "24vw", rot: -16 },
  { file: "shard-1",      depth: "near", left: "3%",   top: "5%",  width: "12vw", rot: 22 },
  { file: "rock-1",       depth: "near", left: "32%",  top: "85%", width: "14vw", rot: -12 },
  { file: "newspaper",    depth: "mid",  left: "88%",  top: "-4%", width: "15vw", rot: 14, extraClass: "debris-bg-newspaper" },
  { file: "crushed-can",  depth: "mid",  left: "89%",  top: "84%", width: "9vw",  rot: -20, extraClass: "debris-bg-can" },
  { file: "shard-2",      depth: "mid",  left: "2%",   top: "30%", width: "7.5vw", rot: 48 },
  { file: "shard-3",      depth: "mid",  left: "41%",  top: "10%", width: "6vw",  rot: -18 },
  { file: "shard-4",      depth: "mid",  left: "44%",  top: "82%", width: "6.5vw", rot: 30 },
  { file: "rock-2",       depth: "mid",  left: "18%",  top: "86%", width: "10vw", rot: 16 },
  { file: "rock-3",       depth: "mid",  left: "39%",  top: "18%", width: "4.5vw", rot: -25 },
  { file: "shard-5",      depth: "far",  left: "9%",   top: "15%", width: "3.8vw", rot: 15 },
  { file: "shard-6",      depth: "far",  left: "12%",  top: "46%", width: "4vw",  rot: -32 },
  { file: "rock-4",       depth: "far",  left: "23%",  top: "74%", width: "4.5vw", rot: 10 },
  { file: "rock-5",       depth: "far",  left: "38%",  top: "72%", width: "4vw",  rot: -18 },
  { file: "rock-6",       depth: "far",  left: "44%",  top: "48%", width: "3.5vw", rot: 28 },
  { file: "earbuds",      depth: "far",  left: "46%",  top: "90%", width: "8vw",  rot: -8 },
];

/* ==========================================================================
   Runtime State
   ========================================================================== */
const prefersReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isDesktopStage = () => window.innerWidth >= 900 && !prefersReduced();
const isDebug = new URLSearchParams(window.location.search).get("debug") === "1";

let currentScene = 0;
let isTransitioning = false;
let activeProjectIdx = 0;
let lastFocusedEl = null;
let hotspotsData = [];
let tvScreenData = { bounds: { left: 14.1, top: 13.6, width: 71.4, height: 61.8 } };

let webStrands = null;
let particleEngine = null;
let spiderSense = null;
let swayTween = null;
let aboutCycleTimer = null;
let aboutSwapTimeout = null;

document.addEventListener("DOMContentLoaded", async () => {
  applyConfig();
  initDebugHud();
  await initLoader();
  await loadJsonCoords();

  webStrands = createWebStrands(document.getElementById("web-strands-canvas"), getHeroTvRect);
  particleEngine = createParticleEngine(document.getElementById("fx-particles-canvas"), prefersReduced());
  spiderSense = createSpiderSense(document.getElementById("spider-sense-svg"), prefersReduced());

  initTimecode();
  initNavbar();
  buildAboutDebris();
  await buildPileHotspots();
  buildMobileProjectsGrid();
  buildAccessibleProjectList();
  initAboutSection();
  buildIndexOverlay();
  initModal();
  initContactForm();
  initSceneControls();

  const initialScene = sceneFromHash(window.location.hash);
  if (isDesktopStage()) {
    particleEngine.start();
    jumpToSceneImmediate(initialScene);
    if (initialScene === 0) playInitialHeroBoot();
  } else {
    webStrands.reset();
    webStrands.start();
    initMobileScrollObservers();
  }
});

function applyConfig() {
  document.title = `${SITE_CONFIG.name} — Portfolio`;
  document.querySelectorAll("[data-site-name]").forEach((el) => { el.textContent = SITE_CONFIG.name; });

  const emailEl = document.getElementById("contact-email-link");
  if (emailEl) { emailEl.textContent = SITE_CONFIG.email; emailEl.href = `mailto:${SITE_CONFIG.email}`; }
  const phoneEl = document.getElementById("contact-phone-link");
  if (phoneEl) { phoneEl.textContent = SITE_CONFIG.phone; phoneEl.href = `tel:${SITE_CONFIG.phone}`; }

  document.getElementById("link-github").href = SITE_CONFIG.links.github;
  document.getElementById("link-linkedin").href = SITE_CONFIG.links.linkedin;
  document.getElementById("link-instagram").href = SITE_CONFIG.links.instagram;
}

async function initLoader() {
  const loader = document.getElementById("tuning-loader");
  const bar = document.getElementById("tuning-bar");
  const imgs = [document.querySelector(".plate-hero"), document.getElementById("tv-actor-img")].filter(Boolean);
  let done = 0;

  const advance = () => {
    done += 1;
    if (bar) bar.style.width = `${Math.min(100, Math.round((done / imgs.length) * 100))}%`;
    if (done >= imgs.length) finish();
  };

  let finished = false;
  const finish = () => {
    if (finished || !loader) return;
    finished = true;
    if (bar) bar.style.width = "100%";
    loader.classList.add("is-done");
    setTimeout(() => { loader.hidden = true; }, 320);
  };

  imgs.forEach((img) => {
    if (img.complete) advance();
    else {
      img.addEventListener("load", advance, { once: true });
      img.addEventListener("error", advance, { once: true });
    }
  });

  // Never block longer than 2.2s
  setTimeout(finish, 2200);
}

async function loadJsonCoords() {
  try {
    const [tvRes, pileRes] = await Promise.all([
      fetch("assets/img/tv-screen.json"),
      fetch("assets/img/pile-hotspots.json"),
    ]);
    if (tvRes.ok) tvScreenData = await tvRes.json();
    if (pileRes.ok) hotspotsData = await pileRes.json();
  } catch (err) {
    console.warn("Coordinate JSON fallback active:", err);
  }
  const slot = document.getElementById("tv-actor-screen");
  if (slot && tvScreenData.bounds) {
    slot.style.left = `${tvScreenData.bounds.left}%`;
    slot.style.top = `${tvScreenData.bounds.top}%`;
    slot.style.width = `${tvScreenData.bounds.width}%`;
    slot.style.height = `${tvScreenData.bounds.height}%`;
  }
}

function getHeroTvRect() {
  const el = isDesktopStage()
    ? document.getElementById("tv-actor")
    : document.querySelector(".mobile-hero-tv");
  const canvas = document.getElementById("web-strands-canvas");
  if (!el || !canvas) return null;
  const r = el.getBoundingClientRect();
  const c = canvas.getBoundingClientRect();
  return { left: r.left - c.left, top: r.top - c.top, width: r.width, height: r.height };
}

function playInitialHeroBoot() {
  const line = document.getElementById("hero-crt-line");
  if (prefersReduced() || !line || typeof gsap === "undefined") return;
  gsap.fromTo(
    line,
    { opacity: 1, scaleY: 0.015, scaleX: 0 },
    {
      scaleX: 1,
      duration: 0.28,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(line, { scaleY: 1, opacity: 0, duration: 0.38, ease: "power2.inOut" });
      },
    }
  );
}

/* ==========================================================================
   TV Actor Positioning & Scene Transitions (GSAP Timelines)
   ========================================================================== */
function getPoseMetrics(sceneIdx) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  if (sceneIdx === 0) {
    const width = Math.min(vw * 0.31, vh * 0.56);
    const height = width * 0.85;
    return {
      left: (vw - width) * 0.5,
      top: vh * 0.24,
      width,
      rotateZ: -2.2,
      rotateY: 0,
      rotateX: 0,
      opacity: 1,
      screen: "hero",
    };
  }
  if (sceneIdx === 1) {
    const width = Math.min(vw * 0.305, vh * 0.54);
    return {
      left: vw * 0.30 - width * 0.5,
      top: vh * 0.24,
      width,
      rotateZ: -18,
      rotateY: 24,
      rotateX: 8,
      opacity: 1,
      screen: "about",
    };
  }
  const slot = document.getElementById("pile-landing-tv");
  const rect = slot ? slot.getBoundingClientRect() : null;
  if (rect && rect.width > 10) {
    return {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      rotateZ: -10,
      rotateY: 0,
      rotateX: 0,
      opacity: 1,
      screen: "projects",
    };
  }
  return { left: vw * 0.72, top: vh * 0.7, width: vw * 0.15, rotateZ: -10, rotateY: 0, rotateX: 0, opacity: 1, screen: "projects" };
}

function setTvScreenUi(mode) {
  document.getElementById("tv-ui-hero").classList.toggle("is-shown", mode === "hero");
  document.getElementById("tv-ui-about").classList.toggle("is-shown", mode === "about");
  document.getElementById("tv-ui-projects").classList.toggle("is-shown", mode === "projects");
  if (mode === "about") startAboutScreenCycle(document.getElementById("tv-ui-about"));
  else stopAboutScreenCycle();
}

function stopAboutScreenCycle() {
  clearInterval(aboutCycleTimer);
  clearTimeout(aboutSwapTimeout);
  aboutCycleTimer = null;
  aboutSwapTimeout = null;
}

function startAboutScreenCycle(aboutUiEl) {
  stopAboutScreenCycle();
  if (!aboutUiEl) return;

  const setMode = (state) => {
    aboutUiEl.classList.toggle("show-photo", state === "photo");
    aboutUiEl.classList.toggle("show-name", state === "name");
  };

  let current = "photo";
  setMode("photo");
  if (prefersReduced()) return;

  const triggerGlitchTo = (nextState) => {
    aboutUiEl.classList.remove("is-lagging");
    void aboutUiEl.offsetWidth;
    aboutUiEl.classList.add("is-lagging");
    // Lag stutter: brief mid-burst flickers before locking into target state
    aboutSwapTimeout = setTimeout(() => {
      setMode(nextState);
      setTimeout(() => {
        setMode(current);
        setTimeout(() => {
          current = nextState;
          setMode(nextState);
          aboutUiEl.classList.remove("is-lagging");
        }, 85);
      }, 65);
    }, 150);
  };

  // First switch: Photo holds 1.5s -> lag/glitch into Name; then cycle smoothly
  aboutSwapTimeout = setTimeout(() => {
    triggerGlitchTo("name");
    aboutCycleTimer = setInterval(() => {
      if (document.hidden) return;
      triggerGlitchTo(current === "name" ? "photo" : "name");
    }, 3400);
  }, 1500);
}

function startTvSway(sceneIdx) {
  if (swayTween) swayTween.kill();
  if (prefersReduced()) return;
  const actor3d = document.getElementById("tv-actor-3d");
  if (!actor3d) return;

  if (sceneIdx === 0) {
    swayTween = gsap.to(actor3d, {
      rotationZ: 1.4,
      y: 6,
      duration: 3.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  } else if (sceneIdx === 1) {
    swayTween = gsap.to(actor3d, {
      rotationZ: -15,
      rotationY: 20,
      y: 12,
      duration: 4.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }
}

function jumpToSceneImmediate(idx) {
  currentScene = idx;
  const scenes = document.querySelectorAll(".scene");
  scenes.forEach((s, i) => s.classList.toggle("is-active", i === idx));
  updateActiveChrome(idx);

  const actor = document.getElementById("tv-actor");
  const actor3d = document.getElementById("tv-actor-3d");
  const landedTv = document.getElementById("pile-landing-tv");

  if (idx === 3) {
    actor.style.display = "none";
    webStrands.stop();
    spiderSense.hide();
    if (landedTv) landedTv.classList.remove("is-hidden-during-flight");
    return;
  }

  actor.style.display = "block";
  const pose = getPoseMetrics(idx);
  gsap.set(actor, { left: pose.left, top: pose.top, width: pose.width, opacity: 1, clearProps: "scale" });
  gsap.set(actor3d, { rotationZ: pose.rotateZ, rotationY: pose.rotateY, rotationX: pose.rotateX, y: 0 });
  setTvScreenUi(pose.screen);

  if (idx === 0) {
    webStrands.reset();
    webStrands.start();
    spiderSense.hide();
    if (landedTv) landedTv.classList.add("is-hidden-during-flight");
    startTvSway(0);
  } else if (idx === 1) {
    webStrands.stop();
    spiderSense.show();
    if (landedTv) landedTv.classList.add("is-hidden-during-flight");
    startTvSway(1);
    updateAboutScrollMask();
  } else if (idx === 2) {
    webStrands.stop();
    spiderSense.hide();
    actor.style.display = "none";
    if (landedTv) landedTv.classList.remove("is-hidden-during-flight");
  }
}

function transitionToScene(targetIdx) {
  if (isTransitioning || targetIdx === currentScene || targetIdx < 0 || targetIdx > 3) return;
  if (typeof gsap === "undefined" || !isDesktopStage()) {
    jumpToSceneImmediate(targetIdx);
    return;
  }

  const fromIdx = currentScene;
  isTransitioning = true;
  if (swayTween) swayTween.kill();

  const reverse = targetIdx < fromIdx;
  const speedScale = reverse ? 1.5 : 1;

  // Adjacent signature timelines or multi-step jump
  if (fromIdx === 0 && targetIdx === 1) runT1(false, speedScale);
  else if (fromIdx === 1 && targetIdx === 0) runT1(true, speedScale);
  else if (fromIdx === 1 && targetIdx === 2) runT2(false, speedScale);
  else if (fromIdx === 2 && targetIdx === 1) runT2(true, speedScale);
  else if (fromIdx === 2 && targetIdx === 3) runT3(false, speedScale);
  else if (fromIdx === 3 && targetIdx === 2) runT3(true, speedScale);
  else runDirectChannelJump(targetIdx);
}

function runT1(isReverse, rate) {
  const heroSec = document.getElementById("hero");
  const aboutSec = document.getElementById("about");
  const actor = document.getElementById("tv-actor");
  const actor3d = document.getElementById("tv-actor-3d");
  const blurFx = document.getElementById("fx-motion-blur");
  const aboutCopy = document.getElementById("about-copy");
  const debris = document.querySelectorAll(".debris-item");

  const heroPose = getPoseMetrics(0);
  const aboutPose = getPoseMetrics(1);

  aboutSec.classList.add("is-active");
  gsap.set(aboutSec, { opacity: isReverse ? 1 : 0 });
  actor.style.display = "block";

  const tl = gsap.timeline({
    timeScale: rate,
    onComplete: () => {
      currentScene = isReverse ? 0 : 1;
      heroSec.classList.toggle("is-active", isReverse);
      aboutSec.classList.toggle("is-active", !isReverse);
      gsap.set([heroSec, aboutSec], { clearProps: "scale,opacity" });
      gsap.set(blurFx, { opacity: 0 });
      updateActiveChrome(currentScene);
      if (currentScene === 0) {
        webStrands.reset();
        webStrands.start();
        spiderSense.hide();
        setTvScreenUi("hero");
        startTvSway(0);
      } else {
        webStrands.stop();
        spiderSense.show();
        setTvScreenUi("about");
        startTvSway(1);
      }
      isTransitioning = false;
    },
  });

  const aboutRule = document.getElementById("about-rule");
  const aboutBlocks = aboutCopy.querySelectorAll(".about-block");
  const aboutChips = aboutCopy.querySelectorAll(".expertise-chip");

  if (!isReverse) {
    tl.call(() => { webStrands.setTension(2.4); spiderSense.flashFast(); }, null, 0)
      .to(actor3d, { x: 4, duration: 0.05, repeat: 5, yoyo: true }, 0)
      .call(() => { webStrands.snap(); }, null, 0.32)
      .to(actor, { top: heroPose.top + 38, duration: 0.25, ease: "power2.in" }, 0.35)
      .to(blurFx, { opacity: 0.45, duration: 0.35 }, 0.5)
      .to(heroSec, { scale: 1.28, opacity: 0, duration: 0.95, ease: "power3.inOut" }, 0.5)
      .to(aboutSec, { opacity: 1, duration: 0.85, ease: "power2.out" }, 0.6)
      .to(actor, { left: aboutPose.left, top: aboutPose.top, width: aboutPose.width, duration: 1.05, ease: "power3.inOut" }, 0.5)
      .to(actor3d, { rotationZ: aboutPose.rotateZ, rotationY: aboutPose.rotateY, rotationX: aboutPose.rotateX, x: 0, y: 0, duration: 1.05, ease: "power3.inOut" }, 0.5)
      .call(() => { setTvScreenUi("about"); updateAboutScrollMask(); }, null, 0.85)
      .fromTo(debris, { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, stagger: 0.03, ease: "power2.out" }, 0.65)
      .fromTo(aboutRule, { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: "power2.out" }, 0.82)
      .fromTo(aboutBlocks, { x: 24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, stagger: 0.07, ease: "power3.out" }, 0.80)
      .call(() => animateAboutStatsOnce(), null, 0.98)
      .fromTo(aboutChips, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.22, stagger: 0.018, ease: "power2.out" }, 1.04)
      .to(blurFx, { opacity: 0, duration: 0.3 }, 1.25);
  } else {
    tl.to("#fx-channel-tear", { opacity: 0.45, duration: 0.12, yoyo: true, repeat: 1 }, 0)
      .to(aboutSec, { opacity: 0, duration: 0.55, ease: "power2.in" }, 0.1)
      .to(heroSec, { opacity: 1, scale: 1, duration: 0.75, ease: "power2.out" }, 0.2)
      .to(actor, { left: heroPose.left, top: heroPose.top, width: heroPose.width, duration: 0.8, ease: "power3.out" }, 0.1)
      .to(actor3d, { rotationZ: heroPose.rotateZ, rotationY: 0, rotationX: 0, duration: 0.8, ease: "power3.out" }, 0.1)
      .call(() => setTvScreenUi("hero"), null, 0.45);
  }
}

function runT2(isReverse, rate) {
  const aboutSec = document.getElementById("about");
  const projSec = document.getElementById("projects");
  const pileStage = document.getElementById("pile-stage");
  const actor = document.getElementById("tv-actor");
  const actor3d = document.getElementById("tv-actor-3d");
  const landedTv = document.getElementById("pile-landing-tv");
  const blurFx = document.getElementById("fx-motion-blur");
  const impactFlash = document.getElementById("fx-impact-flash");
  const aboutCopy = document.getElementById("about-copy");
  const hotspots = document.querySelectorAll(".pile-tv-hotspot");

  projSec.classList.add("is-active");
  const aboutPose = getPoseMetrics(1);
  const landPose = getPoseMetrics(2);

  actor.style.display = "block";
  if (landedTv) landedTv.classList.add("is-hidden-during-flight");

  const tl = gsap.timeline({
    timeScale: rate,
    onComplete: () => {
      currentScene = isReverse ? 1 : 2;
      aboutSec.classList.toggle("is-active", isReverse);
      projSec.classList.toggle("is-active", !isReverse);
      gsap.set([aboutSec, projSec, pileStage, aboutCopy], { clearProps: "scale,y,x,opacity" });
      gsap.set(blurFx, { opacity: 0 });
      updateActiveChrome(currentScene);
      if (!isReverse) {
        actor.style.display = "none";
        if (landedTv) landedTv.classList.remove("is-hidden-during-flight");
        spiderSense.hide();
      } else {
        actor.style.display = "block";
        setTvScreenUi("about");
        spiderSense.show();
        startTvSway(1);
      }
      isTransitioning = false;
    },
  });

  if (!isReverse) {
    gsap.set(projSec, { opacity: 0 });
    gsap.set(pileStage, { scale: 1.24 });
    gsap.set(hotspots, { opacity: 0 });

    tl.call(() => spiderSense.flashFast(), null, 0)
      .to(aboutCopy, { y: -60, opacity: 0, duration: 0.35, ease: "power2.in" }, 0)
      .to(blurFx, { opacity: 0.55, duration: 0.25 }, 0.32)
      .to(aboutSec, { opacity: 0, duration: 0.45 }, 0.4)
      .to(projSec, { opacity: 1, duration: 0.45 }, 0.45)
      .to(actor, { left: landPose.left, top: landPose.top - 32, width: landPose.width, duration: 0.65, ease: "power3.in" }, 0.35)
      .to(actor3d, { rotationZ: -28, rotationY: 6, rotationX: 12, duration: 0.65, ease: "power2.in" }, 0.35)
      // IMPACT ~1.0s
      .call(() => {
        spiderSense.hide();
        setTvScreenUi("projects");
        particleEngine.burstImpact(landPose.left + landPose.width * 0.5, landPose.top + landPose.width * 0.72);
      }, null, 0.98)
      .to(impactFlash, { opacity: 0.85, duration: 0.08, yoyo: true, repeat: 1 }, 1.0)
      .to(actor, { top: landPose.top, duration: 0.22, ease: "bounce.out" }, 1.0)
      .to(actor3d, { rotationZ: landPose.rotateZ, rotationY: 0, rotationX: 0, duration: 0.24, ease: "back.out(1.7)" }, 1.0)
      .to(pileStage, { x: 8, y: 6, duration: 0.05, yoyo: true, repeat: 5 }, 1.0)
      .to(pileStage, { scale: 1, x: 0, y: 0, duration: 0.6, ease: "power3.out" }, 1.05)
      .to(blurFx, { opacity: 0, duration: 0.25 }, 1.05)
      .to(hotspots, { opacity: 1, duration: 0.28, stagger: 0.045, ease: "power2.out" }, 1.2);
  } else {
    gsap.set(actor, { left: landPose.left, top: landPose.top, width: landPose.width });
    gsap.set(actor3d, { rotationZ: landPose.rotateZ, rotationY: 0, rotationX: 0 });
    setTvScreenUi("projects");
    tl.to("#fx-channel-tear", { opacity: 0.5, duration: 0.1, yoyo: true, repeat: 1 }, 0)
      .to(projSec, { opacity: 0, duration: 0.45 }, 0.1)
      .to(aboutSec, { opacity: 1, duration: 0.55 }, 0.2)
      .to(actor, { left: aboutPose.left, top: aboutPose.top, width: aboutPose.width, duration: 0.85, ease: "power3.out" }, 0.12)
      .to(actor3d, { rotationZ: aboutPose.rotateZ, rotationY: aboutPose.rotateY, rotationX: aboutPose.rotateX, duration: 0.85, ease: "power3.out" }, 0.12)
      .call(() => setTvScreenUi("about"), null, 0.45);
  }
}

function runT3(isReverse, rate) {
  const projSec = document.getElementById("projects");
  const contactSec = document.getElementById("contact");
  const tear = document.getElementById("fx-channel-tear");
  const actor = document.getElementById("tv-actor");
  const landedTv = document.getElementById("pile-landing-tv");

  actor.style.display = "none";
  if (landedTv) landedTv.classList.remove("is-hidden-during-flight");
  contactSec.classList.add("is-active");
  projSec.classList.add("is-active");

  const tl = gsap.timeline({
    timeScale: rate,
    onComplete: () => {
      currentScene = isReverse ? 2 : 3;
      projSec.classList.toggle("is-active", isReverse);
      contactSec.classList.toggle("is-active", !isReverse);
      gsap.set([projSec, contactSec, tear], { clearProps: "opacity,transform" });
      updateActiveChrome(currentScene);
      isTransitioning = false;
    },
  });

  if (!isReverse) {
    gsap.set(contactSec, { opacity: 0 });
    tl.to(tear, { opacity: 0.72, duration: 0.14, yoyo: true, repeat: 1 }, 0)
      .to(projSec, { opacity: 0, duration: 0.28 }, 0.15)
      .to(contactSec, { opacity: 1, duration: 0.45 }, 0.25);
  } else {
    gsap.set(projSec, { opacity: 0 });
    tl.to(tear, { opacity: 0.72, duration: 0.14, yoyo: true, repeat: 1 }, 0)
      .to(contactSec, { opacity: 0, duration: 0.25 }, 0.1)
      .to(projSec, { opacity: 1, duration: 0.4 }, 0.2);
  }
}

function runDirectChannelJump(targetIdx) {
  const tear = document.getElementById("fx-channel-tear");
  const fromSec = document.querySelector(`.scene[data-scene="${currentScene}"]`);
  const toSec = document.querySelector(`.scene[data-scene="${targetIdx}"]`);
  toSec.classList.add("is-active");
  gsap.set(toSec, { opacity: 0 });

  gsap.timeline({
    onComplete: () => {
      fromSec.classList.remove("is-active");
      jumpToSceneImmediate(targetIdx);
      gsap.set([fromSec, toSec, tear], { clearProps: "opacity" });
      isTransitioning = false;
    },
  })
    .to(tear, { opacity: 0.75, duration: 0.14, yoyo: true, repeat: 1 }, 0)
    .to(fromSec, { opacity: 0, duration: 0.25 }, 0.08)
    .to(toSec, { opacity: 1, duration: 0.38 }, 0.18);
}

/* ==========================================================================
   Intent-Snap Controls (Desktop) & Mobile Scroll Observers
   ========================================================================== */
function isOverlayOpen() {
  return (
    !document.getElementById("project-modal").hidden ||
    !document.getElementById("index-overlay").hidden
  );
}

function sceneFromHash(hash) {
  if (hash === "#about") return 1;
  if (hash === "#projects" || hash === "#work") return 2;
  if (hash === "#contact") return 3;
  return 0;
}

function initSceneControls() {
  document.querySelectorAll("[data-jump]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idx = Number(btn.dataset.jump);
      if (isDesktopStage()) {
        e.preventDefault();
        transitionToScene(idx);
      }
    });
  });

  document.getElementById("hero-explore-btn")?.addEventListener("click", () => transitionToScene(1));
  document.getElementById("about-explore-btn")?.addEventListener("click", () => transitionToScene(2));

  let wheelAcc = 0;
  let wheelTimer = null;
  const canAboutScrollInDir = (dir) => {
    if (currentScene !== 1) return false;
    const col = document.getElementById("about-copy");
    if (!col || col.scrollHeight <= col.clientHeight + 2) return false;
    if (dir > 0) return col.scrollTop + col.clientHeight < col.scrollHeight - 2;
    return col.scrollTop > 2;
  };

  window.addEventListener("wheel", (e) => {
    if (!isDesktopStage() || isTransitioning || isOverlayOpen()) return;
    if (canAboutScrollInDir(e.deltaY)) {
      wheelAcc = 0;
      const col = document.getElementById("about-copy");
      if (col && !col.contains(e.target)) {
        e.preventDefault();
        col.scrollTop += e.deltaY;
      }
      return; // allow internal About column scrolling until boundary
    }
    e.preventDefault();
    wheelAcc += e.deltaY;
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(() => { wheelAcc = 0; }, 220);
    if (Math.abs(wheelAcc) >= 40) {
      const dir = wheelAcc > 0 ? 1 : -1;
      wheelAcc = 0;
      transitionToScene(currentScene + dir);
    }
  }, { passive: false });

  let touchY = 0;
  window.addEventListener("touchstart", (e) => { touchY = e.touches[0].clientY; }, { passive: true });
  window.addEventListener("touchend", (e) => {
    if (!isDesktopStage() || isTransitioning || isOverlayOpen()) return;
    const dy = touchY - e.changedTouches[0].clientY;
    if (canAboutScrollInDir(dy)) return;
    if (Math.abs(dy) >= 40) transitionToScene(currentScene + (dy > 0 ? 1 : -1));
  }, { passive: true });

  window.addEventListener("keydown", (e) => {
    if (!isDesktopStage() || isTransitioning || isOverlayOpen()) return;
    if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;
    if (["ArrowDown", "PageDown", " "].includes(e.key)) {
      e.preventDefault();
      transitionToScene(currentScene + 1);
    } else if (["ArrowUp", "PageUp"].includes(e.key)) {
      e.preventDefault();
      transitionToScene(currentScene - 1);
    }
  });

  window.addEventListener("resize", () => {
    if (isDesktopStage() && !isTransitioning) jumpToSceneImmediate(currentScene);
  });
}

function initMobileScrollObservers() {
  const sections = document.querySelectorAll(".scene");
  if (!("IntersectionObserver" in window)) return;
  let mobileAboutStarted = false;
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Number(entry.target.dataset.scene);
          updateActiveChrome(idx);
          if (idx === 1 && !mobileAboutStarted) {
            mobileAboutStarted = true;
            startAboutScreenCycle(document.getElementById("mobile-tv-ui-about"));
          }
        }
      });
    },
    { threshold: 0.35 }
  );
  sections.forEach((s) => obs.observe(s));
}

function updateActiveChrome(sceneIdx) {
  document.querySelectorAll(".nav-link[data-jump]").forEach((lnk) => {
    lnk.classList.toggle("is-active", Number(lnk.dataset.jump) === sceneIdx);
  });
  document.querySelectorAll(".scene-dot").forEach((dot) => {
    dot.classList.toggle("is-active", Number(dot.dataset.jump) === sceneIdx);
  });
}

/* ==========================================================================
   Scene 2 Debris Parallax & Scene 3 Hotspots / Flicker
   ========================================================================== */
function buildAboutDebris() {
  const field = document.getElementById("debris-field");
  if (!field) return;

  const nodes = DEBRIS_LAYOUT.map((item) => {
    const wrap = document.createElement("div");
    wrap.className = `debris-item debris-depth-${item.depth}${item.extraClass ? ` ${item.extraClass}` : ""}`;
    wrap.style.left = item.left;
    wrap.style.top = item.top;
    wrap.style.width = item.width;
    wrap.style.transform = `rotate(${item.rot}deg)`;
    wrap.dataset.depth = item.depth === "near" ? "28" : item.depth === "mid" ? "16" : "8";
    wrap.dataset.baseRot = String(item.rot);
    wrap.innerHTML = `<picture><source type="image/avif" srcset="assets/debris/${item.file}.avif"><img src="assets/debris/${item.file}.webp" alt="" loading="lazy" decoding="async"></picture>`;
    field.appendChild(wrap);
    return wrap;
  });

  if (prefersReduced()) return;
  window.addEventListener("mousemove", (e) => {
    if (currentScene !== 1 || !isDesktopStage()) return;
    const nx = e.clientX / window.innerWidth - 0.5;
    const ny = e.clientY / window.innerHeight - 0.5;
    nodes.forEach((el) => {
      const mul = Number(el.dataset.depth);
      const rot = el.dataset.baseRot;
      el.style.transform = `translate3d(${(nx * mul).toFixed(1)}px, ${(ny * mul).toFixed(1)}px, 0) rotate(${rot}deg)`;
    });
  }, { passive: true });
}

async function buildPileHotspots() {
  const layer = document.getElementById("pile-hotspots-layer");
  const hoverLabel = document.getElementById("pile-hover-label");
  if (!layer || !hotspotsData.length) return;

  PROJECTS.forEach((proj, idx) => {
    const hs = hotspotsData[idx];
    if (!hs) return;
    const xs = hs.points.map((p) => p[0]);
    const ys = hs.points.map((p) => p[1]);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);
    const bw = maxX - minX, bh = maxY - minY;
    const relPoly = hs.points
      .map(([x, y]) => `${(((x - minX) / bw) * 100).toFixed(2)}% ${(((y - minY) / bh) * 100).toFixed(2)}%`)
      .join(", ");

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pile-tv-hotspot";
    btn.style.left = `${minX}%`;
    btn.style.top = `${minY}%`;
    btn.style.width = `${bw}%`;
    btn.style.height = `${bh}%`;
    btn.style.clipPath = `polygon(${relPoly})`;
    btn.dataset.cx = String(minX + bw / 2);
    btn.dataset.cy = String(minY + bh / 2);
    btn.dataset.bw = String(bw);
    btn.setAttribute("aria-label", `${hs.ch}: ${proj.title}`);

    btn.innerHTML = `
      <img src="${proj.image}" alt="${proj.title} screenshot" loading="lazy" decoding="async">
      <div class="crt-glass-fx" aria-hidden="true"></div>
      ${isDebug ? `<span class="debug-poly-tag">#${idx + 1} ${hs.ch}</span>` : ""}
    `;

    btn.addEventListener("mouseenter", () => {
      layer.classList.add("has-hover");
      if (hoverLabel) {
        hoverLabel.textContent = `${hs.ch} / ${proj.title}`;
        hoverLabel.style.left = `${minX + bw / 2}%`;
        hoverLabel.style.top = `${minY}%`;
        hoverLabel.classList.add("is-visible");
      }
    });

    btn.addEventListener("mouseleave", () => {
      layer.classList.remove("has-hover");
      if (hoverLabel) hoverLabel.classList.remove("is-visible");
    });

    btn.addEventListener("click", () => openProjectModal(idx, btn, true));
    layer.appendChild(btn);
  });

  // Staggered idle flicker (2-3 TVs at a time)
  if (!prefersReduced()) {
    setInterval(() => {
      if (currentScene !== 2 || document.hidden || isOverlayOpen()) return;
      const cards = Array.from(layer.children);
      cards.forEach((c) => c.classList.remove("is-flicker"));
      const n = Math.random() > 0.5 ? 2 : 3;
      for (let i = 0; i < n; i += 1) {
        const pick = cards[Math.floor(Math.random() * cards.length)];
        if (pick) pick.classList.add("is-flicker");
      }
      setTimeout(() => cards.forEach((c) => c.classList.remove("is-flicker")), 180);
    }, 1700);
  }
}

function buildMobileProjectsGrid() {
  const grid = document.getElementById("mobile-projects-grid");
  if (!grid) return;
  PROJECTS.forEach((proj, idx) => {
    const ch = `CH ${String(idx + 1).padStart(2, "0")}`;
    const card = document.createElement("button");
    card.type = "button";
    card.className = "mobile-crt-card";
    card.innerHTML = `
      <div class="mobile-crt-screen">
        <img src="${proj.image}" alt="${proj.title} screenshot" loading="lazy" decoding="async">
        <div class="crt-glass-fx" aria-hidden="true"></div>
      </div>
      <p class="mobile-crt-ch">${ch}</p>
      <h3 class="mobile-crt-title">${proj.title}</h3>
    `;
    card.addEventListener("click", () => openProjectModal(idx, card, false));
    grid.appendChild(card);
  });
}

function buildAccessibleProjectList() {
  const list = document.getElementById("sr-project-list");
  if (!list) return;
  PROJECTS.forEach((proj, idx) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = proj.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = `CH ${String(idx + 1).padStart(2, "0")}: ${proj.title} — ${proj.description}`;
    li.appendChild(a);
    list.appendChild(li);
  });
}

/* ==========================================================================
   Scene 2: About Content, Stat Count-up & Project Deep-Link
   ========================================================================== */
let aboutStatsCounted = false;

function initAboutSection() {
  document.getElementById("about-label").textContent = ABOUT.label;
  document.getElementById("about-title").innerHTML = ABOUT.heading.replace("\n", "<br>");
  document.getElementById("about-p1").textContent = ABOUT.paragraph1;

  const p2 = document.getElementById("about-p2");
  p2.textContent = "";
  p2.append(document.createTextNode(ABOUT.paragraph2Before));
  p2.append(createAboutProjectLink(ABOUT.link1));
  p2.append(document.createTextNode(ABOUT.paragraph2Middle));
  p2.append(createAboutProjectLink(ABOUT.link2));
  p2.append(document.createTextNode(ABOUT.paragraph2After));

  document.getElementById("about-now-main").textContent = ABOUT.nowMain;
  document.getElementById("about-now-muted").textContent = ABOUT.nowMuted;

  const statsEl = document.getElementById("about-stats");
  statsEl.innerHTML = "";
  ABOUT.stats.forEach((st) => {
    const wrap = document.createElement("div");
    wrap.className = "about-stat";
    wrap.innerHTML = `
      <dd class="about-stat-val" data-target="${st.target}" data-suffix="${st.suffix}">${st.target}${st.suffix}</dd>
      <dt class="about-stat-lbl">${st.label}</dt>
    `;
    statsEl.appendChild(wrap);
  });

  const groupsEl = document.getElementById("about-expertise-groups");
  groupsEl.innerHTML = "";
  ABOUT.expertise.forEach((grp) => {
    const row = document.createElement("div");
    row.className = "expertise-group";
    const lbl = document.createElement("span");
    lbl.className = "expertise-group-label";
    lbl.textContent = grp.group;

    const ul = document.createElement("ul");
    ul.className = "expertise-chips";
    ul.setAttribute("aria-label", grp.group);
    grp.items.forEach((item) => {
      const li = document.createElement("li");
      li.className = "expertise-chip";
      li.textContent = item;
      ul.appendChild(li);
    });

    row.append(lbl, ul);
    groupsEl.appendChild(row);
  });

  const workBtn = document.getElementById("about-work-btn");
  workBtn.textContent = ABOUT.ctaLabel;
  workBtn.addEventListener("click", () => {
    if (isDesktopStage()) transitionToScene(2);
    else document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  });

  updateAboutScrollMask();
  window.addEventListener("resize", updateAboutScrollMask);
}

function createAboutProjectLink({ label, projectIndex }) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "about-proj-link";
  btn.textContent = label;
  btn.addEventListener("click", () => {
    if (isDesktopStage()) {
      transitionToScene(2);
      setTimeout(() => openProjectModal(projectIndex, btn, true), 1450);
    } else {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => openProjectModal(projectIndex, btn, false), 350);
    }
  });
  return btn;
}

function updateAboutScrollMask() {
  const col = document.getElementById("about-copy");
  if (!col) return;
  const scrollable = isDesktopStage() && col.scrollHeight > col.clientHeight + 2;
  col.classList.toggle("is-scrollable", scrollable);
}

function animateAboutStatsOnce() {
  if (aboutStatsCounted || prefersReduced()) return;
  aboutStatsCounted = true;
  document.querySelectorAll(".about-stat-val").forEach((el) => {
    const target = Number(el.dataset.target);
    const suffix = el.dataset.suffix || "";
    const obj = { val: 0 };
    if (typeof gsap !== "undefined") {
      gsap.to(obj, {
        val: target,
        duration: 0.9,
        ease: "power2.out",
        onUpdate: () => { el.textContent = `${Math.round(obj.val)}${suffix}`; },
      });
    }
  });
}

function buildIndexOverlay() {
  const overlay = document.getElementById("index-overlay");
  const openBtn = document.getElementById("pile-landing-tv");
  const actorBtn = document.getElementById("tv-viewall-btn");
  const closeBtn = document.getElementById("index-close");
  const backdrop = document.getElementById("index-backdrop");
  const list = document.getElementById("index-list");
  const previewImg = document.getElementById("index-preview-img");

  PROJECTS.forEach((proj, idx) => {
    const ch = `CH ${String(idx + 1).padStart(2, "0")}`;
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "index-row";
    btn.innerHTML = `<span class="index-ch">${ch}</span><span>${proj.title}</span>`;
    btn.addEventListener("mouseenter", () => { previewImg.src = proj.image; });
    btn.addEventListener("click", () => {
      overlay.hidden = true;
      openProjectModal(idx, openBtn, isDesktopStage());
    });
    li.appendChild(btn);
    list.appendChild(li);
  });

  const open = () => {
    overlay.hidden = false;
    document.body.classList.add("is-locked");
    closeBtn.focus();
  };
  const close = () => {
    overlay.hidden = true;
    document.body.classList.remove("is-locked");
  };

  openBtn?.addEventListener("click", open);
  actorBtn?.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  backdrop.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (!overlay.hidden && e.key === "Escape") close();
    if (!overlay.hidden && e.key === "Tab") trapFocus(e, overlay);
  });
}

function initModal() {
  const modal = document.getElementById("project-modal");
  document.getElementById("modal-close").addEventListener("click", closeProjectModal);
  document.getElementById("modal-backdrop").addEventListener("click", closeProjectModal);
  document.getElementById("modal-prev").addEventListener("click", () => stepProject(-1));
  document.getElementById("modal-next").addEventListener("click", () => stepProject(1));

  document.addEventListener("keydown", (e) => {
    if (modal.hidden) return;
    if (e.key === "Escape") { e.preventDefault(); closeProjectModal(); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); stepProject(-1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); stepProject(1); }
    else if (e.key === "Tab") trapFocus(e, modal);
  });
}

function zoomPileToTv(idx) {
  const stage = document.getElementById("pile-stage");
  const btn = document.querySelectorAll(".pile-tv-hotspot")[idx];
  if (!stage || !btn || prefersReduced() || !isDesktopStage()) return;
  const cx = parseFloat(btn.dataset.cx);
  const cy = parseFloat(btn.dataset.cy);
  const bw = parseFloat(btn.dataset.bw);
  const scale = Math.min(6.5, Math.max(3.5, 68 / bw));
  if (typeof gsap !== "undefined") {
    gsap.to(stage, {
      transformOrigin: `${cx}% ${cy}%`,
      scale,
      duration: 0.48,
      ease: "power3.out",
    });
  }
}

function openProjectModal(idx, triggerEl, withZoom) {
  const modal = document.getElementById("project-modal");
  const closeBtn = document.getElementById("modal-close");
  lastFocusedEl = triggerEl || document.activeElement;
  if (withZoom) zoomPileToTv(idx);
  updateModal(idx);
  document.body.classList.add("is-locked");

  setTimeout(() => {
    modal.hidden = false;
    closeBtn.focus();
  }, withZoom && !prefersReduced() ? 240 : 0);
}

function stepProject(delta) {
  const next = (activeProjectIdx + delta + PROJECTS.length) % PROJECTS.length;
  if (isDesktopStage()) zoomPileToTv(next);
  updateModal(next);
}

function updateModal(idx) {
  activeProjectIdx = idx;
  const p = PROJECTS[idx];
  document.getElementById("modal-counter").textContent = `${String(idx + 1).padStart(2, "0")} / ${String(PROJECTS.length).padStart(2, "0")}`;
  document.getElementById("modal-title").textContent = p.title;
  document.getElementById("modal-description").textContent = p.description;
  document.getElementById("modal-visit").href = p.url;
  const img = document.getElementById("modal-image");
  img.src = p.image;
  img.alt = `${p.title} screenshot`;
  document.getElementById("modal-media-scroll").scrollTop = 0;

  const flash = document.getElementById("modal-crt-flash");
  if (flash && !prefersReduced()) {
    flash.classList.remove("is-flashing");
    void flash.offsetWidth;
    flash.classList.add("is-flashing");
  }
}

function closeProjectModal() {
  const modal = document.getElementById("project-modal");
  modal.hidden = true;
  document.body.classList.remove("is-locked");
  const stage = document.getElementById("pile-stage");
  if (stage && typeof gsap !== "undefined") {
    gsap.to(stage, { scale: 1, duration: 0.45, ease: "power3.out", clearProps: "transformOrigin,transform" });
  }
  if (lastFocusedEl && typeof lastFocusedEl.focus === "function") lastFocusedEl.focus();
}

function trapFocus(event, container) {
  const focusable = Array.from(container.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'))
    .filter((el) => el.offsetParent !== null);
  if (!focusable.length) return;
  const first = focusable[0], last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
}

/* ==========================================================================
   Misc: Navbar Toggle, REC Timecode, Contact Form, Debug FPS
   ========================================================================== */
function initNavbar() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    menu.classList.remove("open");
  };
  toggle.addEventListener("click", () => {
    const exp = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!exp));
    menu.classList.toggle("open", !exp);
  });
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
}

function initTimecode() {
  const el = document.getElementById("rec-timecode");
  if (!el) return;
  let sec = 0;
  setInterval(() => {
    sec += 1;
    const h = String(Math.floor(sec / 3600)).padStart(2, "0");
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    el.textContent = `${h}:${m}:${s}`;
  }, 1000);
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");
  const submitBtn = document.getElementById("contact-submit");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusEl.className = "form-status";
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();
    if (!name || !email || !message) {
      statusEl.textContent = "Please fill in all fields.";
      statusEl.classList.add("is-error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      statusEl.textContent = "Please enter a valid email address.";
      statusEl.classList.add("is-error");
      return;
    }
    if (SITE_CONFIG.formspreeEndpoint) {
      submitBtn.disabled = true;
      statusEl.textContent = "TRANSMITTING...";
      try {
        const r = await fetch(SITE_CONFIG.formspreeEndpoint, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        });
        if (r.ok) { form.reset(); statusEl.textContent = "Transmission received. Thank you."; statusEl.classList.add("is-success"); }
        else { statusEl.textContent = "Transmission failed. Please email directly."; statusEl.classList.add("is-error"); }
      } catch {
        statusEl.textContent = "Network error. Please email directly.";
        statusEl.classList.add("is-error");
      } finally { submitBtn.disabled = false; }
      return;
    }
    window.location.href = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(`Portfolio inquiry from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    form.reset();
    statusEl.textContent = "Opening email client. Transmission ready.";
    statusEl.classList.add("is-success");
  });
}

function initDebugHud() {
  if (!isDebug) return;
  const hud = document.getElementById("debug-hud");
  if (!hud) return;
  hud.hidden = false;
  let frames = 0;
  let last = performance.now();
  const loop = (now) => {
    frames += 1;
    if (now - last >= 500) {
      const fps = Math.round((frames * 1000) / (now - last));
      hud.textContent = `FPS: ${fps} | SCENE: 0${currentScene + 1}`;
      frames = 0;
      last = now;
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}
