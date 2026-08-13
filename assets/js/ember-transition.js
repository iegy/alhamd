/* ==========================================================================
   Ember Transition — تأثير شرر/رماد متطاير عند الانتقال إلى صفحة المعرض
   يعمل على أي رابط عليه data-ember-link
   ========================================================================== */
(function () {
  function init() {
    var links = document.querySelectorAll("[data-ember-link]");
    if (!links.length) return;

    var overlay = document.createElement("div");
    overlay.className = "ember-transition";
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML = '<canvas class="ember-transition__canvas"></canvas>';
    document.body.appendChild(overlay);

    var canvas = overlay.querySelector("canvas");
    var ctx = canvas.getContext("2d");
    var particles = [];
    var dpr = window.devicePixelRatio || 1;

    function resize() {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    function spawn(x, y, count) {
      for (var i = 0; i < count; i++) {
        particles.push({
          x: x + (Math.random() - 0.5) * 70,
          y: y + (Math.random() - 0.5) * 30,
          vx: (Math.random() - 0.5) * 1.6,
          vy: -1.2 - Math.random() * 2.6,
          r: 1.5 + Math.random() * 3,
          life: 0,
          maxLife: 55 + Math.random() * 55,
          gold: Math.random() > 0.4
        });
      }
    }

    function loop() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (var i = particles.length - 1; i >= 0; i--) {
        var p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.006;
        p.vx += (Math.random() - 0.5) * 0.06;

        var t = p.life / p.maxLife;
        if (t >= 1) {
          particles.splice(i, 1);
          continue;
        }
        var alpha = t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85;
        var color = p.gold ? "220,185,74" : "235,82,14";

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (1 - t * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + color + "," + Math.max(alpha, 0) + ")";
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(" + color + ",0.85)";
        ctx.fill();
      }
      requestAnimationFrame(loop);
    }
    loop();

    links.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var href = link.getAttribute("href");
        var rect = link.getBoundingClientRect();
        var ox = rect.left + rect.width / 2;
        var oy = rect.top + rect.height / 2;

        overlay.classList.add("is-active");

        var bursts = 0;
        var iv = setInterval(function () {
          spawn(ox, oy, 16);
          bursts++;
          if (bursts > 9) clearInterval(iv);
        }, 55);

        setTimeout(function () {
          window.location.href = href;
        }, 780);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
