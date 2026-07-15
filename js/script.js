document.addEventListener("DOMContentLoaded", () => {
  // 1. Year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Burger menu
  const burger = document.getElementById("burgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeBtn = document.getElementById("closeBtn");
  const menuLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];

  function toggleMenu() {
    const isExpanded = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", !isExpanded);
    mobileMenu.classList.toggle("active");
    document.body.style.overflow = !isExpanded ? "hidden" : "";
  }

  burger && burger.addEventListener("click", toggleMenu);
  closeBtn && closeBtn.addEventListener("click", toggleMenu);
  menuLinks.forEach((link) => link.addEventListener("click", () => mobileMenu.classList.contains("active") && toggleMenu()));

  // 3. Typed
  let typedTextSpan = document.getElementById("typed-output");
  let phrases = [
    "Веду фичи от архитектуры до production.",
    "React / TypeScript / Node.js / NestJS.",
    "Люблю музыку и дисциплину спорта."
  ];
  let phraseIndex = 0, charIndex = 0, isDeleting = false;

  function typeWriter() {
    if (!typedTextSpan) return;
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
      typedTextSpan.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextSpan.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 40 : 80;
    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      delay = 1500;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 300;
    }
    setTimeout(typeWriter, delay);
  }
  typeWriter();

  // 4. Scroll reveal
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => e.isIntersecting && e.target.classList.add("active"));
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  // 5. Ladder progress (character)
  const sections = document.querySelectorAll(".section-track");
  const ladderSteps = document.querySelectorAll(".ladder-steps li");
  const charContainer = document.querySelector(".ladder-character");
  const sectionMap = Array.from(sections).map(s => s.id); // dynamic
  let lastScrollTop = 0, scrollTimeout;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    let currentSectionId = "";
    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop - window.innerHeight / 2.5) currentSectionId = sec.getAttribute("id");
    });

    ladderSteps.forEach(li => li.classList.toggle("active", li.dataset.target === currentSectionId));

    const index = sectionMap.indexOf(currentSectionId);
    if (index !== -1 && ladderSteps.length > 1 && charContainer) {
      const stepHeight = 100 / (ladderSteps.length - 1);
      const finalTop = Math.min(Math.max(index * stepHeight, 0), 100);
      charContainer.style.top = `${finalTop}%`;
    }

    if (charContainer) {
      charContainer.classList.add("walking");
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => charContainer.classList.remove("walking"), 120);
      if (scrollY > lastScrollTop) charContainer.classList.remove("up");
      lastScrollTop = scrollY;
    }
  });

  ladderSteps.forEach(li => li.addEventListener("click", () => {
    const targetSec = document.getElementById(li.dataset.target);
    targetSec && targetSec.scrollIntoView({ behavior: "smooth" });
  }));

  // 6. Spotlight
  document.querySelectorAll(".spotlight-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  // 7. Language switcher & translations
  let currentLang = localStorage.getItem("language") || "ru";

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
    document.querySelectorAll(".lang-text").forEach(el => el.textContent = lang === "ru" ? "EN" : "RU");
    document.querySelectorAll(".lang-text-mobile").forEach(el => el.textContent = lang === "ru" ? "English" : "Русский");
    applyTranslations(lang);
    updateTypedAnimation(lang);
  }

  function applyTranslations(lang) {
    const t = translations[lang];
    if (!t) return;

    // nav
    document.querySelectorAll(".main-nav a").forEach((link, idx) => {
      const keys = ["nav.about","nav.experience","nav.works","nav.skills","nav.contacts"];
      if (t[keys[idx]]) link.textContent = t[keys[idx]];
    });

    // mobile menu
    document.querySelectorAll("#mobileMenu a").forEach((link, idx) => {
      const keys = ["nav.about","nav.experience","nav.works","nav.skills","nav.contacts","nav.downloadResume"];
      if (t[keys[idx]]) link.textContent = t[keys[idx]];
    });

    // resume
    const resumeBtn = document.querySelector(".btn-cv");
    if (resumeBtn && (resumeBtn.textContent.includes("Резюме") || resumeBtn.textContent.includes("Resume"))) {
      resumeBtn.textContent = t["nav.resume"];
    }

    // hero
    const nameElement = document.querySelector(".name");
    if (nameElement) {
      nameElement.childNodes[0].textContent = t["hero.title"] || nameElement.childNodes[0].textContent;
      const span = nameElement.querySelector("span.muted");
      if (span) span.textContent = t["hero.subtitle"] || span.textContent;
    }

    const metaSpans = document.querySelectorAll(".meta span");
    if (metaSpans.length >= 3) {
      metaSpans[0].textContent = t["hero.location"] || metaSpans[0].textContent;
      metaSpans[1].textContent = t["hero.english"] || metaSpans[1].textContent;
      metaSpans[2].textContent = t["hero.birthdate"] || metaSpans[2].textContent;
    }

    // section titles
    document.querySelectorAll(".section-title").forEach(title => {
      const id = title.closest("section").id;
      if (id === "about" && t["about.title"]) title.textContent = t["about.title"];
      if (id === "experience" && t["experience.title"]) title.textContent = t["experience.title"];
      if (id === "works" && t["works.title"]) title.textContent = t["works.title"];
      if (id === "skills" && t["skills.title"]) title.textContent = t["skills.title"];
      if (id === "education" && t["education.title"]) title.textContent = t["education.title"];
      if (id === "contacts" && t["contacts.title"]) title.textContent = t["contacts.title"];
    });

    // about text
    const aboutEl = document.getElementById("aboutLead");
    if (aboutEl && t["about.text"]) aboutEl.innerHTML = t["about.text"];

    // generic data-i18n bindings (cases, works subtitles, contacts, etc.)
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (t[key]) el.textContent = t[key];
    });
    document.querySelectorAll("[data-i18n-list]").forEach(ul => {
      const arr = t[ul.dataset.i18nList];
      if (arr && arr.length) {
        ul.innerHTML = "";
        arr.forEach(text => {
          const li = document.createElement("li");
          li.textContent = text;
          ul.appendChild(li);
        });
      }
    });

    // projects titles/descs
    const projectTitles = document.querySelectorAll(".pc-body h4");
    const projectDescs = document.querySelectorAll(".pc-body p");
    const titleKeys = ["works.verotour.title","works.snxrs.title","works.daft.title","works.lst.title","works.boxmashin.title"];
    const descKeys = ["works.verotour.desc","works.snxrs.desc","works.daft.desc","works.lst.desc","works.boxmashin.desc"];
    projectTitles.forEach((el, i) => t[titleKeys[i]] && (el.textContent = t[titleKeys[i]]));
    projectDescs.forEach((el, i) => t[descKeys[i]] && (el.textContent = t[descKeys[i]]));

    // skills
    const skillHeaders = document.querySelectorAll('.skill-block h5');
    if (skillHeaders.length >=4) {
      skillHeaders[0].textContent = t["skills.languages"] || skillHeaders[0].textContent;
      skillHeaders[1].textContent = t["skills.frontend"] || skillHeaders[1].textContent;
      skillHeaders[2].textContent = t["skills.backend"] || skillHeaders[2].textContent;
      skillHeaders[3].textContent = t["skills.tools"] || skillHeaders[3].textContent;
    }

    // education
    const eduTitles = document.querySelectorAll('.edu-item h4');
    const eduDescs = document.querySelectorAll('.edu-item p');
    if (eduTitles[0] && t["education.esil"]) eduTitles[0].textContent = t["education.esil"];
    if (eduTitles[1] && t["education.itstep"]) eduTitles[1].textContent = t["education.itstep"];
    if (eduDescs[0] && t["education.esil.desc"]) eduDescs[0].textContent = t["education.esil.desc"];
    if (eduDescs[1] && t["education.itstep.desc"]) eduDescs[1].textContent = t["education.itstep.desc"];

    // ladder step labels
    const ladderLabels = ["ladder.start","ladder.about","ladder.experience","ladder.projects","ladder.skills"];
    document.querySelectorAll('.ladder-steps li').forEach((step,i) => t[ladderLabels[i]] && step.setAttribute('data-label', t[ladderLabels[i]]));

    // footer
    const footerText = document.querySelector(".site-footer > .container > div:first-child");
    if (footerText && t["footer.copyright"]) footerText.innerHTML = t["footer.copyright"].replace("[year]", new Date().getFullYear());

    // finally update experience content
    updateExperienceSection(lang);
  }

  // robust updateExperienceSection using data-exp attribute
  function updateExperienceSection(lang) {
    const t = translations[lang];
    if (!t) return;

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
      const key = item.dataset.exp; // e.g. 'qazirgi','lst','startup'...
      if (!key) return;
      const left = item.querySelector('.ti-left');
      const timeEl = left && left.querySelector('time');
      const roleEl = left && left.querySelector('.role');

      if (timeEl && t[`experience.${key}.period`]) timeEl.textContent = t[`experience.${key}.period`];
      if (roleEl && t[`experience.${key}.role`]) roleEl.textContent = t[`experience.${key}.role`];

      const ul = item.querySelector('.ti-right ul');
      const itemsArray = t[`experience.${key}.items`];
      if (ul && itemsArray && itemsArray.length) {
        ul.innerHTML = "";
        itemsArray.forEach(text => {
          const li = document.createElement('li');
          li.textContent = text;
          ul.appendChild(li);
        });
      }
    });
  }

  function updateTypedAnimation(lang) {
    const t = translations[lang];
    if (!t) return;
    phrases = [t["hero.tagline1"], t["hero.tagline2"], t["hero.tagline3"]];
    phraseIndex = 0; charIndex = 0; isDeleting = false;
  }

  // init language
  setLanguage(currentLang);

  // toggles
  const langToggle = document.getElementById('langToggle');
  const langToggleMobile = document.getElementById('langToggleMobile');
  langToggle && langToggle.addEventListener('click', () => setLanguage(currentLang === 'ru' ? 'en' : 'ru'));
  langToggleMobile && langToggleMobile.addEventListener('click', () => { setLanguage(currentLang === 'ru' ? 'en' : 'ru'); mobileMenu && mobileMenu.classList.contains('active') && toggleMenu(); });

  // HEADER show/hide on scroll (separate)
  const header = document.getElementById('siteHeader');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.pageYOffset;
    if (current <= 0) { header && header.classList.remove('hide'); lastScroll = 0; return; }
    if (current > lastScroll && header && !header.classList.contains('hide')) {
      header.classList.add('hide');
    } else if (current < lastScroll && header && header.classList.contains('hide')) {
      header.classList.remove('hide');
    }
    lastScroll = current;
  });

  // =========================================
  // 8. SMOOTH INERTIA SCROLL (desktop wheel)
  // =========================================
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(pointer: coarse)").matches;

  if (!reducedMotion && !isTouch) {
    let target = window.scrollY;
    let currentPos = window.scrollY;
    let rafId = null;
    let animating = false;
    const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;

    function smoothLoop() {
      currentPos += (target - currentPos) * 0.075;
      if (Math.abs(target - currentPos) < 0.5) {
        currentPos = target;
        window.scrollTo(0, currentPos);
        animating = false;
        return;
      }
      window.scrollTo(0, currentPos);
      rafId = requestAnimationFrame(smoothLoop);
    }

    window.addEventListener("wheel", (e) => {
      if (e.ctrlKey) return; // не мешаем зуму
      if (e.target.closest(".terminal")) return;
      e.preventDefault();
      const dy = e.deltaMode === 1 ? e.deltaY * 33 : e.deltaY;
      target = Math.max(0, Math.min(target + dy, maxScroll()));
      if (!animating) {
        animating = true;
        currentPos = window.scrollY;
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(smoothLoop);
      }
    }, { passive: false });

    // синхронизация при нативном скролле (клавиши, якоря, скроллбар)
    window.addEventListener("scroll", () => {
      if (!animating) { target = window.scrollY; currentPos = window.scrollY; }
    }, { passive: true });
  }

  // =========================================
  // 9. HERO PARALLAX
  // =========================================
  const heroSection = document.getElementById("hero");
  const heroLeft = document.querySelector(".hero-left");
  const heroRight = document.querySelector(".hero-right");
  if (!reducedMotion && heroSection) {
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      if (y > heroSection.offsetHeight + 150) return;
      if (heroRight) heroRight.style.transform = `translateY(${y * 0.12}px)`;
      if (heroLeft) heroLeft.style.transform = `translateY(${y * 0.05}px)`;
    }, { passive: true });
  }

  // =========================================
  // 10. HERO CANVAS PARTICLES
  // =========================================
  const heroCanvas = document.getElementById("heroCanvas");
  if (heroCanvas && heroSection && !reducedMotion) {
    const pctx = heroCanvas.getContext("2d");
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const P = { w: 0, h: 0, dots: [], mx: -9999, my: -9999, visible: true, raf: null };

    function pResize() {
      P.w = heroSection.offsetWidth;
      P.h = heroSection.offsetHeight;
      heroCanvas.width = P.w * DPR;
      heroCanvas.height = P.h * DPR;
      pctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const count = Math.min(90, Math.floor(P.w / 14));
      P.dots = Array.from({ length: count }, () => ({
        x: Math.random() * P.w,
        y: Math.random() * P.h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
      }));
    }

    function pTick() {
      P.raf = requestAnimationFrame(pTick);
      if (!P.visible) return;
      pctx.clearRect(0, 0, P.w, P.h);
      for (const d of P.dots) {
        // лёгкое отталкивание от курсора
        const dx = d.x - P.mx, dy = d.y - P.my;
        const distSq = dx * dx + dy * dy;
        if (distSq < 14400) {
          const dist = Math.sqrt(distSq) || 1;
          d.vx += (dx / dist) * 0.06;
          d.vy += (dy / dist) * 0.06;
        }
        d.vx = Math.max(-0.6, Math.min(0.6, d.vx));
        d.vy = Math.max(-0.6, Math.min(0.6, d.vy));
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > P.w) d.vx *= -1;
        if (d.y < 0 || d.y > P.h) d.vy *= -1;
        pctx.fillStyle = "rgba(0, 240, 239, 0.55)";
        pctx.beginPath();
        pctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        pctx.fill();
      }
      // соединительные линии
      for (let i = 0; i < P.dots.length; i++) {
        for (let j = i + 1; j < P.dots.length; j++) {
          const a = P.dots[i], b = P.dots[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = dx * dx + dy * dy;
          if (dist < 12100) {
            pctx.strokeStyle = `rgba(0, 240, 239, ${(1 - dist / 12100) * 0.14})`;
            pctx.lineWidth = 1;
            pctx.beginPath();
            pctx.moveTo(a.x, a.y);
            pctx.lineTo(b.x, b.y);
            pctx.stroke();
          }
        }
      }
    }

    heroSection.addEventListener("mousemove", (e) => {
      const rect = heroSection.getBoundingClientRect();
      P.mx = e.clientX - rect.left;
      P.my = e.clientY - rect.top;
    });
    heroSection.addEventListener("mouseleave", () => { P.mx = -9999; P.my = -9999; });
    new IntersectionObserver((entries) => { P.visible = entries[0].isIntersecting; }).observe(heroSection);
    window.addEventListener("resize", pResize);
    pResize();
    pTick();
  }

  // =========================================
  // 11. SCROLL-DRIVEN TIMELINE
  // =========================================
  const timeline = document.querySelector(".timeline");
  if (timeline) {
    const tlItems = timeline.querySelectorAll(".timeline-item");
    if (reducedMotion) {
      tlItems.forEach(item => item.classList.add("in-view"));
      timeline.style.setProperty("--tl-progress", "100%");
    } else {
      // карточка «зажигается», когда её верх доехал до ~70% высоты экрана
      const tlObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            tlObserver.unobserve(e.target);
          }
        });
      }, { rootMargin: "0px 0px -30% 0px", threshold: 0 });
      tlItems.forEach(item => tlObserver.observe(item));

      window.addEventListener("scroll", () => {
        const rect = timeline.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (window.innerHeight * 0.65 - rect.top) / rect.height));
        timeline.style.setProperty("--tl-progress", `${(progress * 100).toFixed(2)}%`);
      }, { passive: true });
    }
  }

  // =========================================
  // 12. 360° PANO DEMO (lazy three.js)
  // =========================================
  const panoWrap = document.getElementById("panoDemo");
  if (panoWrap && window.WebGLRenderingContext) {
    const panoIO = new IntersectionObserver((entries) => {
      if (entries.some(e => e.isIntersecting)) {
        panoIO.disconnect();
        loadThree().then(initPano).catch(() => {
          const hint = document.getElementById("panoHint");
          if (hint) hint.textContent = "WebGL demo недоступно";
        });
      }
    }, { rootMargin: "300px" });
    panoIO.observe(panoWrap);
  }

  function loadThree() {
    return new Promise((resolve, reject) => {
      if (window.THREE) return resolve();
      const s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.min.js";
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  // процедурная equirectangular-текстура: звёзды + неоновая сетка
  function makePanoTexture() {
    const c = document.createElement("canvas");
    c.width = 2048;
    c.height = 1024;
    const g = c.getContext("2d");
    const sky = g.createLinearGradient(0, 0, 0, c.height);
    sky.addColorStop(0, "#01020a");
    sky.addColorStop(0.55, "#041218");
    sky.addColorStop(0.63, "#0a3036");
    sky.addColorStop(0.67, "#041218");
    sky.addColorStop(1, "#010208");
    g.fillStyle = sky;
    g.fillRect(0, 0, c.width, c.height);
    for (let i = 0; i < 900; i++) {
      g.fillStyle = `rgba(255,255,255,${(Math.random() * 0.7 + 0.15).toFixed(2)})`;
      g.beginPath();
      g.arc(Math.random() * c.width, Math.random() * c.height * 0.6, Math.random() * 1.3 + 0.2, 0, Math.PI * 2);
      g.fill();
    }
    g.fillStyle = "rgba(0, 240, 239, 0.10)";
    g.fillRect(0, 640, c.width, 26);
    g.fillStyle = "rgba(0, 240, 239, 0.55)";
    g.fillRect(0, 652, c.width, 3);
    g.strokeStyle = "rgba(0, 240, 239, 0.22)";
    g.lineWidth = 1;
    for (let y = 660, step = 6; y < c.height; y += step, step *= 1.35) {
      g.beginPath(); g.moveTo(0, y); g.lineTo(c.width, y); g.stroke();
    }
    for (let x = 0; x <= c.width; x += 64) {
      g.beginPath(); g.moveTo(x, 656); g.lineTo(x, c.height); g.stroke();
    }
    return c;
  }

  function initPano() {
    const canvas = document.getElementById("panoCanvas");
    canvas.style.touchAction = "none";
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
    const geo = new THREE.SphereGeometry(50, 48, 32);
    geo.scale(-1, 1, 1); // смотрим изнутри сферы
    const tex = new THREE.CanvasTexture(makePanoTexture());
    if ("SRGBColorSpace" in THREE) tex.colorSpace = THREE.SRGBColorSpace;
    scene.add(new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: tex })));

    // кастомные yaw/pitch-контролы с ограничением наклона — как в рабочем 360-модуле
    const PITCH_MIN = -0.5, PITCH_MAX = 0.75;
    let yaw = 0, pitch = 0.05, targetYaw = 0, targetPitch = 0.05;
    let dragging = false, lastX = 0, lastY = 0;

    canvas.addEventListener("pointerdown", (e) => {
      canvas.setPointerCapture(e.pointerId);
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      panoWrap.classList.add("interacted");
    });
    canvas.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      // тянем влево — камера поворачивает вправо (сцена уходит вправо)
      targetYaw += (e.clientX - lastX) * 0.005;
      targetPitch -= (e.clientY - lastY) * 0.005;
      targetPitch = Math.max(PITCH_MIN, Math.min(PITCH_MAX, targetPitch));
      lastX = e.clientX;
      lastY = e.clientY;
    });
    canvas.addEventListener("pointerup", () => { dragging = false; });
    canvas.addEventListener("pointercancel", () => { dragging = false; });

    function panoResize() {
      const w = panoWrap.clientWidth, h = panoWrap.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", panoResize);
    panoResize();

    let panoVisible = true;
    new IntersectionObserver((entries) => { panoVisible = entries[0].isIntersecting; }).observe(panoWrap);

    (function panoRender() {
      requestAnimationFrame(panoRender);
      if (!panoVisible) return;
      if (!dragging && !reducedMotion) targetYaw += 0.0006; // медленное авто-вращение
      yaw += (targetYaw - yaw) * 0.08; // демпфирование
      pitch += (targetPitch - pitch) * 0.08;
      camera.lookAt(
        Math.sin(yaw) * Math.cos(pitch),
        Math.sin(pitch),
        Math.cos(yaw) * Math.cos(pitch)
      );
      renderer.render(scene, camera);
    })();
  }

  // =========================================
  // 13. KONAMI TERMINAL
  // =========================================
  const term = document.getElementById("terminal");
  const termBody = document.getElementById("termBody");
  const termInput = document.getElementById("termInput");
  const termForm = document.getElementById("termForm");
  const termClose = document.getElementById("termClose");

  if (term && termBody && termInput && termForm && termClose) {
    const konami = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
    let kIndex = 0;

    const termFab = document.getElementById("termFab");

    function termPrint(text, cls) {
      const div = document.createElement("div");
      if (cls) div.className = cls;
      div.textContent = text;
      termBody.appendChild(div);
      termBody.scrollTop = termBody.scrollHeight;
    }

    // печатающийся вывод, строки — последовательно
    let typeChain = Promise.resolve();
    function termType(text, cls) {
      typeChain = typeChain.then(() => new Promise((done) => {
        const div = document.createElement("div");
        if (cls) div.className = cls;
        termBody.appendChild(div);
        let i = 0;
        const timer = setInterval(() => {
          div.textContent = text.slice(0, ++i);
          termBody.scrollTop = termBody.scrollHeight;
          if (i >= text.length) {
            clearInterval(timer);
            done();
          }
        }, 14);
      }));
      return typeChain;
    }

    function openTerminal() {
      if (!term.hidden) return;
      term.hidden = false;
      termFab && termFab.classList.add("hidden-by-term");
      termBody.innerHTML = "";
      typeChain = Promise.resolve();
      termPrint("rodion@portfolio — v1.0", "t-accent");
      termType("Привет! Я мини-терминал этого портфолио.");
      termType("Введите 'help' — покажу, что умею.", "t-muted");
      termInput.focus();
    }
    function closeTerminal() {
      term.hidden = true;
      term.classList.remove("minimized", "maximized");
      termFab && termFab.classList.remove("hidden-by-term");
    }

    // строка с готовыми DOM-узлами (для ссылок)
    function termPrintNodes(nodes) {
      const div = document.createElement("div");
      nodes.forEach(n => div.appendChild(n));
      termBody.appendChild(div);
      termBody.scrollTop = termBody.scrollHeight;
    }
    function makeLink(text, href) {
      const a = document.createElement("a");
      a.textContent = text;
      a.href = href;
      if (href.startsWith("http")) a.target = "_blank";
      return a;
    }
    function makeSectionLink(label, sectionId) {
      const s = document.createElement("span");
      s.className = "term-link";
      s.textContent = label;
      s.addEventListener("click", () => {
        const sec = document.getElementById(sectionId);
        if (sec) sec.scrollIntoView({ behavior: "smooth" });
      });
      return s;
    }
    const txt = (t) => document.createTextNode(t);

    const termCommands = {
      help: () => termPrint("Команды: whoami, about, stack, cases, ls, contacts, cv, sudo, clear, exit"),
      whoami: () => termPrint("rodion — fullstack developer (React / TypeScript / Node.js)"),
      about: () => termPrint("Fullstack-разработчик: React / TypeScript / Node.js / NestJS.\nВеду фичи от архитектуры до production."),
      stack: () => termPrint("Frontend: React, Next.js, Zustand, WebGL / three.js\nBackend:  Node.js, NestJS, SQL, Redis, BullMQ\nПрочее:   Git, Kubernetes, Figma"),
      cases: () => termPrint([...document.querySelectorAll(".case-card h4")].map(h => "• " + h.textContent.trim()).join("\n") || "кейсы не найдены"),
      ls: () => {
        termPrintNodes([
          makeSectionLink("о-себе/", "about"), txt("  "),
          makeSectionLink("опыт/", "experience"), txt("  "),
          makeSectionLink("кейсы/", "works"), txt("  "),
          makeSectionLink("навыки/", "skills"), txt("  "),
          makeSectionLink("контакты/", "contacts"), txt("  "),
          txt("секреты/"),
        ]);
        termPrint("(клик по папке — перейти к разделу)", "t-muted");
      },
      "cd секреты": () => termPrint("permission denied 🔒 (подсказка: ↑↑↓↓←→←→BA вы уже нашли)", "t-muted"),
      contacts: () => {
        termPrintNodes([txt("email:  "), makeLink("rodion.ch06@gmail.com", "mailto:rodion.ch06@gmail.com")]);
        termPrintNodes([txt("tg:     "), makeLink("@rodion_dev", "https://t.me/rodion_dev")]);
        termPrintNodes([txt("github: "), makeLink("github.com/RoDioN124877", "https://github.com/RoDioN124877")]);
      },
      cv: () => {
        window.open("resume.html", "_blank");
        termPrint("Открываю резюме…");
      },
      sudo: () => termPrint("nice try 😏", "t-accent"),
      clear: () => { termBody.innerHTML = ""; },
      exit: () => closeTerminal(),
    };
    termCommands["cd секреты/"] = termCommands["cd секреты"];

    termFab && termFab.addEventListener("click", openTerminal);

    // «светофор»: красная — закрыть, жёлтая — свернуть, зелёная — развернуть
    const dotClose = document.getElementById("termDotClose");
    const dotMin = document.getElementById("termDotMin");
    const dotMax = document.getElementById("termDotMax");
    dotClose && dotClose.addEventListener("click", closeTerminal);
    dotMin && dotMin.addEventListener("click", () => {
      term.classList.toggle("minimized");
      term.classList.remove("maximized");
    });
    dotMax && dotMax.addEventListener("click", () => {
      term.classList.toggle("maximized");
      term.classList.remove("minimized");
      termInput.focus();
    });

    termForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const cmd = termInput.value.trim().toLowerCase();
      termInput.value = "";
      if (!cmd) return;
      termPrint("$ " + cmd, "t-muted");
      (termCommands[cmd] || (() => termPrint(`команда не найдена: ${cmd} — попробуйте 'help'`)))();
    });
    termClose.addEventListener("click", closeTerminal);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !term.hidden) {
        closeTerminal();
        return;
      }
      if (e.target === termInput) return;
      const key = e.key.toLowerCase();
      if (key === konami[kIndex]) {
        kIndex++;
        if (kIndex === konami.length) {
          kIndex = 0;
          openTerminal();
        }
      } else {
        kIndex = key === konami[0] ? 1 : 0;
      }
    });

    console.log("%c↑ ↑ ↓ ↓ ← → ← → B A — попробуй ;)", "color:#00f0ef;font-size:14px;font-weight:bold");
  }
});