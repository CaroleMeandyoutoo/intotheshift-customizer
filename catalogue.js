/* Catalogue central Into The Shift Customizer
   Toutes les pages lisent ce fichier. Ne pas mettre de contenu propriétaire Me&YouToo ici. */
(function(){
  const SCORE_PROFILES = [
    { level:'Repères à consolider', min:0, max:0.99 },
    { level:'Pratiques en construction', min:1, max:1.59 },
    { level:'Réflexes installés', min:1.6, max:2 }
  ];

  const THEMES = [
    { key:'risques-numeriques', label:'Risques numériques', icon:'🔐', ads:[
      ['reflexes-risques-numeriques','Vos réflexes face aux risques numériques','Tous publics','Identifier les situations numériques sensibles, réagir sans paniquer et protéger les informations utiles.'],
      ['fraude-phishing','Détecter les tentatives de fraude numérique','Tous publics','Repérer les sollicitations douteuses, les demandes urgentes et les faux signaux de confiance.'],
      ['mots-de-passe-acces','Gérer ses accès et ses mots de passe','Tous publics','Adopter les bons réflexes sur les mots de passe, le partage d’accès et les connexions.'],
      ['donnees-confidentielles','Protéger les données et informations sensibles','Collaborateurs','Faire les bons arbitrages face aux documents, transferts, exports et outils numériques.']
    ]},
    { key:'securite-surete', label:'Sécurité & sûreté au travail', icon:'🦺', ads:[
      ['culture-securite-terrain','Sécurité & culture de sûreté au quotidien','Équipes terrain','Identifier les risques, respecter les consignes et signaler les situations sensibles.'],
      ['presquaccidents-signalement','Signaler les incidents et presqu’accidents','Tous publics','Transformer les signaux faibles en actions utiles, sans culpabiliser ni banaliser.'],
      ['acces-sites-surete','Sûreté des sites, accès et comportements inhabituels','Tous publics','Réagir face aux accès non autorisés, intrusions, objets suspects ou situations atypiques.'],
      ['managers-securite','Manager la sécurité sans créer de tension','Managers','Faire vivre les règles, traiter les écarts et soutenir les équipes dans les moments à risque.']
    ]},
    { key:'qvt-rps', label:'QVT & RPS', icon:'🌿', ads:[
      ['rps-signaux-faibles','Repérer les signaux faibles de RPS','Tous publics','Identifier les tensions, alertes et situations d’isolement dans le quotidien professionnel.'],
      ['charge-priorites','Charge de travail et priorisation','Tous publics','Prendre du recul sur l’urgence, les arbitrages et les limites soutenables.'],
      ['cooperation-climat','Coopération et climat de travail','Collaborateurs','Agir dans les irritants du quotidien, désamorcer et préserver la qualité relationnelle.'],
      ['manager-qvt-rps','Manager la charge et les tensions d’équipe','Managers','Identifier, réguler et orienter sans porter seul les situations sensibles.']
    ]},
    { key:'transformation-management', label:'Transformation & management', icon:'🔄', ads:[
      ['changement-reflexes','Changer sans se crisper','Tous publics','Comprendre ses réflexes face aux changements de méthode, d’outil ou d’organisation.'],
      ['feedback-managerial','Donner et recevoir du feedback utile','Managers','Installer des échanges réguliers, factuels et mobilisables sans créer de posture défensive.'],
      ['manager-engageant-tbf','Êtes-vous un manager engageant ?','Managers','Questionner sa posture d’engagement, de responsabilisation et de soutien au collectif.','Conçu par The Big Factory'],
      ['pilotage-projet','Contribuer efficacement à un projet','Collaborateurs','Clarifier les rôles, gérer les imprévus et coopérer dans un cadre mouvant.']
    ]},
    { key:'environnement', label:'RSE — environnement', icon:'🌍', ads:[
      ['sobriete-quotidien','Sobriété environnementale au quotidien','Tous publics','Identifier ses arbitrages concrets sur l’énergie, les déplacements, les achats et les usages.'],
      ['dechets-ressources','Réduire les déchets et préserver les ressources','Tous publics','Agir sur les petits gestes sans tomber dans l’affichage ou la culpabilisation.'],
      ['achats-responsables','Achats et choix responsables','Fonctions support','Interroger les choix fournisseurs, volumes, usages et impacts dans les décisions courantes.'],
      ['manager-transition-eco','Manager la transition environnementale','Managers','Faire évoluer les pratiques de l’équipe sans injonction ni greenwashing.']
    ]},
    { key:'ethique-compliance', label:'Éthique & compliance', icon:'⚖️', ads:[
      ['conflits-interets','Repérer les conflits d’intérêts','Tous publics','Identifier les zones grises, déclarer et demander conseil avant que la situation ne s’installe.'],
      ['cadeaux-invitations','Cadeaux, invitations et avantages','Tous publics','Savoir arbitrer entre relation professionnelle, usage courant et risque de dépendance.'],
      ['alerte-ethique','Alerter face à une situation sensible','Tous publics','Réagir à un doute, documenter les faits et mobiliser le bon canal sans dramatiser.'],
      ['manager-compliance','Faire vivre l’éthique dans son équipe','Managers','Traiter les dilemmes, protéger la parole et installer des repères concrets.']
    ]},
    { key:'relation-client', label:'Relation client', icon:'🤝', ads:[
      ['posture-client','Posture client et qualité de service','Tous publics','Adapter sa réponse aux situations de tension, d’attente ou d’insatisfaction.'],
      ['reclamations','Gérer les réclamations sans sur-réagir','Tous publics','Traiter les insatisfactions avec calme, précision et engagement réaliste.'],
      ['promesses-delais','Promesses, délais et engagements','Tous publics','Savoir dire ce qui est possible, alerter tôt et préserver la confiance.'],
      ['manager-relation-client','Piloter une culture client dans l’équipe','Managers','Créer des repères communs sur la qualité de réponse, la priorisation et l’escalade.']
    ]}
  ];

  const chapterTemplates = {
    'risques-numeriques': [
      ['Repérer les signaux numériques sensibles','Identifier les demandes inhabituelles, les urgences artificielles et les signaux faibles.'],
      ['Protéger ses accès','Adopter des réflexes fiables sur les mots de passe, appareils et connexions.'],
      ['Partager les informations avec discernement','Choisir le bon canal et limiter les transmissions inutiles.'],
      ['Réagir et signaler','Savoir quoi faire quand un doute ou un incident apparaît.']
    ],
    'securite-surete': [
      ['Identifier les risques','Observer son environnement et repérer les situations sensibles.'],
      ['Appliquer les bons réflexes','Maintenir les gestes utiles même sous pression.'],
      ['Contribuer à la sécurité collective','Intervenir avec tact et soutenir les pratiques sûres.'],
      ['Réagir et signaler','Faire remonter les incidents, anomalies et signaux faibles.']
    ],
    'qvt-rps': [
      ['Repérer les signaux faibles','Identifier fatigue, tensions, isolement et alertes relationnelles.'],
      ['Réguler la charge','Prioriser, demander de l’aide et clarifier les urgences.'],
      ['Préserver les relations de travail','Désamorcer les irritants et maintenir un dialogue constructif.'],
      ['Mobiliser les bons relais','Savoir quand et comment alerter sans exposer inutilement.']
    ],
    'transformation-management': [
      ['Comprendre le changement','Identifier ce qui bouge vraiment et ce qui reste stable.'],
      ['Coopérer dans l’incertitude','Avancer avec des informations incomplètes sans bloquer le collectif.'],
      ['Donner du feedback utile','Formuler des retours concrets, recevables et orientés action.'],
      ['Ancrer les nouvelles pratiques','Transformer l’intention en habitudes professionnelles.']
    ],
    'environnement': [
      ['Identifier les impacts','Relier les gestes du quotidien à des effets environnementaux concrets.'],
      ['Arbitrer sobrement','Faire des choix réalistes sans culpabilisation ni affichage.'],
      ['Coopérer autour des pratiques','Faire évoluer les usages avec les collègues et prestataires.'],
      ['Faire durer les changements','Installer des réflexes simples et mesurables dans le temps.']
    ],
    'ethique-compliance': [
      ['Identifier les zones grises','Repérer ce qui n’est pas illégal en apparence mais peut poser problème.'],
      ['Demander conseil au bon moment','Ne pas rester seul face à un doute ou une pression.'],
      ['Documenter et alerter','Décrire les faits, protéger les personnes et utiliser le bon canal.'],
      ['Créer une culture de vigilance','Rendre les règles compréhensibles et applicables au quotidien.']
    ],
    'relation-client': [
      ['Comprendre la situation client','Distinguer urgence réelle, émotion, contrainte et attente implicite.'],
      ['Répondre avec justesse','Formuler une réponse claire sans surpromettre.'],
      ['Gérer les tensions','Rester professionnel face à l’insatisfaction ou à l’agacement.'],
      ['Capitaliser collectivement','Partager les apprentissages pour améliorer la qualité de service.']
    ]
  };

  const situations = [
    'Vous recevez une demande urgente qui semble venir d’une personne connue, mais le ton paraît inhabituel. Que faites-vous ?',
    'Une consigne est contournée pour gagner du temps avant une échéance. Quelle réaction adoptez-vous ?',
    'Un collègue vous demande une information sans expliquer pourquoi il en a besoin. Que faites-vous ?',
    'Vous constatez un écart entre la procédure prévue et la pratique réelle de l’équipe. Que faites-vous ?',
    'Une situation vous semble ambiguë, mais personne autour de vous ne réagit. Quelle est votre première réaction ?',
    'On vous demande de traiter rapidement un sujet alors qu’il manque une information importante. Que faites-vous ?',
    'Un nouvel outil ou process est lancé avec peu d’explications. Comment vous positionnez-vous ?',
    'Vous remarquez qu’une habitude collective crée un risque ou une difficulté récurrente. Que faites-vous ?',
    'Une personne minimise une alerte en disant que “ça a toujours été comme ça”. Comment réagissez-vous ?',
    'Vous devez choisir entre aller vite et vérifier un point important. Que privilégiez-vous ?',
    'Vous avez un doute sur la bonne conduite à tenir, mais vous craignez de ralentir le travail. Que faites-vous ?',
    'Après un incident mineur, tout le monde reprend son activité comme si de rien n’était. Quelle attitude adoptez-vous ?'
  ];

  function answers(i){
    const sets = [
      [
        ['Je traite rapidement la situation pour éviter de bloquer.',0],
        ['Je demande un avis informel à une personne proche.',1],
        ['Je vérifie le cadre applicable avant d’agir.',2]
      ],
      [
        ['Je fais comme d’habitude, puisque cela fonctionne souvent.',0],
        ['J’ajuste prudemment sans forcément formaliser.',1],
        ['Je clarifie la règle et signale le point si nécessaire.',2],
        ['Je propose une amélioration pour éviter que cela se reproduise.',2]
      ],
      [
        ['Je laisse passer, ce n’est probablement pas grave.',0],
        ['Je garde le point en tête pour plus tard.',1],
        ['J’en parle à la bonne personne avec des faits précis.',2]
      ],
      [
        ['Je réponds à la demande sans poser trop de questions.',0],
        ['Je demande une précision minimale avant de continuer.',1],
        ['Je vérifie le besoin, le niveau de risque et le bon canal.',2],
        ['Je documente la décision pour garder une trace.',2]
      ]
    ];
    return sets[i % sets.length].map(([text,score])=>({text,score}));
  }

  function makeQuestion(adId, chapIdx, qIdx){
    const idx = (chapIdx*5 + qIdx) % situations.length;
    return {
      id:`${adId}-c${chapIdx+1}-q${qIdx+1}`,
      type:'choix',
      text:situations[idx],
      answers:answers(idx),
      clientComment:''
    };
  }

  function makeProfiles(themeLabel, chapterTitle){
    return SCORE_PROFILES.map((p,i)=>({
      level:p.level,
      min:p.min,
      max:p.max,
      title:[
        `Repères à consolider — ${chapterTitle}`,
        `Pratiques en construction — ${chapterTitle}`,
        `Réflexes installés — ${chapterTitle}`
      ][i],
      summary:[
        `Les réflexes liés à “${chapterTitle}” existent, mais restent encore irréguliers.`,
        `Les pratiques sont présentes dans les situations courantes, mais peuvent se fragiliser dans les zones grises.`,
        `Les réflexes sont structurés et mobilisables même dans les situations moins évidentes.`
      ][i],
      description:[
        `Sur cette dimension, la personne identifie certains enjeux mais n’a pas encore des repères suffisamment stables. L’objectif est d’installer des réflexes simples, applicables au quotidien et partagés avec le collectif.`,
        `Sur cette dimension, la personne dispose déjà de bases utiles. Elle sait agir dans plusieurs situations, mais certains arbitrages demandent encore de la clarification ou un appui du collectif.`,
        `Sur cette dimension, la personne agit avec constance et discernement. Elle contribue à sécuriser les pratiques et peut devenir un relais positif pour le collectif.`
      ][i]
    }));
  }

  function makeChapters(themeKey, themeLabel, adId){
    const tpl = chapterTemplates[themeKey] || chapterTemplates['transformation-management'];
    return tpl.map((c,ci)=>({
      id:`${adId}-chap-${ci+1}`,
      title:c[0],
      goal:c[1],
      description:c[1],
      situations:Array.from({length:5},(_,qi)=>makeQuestion(adId,ci,qi)),
      bank:Array.from({length:7},(_,qi)=>makeQuestion(adId,ci,qi+5)),
      profiles:makeProfiles(themeLabel,c[0])
    }));
  }

  const catalogue = [];

  THEMES.forEach(theme=>{
    theme.ads.forEach(([id,title,audience,description,extraTag])=>{
      catalogue.push({
        id,
        themeKey:theme.key,
        theme:theme.label,
        icon:theme.icon,
        title,
        audience,
        description,
        tags:[extraTag || 'Base assistée par IA'],
        duration:'5 à 7 min',
        chapters:makeChapters(theme.key, theme.label, id)
      });
    });
  });

  window.INTO_THE_SHIFT_CATALOGUE = catalogue;
  window.INTO_THE_SHIFT_THEMES = THEMES.map(t=>({
    key:t.key,
    label:t.label,
    icon:t.icon
  }));
})();
