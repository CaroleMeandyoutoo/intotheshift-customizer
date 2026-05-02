const ITS_KEY = "intotheshift_customizer_state_v1";

function itsLoad() {
  try {
    return JSON.parse(localStorage.getItem(ITS_KEY)) || {};
  } catch(e) {
    return {};
  }
}

function itsSave(state) {
  localStorage.setItem(ITS_KEY, JSON.stringify(state || {}));
}

function itsPatch(patch) {
  const current = itsLoad();
  const next = Object.assign({}, current, patch || {});
  itsSave(next);
  return next;
}

function itsSlugify(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "et")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function itsFormatDateFR(dateStr) {
  if (!dateStr) return "—";
  const p = String(dateStr).split("-");
  return p.length === 3 ? `${p[2]}/${p[1]}/${p[0]}` : dateStr;
}

function itsGetAdById(id) {
  return (window.ITS_CATALOGUE || []).find(ad => ad.id === id);
}

function itsClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function itsStartFromCatalogue(adId) {
  const ad = itsGetAdById(adId);
  if (!ad) return null;

  const state = {
    selectedAdId: ad.id,
    title: ad.title,
    theme: ad.theme,
    audience: ad.audience,
    tags: ad.tags || ["Base assistée par IA"],
    duration: ad.duration || "5 à 7 min",
    chapters: itsClone(ad.chapters || []),
    meta: {
      nom: "Autodiagnostic " + ad.title,
      titre: "",
      desc: "Campagne interne Mon entreprise sur " + ad.title + ".",
      slug: itsSlugify(ad.title),
      date_lancement: "",
      date_cloture: ""
    },
    intro: ad.intro || "",
    packPassations: "200",
    demographics: [
      { q:"À quelle catégorie appartenez-vous ?", opts:["Collaborateur·rice","Manager","Direction"], min_groupe:25 },
      { q:"Quel est votre service principal ?", opts:["Production","Maintenance","RH","Fonctions support","Autre"], min_groupe:10 }
    ],
    resources: [
      { titre:"Comprendre les bons réflexes", url:"https://www.monentreprise.fr/ressources/reflexes" },
      { titre:"Accéder aux consignes internes", url:"https://www.monentreprise.fr/ressources/consignes" }
    ]
  };

  itsSave(state);
  return state;
}
