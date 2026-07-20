// Кнопка «скопировать email» с тостом
(function (App) {
  "use strict";

  App.initCopyEmail = function () {
    const btn = document.getElementById("copyEmailBtn");
    if (!btn) return;

    const value = btn.dataset.copy;

    function fallbackCopy() {
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }

    btn.addEventListener("click", () => {
      const done = () => App.toast(document.documentElement.lang === "en" ? "Email copied 📋" : "Email скопирован 📋");
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(done).catch(() => { fallbackCopy(); done(); });
      } else {
        fallbackCopy();
        done();
      }
    });
  };
})(window.App = window.App || {});
