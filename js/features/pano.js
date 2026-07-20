// 360°-viewer на WebGL (three.js подгружается лениво)
(function (App) {
  "use strict";

  App.initPanoDemo = function ({ reducedMotion }) {
    const panoWrap = document.getElementById("panoDemo");
    if (!panoWrap || !window.WebGLRenderingContext) return;

    const panoIO = new IntersectionObserver((entries) => {
      if (entries.some(e => e.isIntersecting)) {
        panoIO.disconnect();
        loadThree().then(initPano).catch(() => {
          const hint = document.getElementById("panoHint");
          if (hint) hint.textContent = "WebGL demo недоступно";
        });
      }
    }, { rootMargin: "300px" });
    panoIO.observe(panoWrap);

    function loadThree() {
      return new Promise((resolve, reject) => {
        if (window.THREE) return resolve();
        const s = document.createElement("script");
        s.src = "https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.min.js";
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
      });
    }

    // процедурная equirectangular-текстура: звёзды + неоновая сетка
    function makePanoTexture() {
      const c = document.createElement("canvas");
      c.width = 2048;
      c.height = 1024;
      const g = c.getContext("2d");
      const sky = g.createLinearGradient(0, 0, 0, c.height);
      sky.addColorStop(0, "#01020a");
      sky.addColorStop(0.55, "#041218");
      sky.addColorStop(0.63, "#0a3036");
      sky.addColorStop(0.67, "#041218");
      sky.addColorStop(1, "#010208");
      g.fillStyle = sky;
      g.fillRect(0, 0, c.width, c.height);
      for (let i = 0; i < 900; i++) {
        g.fillStyle = `rgba(255,255,255,${(Math.random() * 0.7 + 0.15).toFixed(2)})`;
        g.beginPath();
        g.arc(Math.random() * c.width, Math.random() * c.height * 0.6, Math.random() * 1.3 + 0.2, 0, Math.PI * 2);
        g.fill();
      }
      g.fillStyle = "rgba(0, 240, 239, 0.10)";
      g.fillRect(0, 640, c.width, 26);
      g.fillStyle = "rgba(0, 240, 239, 0.55)";
      g.fillRect(0, 652, c.width, 3);
      g.strokeStyle = "rgba(0, 240, 239, 0.22)";
      g.lineWidth = 1;
      for (let y = 660, step = 6; y < c.height; y += step, step *= 1.35) {
        g.beginPath(); g.moveTo(0, y); g.lineTo(c.width, y); g.stroke();
      }
      for (let x = 0; x <= c.width; x += 64) {
        g.beginPath(); g.moveTo(x, 656); g.lineTo(x, c.height); g.stroke();
      }
      return c;
    }

    function initPano() {
      const canvas = document.getElementById("panoCanvas");
      canvas.style.touchAction = "none";
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
      const geo = new THREE.SphereGeometry(50, 48, 32);
      geo.scale(-1, 1, 1); // смотрим изнутри сферы
      const tex = new THREE.CanvasTexture(makePanoTexture());
      if ("SRGBColorSpace" in THREE) tex.colorSpace = THREE.SRGBColorSpace;
      scene.add(new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: tex })));

      // кастомные yaw/pitch-контролы с ограничением наклона — как в рабочем 360-модуле
      const PITCH_MIN = -0.5, PITCH_MAX = 0.75;
      let yaw = 0, pitch = 0.05, targetYaw = 0, targetPitch = 0.05;
      let dragging = false, lastX = 0, lastY = 0;

      canvas.addEventListener("pointerdown", (e) => {
        canvas.setPointerCapture(e.pointerId);
        dragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
        panoWrap.classList.add("interacted");
      });
      canvas.addEventListener("pointermove", (e) => {
        if (!dragging) return;
        // тянем влево — камера поворачивает вправо (сцена уходит вправо)
        targetYaw += (e.clientX - lastX) * 0.005;
        // тянем вверх — камера смотрит вниз (инвертированная вертикаль)
        targetPitch += (e.clientY - lastY) * 0.005;
        targetPitch = Math.max(PITCH_MIN, Math.min(PITCH_MAX, targetPitch));
        lastX = e.clientX;
        lastY = e.clientY;
      });
      canvas.addEventListener("pointerup", () => { dragging = false; });
      canvas.addEventListener("pointercancel", () => { dragging = false; });

      function panoResize() {
        const w = panoWrap.clientWidth, h = panoWrap.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
      window.addEventListener("resize", panoResize);
      panoResize();

      let panoVisible = true;
      new IntersectionObserver((entries) => { panoVisible = entries[0].isIntersecting; }).observe(panoWrap);

      (function panoRender() {
        requestAnimationFrame(panoRender);
        if (!panoVisible) return;
        if (!dragging && !reducedMotion) targetYaw += 0.0006; // медленное авто-вращение
        yaw += (targetYaw - yaw) * 0.08; // демпфирование
        pitch += (targetPitch - pitch) * 0.08;
        camera.lookAt(
          Math.sin(yaw) * Math.cos(pitch),
          Math.sin(pitch),
          Math.cos(yaw) * Math.cos(pitch)
        );
        renderer.render(scene, camera);
      })();
    }
  };
})(window.App = window.App || {});
