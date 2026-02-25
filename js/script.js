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
    "Соединяю код с творчеством.",
    "Создаю чистый и сбалансированный UI.",
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

    // works subtitle (if exists)
    const ws = document.querySelector("#works .lead");
    if (ws && t["works.subtitle"]) ws.textContent = t["works.subtitle"];

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
      skillHeaders[0].textContent = t["skills.technologies"] || skillHeaders[0].textContent;
      skillHeaders[1].textContent = t["skills.frameworks"] || skillHeaders[1].textContent;
      skillHeaders[2].textContent = t["skills.tools"] || skillHeaders[2].textContent;
      skillHeaders[3].textContent = t["skills.softskills"] || skillHeaders[3].textContent;
    }

    // education
    const eduTitles = document.querySelectorAll('.edu-item h4');
    const eduDescs = document.querySelectorAll('.edu-item p');
    if (eduTitles[0] && t["education.esil"]) eduTitles[0].textContent = t["education.esil"];
    if (eduTitles[1] && t["education.itstep"]) eduTitles[1].textContent = t["education.itstep"];
    if (eduDescs[0] && t["education.esil.desc"]) eduDescs[0].textContent = t["education.esil.desc"];
    if (eduDescs[1] && t["education.itstep.desc"]) eduDescs[1].textContent = t["education.itstep.desc"];

    // contacts
    const contactsContent = document.querySelector("#contacts > div");
    if (contactsContent && t["contacts.email"]) {
      const paragraphs = contactsContent.querySelectorAll("p");
      if (paragraphs[0]) paragraphs[0].innerHTML = `<strong>${t["contacts.email"]}</strong> <a href="mailto:rodion.ch06@gmail.com" style="color:var(--accent)">rodion.ch06@gmail.com</a>`;
      if (paragraphs[1]) paragraphs[1].innerHTML = `<strong>${t["contacts.phone"]}</strong> <a href="tel:+77052940884" style="color:var(--accent)">+7 705 294 0884</a>`;
      if (paragraphs[2]) paragraphs[2].textContent = t["contacts.goal"] || paragraphs[2].textContent;
    }

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

      const list = item.querySelectorAll('.ti-right li');
      const itemsArray = t[`experience.${key}.items`];
      if (itemsArray && list.length) {
        list.forEach((li, i) => { if (itemsArray[i]) li.textContent = itemsArray[i]; });
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
});