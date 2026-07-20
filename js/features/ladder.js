// Лестница-прогресс с персонажем: тематические зоны по секциям + эмоции робота
(function (App) {
  "use strict";

  App.initLadder = function () {
    const ladderRoot = document.querySelector(".progress-ladder");
    const sections = document.querySelectorAll(".section-track");
    const ladderSteps = document.querySelectorAll(".ladder-steps li");
    const charContainer = document.querySelector(".ladder-character");
    const sectionMap = Array.from(sections).map(s => s.id); // dynamic
    let lastScrollTop = 0, scrollTimeout;

    // каждая секция — своя «локация»: цвет трека и подсветки
    const ZONES = {
      hero:       { color: "#00f0ef" },
      about:      { color: "#00ff66" },
      experience: { color: "#ffc45e" },
      works:      { color: "#a78bfa" },
      skills:     { color: "#ff5f57" },
    };
    let currentZone = "";

    if (charContainer) {
      charContainer.title = "Наверх";
      charContainer.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }

    function setZone(id) {
      if (!id || id === currentZone || !ZONES[id]) return;
      currentZone = id;
      const zone = ZONES[id];
      if (ladderRoot) {
        ladderRoot.dataset.zone = id;
        ladderRoot.style.setProperty("--la", zone.color);
      }
    }

    function update() {
      const scrollY = window.scrollY;
      let currentSectionId = "";
      sections.forEach(sec => {
        if (scrollY >= sec.offsetTop - window.innerHeight / 2.5) currentSectionId = sec.getAttribute("id");
      });

      ladderSteps.forEach(li => li.classList.toggle("active", li.dataset.target === currentSectionId));
      setZone(currentSectionId || "hero");

      // плавное движение: интерполируем позицию между точками по прогрессу внутри секции;
      // первая секция стартует ровно от нуля, чтобы наверху робот стоял на первой точке
      const index = sectionMap.indexOf(currentSectionId);
      if (index !== -1 && ladderSteps.length > 1 && charContainer) {
        const stepHeight = 100 / (ladderSteps.length - 1);
        const sectionStart = (i) => (i <= 0 ? 0 : sections[i].offsetTop - window.innerHeight / 2.5);
        const start = sectionStart(index);
        const end = index + 1 < sections.length
          ? sectionStart(index + 1)
          : document.documentElement.scrollHeight - window.innerHeight;
        const t = end > start ? Math.min(Math.max((scrollY - start) / (end - start), 0), 1) : 0;
        const finalTop = Math.min(Math.max((index + t) * stepHeight, 0), 100);
        charContainer.style.top = `${finalTop}%`;
      }

      if (charContainer) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const pct = max > 0 ? Math.round(Math.min(1, scrollY / max) * 100) : 0;
        charContainer.classList.toggle("finished", pct >= 99); // дошёл до конца — празднует

        charContainer.classList.add("walking");
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => charContainer.classList.remove("walking"), 120);
        if (scrollY > lastScrollTop) charContainer.classList.remove("up");
        lastScrollTop = scrollY;
      }
    }

    window.addEventListener("scroll", update);
    update(); // выставляем позицию сразу при загрузке, не дожидаясь первого скролла

    ladderSteps.forEach(li => li.addEventListener("click", () => {
      const targetSec = document.getElementById(li.dataset.target);
      targetSec && targetSec.scrollIntoView({ behavior: "smooth" });
    }));
  };
})(window.App = window.App || {});
