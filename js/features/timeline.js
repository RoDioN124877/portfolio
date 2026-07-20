// Scroll-driven таймлайн в секции опыта
(function (App) {
  "use strict";

  App.initTimeline = function ({ reducedMotion }) {
    const timeline = document.querySelector(".timeline");
    if (!timeline) return;

    const tlItems = timeline.querySelectorAll(".timeline-item");
    if (reducedMotion) {
      tlItems.forEach(item => item.classList.add("in-view"));
      timeline.style.setProperty("--tl-progress", "100%");
      return;
    }

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
  };
})(window.App = window.App || {});
