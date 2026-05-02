(function(){
  function answers(seed){
    const sets = [
      [
        {text:"Je traite rapidement la situation pour éviter de bloquer.", score:0},
        {text:"Je demande un avis informel à une personne proche.", score:1},
        {text:"Je vérifie le cadre applicable avant d’agir.", score:2}
      ],
      [
        {text:"Je fais comme d’habitude, puisque cela fonctionne souvent.", score:0},
        {text:"J’ajuste prudemment sans forcément formaliser.", score:1},
        {text:"Je clarifie la règle et signale le point si nécessaire.", score:2},
        {text:"Je propose une amélioration pour éviter que cela se reproduise.", score:2}
      ],
      [
        {text:"Je laisse passer, ce n’est probablement pas grave.", score:0},
        {text:"Je garde le point en tête pour plus tard.", score:1},
        {text:"J’en parle à la bonne personne avec des faits précis.", score:2}
      ]
    ];
    return sets[seed % sets.length];
  }

  function makeProfiles(chapterTitle){
    return [
      {
        level:"Repères à consolider",
        min:0,
        max:0.99,
        title:"Repères à consolider — " + chapterTitle,
        summary:"Les réflexes existent, mais restent encore irréguliers.",
        description:"Sur cette dimension, les repères ne sont pas encore assez stables pour guider les décisions dans les situations moins évidentes."
      },
      {
        level:"Pratiques en construction",
        min:1,
        max:1.59,
        title:"Pratiques en construction — " + chapterTitle,
        summary:"Les pratiques sont présentes, mais peuvent se fragiliser dans les zones grises.",
        description:"Sur cette dimension, les bases sont présentes. L’enjeu est maintenant de gagner en constance et en clarté dans les arbitrages."
      },
      {
        level:"Réflexes installés",
        min:1.6,
        max:2,
        title:"Réflexes installés — " + chapterTitle,
        summary:"Les réflexes sont structurés et mobilisables dans le quotidien.",
        description:"Sur cette dimension, les comportements sont installés. Ils peuvent devenir un point d’appui pour le collectif."
      }
    ];
  }

  const situationBank = [
    "Vous recevez une demande urgente qui semble venir d’une personne connue, mais le ton paraît inhabituel. Que faites-vous ?",
    "Une consigne est contournée pour gagner du temps avant une échéance. Quelle réaction adoptez-vous ?",
    "Un collègue vous demande une information sans expliquer pourquoi il en a besoin. Que faites-vous ?",
    "Vous constatez un écart entre la procédure prévue et la pratique réelle de l’équipe. Que faites-vous ?",
    "Une situation vous semble ambiguë, mais personne autour de vous ne réagit. Quelle est votre première réaction ?",
    "On vous demande de traiter rapidement un sujet alors qu’il manque une information importante. Que faites-vous ?",
    "Un nouvel outil ou process est lancé avec peu d’explications. Comment vous positionnez-vous ?",
    "Vous remarquez qu’une habitude collective crée un risque ou une difficulté récurrente. Que faites-vous ?",
    "Une personne minimise une alerte en disant que “ça a toujours été comme ça”. Comment réagissez-vous ?",
    "Vous devez choisir entre aller vite et vérifier un point important. Que privilégiez-vous ?"
  ];

  function makeQuestions(prefix, chapterIndex){
    return Array.from({length:5}, function(_, i){
      const k = (chapterIndex * 5 + i) % situationBank.length;
      return {
        id: prefix + "-q" + (chapterIndex+1) + "-" + (i+1),
        type:"choix",
        text:situationBank[k],
        answers:answers(k),
        tags:["Base assistée par IA"]
      };
    });
  }

  function makeChapters(prefix, chapters){
    return chapters.map(function(c, i){
      return {
        id: prefix + "-chap-" + (i+1),
        title:c[0],
        description:c[1],
        questions:makeQuestions(prefix, i),
        profiles:makeProfiles(c[0])
      };
    });
  }

  const templates = {
    risquesNumeriques:[
      ["Repérer les signaux numériques sensibles","Identifier les demandes inhabituelles, les urgences artificielles et les signaux faibles."],
      ["Protéger ses accès","Adopter des réflexes fiables sur les mots de passe, appareils et connexions."],
      ["Partager les informations avec discernement","Choisir le bon canal et limiter les transmissions inutiles."],
      ["Réagir et signaler","Savoir quoi faire quand un doute ou un incident apparaît."]
    ],
    securiteSurete:[
      ["Identifier les risques","Observer son environnement et repérer les situations sensibles."],
      ["Appliquer les bons réflexes","Maintenir les gestes utiles même sous pression."],
      ["Contribuer à la sécurité collective","Intervenir avec tact et soutenir les pratiques sûres."],
      ["Réagir et signaler","Faire remonter les incidents, anomalies et signaux faibles."]
    ],
    qvtRps:[
      ["Repérer les signaux faibles","Identifier fatigue, tensions, isolement et alertes relationnelles."],
      ["Réguler la charge","Prioriser, demander de l’aide et clarifier les urgences."],
      ["Préserver les relations de travail","Désamorcer les irritants et maintenir un dialogue constructif."],
      ["Mobiliser les bons relais","Savoir quand et comment alerter sans exposer inutilement."]
    ],
    management:[
      ["Comprendre le changement","Identifier ce qui bouge vraiment et ce qui reste stable."],
      ["Coopérer dans l’incertitude","Avancer avec des informations incomplètes sans bloquer le collectif."],
      ["Donner du feedback utile","Formuler des retours concrets, recevables et orientés action."],
      ["Ancrer les nouvelles pratiques","Transformer l’intention en habitudes professionnelles."]
    ],
    environnement:[
      ["Identifier les impacts","Relier les gestes du quotidien à des effets environnementaux concrets."],
      ["Arbitrer sobrement","Faire des choix réalistes sans culpabilisation ni affichage."],
      ["Coopérer autour des pratiques","Faire évoluer les usages avec les collègues et prestataires."],
      ["Faire durer les changements","Installer des réflexes simples et mesurables dans le temps."]
    ],
    ethique:[
      ["Identifier les zones grises","Repérer ce qui n’est pas illégal en apparence mais peut poser problème."],
      ["Demander conseil au bon moment","Ne pas rester seul face à un doute ou une pression."],
      ["Documenter et alerter","Décrire les faits, protéger les personnes et utiliser le bon canal."],
      ["Créer une culture de vigilance","Rendre les règles compréhensibles et applicables au quotidien."]
    ]
  };

  const raw = [
    ["risques-numeriques","Risques numériques","🔐",[
      ["reflexes-risques-numeriques","Vos réflexes face aux risques numériques","Tous publics","Identifier les situations numériques sensibles, réagir sans paniquer et protéger les informations utiles.",templates.risquesNumeriques],
      ["fraude-phishing","Détecter les tentatives de fraude numérique","Tous publics","Repérer les sollicitations douteuses, les demandes urgentes et les faux signaux de confiance.",templates.risquesNumeriques],
      ["mots-de-passe-acces","Gérer ses accès et ses mots de passe","Tous publics","Adopter les bons réflexes sur les mots de passe, le partage d’accès et les connexions.",templates.risquesNumeriques],
      ["donnees-confidentielles","Protéger les données et informations sensibles","Collaborateurs","Faire les bons arbitrages face aux documents, transferts, exports et outils numériques.",templates.risquesNumeriques]
    ]],
    ["securite-surete","Sécurité & sûreté au travail","🦺",[
      ["culture-securite-terrain","Sécurité & culture de sûreté au quotidien","Équipes terrain","Identifier les risques, respecter les consignes et signaler les situations sensibles.",templates.securiteSurete],
      ["presquaccidents-signalement","Signaler les incidents et presqu’accidents","Tous publics","Transformer les signaux faibles en actions utiles, sans culpabiliser ni banaliser.",templates.securiteSurete],
      ["acces-sites-surete","Sûreté des sites, accès et comportements inhabituels","Tous publics","Réagir face aux accès non autorisés, intrusions, objets suspects ou situations atypiques.",templates.securiteSurete],
      ["managers-securite","Manager la sécurité sans créer de tension","Managers","Faire vivre les règles, traiter les écarts et soutenir les équipes dans les moments à risque.",templates.securiteSurete]
    ]],
    ["qvt-rps","QVT & RPS","🌿",[
      ["rps-signaux-faibles","Repérer les signaux faibles de RPS","Tous publics","Identifier les tensions, alertes et situations d’isolement dans le quotidien professionnel.",templates.qvtRps],
      ["charge-priorites","Charge de travail et priorisation","Tous publics","Prendre du recul sur l’urgence, les arbitrages et les limites soutenables.",templates.qvtRps],
      ["cooperation-climat","Coopération et climat de travail","Collaborateurs","Agir dans les irritants du quotidien, désamorcer et préserver la qualité relationnelle.",templates.qvtRps],
      ["manager-qvt-rps","Manager la charge et les tensions d’équipe","Managers","Identifier, réguler et orienter sans porter seul les situations sensibles.",templates.qvtRps]
    ]],
    ["management","Transformation & management","🔄",[
      ["changement-reflexes","Changer sans se crisper","Tous publics","Comprendre ses réflexes face aux changements de méthode, d’outil ou d’organisation.",templates.management],
      ["feedback-managerial","Donner et recevoir du feedback utile","Managers","Installer des échanges réguliers, factuels et mobilisables sans créer de posture défensive.",templates.management],
      ["manager-engageant-tbf","Êtes-vous un manager engageant ?","Managers","Questionner sa posture d’engagement, de responsabilisation et de soutien au collectif.",templates.management,"Conçu par The Big Factory"],
      ["pilotage-projet","Contribuer efficacement à un projet","Collaborateurs","Clarifier les rôles, gérer les imprévus et coopérer dans un cadre mouvant.",templates.management]
    ]],
    ["environnement","RSE — environnement","🌍",[
      ["sobriete-quotidien","Sobriété environnementale au quotidien","Tous publics","Identifier ses arbitrages concrets sur l’énergie, les déplacements, les achats et les usages.",templates.environnement],
      ["dechets-ressources","Réduire les déchets et préserver les ressources","Tous publics","Agir sur les petits gestes sans tomber dans l’affichage ou la culpabilisation.",templates.environnement],
      ["achats-responsables","Achats et choix responsables","Fonctions support","Interroger les choix fournisseurs, volumes, usages et impacts dans les décisions courantes.",templates.environnement],
      ["manager-transition-eco","Manager la transition environnementale","Managers","Faire évoluer les pratiques de l’équipe sans injonction ni greenwashing.",templates.environnement]
    ]],
    ["ethique","Éthique & compliance","⚖️",[
      ["conflits-interets","Repérer les conflits d’intérêts","Tous publics","Identifier les zones grises, déclarer et demander conseil avant que la situation ne s’installe.",templates.ethique],
      ["cadeaux-invitations","Cadeaux, invitations et avantages","Tous publics","Savoir arbitrer entre relation professionnelle, usage courant et risque de dépendance.",templates.ethique],
      ["alerte-ethique","Alerter face à une situation sensible","Tous publics","Réagir à un doute, documenter les faits et mobiliser le bon canal sans dramatiser.",templates.ethique],
      ["manager-compliance","Faire vivre l’éthique dans son équipe","Managers","Traiter les dilemmes, protéger la parole et installer des repères concrets.",templates.ethique]
    ]]
  ];

  window.ITS_CATALOGUE = [];
  window.ITS_THEMES = [];

  raw.forEach(function(theme){
    window.ITS_THEMES.push({key:theme[0], label:theme[1], icon:theme[2]});
    theme[3].forEach(function(ad){
      window.ITS_CATALOGUE.push({
        id:ad[0],
        themeKey:theme[0],
        theme:theme[1],
        icon:theme[2],
        title:ad[1],
        audience:ad[2],
        description:ad[3],
        tags:[ad[5] || "Base assistée par IA"],
        duration:"5 à 7 min",
        intro:"Bienvenue dans cet autodiagnostic consacré à " + ad[1].toLowerCase() + ". Il vous propose des situations concrètes du quotidien professionnel pour vous aider à identifier vos réflexes, vos points d’appui et vos axes de progression. Cet autodiagnostic est entièrement anonyme : aucun login, aucun mot de passe, aucun cookie, aucun suivi d’adresse IP. Les résultats seront analysés de manière agrégée.",
        chapters:makeChapters(ad[0], ad[4])
      });
    });
  });
})();
