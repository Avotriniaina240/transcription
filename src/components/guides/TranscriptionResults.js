import React, { useState, useEffect } from 'react';
import '../../styles/TranscriptionResults.css';
import { mockTranscriptions, languageOptions, speakerColors } from './TranscriptionData';

const TranscriptionResults = () => {
  const [transcriptions, setTranscriptions] = useState([]);
  const [selectedTranscription, setSelectedTranscription] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeRightSidebarTab, setActiveRightSidebarTab] = useState('stats');
  const [activeNavbarSection, setActiveNavbarSection] = useState('text');
  const [speakers, setSpeakers] = useState([]);
  const [textEditorContent, setTextEditorContent] = useState('');

  useEffect(() => {
    setTranscriptions(mockTranscriptions);
  }, []);

  useEffect(() => {
    if (selectedTranscription) {
      setTextEditorContent(selectedTranscription.content);
      // Initialize speakers for the selected transcription
      setSpeakers(
        selectedTranscription.speakers || [
          { id: 1, name: 'Intervenant 1', color: speakerColors[0] },
          { id: 2, name: 'Intervenant 2', color: speakerColors[1] }
        ]
      );
    }
  }, [selectedTranscription]);

  const handleAddSpeaker = () => {
    const newSpeakerId = speakers.length + 1;
    setSpeakers([
      ...speakers, 
      { 
        id: newSpeakerId, 
        name: `Intervenant ${newSpeakerId}`, 
        color: speakerColors[newSpeakerId % speakerColors.length]
      }
    ]);
  };

  const handleSpeakerNameChange = (id, newName) => {
    setSpeakers(speakers.map(speaker => 
      speaker.id === id ? { ...speaker, name: newName } : speaker
    ));
  };

  const renderNavbarContent = () => {
    if (!selectedTranscription) return null;

    switch(activeNavbarSection) {
      case 'text':
        return (
          <div className="navbar-content">
            <div className="text-analysis-tools">
              <div className="text-tool">
                <h4>📝 Éditeur de Texte</h4>
                <textarea 
                  value={textEditorContent}
                  onChange={(e) => setTextEditorContent(e.target.value)}
                  className="text-editor"
                />
              </div>
              <div className="text-actions">
                <button onClick={() => {
                  navigator.clipboard.writeText(textEditorContent);
                  alert('Texte copié !');
                }}>📋 Copier</button>
                <button onClick={() => {
                  const searchTerm = prompt('Entrez le terme à rechercher :');
                  if (searchTerm) {
                    const regex = new RegExp(searchTerm, 'gi');
                    const highlightedText = textEditorContent.replace(
                      regex, 
                      match => `<mark>${match}</mark>`
                    );
                    setTextEditorContent(highlightedText);
                  }
                }}>🔍 Rechercher</button>
                <select>
                  <option>Police Arial</option>
                  <option>Police Times New Roman</option>
                  <option>Police Calibri</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 'speakers':
        return (
          <div className="navbar-content">
            <div className="speakers-section">
              <h4>👥 Identification des Intervenants</h4>
              <div className="speakers-list">
                {speakers.map((speaker) => (
                  <div key={speaker.id} className="speaker-item">
                    <span 
                      className="speaker-icon" 
                      style={{backgroundColor: speaker.color}}
                    >👤</span>
                    <input 
                      type="text" 
                      value={speaker.name}
                      onChange={(e) => handleSpeakerNameChange(speaker.id, e.target.value)}
                    />
                    <button>🔊 Identifier</button>
                  </div>
                ))}
              </div>
              <div className="speaker-tools">
                <button onClick={handleAddSpeaker}>➕ Ajouter Intervenant</button>
                <button>🎨 Colorer les Interventions</button>
              </div>
            </div>
          </div>
        );
      case 'advanced':
        return (
          <div className="navbar-content">
            <div className="advanced-tools">
              <h4>🛠️ Outils Avancés</h4>
              <div className="tool-grid">
                <div className="tool-item">
                  <span>🔤</span>
                  <h5>Correction Grammaticale</h5>
                  <button onClick={() => alert('Correction grammaticale en développement')}>
                    Analyser
                  </button>
                </div>
                <div className="tool-item">
                  <span>📊</span>
                  <h5>Analyse de Sentiment</h5>
                  <button onClick={() => alert('Analyse de sentiment en développement')}>
                    Analyser
                  </button>
                </div>
                <div className="tool-item">
                  <span>🌐</span>
                  <h5>Traduction</h5>
                  <select>
                    {languageOptions.map(lang => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="tool-item">
                  <span>🤖</span>
                  <h5>Résumé Automatique</h5>
                  <button onClick={() => alert('Résumé automatique en développement')}>
                    Générer
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderRightSidebarContent = () => {
    if (!selectedTranscription) return null;

    switch(activeRightSidebarTab) {
      case 'stats':
        return (
          <div className="right-sidebar-content">
            <h3>Statistiques</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-icon">⏱️</span>
                <div>
                  <strong>Durée</strong>
                  <p>{selectedTranscription.duration}</p>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">📊</span>
                <div>
                  <strong>Taille</strong>
                  <p>{selectedTranscription.fileSize}</p>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">📝</span>
                <div>
                  <strong>Mots</strong>
                  <p>{selectedTranscription.wordCount}</p>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">👥</span>
                <div>
                  <strong>Intervenants</strong>
                  <p>{selectedTranscription.speakerCount}</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'tags':
        return (
          <div className="right-sidebar-content">
            <h3>Mots-clés & Tags</h3>
            <div className="tags-container">
              {['Projet', 'Développement', 'Technologie', 'Web', 'Innovation', 'Réunion']
                .map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
            </div>
          </div>
        );
      case 'summary':
        return (
          <div className="right-sidebar-content">
            <h3>Résumé Automatique</h3>
            <div className="summary-content">
              <p>Un résumé concis généré automatiquement sera affiché ici, extrayant les points clés de la transcription.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const filteredTranscriptions = transcriptions.filter(
    (trans) => 
      trans.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trans.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="transcription-results-container">
      <div className="sidebar left-sidebar">
        <h2>Mes Transcriptions</h2>
        <input 
          type="text" 
          placeholder="Rechercher une transcription..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="transcription-list">
          {filteredTranscriptions.map((trans) => (
            <div 
              key={trans.id} 
              className={`transcription-item ${selectedTranscription?.id === trans.id ? 'selected' : ''}`}
              onClick={() => setSelectedTranscription(trans)}
            >
              <h3>{trans.fileName}</h3>
              <p>{trans.date} • {trans.language}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="content-wrapper">
        <div className="content-area">
          {selectedTranscription ? (
            <div className="transcription-details">
              <div className="transcription-header">
                <h2>{selectedTranscription.fileName}</h2>
                <div className="transcription-meta">
                  <span>📅 {selectedTranscription.date}</span>
                  <span>🌐 {selectedTranscription.language}</span>
                  <span>⏱️ {selectedTranscription.duration}</span>
                </div>
              </div>

              <div className="transcription-content">
                <h3>Transcription</h3>
                <p>{selectedTranscription.content}</p>
              </div>

              <div className="export-section">
                <h3>Exporter</h3>
                <div className="export-buttons">
                  <button onClick={() => {
                    const blob = new Blob([textEditorContent], { type: 'text/plain' });
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = `${selectedTranscription.fileName}.txt`;
                    link.click();
                  }}>📄 Texte</button>
                  <button onClick={() => alert('Exportation PDF en développement')}>
                    📊 PDF
                  </button>
                  <button onClick={() => alert('Exportation Word en développement')}>
                    📝 Word
                  </button>
                </div>
              </div>

              <div className="actions-section">
                <button 
                  className="delete-btn"
                  onClick={() => {
                    const confirmDelete = window.confirm('Voulez-vous vraiment supprimer cette transcription ?');
                    if (confirmDelete) {
                      setTranscriptions(transcriptions.filter(t => t.id !== selectedTranscription.id));
                      setSelectedTranscription(null);
                    }
                  }}
                >
                  🗑️ Supprimer
                </button>
                <button 
                  className="edit-btn"
                  onClick={() => alert('Édition en développement')}
                >
                  ✏️ Éditer
                </button>
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <p>Sélectionnez une transcription pour voir les détails</p>
            </div>
          )}
        </div>

        <div className="transcription-navbar">
          <div className="navbar-tabs">
            <button 
              className={activeNavbarSection === 'text' ? 'active' : ''}
              onClick={() => setActiveNavbarSection('text')}
            >
              📝 Texte
            </button>
            <button 
              className={activeNavbarSection === 'speakers' ? 'active' : ''}
              onClick={() => setActiveNavbarSection('speakers')}
            >
              👥 Intervenants
            </button>
            <button 
              className={activeNavbarSection === 'advanced' ? 'active' : ''}
              onClick={() => setActiveNavbarSection('advanced')}
            >
              🛠️ Outils Avancés
            </button>
          </div>
          
          {renderNavbarContent()}
        </div>
      </div>

      <div className="sidebar right-sidebar">
        <div className="right-sidebar-tabs">
          <button 
            className={activeRightSidebarTab === 'stats' ? 'active' : ''}
            onClick={() => setActiveRightSidebarTab('stats')}
          >
            📊 Stats
          </button>
          <button 
            className={activeRightSidebarTab === 'tags' ? 'active' : ''}
            onClick={() => setActiveRightSidebarTab('tags')}
          >
            🏷️ Tags
          </button>
          <button 
            className={activeRightSidebarTab === 'summary' ? 'active' : ''}
            onClick={() => setActiveRightSidebarTab('summary')}
          >
            📝 Résumé
          </button>
        </div>

        {renderRightSidebarContent()}
      </div>
    </div>
  );
};

export default TranscriptionResults;