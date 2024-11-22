import React, { useState, useRef } from 'react';
import { Upload, Music, Video } from 'lucide-react'; // Ajout des icônes Music et Video
import '../../styles/AutomationGuide.css';

const TranscriptionApp = () => {
    const [file, setFile] = useState(null);
    const [transcription, setTranscription] = useState('');
    const [language, setLanguage] = useState('fr');
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileUpload = (event) => {
        const uploadedFile = event.target.files[0];

        if (uploadedFile && (uploadedFile.type.startsWith('audio/') || uploadedFile.type.startsWith('video/'))) {
            setFile(uploadedFile);
            setTranscription('');
        } else {
            alert("Veuillez sélectionner un fichier audio ou vidéo valide.");
        }
    };

    const handleTranscription = async () => {
        if (!file) {
            alert("Veuillez d'abord sélectionner un fichier.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('language', language);

        try {
            setLoading(true);
            setTranscription('Transcription en cours...');
            
            const response = await fetch('http://localhost:5678/webhook-test/705e1646-0eb3-4577-9c37-bb08d032b085', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la transcription');
            }

            const result = await response.json();
            
            setTranscription(result.transcription || 'Transcription terminée');
            
            setTimeout(() => {
                setTranscription('');
                setFile(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }, 3000);

        } catch (error) {
            console.error('Erreur de transcription:', error);
            setTranscription('Échec de la transcription');
            
            setTimeout(() => {
                setTranscription('');
                setFile(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }, 3000);
        } finally {
            setLoading(false);
        }
    };

    const LoadingSpinner = () => (
        <div className="loading-spinner">
            <div className="spinner"></div>
        </div>
    );

    const getFileUploadClass = () => {
        if (!file) return "installation-guide-file-upload";
        return `installation-guide-file-upload file-upload-success file-upload-gradient`;
    };

    const getIconForFile = () => {
        if (!file) return <Upload className="mr-2 h-5 w-5" />;
        if (file.type.startsWith('audio/')) return <Music className="mr-2 h-5 w-5" />;
        if (file.type.startsWith('video/')) return <Video className="mr-2 h-5 w-5" />;
    };

    const languageOptions = [
        { code: 'fr', name: 'Français' },
        { code: 'en', name: 'Anglais' },
        { code: 'es', name: 'Espagnol' },
        { code: 'de', name: 'Allemand' }
    ];

    return (
        <div className="installation-guide-wrapper">
            <div className="installation-guide-sidebar">
                <h2>Auto-Transcript</h2>
                <select 
                    className="installation-guide-language-select"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    {languageOptions.map(option => (
                        <option key={option.code} value={option.code}>
                            {option.name}
                        </option>
                    ))}
                </select>

                <div className="features-section">
                    <div className="feature-item">
                        <div className="feature-icon">🌐</div>
                        <div>
                            <h3>Multi-Langues</h3>
                            <p>Transcription dans plusieurs langues</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">⭐</div>
                        <div>
                            <h3>Haute Précision</h3>
                            <p>Intelligence artificielle de pointe</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">⏱️</div>
                        <div>
                            <h3>Rapide</h3>
                            <p>Transcription en quelques instants</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="installation-guide-main-content">
                <div className="additional-info">
                    <h3>Comment ça marche ?</h3>
                    <ol>
                        <li>Sélectionnez langue pour le transcription</li>
                        <li>Sélectionnez votre fichier audio/vidéo</li>
                        <li>Cliquez sur "Transcrire"</li>
                        <li>Récupérez votre transcription</li>
                    </ol>
                </div>

                {loading ? (
                    <LoadingSpinner />
                ) : (
                    transcription && (
                        <div className="installation-guide-transcription-result">
                            {transcription}
                        </div>
                    )
                )}

                <input 
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept="audio/*,video/*"
                    onChange={handleFileUpload}
                />
                <div 
                    className={getFileUploadClass()}
                    onClick={() => fileInputRef.current.click()}
                >
                    {getIconForFile()}
                    {file ? file.name : "Sélectionnez votre fichier audio/vidéo"}
                </div>
                
                <button 
                    className="installation-guide-btn" 
                    onClick={handleTranscription}
                    disabled={!file || loading}
                >
                    {loading ? 'Transcription en cours...' : 'Transcrire'}
                </button>
            </div>
        </div>
    );
};

export default TranscriptionApp;
