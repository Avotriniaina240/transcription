import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import InstallationGuide from './components/guides/InstallationGuide';
import Login from './components/logins/Login';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/guide" element={<InstallationGuide />} />
          <Route path="/" element={<Login />} />
        </Routes>
    </Router>
  );
}

export default App;