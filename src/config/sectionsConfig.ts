/**
 * Configuration centralisée des sections de l'application
 * Contient les informations pour l'intégration dans le header et les modals d'information
 */

export interface SectionInfo {
  id: string;
  title: string;
  subtitle: string;
  features: string[];
  description: string;
  icon: string;
  variant: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'teal' | 'pink' | 'indigo';
}

export const sectionsConfig: Record<string, SectionInfo> = {
  "home": {
    id: "home",
    title: "À votre service",
    subtitle: "Votre boîte à outils numérique",
    features: ["Interface unifiée", "Outils intégrés", "Expérience fluide"],
    description: "Bienvenue dans votre écosystème numérique complet. Cette plateforme centralise tous vos outils essentiels dans une interface moderne et intuitive, conçue pour optimiser votre productivité quotidienne.",
    icon: "🏠",
    variant: "blue"
  },
  "unit-converter": {
    id: "unit-converter",
    title: "Convertisseurs d'Unités",
    subtitle: "12 types d'unités disponibles",
    features: ["Longueur & Distance", "Poids & Masse", "Température", "Volume & Capacité", "Surface & Aire"],
    description: "Convertissez facilement entre différentes unités de mesure avec notre suite complète de convertisseurs. Prend en charge les systèmes métriques, impériaux et spécialisés avec une précision maximale et une interface intuitive.",
    icon: "⚖️",
    variant: "blue"
  },
  "calculator": {
    id: "calculator",
    title: "Calculatrices",
    subtitle: "Calculatrice avancée et scientifique",
    features: ["Calculs de base", "Fonctions scientifiques", "Historique des calculs", "Mode programmeur", "Graphiques"],
    description: "Suite complète de calculatrices pour tous vos besoins mathématiques. De la calculatrice de base aux fonctions scientifiques avancées, avec support des constantes, historique détaillé et mode graphique.",
    icon: "🧮",
    variant: "green"
  },
  "date-calculator-advanced": {
    id: "date-calculator-advanced",
    title: "Dates & Temps",
    subtitle: "Calculs et conversions de dates",
    features: ["Calcul d'âge", "Différence entre dates", "Fuseaux horaires", "Planning avancé", "Calendrier interactif"],
    description: "Outils complets pour la gestion du temps et des dates. Calculez des âges, des différences temporelles, gérez les fuseaux horaires et planifiez efficacement avec notre suite d'outils temporels avancés.",
    icon: "📅",
    variant: "purple"
  },
  "career-productivity": {
    id: "career-productivity",
    title: "Carrière & Productivité",
    subtitle: "Outils professionnels intégrés",
    features: ["Gestion de projets", "Suivi du temps", "Objectifs carrière", "Analyse performance", "Planification"],
    description: "Boostez votre carrière avec nos outils de productivité professionnelle. Gérez vos projets, suivez votre temps, définissez des objectifs et analysez vos performances pour un développement optimal.",
    icon: "💼",
    variant: "indigo"
  },
  "productivity-suite": {
    id: "productivity-suite",
    title: "Suite Productivité",
    subtitle: "Gestion de tâches et organisation",
    features: ["Todo avancé", "Notes intelligentes", "Rappels", "Collaboration", "Synchronisation"],
    description: "Organisez votre vie avec notre suite de productivité complète. Gérez vos tâches, prenez des notes intelligentes, configurez des rappels et collaborez efficacement avec une synchronisation en temps réel.",
    icon: "✅",
    variant: "teal"
  },
  "password-generator-advanced": {
    id: "password-generator-advanced",
    title: "Sécurité Avancée",
    subtitle: "Protection et chiffrement",
    features: ["Mots de passe sécurisés", "Chiffrement AES", "Audit sécurité", "Gestionnaire intégré", "2FA"],
    description: "Protégez vos données avec notre suite de sécurité avancée. Générez des mots de passe ultra-sécurisés, chiffrez vos informations sensibles et auditez votre sécurité numérique.",
    icon: "🔐",
    variant: "red"
  },
  "color-generator": {
    id: "color-generator",
    title: "Créativité",
    subtitle: "Palettes et outils créatifs",
    features: ["Générateur couleurs", "Palettes harmonieuses", "Dégradés", "Extraction couleurs", "Export formats"],
    description: "Libérez votre créativité avec notre suite d'outils de couleurs. Générez des palettes harmonieuses, créez des dégradés personnalisés et explorez l'univers des couleurs avec des outils professionnels.",
    icon: "🎨",
    variant: "pink"
  },
  "health-wellness-suite": {
    id: "health-wellness-suite",
    title: "Santé",
    subtitle: "Bien-être et suivi santé",
    features: ["Calculateur IMC", "Suivi nutrition", "Exercices", "Méditation", "Rapports santé"],
    description: "Prenez soin de votre santé avec notre suite de bien-être complète. Calculez votre IMC, suivez votre nutrition, planifiez vos exercices et maintenez un mode de vie sain.",
    icon: "❤️",
    variant: "red"
  },
  "text-utils-advanced": {
    id: "text-utils-advanced",
    title: "Utilitaires Texte",
    subtitle: "Manipulation et formatage avancés",
    features: ["Formatage intelligent", "Analyse linguistique", "Conversion formats", "Nettoyage texte", "Statistiques"],
    description: "Maîtrisez le texte avec notre suite d'utilitaires avancés. Formatez, analysez, convertissez et nettoyez vos textes avec des outils professionnels et une analyse linguistique poussée.",
    icon: "📝",
    variant: "orange"
  },
  "settings": {
    id: "settings",
    title: "Paramètres",
    subtitle: "Configuration de l'application",
    features: ["Thèmes personnalisés", "Préférences utilisateur", "Synchronisation", "Sauvegardes", "Sécurité"],
    description: "Personnalisez votre expérience avec nos paramètres avancés. Configurez les thèmes, gérez vos préférences, synchronisez vos données et sécurisez votre environnement de travail.",
    icon: "⚙️",
    variant: "indigo"
  },
  "data-manager": {
    id: "data-manager",
    title: "Gestion Données",
    subtitle: "Import, export et analyse",
    features: ["Import multi-formats", "Export personnalisé", "Analyse données", "Visualisations", "Nettoyage automatique"],
    description: "Gérez vos données efficacement avec notre gestionnaire universel. Importez, exportez, analysez et visualisez vos données avec des outils professionnels et un nettoyage automatique.",
    icon: "💾",
    variant: "purple"
  },
  "about": {
    id: "about",
    title: "À propos",
    subtitle: "Informations sur l'application",
    features: ["Documentation complète", "Guide utilisateur", "Historique versions", "Support technique", "Crédits"],
    description: "Découvrez tout sur cette application : documentation complète, guides d'utilisation, historique des versions et informations de support. Votre ressource centrale pour maîtriser tous les outils.",
    icon: "ℹ️",
    variant: "blue"
  }
};

/**
 * Récupère les informations d'une section par son ID
 * @param sectionId - L'ID de la section
 * @returns Les informations de la section ou les informations par défaut
 */
export const getSectionInfo = (sectionId: string): SectionInfo => {
  return sectionsConfig[sectionId] || sectionsConfig.home;
};

/**
 * Récupère toutes les sections disponibles
 * @returns Tableau de toutes les sections
 */
export const getAllSections = (): SectionInfo[] => {
  return Object.values(sectionsConfig);
};

/**
 * Vérifie si une section doit afficher un hero component
 * @param sectionId - L'ID de la section
 * @returns true si la section doit garder son hero component
 */
export const shouldKeepHeroComponent = (sectionId: string): boolean => {
  return sectionId === 'home' || sectionId === 'about';
};