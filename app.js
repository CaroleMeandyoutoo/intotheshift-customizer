function itsGetCurrentUserKey() {
  const userId =
    localStorage.getItem("its_user_id") ||
    localStorage.getItem("user_id") ||
    localStorage.getItem("id");

  const email =
    localStorage.getItem("its_user_email") ||
    localStorage.getItem("user_email") ||
    localStorage.getItem("email");

  const role =
    localStorage.getItem("its_user_role") ||
    localStorage.getItem("user_role") ||
    localStorage.getItem("role");

  if (userId) return "user_" + userId;
  if (email) return "email_" + String(email).toLowerCase().trim();

  return role ? "role_" + role : "anonymous";
}

function itsGetStorageKey() {
  return "intotheshift_customizer_state_v1_" + itsGetCurrentUserKey();
}

const ITS_LEGACY_KEY = "intotheshift_customizer_state_v1";
const ITS_API_BASE =
  window.ITS_API_BASE ||
  localStorage.getItem("its_api_base") ||
  (window.location.hostname === "localhost"
    ? "https://into-the-shift-studio-api-staging.osc-fr1.scalingo.io"
    : "https://into-the-shift-studio-api.osc-fr1.scalingo.io");

let itsSaveTimer = null;
let itsIsRestoringProject = false;

function itsGetToken() {
  return localStorage.getItem("its_token") || localStorage.getItem("token") || localStorage.getItem("auth_token") || "";
}

function itsGetCurrentProjectId() {
  return localStorage.getItem("its_current_project_id") || localStorage.getItem("its_current_ad_id") || "";
}

function itsSetCurrentProjectId(id) {
  if (!id) return;
  localStorage.setItem("its_current_project_id", String(id));
  localStorage.setItem("its_current_ad_id", String(id));
}

function itsClearCurrentProjectId() {
  localStorage.removeItem("its_current_project_id");
  localStorage.removeItem("its_current_ad_id");
}

function itsLoad() {
  try {
    return JSON.parse(localStorage.getItem(itsGetStorageKey())) || {};
  } catch(e) {
    return {};
  }
}

function itsInferCurrentStep() {
  const page = window.location.pathname.split("/").pop() || "";
  if (page.includes("questions")) return "questions";
  if (page.includes("parametrage")) return "parametrage";
  if (page.includes("campagne")) return "campagne";
  if (page.includes("validation")) return "validation";
  return "";
}

function itsProjectTitleFromState(state) {
  const p = state?.parametrage || state?.meta || {};
  return p.nom || p.titre || state?.title || state?.subject || state?.theme || "Nouveau projet";
}

function itsSave(state) {
  const safeState = state || {};
  const step = safeState.current_step || safeState.currentStep || safeState.step || itsInferCurrentStep();

  if (step) {
    safeState.current_step = step;
    safeState.step = step;
  }

  localStorage.setItem(itsGetStorageKey(), JSON.stringify(safeState));

  if (!itsIsRestoringProject) {
    itsScheduleProjectSync(safeState);
  }
}

function itsScheduleProjectSync(state) {
  const token = itsGetToken();
  if (!token) return;

  clearTimeout(itsSaveTimer);
  itsSaveTimer = setTimeout(() => itsSyncProjectToApi(state), 700);
}

async function itsSyncProjectToApi(state) {
  const token = itsGetToken();
  if (!token || !state || typeof state !== "object") return;

  const projectId = itsGetCurrentProjectId();
  const title = itsProjectTitleFromState(state);
  const currentStep = state.current_step || state.step || itsInferCurrentStep();
  const configSent = state.configTransmise === true || state.config_transmise === true || state.submitted === true;
  const status = state.status || (configSent ? "sent" : "draft");

  const body = {
    projectId: projectId || undefined,
    title,
    status,
    currentStep,
    data: state
  };

  try {
    const res = await fetch(ITS_API_BASE + "/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) return;

    const json = await res.json();
    const savedId = json?.project?.id;
    if (savedId) itsSetCurrentProjectId(savedId);
  } catch(e) {
    console.warn("Sauvegarde projet API impossible", e);
  }
}

function itsPatch(patch) {
  const current = itsLoad();
  const next = Object.assign({}, current, patch || {});
  itsSave(next);
  return next;
}

function itsClear() {
  localStorage.removeItem(itsGetStorageKey());
  itsClearCurrentProjectId();
}

function itsClearLegacyDraft() {
  localStorage.removeItem(ITS_LEGACY_KEY);
}

function itsRestoreProject(project) {
  if (!project) return false;

  const rawData = project.data || project.payload || project.configuration || {};
  const data = typeof rawData === "string" ? JSON.parse(rawData || "{}") : rawData;

  if (!data || typeof data !== "object") return false;

  itsIsRestoringProject = true;
  itsSetCurrentProjectId(project.id || project.project_id);
  localStorage.setItem(itsGetStorageKey(), JSON.stringify(data));
  itsIsRestoringProject = false;

  return true;
}

function itsResumeUrlForProject(project) {
  const rawStep = String(project?.currentStep || project?.current_step || project?.data?.current_step || project?.data?.step || "").toLowerCase();
  const id = encodeURIComponent(project?.id || project?.project_id || "");
  const suffix = id ? `?projectId=${id}` : "";

  if (rawStep.includes("validation")) return "validation.html" + suffix;
  if (rawStep.includes("campagne")) return "campagne.html" + suffix;
  if (rawStep.includes("param")) return "parametrage.html" + suffix;
  return "questions.html" + suffix;
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

  itsClearCurrentProjectId();

  const state = {
    selectedAdId: ad.id,
    title: ad.title,
    theme: ad.theme,
    audience: ad.audience,
    tags: ad.tags || ["Base assistée par IA", "Aide à la rédaction", "Relecture obligatoire"],
    duration: ad.duration || "8 à 12 min",
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
    packPassations: "",
    demographics: [
      { q:"À quelle catégorie appartenez-vous ?", opts:["Collaborateur·rice","Manager","Direction"], min_groupe:25 },
      { q:"Quel est votre service principal ?", opts:["Production","Maintenance","RH","Fonctions support","Autre"], min_groupe:10 }
    ],
    resources: [
      { titre:"Comprendre les bons réflexes", url:"https://www.monentreprise.fr/ressources/reflexes" },
      { titre:"Accéder aux consignes internes", url:"https://www.monentreprise.fr/ressources/consignes" }
    ],
    step: "questions",
    current_step: "questions"
  };

  itsSave(state);
  return state;
}


