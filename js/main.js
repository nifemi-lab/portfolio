/* =========================================================
   Portfolio — behaviour
   Progressive enhancement: every feature is optional.
   ========================================================= */
(function () {
  "use strict";

  const root = document.documentElement;
  root.classList.remove("no-js");
  root.classList.add("js");

  /* Single source of truth for motion preference */
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const prefersReducedMotion = () => motionQuery.matches;

  /* ---------- Year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Scroll progress bar ---------- */
  const progressBar = document.getElementById("progressBar");
  const header = document.getElementById("siteHeader");

  function onScroll() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;

    if (progressBar) progressBar.style.width = pct + "%";
    if (header) header.classList.toggle("scrolled", doc.scrollTop > 8);
  }

  let ticking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        onScroll();
        ticking = false;
      });
    },
    { passive: true }
  );
  onScroll();

  /* ---------- Mobile nav ---------- */
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");

  function setNav(open) {
    if (!nav || !navToggle) return;
    nav.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      setNav(!nav.classList.contains("open"));
    });

    /* Close when a link is chosen, or Escape is pressed */
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setNav(false);
    });

    /* Reset state if we resize past the mobile breakpoint */
    window.matchMedia("(min-width: 768px)").addEventListener("change", function (e) {
      if (e.matches) setNav(false);
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = Array.from(document.querySelectorAll("[data-reveal]"));

  revealEls.forEach(function (el) {
    const delay = el.getAttribute("data-reveal-delay");
    if (delay) el.style.setProperty("--reveal-delay", delay + "ms");
  });

  function showAllReveals() {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
    showAllReveals();
  } else {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    revealEls.forEach(function (el) {
      io.observe(el);
    });

    /* If the user flips the OS setting mid-session, stop hiding things */
    motionQuery.addEventListener("change", function (e) {
      if (e.matches) showAllReveals();
    });
  }

  /* ---------- Active section highlight ---------- */
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));

  if ("IntersectionObserver" in window && sections.length) {
    const sectionIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + id
            );
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(function (s) {
      sectionIO.observe(s);
    });
  }

  /* =========================================================
     Slideshow
     ========================================================= */
  const slideshow = document.getElementById("slideshow");
  const slidesWrap = document.getElementById("slides");

  if (slideshow && slidesWrap) {
    const slides = Array.from(slidesWrap.querySelectorAll(".slide"));
    const dotsWrap = document.getElementById("dots");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    let index = 0;
    let timer = null;
    const AUTOPLAY_MS = 6500;

    /* --- Build dots --- */
    const dots = slides.map(function (_, i) {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", "Go to project " + (i + 1));
      b.addEventListener("click", function () {
        goTo(i, true);
      });
      if (dotsWrap) dotsWrap.appendChild(b);
      return b;
    });

    function render() {
      slides.forEach(function (slide, i) {
        const active = i === index;
        slide.classList.toggle("is-active", active);
        /* keep hidden slides out of the tab order + a11y tree */
        slide.setAttribute("aria-hidden", String(!active));
        slide.querySelectorAll("a, button").forEach(function (el) {
          if (active) el.removeAttribute("tabindex");
          else el.setAttribute("tabindex", "-1");
        });
      });

      dots.forEach(function (d, i) {
        d.setAttribute("aria-selected", String(i === index));
      });
    }

    function goTo(i, userInitiated) {
      index = (i + slides.length) % slides.length;
      render();
      if (userInitiated) restartAutoplay();
    }

    function next(userInitiated) { goTo(index + 1, userInitiated); }
    function prev(userInitiated) { goTo(index - 1, userInitiated); }

    /* --- Autoplay (skipped entirely for reduced motion) --- */
    function stopAutoplay() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    function startAutoplay() {
      if (prefersReducedMotion()) return;
      stopAutoplay();
      timer = setInterval(function () { next(false); }, AUTOPLAY_MS);
    }

    function restartAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    /* --- Controls --- */
    if (nextBtn) nextBtn.addEventListener("click", function () { next(true); });
    if (prevBtn) prevBtn.addEventListener("click", function () { prev(true); });

    /* --- Keyboard: works when the region has focus --- */
    slideshow.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); next(true); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); prev(true); }
      if (e.key === "Home") { e.preventDefault(); goTo(0, true); }
      if (e.key === "End")  { e.preventDefault(); goTo(slides.length - 1, true); }
    });

    /* --- Pause on hover / focus (WCAG 2.2.2) --- */
    slideshow.addEventListener("mouseenter", stopAutoplay);
    slideshow.addEventListener("mouseleave", startAutoplay);
    slideshow.addEventListener("focusin", stopAutoplay);
    slideshow.addEventListener("focusout", function (e) {
      if (!slideshow.contains(e.relatedTarget)) startAutoplay();
    });

    /* --- Pointer drag / swipe --- */
    let startX = 0;
    let startY = 0;
    let dragging = false;
    let axisLocked = null; // null | "x" | "y"

    function pointerDown(e) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragging = true;
      axisLocked = null;
      startX = e.clientX;
      startY = e.clientY;
      stopAutoplay();
    }

    function pointerMove(e) {
      if (!dragging) return;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      /* Decide once: only hijack clearly horizontal swipes */
      if (!axisLocked) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        axisLocked = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        if (axisLocked === "x") {
          try { slidesWrap.setPointerCapture(e.pointerId); } catch (_) {}
        } else {
          dragging = false; // let the page scroll vertically
          return;
        }
      }

      if (axisLocked !== "x") return;
      e.preventDefault();

      const threshold = slidesWrap.clientWidth * 0.15;
      if (Math.abs(dx) > threshold) {
        dx < 0 ? next(true) : prev(true);
        dragging = false;
      }
    }

    function pointerUp() {
      dragging = false;
      axisLocked = null;
      startAutoplay();
    }

    slidesWrap.addEventListener("pointerdown", pointerDown);
    slidesWrap.addEventListener("pointermove", pointerMove, { passive: false });
    slidesWrap.addEventListener("pointerup", pointerUp);
    slidesWrap.addEventListener("pointercancel", pointerUp);
    slidesWrap.addEventListener("pointerleave", pointerUp);

    /* --- Honour reduced motion changes live --- */
    motionQuery.addEventListener("change", function (e) {
      if (e.matches) stopAutoplay();
      else startAutoplay();
    });

    /* --- Pause when the tab is hidden --- */
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stopAutoplay();
      else startAutoplay();
    });

    /* --- Boot --- */
    render();
    startAutoplay();
  }

  /* ---------- Smooth anchor scrolling (skips reduced motion) ---------- */
  document.addEventListener("click", function (e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const id = link.getAttribute("href");
    if (!id || id === "#") return;

    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });

    /* move focus for keyboard users without a visible jump */
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  });
})();
