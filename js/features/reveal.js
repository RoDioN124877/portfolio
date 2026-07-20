// Появление секций при скролле
(function (App) {
  "use strict";

  App.initReveal = function () {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => e.isIntersecting && e.target.classList.add("active"));
    }, { threshold: 0.15 });
    document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
  };
})(window.App = window.App || {});
