
export const speakerColors = [
    '#3498db', // Bleu
    '#2ecc71', // Vert
    '#e74c3c', // Rouge
    '#f39c12', // Orange
    '#9b59b6', // Violet
    '#1abc9c', // Turquoise
    '#34495e', // Gris foncé
    '#d35400'  // Marron
  ];
  
  // Options de langues pour la traduction
  export const languageOptions = [
    { code: 'fr', name: 'Français' },
    { code: 'en', name: 'Anglais' },
    { code: 'es', name: 'Espagnol' },
    { code: 'de', name: 'Allemand' },
    { code: 'it', name: 'Italien' },
    { code: 'pt', name: 'Portugais' },
    { code: 'ru', name: 'Russe' },
    { code: 'zh', name: 'Chinois' }
  ];
  
  // Données simulées de transcriptions
  export const mockTranscriptions = [
    {
      id: 1,
      fileName: 'conference_call.mp3',
      language: 'Français',
      date: '2024-02-15',
      content: `Bonjour tout le monde. Aujourd'hui nous allons discuter du projet de développement web. 
      Nous avons plusieurs points importants à aborder concernant l'architecture, les fonctionnalités et le calendrier de livraison. 
      Jean va commencer par présenter l'état actuel du projet. 
      
      Jean Dupont : Merci. Donc, concernant l'architecture, nous avons décidé d'utiliser React pour le frontend et Node.js pour le backend...`,
      duration: '45 min',
      fileSize: '23.5 MB', 
      wordCount: 456,
      speakerCount: 3,
      speakers: [
        { id: 1, name: 'Jean Dupont', color: '#3498db' },
        { id: 2, name: 'Marie Leblanc', color: '#2ecc71' },
        { id: 3, name: 'Pierre Martin', color: '#e74c3c' }
      ]
    },
    {
      id: 2,
      fileName: 'interview_startup.wav',
      language: 'Français',
      date: '2024-02-10',
      content: `Aujourd'hui, nous recevons Sophie Dubois, fondatrice d'une startup innovante dans le domaine de l'intelligence artificielle.
  
      Interviewer : Pouvez-vous nous parler de votre parcours et de votre entreprise ?
      
      Sophie Dubois : Bien sûr. J'ai commencé ma carrière dans la recherche en machine learning, et j'ai rapidement compris le potentiel énorme de l'IA pour résoudre des problèmes complexes...`,
      duration: '32 min',
      fileSize: '18.2 MB',
      wordCount: 378,
      speakerCount: 2,
      speakers: [
        { id: 1, name: 'Sophie Dubois', color: '#9b59b6' },
        { id: 2, name: 'Interviewer', color: '#1abc9c' }
      ]
    },
    {
      id: 3,
      fileName: 'cours_marketing.mp4',
      language: 'Français',
      date: '2024-02-05',
      content: `Bienvenue à ce cours de marketing digital. Aujourd'hui, nous allons explorer les stratégies modernes de marketing en ligne.
  
      Le marketing digital a considérablement évolué ces dernières années. Les réseaux sociaux, le content marketing, et l'analyse de données sont devenus des éléments cruciaux...`,
      duration: '1h 12 min',
      fileSize: '42.7 MB',
      wordCount: 612,
      speakerCount: 1,
      speakers: [
        { id: 1, name: 'Formateur', color: '#34495e' }
      ]
    }
  ];