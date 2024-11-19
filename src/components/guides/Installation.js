import React, { useState } from 'react';
import { MakeService } from '../../services/MakeService'; // Assurez-vous que ce service est correctement configuré
import '../../styles/installation.css'; // Assurez-vous que ce fichier contient les styles nécessaires

export const Installation = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState({ 
    blueprint: false, 
    automation: false 
  });
  const [error, setError] = useState(null);
  const [isImported, setIsImported] = useState(false);

  // Gestion de l'importation du blueprint
  const handleBlueprintImport = async () => {
    try {
      if (!selectedFile) {
        setError({ type: 'error', message: 'Veuillez sélectionner un fichier à importer.' });
        return;
      }

      setError(null); // Réinitialiser les erreurs précédentes
      setLoading(prev => ({ ...prev, blueprint: true }));

      const result = await new MakeService().importBlueprint(selectedFile); // Utilisation de la méthode du service

      setIsImported(true);
      setError({ type: 'success', message: 'Blueprint importé avec succès!' }); // Afficher un message de succès
    } catch (error) {
      console.error('Erreur lors de l\'importation du blueprint:', error);
      setError({
        type: 'error',
        message: error.message || 'Une erreur est survenue lors de l\'importation'
      });
      setIsImported(false);
    } finally {
      setLoading(prev => ({ ...prev, blueprint: false }));
    }
  };

  // Gestion du démarrage de l'automatisation
  const handleStartAutomation = async () => {
    try {
      setError(null);
      setLoading(prev => ({ ...prev, automation: true }));
      
      // Simulation ou logique réelle pour démarrer l'automatisation
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulation avec setTimeout
      
      setError({ type: 'success', message: 'Automatisation lancée avec succès!' });
    } catch (error) {
      console.error('Erreur lors du lancement de l\'automatisation:', error);
      setError({
        type: 'error',
        message: error.message || 'Une erreur est survenue lors du lancement'
      });
    } finally {
      setLoading(prev => ({ ...prev, automation: false }));
    }
  };

  return (
    <div className="installation-page">
      <h2>Guide d'Installation</h2>
      {error && (
        <div className={`message ${error.type}`}>
          {error.message}
        </div>
      )}

      <div className="installation-cards">
        {/* Première carte - Import du Blueprint */}
        <div className="installation-card">
          <div className="card-header">
            <h3>1. Import du Blueprint</h3>
            <span className="card-status">
              {isImported ? '✅ Importé' : '⏳ En attente'}
            </span>
          </div>
          
          <div className="card-content">
            <p>Sélectionnez le fichier blueprint pour l'importer dans Make.com</p>
            <input 
              type="file"
              accept=".json"
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
                setError(null); // Réinitialiser les erreurs précédentes
              }}
              className="file-input"
            />
            <button 
              className={`action-button ${loading.blueprint ? 'loading' : ''}`}
              onClick={handleBlueprintImport}
              disabled={loading.blueprint || !selectedFile}
            >
              {loading.blueprint ? 'Import en cours...' : 'Importer le Blueprint'}
            </button>
          </div>
        </div>

        {/* Deuxième carte - Lancement de l'automatisation */}
        <div className="installation-card">
          <div className="card-header">
            <h3>2. Lancer l'automatisation</h3>
            <span className="card-status">
              {loading.automation ? '⚡ En cours' : '⏳ En attente'}
            </span>
          </div>
          
          <div className="card-content">
            <p>Démarrez l'automatisation une fois le blueprint importé afin de garantir que tous les scénarios et modules sont configurés et fonctionnent correctement.</p>
            <button 
              className={`action-button ${loading.automation ? 'loading' : ''}`}
              onClick={handleStartAutomation}
              disabled={!isImported || loading.automation}
            >
              {loading.automation ? 'Démarrage...' : 'Lancer l\'automatisation'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
