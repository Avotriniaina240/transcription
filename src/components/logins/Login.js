import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import '../../styles/Login.css';

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const [hoveredCard, setHoveredCard] = useState(null);  // Gérer l'état de la carte survolée

  return (
    <div className="page-container">
      {/* Navbar */}
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

      {/* Main Content */}
      <main className="main-content">
        <div className="hero-section">
          <h1>Bienvenue sur AutoTranscript</h1>
          <h2>Transformez vos fichiers en texte en quelques clics</h2>
        </div>

        <div className="steps-grid">
          <div
            className="step-card"
            onMouseEnter={() => setHoveredCard('step1')}  // Survol de la première carte
            onMouseLeave={() => setHoveredCard(null)}    // Quitter le survol
          >
            {hoveredCard === 'step1' ? (
              <img src="1.jpg" alt="Step 1" />
            ) : (
              <>
                <h3>Préparer vos fichiers</h3>
                <p>Cette plateforme vous permet de transformer facilement vos fichiers audio en texte. Vous devez simplement préparer vos fichiers audio et les importer ici.</p>
              </>
            )}
          </div>
          <div
            className="step-card"
            onMouseEnter={() => setHoveredCard('step2')}  // Survol de la deuxième carte
            onMouseLeave={() => setHoveredCard(null)}    // Quitter le survol
          >
            {hoveredCard === 'step2' ? (
              <img src="2.jpg" alt="Step 2" />
            ) : (
              <>
                <h3>Configurer les services de transcription</h3>
                <p>Connectez-vous à nos services de transcription automatiques tels que Google, Amazon Transcribe ou d'autres pour lancer le processus de transcription de vos fichiers audio.</p>
              </>
            )}
          </div>
          <div
            className="step-card"
            onMouseEnter={() => setHoveredCard('step3')}  // Survol de la troisième carte
            onMouseLeave={() => setHoveredCard(null)}    // Quitter le survol
          >
            {hoveredCard === 'step3' ? (
              <img src="3.jpg" alt="Step 3" />
            ) : (
              <>
                <h3>Obtenez votre transcription</h3>
                <p>En quelques minutes, vos fichiers seront transcrits et vous pourrez télécharger le texte obtenu sous différents formats.</p>
              </>
            )}
          </div>
        </div>

        <div className="services-grid">
          <div
            className="service-card"
            onMouseEnter={() => setHoveredCard('service1')}  // Survol de la première carte de service
            onMouseLeave={() => setHoveredCard(null)}    // Quitter le survol
          >
            {hoveredCard === 'service1' ? (
              <img src="4.jpg" alt="Service 1" />
            ) : (
              <>
                <div className="service-header">
                  <i className="icon-google-drive"></i>
                  <h3>Stockage et gestion des fichiers</h3>
                </div>
                <p>Cette page vous permet de stocker vos fichiers audio sur Google Drive, ce qui simplifie la gestion et la récupération de vos fichiers pour la transcription.</p>
              </>
            )}
          </div>
          <div
            className="service-card"
            onMouseEnter={() => setHoveredCard('service2')}  // Survol de la deuxième carte de service
            onMouseLeave={() => setHoveredCard(null)}    // Quitter le survol
          >
            {hoveredCard === 'service2' ? (
              <img src="5.jpg" alt="Service 2" />
            ) : (
              <>
                <div className="service-header">
                  <i className="icon-amazon-transcribe"></i>
                  <h3>Transcription automatique</h3>
                </div>
                <p>AutoTranscript utilise des services tels qu'Amazon Transcribe pour transformer automatiquement vos fichiers audio en texte avec une haute précision.</p>
              </>
            )}
          </div>
          <div
            className="service-card"
            onMouseEnter={() => setHoveredCard('service3')}  // Survol de la troisième carte de service
            onMouseLeave={() => setHoveredCard(null)}    // Quitter le survol
          >
            {hoveredCard === 'service3' ? (
              <img src="6.jpg" alt="Service 3" />
            ) : (
              <>
                <div className="service-header">
                  <i className="icon-dropbox"></i>
                  <h3>Importation et accès faciles</h3>
                </div>
                <p>Connectez votre compte Dropbox pour importer vos fichiers audio directement depuis votre espace de stockage cloud et lancez facilement leur transcription.</p>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Login/Signup Modal */}
      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowLogin(false)}>×</button>
            <div className="modal-header">
              <h2>{isRegistering ? "Inscription" : "Connexion"}</h2>
            </div>
            {!isRegistering ? (
              <LoginForm switchToRegister={() => setIsRegistering(true)} />
            ) : (
              <RegisterForm switchToLogin={() => setIsRegistering(false)} />
            )}
          </div>
        </div>
      )}

      {/* Footer */}
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
