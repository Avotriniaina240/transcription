import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Login.css';

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // State to toggle between login and register forms

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
          <h2>Transformez vos fichiers audio en texte en quelques clics</h2>
        </div>

        <div className="steps-grid">
          {/* Step 1 */}
          <div className="step-card">
            <h3>Préparer vos fichiers audio</h3>
            <p>Cette plateforme vous permet de transformer facilement vos fichiers audio en texte. Vous devez simplement préparer vos fichiers audio et les importer ici.</p>
          </div>

          {/* Step 2 */}
          <div className="step-card">
            <h3>Configurer les services de transcription</h3>
            <p>Connectez-vous à nos services de transcription automatiques tels que Google, Amazon Transcribe ou d'autres pour lancer le processus de transcription de vos fichiers audio.</p>
          </div>

          {/* Step 3 */}
          <div className="step-card">
            <h3>Obtenez votre transcription</h3>
            <p>En quelques minutes, vos fichiers seront transcrits et vous pourrez télécharger le texte obtenu sous différents formats.</p>
          </div>
        </div>

        <div className="services-grid">
          {/* Google Drive */}
          <div className="service-card">
            <div className="service-header">
              <i className="icon-google-drive"></i>
              <h3>Stockage et gestion des fichiers</h3>
            </div>
            <p>Cette page vous permet de stocker vos fichiers audio sur Google Drive, ce qui simplifie la gestion et la récupération de vos fichiers pour la transcription.</p>
          </div>

          {/* Amazon Transcribe */}
          <div className="service-card">
            <div className="service-header">
              <i className="icon-amazon-transcribe"></i>
              <h3>Transcription automatique</h3>
            </div>
            <p>AutoTranscript utilise des services tels qu'Amazon Transcribe pour transformer automatiquement vos fichiers audio en texte avec une haute précision.</p>
          </div>

          {/* Dropbox */}
          <div className="service-card">
            <div className="service-header">
              <i className="icon-dropbox"></i>
              <h3>Importation et accès faciles</h3>
            </div>
            <p>Connectez votre compte Dropbox pour importer vos fichiers audio directement depuis votre espace de stockage cloud et lancez facilement leur transcription.</p>
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

            {/* Login Form */}
            {!isRegistering && (
              <form className="login-form">
                <div className="form-group">
                  <input type="email" placeholder="Email" required />
                </div>
                <div className="form-group">
                  <input type="password" placeholder="Mot de passe" required />
                </div>
                <button type="submit" className="submit-button">Se connecter</button>
                <p className="switch-auth">
                  Pas de compte ? <span onClick={() => setIsRegistering(true)}>Inscrivez-vous</span>
                </p>
              </form>
            )}

            {/* Register Form */}
            {isRegistering && (
              <form className="login-form">
                <div className="form-group">
                  <input type="text" placeholder="Nom d'utilisateur" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Email" required />
                </div>
                <div className="form-group">
                  <input type="password" placeholder="Mot de passe" required />
                </div>
                <button type="submit" className="submit-button">S'inscrire</button>
                <p className="switch-auth">
                  Vous avez déjà un compte ? <span onClick={() => setIsRegistering(false)}>Connectez-vous</span>
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
