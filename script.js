document.addEventListener("DOMContentLoaded", () => {
  const badge = document.querySelector(".hero-badge");
  const title = document.querySelector(".hero-title");
  const description = document.querySelector(".hero-description");
  const card = document.querySelector(".bottom-left-card");
  const corner = document.querySelector(".bottom-right-corner");

  // Animaciones de entrada
  if (badge) {
    badge.classList.add("badge-animation");
  }

  if (title) {
    title.classList.add("title-animation");
  }

  if (description) {
    description.classList.add("description-animation");
  }

  if (card) {
    card.classList.add("card-animation");
  }

  if (corner) {
    corner.classList.add("corner-animation");
  }

  // Efecto de pulsación para los botones
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("pointerdown", () => {
      button.style.transform = "scale(0.98)";
    });

    button.addEventListener("pointerup", () => {
      button.style.transform = "scale(1)";
    });

    button.addEventListener("pointerleave", () => {
      button.style.transform = "scale(1)";
    });
  });
});

/* =========================================================
   AÑADIDO — AURA Estética: reseñas, formulario de contacto, año
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {

  // Año en el footer (todas las páginas internas)
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- RESEÑAS (página resenas.html) ---- */
  const reviewsGrid = document.getElementById("reviewsGrid");
  if (reviewsGrid) {
    const seedReviews = [
      { name: "Cristina Molina", treatment: "Ácido Hialurónico", stars: 5, initials: "CM",
        quote: "Resultado súper natural, nadie se dio cuenta de que me había hecho algo, solo notaron que estaba mejor." },
      { name: "Alba Reyes", treatment: "Limpieza Facial", stars: 5, initials: "AR",
        quote: "Mi piel nunca había estado tan luminosa. La atención de Marta es exquisita." },
      { name: "Patricia Núñez", treatment: "Depilación Láser", stars: 4, initials: "PN",
        quote: "Muy buenos resultados desde la tercera sesión. El trato del equipo, inmejorable." },
      { name: "Sara Iglesias", treatment: "Toxina Botulínica", stars: 5, initials: "SI",
        quote: "La Dra. Prados me explicó todo con calma antes de empezar. Resultado natural, sin cara de piedra." },
      { name: "Beatriz Lozano", treatment: "Radiofrecuencia Corporal", stars: 5, initials: "BL",
        quote: "Noté la piel más firme desde la segunda sesión. Volveré seguro." },
      { name: "Elena Vidal", treatment: "Peeling Químico", stars: 4, initials: "EV",
        quote: "Se nota muchísimo la diferencia en la textura de la piel. Muy recomendable." }
    ];

    const STORAGE_KEY = "aura_reviews";

    function loadReviews() {
      try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        return [...stored, ...seedReviews];
      } catch (e) {
        return seedReviews;
      }
    }

    function renderReviews() {
      const reviews = loadReviews();
      reviewsGrid.innerHTML = reviews.map(r => `
        <div class="card review-card">
          <div class="review-stars">${"★".repeat(r.stars)}${"☆".repeat(5 - r.stars)}</div>
          <p class="review-quote">&ldquo;${r.quote}&rdquo;</p>
          <div class="review-author">
            <div class="review-avatar">${r.initials}</div>
            <div><strong>${r.name}</strong><small>${r.treatment}</small></div>
          </div>
        </div>
      `).join("");
    }
    renderReviews();

    // Selector de estrellas
    let selectedStars = 5;
    const starPicker = document.getElementById("starPicker");
    function paintStars() {
      starPicker.querySelectorAll("button").forEach(btn => {
        btn.classList.toggle("is-active", parseInt(btn.dataset.star, 10) <= selectedStars);
      });
    }
    if (starPicker) {
      paintStars();
      starPicker.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", () => {
          selectedStars = parseInt(btn.dataset.star, 10);
          paintStars();
        });
      });
    }

    const reviewForm = document.getElementById("reviewForm");
    if (reviewForm) {
      reviewForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const nameEl = document.getElementById("rName");
        const quoteEl = document.getElementById("rQuote");
        const treatmentEl = document.getElementById("rTreatment");

        const nameOk = nameEl.value.trim().length > 1;
        const quoteOk = quoteEl.value.trim().length > 3;

        document.querySelectorAll(".field-error").forEach(el => el.style.display = "none");
        if (!nameOk) { nameEl.nextElementSibling && (nameEl.nextElementSibling.style.display = "block"); }
        if (!quoteOk) { quoteEl.nextElementSibling && (quoteEl.nextElementSibling.style.display = "block"); }
        if (!nameOk || !quoteOk) return;

        const initials = nameEl.value.trim().split(/\s+/).slice(0, 2).map(w => w[0].toUpperCase()).join("");
        const newReview = {
          name: nameEl.value.trim(),
          treatment: treatmentEl.value,
          stars: selectedStars,
          initials: initials || "??",
          quote: quoteEl.value.trim()
        };

        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        stored.unshift(newReview);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));

        renderReviews();
        reviewForm.reset();
        selectedStars = 5;
        paintStars();

        const note = document.getElementById("formNote");
        if (note) note.textContent = "¡Gracias por tu reseña! Ya se ha publicado arriba.";
      });
    }
  }

  /* ---- FORMULARIO DE CONTACTO (página contacto.html) ---- */
  const contactForm = document.getElementById("contactForm");
  if (contactForm && document.getElementById("fEmail")) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameEl = document.getElementById("fName");
      const emailEl = document.getElementById("fEmail");
      const messageEl = document.getElementById("fMessage");
      const phoneEl = document.getElementById("fPhone");
      const reasonEl = document.getElementById("fReason");
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const nameOk = nameEl.value.trim().length > 1;
      const emailOk = emailPattern.test(emailEl.value.trim());
      const messageOk = messageEl.value.trim().length > 3;

      document.querySelectorAll(".field-error").forEach(el => el.style.display = "none");
      if (!nameOk) nameEl.nextElementSibling.style.display = "block";
      if (!emailOk) emailEl.nextElementSibling.style.display = "block";
      if (!messageOk) messageEl.nextElementSibling.style.display = "block";
      if (!nameOk || !emailOk || !messageOk) return;

      const subject = `Solicitud de cita — ${reasonEl.value}`;
      const body =
        `Nombre: ${nameEl.value.trim()}\n` +
        `Teléfono: ${phoneEl.value.trim() || "No indicado"}\n` +
        `Correo: ${emailEl.value.trim()}\n` +
        `Motivo: ${reasonEl.value}\n\n` +
        `Mensaje:\n${messageEl.value.trim()}`;

      window.location.href = `mailto:hola@auraestetica.es?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      const note = document.getElementById("formNote");
      if (note) note.textContent = "Se ha abierto tu aplicación de correo con el mensaje ya redactado.";
    });
  }
});
