import React, { useState, useEffect } from 'react';
import { Prerequisites } from './Prerequisites';
import { Limitations } from './Limitations';
import { Installation } from './Installation';
import { STEPS, MAKE_API_KEY, BLUEPRINT_ID } from '../../config/constants';
import { MakeService } from '../../services/MakeService';
import '../../styles/AutomationGuide.css';


const InstallationGuide = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [configuredServices, setConfiguredServices] = useState({
    'Make.com': false,
    'AssemblyAI': false,
    'OneDrive': false
  });

  useEffect(() => {
    if (!MAKE_API_KEY || !BLUEPRINT_ID) {
      console.warn('Make.com API configuration missing');
    }
  }, []);

  const handleServiceConfig = (serviceName) => {
    setConfiguredServices(prev => ({
      ...prev,
      [serviceName]: !prev[serviceName]
    }));
  };

  const allServicesConfigured = Object.values(configuredServices).every(value => value);
  
  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = async () => {
    try {
      await MakeService.testAutomation();
      alert('Installation terminée ! L\'automatisation est prête à être utilisée.');
    } catch (error) {
      alert('Erreur lors de la finalisation : ' + error.message);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Prerequisites 
            configuredServices={configuredServices}
            onServiceConfig={handleServiceConfig}
          />
        );
      case 2:
        return <Limitations />;
      case 3:
        return <Installation />;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <h1>Guide d'Installation - Automatisation de Transcription</h1>
      <div className="steps">
        {STEPS.map((step) => (
          <div
            key={step.number}
            className={`step ${currentStep === step.number ? 'active' : ''}`}
          >
            <div className="step-number">{step.number}</div>
            <div className="step-details">
              <div className="step-title">{step.title}</div>
              <div className="step-subtitle">{step.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
  
      <div className="step-content">
        {renderStep()}
      </div>
  
      <div className="navigation-buttons">
        <button 
          className={`previous-button ${currentStep === 1 ? 'disabled' : ''}`} 
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          Précédent
        </button>
  
        {currentStep === 1 && (
          <button 
            className={`next-button ${!allServicesConfigured ? 'disabled' : ''}`}
            onClick={handleNext}
            disabled={!allServicesConfigured}
          >
            Suivant
          </button>
        )}
  
        {currentStep > 1 && currentStep < STEPS.length && (
          <button className="next-button" onClick={handleNext}>
            Suivant
          </button>
        )}
  
        {currentStep === STEPS.length && (
          <button className="next-button" onClick={handleFinish}>
            Terminer
          </button>
        )}
      </div>
    </div>
  );
};

export default InstallationGuide;