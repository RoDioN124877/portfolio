// Canvas-частицы в hero с реакцией на курсор
(function (App) {
  "use strict";

  App.initHeroParticles = function ({ reducedMotion }) {
    const heroSection = document.getElementById("hero");
    const heroCanvas = document.getElementById("heroCanvas");
    if (!heroCanvas || !heroSection || reducedMotion) return;

    const pctx = heroCanvas.getContext("2d");
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const P = { w: 0, h: 0, dots: [], mx: -9999, my: -9999, visible: true, raf: null };

    function pResize() {
      P.w = heroSection.offsetWidth;
      P.h = heroSection.offsetHeight;
      heroCanvas.width = P.w * DPR;
      heroCanvas.height = P.h * DPR;
      pctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const count = Math.min(90, Math.floor(P.w / 14));
      P.dots = Array.from({ length: count }, () => ({
        x: Math.random() * P.w,
        y: Math.random() * P.h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
      }));
    }

    function pTick() {
      P.raf = requestAnimationFrame(pTick);
      if (!P.visible) return;
      pctx.clearRect(0, 0, P.w, P.h);
      for (const d of P.dots) {
        // лёгкое отталкивание от курсора
        const dx = d.x - P.mx, dy = d.y - P.my;
        const distSq = dx * dx + dy * dy;
        if (distSq < 14400) {
          const dist = Math.sqrt(distSq) || 1;
          d.vx += (dx / dist) * 0.06;
          d.vy += (dy / dist) * 0.06;
        }
        d.vx = Math.max(-0.6, Math.min(0.6, d.vx));
        d.vy = Math.max(-0.6, Math.min(0.6, d.vy));
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > P.w) d.vx *= -1;
        if (d.y < 0 || d.y > P.h) d.vy *= -1;
        pctx.fillStyle = "rgba(0, 240, 239, 0.55)";
        pctx.beginPath();
        pctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        pctx.fill();
      }
      // соединительные линии
      for (let i = 0; i < P.dots.length; i++) {
        for (let j = i + 1; j < P.dots.length; j++) {
          const a = P.dots[i], b = P.dots[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = dx * dx + dy * dy;
          if (dist < 12100) {
            pctx.strokeStyle = `rgba(0, 240, 239, ${(1 - dist / 12100) * 0.14})`;
            pctx.lineWidth = 1;
            pctx.beginPath();
            pctx.moveTo(a.x, a.y);
            pctx.lineTo(b.x, b.y);
            pctx.stroke();
          }
        }
      }
    }

    heroSection.addEventListener("mousemove", (e) => {
      const rect = heroSection.getBoundingClientRect();
      P.mx = e.clientX - rect.left;
      P.my = e.clientY - rect.top;
    });
    heroSection.addEventListener("mouseleave", () => { P.mx = -9999; P.my = -9999; });
    new IntersectionObserver((entries) => { P.visible = entries[0].isIntersecting; }).observe(heroSection);
    window.addEventListener("resize", pResize);
    pResize();
    pTick();
  };
})(window.App = window.App || {});
