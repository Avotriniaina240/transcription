export const MAKE_API_ENDPOINT = "https://eu1.make.com/api/v2"; 
export const MAKE_API_KEY = "f0c3ea77-3014-415c-a8dc-4b87a83e0c18";
export const BLUEPRINT_ID = 2318613; 

export const STEPS = [
  {
    number: 1,
    title: "Prérequis",
    subtitle: "Vérifiez les comptes nécessaires"
  },
  {
    number: 2,
    title: "Limitations",
    subtitle: "Comprendre les contraintes"
  },
  {
    number: 3,
    title: "Installation",
    subtitle: "Importer l'automatisation"
  }
];

export const SERVICES = [
  {
    name: "Make.com",
    icon: "💻",
    requirements: [
      "Compte actif",
      "Abonnement selon usage",
    ],
    actionText: "Créer un compte",
    actionLink: "https://www.make.com/signup"
  },
  {
    name: "AssemblyAI",
    icon: "🤖",
    requirements: [
      "Clé API",
      "Crédits disponibles"
    ],
    actionText: "Obtenir une clé API",
    actionLink: "https://www.assemblyai.com/app" 
  },
  {
    name: "OneDrive",
    icon: "☁️",
    requirements: [
      "Compte Microsoft",
      "Espace disponible"
    ],
    actionText: "Configurer OneDrive",
    actionLink: "https://onedrive.live.com/about/fr-fr/signin/"
  }
];