import React, { useState, useEffect, useMemo } from 'react';
import { CheckCircle2, Search } from "lucide-react"
import PptxGenJS from 'pptxgenjs';
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
  const [selectedExportFormat, setSelectedExportFormat] = useState('txt');
  const [selectedFont, setSelectedFont] = useState('Arial');
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [copyIcon, setCopyIcon] = useState('📋');
  const [generatedSlides, setGeneratedSlides] = useState([]);
  const [slidesProgress, setSlidesProgress] = useState(0);
  const [selectedSlideTheme, setSelectedSlideTheme] = useState('default');


  const slideThemes = [
    { id: 'default', name: 'Défaut', primary: '#279aae', secondary: '#f0f4f8' },
    { id: 'dark', name: 'Sombre', primary: '#2d3436', secondary: '#636e72' },
    { id: 'light', name: 'Clair', primary: '#ffffff', secondary: '#dfe6e9' },
    { id: 'corporate', name: 'Corporate', primary: '#0984e3', secondary: '#74b9ff' },
    { id: 'modern', name: 'Moderne', primary: '#6c5ce7', secondary: '#a29bfe' }
  ];

  useEffect(() => {
    setTranscriptions(mockTranscriptions);
  }, []);

  useEffect(() => {
    if (selectedTranscription) {
      setTextEditorContent(selectedTranscription.content);
      setSpeakers(
        selectedTranscription.speakers || [
          { id: 1, name: 'Intervenant 1', color: speakerColors[0] },
          { id: 2, name: 'Intervenant 2', color: speakerColors[1] }
        ]
      );
    }
  }, [selectedTranscription]);

  const handleSearchInText = () => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    const regex = new RegExp(searchTerm, 'gi');
    const matches = [];
    
    let match;
    while ((match = regex.exec(textEditorContent)) !== null) {
      matches.push({
        index: match.index,
        text: match[0]
      });
    }

    setSearchResults(matches);
  };

  const highlightedContent = useMemo(() => {
    if (!searchTerm || searchResults.length === 0) return textEditorContent;

    let highlightedText = textEditorContent;
    
    const sortedMatches = [...searchResults].sort((a, b) => b.index - a.index);

    sortedMatches.forEach(match => {
      highlightedText = 
        highlightedText.slice(0, match.index) + 
        `<mark>${match.text}</mark>` + 
        highlightedText.slice(match.index + match.text.length);
    });

    return highlightedText;
  }, [textEditorContent, searchResults, searchTerm]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textEditorContent);
      setShowCopyNotification(true);
      setCopyIcon('✔')
      setTimeout(() => {
        setShowCopyNotification(false);
        setCopyIcon('📋')
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const generateSlides = () => {
    // Diviser le contenu en segments plus longs
    const paragraphs = textEditorContent.split(/\n\n/);
    const slides = [];
    
    // Créer un titre de présentation
    const presentationTitle = selectedTranscription ? selectedTranscription.fileName : 'Présentation';

    // Générer des diapositives avec un maximum de caractères par diapositive
    const MAX_CHARS_PER_SLIDE = 800;
    let currentSlide = { title: presentationTitle, content: '' };

    paragraphs.forEach((paragraph, index) => {
      // Si l'ajout du paragraphe dépasse la limite, créer une nouvelle diapositive
      if ((currentSlide.content + paragraph).length > MAX_CHARS_PER_SLIDE) {
        slides.push({...currentSlide});
        currentSlide = { 
          title: `Slide ${slides.length + 1}`, 
          content: paragraph 
        };
      } else {
        currentSlide.content += (currentSlide.content ? '\n\n' : '') + paragraph;
      }
    });

    // Ajouter la dernière diapositive
    if (currentSlide.content) {
      slides.push({...currentSlide});
    }

    setGeneratedSlides(slides);
  };

  const exportSlidesToPPTX = () => {
    if (generatedSlides.length === 0) {
      return;
    }

    const pptx = new PptxGenJS();
    
    // Configuration du thème
    pptx.layout = 'LAYOUT_16x9';
    
    // Générer les diapositives
    generatedSlides.forEach((slide, index) => {
      const pptxSlide = pptx.addSlide();
      
      // Titre de la diapositive
      pptxSlide.addText(slide.title, {
        x: 0.5,
        y: 0.5,
        w: '90%',
        h: 1,
        fontSize: 24,
        color: '363636',
        align: 'center'
      });

      // Contenu de la diapositive
      pptxSlide.addText(slide.content, {
        x: 0.5,
        y: 1.5,
        w: '90%',
        h: 5,
        fontSize: 16,
        color: '000000',
        align: 'left',
        bullet: true
      });

      // Pied de page
      pptxSlide.addText(`Page ${index + 1}`, {
        x: 0.5,
        y: 6.5,
        w: '90%',
        h: 0.5,
        fontSize: 12,
        color: '888888',
        align: 'center'
      });

      // Mettre à jour la progression
      setSlidesProgress(((index + 1) / generatedSlides.length) * 100);
    });

    // Nom du fichier basé sur la transcription
    const fileName = selectedTranscription 
      ? `${selectedTranscription.fileName}_presentation.pptx` 
      : 'transcription_presentation.pptx';

    // Sauvegarder le fichier
    pptx.writeFile(fileName)
      .then(() => {
        setSlidesProgress(0);
      })
      .catch(error => {
        console.error('Erreur lors de l\'exportation :', error);
      });
  };

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

  const handleExport = () => {
    switch (selectedExportFormat) {
      case 'txt':
        const blob = new Blob([textEditorContent], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${selectedTranscription.fileName}.txt`;
        link.click();
        break;
      case 'pdf':
        alert('Exportation PDF en développement');
        break;
      case 'word':
        alert('Exportation Word en développement');
        break;
      default:
        alert('Format non supporté');
    }
  };

  const renderNavbarContent = () => {
    if (!selectedTranscription) return null;

    switch(activeNavbarSection) {
      case 'text':
        return (
          <div className="navbar-content relative">
            {showCopyNotification && (
              <div className="copy-notification">
                <div className="notification-content">
                  <CheckCircle2 className="check-icon" />
                  <span>Texte copié</span>
                </div>
              </div>
            )}
            <div className="text-analysis-tools">
              <div className="text-tool">
                <h4>📝 Éditeur de Texte</h4>
                <textarea 
                  value={textEditorContent}
                  onChange={(e) => setTextEditorContent(e.target.value)}
                  className="text-editor"
                  style={{ fontFamily: selectedFont }}
                />
              </div>
              <div className="text-actions">
                <button 
                  onClick={handleCopy}
                  className="copy-button"
                >
                  {copyIcon} Copier
                </button>
                <button onClick={() => {
                  const searchTerm = prompt('Entrez le terme à rechercher :');
                  if (searchTerm) {
                    handleSearchInText();
                  }
                }}>🔍 Rechercher</button>
                <select 
                  value={selectedFont}
                  onChange={(e) => setSelectedFont(e.target.value)}
                  className="font-select"
                >
                  <option value="Arial">Police Arial</option>
                  <option value="Times New Roman">Police Times New Roman</option>
                  <option value="Calibri">Police Calibri</option>
                  <option value="Helvetica">Police Helvetica</option>
                  <option value="Georgia">Police Georgia</option>
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
        case 'summary':
          return (
            <div className="right-sidebar-content">
              <h3>Résumé Automatique</h3>
              <div className="summary-content">
                <p>Un résumé</p>
              </div>
            </div>
          );
case 'slides':
  return (
    <div className="right-sidebar-content">
      <h3 className="title-slide">Générateur de Diapositives</h3>
      <div className="slides-generator">
        <div className="slide-options">
          <select 
            value={selectedSlideTheme}
            onChange={(e) => setSelectedSlideTheme(e.target.value)}
            className="theme-select"
          >
            {slideThemes.map(theme => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            ))}
          </select>
          
          <div className="slide-settings">
            <label>
              <input type="checkbox" /> Inclure page de titre
            </label>
            <label>
              <input type="checkbox" /> Inclure numéros de page
            </label>
            <label>
              <input type="checkbox" /> Ajouter transitions
            </label>
          </div>
        </div>

        <button onClick={generateSlides} className="generate-slides-btn">
          <span className="icon">🖼️</span> Générer les Diapositives
        </button>
  {generatedSlides.length > 0 && (
    <div className="slides-preview">
      <h4 className='h4cs'>Aperçu des Diapositives</h4>
      <div className="slides-list">
        {generatedSlides.map(slide => (
          <div key={slide.title} className="slide-preview-item">
            <strong>{slide.title}</strong>
            <p>{slide.content.slice(0, 100)}...</p>
          </div>
        ))}
      </div>
      <div className="export-progress">
        {slidesProgress > 0 && (
          <progress 
            value={slidesProgress} 
            max="100"
            className="export-progress-bar"
          />
        )}
        <button 
          onClick={exportSlidesToPPTX}
          className="export-slides-btn"
        >
          💾 Exporter 
        </button>
      </div>
    </div>
  )}
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
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: searchResults.length > 0 ? highlightedContent : selectedTranscription.content 
                  }} 
                />
              </div>

              <div className="export-section">
                <h3>Exporter</h3>
                <div className="export-actions">
                  <select 
                    value={selectedExportFormat}
                    onChange={(e) => setSelectedExportFormat(e.target.value)}
                    className="export-select"
                  >
                    <option value="txt">📄 Texte</option>
                    <option value="pdf">📊 PDF</option>
                    <option value="word">📝 Word</option>
                  </select>
                  <button 
                    onClick={handleExport}
                    className="export-button"
                  >
                    💾 Exporter
                  </button>
                </div>
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
            className={activeRightSidebarTab === 'summary' ? 'active' : ''}
            onClick={() => setActiveRightSidebarTab('summary')}
          >
            📝 Résumé
          </button>
          <button 
            className={activeRightSidebarTab === 'slides' ? 'active' : ''}
            onClick={() => setActiveRightSidebarTab('slides')}
          >
            🖼️ Slides
          </button>
        </div>

        {renderRightSidebarContent()}
      </div>
    </div>
  );
};

export default TranscriptionResults;