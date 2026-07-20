// Параллакс hero-блока при скролле
(function (App) {
  "use strict";

  App.initHeroParallax = function ({ reducedMotion }) {
    const heroSection = document.getElementById("hero");
    const heroLeft = document.querySelector(".hero-left");
    const heroRight = document.querySelector(".hero-right");
    if (reducedMotion || !heroSection) return;

    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      if (y > heroSection.offsetHeight + 150) return;
      if (heroRight) heroRight.style.transform = `translateY(${y * 0.12}px)`;
      if (heroLeft) heroLeft.style.transform = `translateY(${y * 0.05}px)`;
    }, { passive: true });
  };
})(window.App = window.App || {});
