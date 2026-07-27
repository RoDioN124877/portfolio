// Пасхалка: мини-терминал (konami-код или кнопка). RU/EN, автодополнение, история,
// neofetch, змейка, «матрица», достижения.
(function (App) {
  "use strict";

  App.initTerminal = function ({ achievements }) {
    const term = document.getElementById("terminal");
    const termBody = document.getElementById("termBody");
    const termInput = document.getElementById("termInput");
    const termForm = document.getElementById("termForm");
    const termClose = document.getElementById("termClose");
    if (!term || !termBody || !termInput || !termForm || !termClose) return;

    const termFab = document.getElementById("termFab");

    // ---------- локализация ----------
    const lang = () => (document.documentElement.lang === "en" ? "en" : "ru");
    const STR = {
      ru: {
        greet1: "Привет! Я мини-терминал этого портфолио.",
        greet2: "Введите 'help' — покажу, что умею.",
        help: "Команды: whoami, about, stack, cases, ls, contacts, cv, history, neofetch, achievements, sudo, clear, exit",
        about: "Fullstack-разработчик: React / TypeScript / Node.js / NestJS.\nВеду фичи от архитектуры до production.",
        stack: "Frontend: React, Next.js, Zustand, Vue 3, WebGL / three.js\nBackend:  Node.js, NestJS, REST API, TypeORM, JWT, SQL / PostgreSQL, Redis, BullMQ, WebSocket\nПрочее:   Git, Docker, Vite / Webpack, Figma",
        casesEmpty: "кейсы не найдены",
        folders: [["о-себе/", "about"], ["опыт/", "experience"], ["кейсы/", "works"], ["навыки/", "skills"], ["контакты/", "contacts"]],
        secretFolder: "секреты/",
        lsHint: "(клик по папке — перейти к разделу)",
        denied: "permission denied 🔒 (а ↑↑↓↓←→←→BA уже пробовали? 👊)",
        deniedHint: "…но из-за двери что-то шуршит. Попробуйте: 'snake', 'matrix', 'neofetch'",
        cvOpen: "Открываю резюме…",
        notFound: (c) => `команда не найдена: ${c} — попробуйте 'help'`,
        historyEmpty: "история пуста",
        achTitle: (n, t) => `🏆 Достижения: ${n}/${t}`,
        snakeHelp: "управление: стрелки / WASD · выход: Q",
        snakeOver: (s) => `game over — счёт: ${s} 🐍`,
        snakeBusy: "змейка уже запущена",
        matrixGo: "Следуй за белым кроликом… 🐇",
        expLabel: "Опыт",
        uptimeLabel: "Аптайм",
        langLabel: "Язык",
        achLabel: "Пасхалки",
        yearsShort: "г.",
        monthsShort: "мес.",
      },
      en: {
        greet1: "Hi! I'm this portfolio's mini terminal.",
        greet2: "Type 'help' to see what I can do.",
        help: "Commands: whoami, about, stack, cases, ls, contacts, cv, history, neofetch, achievements, sudo, clear, exit",
        about: "Fullstack developer: React / TypeScript / Node.js / NestJS.\nI take features from architecture to production.",
        stack: "Frontend: React, Next.js, Zustand, Vue 3, WebGL / three.js\nBackend:  Node.js, NestJS, REST API, TypeORM, JWT, SQL / PostgreSQL, Redis, BullMQ, WebSocket\nOther:    Git, Docker, Vite / Webpack, Figma",
        casesEmpty: "no cases found",
        folders: [["about/", "about"], ["experience/", "experience"], ["works/", "works"], ["skills/", "skills"], ["contacts/", "contacts"]],
        secretFolder: "secrets/",
        lsHint: "(click a folder to jump to a section)",
        denied: "permission denied 🔒 (tried ↑↑↓↓←→←→BA yet? 👊)",
        deniedHint: "…but something is rustling behind the door. Try: 'snake', 'matrix', 'neofetch'",
        cvOpen: "Opening CV…",
        notFound: (c) => `command not found: ${c} — try 'help'`,
        historyEmpty: "history is empty",
        achTitle: (n, t) => `🏆 Achievements: ${n}/${t}`,
        snakeHelp: "controls: arrows / WASD · quit: Q",
        snakeOver: (s) => `game over — score: ${s} 🐍`,
        snakeBusy: "snake is already running",
        matrixGo: "Follow the white rabbit… 🐇",
        expLabel: "Experience",
        uptimeLabel: "Uptime",
        langLabel: "Lang",
        achLabel: "Easter eggs",
        yearsShort: "y",
        monthsShort: "mo",
      },
    };
    const S = (key, ...args) => {
      const v = STR[lang()][key];
      return typeof v === "function" ? v(...args) : v;
    };

    // ---------- вывод ----------
    function termPrint(text, cls) {
      const div = document.createElement("div");
      if (cls) div.className = cls;
      div.textContent = text;
      termBody.appendChild(div);
      termBody.scrollTop = termBody.scrollHeight;
    }

    // печатающийся вывод, строки — последовательно
    let typeChain = Promise.resolve();
    function termType(text, cls) {
      typeChain = typeChain.then(() => new Promise((done) => {
        const div = document.createElement("div");
        if (cls) div.className = cls;
        termBody.appendChild(div);
        let i = 0;
        const timer = setInterval(() => {
          div.textContent = text.slice(0, ++i);
          termBody.scrollTop = termBody.scrollHeight;
          if (i >= text.length) {
            clearInterval(timer);
            done();
          }
        }, 14);
      }));
      return typeChain;
    }

    function openTerminal() {
      if (!term.hidden) return;
      term.hidden = false;
      termFab && termFab.classList.add("hidden-by-term");
      termBody.innerHTML = "";
      typeChain = Promise.resolve();
      termPrint("rodion@portfolio — v1.0", "t-accent");
      termType(S("greet1"));
      termType(S("greet2"), "t-muted");
      termInput.focus();
      achievements.unlock("terminal");
    }
    function closeTerminal() {
      term.hidden = true;
      term.classList.remove("minimized", "maximized");
      termFab && termFab.classList.remove("hidden-by-term");
    }

    // строка с готовыми DOM-узлами (для ссылок)
    function termPrintNodes(nodes) {
      const div = document.createElement("div");
      nodes.forEach(n => div.appendChild(n));
      termBody.appendChild(div);
      termBody.scrollTop = termBody.scrollHeight;
    }
    function makeLink(text, href) {
      const a = document.createElement("a");
      a.textContent = text;
      a.href = href;
      if (href.startsWith("http")) a.target = "_blank";
      return a;
    }
    function makeSectionLink(label, sectionId) {
      const s = document.createElement("span");
      s.className = "term-link";
      s.textContent = label;
      s.addEventListener("click", () => {
        const sec = document.getElementById(sectionId);
        if (sec) sec.scrollIntoView({ behavior: "smooth" });
      });
      return s;
    }
    const txt = (t) => document.createTextNode(t);

    // ---------- история команд ----------
    const history = [];
    let histPos = 0;   // histPos === history.length — «новая строка»
    let draft = "";    // недописанный ввод, к которому возвращаемся по ↓

    // ---------- neofetch ----------
    const CAREER_START = new Date(2023, 10, 1); // Ноя 2023 — первый коммерческий проект
    function expString() {
      const now = new Date();
      let months = (now.getFullYear() - CAREER_START.getFullYear()) * 12 + (now.getMonth() - CAREER_START.getMonth());
      const years = Math.floor(months / 12);
      months %= 12;
      return `${years} ${S("yearsShort")} ${months} ${S("monthsShort")}`;
    }
    function uptimeString() {
      const sec = Math.floor(performance.now() / 1000);
      return `${Math.floor(sec / 60)}m ${sec % 60}s`;
    }
    function neofetch() {
      const art = [
        "  ▄▄▄▄▄▄▄▄▄  ",
        " █ ╔═════╗ █ ",
        " █ ║ ◉ ◉ ║ █ ",
        " █ ║  ▂  ║ █ ",
        " █ ╚═════╝ █ ",
        "  ▀▀█▀▀▀█▀▀  ",
        "    ▀   ▀    ",
      ];
      const info = [
        "rodion@portfolio",
        "────────────────",
        "OS:       portfolio v1.0",
        "Shell:    konami-sh",
        "Stack:    React / TS / NestJS",
        "DB/Queue: SQL / Redis / BullMQ",
        `${S("expLabel")}:     ${expString()}`,
        `${S("uptimeLabel")}:   ${uptimeString()}`,
        `${S("langLabel")}:     ${lang()}`,
        `${S("achLabel")}: ${achievements.count()}/${achievements.total}`,
      ];
      const rows = Math.max(art.length, info.length);
      const lines = [];
      for (let i = 0; i < rows; i++) {
        lines.push((art[i] || " ".repeat(13)) + "  " + (info[i] || ""));
      }
      termPrint(lines.join("\n"), "t-accent");
    }

    // ---------- змейка ----------
    let snakeActive = false;
    function startSnake() {
      if (snakeActive) { termPrint(S("snakeBusy"), "t-muted"); return; }
      snakeActive = true;
      achievements.unlock("snake");
      term.classList.add("maximized");
      term.classList.remove("minimized");

      const W = 24, H = 11;
      let snake = [{ x: 6, y: 5 }, { x: 5, y: 5 }, { x: 4, y: 5 }];
      let dir = { x: 1, y: 0 }, nextDir = dir, food = null, score = 0, timer = null;

      const pre = document.createElement("pre");
      pre.className = "t-snake";
      termBody.appendChild(pre);
      termPrint(S("snakeHelp"), "t-muted");

      function placeFood() {
        do {
          food = { x: Math.floor(Math.random() * W), y: Math.floor(Math.random() * H) };
        } while (snake.some(s => s.x === food.x && s.y === food.y));
      }

      function draw() {
        const rows = ["┌" + "─".repeat(W) + "┐"];
        for (let y = 0; y < H; y++) {
          let row = "│";
          for (let x = 0; x < W; x++) {
            if (snake[0].x === x && snake[0].y === y) row += "@";
            else if (snake.some(s => s.x === x && s.y === y)) row += "o";
            else if (food && food.x === x && food.y === y) row += "✦";
            else row += " ";
          }
          rows.push(row + "│");
        }
        rows.push("└" + "─".repeat(W) + "┘  score: " + score);
        pre.textContent = rows.join("\n");
        termBody.scrollTop = termBody.scrollHeight;
      }

      function step() {
        dir = nextDir;
        const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
        if (head.x < 0 || head.x >= W || head.y < 0 || head.y >= H || snake.some(s => s.x === head.x && s.y === head.y)) return end();
        snake.unshift(head);
        if (food && head.x === food.x && head.y === food.y) {
          score++;
          placeFood();
        } else {
          snake.pop();
        }
        draw();
      }

      function onKey(e) {
        const k = e.key.toLowerCase();
        const map = { arrowup: [0, -1], w: [0, -1], arrowdown: [0, 1], s: [0, 1], arrowleft: [-1, 0], a: [-1, 0], arrowright: [1, 0], d: [1, 0] };
        if (map[k]) {
          e.preventDefault();
          e.stopImmediatePropagation();
          const [x, y] = map[k];
          if (x !== -dir.x || y !== -dir.y) nextDir = { x, y };
        } else if (k === "q" || k === "escape") {
          e.preventDefault();
          e.stopImmediatePropagation();
          end();
        }
      }

      function end() {
        clearInterval(timer);
        document.removeEventListener("keydown", onKey, true);
        snakeActive = false;
        termPrint(S("snakeOver", score), "t-accent");
        termInput.focus();
      }

      document.addEventListener("keydown", onKey, true);
      placeFood();
      draw();
      timer = setInterval(step, 140);
    }

    // ---------- «матрица» ----------
    function startMatrix() {
      achievements.unlock("matrix");
      termPrint(S("matrixGo"), "t-accent");
      if (document.getElementById("matrixCanvas")) return;

      const cv = document.createElement("canvas");
      cv.id = "matrixCanvas";
      Object.assign(cv.style, {
        position: "fixed", inset: "0", zIndex: "5000",
        pointerEvents: "none", opacity: "1", transition: "opacity 1s ease",
      });
      cv.width = window.innerWidth;
      cv.height = window.innerHeight;
      document.body.appendChild(cv);

      const ctx = cv.getContext("2d");
      const fs = 16;
      const cols = Math.floor(cv.width / fs);
      const drops = Array.from({ length: cols }, () => Math.floor(Math.random() * -30));
      const glyphs = "アイウエオカキクケコサシスセソタチツテト01</>{}=+*#$";

      const timer = setInterval(() => {
        ctx.fillStyle = "rgba(4, 5, 7, 0.2)";
        ctx.fillRect(0, 0, cv.width, cv.height);
        ctx.font = fs + "px monospace";
        for (let i = 0; i < cols; i++) {
          const ch = glyphs[Math.floor(Math.random() * glyphs.length)];
          ctx.fillStyle = Math.random() > 0.975 ? "#d6fffe" : "#00f0ef";
          ctx.fillText(ch, i * fs, drops[i] * fs);
          if (drops[i] * fs > cv.height && Math.random() > 0.975) drops[i] = 0;
          drops[i]++;
        }
      }, 50);

      setTimeout(() => {
        cv.style.opacity = "0";
        setTimeout(() => { clearInterval(timer); cv.remove(); }, 1000);
      }, 6000);
    }

    // ---------- команды ----------
    function secretsCmd() {
      achievements.unlock("secrets");
      termPrint(S("denied"), "t-muted");
      termType(S("deniedHint"), "t-accent");
    }

    const termCommands = {
      help: () => termPrint(S("help")),
      whoami: () => termPrint("rodion — fullstack developer (React / TypeScript / Node.js)"),
      about: () => termPrint(S("about")),
      stack: () => termPrint(S("stack")),
      cases: () => termPrint([...document.querySelectorAll(".case-card h4")].map(h => "• " + h.textContent.trim()).join("\n") || S("casesEmpty")),
      ls: () => {
        const nodes = [];
        S("folders").forEach(([label, id]) => {
          nodes.push(makeSectionLink(label, id), txt("  "));
        });
        nodes.push(txt(S("secretFolder")));
        termPrintNodes(nodes);
        termPrint(S("lsHint"), "t-muted");
      },
      contacts: () => {
        termPrintNodes([txt("email:  "), makeLink("rodion.chubarov@gmail.com", "mailto:rodion.chubarov@gmail.com")]);
        termPrintNodes([txt("tg:     "), makeLink("@rodion_dev", "https://t.me/rodion_dev")]);
        termPrintNodes([txt("github: "), makeLink("github.com/RoDioN124877", "https://github.com/RoDioN124877")]);
      },
      cv: () => {
        window.open("resume.html", "_blank");
        termPrint(S("cvOpen"));
      },
      history: () => {
        if (!history.length) return termPrint(S("historyEmpty"), "t-muted");
        termPrint(history.map((c, i) => String(i + 1).padStart(3, " ") + "  " + c).join("\n"));
      },
      neofetch: neofetch,
      achievements: () => {
        termPrint(S("achTitle", achievements.count(), achievements.total), "t-accent");
        achievements.list().forEach(a => termPrint((a.done ? " ✔ " : " ✖ ") + a.title, a.done ? "" : "t-muted"));
      },
      snake: startSnake,
      matrix: startMatrix,
      sudo: () => {
        achievements.unlock("sudo");
        termPrint("nice try 😏", "t-accent");
      },
      clear: () => { termBody.innerHTML = ""; },
      exit: () => closeTerminal(),
    };
    ["cd секреты", "cd секреты/", "cd secrets", "cd secrets/"].forEach(alias => { termCommands[alias] = secretsCmd; });

    // ---------- автодополнение ----------
    function completableCommands() {
      const base = ["help", "whoami", "about", "stack", "cases", "ls", "contacts", "cv", "history", "neofetch", "achievements", "sudo", "clear", "exit"];
      // скрытые команды не подсказываем, пока пользователь не нашёл секреты
      if (achievements.has("secrets")) base.push("snake", "matrix");
      return base.sort();
    }

    function completeInput() {
      const val = termInput.value.trimStart().toLowerCase();
      if (!val) return;
      const matches = completableCommands().filter(c => c.startsWith(val));
      if (!matches.length) return;
      if (matches.length === 1) {
        termInput.value = matches[0];
        return;
      }
      // общий префикс + список вариантов, как в bash
      let prefix = matches[0];
      for (const m of matches) {
        while (!m.startsWith(prefix)) prefix = prefix.slice(0, -1);
      }
      termInput.value = prefix;
      termPrint(matches.join("  "), "t-muted");
    }

    // ---------- ввод: Tab и стрелки ----------
    termInput.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        completeInput();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (!history.length || histPos === 0) return;
        if (histPos === history.length) draft = termInput.value;
        histPos--;
        termInput.value = history[histPos];
        termInput.setSelectionRange(termInput.value.length, termInput.value.length);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (histPos >= history.length) return;
        histPos++;
        termInput.value = histPos === history.length ? draft : history[histPos];
        termInput.setSelectionRange(termInput.value.length, termInput.value.length);
      }
    });

    termForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const cmd = termInput.value.trim().toLowerCase();
      termInput.value = "";
      if (!cmd) return;
      if (history[history.length - 1] !== cmd) history.push(cmd); // без подряд идущих дублей
      histPos = history.length;
      draft = "";
      termPrint("$ " + cmd, "t-muted");
      (termCommands[cmd] || (() => termPrint(S("notFound", cmd))))();
    });
    termClose.addEventListener("click", closeTerminal);

    termFab && termFab.addEventListener("click", openTerminal);

    // «светофор»: красная — закрыть, жёлтая — свернуть, зелёная — развернуть
    const dotClose = document.getElementById("termDotClose");
    const dotMin = document.getElementById("termDotMin");
    const dotMax = document.getElementById("termDotMax");
    dotClose && dotClose.addEventListener("click", closeTerminal);
    dotMin && dotMin.addEventListener("click", () => {
      term.classList.toggle("minimized");
      term.classList.remove("maximized");
    });
    dotMax && dotMax.addEventListener("click", () => {
      term.classList.toggle("maximized");
      term.classList.remove("minimized");
      termInput.focus();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !term.hidden) closeTerminal();
    });
  };
})(window.App = window.App || {});
