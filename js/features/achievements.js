// Достижения-пасхалки: хранятся в localStorage, при разблокировке — тост
(function (App) {
  "use strict";

  App.initAchievements = function () {
    const KEY = "achievements";
    const defs = [
      { id: "tekken", ru: "Пропустил удар (konami)", en: "Took a hit (konami)" },
      { id: "terminal", ru: "Нашёл терминал", en: "Found the terminal" },
      { id: "secrets", ru: "Заглянул в секреты", en: "Peeked into secrets" },
      { id: "sudo", ru: "Попробовал sudo", en: "Tried sudo" },
      { id: "snake", ru: "Сыграл в змейку", en: "Played snake" },
      { id: "matrix", ru: "Увидел Матрицу", en: "Saw the Matrix" },
    ];

    let unlocked;
    try { unlocked = new Set(JSON.parse(localStorage.getItem(KEY)) || []); }
    catch (e) { unlocked = new Set(); }

    const lang = () => (document.documentElement.lang === "en" ? "en" : "ru");
    const title = (def) => def[lang()];

    function unlock(id) {
      const def = defs.find(d => d.id === id);
      if (!def || unlocked.has(id)) return;
      unlocked.add(id);
      localStorage.setItem(KEY, JSON.stringify([...unlocked]));
      const label = lang() === "en" ? "Achievement" : "Достижение";
      App.toast(`🏆 ${label}: ${title(def)} (${unlocked.size}/${defs.length})`);
    }

    return {
      unlock,
      has: (id) => unlocked.has(id),
      count: () => unlocked.size,
      total: defs.length,
      // открытые — по имени, закрытые — «???», чтобы не спойлерить
      list: () => defs.map(d => ({ done: unlocked.has(d.id), title: unlocked.has(d.id) ? title(d) : "???" })),
    };
  };
})(window.App = window.App || {});
