// Composition root: собирает фичи и передаёт зависимости явно
(function (App) {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const env = {
      reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      isTouch: window.matchMedia("(pointer: coarse)").matches,
    };

    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const menu = App.initMenu();
    const typed = App.initTyping();
    App.initI18n({ menu, typed });

    App.initReveal();
    App.initLadder();
    App.initSpotlight();
    App.initHeaderScroll();

    App.initSmoothScroll(env);
    App.initHeroParallax(env);
    App.initHeroParticles(env);
    App.initTimeline(env);
    App.initPanoDemo(env);

    const achievements = App.initAchievements();
    App.initCopyEmail();
    App.initTekken({ achievements });
    App.initTerminal({ achievements });
  });
})(window.App = window.App || {});
