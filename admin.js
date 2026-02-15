const STORAGE_KEY = "lj_site_data";
const ADMIN_PASSWORD = "139LJT!";

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
const saveData = (data) => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

const loginPanel = document.getElementById("login-panel");
const adminPanel = document.getElementById("admin-panel");
const loginButton = document.getElementById("login-button");
const loginError = document.getElementById("login-error");

loginButton.addEventListener("click", () => {
  const password = document.getElementById("password").value;
  if (password === ADMIN_PASSWORD) {
    loginPanel.hidden = true;
    adminPanel.hidden = false;
    initializeForm();
  } else {
    loginError.textContent = "Senha incorreta. Verifique e tente novamente.";
  }
});

const initializeForm = () => {
  const data = getData();
  if (!data) {
    loginError.textContent = "Dados não encontrados. Acesse a página inicial primeiro.";
    return;
  }

  document.getElementById("hero-intro-input").value = data.hero.intro;
  document.getElementById("hero-location-input").value = data.hero.location;
  document.getElementById("hero-highlight-input").value = data.hero.highlight;
  document.getElementById("hero-quote-input").value = data.hero.quote;

  document.getElementById("about-text-input").value = data.about.text;
  document.getElementById("about-publications-input").value = data.about.publications;
  document.getElementById("about-gear-input").value = data.about.gear;
  document.getElementById("about-licensing-input").value = data.about.licensing;

  document.getElementById("contact-email-input").value = data.contact.email;
  document.getElementById("contact-phone-input").value = data.contact.phone;
  document.getElementById("contact-location-input").value = data.contact.location;

  bindInput("hero-intro-input", (value) => updateField(["hero", "intro"], value));
  bindInput("hero-location-input", (value) => updateField(["hero", "location"], value));
  bindInput("hero-highlight-input", (value) => updateField(["hero", "highlight"], value));
  bindInput("hero-quote-input", (value) => updateField(["hero", "quote"], value));

  bindInput("about-text-input", (value) => updateField(["about", "text"], value));
  bindInput("about-publications-input", (value) => updateField(["about", "publications"], value));
  bindInput("about-gear-input", (value) => updateField(["about", "gear"], value));
  bindInput("about-licensing-input", (value) => updateField(["about", "licensing"], value));

  bindInput("contact-email-input", (value) => updateField(["contact", "email"], value));
  bindInput("contact-phone-input", (value) => updateField(["contact", "phone"], value));
  bindInput("contact-location-input", (value) => updateField(["contact", "location"], value));

  renderGalleryAdmin(data);
};

const bindInput = (id, handler) => {
  const element = document.getElementById(id);
  element.addEventListener("input", (event) => handler(event.target.value));
};

const updateField = (path, value) => {
  const data = getData();
  let current = data;
  path.forEach((key, index) => {
    if (index === path.length - 1) {
      current[key] = value;
    } else {
      current = current[key];
    }
  });
  saveData(data);
};

const renderGalleryAdmin = (data) => {
  const container = document.getElementById("gallery-admin");
  container.innerHTML = "";

  data.categories.forEach((category, categoryIndex) => {
    const categoryBlock = document.createElement("div");
    categoryBlock.className = "gallery-admin-category";

    categoryBlock.appendChild(createInputField("Categoria", category.name, (value) => {
      updateCategory(categoryIndex, { name: value });
    }));

    categoryBlock.appendChild(createInputField("Descrição", category.description, (value) => {
      updateCategory(categoryIndex, { description: value });
    }));

    category.albums.forEach((album, albumIndex) => {
      const albumBlock = document.createElement("div");
      albumBlock.className = "gallery-admin-album";

      albumBlock.appendChild(createInputField("Álbum", album.name, (value) => {
        updateAlbum(categoryIndex, albumIndex, { name: value });
      }));

      albumBlock.appendChild(createInputField("Descrição", album.description, (value) => {
        updateAlbum(categoryIndex, albumIndex, { description: value });
      }));

      const imagesBlock = document.createElement("div");
      imagesBlock.className = "gallery-admin-images";

      album.images.forEach((image, imageIndex) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.className = "gallery-admin-images";

        imageWrapper.appendChild(createInputField("URL da imagem", image.url, (value) => {
          updateImage(categoryIndex, albumIndex, imageIndex, { url: value });
        }));
        imageWrapper.appendChild(createInputField("Título", image.title, (value) => {
          updateImage(categoryIndex, albumIndex, imageIndex, { title: value });
        }));
        imageWrapper.appendChild(createInputField("Meta", image.meta, (value) => {
          updateImage(categoryIndex, albumIndex, imageIndex, { meta: value });
        }));

        const removeImageButton = document.createElement("button");
        removeImageButton.className = "small-button";
        removeImageButton.textContent = "Remover imagem";
        removeImageButton.addEventListener("click", () => {
          removeImage(categoryIndex, albumIndex, imageIndex);
        });

        const moveImageUp = document.createElement("button");
        moveImageUp.className = "small-button";
        moveImageUp.textContent = "Mover acima";
        moveImageUp.addEventListener("click", () => {
          reorderImage(categoryIndex, albumIndex, imageIndex, imageIndex - 1);
        });

        const moveImageDown = document.createElement("button");
        moveImageDown.className = "small-button";
        moveImageDown.textContent = "Mover abaixo";
        moveImageDown.addEventListener("click", () => {
          reorderImage(categoryIndex, albumIndex, imageIndex, imageIndex + 1);
        });

        imageWrapper.append(removeImageButton, moveImageUp, moveImageDown);
        imagesBlock.appendChild(imageWrapper);
      });

      const addImageButton = document.createElement("button");
      addImageButton.className = "small-button";
      addImageButton.textContent = "Adicionar imagem";
      addImageButton.addEventListener("click", () => {
        addImage(categoryIndex, albumIndex);
      });

      const removeAlbumButton = document.createElement("button");
      removeAlbumButton.className = "small-button";
      removeAlbumButton.textContent = "Remover álbum";
      removeAlbumButton.addEventListener("click", () => {
        removeAlbum(categoryIndex, albumIndex);
      });

      const moveAlbumUp = document.createElement("button");
      moveAlbumUp.className = "small-button";
      moveAlbumUp.textContent = "Mover álbum acima";
      moveAlbumUp.addEventListener("click", () => {
        reorderAlbum(categoryIndex, albumIndex, albumIndex - 1);
      });

      const moveAlbumDown = document.createElement("button");
      moveAlbumDown.className = "small-button";
      moveAlbumDown.textContent = "Mover álbum abaixo";
      moveAlbumDown.addEventListener("click", () => {
        reorderAlbum(categoryIndex, albumIndex, albumIndex + 1);
      });

      albumBlock.append(imagesBlock, addImageButton, removeAlbumButton, moveAlbumUp, moveAlbumDown);
      categoryBlock.appendChild(albumBlock);
    });

    const addAlbumButton = document.createElement("button");
    addAlbumButton.className = "small-button";
    addAlbumButton.textContent = "Adicionar álbum";
    addAlbumButton.addEventListener("click", () => {
      addAlbum(categoryIndex);
    });

    const removeCategoryButton = document.createElement("button");
    removeCategoryButton.className = "small-button";
    removeCategoryButton.textContent = "Remover categoria";
    removeCategoryButton.addEventListener("click", () => {
      removeCategory(categoryIndex);
    });

    categoryBlock.append(addAlbumButton, removeCategoryButton);
    container.appendChild(categoryBlock);
  });
};

