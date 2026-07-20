// Пасхалка: konami-код — боец вылезает снизу и разбивает экран (K.O.)
(function (App) {
  "use strict";

  App.initTekken = function ({ achievements }) {
    // сравниваем по e.code (физические клавиши) — работает в любой раскладке и регистре
    const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "KeyB", "KeyA"];
    let kIndex = 0;
    let active = false;

    document.addEventListener("keydown", (e) => {
      const t = e.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      const key = e.code;
      if (key === konami[kIndex]) {
        kIndex++;
        if (kIndex === konami.length) {
          kIndex = 0;
          smash();
        }
      } else {
        kIndex = key === konami[0] ? 1 : 0;
      }
    });

    console.log("%c↑ ↑ ↓ ↓ ← → ← → B A — round 1… FIGHT! 🥊", "color:#00f0ef;font-size:14px;font-weight:bold");

    // глухой «удар» через WebAudio (konami — это клавиатурный жест, звук разрешён)
    function punchSound() {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "square";
        o.frequency.setValueAtTime(130, ctx.currentTime);
        o.frequency.exponentialRampToValueAtTime(28, ctx.currentTime + 0.28);
        g.gain.setValueAtTime(0.35, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.32);
        o.connect(g).connect(ctx.destination);
        o.start();
        o.stop(ctx.currentTime + 0.35);
      } catch (e) { /* без звука тоже ок */ }
    }

    // трещины «разбитого стекла» от точки удара
    function drawCracks(overlay) {
      const cv = document.createElement("canvas");
      cv.className = "tekken-cracks";
      cv.width = window.innerWidth;
      cv.height = window.innerHeight;
      overlay.appendChild(cv);

      const ctx = cv.getContext("2d");
      const cx = cv.width / 2, cy = cv.height * 0.45;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
      ctx.shadowColor = "rgba(200, 245, 255, 0.7)";
      ctx.shadowBlur = 8;

      const rays = 16;
      for (let i = 0; i < rays; i++) {
        let a = (Math.PI * 2 * i) / rays + (Math.random() - 0.5) * 0.4;
        let x = cx, y = cy, len = 0;
        const maxLen = Math.max(cv.width, cv.height) * (0.3 + Math.random() * 0.55);
        ctx.lineWidth = 1.5 + Math.random() * 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        while (len < maxLen) {
          const seg = 25 + Math.random() * 45;
          a += (Math.random() - 0.5) * 0.55;
          x += Math.cos(a) * seg;
          y += Math.sin(a) * seg;
          len += seg;
          ctx.lineTo(x, y);
          // короткое ответвление трещины
          if (Math.random() < 0.35) {
            const ba = a + (Math.random() < 0.5 ? 1 : -1) * (0.7 + Math.random() * 0.6);
            ctx.lineTo(x + Math.cos(ba) * (14 + Math.random() * 22), y + Math.sin(ba) * (14 + Math.random() * 22));
            ctx.moveTo(x, y);
          }
        }
        ctx.stroke();
      }

      // «паутинка» вокруг точки удара
      for (let r = 18; r < 90; r += 22) {
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i <= rays; i++) {
          const a = (Math.PI * 2 * i) / rays;
          const rr = r + (Math.random() - 0.5) * 10;
          const px = cx + Math.cos(a) * rr, py = cy + Math.sin(a) * rr;
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
    }

    function smash() {
      if (active) return;
      active = true;
      achievements.unlock("tekken");

      // спрайт из картинки с фолбэком на эмодзи
      function makeSprite(cls, src, fallback) {
        const el = document.createElement("div");
        el.className = cls;
        const img = document.createElement("img");
        img.src = src;
        img.alt = "";
        img.onerror = () => { img.remove(); el.textContent = fallback; };
        el.appendChild(img);
        return el;
      }

      const ov = document.createElement("div");
      ov.className = "tekken-overlay";
      const fighter = makeSprite("tekken-fighter", "img/easter/fighter.png", "🥷");
      const fist = makeSprite("tekken-fist", "img/easter/fist.png", "👊");
      ov.appendChild(fighter);
      ov.appendChild(fist);
      document.body.appendChild(ov);

      // боец вылез — делает выпад, а в экран летит отдельный кулак
      setTimeout(() => {
        fighter.classList.add("punch");
        fist.classList.add("go");
        punchSound();

        // импакт: вспышка, тряска, трещины, K.O.
        setTimeout(() => {
          ov.classList.add("hit");
          drawCracks(ov);
          document.body.classList.add("screen-shake");
          setTimeout(() => document.body.classList.remove("screen-shake"), 550);

          const ko = document.createElement("div");
          ko.className = "tekken-ko";
          ko.textContent = "K.O.";
          ov.appendChild(ko);

          setTimeout(() => {
            ov.classList.add("fade");
            setTimeout(() => { ov.remove(); active = false; }, 700);
          }, 2300);
        }, 330);
      }, 800);
    }
  };
})(window.App = window.App || {});
