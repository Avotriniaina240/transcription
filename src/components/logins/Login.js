import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import '../../styles/Login.css';

const STEPS = [
  {
    id: 'step1',
    title: 'Préparer vos fichiers',
    description: 'Cette plateforme vous permet de transformer facilement vos fichiers audio et video en texte. Vous devez simplement préparer vos fichiers et les importer ici.',
    image: '1.jpg'
  },
  {
    id: 'step2',
    title: 'Configurer l\'importation',
    description: 'Sélectionnez la langue pour la transcription, importez votre fichier audio ou vidéo. télécharger le fichier, appuyez sur "Transcrire" pour démarrer le processus de transcription automatique.',
    image: '2.jpg'
  },
  {
    id: 'step3',
    title: 'Obtenez votre transcription',
    description: 'En quelques minutes, vos fichiers seront transcrits et vous pourrez télécharger le texte obtenu sous différents formats.',
    image: '3.jpg'
  }
];

const SERVICES = [
  {
    id: 'service1',
    title: 'Gestion des fichiers',
    description: 'Cette page vous permet de rectifier, analyser, résumer et exporter les fichiers transcrits pour une gestion simplifiée de vos documents.',
    image: '4.jpg',
    icon: 'icon-google-drive'
  },
  {
    id: 'service2',
    title: 'Générer des Slides',
    description: 'À partir du fichier transcrit, vous pouvez générer automatiquement des diapositives pour une présentation facile et rapide.',
    image: '5.jpg',
    icon: 'icon-amazon-transcribe'
  },
  {
    id: 'service3',
    title: 'Outil No Code',
    description: 'Nous utilisons n8n pour automatiser le flux de transcription et la gestion des diapositives.',
    image: '6.jpg',
    icon: 'icon-dropbox'
  },
  {
    id: 'service4',
    title: 'Automatisation avec n8n',
    description: 'n8n vous permet de créer des flux automatisés sans code pour gérer efficacement des divers y tâches.',
    image: '7.jpg',
    icon: 'icon-n8n'
  },
  {
    id: 'service5',
    title: 'tâches automatisées',
    description: 'L’automatisation avancée avec n8n facilite la gestion des tâches répétitives.',
    image: '8.png',
    icon: 'icon-automation'
  }
];


const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="page-container">
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">
            <FontAwesomeIcon icon={faMicrophone} size="2x" />
            AutoTranscript
          </div>
          <button className="login-button" onClick={() => setShowLogin(true)}>
            <i className="icon-login"></i>
            Connexion
          </button>
        </div>
      </nav>

      <main className="main-content">
        <div className="hero-section">
          <h1>Bienvenue sur AutoTranscript</h1>
          <h2>Transformez vos fichiers en texte en quelques clics et faire un SlideFlow</h2>
        </div>

        <div className="steps-grid">
          {STEPS.map(step => (
            <div
              key={step.id}
              className="step-card"
              onMouseEnter={() => setHoveredCard(step.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {hoveredCard === step.id ? (
                <img src={step.image} alt={step.title} loading="lazy" />
              ) : (
                <>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </>
              )}
            </div>
          ))}
       
          {SERVICES.map(service => (
            <div
              key={service.id}
              className="service-card"
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {hoveredCard === service.id ? (
                <img src={service.image} alt={service.title} loading="lazy" />
              ) : (
                <>
                  <div className="service-header">
                    <i className={service.icon}></i>
                    <h3>{service.title}</h3>
                  </div>
                  <p className='classe-p'>{service.description}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </main>

      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowLogin(false)}>×</button>
            <div className="modal-header">
              <h2 className='h2cs'>{isRegistering ? "Inscription" : "Connexion"}</h2>
            </div>
            {!isRegistering ? (
              <LoginForm switchToRegister={() => setIsRegistering(true)} />
            ) : (
              <RegisterForm switchToLogin={() => setIsRegistering(false)} />
            )}
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="/terms">Conditions d'utilisation</a>
            <a href="/privacy">Politique de confidentialité</a>
            <a href="/contact">Contact</a>
          </div>
          <div className="footer-copy">
            <p>&copy; 2024 AutoTranscript. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
