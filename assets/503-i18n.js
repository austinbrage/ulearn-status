const translations503 = {
  en: {
    pageTitle: "uLearn - Scheduled Maintenance",
    pageDescription:
      "We're performing scheduled maintenance to improve your experience.",
    title: "We're Under Maintenance",
    subtitle: "We're making things better for you",
    scheduledTitle: "Scheduled Maintenance",
    scheduledMessage:
      "We're performing important updates to enhance your experience. Our team is working hard to get everything back online as quickly as possible.",
    expectedDowntime: "Expected downtime: a few hours",
    workingOnTitle: "What we're working on:",
    improvement1: "Performance improvements",
    improvement2: "New feature enhancements",
    improvement3: "Security updates",
    thankYou:
      "Thank you for your patience and understanding. We appreciate your support!",
    refreshButton: "Refresh Page",
    homeButton: "Return to Home",
    assistanceTitle: "Need assistance? Contact support",
    emailLabel: "Email",
    twitterLabel: "Twitter",
  },
  es: {
    pageTitle: "uLearn - Mantenimiento programado",
    pageDescription:
      "Estamos realizando mantenimiento programado para mejorar tu experiencia.",
    title: "En mantenimiento",
    subtitle: "Estamos mejorando las cosas para vos",
    scheduledTitle: "Mantenimiento programado",
    scheduledMessage:
      "Estamos realizando actualizaciones importantes para mejorar tu experiencia. Nuestro equipo trabaja para volver en línea lo antes posible.",
    expectedDowntime: "Tiempo estimado: unas horas",
    workingOnTitle: "En qué estamos trabajando:",
    improvement1: "Mejoras de rendimiento",
    improvement2: "Nuevas funcionalidades",
    improvement3: "Actualizaciones de seguridad",
    thankYou: "Gracias por tu paciencia y comprensión. ¡Apreciamos tu apoyo!",
    refreshButton: "Recargar página",
    homeButton: "Volver al inicio",
    assistanceTitle: "¿Necesitas ayuda? Contacta con soporte",
    emailLabel: "Email",
    twitterLabel: "Twitter",
  },
  fr: {
    pageTitle: "uLearn - Maintenance programmée",
    pageDescription:
      "Nous effectuons une maintenance programmée pour améliorer votre expérience.",
    title: "En maintenance",
    subtitle: "Nous améliorons les choses pour vous",
    scheduledTitle: "Maintenance programmée",
    scheduledMessage:
      "Nous effectuons des mises à jour importantes pour améliorer votre expérience. Notre équipe travaille à remettre tout en ligne le plus vite possible.",
    expectedDowntime: "Durée estimée : quelques heures",
    workingOnTitle: "Ce sur quoi nous travaillons :",
    improvement1: "Améliorations des performances",
    improvement2: "Nouvelles fonctionnalités",
    improvement3: "Mises à jour de sécurité",
    thankYou:
      "Merci pour votre patience et votre compréhension. Nous apprécions votre soutien !",
    refreshButton: "Actualiser la page",
    homeButton: "Retour à l'accueil",
    assistanceTitle: "Besoin d'aide ? Contactez le support",
    emailLabel: "Email",
    twitterLabel: "Twitter",
  },
  it: {
    pageTitle: "uLearn - Manutenzione programmata",
    pageDescription:
      "Stiamo eseguendo una manutenzione programmata per migliorare la tua esperienza.",
    title: "In manutenzione",
    subtitle: "Stiamo migliorando le cose per te",
    scheduledTitle: "Manutenzione programmata",
    scheduledMessage:
      "Stiamo eseguendo aggiornamenti importanti per migliorare la tua esperienza. Il nostro team sta lavorando per ripristinare tutto il prima possibile.",
    expectedDowntime: "Tempo stimato: qualche ora",
    workingOnTitle: "Su cosa stiamo lavorando:",
    improvement1: "Miglioramenti delle prestazioni",
    improvement2: "Nuove funzionalità",
    improvement3: "Aggiornamenti di sicurezza",
    thankYou:
      "Grazie per la tua pazienza e comprensione. Apprezziamo il tuo supporto!",
    refreshButton: "Aggiorna la pagina",
    homeButton: "Torna alla home",
    assistanceTitle: "Hai bisogno di aiuto? Contatta il supporto",
    emailLabel: "Email",
    twitterLabel: "Twitter",
  },
};

(function () {
  const parts = window.location.pathname.split("/");
  const segment = parts.find((s) => translations503[s]);
  const lang = segment || "en";
  const t = translations503[lang];

  // Apply translations
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (t[key] === undefined) return;
    if (el.tagName === "META") el.setAttribute("content", t[key]);
    else el.textContent = t[key];
  });

  // Home button — link to /:lang/home
  var homeBtn = document.getElementById("maintenance-home-btn");
  if (homeBtn) homeBtn.href = "/" + lang + "/home";

  // Lang dropdown
  const btn = document.getElementById("maintenance-lang-btn");
  const dropdown = document.getElementById("maintenance-lang-dropdown");
  const chevron = document.getElementById("maintenance-lang-chevron");
  const current = document.getElementById("maintenance-lang-current");

  current.textContent = lang;
  document.querySelectorAll(".maintenance-lang-option").forEach((el) => {
    if (el.dataset.lang === lang)
      el.classList.add("maintenance-lang-option-active");
  });

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.toggle("maintenance-lang-dropdown-open");
    chevron.classList.toggle("maintenance-lang-chevron-open", isOpen);
  });

  document.addEventListener("click", () => {
    dropdown.classList.remove("maintenance-lang-dropdown-open");
    chevron.classList.remove("maintenance-lang-chevron-open");
  });

  document.querySelectorAll(".maintenance-lang-option").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const code = el.dataset.lang;
      if (code === lang) return;
      const path = window.location.pathname;
      const newPath = segment
        ? path.replace("/" + segment + "/", "/" + code + "/")
        : "/" + code + path;
      window.location.href = newPath;
    });
  });
})();
