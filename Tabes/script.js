const nav = document.querySelector(".site-nav");
const toggle = document.querySelector(".menu-toggle");
const page = document.body.dataset.page;
const pageLinks = document.querySelectorAll("[data-page-link]");
const internalLinks = document.querySelectorAll('a[href$=".html"]');

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

pageLinks.forEach((link) => {
  if (link.dataset.pageLink === page) {
    link.classList.add("is-current");
  }

  link.addEventListener("click", () => {
    if (nav) {
      nav.classList.remove("is-open");
    }
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
    }
  });
});

internalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    const current = window.location.pathname.split("/").pop() || "index.html";

    if (!href || href.startsWith("http") || href === current) {
      return;
    }

    event.preventDefault();
    document.body.classList.add("is-leaving");
    window.setTimeout(() => {
      window.location.href = href;
    }, 18);
  });
});

const lightbox = document.querySelector("#lightbox");
const lightboxImg = lightbox?.querySelector("img");
const lightboxCaption = lightbox?.querySelector("p");
const lightboxClose = lightbox?.querySelector(".lightbox-close");
const galleryItems = document.querySelectorAll(".gallery-item");
const captionFigures = document.querySelectorAll(
  ".hero-image, .bleed-image, .stack-image, .mini-history-card"
);

function syncCaptionWidths() {
  captionFigures.forEach((figure) => {
    const img = figure.querySelector("img");
    const caption = figure.querySelector("figcaption");

    if (!img || !caption) {
      return;
    }

    const rect = img.getBoundingClientRect();
    const width = Math.round(rect.width);

    if (width > 0) {
      caption.style.width = `${width}px`;
      caption.style.maxWidth = "100%";
    }
  });
}

window.addEventListener("load", syncCaptionWidths);
window.addEventListener("resize", syncCaptionWidths);
captionFigures.forEach((figure) => {
  const img = figure.querySelector("img");
  if (img) {
    img.addEventListener("load", syncCaptionWidths);
  }
});

if (lightbox && lightboxImg && lightboxCaption && lightboxClose) {
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      lightboxImg.src = item.dataset.image || "";
      lightboxImg.alt = item.querySelector("img")?.alt || "";
      lightboxCaption.innerHTML = item.dataset.caption || "";
      lightbox.showModal();
    });
  });

  lightboxClose.addEventListener("click", () => lightbox.close());

  lightbox.addEventListener("click", (event) => {
    const rect = lightbox.getBoundingClientRect();
    const inside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    if (!inside) {
      lightbox.close();
    }
  });
}
