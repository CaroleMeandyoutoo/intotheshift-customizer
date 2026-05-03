(function(){
  const BADGES = {
    IA: "Base assistée par IA",
    VALIDATION: "Validation obligatoire avant lancement",
    TBF: "Conçu par The Big Factory"
  };

  function answerSets(domain, seed){
    const sets = {
      cyber: [
        [
          {text:"Je traite la demande rapidement, puisqu’elle semble venir d’une personne connue.", score:0},
          {text:"Je réponds en demandant une confirmation, sans changer de canal.", score:1},
          {text:"Je vérifie l’expéditeur, le lien et le contexte avant toute action.", score:2},
          {text:"Je signale la demande si elle présente plusieurs indices suspects.", score:2}
        ],
        [
          {text:"J’utilise le canal le plus pratique pour aller vite.", score:0},
          {text:"Je limite les informations partagées, même si je ne vérifie pas tout.", score:1},
          {text:"Je choisis un canal sécurisé et je vérifie le besoin réel.", score:2}
        ],
        [
          {text:"Je partage l’accès ou le fichier pour ne pas bloquer le travail.", score:0},
          {text:"Je demande pourquoi c’est nécessaire avant de décider.", score:1},
          {text:"Je refuse le partage direct et propose une solution conforme.", score:2}
        ]
      ],

      securite: [
        [
          {text:"Je laisse faire, car l’équipe connaît sûrement la situation.", score:0},
          {text:"Je fais une remarque rapide si le risque me semble important.", score:1},
          {text:"Je signale le point avec des faits précis et sans accuser.", score:2},
          {text:"Je contribue à clarifier la règle pour éviter que cela se reproduise.", score:2}
        ],
        [
          {text:"Je privilégie l’avancement, la vérification pourra attendre.", score:0},
          {text:"Je vérifie seulement les points qui me semblent les plus critiques.", score:1},
          {text:"Je maintiens l’étape de sécurité même si cela prend plus de temps.", score:2}
        ],
        [
          {text:"Je considère que chacun est responsable de ses propres gestes.", score:0},
          {text:"J’alerte discrètement si je suis directement concerné·e.", score:1},
          {text:"J’interviens avec tact pour éviter qu’un risque collectif s’installe.", score:2}
        ]
      ],

      qvt: [
        [
          {text:"Je laisse la personne gérer, chacun a sa manière de travailler.", score:0},
          {text:"Je prends des nouvelles de manière informelle si l’occasion se présente.", score:1},
          {text:"Je propose un échange factuel sur la charge ou les priorités.", score:2}
        ],
        [
          {text:"Je m’adapte, même si cela désorganise mon travail.", score:0},
          {text:"Je signale que c’est compliqué, sans forcément demander d’arbitrage.", score:1},
          {text:"Je clarifie les priorités et les délais avant de m’engager.", score:2}
        ],
        [
          {text:"J’évite d’intervenir pour ne pas créer de tension.", score:0},
          {text:"Je temporise et j’attends de voir si la situation se calme.", score:1},
          {text:"Je contribue à remettre les faits et les besoins au centre de l’échange.", score:2},
          {text:"Je mobilise un relais si la situation dépasse le cadre habituel.", score:2}
        ]
      ],

      management: [
        [
          {text:"J’avance avec les informations disponibles, quitte à ajuster plus tard.", score:0},
          {text:"Je demande quelques précisions mais sans formaliser le cadre.", score:1},
          {text:"Je clarifie les attendus, les rôles et les prochaines étapes.", score:2}
        ],
        [
          {text:"Je donne mon avis directement, même si la personne peut mal le prendre.", score:0},
          {text:"Je formule un retour général pour éviter d’être trop frontal·e.", score:1},
          {text:"Je m’appuie sur des faits précis et une piste d’amélioration concrète.", score:2}
        ],
        [
          {text:"Je considère que les personnes doivent s’adapter d’elles-mêmes.", score:0},
          {text:"J’accompagne ponctuellement quand une difficulté apparaît.", score:1},
          {text:"Je crée des repères réguliers pour soutenir l’autonomie et l’engagement.", score:2}
        ]
      ],

      environnement: [
        [
          {text:"Je fais comme d’habitude, l’impact est probablement limité.", score:0},
          {text:"Je choisis l’option la plus simple si elle reste raisonnable.", score:1},
          {text:"Je questionne l’impact réel et propose une option plus sobre.", score:2}
        ],
        [
          {text:"Je préfère éviter le sujet pour ne pas passer pour moralisateur·rice.", score:0},
          {text:"Je suggère une alternative si elle ne complique pas trop l’organisation.", score:1},
          {text:"Je propose un ajustement concret, réaliste et mesurable.", score:2}
        ],
        [
          {text:"Je traite l’urgence sans intégrer le critère environnemental.", score:0},
          {text:"Je cherche un compromis mais sans remettre en cause la demande.", score:1},
          {text:"J’intègre l’impact environnemental dans l’arbitrage dès le départ.", score:2}
        ]
      ],

      ethique: [
        [
          {text:"Je règle la situation rapidement, puisqu’elle paraît mineure.", score:0},
          {text:"Je demande un avis informel à une personne de confiance.", score:1},
          {text:"Je vérifie le cadre applicable avant de décider.", score:2},
          {text:"Je trace ou signale le point si le risque est réel.", score:2}
        ],
        [
          {text:"Je garde l’information pour moi afin d’éviter de compliquer la relation.", score:0},
          {text:"J’attends de voir si la situation se confirme.", score:1},
          {text:"Je documente les faits et j’utilise le bon canal de conseil ou d’alerte.", score:2}
        ],
        [
          {text:"Je me fie à mon intuition, car les règles ne couvrent pas tout.", score:0},
          {text:"Je cherche une solution prudente sans forcément formaliser.", score:1},
          {text:"Je clarifie le risque, les personnes concernées et la règle à appliquer.", score:2}
        ]
      ]
    };

    const selected = sets[domain] || sets.management;
    return selected[seed % selected.length];
  }

  function makeProfiles(chapterTitle){
    return [
      {
        level:"Repères à consolider",
        min:0,
        max:0.99,
        title:"Repères à consolider — " + chapterTitle,
        summary:"Les réflexes existent, mais restent encore irréguliers.",
        description:"Sur cette dimension, les repères ne sont pas encore assez stables pour guider les décisions dans les situations moins évidentes. L’enjeu est de mieux identifier les situations sensibles et de s’appuyer davantage sur le cadre, les faits ou les bons relais."
      },
      {
        level:"Pratiques en construction",
        min:1,
        max:1.59,
        title:"Pratiques en construction — " + chapterTitle,
        summary:"Les pratiques sont présentes, mais peuvent se fragiliser dans les zones grises.",
        description:"Sur cette dimension, les bases sont présentes. L’enjeu est maintenant de gagner en constance, de mieux formaliser les arbitrages et de ne pas rester seul·e face aux situations ambiguës."
      },
      {
        level:"Réflexes installés",
        min:1.6,
        max:2,
        title:"Réflexes installés — " + chapterTitle,
        summary:"Les réflexes sont structurés et mobilisables dans le quotidien.",
        description:"Sur cette dimension, les comportements sont installés. Ils peuvent devenir un point d’appui pour le collectif, notamment pour clarifier les règles, sécuriser les pratiques et encourager des décisions plus responsables."
      }
    ];
  }

  const questionBanks = {
    cyber: [
      "Vous recevez un email de relance fournisseur avec un lien de paiement inhabituel. Que faites-vous ?",
      "Une personne connue vous écrit avec un ton inhabituel et vous demande une action urgente. Que faites-vous ?",
      "Un collègue vous demande votre mot de passe pour finaliser une tâche pendant votre absence. Que faites-vous ?",
      "Vous devez envoyer un fichier contenant des données clients à un prestataire. Quelle précaution prenez-vous ?",
      "Un QR code affiché dans un espace commun promet un accès rapide à un service interne. Que faites-vous ?",
      "Vous recevez une pièce jointe inattendue d’un contact professionnel réel. Comment réagissez-vous ?",
      "Une fenêtre de connexion apparaît après avoir cliqué sur un lien reçu par email. Que faites-vous ?",
      "Vous travaillez dans un lieu public et devez consulter un document sensible. Quel réflexe adoptez-vous ?",
      "Un outil collaboratif vous propose de partager largement un dossier. Que vérifiez-vous ?",
      "Vous avez cliqué sur un lien suspect et une page étrange s’est ouverte. Que faites-vous ?",
      "Un message vous demande de valider rapidement une modification de coordonnées bancaires. Quelle réaction adoptez-vous ?",
      "Vous recevez un code de double authentification alors que vous n’avez rien demandé. Que faites-vous ?",
      "Une ancienne adresse email personnelle est encore utilisée pour accéder à un outil professionnel. Que faites-vous ?",
      "Un document confidentiel est partagé dans une conversation de groupe trop large. Comment réagissez-vous ?",
      "Vous devez créer un mot de passe pour un nouvel outil métier. Quel choix faites-vous ?",
      "Un prestataire demande un export complet alors qu’il n’a besoin que d’une partie des données. Que faites-vous ?",
      "Un message interne contient une demande inhabituelle de transfert d’information. Que vérifiez-vous ?",
      "Un ordinateur partagé reste ouvert sur une session professionnelle. Que faites-vous ?",
      "Vous remarquez qu’un fichier sensible est stocké dans un espace non prévu pour cela. Quelle réaction adoptez-vous ?",
      "Une alerte de sécurité apparaît mais vous êtes pressé·e par une échéance. Que faites-vous ?"
    ],

    securite: [
      "Une intervention prend du retard et l’équipe envisage de raccourcir une étape de vérification. Que faites-vous ?",
      "Vous remarquez qu’un équipement de protection est mal porté dans une zone active. Quelle réaction adoptez-vous ?",
      "Un prestataire externe intervient sans connaître clairement les règles du site. Que faites-vous ?",
      "Un presque-accident vient de se produire mais personne ne semble vouloir le signaler. Que faites-vous ?",
      "Une porte d’accès reste ouverte alors qu’elle devrait être fermée. Comment réagissez-vous ?",
      "Une personne inconnue circule dans une zone où l’accès est habituellement contrôlé. Que faites-vous ?",
      "Un collègue contourne une consigne pour gagner quelques minutes. Quelle est votre réaction ?",
      "Un objet encombre une zone de passage utilisée par plusieurs personnes. Que faites-vous ?",
      "Une alerte est minimisée avec la phrase : “ça arrive souvent ici”. Comment vous positionnez-vous ?",
      "Un matériel semble défectueux mais reste utilisé pour terminer une tâche. Que faites-vous ?",
      "Vous observez une situation dangereuse mais vous n’êtes pas directement responsable de l’activité. Que faites-vous ?",
      "Une consigne de sécurité vient de changer mais tout le monde n’a pas l’air informé. Quelle réaction adoptez-vous ?",
      "Une urgence opérationnelle pousse l’équipe à travailler dans la précipitation. Que privilégiez-vous ?",
      "Un signalement précédent n’a pas donné lieu à un retour visible. Comment réagissez-vous la fois suivante ?",
      "Vous constatez un écart répété entre la procédure et la pratique réelle. Que faites-vous ?",
      "Une personne nouvelle dans l’équipe hésite à poser une question sur une règle de sécurité. Que faites-vous ?",
      "Une zone est mal rangée après une intervention. Quelle réaction adoptez-vous ?",
      "Un accès badge est prêté pour dépanner quelqu’un. Que faites-vous ?",
      "Un briefing sécurité est écourté car la journée est chargée. Comment réagissez-vous ?",
      "Vous identifiez un risque qui concerne plusieurs équipes. Que faites-vous ?"
    ],

    qvt: [
      "Vous constatez qu’une personne répond régulièrement très tard le soir. Que faites-vous ?",
      "Une réunion est ajoutée à la dernière minute sur un créneau déjà saturé. Quelle réaction adoptez-vous ?",
      "Un livrable urgent crée des tensions entre deux équipes. Que faites-vous ?",
      "Vous avez du mal à tenir vos priorités mais personne ne semble disponible pour en parler. Comment réagissez-vous ?",
      "Un collègue semble s’isoler progressivement des échanges collectifs. Que faites-vous ?",
      "Une personne fait une remarque sèche en réunion après plusieurs semaines tendues. Quelle réaction adoptez-vous ?",
      "Une urgence est présentée comme prioritaire alors que tout est déjà prioritaire. Que faites-vous ?",
      "Vous recevez plusieurs demandes contradictoires dans la même journée. Comment vous positionnez-vous ?",
      "Un irritant récurrent crée de la fatigue dans l’équipe mais personne ne le traite. Que faites-vous ?",
      "Une personne minimise sa surcharge en disant qu’elle va “tenir encore un peu”. Quelle réaction adoptez-vous ?",
      "Une réunion déborde régulièrement sur les temps de pause ou de fin de journée. Que faites-vous ?",
      "Un désaccord de fond se transforme en tension personnelle. Comment réagissez-vous ?",
      "Une personne prend beaucoup de tâches supplémentaires sans demander d’aide. Que faites-vous ?",
      "Vous sentez que votre charge devient difficile à absorber durablement. Quelle réaction adoptez-vous ?",
      "Une décision organisationnelle crée de l’incompréhension et des rumeurs. Que faites-vous ?",
      "Un collègue vous confie une difficulté mais vous ne savez pas quoi répondre. Comment réagissez-vous ?",
      "Une équipe voisine sollicite souvent votre aide dans l’urgence. Que faites-vous ?",
      "Un canal de discussion devient le lieu de remarques tendues ou passives-agressives. Quelle réaction adoptez-vous ?",
      "Une personne revient après une absence et semble vouloir reprendre trop vite. Que faites-vous ?",
      "Une charge invisible repose toujours sur les mêmes personnes. Comment réagissez-vous ?"
    ],

    management: [
      "Deux personnes n’ont pas la même compréhension du livrable attendu. Que faites-vous ?",
      "Une demande urgente remet en cause les priorités de la semaine. Quelle réaction adoptez-vous ?",
      "Une personne avec qui vous travaillez contourne le nouveau process pour gagner du temps. Que faites-vous ?",
      "Une réunion projet se termine sans décision claire sur les prochaines étapes. Comment réagissez-vous ?",
      "Vous recevez un feedback direct sur votre manière d’animer un échange. Que faites-vous ?",
      "Un collègue vous remet un livrable incomplet juste avant une échéance. Quelle réaction adoptez-vous ?",
      "Une personne demande un retour mais semble sensible aux critiques. Comment formulez-vous votre feedback ?",
      "Un changement d’outil crée des résistances dans l’équipe projet. Que faites-vous ?",
      "Un objectif est fixé mais les moyens disponibles ne semblent pas alignés. Comment réagissez-vous ?",
      "Une personne attend une validation sur chaque décision, même mineure. Que faites-vous ?",
      "Un projet avance mais les rôles deviennent flous. Quelle réaction adoptez-vous ?",
      "Une difficulté est connue mais chacun pense qu’elle relève de quelqu’un d’autre. Que faites-vous ?",
      "Une décision change en cours de route sans être clairement expliquée. Comment vous positionnez-vous ?",
      "Une personne très impliquée prend toute la place dans les échanges projet. Que faites-vous ?",
      "Un retard apparaît mais personne n’ose le dire clairement. Quelle réaction adoptez-vous ?",
      "Un retour d’expérience est organisé mais chacun reste général et prudent. Que faites-vous ?",
      "Une nouvelle méthode est lancée alors que l’ancienne n’est pas totalement stabilisée. Comment réagissez-vous ?",
      "Un contributeur dit oui à tout mais ne tient pas ses engagements. Que faites-vous ?",
      "Une tension apparaît entre qualité attendue et délai disponible. Quelle réaction adoptez-vous ?",
      "Après plusieurs feedbacks, les mêmes difficultés reviennent. Que faites-vous ?"
    ],

    environnement: [
      "Une réunion courte est prévue en présentiel alors que plusieurs personnes doivent se déplacer loin. Que faites-vous ?",
      "Un support imprimé est demandé pour un événement alors qu’une version digitale existe. Quelle réaction adoptez-vous ?",
      "Vous devez choisir entre une livraison express et une option moins impactante. Que faites-vous ?",
      "Une pratique peu durable est installée dans l’équipe mais personne ne la remet en question. Comment réagissez-vous ?",
      "Un achat est renouvelé automatiquement alors que le besoin réel a diminué. Que faites-vous ?",
      "Un matériel encore utilisable est remplacé par habitude. Quelle réaction adoptez-vous ?",
      "Un événement interne prévoit beaucoup de goodies peu utiles. Que faites-vous ?",
      "Un déplacement professionnel est organisé sans comparer les alternatives. Comment vous positionnez-vous ?",
      "Un fichier très lourd est envoyé à de nombreuses personnes alors qu’un lien suffirait. Que faites-vous ?",
      "Une demande client semble encourager une solution plus coûteuse et plus impactante. Quelle réaction adoptez-vous ?",
      "Une équipe veut lancer une action environnementale très visible mais peu utile. Que faites-vous ?",
      "Un fournisseur moins cher présente peu de garanties environnementales. Comment réagissez-vous ?",
      "Un usage numérique génère beaucoup de stockage inutile. Que faites-vous ?",
      "Un arbitrage oppose confort immédiat et réduction d’impact. Quelle réaction adoptez-vous ?",
      "Une règle de tri existe mais elle est peu suivie. Comment vous positionnez-vous ?",
      "Une personne propose une amélioration sobre mais elle est perçue comme contraignante. Que faites-vous ?",
      "Un process oblige à produire des documents rarement consultés. Quelle réaction adoptez-vous ?",
      "Une initiative écologique repose toujours sur les mêmes volontaires. Que faites-vous ?",
      "Une contrainte environnementale est vécue comme une injonction de plus. Comment réagissez-vous ?",
      "Une décision rapide risque d’entraîner des achats ou déplacements évitables. Que faites-vous ?"
    ],

    ethique: [
      "Un fournisseur vous propose une invitation personnelle avant un renouvellement de contrat. Que faites-vous ?",
      "Vous découvrez qu’un proche travaille pour une entreprise candidate à un appel d’offres. Quelle réaction adoptez-vous ?",
      "Une information confidentielle est évoquée dans un espace informel. Que faites-vous ?",
      "Une décision vous semble discutable mais vous n’êtes pas sûr·e du niveau d’alerte. Comment réagissez-vous ?",
      "Un cadeau reçu paraît modeste mais arrive au moment d’une négociation. Que faites-vous ?",
      "Une personne vous demande de modifier une date ou une information pour simplifier un dossier. Quelle réaction adoptez-vous ?",
      "Un collègue vous confie une situation sensible en vous demandant de ne rien dire. Que faites-vous ?",
      "Une pratique habituelle semble contraire à l’esprit d’une règle interne. Comment vous positionnez-vous ?",
      "Un avantage est proposé à certaines personnes sans critère clair. Que faites-vous ?",
      "Une pression commerciale pousse à présenter une information de manière ambiguë. Quelle réaction adoptez-vous ?",
      "Un document contient une erreur qui pourrait arranger l’équipe si elle n’est pas corrigée. Que faites-vous ?",
      "Un client demande une faveur qui sort du cadre prévu. Comment réagissez-vous ?",
      "Une remarque laisse penser qu’une décision pourrait être influencée par une relation personnelle. Que faites-vous ?",
      "Une alerte passée a été mal reçue et vous hésitez à signaler un nouveau point. Quelle réaction adoptez-vous ?",
      "Une règle compliance est perçue comme trop lourde par l’équipe. Comment vous positionnez-vous ?",
      "Une dépense est présentée de manière floue dans un dossier. Que faites-vous ?",
      "Une personne vous demande de valider un document que vous n’avez pas réellement vérifié. Quelle réaction adoptez-vous ?",
      "Une situation n’est pas illégale en apparence mais vous met mal à l’aise. Que faites-vous ?",
      "Un partenaire insiste pour obtenir une information non nécessaire à sa mission. Comment réagissez-vous ?",
      "Une décision sensible est prise oralement sans trace claire. Que faites-vous ?"
    ]
  };

  function makeVariantOffset(prefix, domain){
  const variants = {
    cyber: {
      "reflexes-cybersecurite": 0,
      "fraude-phishing": 5,
      "mots-de-passe-acces": 10,
      "donnees-confidentielles": 15,
      "reflexes-cybersécurité": 0
    },
    securite: {
      "culture-securite-terrain": 0,
      "presquaccidents-signalement": 5,
      "acces-sites-surete": 10,
      "managers-securite": 15
    },
    qvt: {
      "rps-signaux-faibles": 0,
      "charge-priorites": 5,
      "cooperation-climat": 10,
      "manager-qvt-rps": 15
    },
    management: {
      "changement-reflexes": 0,
      "feedback-managerial": 5,
      "manager-engageant-tbf": 10,
      "pilotage-projet": 15
    },
    environnement: {
      "sobriete-quotidien": 0,
      "dechets-ressources": 5,
      "achats-responsables": 10,
      "manager-transition-eco": 15
    },
    ethique: {
      "conflits-interets": 0,
      "cadeaux-invitations": 5,
      "alerte-ethique": 10,
      "manager-compliance": 15
    }
  };

  return variants[domain]?.[prefix] || 0;
}

function makeQuestions(prefix, domain, chapterIndex, extraTags){
  const bank = questionBanks[domain] || questionBanks.management;
  const offset = makeVariantOffset(prefix, domain);

  return Array.from({length:5}, function(_, i){
    const k = offset + chapterIndex * 5 + i;
    const text = bank[k % bank.length];

    return {
      id: prefix + "-q" + (chapterIndex + 1) + "-" + (i + 1),
      type:"choix",
      text:text,
      answers:answerSets(domain, k),
      tags:extraTags || [BADGES.IA, BADGES.VALIDATION]
    };
  });
}

  function makeChapters(prefix, domain, chapters, tags){
    return chapters.map(function(c, i){
      return {
        id: prefix + "-chap-" + (i + 1),
        title:c[0],
        description:c[1],
        questions:makeQuestions(prefix, domain, i, tags),
        profiles:makeProfiles(c[0])
      };
    });
  }

  const templates = {
    risquesNumeriques:{
      domain:"cyber",
      chapters:[
        ["Repérer les signaux numériques sensibles","Identifier les demandes inhabituelles, les urgences artificielles et les signaux faibles."],
        ["Protéger ses accès","Adopter des réflexes fiables sur les mots de passe, appareils et connexions."],
        ["Partager les informations avec discernement","Choisir le bon canal, limiter les transmissions inutiles et protéger les données."],
        ["Réagir et signaler","Savoir quoi faire quand un doute, une erreur ou un incident apparaît."]
      ]
    },

    securiteSurete:{
      domain:"securite",
      chapters:[
        ["Identifier les risques","Observer son environnement et repérer les situations sensibles avant qu’elles ne s’aggravent."],
        ["Appliquer les bons réflexes","Maintenir les gestes utiles même sous pression opérationnelle."],
        ["Contribuer à la sécurité collective","Intervenir avec tact et soutenir les pratiques sûres dans le collectif."],
        ["Réagir et signaler","Faire remonter les incidents, anomalies et signaux faibles sans banaliser."]
      ]
    },

    qvtRps:{
      domain:"qvt",
      chapters:[
        ["Repérer les signaux faibles","Identifier fatigue, tensions, isolement et alertes relationnelles."],
        ["Réguler la charge","Prioriser, demander de l’aide et clarifier les urgences."],
        ["Préserver les relations de travail","Désamorcer les irritants et maintenir un dialogue constructif."],
        ["Mobiliser les bons relais","Savoir quand et comment alerter sans exposer inutilement."]
      ]
    },

    management:{
      domain:"management",
      chapters:[
        ["Clarifier le cadre","Identifier les attendus, les rôles, les priorités et les zones de flou."],
        ["Coopérer dans l’incertitude","Avancer avec des informations incomplètes sans désorganiser le collectif."],
        ["Donner et recevoir du feedback utile","Formuler et accueillir des retours concrets, recevables et orientés action."],
        ["Ancrer les nouvelles pratiques","Transformer les intentions en habitudes professionnelles observables."]
      ]
    },

    environnement:{
      domain:"environnement",
      chapters:[
        ["Identifier les impacts","Relier les gestes du quotidien à des effets environnementaux concrets."],
        ["Arbitrer sobrement","Faire des choix réalistes sans culpabilisation ni affichage."],
        ["Coopérer autour des pratiques","Faire évoluer les usages avec les collègues, clients et prestataires."],
        ["Faire durer les changements","Installer des réflexes simples et mesurables dans le temps."]
      ]
    },

    ethique:{
      domain:"ethique",
      chapters:[
        ["Identifier les zones grises","Repérer ce qui n’est pas illégal en apparence mais peut poser problème."],
        ["Demander conseil au bon moment","Ne pas rester seul·e face à un doute, une pression ou un conflit d’intérêts."],
        ["Documenter et alerter","Décrire les faits, protéger les personnes et utiliser le bon canal."],
        ["Créer une culture de vigilance","Rendre les règles compréhensibles, applicables et discutables au quotidien."]
      ]
    }
  };

  const raw = [
    ["cybersecurite","Cybersécurité","🔐",[
      ["reflexes-cybersecurite","Vos réflexes face à la cybersécurité","Tous publics","Identifier les situations cyber sensibles, réagir sans paniquer et protéger les accès, les données et les informations utiles.",templates.risquesNumeriques],
      ["fraude-phishing","Détecter les tentatives de fraude et de phishing","Tous publics","Repérer les emails suspects, les faux liens, les pièces jointes douteuses et les demandes urgentes inhabituelles.",templates.risquesNumeriques],
      ["mots-de-passe-acces","Sécuriser ses accès et ses mots de passe","Tous publics","Adopter les bons réflexes sur les mots de passe, la double authentification, le partage d’accès et les sessions ouvertes.",templates.risquesNumeriques],
      ["donnees-confidentielles","Protéger les données sensibles","Collaborateurs","Faire les bons arbitrages face aux documents, exports, outils collaboratifs, prestataires et informations confidentielles.",templates.risquesNumeriques]
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
      ["manager-engageant-tbf","Êtes-vous un manager engageant ?","Managers","Questionner sa posture d’engagement, de responsabilisation et de soutien au collectif.",templates.management,BADGES.TBF],
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
    window.ITS_THEMES.push({
      key:theme[0],
      label:theme[1],
      icon:theme[2]
    });

    theme[3].forEach(function(ad){
      const template = ad[4];
      const specificBadge = ad[5];
      const tags = specificBadge ? [specificBadge] : [BADGES.IA, BADGES.VALIDATION];

      window.ITS_CATALOGUE.push({
        id:ad[0],
        themeKey:theme[0],
        theme:theme[1],
        icon:theme[2],
        title:ad[1],
        audience:ad[2],
        description:ad[3],
        tags:tags,
        duration:"8 à 12 min",
        intro:"Bienvenue dans cet autodiagnostic consacré à " + ad[1].toLowerCase() + ". Il vous propose des situations concrètes du quotidien professionnel pour vous aider à identifier vos réflexes, vos points d’appui et vos axes de progression. Cet autodiagnostic est entièrement anonyme : aucun login, aucun mot de passe, aucun cookie, aucun suivi d’adresse IP. Les résultats seront analysés de manière agrégée.",
        chapters:makeChapters(ad[0], template.domain, template.chapters, tags)
      });
    });
  });
})();
