// Всплывающие уведомления (тосты)
(function (App) {
  "use strict";

  App.toast = function (text) {
    const old = document.querySelector(".toast");
    if (old) old.remove();

    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = text;
    document.body.appendChild(el);

    requestAnimationFrame(() => el.classList.add("show"));
    setTimeout(() => {
      el.classList.remove("show");
      setTimeout(() => el.remove(), 350);
    }, 2600);
  };
})(window.App = window.App || {});
