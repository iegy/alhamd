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
    if (typeof WORLD_MAP_PATHS_SVG === "undefined") return;

    var svgNS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", WORLD_MAP_VIEWBOX);
    svg.setAttribute("class", "export-map-svg");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", lang === "ar" ? "خريطة أسواق التصدير" : "Export markets map");
    svg.setAttribute("data-export-svg", "");
    svg.innerHTML = WORLD_MAP_PATHS_SVG;

    // de-namespace ids from the source map (avoid document-wide id collisions),
    // tag every country shape with a data-code + base "wm-country" class.
    var byCode = {};
    Array.prototype.slice.call(svg.children).forEach(function (el) {
      var id = el.getAttribute("id");
      if (!id) return;
      el.removeAttribute("id");
      el.setAttribute("data-code", id);
      el.classList.add("wm-country");
      byCode[id] = el;
    });

    var routesGroup = document.createElementNS(svgNS, "g");
    routesGroup.setAttribute("class", "export-map-routes");
    svg.appendChild(routesGroup);

    var extraPinsGroup = document.createElementNS(svgNS, "g");
    extraPinsGroup.setAttribute("class", "export-map-pins");

    function attachInteraction(el, country) {
      var label = lang === "ar" ? country.name_ar : country.name_en;
      el.classList.add("wm-target");
      el.setAttribute("data-region", country.region);
      el.setAttribute("tabindex", "0");
      el.setAttribute("role", "button");
      el.setAttribute("aria-label", label);

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

      el.addEventListener("mouseenter", function (e) { showTip(e.clientX, e.clientY); });
      el.addEventListener("mousemove", function (e) { showTip(e.clientX, e.clientY); });
      el.addEventListener("mouseleave", hideTip);
      el.addEventListener("focus", function () {
        var rect = el.getBoundingClientRect();
        showTip(rect.left, rect.top);
      });
      el.addEventListener("blur", hideTip);
      el.addEventListener("click", function () { window.open(waUrl, "_blank"); });
      el.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); window.open(waUrl, "_blank"); }
      });
    }

    EXPORT_COUNTRIES.forEach(function (country) {
      // route line from hub to this destination
      var mx = (EXPORT_HUB.x + country.x) / 2;
      var my = (EXPORT_HUB.y + country.y) / 2 - Math.abs(country.x - EXPORT_HUB.x) * 0.14 - 14;
      var path = document.createElementNS(svgNS, "path");
      path.setAttribute("d", "M" + EXPORT_HUB.x + "," + EXPORT_HUB.y + " Q " + mx + "," + my + " " + country.x + "," + country.y);
      path.setAttribute("class", "export-route");
      path.setAttribute("data-region", country.region);
      routesGroup.appendChild(path);

      var mapEl = byCode[country.code];
      if (mapEl && !country.estimated) {
        attachInteraction(mapEl, country);
        // small marker dot on top too, so tiny countries stay easy to spot/click
        var dot = document.createElementNS(svgNS, "circle");
        dot.setAttribute("cx", country.x); dot.setAttribute("cy", country.y); dot.setAttribute("r", 2.6);
        dot.setAttribute("class", "wm-target-dot");
        dot.setAttribute("data-region", country.region);
        extraPinsGroup.appendChild(dot);
      } else {
        // not present on the base map (e.g. Bahrain, Palestine) — draw a small standalone marker
        var g = document.createElementNS(svgNS, "g");
        g.setAttribute("class", "export-pin");
        var halo = document.createElementNS(svgNS, "circle");
        halo.setAttribute("cx", country.x); halo.setAttribute("cy", country.y); halo.setAttribute("r", 7);
        halo.setAttribute("class", "export-pin__halo");
        var dot2 = document.createElementNS(svgNS, "circle");
        dot2.setAttribute("cx", country.x); dot2.setAttribute("cy", country.y); dot2.setAttribute("r", 3);
        dot2.setAttribute("class", "export-pin__dot");
        g.appendChild(halo); g.appendChild(dot2);
        attachInteraction(g, country);
        extraPinsGroup.appendChild(g);
      }
    });

    svg.appendChild(extraPinsGroup);

    // hub marker + label (Rashid, Egypt) — drawn in SVG space so it stays put through zoom
    var hubGroup = document.createElementNS(svgNS, "g");
    hubGroup.setAttribute("class", "export-hub");
    var hubHalo = document.createElementNS(svgNS, "circle");
    hubHalo.setAttribute("cx", EXPORT_HUB.x); hubHalo.setAttribute("cy", EXPORT_HUB.y); hubHalo.setAttribute("r", 5);
    hubHalo.setAttribute("class", "export-hub__pulse");
    var hubDot = document.createElementNS(svgNS, "circle");
    hubDot.setAttribute("cx", EXPORT_HUB.x); hubDot.setAttribute("cy", EXPORT_HUB.y); hubDot.setAttribute("r", 2.6);
    hubDot.setAttribute("class", "export-hub__dot");
    hubGroup.appendChild(hubHalo);
    hubGroup.appendChild(hubDot);
    svg.appendChild(hubGroup);

    container.appendChild(svg);

    var tooltip = document.createElement("div");
    tooltip.setAttribute("data-export-tooltip", "");
    tooltip.className = "export-map-tooltip";
    container.appendChild(tooltip);

    // credit line for the base map artwork (CC BY-SA 3.0 requires attribution)
    var credit = document.createElement("a");
    credit.className = "export-map-credit";
    credit.href = "https://alhamd4charcoal.com/";
    credit.target = "_blank"; credit.rel = "noopener";
    credit.textContent = lang === "ar" ? "الحمد لإنتاج وتصدير الفحم النباتي";
    container.appendChild(credit);
  }

  function regionViewBox(regionKey) {
    if (regionKey === "all") return WORLD_MAP_VIEWBOX;
    var list = EXPORT_COUNTRIES.filter(function (c) { return c.region === regionKey; }).concat([EXPORT_HUB]);
    var xs = list.map(function (c) { return c.x; });
    var ys = list.map(function (c) { return c.y; });
    var minX = Math.min.apply(null, xs), maxX = Math.max.apply(null, xs);
    var minY = Math.min.apply(null, ys), maxY = Math.max.apply(null, ys);
    var padX = Math.max((maxX - minX) * 0.45, 30);
    var padY = Math.max((maxY - minY) * 0.45, 30);
    minX -= padX; maxX += padX; minY -= padY; maxY += padY;
    var w = maxX - minX, h = maxY - minY, ratio = 2;
    if (w / h > ratio) {
      var nh = w / ratio, cy = (minY + maxY) / 2;
      minY = cy - nh / 2; maxY = cy + nh / 2; h = nh;
    } else {
      var nw = h * ratio, cx = (minX + maxX) / 2;
      minX = cx - nw / 2; maxX = cx + nw / 2; w = nw;
    }
    return minX + " " + minY + " " + w + " " + h;
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

    // unified region filter — zooms the map to the region AND filters the cards
    var filters = document.querySelectorAll("[data-region-filter]");
    filters.forEach(function (f) {
      f.addEventListener("click", function () {
        filters.forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        f.setAttribute("aria-pressed", "true");
        var val = f.getAttribute("data-filter");

        var svg = document.querySelector("[data-export-svg]");
        if (svg && typeof regionViewBox === "function") {
          svg.setAttribute("viewBox", regionViewBox(val));
        }
        document.querySelectorAll(".wm-country.wm-target, .wm-target-dot, .export-pin, .export-route").forEach(function (el) {
          var match = val === "all" || el.getAttribute("data-region") === val;
          el.style.opacity = match ? "" : "0.1";
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
