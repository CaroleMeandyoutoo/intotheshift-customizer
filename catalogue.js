(function () {

  // ─────────────────────────────────────────────────────────────────────────
  //  BADGES
  // ─────────────────────────────────────────────────────────────────────────

  const BADGES = {
  IA:      "Base assistée par IA",
  REVIEW:  "Relecture obligatoire",
  AIDE:    "Aide à la rédaction",
  TBF:     "Conçu par The Big Factory"
};

  // ─────────────────────────────────────────────────────────────────────────
  //  THÈMES CLASSIQUES — réponses génériques
  // ─────────────────────────────────────────────────────────────────────────

  function answerSets(domain, seed) {
    const sets = {
      securite: [
        [
          { text: "Je laisse faire, car l'équipe connaît sûrement la situation.", score: 0 },
          { text: "Je fais une remarque rapide si le risque me semble important.", score: 1 },
          { text: "Je signale le point avec des faits précis et sans accuser.", score: 2 },
          { text: "Je contribue à clarifier la règle pour éviter que cela se reproduise.", score: 2 }
        ],
        [
          { text: "Je privilégie l'avancement, la vérification pourra attendre.", score: 0 },
          { text: "Je vérifie seulement les points qui me semblent les plus critiques.", score: 1 },
          { text: "Je maintiens l'étape de sécurité même si cela prend plus de temps.", score: 2 }
        ],
        [
          { text: "Je considère que chacun est responsable de ses propres gestes.", score: 0 },
          { text: "J'alerte discrètement si je suis directement concerné·e.", score: 1 },
          { text: "J'interviens avec tact pour éviter qu'un risque collectif s'installe.", score: 2 }
        ]
      ],
      qvt: [
        [
          { text: "Je laisse la personne gérer, chacun a sa manière de travailler.", score: 0 },
          { text: "Je prends des nouvelles de manière informelle si l'occasion se présente.", score: 1 },
          { text: "Je propose un échange factuel sur la charge ou les priorités.", score: 2 }
        ],
        [
          { text: "Je m'adapte, même si cela désorganise mon travail.", score: 0 },
          { text: "Je signale que c'est compliqué, sans forcément demander d'arbitrage.", score: 1 },
          { text: "Je clarifie les priorités et les délais avant de m'engager.", score: 2 }
        ],
        [
          { text: "J'évite d'intervenir pour ne pas créer de tension.", score: 0 },
          { text: "Je temporise et j'attends de voir si la situation se calme.", score: 1 },
          { text: "Je contribue à remettre les faits et les besoins au centre de l'échange.", score: 2 },
          { text: "Je mobilise un relais si la situation dépasse le cadre habituel.", score: 2 }
        ]
      ],
      management: [
        [
          { text: "J'avance avec les informations disponibles, quitte à ajuster plus tard.", score: 0 },
          { text: "Je demande quelques précisions mais sans formaliser le cadre.", score: 1 },
          { text: "Je clarifie les attendus, les rôles et les prochaines étapes.", score: 2 }
        ],
        [
          { text: "Je donne mon avis directement, même si la personne peut mal le prendre.", score: 0 },
          { text: "Je formule un retour général pour éviter d'être trop frontal·e.", score: 1 },
          { text: "Je m'appuie sur des faits précis et une piste d'amélioration concrète.", score: 2 }
        ],
        [
          { text: "Je considère que les personnes doivent s'adapter d'elles-mêmes.", score: 0 },
          { text: "J'accompagne ponctuellement quand une difficulté apparaît.", score: 1 },
          { text: "Je crée des repères réguliers pour soutenir l'autonomie et l'engagement.", score: 2 }
        ]
      ],
      environnement: [
        [
          { text: "Je fais comme d'habitude, l'impact est probablement limité.", score: 0 },
          { text: "Je choisis l'option la plus simple si elle reste raisonnable.", score: 1 },
          { text: "Je questionne l'impact réel et propose une option plus sobre.", score: 2 }
        ],
        [
          { text: "Je préfère éviter le sujet pour ne pas passer pour moralisateur·rice.", score: 0 },
          { text: "Je suggère une alternative si elle ne complique pas trop l'organisation.", score: 1 },
          { text: "Je propose un ajustement concret, réaliste et mesurable.", score: 2 }
        ],
        [
          { text: "Je traite l'urgence sans intégrer le critère environnemental.", score: 0 },
          { text: "Je cherche un compromis mais sans remettre en cause la demande.", score: 1 },
          { text: "J'intègre l'impact environnemental dans l'arbitrage dès le départ.", score: 2 }
        ]
      ],
      ethique: [
        [
          { text: "Je règle la situation rapidement, puisqu'elle paraît mineure.", score: 0 },
          { text: "Je demande un avis informel à une personne de confiance.", score: 1 },
          { text: "Je vérifie le cadre applicable avant de décider.", score: 2 },
          { text: "Je trace ou signale le point si le risque est réel.", score: 2 }
        ],
        [
          { text: "Je garde l'information pour moi afin d'éviter de compliquer la relation.", score: 0 },
          { text: "J'attends de voir si la situation se confirme.", score: 1 },
          { text: "Je documente les faits et j'utilise le bon canal de conseil ou d'alerte.", score: 2 }
        ],
        [
          { text: "Je me fie à mon intuition, car les règles ne couvrent pas tout.", score: 0 },
          { text: "Je cherche une solution prudente sans forcément formaliser.", score: 1 },
          { text: "Je clarifie le risque, les personnes concernées et la règle à appliquer.", score: 2 }
        ]
      ],
      sec_nucl: [
        [
          { text: "Je fais confiance au retour de l'équipe et poursuis l'opération.", score: 0 },
          { text: "Je note le point et le signale en fin d'opération.", score: 1 },
          { text: "Je stoppe, signale formellement et attends une validation avant de reprendre.", score: 2 }
        ],
        [
          { text: "Je m'appuie sur l'expérience collective — la procédure peut être adaptée.", score: 0 },
          { text: "J'interpelle le responsable sans bloquer l'opération.", score: 1 },
          { text: "Je remonte le point formellement et n'avance pas sans validation claire.", score: 2 }
        ],
        [
          { text: "Je laisse passer : l'écart est mineur et n'a pas eu de conséquence.", score: 0 },
          { text: "J'en parle informellement à un collègue pour avoir son avis.", score: 1 },
          { text: "Je déclenche le processus de signalement prévu, même pour un écart apparemment mineur.", score: 2 },
          { text: "Je documente et contribue à l'analyse de retour d'expérience.", score: 2 }
        ]
      ],
      sec_btp: [
        [
          { text: "Je continue : la pression du planning ne laisse pas d'autre choix.", score: 0 },
          { text: "Je signale verbalement mais ne bloque pas les travaux.", score: 1 },
          { text: "Je stoppe l'activité concernée jusqu'à correction de la situation.", score: 2 }
        ],
        [
          { text: "Je laisse l'encadrement gérer : ce n'est pas directement ma zone.", score: 0 },
          { text: "J'alerte verbalement la personne concernée.", score: 1 },
          { text: "Je signale formellement et m'assure que la correction est effectuée.", score: 2 },
          { text: "Je contribue à trouver une solution immédiate et documente le problème.", score: 2 }
        ],
        [
          { text: "Je finalise la tâche en cours avant d'agir.", score: 0 },
          { text: "Je vérifie l'urgence réelle avant d'intervenir.", score: 1 },
          { text: "Je réagis immédiatement pour éviter toute aggravation.", score: 2 }
        ]
      ]
    };
    const selected = sets[domain] || sets.management;
    return selected[seed % selected.length];
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  THÈMES CLASSIQUES — profils génériques
  //  Seuils : 0 → 0.99 → 1.59 → 2 (bornes jointes)
  // ─────────────────────────────────────────────────────────────────────────

  function makeProfiles(chapterTitle) {
    return [
      {
        level: "Repères à consolider",
        min: 0, max: 0.99,
        title: "Repères à consolider — " + chapterTitle,
        summary: "Les réflexes existent, mais restent encore irréguliers.",
        description: "Sur cette dimension, les repères ne sont pas encore assez stables pour guider les décisions dans les situations moins évidentes. L'enjeu est de mieux identifier les situations sensibles et de s'appuyer davantage sur le cadre, les faits ou les bons relais."
      },
      {
        level: "Pratiques en construction",
        min: 0.99, max: 1.59,
        title: "Pratiques en construction — " + chapterTitle,
        summary: "Les pratiques sont présentes, mais peuvent se fragiliser dans les zones grises.",
        description: "Sur cette dimension, les bases sont présentes. L'enjeu est maintenant de gagner en constance, de mieux formaliser les arbitrages et de ne pas rester seul·e face aux situations ambiguës."
      },
      {
        level: "Réflexes installés",
        min: 1.59, max: 2,
        title: "Réflexes installés — " + chapterTitle,
        summary: "Les réflexes sont structurés et mobilisables dans le quotidien.",
        description: "Sur cette dimension, les comportements sont installés. Ils peuvent devenir un point d'appui pour le collectif, notamment pour clarifier les règles, sécuriser les pratiques et encourager des décisions plus responsables."
      }
    ];
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  V2 — VARIATION PAR AUTODIAG
  //  Calcule un offset déterministe à partir du préfixe (ID de l'AD)
  //  pour que chaque autodiag pioche dans une zone différente de la bank
  // ─────────────────────────────────────────────────────────────────────────

  const VARIANT_OFFSETS = {
    "culture-securite-terrain":    0,
    "presquaccidents-signalement":  5,
    "acces-sites-surete":          10,
    "managers-securite":           15,
    "coactivite-sous-traitance":    20,
    "epi-gestes-securite":          25,
    "securite-manager-arbitrage":   30,
    "securite-nucleaire":            0,
    "securite-chantier-btp":         0,
    "rps-signaux-faibles":          0,
    "charge-priorites":             5,
    "cooperation-climat":          10,
    "manager-qvt-rps":             15,
    "teletravail-hybridation":     20,
    "epuisement-prevention":       30,
    "retour-apres-absence":        35,
    "manager-signaux-rps":         40,
    "changement-reflexes":          0,
    "feedback-managerial":          5,
    "manager-engageant-tbf":       10,
    "pilotage-projet":             15,
    "conduite-changement":         20,
    "arbitrage-priorisation":      25,
    "collaboration-interequipes":  31,
    "responsabilisation-equipe":   40,
    "transformation-digitale":     50,
    "sobriete-quotidien":           0,
    "dechets-ressources":           5,
    "achats-responsables":         10,
    "manager-transition-eco":      15,
    "conflits-interets":            0,
    "cadeaux-invitations":          5,
    "alerte-ethique":              10,
    "manager-compliance":          15
  };

  function makeVariantOffset(prefix) {
    return VARIANT_OFFSETS[prefix] || 0;
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  V2 — TAGS MÉTIER PAR CHAPITRE
  //  Enrichit chaque question avec des tags spécifiques au domaine et au
  //  chapitre, utiles pour le filtrage, les analytics et les futures IA
  // ─────────────────────────────────────────────────────────────────────────

  function chaptersTags(domain, chapterIndex) {
    var map = {
      securite: [
        ["Risque terrain", "Observation", "Prévention", "EPI", "Détection"],
        ["Gestes sûrs", "Pression opérationnelle", "Réflexes", "Procédure", "EPI"],
        ["Collectif", "Intervention", "Culture sécurité", "Coactivité", "Sous-traitance"],
        ["Signalement", "Alerte", "REX", "Presqu'accident", "Urgence opérationnelle"]
      ],
      sec_nucl: [
        ["Nucléaire", "Questioning attitude", "Rigueur", "Sûreté"],
        ["Nucléaire", "Procédure", "Référentiel", "Gamme opératoire"],
        ["Nucléaire", "Situation imprévue", "Escalade", "Sûreté"],
        ["Nucléaire", "Déclaration", "REX", "Culture de sûreté"]
      ],
      sec_btp: [
        ["BTP", "Chantier", "EPI", "EPC", "Risque terrain"],
        ["BTP", "Coactivité", "Corps de métier", "Coordination chantier"],
        ["BTP", "PPSPS", "Permis de travail", "Habilitation"],
        ["BTP", "Incident chantier", "Urgence", "Signalement"]
      ],
      qvt: [
        ["Signaux faibles", "RPS", "Vigilance", "Isolement", "Prévention"],
        ["Charge de travail", "Priorisation", "Urgences", "Épuisement professionnel", "Droit à la déconnexion"],
        ["Relations", "Coopération", "Tensions", "Climat de travail", "Télétravail"],
        ["Relais RH", "Alerte", "Soutien", "Retour d'absence", "Orientation"]
      ],
      management: [
        ["Cadre", "Clarté", "Rôles", "Changement", "Transformation"],
        ["Incertitude", "Coopération", "Agilité", "Résistance au changement", "Arbitrage"],
        ["Feedback", "Communication", "Retour", "Responsabilisation", "Engagement"],
        ["Pratiques", "Ancrage", "Autonomie", "Collaboration interéquipes", "Transformation digitale"]
      ],
      environnement: [
        ["Impact",      "Gestes quotidiens", "Empreinte"],
        ["Sobriété",    "Arbitrage",         "Choix"],
        ["Coopération", "Usages",            "Parties prenantes"],
        ["Durabilité",  "Habitudes",         "Long terme"]
      ],
      ethique: [
        ["Zone grise",    "Conformité",        "Risque"],
        ["Conseil",       "Doute",             "Conflit d'intérêts"],
        ["Documentation", "Alerte",            "Protection"],
        ["Culture",       "Règles",            "Vigilance"]
      ]
    };
    var domainTags = map[domain] || map.management;
    return domainTags[chapterIndex % domainTags.length] || [];
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  THÈMES CLASSIQUES — banques de questions
  // ─────────────────────────────────────────────────────────────────────────

  const questionBanks = {
    securite: [
      "Une intervention prend du retard et l'équipe envisage de raccourcir une étape de vérification. Que faites-vous ?",
      "Vous remarquez qu'un équipement de protection est mal porté dans une zone active. Quelle réaction adoptez-vous ?",
      "Un prestataire externe intervient sans connaître clairement les règles du site. Que faites-vous ?",
      "Un presque-accident vient de se produire mais personne ne semble vouloir le signaler. Que faites-vous ?",
      "Une porte d'accès reste ouverte alors qu'elle devrait être fermée. Comment réagissez-vous ?",
      "Une personne inconnue circule dans une zone où l'accès est habituellement contrôlé. Que faites-vous ?",
      "Un collègue contourne une consigne pour gagner quelques minutes. Quelle est votre réaction ?",
      "Un objet encombre une zone de passage utilisée par plusieurs personnes. Que faites-vous ?",
      "Une alerte est minimisée avec la phrase : ça arrive souvent ici. Comment vous positionnez-vous ?",
      "Un matériel semble défectueux mais reste utilisé pour terminer une tâche. Que faites-vous ?",
      "Vous observez une situation dangereuse mais vous n'êtes pas directement responsable de l'activité. Que faites-vous ?",
      "Une consigne de sécurité vient de changer mais tout le monde n'a pas l'air informé. Quelle réaction adoptez-vous ?",
      "Une urgence opérationnelle pousse l'équipe à travailler dans la précipitation. Que privilégiez-vous ?",
      "Un signalement précédent n'a pas donné lieu à un retour visible. Comment réagissez-vous la fois suivante ?",
      "Vous constatez un écart répété entre la procédure et la pratique réelle. Que faites-vous ?",
      "Une personne nouvelle dans l'équipe hésite à poser une question sur une règle de sécurité. Que faites-vous ?",
      "Une zone est mal rangée après une intervention. Quelle réaction adoptez-vous ?",
      "Un accès badge est prêté pour dépanner quelqu'un. Que faites-vous ?",
      "Un briefing sécurité est écourté car la journée est chargée. Comment réagissez-vous ?",
      "Vous identifiez un risque qui concerne plusieurs équipes. Que faites-vous ?",
      "Deux équipes travaillent simultanément dans la même zone sans avoir coordonné leurs interventions. Que faites-vous ?",
      "Un sous-traitant réalise une tâche sans avoir reçu le plan de prévention. Quelle est votre réaction ?",
      "Un EPI obligatoire est inconfortable et ralentit l'exécution de la tâche. Comment réagissez-vous ?",
      "Un équipement de protection collectif a été déplacé sans raison apparente. Que faites-vous ?",
      "Une zone balisée est franchie par des personnes qui ne participent pas à l'intervention. Que faites-vous ?",
      "Un intervenant externe ne connaît pas les consignes de sécurité du site. Comment réagissez-vous ?",
      "Une tâche nécessite une habilitation spécifique, mais la personne disponible ne l'a pas. Que faites-vous ?",
      "Vous constatez qu'un EPI est endommagé mais encore utilisé. Quelle réaction adoptez-vous ?",
      "Un permis de travail est en cours mais les conditions ont changé depuis sa délivrance. Que faites-vous ?",
      "Une procédure d'urgence est affichée mais peu de personnes semblent la connaître. Comment réagissez-vous ?",
      "Un travailleur isolé n'a pas déclenché sa vérification périodique depuis un moment. Que faites-vous ?",
      "Vous observez de la fatigue visible chez un collègue qui doit réaliser une tâche à risque. Que faites-vous ?",
      "Un mode opératoire n'a pas été actualisé après un changement d'équipement. Quelle réaction adoptez-vous ?",
      "Une situation d'urgence survient mais le responsable sécurité n'est pas joignable. Que faites-vous ?",
      "Une consigne de sécurité semble inadaptée à la réalité du terrain. Comment vous positionnez-vous ?",
      "Un incident implique à la fois votre équipe et un prestataire. Qui doit prendre en charge le signalement ?",
      "Un exercice d'évacuation est programmé pendant une période de forte activité. Comment réagissez-vous ?",
      "Une étiquette de signalisation est illisible ou absente sur un équipement potentiellement dangereux. Que faites-vous ?",
      "Un accès à une zone dangereuse est possible sans habilitation requise en raison d'un défaut de balisage. Que faites-vous ?"
    ],
    sec_nucl: [
      "Vous constatez un écart entre la procédure écrite et la pratique réelle lors d'une opération. Que faites-vous ?",
      "Une déviation technique mineure survient en cours d'opération. L'équipe pense pouvoir la gérer sans escalade. Que faites-vous ?",
      "Vous avez un doute sur l'interprétation d'un référentiel technique mais la pression de délai est forte. Comment réagissez-vous ?",
      "Une gamme d'intervention comporte une étape ambiguë. Votre collègue l'interprète différemment de vous. Que faites-vous ?",
      "Un événement significatif de sûreté semble s'être produit mais aucun dommage n'est visible. Quelle réaction adoptez-vous ?",
      "Le chef de chantier vous demande de commencer une intervention avant que la consignation soit complète. Que faites-vous ?",
      "Vous êtes témoin d'un contournement de procédure qui n'a entraîné aucun incident. Comment vous positionnez-vous ?",
      "Une situation non prévue par les procédures se présente lors d'une opération. Que faites-vous ?",
      "Un collègue minimise l'importance d'un signalement car il pense que ça n'a pas de conséquence réelle. Quelle est votre réaction ?",
      "Vous identifiez un signal faible qui pourrait être précurseur d'un problème plus grave. Que faites-vous ?",
      "La pression de remise en service d'un équipement est forte, mais une question technique reste ouverte. Comment réagissez-vous ?",
      "Un prestataire habituel semble moins rigoureux dans l'application des règles. Que faites-vous ?",
      "Vous constatez qu'une modification temporaire d'installation n'a pas été correctement documentée. Que faites-vous ?",
      "Un retour d'expérience d'un autre site mentionne un incident similaire à une situation rencontrée chez vous. Comment réagissez-vous ?",
      "Vous avez eu un doute en cours d'opération mais avez continué. L'opération s'est bien passée. Que faites-vous a posteriori ?",
      "Un opérateur expérimenté déclare qu'une vérification systématique est inutile dans ce cas précis. Que faites-vous ?",
      "Une nouvelle recrue signale une anomalie que personne d'autre n'avait remarquée. Quelle réaction adoptez-vous ?",
      "Vous êtes fatigué en fin de poste et devez encore réaliser une vérification documentée. Que faites-vous ?",
      "Une situation ambiguë se présente entre une règle formelle et une pratique acceptée de longue date. Comment vous positionnez-vous ?",
      "Un défaut d'information pourrait induire un autre intervenant en erreur sur l'état d'un équipement. Que faites-vous ?"
    ],
    sec_btp: [
      "Vous débutez une journée sur chantier et constatez que le balisage de la veille a été modifié sans information. Que faites-vous ?",
      "Un engin de chantier manœuvre dans une zone piétonne sans signalement préalable. Quelle réaction adoptez-vous ?",
      "Une fouille est ouverte sans étaiement alors que le terrain est instable. Que faites-vous ?",
      "Vous devez travailler en hauteur mais le harnais disponible n'a pas été vérifié récemment. Comment réagissez-vous ?",
      "Deux corps de métier se trouvent simultanément dans la même zone sans coordination préalable. Que faites-vous ?",
      "Un chef de chantier demande d'avancer les travaux avant que les protections collectives ne soient en place. Quelle est votre réaction ?",
      "Un intérimaire commence une tâche risquée sans avoir reçu l'accueil sécurité chantier. Que faites-vous ?",
      "Les conditions météo se dégradent et rendent dangereuse la poursuite de certains travaux. Comment vous positionnez-vous ?",
      "Un matériel de levage est utilisé sans vérification périodique à jour. Quelle réaction adoptez-vous ?",
      "Les protections contre les chutes ne couvrent pas l'ensemble de la zone concernée. Que faites-vous ?",
      "Un sous-traitant ne respecte pas les consignes de sécurité spécifiques au chantier. Comment réagissez-vous ?",
      "Des travaux de soudure sont réalisés à proximité de matériaux inflammables non protégés. Que faites-vous ?",
      "Le délai est avancé et plusieurs équipes travaillent en même temps dans un espace réduit. Quelle réaction adoptez-vous ?",
      "Un permis de feu a expiré mais les travaux n'ont pas encore été terminés. Que faites-vous ?",
      "Vous constatez qu'une canalisation ou un câble n'est pas à l'endroit indiqué sur les plans. Comment réagissez-vous ?",
      "Un opérateur travaille seul dans une tranchée sans dispositif de surveillance. Quelle réaction adoptez-vous ?",
      "Des déchets de chantier sont stockés sur un cheminement d'évacuation d'urgence. Que faites-vous ?",
      "Un incident mineur survient mais l'équipe préfère ne pas le signaler pour ne pas ralentir le chantier. Comment vous positionnez-vous ?",
      "La réception de travaux révèle que certaines protections définitives n'ont pas été posées. Que faites-vous ?",
      "Un nouvel arrivant sur le chantier n'a pas eu de présentation des risques spécifiques de la zone. Quelle réaction adoptez-vous ?"
    ],
    qvt: [
      "Vous constatez qu'une personne répond régulièrement très tard le soir. Que faites-vous ?",
      "Une réunion est ajoutée à la dernière minute sur un créneau déjà saturé. Quelle réaction adoptez-vous ?",
      "Un livrable urgent crée des tensions entre deux équipes. Que faites-vous ?",
      "Vous avez du mal à tenir vos priorités mais personne ne semble disponible pour en parler. Comment réagissez-vous ?",
      "Un collègue semble s'isoler progressivement des échanges collectifs. Que faites-vous ?",
      "Une personne fait une remarque sèche en réunion après plusieurs semaines tendues. Quelle réaction adoptez-vous ?",
      "Une urgence est présentée comme prioritaire alors que tout est déjà prioritaire. Que faites-vous ?",
      "Vous recevez plusieurs demandes contradictoires dans la même journée. Comment vous positionnez-vous ?",
      "Un irritant récurrent crée de la fatigue dans l'équipe mais personne ne le traite. Que faites-vous ?",
      "Une personne minimise sa surcharge en disant qu'elle va tenir encore un peu. Quelle réaction adoptez-vous ?",
      "Une réunion déborde régulièrement sur les temps de pause ou de fin de journée. Que faites-vous ?",
      "Un désaccord de fond se transforme en tension personnelle. Comment réagissez-vous ?",
      "Une personne prend beaucoup de tâches supplémentaires sans demander d'aide. Que faites-vous ?",
      "Vous sentez que votre charge devient difficile à absorber durablement. Quelle réaction adoptez-vous ?",
      "Une décision organisationnelle crée de l'incompréhension et des rumeurs. Que faites-vous ?",
      "Un collègue vous confie une difficulté mais vous ne savez pas quoi répondre. Comment réagissez-vous ?",
      "Une équipe voisine sollicite souvent votre aide dans l'urgence. Que faites-vous ?",
      "Un canal de discussion devient le lieu de remarques tendues ou passives-agressives. Quelle réaction adoptez-vous ?",
      "Une personne revient après une absence et semble vouloir reprendre trop vite. Que faites-vous ?",
      "Une charge invisible repose toujours sur les mêmes personnes. Comment réagissez-vous ?",
      "En télétravail, vous finissez régulièrement votre journée bien après l'horaire habituel. Que faites-vous ?",
      "Un collègue en distanciel est de moins en moins réactif lors des réunions d'équipe. Quelle réaction adoptez-vous ?",
      "Vous constatez que les personnes en présentiel ont plus facilement accès aux décisions que celles à distance. Que faites-vous ?",
      "Une réunion hybride crée régulièrement un déséquilibre entre participants en salle et ceux à distance. Comment réagissez-vous ?",
      "Vous n'arrivez plus à déconnecter en fin de journée lors des semaines entièrement en télétravail. Quelle réaction adoptez-vous ?",
      "Un collègue en hybride semble moins bien informé que les autres des décisions prises en présentiel. Que faites-vous ?",
      "Votre espace de télétravail ne vous permet pas de travailler dans de bonnes conditions. Comment vous positionnez-vous ?",
      "Vous ressentez une forme d'isolement lors des semaines entièrement à distance. Que faites-vous ?",
      "Un désaccord surgit entre collègues sur le nombre de jours de présence attendus dans l'équipe. Quelle réaction adoptez-vous ?",
      "Vous observez que certains membres de l'équipe évitent systématiquement les jours en présentiel. Que faites-vous ?",
      "Vous vous réveillez régulièrement fatigué·e avant même de commencer la journée. Que faites-vous ?",
      "Des tâches qui vous plaisaient habituellement vous semblent désormais pesantes et difficiles. Quelle réaction adoptez-vous ?",
      "Vous avez du mal à vous souvenir des dernières fois où vous avez réellement récupéré. Que faites-vous ?",
      "Un collègue revient d'un arrêt maladie et semble vouloir rattraper immédiatement tout ce qu'il a manqué. Que faites-vous ?",
      "Vous sentez que vous n'arrivez plus à vous investir comme avant dans votre travail. Comment vous positionnez-vous ?",
      "Une personne en retour d'absence semble éviter de parler de ce qui s'est passé. Quelle réaction adoptez-vous ?",
      "Vous avez pris l'habitude de ne jamais refuser une demande supplémentaire, même quand vous êtes déjà saturé·e. Que faites-vous ?",
      "Un collègue vous confie qu'il envisage de prendre un arrêt mais qu'il hésite par peur du regard des autres. Que faites-vous ?",
      "Vous sentez que vos limites ne sont pas respectées dans l'organisation de votre charge. Comment réagissez-vous ?",
      "Une personne de retour après une longue absence est confrontée à des changements importants dans son équipe. Que faites-vous ?",
      "Un membre de votre équipe semble de moins en moins impliqué sans raison apparente. Que faites-vous ?",
      "Lors d'un échange, un collègue vous dit qu'il ne se sent plus à sa place dans l'équipe. Comment réagissez-vous ?",
      "Deux personnes de votre équipe ont visiblement des tensions mais personne n'en parle ouvertement. Que faites-vous ?",
      "Un collaborateur traverse une période personnelle difficile qui commence à affecter son travail. Comment vous positionnez-vous ?",
      "Vous constatez qu'un collègue fait des erreurs inhabituelles depuis quelques semaines. Quelle réaction adoptez-vous ?",
      "Un collègue vous demande si vous pouvez alléger sa charge. Vous n'avez pas de marge immédiate. Que faites-vous ?",
      "Lors d'une réunion, quelqu'un fond en larmes brièvement. Comment réagissez-vous ?",
      "Vous suspectez qu'un collègue est en épuisement professionnel mais il nie toute difficulté. Que faites-vous ?",
      "Un collègue vous indique qu'il se sent mal dans l'équipe sans pouvoir préciser pourquoi. Comment réagissez-vous ?",
      "La charge de votre équipe dépasse ce qui est tenable mais vous n'avez pas d'arbitrage de votre hiérarchie. Que faites-vous ?",
      "Un membre de l'équipe signale qu'il ne peut pas tenir un délai sans explication supplémentaire. Quelle réaction adoptez-vous ?",
      "Un collègue orienté vers les ressources RH revient vous voir sans avoir contacté personne. Que faites-vous ?",
      "Vous observez un changement progressif dans le comportement d'un collègue depuis une réorganisation. Comment réagissez-vous ?",
      "Une personne est clairement en difficulté mais refuse toute aide formelle. Que faites-vous ?",
      "Votre équipe sort d'une période de forte pression. Certains semblent ne pas décompresser. Quelle réaction adoptez-vous ?",
      "Un collègue ne prend jamais ses congés et semble en tirer une certaine fierté. Que faites-vous ?",
      "Lors du retour d'absence d'un collègue, l'équipe n'avait pas vraiment préparé son accueil. Que faites-vous ?",
      "Vous sentez que vous n'avez pas les ressources suffisantes pour accompagner la situation difficile d'un collègue. Comment réagissez-vous ?",
      "Un collègue développe une dépendance au travail qui commence à inquiéter l'entourage. Que faites-vous ?",
      "Vous constatez que votre équipe fonctionne à flux tendu depuis trop longtemps sans régulation. Comment vous positionnez-vous ?"
    ],
    management: [
      "Deux personnes n'ont pas la même compréhension du livrable attendu. Que faites-vous ?",
      "Une demande urgente remet en cause les priorités de la semaine. Quelle réaction adoptez-vous ?",
      "Une personne avec qui vous travaillez contourne le nouveau process pour gagner du temps. Que faites-vous ?",
      "Une réunion projet se termine sans décision claire sur les prochaines étapes. Comment réagissez-vous ?",
      "Vous recevez un feedback direct sur votre manière d'animer un échange. Que faites-vous ?",
      "Un collègue vous remet un livrable incomplet juste avant une échéance. Quelle réaction adoptez-vous ?",
      "Une personne demande un retour mais semble sensible aux critiques. Comment formulez-vous votre feedback ?",
      "Un changement d'outil crée des résistances dans l'équipe projet. Que faites-vous ?",
      "Un objectif est fixé mais les moyens disponibles ne semblent pas alignés. Comment réagissez-vous ?",
      "Une personne attend une validation sur chaque décision, même mineure. Que faites-vous ?",
      "Un projet avance mais les rôles deviennent flous. Quelle réaction adoptez-vous ?",
      "Une difficulté est connue mais chacun pense qu'elle relève de quelqu'un d'autre. Que faites-vous ?",
      "Une décision change en cours de route sans être clairement expliquée. Comment vous positionnez-vous ?",
      "Une personne très impliquée prend toute la place dans les échanges projet. Que faites-vous ?",
      "Un retard apparaît mais personne n'ose le dire clairement. Quelle réaction adoptez-vous ?",
      "Un retour d'expérience est organisé mais chacun reste général et prudent. Que faites-vous ?",
      "Une nouvelle méthode est lancée alors que l'ancienne n'est pas totalement stabilisée. Comment réagissez-vous ?",
      "Un contributeur dit oui à tout mais ne tient pas ses engagements. Que faites-vous ?",
      "Une tension apparaît entre qualité attendue et délai disponible. Quelle réaction adoptez-vous ?",
      "Après plusieurs feedbacks, les mêmes difficultés reviennent. Que faites-vous ?",
      "Un nouveau process est déployé sans que les équipes n'aient été consultées. Comment réagissez-vous ?",
      "Une réorganisation est annoncée mais les nouvelles responsabilités ne sont pas clarifiées. Que faites-vous ?",
      "Vous constatez que les résistances au changement se manifestent par des retards répétés plutôt que par des refus explicites. Quelle réaction adoptez-vous ?",
      "Un outil numérique est imposé mais il ne correspond pas aux usages réels de votre équipe. Que faites-vous ?",
      "Une transformation importante est lancée alors que l'équipe est déjà en surcharge. Comment vous positionnez-vous ?",
      "Une décision stratégique vous semble peu adaptée au terrain mais vous devez la relayer. Que faites-vous ?",
      "Un projet de transformation avance mais une partie de l'équipe n'a pas encore compris ce qui va changer pour elle. Quelle réaction adoptez-vous ?",
      "Vous percevez que certaines personnes feignent l'adhésion au changement sans vraiment y croire. Que faites-vous ?",
      "Un changement de processus crée des erreurs en période de transition. Comment réagissez-vous ?",
      "Une personne exprime publiquement son désaccord sur une décision déjà actée. Quelle réaction adoptez-vous ?",
      "Deux équipes ont des pratiques différentes pour accomplir la même tâche, ce qui crée des frictions. Comment réagissez-vous ?",
      "Une collaboration interéquipes échoue à produire un résultat parce que chacun attend que l'autre avance. Que faites-vous ?",
      "Vous constatez qu'une équipe partenaire ne respecte pas les engagements pris conjointement. Quelle réaction adoptez-vous ?",
      "Un projet implique plusieurs équipes mais personne ne semble coordonner l'ensemble. Que faites-vous ?",
      "Une information importante n'est pas partagée entre équipes, ce qui crée des doublons ou des incohérences. Comment vous positionnez-vous ?",
      "Une collaboration est bloquée par une rivalité tacite entre deux équipes. Que faites-vous ?",
      "Vous devez travailler avec une personne d'une autre équipe dont les méthodes sont très différentes des vôtres. Quelle réaction adoptez-vous ?",
      "Un partenaire interne ne tient pas ses délais mais il est dans une autre chaîne hiérarchique. Que faites-vous ?",
      "Un projet interéquipes avance mais les décisions sont prises sans toujours associer les bonnes personnes. Comment réagissez-vous ?",
      "Une personne vous demande systématiquement de valider ses décisions même mineures. Que faites-vous ?",
      "Vous avez délégué une tâche importante mais la personne ne semble pas avancer. Comment réagissez-vous ?",
      "Quelqu'un prend une initiative hors de son périmètre sans en avoir parlé. Quelle réaction adoptez-vous ?",
      "Vous constatez qu'une personne compétente ne s'investit plus comme avant. Que faites-vous ?",
      "Un collaborateur refuse une mission qu'il estime en dehors de son rôle. Comment vous positionnez-vous ?",
      "Vous devez arbitrer entre deux projets urgents avec des ressources limitées. Que faites-vous ?",
      "Une priorité définie collectivement est remise en question en cours de route par un membre de l'équipe. Quelle réaction adoptez-vous ?",
      "Plusieurs demandes urgentes arrivent simultanément et vous ne pouvez pas tout traiter. Comment réagissez-vous ?",
      "Un arbitrage difficile doit être rendu sans que toutes les informations soient disponibles. Que faites-vous ?",
      "Vous vous rendez compte que vous avez accepté trop d'engagements simultanément. Quelle réaction adoptez-vous ?",
      "Un collaborateur fait régulièrement des efforts supplémentaires sans les valoriser lui-même. Que faites-vous ?",
      "Vous observez que l'engagement collectif dans votre équipe diminue progressivement. Comment réagissez-vous ?",
      "Une personne semble très investie mais au détriment de sa propre santé. Quelle réaction adoptez-vous ?",
      "Une décision que vous avez prise ne produit pas les effets attendus. Que faites-vous ?",
      "Votre équipe fonctionne bien mais semble manquer d'élan ou d'ambition collective. Comment vous positionnez-vous ?",
      "Un collaborateur développe une expertise que vous ne maîtrisez pas vous-même. Quelle réaction adoptez-vous ?",
      "Vous constatez que certaines réunions d'équipe n'apportent plus rien de concret. Que faites-vous ?",
      "Un retour d'expérience collectif révèle une erreur partiellement attribuable à une décision que vous avez prise. Comment réagissez-vous ?",
      "Vous sentez que votre équipe attend de vous que vous preniez toutes les décisions à leur place. Quelle réaction adoptez-vous ?",
      "Un collègue extérieur à votre équipe vous sollicite fréquemment pour des arbitrages qui devraient relever de son propre manager. Que faites-vous ?",
      "Un outil adopté récemment est contourné par la majorité de l'équipe qui revient aux anciennes habitudes. Comment réagissez-vous ?"
    ],
    environnement: [
      "Une réunion courte est prévue en présentiel alors que plusieurs personnes doivent se déplacer loin. Que faites-vous ?",
      "Un support imprimé est demandé pour un événement alors qu'une version digitale existe. Quelle réaction adoptez-vous ?",
      "Vous devez choisir entre une livraison express et une option moins impactante. Que faites-vous ?",
      "Une pratique peu durable est installée dans l'équipe mais personne ne la remet en question. Comment réagissez-vous ?",
      "Un achat est renouvelé automatiquement alors que le besoin réel a diminué. Que faites-vous ?",
      "Un matériel encore utilisable est remplacé par habitude. Quelle réaction adoptez-vous ?",
      "Un événement interne prévoit beaucoup de goodies peu utiles. Que faites-vous ?",
      "Un déplacement professionnel est organisé sans comparer les alternatives. Comment vous positionnez-vous ?",
      "Un fichier très lourd est envoyé à de nombreuses personnes alors qu'un lien suffirait. Que faites-vous ?",
      "Une demande client semble encourager une solution plus coûteuse et plus impactante. Quelle réaction adoptez-vous ?",
      "Une équipe veut lancer une action environnementale très visible mais peu utile. Que faites-vous ?",
      "Un fournisseur moins cher présente peu de garanties environnementales. Comment réagissez-vous ?",
      "Un usage numérique génère beaucoup de stockage inutile. Que faites-vous ?",
      "Un arbitrage oppose confort immédiat et réduction d'impact. Quelle réaction adoptez-vous ?",
      "Une règle de tri existe mais elle est peu suivie. Comment vous positionnez-vous ?",
      "Une personne propose une amélioration sobre mais elle est perçue comme contraignante. Que faites-vous ?",
      "Un process oblige à produire des documents rarement consultés. Quelle réaction adoptez-vous ?",
      "Une initiative écologique repose toujours sur les mêmes volontaires. Que faites-vous ?",
      "Une contrainte environnementale est vécue comme une injonction de plus. Comment réagissez-vous ?",
      "Une décision rapide risque d'entraîner des achats ou déplacements évitables. Que faites-vous ?"
    ],
    ethique: [
      "Un fournisseur vous propose une invitation personnelle avant un renouvellement de contrat. Que faites-vous ?",
      "Vous découvrez qu'un proche travaille pour une entreprise candidate à un appel d'offres. Quelle réaction adoptez-vous ?",
      "Une information confidentielle est évoquée dans un espace informel. Que faites-vous ?",
      "Une décision vous semble discutable mais vous n'êtes pas sûr·e du niveau d'alerte. Comment réagissez-vous ?",
      "Un cadeau reçu paraît modeste mais arrive au moment d'une négociation. Que faites-vous ?",
      "Une personne vous demande de modifier une date ou une information pour simplifier un dossier. Quelle réaction adoptez-vous ?",
      "Un collègue vous confie une situation sensible en vous demandant de ne rien dire. Que faites-vous ?",
      "Une pratique habituelle semble contraire à l'esprit d'une règle interne. Comment vous positionnez-vous ?",
      "Un avantage est proposé à certaines personnes sans critère clair. Que faites-vous ?",
      "Une pression commerciale pousse à présenter une information de manière ambiguë. Quelle réaction adoptez-vous ?",
      "Un document contient une erreur qui pourrait arranger l'équipe si elle n'est pas corrigée. Que faites-vous ?",
      "Un client demande une faveur qui sort du cadre prévu. Comment réagissez-vous ?",
      "Une remarque laisse penser qu'une décision pourrait être influencée par une relation personnelle. Que faites-vous ?",
      "Une alerte passée a été mal reçue et vous hésitez à signaler un nouveau point. Quelle réaction adoptez-vous ?",
      "Une règle compliance est perçue comme trop lourde par l'équipe. Comment vous positionnez-vous ?",
      "Une dépense est présentée de manière floue dans un dossier. Que faites-vous ?",
      "Une personne vous demande de valider un document que vous n'avez pas réellement vérifié. Quelle réaction adoptez-vous ?",
      "Une situation n'est pas illégale en apparence mais vous met mal à l'aise. Que faites-vous ?",
      "Un partenaire insiste pour obtenir une information non nécessaire à sa mission. Comment réagissez-vous ?",
      "Une décision sensible est prise oralement sans trace claire. Que faites-vous ?"
    ]
  };

  // ─────────────────────────────────────────────────────────────────────────
  //  THÈMES CLASSIQUES — génération de questions (V2)
  //  - offset déterministe par AD via makeVariantOffset
  //  - tags enrichis via chaptersTags
  // ─────────────────────────────────────────────────────────────────────────

  function makeQuestions(prefix, domain, chapterIndex, extraTags) {
    const bank   = questionBanks[domain] || questionBanks.management;
    const offset = makeVariantOffset(prefix);
    const base   = extraTags || [BADGES.IA, BADGES.AIDE, BADGES.REVIEW];
    const ctags  = chaptersTags(domain, chapterIndex);

    return Array.from({ length: 5 }, function (_, i) {
      const k = offset + chapterIndex * 5 + i;
      return {
        id:      prefix + "-q" + (chapterIndex + 1) + "-" + (i + 1),
        type:    "choix",
        text:    bank[k % bank.length],
        answers: answerSets(domain, k),
        tags:    base.concat([domain]).concat(ctags).concat(["Mise en situation"])
      };
    });
  }

  function makeChapters(prefix, domain, chapters, tags) {
    return chapters.map(function (c, i) {
      return {
        id:          prefix + "-chap-" + (i + 1),
        title:       c[0],
        description: c[1],
        questions:   makeQuestions(prefix, domain, i, tags),
        profiles:    makeProfiles(c[0])
      };
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  THÈMES CLASSIQUES — templates
  // ─────────────────────────────────────────────────────────────────────────

  const templates = {
    securiteSurete: {
      domain: "securite",
      chapters: [
        ["Identifier les risques",             "Observer son environnement et repérer les situations sensibles avant qu'elles ne s'aggravent."],
        ["Appliquer les bons réflexes",        "Maintenir les gestes utiles même sous pression opérationnelle."],
        ["Contribuer à la sécurité collective","Intervenir avec tact et soutenir les pratiques sûres dans le collectif."],
        ["Réagir et signaler",                 "Faire remonter les incidents, anomalies et signaux faibles sans banaliser."]
      ]
    },
    qvtRps: {
      domain: "qvt",
      chapters: [
        ["Repérer les signaux faibles",       "Identifier fatigue, tensions, isolement et alertes relationnelles."],
        ["Réguler la charge",                 "Prioriser, demander de l'aide et clarifier les urgences."],
        ["Préserver les relations de travail","Désamorcer les irritants et maintenir un dialogue constructif."],
        ["Mobiliser les bons relais",         "Savoir quand et comment alerter sans exposer inutilement."]
      ]
    },
    securiteCoactivite: {
      domain: "securite",
      chapters: [
        ["Préparer une intervention en coactivité",  "Identifier les risques liés à la présence simultanée de plusieurs équipes ou prestataires."],
        ["Coordonner les zones et les accès",        "Gérer les interférences entre activités parallèles, baliser et vérifier les habilitations."],
        ["Intégrer les intervenants externes",       "Accueillir, informer et contrôler les prestataires et sous-traitants présents sur le site."],
        ["Réagir à un incident en coactivité",       "Alerter, sécuriser et gérer les responsabilités quand plusieurs équipes sont impliquées."]
      ]
    },
    securiteEPI: {
      domain: "securite",
      chapters: [
        ["Choisir et vérifier ses EPI",              "Identifier les équipements de protection requis, vérifier leur état avant toute utilisation."],
        ["Maintenir ses réflexes sous contrainte",   "Conserver les bons gestes même sous pression opérationnelle, par fatigue ou en urgence."],
        ["Signaler une anomalie matérielle",         "Détecter une défaillance d'EPI ou d'équipement de protection collectif et réagir sans délai."],
        ["Contribuer à une culture EPI collective",  "Encourager les bonnes pratiques autour de soi sans créer de tensions ou de postures de contrôle."]
      ]
    },
    securiteManagerArbitrage: {
      domain: "securite",
      chapters: [
        ["Tenir les exigences face à la pression",       "Maintenir les standards de sécurité quand la production, les délais ou la hiérarchie créent une pression forte."],
        ["Traiter les écarts de façon constructive",     "Analyser les causes d'un non-respect de consigne sans culpabiliser, pour agir efficacement sur les causes réelles."],
        ["Animer la vigilance dans les périodes calmes", "Maintenir l'attention sécurité de l'équipe entre deux incidents, quand la routine tend à s'installer."],
        ["Détecter les glissements silencieux",          "Repérer les dérives progressives de pratique avant qu'elles ne créent une situation grave."]
      ]
    },
    securiteNucleaire: {
      domain: "sec_nucl",
      chapters: [
        ["Adopter une posture de questionnement",  "Exercer une questioning attitude, ne jamais laisser passer un doute sans le formaliser."],
        ["Appliquer la rigueur procédurale",       "Respecter les gammes et modes opératoires sans raccourci, même sous pression de délai ou d'expérience."],
        ["Gérer les situations non prévues",       "Adopter la bonne posture face à une situation non couverte par les référentiels."],
        ["Déclarer et tirer les enseignements",    "Signaler les écarts et événements précurseurs dans une culture de sûreté ouverte."]
      ]
    },
    securiteChantierBTP: {
      domain: "sec_btp",
      chapters: [
        ["Sécuriser son poste avant de démarrer", "Analyser les risques, baliser sa zone, vérifier les EPC et les EPI avant toute intervention."],
        ["Gérer la coactivité sur chantier",       "Coordonner avec les autres corps de métier, signaler les interférences et les zones partagées."],
        ["Appliquer et faire respecter le PPSPS", "Vérifier les habilitations, les permis de travail et les protections collectives prévues au plan."],
        ["Réagir à un accident ou incident",       "Donner l'alerte, sécuriser les personnes et préserver les conditions pour l'analyse."]
      ]
    },
    qvtTeletravail: {
      domain: "qvt",
      chapters: [
        ["Organiser son temps et son espace à distance",   "Structurer sa journée en télétravail, poser des limites et éviter le glissement des horaires."],
        ["Maintenir le lien avec son collectif",           "Rester visible et contributeur à distance, prévenir le sentiment d'isolement ou de mise à l'écart."],
        ["Communiquer efficacement en mode hybride",       "Adapter ses pratiques d'échange pour que distance et présentiel n'induisent pas d'inégalités."],
        ["Gérer les irritants de l'hybridation",           "Identifier et traiter les frictions propres au travail hybride sans laisser s'installer les non-dits."]
      ]
    },
    qvtEpuisement: {
      domain: "qvt",
      chapters: [
        ["Reconnaître ses propres signaux d'alerte",       "Identifier les signes précoces de fatigue ou de surcharge avant qu'ils ne s'aggravent."],
        ["Réguler sa charge dans la durée",                "Agir sur les leviers concrets : hiérarchiser, dire non, déléguer sans culpabiliser."],
        ["Préserver son énergie au quotidien",             "Créer des routines de récupération, maintenir des frontières saines et exercer le droit à la déconnexion."],
        ["Oser en parler et chercher un appui",            "Identifier les bons interlocuteurs et franchir le pas sans attendre d'être en difficulté réelle."]
      ]
    },
    qvtRetourAbsence: {
      domain: "qvt",
      chapters: [
        ["Préparer les conditions du retour",              "Anticiper les ajustements nécessaires et identifier ce qui a changé pendant l'absence."],
        ["Réintégrer son collectif de travail",            "Reprendre le fil avec ses collègues, gérer les décalages accumulés et les non-dits."],
        ["Réguler la reprise en charge",                   "Éviter la surcompensation, calibrer ses engagements et signaler ce qui ne tient pas."],
        ["Détecter les signaux qui persistent",            "Reconnaître quand le retour ne se stabilise pas et identifier le bon moment pour en parler."]
      ]
    },
    qvtManagerSignaux: {
      domain: "qvt",
      chapters: [
        ["Repérer les signaux faibles dans son équipe",    "Observer sans sur-interpréter, distinguer l'exceptionnel du structurel sans s'ériger en thérapeute."],
        ["Intervenir de façon factuelle",                  "Agir sur le travail — pas sur la personne — et créer les conditions pour qu'un échange soit possible."],
        ["Orienter vers les bons relais",                  "Savoir quand passer la main sans se défausser : RH, médecin du travail, dispositif d'écoute."],
        ["Prévenir par l'organisation",                    "Agir en amont sur la charge, les rôles et le cadre plutôt que de gérer les symptômes individuels."]
      ]
    },
    management: {
      domain: "management",
      chapters: [
        ["Clarifier le cadre",                   "Identifier les attendus, les rôles, les priorités et les zones de flou."],
        ["Coopérer dans l'incertitude",          "Avancer avec des informations incomplètes sans désorganiser le collectif."],
        ["Donner et recevoir du feedback utile", "Formuler et accueillir des retours concrets, recevables et orientés action."],
        ["Ancrer les nouvelles pratiques",       "Transformer les intentions en habitudes professionnelles observables."]
      ]
    },
    mgmtChangement: {
      domain: "management",
      chapters: [
        ["Comprendre les résistances au changement", "Distinguer l'opposition de fond du besoin d'information, et agir en conséquence sans forcer l'adhésion."],
        ["Relayer et incarner la transformation",    "Transmettre un changement décidé sans l'avoir choisi tout en préservant sa crédibilité de proximité."],
        ["Accompagner les transitions individuelles","Repérer les personnes qui décrochent et créer les conditions d'un soutien sans paternalisme ni contrôle."],
        ["Ancrer les nouvelles pratiques dans la durée", "Empêcher que les anciennes habitudes reprennent le dessus une fois l'attention de la direction retombée."]
      ]
    },
    mgmtResponsabilisation: {
      domain: "management",
      chapters: [
        ["Déléguer sans abandonner",                "Confier une responsabilité réelle tout en restant disponible sans reprendre la main à la moindre difficulté."],
        ["Développer l'autonomie de décision",      "Créer les conditions pour que les arbitrages se prennent au bon niveau, sans créer de dépendance."],
        ["Valoriser l'initiative et l'engagement",  "Reconnaître ce qui mérite de l'être, de façon cohérente et sans créer de hiérarchies informelles."],
        ["Gérer les erreurs sans bloquer la prise de risque", "Traiter une erreur de façon à préserver la confiance et l'envie d'agir sans remettre en cause la délégation."]
      ]
    },
    mgmtCollaboration: {
      domain: "management",
      chapters: [
        ["Coopérer avec d'autres équipes",           "Identifier les points de friction interéquipes et créer les conditions d'une vraie collaboration au quotidien."],
        ["Gérer les dépendances et les attentes",    "Clarifier ce qu'on peut attendre des autres et ce qu'on s'engage à livrer soi-même, sans ambiguïté."],
        ["Dépasser les logiques de silos",           "Agir pour que les intérêts d'équipe ne prennent pas le dessus sur la cohérence globale de l'organisation."],
        ["Construire des pratiques communes",        "Aligner les méthodes de travail entre équipes sans imposer ni diluer ce qui fonctionne."]
      ]
    },
    mgmtDigital: {
      domain: "management",
      chapters: [
        ["Adopter un nouveau processus ou outil",    "Trouver sa posture face à une transformation qui change les habitudes sans effacer les compétences existantes."],
        ["Accompagner les moins à l'aise",           "Soutenir les personnes en difficulté avec les outils numériques sans s'y substituer ni créer de dépendance."],
        ["Questionner la pertinence des usages",     "Évaluer si les outils et processus numériques servent vraiment le travail ou créent de la complexité inutile."],
        ["Gérer la transition entre ancien et nouveau", "Maintenir la continuité du travail pendant une période de changement d'outil ou de méthode."]
      ]
    },
    mgmtArbitrage: {
      domain: "management",
      chapters: [
        ["Hiérarchiser face à l'urgence",            "Décider quoi faire et quoi ne pas faire quand tout semble prioritaire en même temps."],
        ["Gérer les injonctions contradictoires",    "Trouver une position cohérente et tenable quand les demandes reçues sont incompatibles entre elles."],
        ["Expliquer et tenir ses arbitrages",        "Communiquer une décision d'arbitrage de façon à ne pas créer de frustration inutile ni fragiliser la confiance."],
        ["Revoir ses priorités sans déstabiliser",   "Adapter le plan en cours de route sans perdre la confiance de l'équipe ni créer un sentiment d'instabilité."]
      ]
    },
    environnement: {
      domain: "environnement",
      chapters: [
        ["Identifier les impacts",        "Relier les gestes du quotidien à des effets environnementaux concrets."],
        ["Arbitrer sobrement",            "Faire des choix réalistes sans culpabilisation ni affichage."],
        ["Coopérer autour des pratiques", "Faire évoluer les usages avec les collègues, clients et prestataires."],
        ["Faire durer les changements",   "Installer des réflexes simples et mesurables dans le temps."]
      ]
    },
    ethique: {
      domain: "ethique",
      chapters: [
        ["Identifier les zones grises",    "Repérer ce qui n'est pas illégal en apparence mais peut poser problème."],
        ["Demander conseil au bon moment", "Ne pas rester seul·e face à un doute, une pression ou un conflit d'intérêts."],
        ["Documenter et alerter",          "Décrire les faits, protéger les personnes et utiliser le bon canal."],
        ["Créer une culture de vigilance", "Rendre les règles compréhensibles, applicables et discutables au quotidien."]
      ]
    }
  };

  // ═════════════════════════════════════════════════════════════════════════
  //  CYBERSÉCURITÉ — questions écrites, scoring subtil
  //  ⚠ NE PAS MODIFIER — logique non générative, contenu validé
  // ═════════════════════════════════════════════════════════════════════════

  const CT = [BADGES.IA, BADGES.AIDE, BADGES.REVIEW];

  function lq(id, text) {
    return {
      id, type: "likert", text,
      answers: [
        { text: "Jamais",   score: 0   },
        { text: "Rarement", score: 0.5 },
        { text: "Parfois",  score: 1   },
        { text: "Souvent",  score: 1.5 },
        { text: "Toujours", score: 2   }
      ],
      tags: CT
    };
  }

  function cq(id, text, answers) {
    return { id, type: "choix", text, answers, tags: CT };
  }

  const CYBER_PROFILES = {
    "reperer-signaux": [
      {
        level: "Repères à consolider", min: 0, max: 0.99,
        title: "La détection des signaux numériques sensibles est encore à construire",
        summary: "Les tentatives de manipulation bien construites passent encore souvent sous votre radar.",
        description: "Reconnaître une tentative de phishing ou d'ingénierie sociale demande une sensibilisation spécifique — ces attaques sont conçues pour contourner la vigilance ordinaire. Ce n'est pas un manque d'attention, c'est un manque d'outillage qui se corrige avec la pratique.",
        keywords: ["Détection à renforcer", "Formation utile", "Signaux manqués"]
      },
      {
        level: "Pratiques en construction", min: 0.99, max: 1.59,
        title: "Vous repérez l'évident, mais les attaques sophistiquées vous exposent encore",
        summary: "Votre vigilance est présente face aux tentatives grossières, mais les signaux subtils vous échappent parfois.",
        description: "Vous réagissez correctement face aux tentatives évidentes, mais certains contextes favorables — expéditeur connu, timing plausible, urgence crédible — peuvent encore faire baisser votre garde. C'est précisément là que se concentrent les attaques les plus efficaces.",
        keywords: ["Vigilance conditionnelle", "Signaux subtils", "Contexte influençant"]
      },
      {
        level: "Réflexes installés", min: 1.59, max: 2,
        title: "Vous lisez les signaux numériques avec précision",
        summary: "Votre vigilance s'applique même quand le contexte rend la demande plausible.",
        description: "Vous avez internalisé les signaux qui distinguent une sollicitation légitime d'une tentative de manipulation : urgence artificielle, domaine légèrement modifié, canal inhabituel. Cette vigilance calibrée — ni alarmiste, ni aveugle — est un atout réel pour votre organisation.",
        keywords: ["Vigilance active", "Signal faible perçu", "Discernement"]
      }
    ],
    "proteger-acces": [
      {
        level: "Repères à consolider", min: 0, max: 0.99,
        title: "Des habitudes à risque persistent dans votre quotidien numérique",
        summary: "Certains comportements courants — mot de passe partagé, poste non verrouillé, 2FA ignoré — créent des vulnérabilités réelles.",
        description: "Ce n'est pas une question de mauvaise volonté : ces habitudes sont le reflet d'une routine construite avant que la sensibilisation cyber ne devienne prioritaire. Les corriger demande peu d'effort individuel mais un appui collectif clair.",
        keywords: ["Habitudes à risque", "Automatisme absent", "Vulnérabilités courantes"]
      },
      {
        level: "Pratiques en construction", min: 0.99, max: 1.59,
        title: "Vos pratiques de protection sont présentes mais pas encore automatiques",
        summary: "Vous connaissez les bonnes pratiques et les appliquez quand vous y pensez — mais elles ne sont pas encore systématiques.",
        description: "La différence entre une posture intermédiaire et une posture solide, c'est souvent l'automatisme. Vous avez les connaissances — l'enjeu est de les transformer en réflexes indépendants du contexte, de la pression du moment ou de la confiance accordée à l'environnement.",
        keywords: ["Pratiques connues", "Automatisme partiel", "Contextuel"]
      },
      {
        level: "Réflexes installés", min: 1.59, max: 2,
        title: "Vos réflexes de protection des accès sont ancrés",
        summary: "Verrouillage systématique, partage refusé, 2FA activé — ces habitudes forment votre première ligne de défense.",
        description: "Vous avez automatisé les comportements qui semblent anodins mais qui sont décisifs : verrouiller son poste, refuser de partager sa session, utiliser des mots de passe forts et uniques. Ces réflexes sont invisibles quand ils fonctionnent — et précieux quand ils sont absents.",
        keywords: ["Réflexes ancrés", "Verrouillage systématique", "2FA actif"]
      }
    ],
    "partager-discernement": [
      {
        level: "Repères à consolider", min: 0, max: 0.99,
        title: "Le partage d'information est encore peu maîtrisé",
        summary: "La frontière entre ce qui est partageable et ce qui est sensible reste floue dans les échanges du quotidien.",
        description: "Des informations sensibles sont probablement partagées sans contrôle — non par négligence, mais parce que les critères et les canaux ne sont pas encore clairs. C'est l'un des vecteurs de fuite les plus fréquents et des plus accessibles à corriger.",
        keywords: ["Frontière floue", "Fuite non intentionnelle", "Procédures à clarifier"]
      },
      {
        level: "Pratiques en construction", min: 0.99, max: 1.59,
        title: "Votre discernement est présent mais conditionnel",
        summary: "Vous faites attention dans les situations formelles, mais les contextes informels et les demandes urgentes créent des zones de relâchement.",
        description: "Vous êtes prudent quand vous y pensez — mais les échanges informels, la pression temporelle et la confiance relationnelle peuvent encore vous amener à partager plus que nécessaire. Travailler la systématisation de ces vérifications renforcerait significativement votre posture.",
        keywords: ["Prudence formelle", "Relâchement informel", "Urgence influençante"]
      },
      {
        level: "Réflexes installés", min: 1.59, max: 2,
        title: "Vous partagez l'information avec rigueur et discernement",
        summary: "Vous ne vous fiez pas à la confiance relationnelle pour décider ce que vous partagez — vous vérifiez les procédures, les canaux et les droits.",
        description: "Votre approche du partage d'information est structurée par le contenu, pas par la relation. Vous choisissez le bon canal, limitez les données aux stricts besoins et vérifiez les autorisations — même avec des partenaires habituels.",
        keywords: ["Rigueur informationnelle", "Canal approprié", "Droits vérifiés"]
      }
    ],
    "reagir-signaler": [
      {
        level: "Repères à consolider", min: 0, max: 0.99,
        title: "La réaction aux incidents numériques est encore difficile",
        summary: "Plusieurs freins sont actifs : incertitude sur la gravité, gêne d'avoir provoqué l'incident, canal de signalement inconnu.",
        description: "Ne pas savoir quoi faire face à un incident numérique est très courant. La gêne, l'incertitude et la peur de l'escalade sont les freins les plus documentés. Un cadre clair et une culture d'équipe sans culpabilisation font toute la différence.",
        keywords: ["Canal inconnu", "Gêne bloquante", "Freins actifs"]
      },
      {
        level: "Pratiques en construction", min: 0.99, max: 1.59,
        title: "Vous signalez dans les cas clairs mais hésitez dans l'ambiguïté",
        summary: "Votre réaction est rapide face aux incidents évidents, mais l'incertitude sur la gravité freine votre passage à l'acte.",
        description: "La fenêtre de temps entre un incident numérique et son signalement est souvent critique. Vous avez les bons réflexes dans les situations nettes — l'enjeu est d'élargir ce réflexe aux situations ambiguës, qui sont précisément les plus fréquentes.",
        keywords: ["Hésitation dans l'ambiguïté", "Attente de certitude", "Réactivité à accélérer"]
      },
      {
        level: "Réflexes installés", min: 1.59, max: 2,
        title: "Vous réagissez vite et sans attendre la certitude",
        summary: "Vous n'évaluez pas seul l'ampleur d'un incident — vous alertez et laissez les spécialistes qualifier.",
        description: "Votre posture face aux incidents numériques est celle qui protège le mieux votre organisation : signaler sans attendre d'être certain, documenter ce qui s'est passé, mobiliser les bons canaux. Un signalement sans suite est infiniment moins grave qu'un incident non signalé.",
        keywords: ["Réaction immédiate", "Signal sans certitude", "Bons canaux"]
      }
    ]
  };

  const CQ = {
    "reflexes-cybersecurite": {
      "reperer-signaux": [
        cq("rc-1-1", "Vous recevez un email urgent de votre direction demandant un virement vers un nouveau compte fournisseur, avec la mention « ne pas en parler à la comptabilité ». Quelle est votre réaction ?",
          [{ text: "Je traite rapidement — la direction a ses raisons.", score: 0 },
           { text: "Je vérifie l'adresse email et rappelle le signataire pour confirmer.", score: 1 },
           { text: "Je refuse d'agir et signale — urgence et confidentialité combinées sont un signal classique de fraude.", score: 2 }]),
        lq("rc-1-2", "À quelle fréquence prenez-vous le temps de lire l'adresse email complète de l'expéditeur, et pas seulement le nom affiché ?"),
        cq("rc-1-3", "Un SMS vous informe que votre colis est bloqué en douane — 1,90 € à régler via un lien. Vous attendez effectivement une livraison. Que faites-vous ?",
          [{ text: "Je clique et règle — la somme est dérisoire et le timing coïncide.", score: 0 },
           { text: "Je vérifie l'URL du lien avant de cliquer.", score: 1 },
           { text: "Je contacte le transporteur directement via son site officiel pour vérifier.", score: 2 }]),
        cq("rc-1-4", "Un collègue vous envoie une pièce jointe « à traiter en urgence ». Son adresse email est correcte, mais son style d'écriture est inhabituellement bref. Que faites-vous ?",
          [{ text: "J'ouvre — l'adresse email est la bonne.", score: 0 },
           { text: "Je lui réponds pour vérifier si c'est bien lui qui a envoyé ce message.", score: 1 },
           { text: "Je l'appelle directement pour confirmer avant d'ouvrir quoi que ce soit.", score: 2 }]),
        lq("rc-1-5", "Lorsqu'une demande numérique vous met sous pression temporelle, à quelle fréquence prenez-vous quand même le temps d'en vérifier la légitimité ?")
      ],
      "proteger-acces": [
        cq("rc-2-1", "Vous partez en réunion pour 30 minutes. Votre session est ouverte sur des documents internes sensibles. Que faites-vous ?",
          [{ text: "Je minimise les fenêtres — je reviens vite.", score: 0 },
           { text: "Je verrouille si j'y pense.", score: 1 },
           { text: "Je verrouille systématiquement, quelle que soit la durée.", score: 2 }]),
        lq("rc-2-2", "À quelle fréquence verrouillez-vous votre poste de travail dès que vous vous en éloignez ?"),
        cq("rc-2-3", "Un collègue vous demande de lui « prêter votre session » deux minutes pendant que la sienne est en maintenance. Que faites-vous ?",
          [{ text: "Je lui prête — c'est un collègue de confiance.", score: 0 },
           { text: "Je reste à côté pendant qu'il utilise ma session.", score: 0 },
           { text: "Je refuse et l'oriente vers le support IT pour un accès temporaire.", score: 1 },
           { text: "Je refuse catégoriquement — prêter sa session expose ses accès et ses traces d'activité.", score: 2 }]),
        cq("rc-2-4", "Vous trouvez une clé USB non identifiée dans l'espace commun. Que faites-vous ?",
          [{ text: "Je la branche pour identifier son propriétaire.", score: 0 },
           { text: "Je la dépose à l'accueil.", score: 1 },
           { text: "Je la remets à la sécurité informatique sans la brancher.", score: 2 }]),
        cq("rc-2-5", "Un email vous invite à renouveler votre mot de passe. Comment créez-vous le nouveau ?",
          [{ text: "Je change uniquement un caractère — la règle est respectée.", score: 0 },
           { text: "Je crée un mot de passe proche de l'ancien, avec une variation reconnaissable.", score: 0 },
           { text: "Je crée un nouveau mot de passe complexe, sans lien avec le précédent.", score: 1 },
           { text: "Je génère un mot de passe fort et unique, stocké dans un gestionnaire.", score: 2 }])
      ],
      "partager-discernement": [
        cq("rc-3-1", "Vous devez transmettre un document confidentiel à un partenaire externe. Comment procédez-vous ?",
          [{ text: "Je l'envoie en pièce jointe par email — c'est le plus rapide.", score: 0 },
           { text: "Je vérifie bien l'adresse du destinataire avant d'envoyer.", score: 1 },
           { text: "J'utilise le canal sécurisé ou l'espace partagé préconisé par mon organisation.", score: 2 }]),
        lq("rc-3-2", "À quelle fréquence vérifiez-vous la liste des destinataires avant d'envoyer un fichier interne ?"),
        cq("rc-3-3", "Un partenaire habituel demande par email un extrait de votre base clients pour préparer une proposition commerciale. Que faites-vous ?",
          [{ text: "Je lui envoie un extrait — c'est un partenaire de confiance.", score: 0 },
           { text: "Je lui envoie des données anonymisées.", score: 1 },
           { text: "Je vérifie si un accord encadrant le partage de données est en place avant d'envoyer quoi que ce soit.", score: 2 }]),
        cq("rc-3-4", "Vous partagez un document sur un outil collaboratif. Par défaut, il est accessible à toute l'organisation. Que faites-vous ?",
          [{ text: "Je laisse les droits par défaut — ça facilite la collaboration.", score: 0 },
           { text: "Je vérifie si le contenu justifie une restriction d'accès.", score: 1 },
           { text: "Je définis systématiquement les droits d'accès selon le contenu, avant de partager.", score: 2 }]),
        lq("rc-3-5", "Lorsque vous participez à une réunion vidéo depuis un espace ouvert, à quelle fréquence vérifiez-vous que personne ne peut vous entendre ?")
      ],
      "reagir-signaler": [
        cq("rc-4-1", "Vous pensez avoir cliqué sur un lien malveillant. Rien n'est apparu visuellement. Que faites-vous ?",
          [{ text: "Je ne fais rien — si rien ne s'est passé visuellement, il n'y a probablement pas de problème.", score: 0 },
           { text: "Je ferme le navigateur et lance un antivirus.", score: 1 },
           { text: "J'alerte immédiatement, déconnecte mon poste du réseau si possible et décris précisément ce qui s'est passé.", score: 2 }]),
        lq("rc-4-2", "À quelle fréquence signalez-vous un incident numérique, même mineur, plutôt que de le gérer seul ?"),
        cq("rc-4-3", "Un incident numérique vous implique directement. Aucune conséquence visible pour l'instant. Que faites-vous ?",
          [{ text: "J'attends de voir si des conséquences apparaissent.", score: 0 },
           { text: "J'en parle discrètement à un collègue technique de confiance.", score: 1 },
           { text: "Je signale immédiatement à la sécurité informatique, en documentant précisément ce qui s'est passé.", score: 2 }]),
        cq("rc-4-4", "Un appel prétendument du support IT vous demande votre mot de passe pour résoudre un problème critique. L'interlocuteur connaît votre nom et votre manager. Que faites-vous ?",
          [{ text: "Je donne le mot de passe — il connaît des détails internes.", score: 0 },
           { text: "Je refuse et rappelle le numéro officiel du support pour vérifier.", score: 1 },
           { text: "Je refuse catégoriquement, raccroche et signale l'appel immédiatement.", score: 2 }]),
        lq("rc-4-5", "À quelle fréquence savez-vous exactement quel canal ou quelle personne contacter en cas d'incident numérique dans votre organisation ?")
      ]
    },
    "fraude-phishing": {
      "reperer-signaux": [
        cq("fp-1-1", "Un email prétend venir d'un service interne avec le logo de votre entreprise, mais le domaine est légèrement différent (@mon-entreprise.net au lieu de @mon-entreprise.fr). Que faites-vous ?",
          [{ text: "Je réponds — le logo et le contenu semblent authentiques.", score: 0 },
           { text: "Je vérifie le domaine mais suppose que c'est une erreur d'affichage.", score: 1 },
           { text: "Je ne donne pas suite et signale l'email à la sécurité informatique.", score: 2 }]),
        lq("fp-1-2", "À quelle fréquence vérifiez-vous l'URL d'un site avant d'y saisir vos identifiants ?"),
        cq("fp-1-3", "Une demande urgente vous arrive via un canal inhabituel — email personnel au lieu des outils d'entreprise. L'expéditeur semble connu. Que faites-vous ?",
          [{ text: "Je traite — une panne technique peut expliquer l'utilisation d'un canal alternatif.", score: 0 },
           { text: "Je traite prudemment sans partager d'informations sensibles.", score: 1 },
           { text: "Je refuse d'agir via ce canal — un canal inhabituel est en lui-même un signal d'alarme.", score: 2 }]),
        cq("fp-1-4", "Lors d'un test de phishing interne, vous avez cliqué sur le faux lien. Comment réagissez-vous ?",
          [{ text: "Je suis gêné et préfère ne pas en parler.", score: 0 },
           { text: "Je regarde le corrigé pour comprendre ce que j'ai manqué.", score: 1 },
           { text: "Je regarde le corrigé, en tire un apprentissage et le partage avec mes collègues.", score: 2 }]),
        lq("fp-1-5", "À quelle fréquence remettez-vous en question la légitimité d'une demande numérique, même si elle vient d'une personne de confiance ?")
      ],
      "proteger-acces": [
        cq("fp-2-1", "Un email de votre « banque professionnelle » signale une activité suspecte et vous demande de vous connecter via un lien pour confirmer vos accès. Que faites-vous ?",
          [{ text: "Je clique et me reconnecte — mieux vaut vérifier rapidement.", score: 0 },
           { text: "Je vérifie l'adresse de l'expéditeur avant de cliquer.", score: 1 },
           { text: "Je me connecte directement via mon signet habituel, sans utiliser le lien de l'email.", score: 2 }]),
        lq("fp-2-2", "À quelle fréquence vérifiez-vous qu'un site est bien sécurisé (HTTPS) avant d'y saisir des identifiants ?"),
        cq("fp-2-3", "Vous recevez un code de double authentification alors que vous ne vous connectez pas. Que faites-vous ?",
          [{ text: "Je valide — c'est peut-être une mise à jour système automatique.", score: 0 },
           { text: "J'ignore le message et attends de voir.", score: 1 },
           { text: "Je ne valide pas et signale immédiatement à la sécurité informatique.", score: 2 }]),
        cq("fp-2-4", "On vous propose de « tester une nouvelle fonctionnalité » de votre outil habituel via un lien. Rien n'a été annoncé en interne. Que faites-vous ?",
          [{ text: "Je clique et teste — ça semble pratique.", score: 0 },
           { text: "Je vérifie l'adresse de l'expéditeur avant de cliquer.", score: 1 },
           { text: "Je signale le message à la sécurité informatique sans y donner suite.", score: 2 }]),
        lq("fp-2-5", "À quelle fréquence mettez-vous à jour vos mots de passe professionnels sans attendre d'y être obligé ?")
      ],
      "partager-discernement": [
        cq("fp-3-1", "Un interlocuteur inconnu prétend être le nouveau responsable d'un compte client et vous demande de mettre à jour ses coordonnées bancaires. Que faites-vous ?",
          [{ text: "Je mets à jour — ce type de changement arrive régulièrement.", score: 0 },
           { text: "Je lui demande de confirmer par email depuis l'adresse officielle de l'entreprise.", score: 1 },
           { text: "J'appelle le client via le numéro enregistré dans nos systèmes pour confirmer le changement.", score: 2 }]),
        lq("fp-3-2", "À quelle fréquence utilisez-vous un canal de vérification indépendant de la demande elle-même pour confirmer l'identité d'un interlocuteur ?"),
        cq("fp-3-3", "Une demande urgente est accompagnée d'une preuve — capture d'écran ou PDF officiel. Comment la traitez-vous ?",
          [{ text: "Je l'accepte — une pièce justificative renforce la légitimité.", score: 0 },
           { text: "Je la prends en compte sans m'y fier entièrement.", score: 1 },
           { text: "Je vérifie directement auprès de la source — les preuves numériques se falsifient facilement.", score: 2 }]),
        cq("fp-3-4", "Votre organisation vient d'envoyer une communication officielle. Le lendemain, un email « complémentaire » arrive avec un lien vers les nouvelles directives. Que faites-vous ?",
          [{ text: "Je clique — le timing avec la communication officielle est convaincant.", score: 0 },
           { text: "Je cherche dans mes emails la communication officielle pour comparer.", score: 1 },
           { text: "J'accède aux directives via les canaux internes officiels, sans utiliser le lien de cet email.", score: 2 }]),
        lq("fp-3-5", "À quelle fréquence prenez-vous conscience que la confiance accordée à un interlocuteur habituel peut être exploitée par quelqu'un qui a fait ses recherches ?")
      ],
      "reagir-signaler": [
        cq("fp-4-1", "Une tentative de phishing bien construite vous a presque eu — vous avez cliqué mais arrêté à temps. Comment réagissez-vous ?",
          [{ text: "Je suis gêné et n'en parle pas.", score: 0 },
           { text: "J'en parle à un collègue de confiance.", score: 1 },
           { text: "Je le signale à la sécurité informatique pour qu'ils alertent les autres.", score: 2 }]),
        lq("fp-4-2", "À quelle fréquence partagez-vous avec vos collègues les tentatives de phishing que vous avez reçues ?"),
        cq("fp-4-3", "Vous avez traité une demande urgente qui s'avère être une tentative de fraude. Comment réagissez-vous face à vous-même ?",
          [{ text: "Je m'en veux — j'aurais dû voir.", score: 0 },
           { text: "Je l'accepte — ces attaques sont de mieux en mieux construites.", score: 1 },
           { text: "J'analyse factuellement ce qui s'est passé et en fais un apprentissage partagé avec mon équipe.", score: 2 }]),
        cq("fp-4-4", "Suite à un incident cyber, de nouvelles consignes de sécurité contraignantes sont diffusées. Quelle est votre réaction ?",
          [{ text: "Je les applique mollement en attendant qu'elles soient allégées.", score: 0 },
           { text: "Je les applique strictement pendant la période critique.", score: 1 },
           { text: "Je les applique et contribue aux retours d'expérience pour les améliorer si elles s'avèrent inadaptées.", score: 2 }]),
        lq("fp-4-5", "À quelle fréquence participez-vous aux exercices de phishing ou simulations d'incidents organisés dans votre structure ?")
      ]
    },
    "mots-de-passe-acces": {
      "reperer-signaux": [
        cq("mp-1-1", "Vous recevez un email de « votre service IT » vous demandant de réinitialiser votre mot de passe suite à une mise à jour critique. Que faites-vous ?",
          [{ text: "Je clique sur le lien et réinitialise — le service IT envoie ce genre de demandes.", score: 0 },
           { text: "Je vérifie l'adresse de l'expéditeur avant de cliquer.", score: 1 },
           { text: "Je contacte le service IT via l'intranet ou le téléphone pour confirmer avant toute action.", score: 2 }]),
        lq("mp-1-2", "À quelle fréquence vérifiez-vous que les demandes liées à vos accès viennent bien des canaux officiels ?"),
        cq("mp-1-3", "Vous constatez des tentatives de connexion inhabituelles sur votre compte professionnel — heure décalée, localisation étrangère. Que faites-vous ?",
          [{ text: "Je surveille quelques jours pour voir si ça recommence.", score: 0 },
           { text: "Je change mon mot de passe en guise de précaution.", score: 1 },
           { text: "Je change immédiatement mon mot de passe, active le 2FA si ce n'est pas fait et signale à la sécurité informatique.", score: 2 }]),
        cq("mp-1-4", "Un email vous annonce que votre compte sera désactivé dans 24h si vous ne cliquez pas sur un lien de validation. Que faites-vous ?",
          [{ text: "Je clique rapidement pour éviter la désactivation.", score: 0 },
           { text: "Je vérifie attentivement l'adresse de l'expéditeur avant de cliquer.", score: 1 },
           { text: "Je contacte directement le service IT via l'intranet, sans utiliser aucun lien de l'email.", score: 2 }]),
        lq("mp-1-5", "À quelle fréquence vous interrogez-vous sur la façon dont vos accès pourraient être compromis, indépendamment de tout incident récent ?")
      ],
      "proteger-acces": [
        cq("mp-2-1", "Vous utilisez le même mot de passe « fort » sur plusieurs outils professionnels parce qu'il est complexe à retenir. Quelle est votre position sur cette pratique ?",
          [{ text: "C'est raisonnable — un mot de passe fort vaut mieux que plusieurs faibles.", score: 0 },
           { text: "Ce n'est pas idéal, mais les outils internes sont suffisamment sécurisés.", score: 0 },
           { text: "Je le sais problématique et compte diversifier prochainement.", score: 1 },
           { text: "Je diversifie activement et utilise un gestionnaire de mots de passe.", score: 2 }]),
        lq("mp-2-2", "À quelle fréquence utilisez-vous un gestionnaire de mots de passe pour vos accès professionnels ?"),
        cq("mp-2-3", "En télétravail, vous vous connectez depuis un réseau non maîtrisé — café, hôtel. Quelle est votre pratique ?",
          [{ text: "Je me connecte directement — les outils d'entreprise ont leur propre chiffrement.", score: 0 },
           { text: "J'évite les contenus les plus sensibles sur ces réseaux.", score: 1 },
           { text: "J'active systématiquement le VPN de l'entreprise avant toute connexion depuis un réseau non maîtrisé.", score: 2 }]),
        cq("mp-2-4", "On vous demande de créer un mot de passe pour un nouvel outil professionnel. Quelle est votre approche ?",
          [{ text: "Je crée un mot de passe mémorisable basé sur des informations personnelles — prénom, date.", score: 0 },
           { text: "Je mélange lettres, chiffres et caractères spéciaux sur un mot personnel.", score: 1 },
           { text: "Je génère un mot de passe long et aléatoire, stocké dans un gestionnaire dédié.", score: 2 }]),
        lq("mp-2-5", "À quelle fréquence activez-vous le 2FA sur les outils où il est disponible, sans attendre qu'on vous le demande ?")
      ],
      "partager-discernement": [
        cq("mp-3-1", "Un nouveau prestataire a besoin d'accéder temporairement à un outil interne. Comment gérez-vous cela ?",
          [{ text: "Je lui crée un accès avec mes propres identifiants — c'est plus rapide.", score: 0 },
           { text: "Je lui crée un compte temporaire personnel.", score: 1 },
           { text: "Je fais la demande d'un accès nominatif via le processus officiel, avec des droits limités à ses besoins.", score: 2 }]),
        lq("mp-3-2", "À quelle fréquence supprimez-vous les accès dont vous n'avez plus besoin, sans attendre qu'on vous le demande ?"),
        cq("mp-3-3", "En fin de collaboration avec un prestataire, vous oubliez de supprimer son accès. Vous le réalisez deux semaines plus tard. Que faites-vous ?",
          [{ text: "Vous laissez — le prestataire est de confiance.", score: 0 },
           { text: "Vous supprimez l'accès sans en parler.", score: 1 },
           { text: "Vous supprimez l'accès, vérifiez les logs d'activité et signalez l'oubli à votre responsable.", score: 2 }]),
        cq("mp-3-4", "Un collègue vous dit utiliser le même mot de passe sur tous ses outils professionnels parce qu'il est « complexe ». Que faites-vous ?",
          [{ text: "Vous ne dites rien — c'est sa responsabilité.", score: 0 },
           { text: "Vous lui expliquez brièvement pourquoi c'est risqué.", score: 1 },
           { text: "Vous lui expliquez les risques concrets et lui recommandez un gestionnaire de mots de passe.", score: 2 }]),
        lq("mp-3-5", "À quelle fréquence vérifiez-vous que les accès que vous détenez sont encore justifiés par vos missions actuelles ?")
      ],
      "reagir-signaler": [
        cq("mp-4-1", "Vous suspectez que votre mot de passe professionnel a été compromis — quelqu'un a peut-être vu votre écran. Que faites-vous ?",
          [{ text: "Je surveille quelques jours pour voir si quelque chose d'anormal se produit.", score: 0 },
           { text: "Je change immédiatement mon mot de passe.", score: 1 },
           { text: "Je change immédiatement mon mot de passe et en informe la sécurité informatique.", score: 2 }]),
        lq("mp-4-2", "À quelle fréquence signalez-vous immédiatement une suspicion de compromission de vos accès, sans attendre d'en être certain ?"),
        cq("mp-4-3", "Vous avez partagé un accès professionnel en situation d'urgence et réalisez ensuite que c'était une erreur. Que faites-vous ?",
          [{ text: "Vous ne dites rien — la situation était exceptionnelle et tout s'est bien passé.", score: 0 },
           { text: "Vous changez votre mot de passe en guise de précaution.", score: 1 },
           { text: "Vous changez le mot de passe, signalez l'incident et attendez une validation avant de reprendre l'outil.", score: 2 }]),
        cq("mp-4-4", "Un email de phishing ciblant les mots de passe est en circulation dans votre organisation. Un collègue ne semble pas au courant. Que faites-vous ?",
          [{ text: "Vous espérez que les équipes IT l'ont prévenu.", score: 0 },
           { text: "Vous lui signalez rapidement l'existence de la menace.", score: 1 },
           { text: "Vous lui signalez et lui transmettez les caractéristiques concrètes pour qu'il puisse reconnaître l'email.", score: 2 }]),
        lq("mp-4-5", "À quelle fréquence vous tenez-vous informé des nouvelles menaces liées aux mots de passe et aux accès ?")
      ]
    },
    "donnees-confidentielles": {
      "reperer-signaux": [
        cq("dc-1-1", "Un partenaire vous demande par email des informations sur les processus internes de votre organisation, en invoquant un audit de conformité. Que faites-vous ?",
          [{ text: "Je réponds — l'audit de conformité est une démarche normale.", score: 0 },
           { text: "Je transmets les informations générales sans entrer dans les détails sensibles.", score: 1 },
           { text: "Je vérifie l'identité du demandeur et la légitimité de la démarche avant toute réponse.", score: 2 }]),
        lq("dc-1-2", "À quelle fréquence identifiez-vous le degré de sensibilité d'une information avant de la transmettre ?"),
        cq("dc-1-3", "Un prestataire habituel vous demande, pour aller plus vite, des données auxquelles il n'a normalement pas accès. Que faites-vous ?",
          [{ text: "Je lui communique — c'est un partenaire de confiance.", score: 0 },
           { text: "Je lui donne accès à une partie des données demandées.", score: 1 },
           { text: "Je refuse, l'oriente vers le canal officiel et signale la demande atypique à mon responsable.", score: 2 }]),
        cq("dc-1-4", "Lors d'un déplacement, vous réalisez que quelqu'un photographie discrètement les plans affichés dans votre salle de réunion. Que faites-vous ?",
          [{ text: "Vous l'ignorez — les plans affichés ne semblent pas sensibles.", score: 0 },
           { text: "Vous lui demandez discrètement ce qu'il fait.", score: 1 },
           { text: "Vous interrompez la prise de vue et en informez immédiatement le responsable de la réunion.", score: 2 }]),
        lq("dc-1-5", "À quelle fréquence signalez-vous une demande d'information qui vous semble excessive ou hors cadre ?")
      ],
      "proteger-acces": [
        cq("dc-2-1", "Des plans ou schémas sensibles sont affichés dans une salle de réunion accessible aux visiteurs. Que faites-vous ?",
          [{ text: "Vous n'y prêtez pas attention — si c'est affiché, c'est acceptable.", score: 0 },
           { text: "Vous y pensez mais ne faites rien — ce n'est pas directement votre responsabilité.", score: 1 },
           { text: "Vous signalez la situation au responsable des lieux avant toute réunion avec des visiteurs.", score: 2 }]),
        lq("dc-2-2", "À quelle fréquence vérifiez-vous qu'aucun document sensible n'est visible par des personnes non habilitées depuis votre espace de travail ?"),
        cq("dc-2-3", "En open space, un visiteur accompagné circule dans la zone pendant que vous traitez des données sensibles. Comment réagissez-vous ?",
          [{ text: "Je continue normalement — il est accompagné.", score: 0 },
           { text: "Je retourne les documents les plus sensibles.", score: 1 },
           { text: "Je réduis systématiquement l'exposition des données sensibles dès qu'une personne non habilitée est présente.", score: 2 }]),
        cq("dc-2-4", "Vous êtes en télétravail et rejoignez une réunion vidéo sensible depuis un espace partagé. Que faites-vous ?",
          [{ text: "Je rejoins normalement — je suis dans un espace de travail professionnel.", score: 0 },
           { text: "Je baisse le son et veille à ne pas afficher de documents sensibles.", score: 1 },
           { text: "Je reporte ou quitte l'espace partagé avant de rejoindre la réunion.", score: 2 }]),
        lq("dc-2-5", "À quelle fréquence adaptez-vous vos pratiques de travail en fonction du niveau de sensibilité des données que vous traitez ?")
      ],
      "partager-discernement": [
        cq("dc-3-1", "Un client vous demande une copie des données personnelles le concernant. Que faites-vous ?",
          [{ text: "Je lui envoie directement les données demandées — c'est son droit.", score: 0 },
           { text: "Je vérifie son identité avant d'envoyer.", score: 1 },
           { text: "Je vérifie son identité et suis la procédure prévue pour ce type de demande (droits RGPD).", score: 2 }]),
        lq("dc-3-2", "À quelle fréquence consultez-vous le cadre applicable (politique interne, RGPD, contrat) avant de transmettre des données à un tiers ?"),
        cq("dc-3-3", "Vous devez partager des données personnelles avec un sous-traitant. Comment procédez-vous ?",
          [{ text: "Je lui envoie les données par email — il traite régulièrement avec nous.", score: 0 },
           { text: "Je chiffre le fichier avant de l'envoyer.", score: 1 },
           { text: "Je m'assure de l'accord de traitement, utilise le canal sécurisé préconisé et limite les données aux stricts besoins.", score: 2 }]),
        cq("dc-3-4", "Un collègue vous demande d'accéder à des données clients auxquelles il n'a normalement pas accès, pour une situation exceptionnelle. Que faites-vous ?",
          [{ text: "Je lui donne accès — je lui fais confiance et la situation le justifie.", score: 0 },
           { text: "Je lui donne accès en notant la situation.", score: 1 },
           { text: "Je refuse et l'oriente vers la procédure de demande d'accès exceptionnel prévue.", score: 2 }]),
        lq("dc-3-5", "À quelle fréquence vous assurez-vous que les données que vous traitez ne restent pas accessibles plus longtemps que nécessaire ?")
      ],
      "reagir-signaler": [
        cq("dc-4-1", "Vous réalisez avoir envoyé un email contenant des données sensibles au mauvais destinataire. Que faites-vous ?",
          [{ text: "J'envoie un email au mauvais destinataire pour lui demander de l'ignorer.", score: 0 },
           { text: "Je contacte le mauvais destinataire et préviens mon responsable.", score: 1 },
           { text: "Je contacte le mauvais destinataire, préviens mon responsable et signale l'incident via la procédure prévue (DPO si nécessaire).", score: 2 }]),
        lq("dc-4-2", "À quelle fréquence signalez-vous un incident de données, même mineur, via les canaux prévus plutôt que de le gérer seul ?"),
        cq("dc-4-3", "Lors d'un audit, vous réalisez que des données personnelles sont stockées dans un outil non autorisé depuis des mois. Que faites-vous ?",
          [{ text: "Vous régularisez en silence — ça n'a causé aucun problème visible.", score: 0 },
           { text: "Vous migrez les données et en informez votre responsable.", score: 1 },
           { text: "Vous migrez les données, informez votre responsable et signalez l'incident selon la procédure de gestion des incidents de données.", score: 2 }]),
        cq("dc-4-4", "Votre organisation subit une fuite de données. On vous demande de recenser vos partages récents avec des tiers. Comment procédez-vous ?",
          [{ text: "Je reconstitue de mémoire autant que possible.", score: 0 },
           { text: "Je cherche dans mes emails et documents les transmissions des dernières semaines.", score: 1 },
           { text: "Je reconstitue méthodiquement à partir des emails, des outils de partage et des logs d'accès disponibles.", score: 2 }]),
        lq("dc-4-5", "À quelle fréquence tenez-vous un suivi de ce que vous partagez avec des tiers, permettant de le retracer en cas d'incident ?")
      ]
    }
  };

  const CYBER_CHAPTER_DEFS = [
    ["reperer-signaux",       "Repérer les signaux numériques sensibles",    "Identifier les demandes inhabituelles, les urgences artificielles et les signaux faibles."],
    ["proteger-acces",        "Protéger ses accès",                          "Adopter des réflexes fiables sur les mots de passe, appareils et connexions."],
    ["partager-discernement", "Partager les informations avec discernement", "Choisir le bon canal, limiter les transmissions inutiles et protéger les données."],
    ["reagir-signaler",       "Réagir et signaler",                          "Savoir quoi faire quand un doute, une erreur ou un incident numérique apparaît."]
  ];

  function buildCyberChapters(adId) {
    return CYBER_CHAPTER_DEFS.map(function (def, i) {
      return {
        id:          adId + "-chap-" + (i + 1),
        title:       def[1],
        description: def[2],
        questions:   CQ[adId][def[0]],
        profiles:    CYBER_PROFILES[def[0]]
      };
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  CATALOGUE RAW
  // ─────────────────────────────────────────────────────────────────────────

  const raw = [
    ["cybersecurite", "Cybersécurité", "🔐", [
      ["reflexes-cybersecurite",  "Vos réflexes de cybersécurité au quotidien",     "Tous publics",   "Identifier les situations de cybersécurité sensibles, réagir sans paniquer et protéger les informations utiles.",       { built: buildCyberChapters("reflexes-cybersecurite") }],
      ["fraude-phishing",         "Détecter les tentatives de fraude numérique",    "Tous publics",   "Repérer les sollicitations douteuses, les demandes urgentes et les faux signaux de confiance.",                        { built: buildCyberChapters("fraude-phishing") }],
      ["mots-de-passe-acces",     "Gérer ses accès et ses mots de passe",           "Tous publics",   "Adopter les bons réflexes sur les mots de passe, le partage d'accès et les connexions.",                              { built: buildCyberChapters("mots-de-passe-acces") }],
      ["donnees-confidentielles", "Protéger les données et informations sensibles", "Collaborateurs", "Faire les bons arbitrages face aux documents, transferts, exports et accès aux données.",                             { built: buildCyberChapters("donnees-confidentielles") }]
    ]],
    ["securite-surete", "Sécurité & sûreté au travail", "🦺", [
      ["culture-securite-terrain",   "Sécurité & culture de sûreté au quotidien",          "Équipes terrain",          "Identifier les risques, respecter les consignes et signaler les situations sensibles.",                    templates.securiteSurete],
      ["presquaccidents-signalement","Signaler les incidents et presqu'accidents",           "Tous publics",             "Transformer les signaux faibles en actions utiles, sans culpabiliser ni banaliser.",                      templates.securiteSurete],
      ["acces-sites-surete",         "Sûreté des sites, accès et comportements inhabituels","Tous publics",             "Réagir face aux accès non autorisés, intrusions, objets suspects ou situations atypiques.",              templates.securiteSurete],
      ["managers-securite",          "Manager la sécurité sans créer de tension",           "Managers",                 "Faire vivre les règles, traiter les écarts et soutenir les équipes dans les moments à risque.",          templates.securiteSurete],
      ["coactivite-sous-traitance",  "Travailler en coactivité et gérer les prestataires",  "Équipes terrain",          "Coordonner les interventions simultanées, intégrer les sous-traitants et gérer les zones partagées.",    templates.securiteCoactivite],
      ["epi-gestes-securite",        "EPI et gestes de sécurité au quotidien",              "Collaborateurs",           "Porter les bons équipements, maintenir ses réflexes sous contrainte et signaler les anomalies matérielles.", templates.securiteEPI],
      ["securite-manager-arbitrage", "Arbitrer entre sécurité et pression opérationnelle",  "Managers / Encadrants",    "Tenir les exigences de sécurité face aux délais, traiter les écarts et détecter les dérives silencieuses.", templates.securiteManagerArbitrage],
      ["securite-nucleaire",         "Culture de sûreté en environnement nucléaire",        "Tous publics — Nucléaire", "Adopter la posture de questionnement, appliquer la rigueur procédurale et déclarer les événements précurseurs.", templates.securiteNucleaire],
      ["securite-chantier-btp",      "Sécurité sur chantier BTP",                          "Équipes terrain — BTP",    "Sécuriser son poste, gérer la coactivité chantier, respecter le PPSPS et réagir aux incidents.",          templates.securiteChantierBTP]
    ]],
    ["qvt-rps", "QVT & RPS", "🌿", [
      ["rps-signaux-faibles",    "Repérer les signaux faibles de RPS",                      "Tous publics",          "Identifier les tensions, alertes et situations d'isolement dans le quotidien professionnel.",                  templates.qvtRps],
      ["charge-priorites",       "Charge de travail et priorisation",                       "Tous publics",          "Prendre du recul sur l'urgence, les arbitrages et les limites soutenables.",                                  templates.qvtRps],
      ["cooperation-climat",     "Coopération et climat de travail",                        "Collaborateurs",        "Agir dans les irritants du quotidien, désamorcer et préserver la qualité relationnelle.",                      templates.qvtRps],
      ["manager-qvt-rps",        "Manager la charge et les tensions d'équipe",              "Managers",              "Identifier, réguler et orienter sans porter seul les situations sensibles.",                                   templates.qvtRps],
      ["teletravail-hybridation","Télétravail et travail hybride",                          "Collaborateurs",        "Organiser sa présence à distance, maintenir le lien collectif et gérer les irritants de l'hybridation.",       templates.qvtTeletravail],
      ["epuisement-prevention",  "Prévenir l'épuisement professionnel",                    "Collaborateurs",        "Reconnaître ses signaux d'alerte, réguler sa charge dans la durée et oser chercher un appui.",                  templates.qvtEpuisement],
      ["retour-apres-absence",   "Reprendre le travail après une absence",                  "Tous publics",          "Préparer son retour, réintégrer son collectif et calibrer la reprise en charge sans surcompenser.",             templates.qvtRetourAbsence],
      ["manager-signaux-rps",    "Détecter et orienter sans psychologiser",                 "Managers / Encadrants", "Repérer les signaux faibles, intervenir sur le travail et orienter vers les bons relais sans se substituer aux spécialistes.", templates.qvtManagerSignaux]
    ]],
    ["management", "Transformation & management", "🔄", [
      ["changement-reflexes",        "Changer sans se crisper",                             "Tous publics",          "Comprendre ses réflexes face aux changements de méthode, d'outil ou d'organisation.",                              templates.management],
      ["feedback-managerial",        "Donner et recevoir du feedback utile",                "Managers",              "Installer des échanges réguliers, factuels et mobilisables sans créer de posture défensive.",                      templates.management],
      ["manager-engageant-tbf",      "Êtes-vous un manager engageant ?",                   "Managers",              "Questionner sa posture d'engagement, de responsabilisation et de soutien au collectif.",                          templates.management, BADGES.TBF],
      ["pilotage-projet",            "Contribuer efficacement à un projet",                "Collaborateurs",        "Clarifier les rôles, gérer les imprévus et coopérer dans un cadre mouvant.",                                      templates.management],
      ["conduite-changement",        "Accompagner son équipe dans la transformation",       "Managers",              "Comprendre les résistances, relayer les décisions et ancrer les nouvelles pratiques dans la durée.",                templates.mgmtChangement],
      ["responsabilisation-equipe",  "Responsabiliser sans contrôler",                     "Managers",              "Déléguer avec confiance, développer l'autonomie de décision et valoriser l'initiative sans créer de dépendance.",  templates.mgmtResponsabilisation],
      ["collaboration-interequipes", "Coopérer avec les autres équipes",                   "Tous publics",          "Identifier les frictions interéquipes, gérer les dépendances et dépasser les logiques de silos.",                  templates.mgmtCollaboration],
      ["transformation-digitale",    "S'adapter aux nouveaux outils et méthodes",          "Tous publics",          "Trouver sa posture face aux transformations numériques, accompagner les moins à l'aise et questionner les usages.", templates.mgmtDigital],
      ["arbitrage-priorisation",     "Prioriser et arbitrer quand tout est urgent",         "Managers / Encadrants", "Hiérarchiser les demandes, gérer les injonctions contradictoires et tenir ses arbitrages dans la durée.",           templates.mgmtArbitrage]
    ]],
    ["environnement", "RSE — environnement", "🌍", [
      ["sobriete-quotidien",     "Sobriété environnementale au quotidien",         "Tous publics",    "Identifier ses arbitrages concrets sur l'énergie, les déplacements, les achats et les usages.", templates.environnement],
      ["dechets-ressources",     "Réduire les déchets et préserver les ressources","Tous publics",    "Agir sur les petits gestes sans tomber dans l'affichage ou la culpabilisation.",               templates.environnement],
      ["achats-responsables",    "Achats et choix responsables",                   "Fonctions support","Interroger les choix fournisseurs, volumes, usages et impacts dans les décisions courantes.",  templates.environnement],
      ["manager-transition-eco", "Manager la transition environnementale",         "Managers",         "Faire évoluer les pratiques de l'équipe sans injonction ni greenwashing.",                     templates.environnement]
    ]],
    ["ethique", "Éthique & compliance", "⚖️", [
      ["conflits-interets",  "Repérer les conflits d'intérêts",       "Tous publics", "Identifier les zones grises, déclarer et demander conseil avant que la situation ne s'installe.", templates.ethique],
      ["cadeaux-invitations","Cadeaux, invitations et avantages",      "Tous publics", "Savoir arbitrer entre relation professionnelle, usage courant et risque de dépendance.",         templates.ethique],
      ["alerte-ethique",     "Alerter face à une situation sensible",  "Tous publics", "Réagir à un doute, documenter les faits et mobiliser le bon canal sans dramatiser.",             templates.ethique],
      ["manager-compliance", "Faire vivre l'éthique dans son équipe", "Managers",     "Traiter les dilemmes, protéger la parole et installer des repères concrets.",                    templates.ethique]
    ]]
  ];

  // ─────────────────────────────────────────────────────────────────────────
  //  POPULATION
  // ─────────────────────────────────────────────────────────────────────────

  window.ITS_CATALOGUE = [];
  window.ITS_THEMES    = [];

  raw.forEach(function (theme) {
    window.ITS_THEMES.push({ key: theme[0], label: theme[1], icon: theme[2] });

    theme[3].forEach(function (ad) {
      const template      = ad[4];
      const specificBadge = ad[5];
      const tags = specificBadge
  ? [specificBadge, BADGES.AIDE, BADGES.REVIEW]
  : [BADGES.IA, BADGES.AIDE, BADGES.REVIEW];

      const chapters = template.built
        ? template.built
        : makeChapters(ad[0], template.domain, template.chapters, tags);

      window.ITS_CATALOGUE.push({
        id:          ad[0],
        themeKey:    theme[0],
        theme:       theme[1],
        icon:        theme[2],
        title:       ad[1],
        audience:    ad[2],
        description: ad[3],
        tags:        tags,
        duration:    "8 à 12 min",
        intro:       "Bienvenue dans cet autodiagnostic consacré à " + ad[1].toLowerCase() + ". Il vous propose des situations concrètes du quotidien professionnel pour vous aider à identifier vos réflexes, vos points d'appui et vos axes de progression. Cet autodiagnostic est entièrement anonyme : aucun login, aucun mot de passe, aucun cookie, aucun suivi d'adresse IP. Les résultats seront analysés de manière agrégée.",
        chapters:    chapters
      });
    });
  });

})();