const createInputField = (labelText, value, onChange) => {
  const wrapper = document.createElement("div");
  const label = document.createElement("label");
  label.textContent = labelText;
  const input = document.createElement("input");
  input.value = value;
  input.addEventListener("input", (event) => onChange(event.target.value));
  wrapper.append(label, input);
  return wrapper;
};

const updateCategory = (index, updates) => {
  const data = getData();
  data.categories[index] = { ...data.categories[index], ...updates };
  saveData(data);
};

const updateAlbum = (categoryIndex, albumIndex, updates) => {
  const data = getData();
  data.categories[categoryIndex].albums[albumIndex] = {
    ...data.categories[categoryIndex].albums[albumIndex],
    ...updates,
  };
  saveData(data);
};

const updateImage = (categoryIndex, albumIndex, imageIndex, updates) => {
  const data = getData();
  data.categories[categoryIndex].albums[albumIndex].images[imageIndex] = {
    ...data.categories[categoryIndex].albums[albumIndex].images[imageIndex],
    ...updates,
  };
  saveData(data);
};

const addCategory = () => {
  const data = getData();
  data.categories.push({
    name: "Nova categoria",
    description: "Descrição da categoria",
    albums: [
      {
        name: "Novo álbum",
        description: "Descrição do álbum",
        images: [
          {
            url: "",
            title: "Nova imagem",
            meta: "",
          },
        ],
      },
    ],
  });
  saveData(data);
  renderGalleryAdmin(data);
};

const addAlbum = (categoryIndex) => {
  const data = getData();
  data.categories[categoryIndex].albums.push({
    name: "Novo álbum",
    description: "Descrição do álbum",
    images: [
      {
        url: "",
        title: "Nova imagem",
        meta: "",
      },
    ],
  });
  saveData(data);
  renderGalleryAdmin(data);
};

const addImage = (categoryIndex, albumIndex) => {
  const data = getData();
  data.categories[categoryIndex].albums[albumIndex].images.push({
    url: "",
    title: "Nova imagem",
    meta: "",
  });
  saveData(data);
  renderGalleryAdmin(data);
};

const removeCategory = (categoryIndex) => {
  const data = getData();
  data.categories.splice(categoryIndex, 1);
  saveData(data);
  renderGalleryAdmin(data);
};

const removeAlbum = (categoryIndex, albumIndex) => {
  const data = getData();
  data.categories[categoryIndex].albums.splice(albumIndex, 1);
  saveData(data);
  renderGalleryAdmin(data);
};

const removeImage = (categoryIndex, albumIndex, imageIndex) => {
  const data = getData();
  data.categories[categoryIndex].albums[albumIndex].images.splice(imageIndex, 1);
  saveData(data);
  renderGalleryAdmin(data);
};

const reorderAlbum = (categoryIndex, fromIndex, toIndex) => {
  const data = getData();
  const albums = data.categories[categoryIndex].albums;
  if (toIndex < 0 || toIndex >= albums.length) {
    return;
  }
  const [moved] = albums.splice(fromIndex, 1);
  albums.splice(toIndex, 0, moved);
  saveData(data);
  renderGalleryAdmin(data);
};

const reorderImage = (categoryIndex, albumIndex, fromIndex, toIndex) => {
  const data = getData();
  const images = data.categories[categoryIndex].albums[albumIndex].images;
  if (toIndex < 0 || toIndex >= images.length) {
    return;
  }
  const [moved] = images.splice(fromIndex, 1);
  images.splice(toIndex, 0, moved);
  saveData(data);
  renderGalleryAdmin(data);
};

document.getElementById("add-category").addEventListener("click", addCategory);
