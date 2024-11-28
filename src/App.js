import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import InstallationGuide from './components/guides/InstallationGuide';
import TranscriptionSlide from './components/guides/TranscriptionSlide';
import TranscriptionResults from './components/guides/TranscriptionResults';
import Login from './components/logins/Login';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/guide" element={<InstallationGuide />} />
          <Route path="/slide" element={<TranscriptionSlide />} />
          <Route path="/guide-suite" element={<TranscriptionResults />} />
          <Route path="/" element={<Login />} />
        </Routes>
    </Router>
  );
}

export default App;