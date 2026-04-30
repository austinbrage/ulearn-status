const translations = {
  en: {
    pageTitle: "Contact — uLearn",
    pageDescription: "Get in touch with the uLearn team.",
    navBack: "Back to home",
    badge: "Contact",
    title: "Get in touch",
    desc: "Have a question, found a bug, or just want to say hi? I'd love to hear from you.",
    emailTitle: "Email",
    emailDesc:
      "The best way to reach us. We usually reply within 1–2 business days.",
    twitterTitle: "X (Twitter)",
    twitterDesc:
      "Follow for updates, announcements, and the occasional language learning tip.",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Service",
    footerHome: "Home",
  },
  es: {
    pageTitle: "Contacto — uLearn",
    pageDescription: "Ponete en contacto con el equipo de uLearn.",
    navBack: "Volver al inicio",
    badge: "Contacto",
    title: "Ponete en contacto",
    desc: "¿Tenés alguna pregunta, encontraste un bug o simplemente querés saludar? Me encantaría saber de vos.",
    emailTitle: "Email",
    emailDesc:
      "La mejor forma de contactarnos. Solemos responder en 1 o 2 días hábiles.",
    twitterTitle: "X (Twitter)",
    twitterDesc:
      "Seguinos para actualizaciones, anuncios y algún que otro consejo para aprender idiomas.",
    footerPrivacy: "Política de Privacidad",
    footerTerms: "Términos de Servicio",
    footerHome: "Inicio",
  },
  fr: {
    pageTitle: "Contact — uLearn",
    pageDescription: "Prenez contact avec l'équipe uLearn.",
    navBack: "Retour à l'accueil",
    badge: "Contact",
    title: "Prenez contact",
    desc: "Vous avez une question, trouvé un bug ou envie de dire bonjour ? Nous serions ravis de vous entendre.",
    emailTitle: "Email",
    emailDesc:
      "Le meilleur moyen de nous contacter. Nous répondons généralement sous 1 à 2 jours ouvrés.",
    twitterTitle: "X (Twitter)",
    twitterDesc:
      "Suivez-nous pour les mises à jour, les annonces et quelques conseils pour apprendre les langues.",
    footerPrivacy: "Politique de Confidentialité",
    footerTerms: "Conditions d'Utilisation",
    footerHome: "Accueil",
  },
  it: {
    pageTitle: "Contatto — uLearn",
    pageDescription: "Mettiti in contatto con il team di uLearn.",
    navBack: "Torna alla home",
    badge: "Contatto",
    title: "Contattaci",
    desc: "Hai una domanda, trovato un bug o vuoi semplicemente salutare? Ci farebbe piacere sentirti.",
    emailTitle: "Email",
    emailDesc:
      "Il modo migliore per contattarci. Di solito rispondiamo entro 1–2 giorni lavorativi.",
    twitterTitle: "X (Twitter)",
    twitterDesc:
      "Seguici per aggiornamenti, annunci e qualche consiglio per imparare le lingue.",
    footerPrivacy: "Informativa sulla Privacy",
    footerTerms: "Termini di Servizio",
    footerHome: "Home",
  },
};

(function () {
  var parts = window.location.pathname.split("/");
  var segment = parts.find(function (s) {
    return s.length === 2;
  });
  var lang = segment && translations[segment] ? segment : "en";
  var t = translations[lang];

  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    var key = el.dataset.i18n;
    if (t[key] === undefined) return;
    if (el.tagName === "META") el.setAttribute("content", t[key]);
    else if (el.tagName === "TITLE") el.textContent = t[key];
    else el.textContent = t[key];
  });

  if (lang !== "en") {
    document.querySelectorAll("[data-lang-href]").forEach(function (el) {
      el.href = "/" + lang + "/" + el.dataset.langHref;
    });
  }
})();
