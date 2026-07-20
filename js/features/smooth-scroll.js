// Плавный инерционный скролл колесом (desktop)
(function (App) {
  "use strict";

  App.initSmoothScroll = function ({ reducedMotion, isTouch }) {
    if (reducedMotion || isTouch) return;

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
  };
})(window.App = window.App || {});
