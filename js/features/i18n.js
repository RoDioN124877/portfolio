// Переключение языка и применение переводов (translations.js должен быть загружен раньше)
(function (App) {
  "use strict";

  App.initI18n = function ({ menu, typed }) {
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
      if (skillHeaders.length >= 4) {
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
      document.querySelectorAll('.ladder-steps li').forEach((step, i) => t[ladderLabels[i]] && step.setAttribute('data-label', t[ladderLabels[i]]));

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
      typed.setPhrases([t["hero.tagline1"], t["hero.tagline2"], t["hero.tagline3"]]);
    }

    // init language
    setLanguage(currentLang);

    // toggles
    const langToggle = document.getElementById('langToggle');
    const langToggleMobile = document.getElementById('langToggleMobile');
    langToggle && langToggle.addEventListener('click', () => setLanguage(currentLang === 'ru' ? 'en' : 'ru'));
    langToggleMobile && langToggleMobile.addEventListener('click', () => { setLanguage(currentLang === 'ru' ? 'en' : 'ru'); menu.closeIfOpen(); });
  };
})(window.App = window.App || {});
