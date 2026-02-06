const STORAGE_KEY = "lj_site_data";

const defaultData = {
  hero: {
    intro:
      "Uma experiência digital que revela o silêncio cósmico em altíssima resolução, com curadoria refinada e narrativa visual sofisticada.",
    location: "São Paulo · Brasil",
    highlight:
      "Séries exclusivas de nebulosas, galáxias e fenômenos celestes capturados com precisão científica e sensibilidade artística.",
    quote: "Cada fotografia é um fragmento do universo em estado de contemplação absoluta.",
  },
  about: {
    text:
      "Lucas Justo é fotógrafo astronômico especializado em revelar a arquitetura do universo por meio de composições meticulosas e processos de captura avançados. Sua pesquisa estética combina ciência, arte e design visual para entregar uma experiência imersiva e refinada.",
    publications: "APOD · Sky & Telescope · Astronomy Magazine",
    gear: "Telescópios premium · Montagem equatorial · Sensores full-frame",
    licensing: "Licenciamento global com curadoria personalizada",
  },
  contact: {
    email: "studio@lucasjusto.com",
    phone: "+55 11 98765-4321",
    location: "Atendimento internacional sob agendamento",
  },
  categories: [
    {
      name: "Nebulosas & Núcleos Luminosos",
      description: "Cartografias etéreas de gás e poeira com profundidade cromática controlada.",
      albums: [
        {
          name: "Cinturão de Órion",
          description: "Luz difusa e estruturas raras em longa exposição.",
          images: [
            {
              url: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1200&q=80",
              title: "Orion Cascade",
              meta: "Órion · 2023",
            },
            {
              url: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80",
              title: "Nebula Veil",
              meta: "Órion · 2024",
            },
          ],
        },
      ],
    },
    {
      name: "Galáxias & Horizonte Profundo",
      description: "Composições raras de galáxias em contraste com o vazio silencioso.",
      albums: [
        {
          name: "Arquivos do Cosmos",
          description: "Mapeamentos detalhados de galáxias espirais e suas estruturas.",
          images: [
            {
              url: "https://images.unsplash.com/photo-1473929730315-95ef68d5e9ac?auto=format&fit=crop&w=1200&q=80",
              title: "Deep Spiral",
              meta: "Andrômeda · 2022",
            },
            {
              url: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&w=1200&q=80",
              title: "Halo Reach",
              meta: "Triangulum · 2023",
            },
          ],
        },
      ],
    },
    {
      name: "Fenômenos Raros",
      description: "Eventos transitórios capturados com precisão científica e composição estética.",
      albums: [
        {
          name: "Auroras Magnéticas",
          description: "A dança do vento solar em silêncio absoluto.",
          images: [
            {
              url: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
              title: "Magnetic Drift",
              meta: "Islândia · 2021",
            },
            {
              url: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=1200&q=80",
              title: "Polar Silence",
              meta: "Noruega · 2022",
            },
          ],
        },
      ],
    },
  ],
};

const getData = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
  return defaultData;
};

const heroIntro = document.getElementById("hero-intro");
const heroLocation = document.getElementById("hero-location");
const heroHighlight = document.getElementById("hero-highlight");
const heroQuote = document.getElementById("hero-quote");
const heroStatCount = document.getElementById("hero-stat-count");

const galleryContent = document.getElementById("gallery-content");

const aboutText = document.getElementById("about-text");
const aboutPublications = document.getElementById("about-publications");
const aboutGear = document.getElementById("about-gear");
const aboutLicensing = document.getElementById("about-licensing");

const contactEmail = document.getElementById("contact-email");
const contactPhone = document.getElementById("contact-phone");
const contactLocation = document.getElementById("contact-location");

const renderHero = (data) => {
  heroIntro.textContent = data.hero.intro;
  heroLocation.textContent = data.hero.location;
  heroHighlight.textContent = data.hero.highlight;
  heroQuote.textContent = data.hero.quote;

  const totalImages = data.categories.reduce((sum, category) => {
    return (
      sum +
      category.albums.reduce((albumSum, album) => albumSum + album.images.length, 0)
    );
  }, 0);
  heroStatCount.textContent = totalImages;
};

const renderGallery = (data) => {
  galleryContent.innerHTML = "";

  data.categories.forEach((category) => {
    const categoryWrapper = document.createElement("div");
    categoryWrapper.className = "gallery-category";
    categoryWrapper.dataset.reveal = "";

    const header = document.createElement("div");
    header.className = "category-header";
    header.innerHTML = `<h3>${category.name}</h3><p>${category.description}</p>`;

    const albumGrid = document.createElement("div");
    albumGrid.className = "album-grid";

    category.albums.forEach((album) => {
      const card = document.createElement("div");
      card.className = "album-card";

      const meta = document.createElement("div");
      meta.className = "album-meta";
      meta.innerHTML = `<h4>${album.name}</h4><p>${album.description}</p>`;

      const images = document.createElement("div");
      images.className = "album-images";

      album.images.forEach((image) => {
        if (!image.url) {
          return;
        }
        const img = document.createElement("img");
        img.src = image.url;
        img.alt = image.title;
        img.loading = "lazy";
        img.addEventListener("click", () => openLightbox(image));
        images.appendChild(img);
      });

      card.append(meta, images);
      albumGrid.appendChild(card);
    });

    categoryWrapper.append(header, albumGrid);
    galleryContent.appendChild(categoryWrapper);
  });
};

const renderAbout = (data) => {
  aboutText.textContent = data.about.text;
  aboutPublications.textContent = data.about.publications;
  aboutGear.textContent = data.about.gear;
  aboutLicensing.textContent = data.about.licensing;
};

const renderContact = (data) => {
  contactEmail.textContent = data.contact.email;
  contactPhone.textContent = data.contact.phone;
  contactLocation.textContent = data.contact.location;
};

const renderAll = (data) => {
  renderHero(data);
  renderGallery(data);
  renderAbout(data);
  renderContact(data);
  const revealItems = document.querySelectorAll("[data-reveal]");
  revealItems.forEach((item) => revealObserver.observe(item));
};

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxMeta = document.getElementById("lightbox-meta");
const lightboxClose = document.getElementById("lightbox-close");

const openLightbox = (image) => {
  lightboxImage.src = image.url;
  lightboxImage.alt = image.title;
  lightboxTitle.textContent = image.title;
  lightboxMeta.textContent = image.meta;
  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");
};

const closeLightbox = () => {
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
};

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.getElementById("footer-year").textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

renderAll(getData());

window.addEventListener("storage", (event) => {
  if (event.key === STORAGE_KEY && event.newValue) {
    renderAll(JSON.parse(event.newValue));
  }
});

const ambientGlow = document.querySelector(".ambient-glow");
window.addEventListener("scroll", () => {
  const offset = window.scrollY * 0.05;
  ambientGlow.style.transform = `translateY(${offset}px)`;
});
