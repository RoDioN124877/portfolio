// Скрытие/показ шапки при скролле
(function (App) {
  "use strict";

  App.initHeaderScroll = function () {
    const header = document.getElementById('siteHeader');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const current = window.pageYOffset;
      if (current <= 0) { header && header.classList.remove('hide'); lastScroll = 0; return; }
      if (current > lastScroll && header && !header.classList.contains('hide')) {
        header.classList.add('hide');
      } else if (current < lastScroll && header && header.classList.contains('hide')) {
        header.classList.remove('hide');
      }
      lastScroll = current;
    });
  };
})(window.App = window.App || {});
