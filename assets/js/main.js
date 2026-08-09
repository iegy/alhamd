/* ==========================================================================
   AL-HAMD CHARCOAL — shared front-end logic (no build step, vanilla JS)
   ========================================================================== */
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "201010442817"; // no leading + or 00

  /* ---------------- THEME (dark / light) ---------------- */
  function initTheme() {
    var stored = localStorage.getItem("alhamd-theme");
    var theme = stored || "dark";
    document.documentElement.setAttribute("data-theme", theme);
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", theme === "light");
      btn.addEventListener("click", function () {
        var current = document.documentElement.getAttribute("data-theme");
        var next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("alhamd-theme", next);
        document.querySelectorAll("[data-theme-toggle]").forEach(function (b) {
          b.setAttribute("aria-pressed", next === "light");
        });
      });
    });
  }

  /* ---------------- MOBILE NAV ---------------- */
  function initMobileNav() {
    var toggle = document.querySelector("[data-menu-toggle]");
    var nav = document.querySelector("[data-mobile-nav]");
    var closeBtn = document.querySelector("[data-menu-close]");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      nav.classList.add("open");
      document.body.style.overflow = "hidden";
    });
    function closeNav() {
      nav.classList.remove("open");
      document.body.style.overflow = "";
    }
    if (closeBtn) closeBtn.addEventListener("click", closeNav);
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
  }

  /* ---------------- LANGUAGE SWITCH LINK ---------------- */
  function initLangSwitch() {
    var link = document.querySelector("[data-lang-switch]");
    if (!link) return;
    var lang = document.documentElement.getAttribute("lang") === "ar" ? "ar" : "en";
    var target = lang === "ar" ? "en" : "ar";
    var file = location.pathname.split("/").pop() || "index.html";
    link.setAttribute("href", "../" + target + "/" + file);
    link.textContent === "" && null; // no-op guard
  }

  /* ---------------- FOOTER YEAR ---------------- */
  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------------- ACTIVE NAV LINK ---------------- */
  function markActiveNav() {
    var path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("[data-nav-link]").forEach(function (a) {
      var href = a.getAttribute("href");
      if (href && href.indexOf(path) !== -1) {
        a.setAttribute("aria-current", "page");
      }
    });
  }

  /* ---------------- REVEAL ON SCROLL ---------------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !items.length) {
      items.forEach(function (i) { i.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach(function (i) { io.observe(i); });
  }

  /* ---------------- COUNT-UP STATS ---------------- */
  function initCounters() {
    var counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;
    var run = function (el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var suffix = el.getAttribute("data-suffix") || "";
      var dur = 1400;
      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };
    if (!("IntersectionObserver" in window)) {
      counters.forEach(run);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { run(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { io.observe(c); });
  }

  /* ---------------- PRODUCT ACCORDION ---------------- */
  function initAccordion() {
    document.querySelectorAll("[data-accordion-head]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.closest(".product-item");
        var wasOpen = item.getAttribute("data-open") === "true";
        // close siblings for a tidy single-open accordion
        item.parentElement.querySelectorAll(".product-item").forEach(function (i) {
          i.setAttribute("data-open", "false");
        });
        item.setAttribute("data-open", wasOpen ? "false" : "true");
      });
    });
    // open the first item by default on product pages
    var first = document.querySelector(".product-list .product-item");
    if (first) first.setAttribute("data-open", "true");
  }

  /* ---------------- REGION / GALLERY FILTERS ---------------- */
  function initFilters(filterSelector, itemSelector, attr) {
    var filters = document.querySelectorAll(filterSelector);
    var items = document.querySelectorAll(itemSelector);
    if (!filters.length) return;
    filters.forEach(function (f) {
      f.addEventListener("click", function () {
        filters.forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        f.setAttribute("aria-pressed", "true");
        var val = f.getAttribute("data-filter");
        items.forEach(function (it) {
          var cats = (it.getAttribute(attr) || "").split(",");
          it.style.display = (val === "all" || cats.indexOf(val) !== -1) ? "" : "none";
        });
      });
    });
  }

  /* ---------------- INTERACTIVE EXPORT ROUTE-MAP + COUNTRY CARDS ---------------- */
  function buildExportCountryCard(country, lang, waBase) {
    var name = lang === "ar" ? country.name_ar : country.name_en;
    var msg =
      lang === "ar"
        ? "السلام عليكم، أرغب في عرض سعر للتصدير إلى " + name + "."
        : "Hello, I'd like a quote for export to " + name + ".";
    var a = document.createElement("a");
    a.className = "country-tag";
    a.href = waBase + encodeURIComponent(msg);
    a.target = "_blank";
    a.rel = "noopener";
    a.setAttribute("data-region", country.region);
    a.setAttribute("data-code", country.code);
    a.innerHTML =
      '<span class="country-tag__flag"><span class="fi fi-' + country.code + '"></span></span>' +
      '<span class="country-tag__name">' + name + "</span>" +
      '<span class="country-tag__code">' + country.code.toUpperCase() + "</span>";
    return a;
  }

  function buildExportSVG(container, lang, waBase) {
    var W = 1000, H = 500;
    var svgNS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.setAttribute("class", "export-map-svg");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", lang === "ar" ? "خريطة أسواق التصدير" : "Export markets map");

    // graticule (grid) for a map-like feel
    var grid = document.createElementNS(svgNS, "g");
    grid.setAttribute("class", "export-map-grid");
    for (var gx = 0; gx <= W; gx += 50) {
      var vl = document.createElementNS(svgNS, "line");
      vl.setAttribute("x1", gx); vl.setAttribute("y1", 0); vl.setAttribute("x2", gx); vl.setAttribute("y2", H);
      grid.appendChild(vl);
    }
    for (var gy = 0; gy <= H; gy += 50) {
      var hl = document.createElementNS(svgNS, "line");
      hl.setAttribute("x1", 0); hl.setAttribute("y1", gy); hl.setAttribute("x2", W); hl.setAttribute("y2", gy);
      grid.appendChild(hl);
    }
    svg.appendChild(grid);

    var hubX = (EXPORT_HUB.x / 100) * W;
    var hubY = (EXPORT_HUB.y / 100) * H;

    var routesGroup = document.createElementNS(svgNS, "g");
    routesGroup.setAttribute("class", "export-map-routes");
    var pinsGroup = document.createElementNS(svgNS, "g");
    pinsGroup.setAttribute("class", "export-map-pins");

    EXPORT_COUNTRIES.forEach(function (country) {
      var dx = (country.x / 100) * W;
      var dy = (country.y / 100) * H;
      var mx = (hubX + dx) / 2;
      var my = (hubY + dy) / 2 - Math.abs(dx - hubX) * 0.18 - 22;

      var path = document.createElementNS(svgNS, "path");
      path.setAttribute("d", "M" + hubX + "," + hubY + " Q " + mx + "," + my + " " + dx + "," + dy);
      path.setAttribute("class", "export-route");
      path.setAttribute("data-region", country.region);
      routesGroup.appendChild(path);

      var pin = document.createElementNS(svgNS, "g");
      pin.setAttribute("class", "export-pin");
      pin.setAttribute("data-region", country.region);
      pin.setAttribute("data-code", country.code);
      pin.setAttribute("tabindex", "0");
      pin.setAttribute("role", "button");
      var label = lang === "ar" ? country.name_ar : country.name_en;
      pin.setAttribute("aria-label", label);

      var halo = document.createElementNS(svgNS, "circle");
      halo.setAttribute("cx", dx); halo.setAttribute("cy", dy); halo.setAttribute("r", 10);
      halo.setAttribute("class", "export-pin__halo");
      var dot = document.createElementNS(svgNS, "circle");
      dot.setAttribute("cx", dx); dot.setAttribute("cy", dy); dot.setAttribute("r", 4.5);
      dot.setAttribute("class", "export-pin__dot");
      pin.appendChild(halo);
      pin.appendChild(dot);

      var msg =
        lang === "ar"
          ? "السلام عليكم، أرغب في عرض سعر للتصدير إلى " + label + "."
          : "Hello, I'd like a quote for export to " + label + ".";
      var waUrl = waBase + encodeURIComponent(msg);

      function showTip(clientX, clientY) {
        var tip = container.querySelector("[data-export-tooltip]");
        if (!tip) return;
        tip.innerHTML = '<span class="fi fi-' + country.code + '"></span> ' + label;
        tip.classList.add("show");
        var rect = container.getBoundingClientRect();
        tip.style.left = (clientX - rect.left) + "px";
        tip.style.top = (clientY - rect.top) + "px";
      }
      function hideTip() {
        var tip = container.querySelector("[data-export-tooltip]");
        if (tip) tip.classList.remove("show");
      }

      pin.addEventListener("mouseenter", function (e) { showTip(e.clientX, e.clientY); });
      pin.addEventListener("mousemove", function (e) { showTip(e.clientX, e.clientY); });
      pin.addEventListener("mouseleave", hideTip);
      pin.addEventListener("focus", function () {
        var rect = pin.getBoundingClientRect();
        showTip(rect.left, rect.top);
      });
      pin.addEventListener("blur", hideTip);
      pin.addEventListener("click", function () { window.open(waUrl, "_blank"); });
      pin.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); window.open(waUrl, "_blank"); }
      });

      pinsGroup.appendChild(pin);
    });

    svg.appendChild(routesGroup);

    // hub marker (Rashid, Egypt)
    var hubGroup = document.createElementNS(svgNS, "g");
    hubGroup.setAttribute("class", "export-hub");
    var hubHalo = document.createElementNS(svgNS, "circle");
    hubHalo.setAttribute("cx", hubX); hubHalo.setAttribute("cy", hubY); hubHalo.setAttribute("r", 16);
    hubHalo.setAttribute("class", "export-hub__pulse");
    var hubDot = document.createElementNS(svgNS, "circle");
    hubDot.setAttribute("cx", hubX); hubDot.setAttribute("cy", hubY); hubDot.setAttribute("r", 7);
    hubDot.setAttribute("class", "export-hub__dot");
    hubGroup.appendChild(hubHalo);
    hubGroup.appendChild(hubDot);
    svg.appendChild(hubGroup);
    svg.appendChild(pinsGroup);

    container.appendChild(svg);

    var tooltip = document.createElement("div");
    tooltip.setAttribute("data-export-tooltip", "");
    tooltip.className = "export-map-tooltip";
    container.appendChild(tooltip);

    var hubLabel = document.createElement("div");
    hubLabel.className = "export-hub-label";
    hubLabel.style.left = EXPORT_HUB.x + "%";
    hubLabel.style.top = EXPORT_HUB.y + "%";
    hubLabel.textContent = lang === "ar" ? "الحمد · رشيد" : "Al-Hamd · Rashid";
    container.appendChild(hubLabel);
  }

  function initExportMap() {
    var mapContainer = document.querySelector("[data-export-map]");
    var gridContainer = document.querySelector("[data-country-grid]");
    if (!mapContainer && !gridContainer) return;
    if (typeof EXPORT_COUNTRIES === "undefined") return;

    var lang = document.documentElement.getAttribute("lang") === "ar" ? "ar" : "en";
    var waBase = "https://wa.me/201010442817?text=";

    if (mapContainer) buildExportSVG(mapContainer, lang, waBase);

    if (gridContainer) {
      var frag = document.createDocumentFragment();
      EXPORT_COUNTRIES.forEach(function (c) { frag.appendChild(buildExportCountryCard(c, lang, waBase)); });
      gridContainer.appendChild(frag);
    }

    // unified region filter — drives the SVG pins/routes AND the cards together
    var filters = document.querySelectorAll("[data-region-filter]");
    filters.forEach(function (f) {
      f.addEventListener("click", function () {
        filters.forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        f.setAttribute("aria-pressed", "true");
        var val = f.getAttribute("data-filter");
        document.querySelectorAll(".export-pin, .export-route").forEach(function (el) {
          var match = val === "all" || el.getAttribute("data-region") === val;
          el.style.opacity = match ? "" : "0.08";
          el.style.pointerEvents = match ? "" : "none";
        });
        document.querySelectorAll("[data-country-grid] .country-tag").forEach(function (el) {
          var match = val === "all" || el.getAttribute("data-region") === val;
          el.style.display = match ? "" : "none";
        });
      });
    });
  }

  /* ---------------- GALLERY BUILD + LIGHTBOX ---------------- */
  function buildGallery() {

    var grid = document.querySelector("[data-gallery-grid]");
    if (!grid || typeof GALLERY_ITEMS === "undefined") return;
    var lang = document.documentElement.getAttribute("lang") === "ar" ? "ar" : "en";
    var empty = document.querySelector("[data-gallery-empty]");

    if (!GALLERY_ITEMS.length) {
      if (empty) empty.style.display = "block";
      return;
    }
    if (empty) empty.style.display = "none";

    var frag = document.createDocumentFragment();
    GALLERY_ITEMS.forEach(function (item, idx) {
      var cap = lang === "ar" ? item.caption_ar : item.caption_en;
      var el = document.createElement("button");
      el.type = "button";
      el.className = "gallery-item reveal";
      el.setAttribute("data-cat", item.category || "all");
      el.setAttribute("data-index", idx);
      var mediaHtml;
      if (item.type === "video") {
        mediaHtml =
          '<video muted playsinline preload="metadata"' +
          (item.poster ? ' poster="' + item.poster + '"' : "") +
          ' src="' + item.src + '"></video>' +
          '<span class="gallery-item__play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>';
      } else {
        mediaHtml = '<img src="' + item.src + '" alt="' + (cap || "") + '" loading="lazy">';
      }
      el.innerHTML = mediaHtml + '<span class="gallery-item__cap">' + (cap || "") + "</span>";
      frag.appendChild(el);
    });
    grid.appendChild(frag);

    grid.addEventListener("click", function (e) {
      var btn = e.target.closest(".gallery-item");
      if (!btn) return;
      openLightbox(parseInt(btn.getAttribute("data-index"), 10));
    });

    initReveal();
    initFilters("[data-gallery-filter]", "[data-gallery-grid] .gallery-item", "data-cat");
  }

  var lbIndex = 0;
  function openLightbox(index) {
    var lb = document.querySelector("[data-lightbox]");
    if (!lb || typeof GALLERY_ITEMS === "undefined") return;
    lbIndex = index;
    renderLightbox();
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function renderLightbox() {
    var lb = document.querySelector("[data-lightbox]");
    var content = lb.querySelector("[data-lightbox-content]");
    var cap = lb.querySelector("[data-lightbox-cap]");
    var lang = document.documentElement.getAttribute("lang") === "ar" ? "ar" : "en";
    var item = GALLERY_ITEMS[lbIndex];
    content.innerHTML =
      item.type === "video"
        ? '<video src="' + item.src + '"' + (item.poster ? ' poster="' + item.poster + '"' : "") + ' controls autoplay playsinline></video>'
        : '<img src="' + item.src + '" alt="">';
    cap.textContent = lang === "ar" ? item.caption_ar || "" : item.caption_en || "";
  }
  function initLightbox() {
    var lb = document.querySelector("[data-lightbox]");
    if (!lb) return;
    lb.querySelector("[data-lightbox-close]").addEventListener("click", closeLightbox);
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
    lb.querySelector("[data-lightbox-prev]").addEventListener("click", function () {
      lbIndex = (lbIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
      renderLightbox();
    });
    lb.querySelector("[data-lightbox-next]").addEventListener("click", function () {
      lbIndex = (lbIndex + 1) % GALLERY_ITEMS.length;
      renderLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
    });
  }
  function closeLightbox() {
    var lb = document.querySelector("[data-lightbox]");
    lb.classList.remove("open");
    lb.querySelector("[data-lightbox-content]").innerHTML = "";
    document.body.style.overflow = "";
  }

  /* ---------------- WHATSAPP QUICK QUOTE FORM ---------------- */
  function initQuoteForm() {
    var form = document.querySelector("[data-quote-form]");
    if (!form) return;
    var lang = document.documentElement.getAttribute("lang") === "ar" ? "ar" : "en";
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var country = form.querySelector("[name=country]").value.trim();
      var qty = form.querySelector("[name=qty]").value.trim();
      var product = form.querySelector("[name=product]").value;
      var notes = form.querySelector("[name=notes]").value.trim();

      var msg =
        lang === "ar"
          ? "السلام عليكم، أرغب في طلب عرض سعر من شركة الحمد.\nالدولة: " +
            country +
            "\nالكمية المطلوبة: " +
            qty +
            "\nنوع الفحم: " +
            product +
            (notes ? "\nملاحظات: " + notes : "")
          : "Hello, I'd like a quote from Al-Hamd Charcoal.\nCountry: " +
            country +
            "\nQuantity: " +
            qty +
            "\nCharcoal type: " +
            product +
            (notes ? "\nNotes: " + notes : "");

      window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg), "_blank");
    });
  }

  /* ---------------- PRODUCT WHATSAPP CTA LINKS ---------------- */
  function initProductWhatsappLinks() {
    var lang = document.documentElement.getAttribute("lang") === "ar" ? "ar" : "en";
    document.querySelectorAll("[data-wa-product]").forEach(function (a) {
      var name = a.getAttribute("data-wa-product");
      var msg =
        lang === "ar"
          ? "السلام عليكم، أرغب في الاستفسار عن " + name + " من شركة الحمد."
          : "Hello, I'd like to ask about " + name + " from Al-Hamd Charcoal.";
      a.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg);
    });
  }

  /* ---------------- CONTACT FORM (Formspree) ---------------- */
  function initContactForm() {
    var form = document.querySelector("[data-contact-form]");
    if (!form) return;
    var success = document.querySelector("[data-form-success]");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var endpoint = form.getAttribute("action");
      var btn = form.querySelector("[type=submit]");
      var originalText = btn.textContent;
      btn.textContent = "...";
      btn.disabled = true;

      fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            if (success) success.classList.add("show");
          } else {
            alert(
              document.documentElement.getAttribute("lang") === "ar"
                ? "حدث خطأ أثناء الإرسال، يرجى المحاولة عبر واتساب."
                : "Something went wrong. Please try WhatsApp instead."
            );
          }
        })
        .catch(function () {
          alert(
            document.documentElement.getAttribute("lang") === "ar"
              ? "حدث خطأ أثناء الإرسال، يرجى المحاولة عبر واتساب."
              : "Something went wrong. Please try WhatsApp instead."
          );
        })
        .finally(function () {
          btn.textContent = originalText;
          btn.disabled = false;
        });
    });
  }

  /* ---------------- WhatsApp floating button dynamic text ---------------- */
  function initFabWhatsapp() {
    var fab = document.querySelector("[data-fab-whatsapp]");
    if (!fab) return;
    var lang = document.documentElement.getAttribute("lang") === "ar" ? "ar" : "en";
    var msg = lang === "ar" ? "السلام عليكم، أرغب في الاستفسار عن الفحم النباتي." : "Hello, I'd like to ask about your charcoal.";
    fab.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg);
  }

  /* ---------------- INIT ---------------- */
  document.addEventListener("DOMContentLoaded", function () {
    // Header/footer are inlined directly in every page (no fetch/include step),
    // so they work identically whether opened via file://, a local server, or live online.
    initTheme();
    initMobileNav();
    markActiveNav();
    initFabWhatsapp();
    initLangSwitch();
    initYear();
    initReveal();
    initCounters();
    initAccordion();
    initExportMap();
    buildGallery();
    initLightbox();
    initQuoteForm();
    initProductWhatsappLinks();
    initContactForm();
  });
})();
