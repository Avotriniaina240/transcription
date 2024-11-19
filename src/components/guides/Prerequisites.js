import React from 'react';
import { SERVICES, MAKE_API_KEY } from '../../config/constants';
import '../../styles/AutomationGuide.css';

export const Prerequisites = ({ configuredServices, onServiceConfig }) => (
  <div className="prerequisites-page">
    <div className="services">
      {SERVICES.map((service) => (
        <div key={service.name} className={`service-card ${configuredServices[service.name] ? 'configured' : ''}`}>
          <div className="service-header">
            <span className="service-icon">{service.icon}</span>
            <span className="service-name">{service.name}</span>
            {service.name === 'Make.com' && (
              <span className={`api-status ${MAKE_API_KEY ? 'configured' : 'not-configured'}`}>
                {MAKE_API_KEY ? '✓ API Configurée' : '⚠️ API non configurée'}
              </span>
            )}
          </div>
          
          <div className="requirements">
            {service.requirements.map((req, index) => (
              <div key={index} className="requirement">
                <span className="check">✓</span>
                <span>{req}</span>
              </div>
            ))}
            <div className="checkbox-container">
              <input 
                type="checkbox" 
                id={`checkbox-${service.name}`}
                checked={configuredServices[service.name]} 
                onChange={() => onServiceConfig(service.name)}
              />
              <label 
                htmlFor={`checkbox-${service.name}`} 
                className={configuredServices[service.name] ? 'configured' : ''}
              >
                déjà configuré
              </label>
            </div>
          </div>

          <button 
            onClick={() => window.open(service.actionLink, '_blank')}
            className={`action-button ${configuredServices[service.name] ? 'configured' : ''}`}
          >
            {configuredServices[service.name] ? '✓ Configuré' : service.actionText + ' →'}
          </button>
        </div>
      ))}
    </div>
  </div>
);