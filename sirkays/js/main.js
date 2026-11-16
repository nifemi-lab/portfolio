(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const MOTIFS = {
    Agbada: `<svg viewBox="0 0 200 240"><path d="M40 218V112c0-34 26-58 60-58s60 24 60 58v106"/><path d="M62 218V124c0-20 17-38 38-38s38 18 38 38v94"/><path d="M100 96V82"/><circle cx="100" cy="74" r="3"/><path d="M40 218h120"/></svg>`,
    Kaftan: `<svg viewBox="0 0 200 240"><path d="M70 70h60l14 148H56L70 70z"/><path d="M86 70c0-10 6-18 14-18s14 8 14 18"/><path d="M100 70v148"/><path d="M56 218h88"/></svg>`,
    Senators: `<svg viewBox="0 0 200 240"><path d="M78 58v160M122 58v160"/><path d="M78 58c0-6 10-10 22-10s22 4 22 10"/><path d="M100 84l11 13-11 13-11-13z"/><path d="M78 218h44"/></svg>`,
    Shirts: `<svg viewBox="0 0 200 240"><path d="M76 60h48l18 26-14 12v120H72V98L58 86l18-26z"/><path d="M76 60c0 12 10 20 24 20s24-8 24-20"/><path d="M100 80v138"/></svg>`,
  };

  const waLink = (message) =>
    `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;

  const genericMessage = `Hello ${SITE.name}, I'd like to book a bespoke piece. Style: ___ · Event date: ___`;

  const formatPhone = () => {
    const digits = SITE.whatsappNumber;
    if (digits.startsWith("234") && digits.length === 13) {
      return `+234 ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`;
    }
    return `+${digits}`;
  };

  const priceLabel = (price) =>
    price == null ? "Price on request" : `From ₦${Number(price).toLocaleString("en-NG")}`;

  $$("[data-wa-generic]").forEach((link) => {
    link.href = waLink(genericMessage);
    link.target = "_blank";
    link.rel = "noopener";
  });

  $$("[data-phone-display]").forEach((el) => {
    el.textContent = formatPhone();
  });

  const filters = $("#filters");
  const grid = $("#style-grid");

  if (filters && grid) {
    CATEGORIES.forEach((category) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip";
      chip.textContent = category;
      chip.setAttribute("role", "tab");
      chip.setAttribute("aria-selected", String(category === "All"));
      chip.dataset.category = category;
      filters.appendChild(chip);
    });

    STYLES.forEach((style, index) => {
      const card = document.createElement("article");
      card.className = "style-card reveal";
      card.dataset.category = style.category;
      card.style.transitionDelay = `${(index % 4) * 70}ms`;
      card.innerHTML = `
        <div class="card-art" aria-hidden="true">
          ${MOTIFS[style.category] || MOTIFS.Shirts}
          <span class="monogram">${style.category}</span>
        </div>
        <div class="card-body">
          <p class="card-tag">${style.category}</p>
          <h3 class="card-name">${style.name}</h3>
          <p class="card-price">${priceLabel(style.price)}</p>
          <a class="btn btn-line card-btn" target="_blank" rel="noopener"
             href="${waLink(`Hello ${SITE.name}, I'd like to book the ${style.name} (${style.category}). Event date: ___`)}">
            Book This Style
          </a>
        </div>`;
      grid.appendChild(card);
    });

    filters.addEventListener("click", (event) => {
      const chip = event.target.closest(".chip");
      if (!chip) return;
      $$(".chip", filters).forEach((btn) => btn.setAttribute("aria-selected", String(btn === chip)));
      const category = chip.dataset.category;
      $$(".style-card", grid).forEach((card) => {
        card.classList.toggle("is-hidden", category !== "All" && card.dataset.category !== category);
      });
    });
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealEls = $$(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("in-view"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  const header = $(".site-header");
  const navToggle = $(".nav-toggle");
  if (header && navToggle) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    navToggle.addEventListener("click", () => {
      const open = header.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    $$(".site-nav a").forEach((link) => {
      link.addEventListener("click", () => {
        header.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
})();
