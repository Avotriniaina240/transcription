import React, { useState, useEffect } from 'react';
import pptxgen from 'pptxgenjs';
import '../../styles/TranscriptionSlide.css';

const TranscriptionSlides = () => {
  const [transcriptionText, setTranscriptionText] = useState('');
  const [slides, setSlides] = useState([]);
  const [theme, setTheme] = useState('default');
  const [slideDesign, setSlideDesign] = useState('minimal');
  const [fontSize, setFontSize] = useState('medium');
  const [slideSize, setSlideSize] = useState('16:9');

  // Helper function to convert RGB object to hex color
  const rgbToHex = (rgb) => {
    if (!rgb || typeof rgb !== 'object') return '#000000';
    const { r, g, b } = rgb;
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  const themes = {
    default: {
      background: { r: 244, g: 244, b: 244 },
      primaryColor: { r: 51, g: 51, b: 51 },
      secondaryColor: { r: 0, g: 123, b: 255 }
    },
    ocean: {
      background: { r: 230, g: 242, b: 255 },
      primaryColor: { r: 0, g: 86, b: 179 },
      secondaryColor: { r: 77, g: 166, b: 255 }
    },
    forest: {
      background: { r: 230, g: 243, b: 230 },
      primaryColor: { r: 20, g: 90, b: 50 },
      secondaryColor: { r: 46, g: 139, b: 87 }
    },
    sunset: {
      background: { r: 255, g: 240, b: 230 },
      primaryColor: { r: 139, g: 69, b: 19 },
      secondaryColor: { r: 255, g: 69, b: 0 }
    }
  };

  const slideSizeOptions = {
    '16:9': { width: 10, height: 5.625 },
    '4:3': { width: 10, height: 7.5 },
    'A4': { width: 8.27, height: 11.69 }
  };

  const convertTextToSlides = () => {
    const paragraphs = transcriptionText
      .split('\n')
      .filter(p => p.trim() !== '')
      .map(p => p.length > 300 ? p.slice(0, 300) + '...' : p);

    const newSlides = paragraphs.map((paragraph, index) => ({
      id: index + 1,
      content: paragraph,
      title: `Slide ${index + 1}`
    }));

    setSlides(newSlides);
  };

  const exportToPPTX = () => {
    if (slides.length === 0) {
      alert('Veuillez d\'abord générer des slides');
      return;
    }

    const pptx = new pptxgen();

    const selectedSize = slideSizeOptions[slideSize];
    pptx.defineLayout({ 
      name: 'custom', 
      width: selectedSize.width, 
      height: selectedSize.height 
    });
    pptx.layout = 'custom';

    const selectedTheme = themes[theme];

    slides.forEach((slide, index) => {
      const pptxSlide = pptx.addSlide();

      // Convert RGB to hex for reliable color handling
      pptxSlide.background = { 
        color: rgbToHex(selectedTheme.background) 
      };

      // Add title with hex colors
      pptxSlide.addText(slide.title, {
        x: 0.5,
        y: 0.5,
        fontSize: 24,
        color: rgbToHex(selectedTheme.primaryColor),
        fontFace: 'Arial',
        w: selectedSize.width - 1,
        align: 'center'
      });

      // Add content with hex colors
      pptxSlide.addText(slide.content, {
        x: 0.5,
        y: 1.5,
        fontSize: 18,
        color: rgbToHex(selectedTheme.primaryColor),
        fontFace: 'Arial',
        w: selectedSize.width - 1,
        h: selectedSize.height - 2,
        wrap: true,
        align: 'left'
      });
    });

    // Download the PPTX file
    pptx.writeFile({
      fileName: `Transcription_Slides_${new Date().toISOString().slice(0,10)}.pptx`
    });
  };

  const renderSlides = () => {
    const selectedTheme = themes[theme];

    // Convert RGB to CSS color string
    const backgroundCss = `rgb(${selectedTheme.background.r}, ${selectedTheme.background.g}, ${selectedTheme.background.b})`;
    const primaryColorCss = `rgb(${selectedTheme.primaryColor.r}, ${selectedTheme.primaryColor.g}, ${selectedTheme.primaryColor.b})`;

    return slides.map((slide) => (
      <div 
        key={slide.id} 
        className={`slide ${slideDesign} ${fontSize}`}
        style={{
          backgroundColor: backgroundCss,
          color: primaryColorCss,
          borderColor: primaryColorCss
        }}
      >
        <h2 
          style={{ color: primaryColorCss }}
          className="slide-title"
        >
          {slide.title}
        </h2>
        <p 
          style={{ color: primaryColorCss }}
          className="slide-content"
        >
          {slide.content}
        </p>
      </div>
    ));
  };
  return (
    <div className="transcription-slides-container">
      <div className="controls-section">
        <div className="input-section">
          <h2>Convertir la Transcription en Slides</h2>
          <textarea 
            placeholder="Collez votre transcription ici..."
            value={transcriptionText}
            onChange={(e) => setTranscriptionText(e.target.value)}
            rows={6}
          />
          <div className="action-buttons">
            <button onClick={convertTextToSlides}>
              Générer des Slides
            </button>
            <button 
              onClick={exportToPPTX}
              className="export-button"
              disabled={slides.length === 0}
            >
              Exporter 
            </button>
          </div>
        </div>

        <div className="customization-section">
          <div className="theme-selector">
            <label>Thème de Couleur</label>
            <select 
              value={theme} 
              onChange={(e) => setTheme(e.target.value)}
            >
              {Object.keys(themes).map(themeKey => (
                <option key={themeKey} value={themeKey}>
                  {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="design-selector">
            <label>Design des Slides</label>
            <select 
              value={slideDesign} 
              onChange={(e) => setSlideDesign(e.target.value)}
            >
              <option value="minimal">Minimal</option>
              <option value="modern">Moderne</option>
              <option value="clean">Épuré</option>
            </select>
          </div>

          <div className="font-size-selector">
            <label>Taille de Police</label>
            <select 
              value={fontSize} 
              onChange={(e) => setFontSize(e.target.value)}
            >
              <option value="small">Petit</option>
              <option value="medium">Moyen</option>
              <option value="large">Grand</option>
            </select>
          </div>

          <div className="slide-size-selector">
            <label>Format des Slides</label>
            <select 
              value={slideSize} 
              onChange={(e) => setSlideSize(e.target.value)}
            >
              <option value="16:9">16:9</option>
              <option value="4:3">4:3</option>
              <option value="A4">A4</option>
            </select>
          </div>
        </div>
      </div>

      <div className="slides-preview">
        {slides.length > 0 ? renderSlides() : (
          <div className="placeholder">
            Vos slides apparaîtront ici
          </div>
        )}
      </div>
    </div>
  );
};

export default TranscriptionSlides;