import React from 'react';
import '../../styles/AutomationGuide.css';

export const Limitations = () => (
  <div className="limitations-page">
    <div className="limitations-content">
      <h2>Limitations du Service</h2>
      <div className="limitations-container">
        <div className="limitation-card">
          <h3>Limites de Transcription</h3>
          <ul>
            <li>
              <span className="limitation-icon">🕒</span>
              <div className="limitation-detail">
                <strong>Maximum 100 transcriptions par jour</strong>
                <p>Limite quotidienne pour garantir la qualité du service</p>
              </div>
            </li>
            <li>
              <span className="limitation-icon">📁</span>
              <div className="limitation-detail">
                <strong>Taille maximale de fichier : 500MB</strong>
                <p>Pour des performances optimales</p>
              </div>
            </li>
            <li>
              <span className="limitation-icon">🎵</span>
              <div className="limitation-detail">
                <strong>Formats supportés</strong>
                <p>MP3, WAV, MP4, M4A, AAC</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="limitation-card">
          <h3>Contraintes Techniques</h3>
          <ul>
            <li>
              <span className="limitation-icon">🌐</span>
              <div className="limitation-detail">
                <strong>Connexion Internet requise</strong>
                <p>Une connexion stable est nécessaire</p>
              </div>
            </li>
            <li>
              <span className="limitation-icon">⚡</span>
              <div className="limitation-detail">
                <strong>Temps de traitement</strong>
                <p>1-5 minutes par fichier en moyenne</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="limitation-card">
          <h3>Limites API Make.com</h3>
          <ul>
            <li>
              <span className="limitation-icon">📊</span>
              <div className="limitation-detail">
                <strong>Quotas d'appels API</strong>
                <p>Selon votre plan Make.com</p>
              </div>
            </li>
            <li>
              <span className="limitation-icon">⏱️</span>
              <div className="limitation-detail">
                <strong>Délai d'exécution</strong>
                <p>Maximum 300 secondes par opération</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);