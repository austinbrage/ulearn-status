const translations = {
  en: {
    title: "We'll be right back",
    subtitle: "Hang tight \u2014 this won't take long",
    infoTitle: "What's happening",
    infoContent:
      "We're pushing an update or taking care of something small. Everything is fine \u2014 this is a routine part of keeping things running smoothly.",
    statusText: "Usually back in",
    statusValue: "under a minute",
    waitTitle: "While you wait",
    waitItem1: "Your data is safe and untouched",
    waitItem2: "No action needed on your end",
    waitItem3: "We'll be back before you know it",
    note: "Thanks for sticking around.",
    btnRefresh: "Refresh Page",
    btnHome: "Return to Home",
    contactTitle: "Need help? Reach out",
    contactEmail: "Email",
    contactTwitter: "@uLearnStatus",
  },
  es: {
    title: "Volvemos enseguida",
    subtitle: "Un momento \u2014 esto no tardará mucho",
    infoTitle: "Qué está pasando",
    infoContent:
      "Estamos publicando una actualización o resolviendo algo pequeño. Todo está bien \u2014 esto es parte del funcionamiento normal.",
    statusText: "Habitualmente volvemos en",
    statusValue: "menos de un minuto",
    waitTitle: "Mientras esperas",
    waitItem1: "Tus datos están seguros e intactos",
    waitItem2: "No necesitas hacer nada",
    waitItem3: "Estaremos de vuelta antes de que te des cuenta",
    note: "Gracias por tu paciencia.",
    btnRefresh: "Recargar página",
    btnHome: "Volver al inicio",
    contactTitle: "¿Necesitas ayuda?",
    contactEmail: "Email",
    contactTwitter: "@uLearnStatus",
  },
  fr: {
    title: "On revient tout de suite",
    subtitle: "Un instant \u2014 ça ne prendra pas longtemps",
    infoTitle: "Ce qui se passe",
    infoContent:
      "Nous déployons une mise à jour ou réglons quelque chose de mineur. Tout va bien \u2014 c'est une partie normale du bon fonctionnement.",
    statusText: "De retour en général en",
    statusValue: "moins d'une minute",
    waitTitle: "En attendant",
    waitItem1: "Vos données sont sûres et intactes",
    waitItem2: "Aucune action requise de votre part",
    waitItem3: "Nous serons de retour avant que vous le sachiez",
    note: "Merci pour votre patience.",
    btnRefresh: "Actualiser la page",
    btnHome: "Retour à l'accueil",
    contactTitle: "Besoin d'aide ?",
    contactEmail: "Email",
    contactTwitter: "@uLearnStatus",
  },
  it: {
    title: "Torniamo subito",
    subtitle: "Un momento \u2014 ci vorrà poco",
    infoTitle: "Cosa sta succedendo",
    infoContent:
      "Stiamo rilasciando un aggiornamento o sistemando qualcosa di piccolo. Va tutto bene \u2014 fa parte del normale funzionamento.",
    statusText: "Di solito torniamo in",
    statusValue: "meno di un minuto",
    waitTitle: "Nel frattempo",
    waitItem1: "I tuoi dati sono al sicuro e intatti",
    waitItem2: "Non devi fare nulla",
    waitItem3: "Saremo di ritorno prima che tu te ne accorga",
    note: "Grazie per la pazienza.",
    btnRefresh: "Aggiorna la pagina",
    btnHome: "Torna alla home",
    contactTitle: "Hai bisogno di aiuto?",
    contactEmail: "Email",
    contactTwitter: "@uLearnStatus",
  },
};

(function () {
  const segment = window.location.pathname.split("/").find((s) => s.length === 2);
  const lang = segment && translations[segment] ? segment : "en";
  const t = translations[lang];

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });
})();
