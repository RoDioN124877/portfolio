// Бургер-меню (мобильная навигация)
(function (App) {
  "use strict";

  App.initMenu = function () {
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

    function closeIfOpen() {
      if (mobileMenu && mobileMenu.classList.contains("active")) toggleMenu();
    }

    burger && burger.addEventListener("click", toggleMenu);
    closeBtn && closeBtn.addEventListener("click", toggleMenu);
    menuLinks.forEach((link) => link.addEventListener("click", closeIfOpen));

    return { closeIfOpen };
  };
})(window.App = window.App || {});
