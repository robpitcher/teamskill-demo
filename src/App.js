import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SelfAssessment from './pages/SelfAssessment';
import Results from './pages/Results';
import Heatmap from './pages/Heatmap';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/self-assessment" element={<SelfAssessment />} />
          <Route path="/results/:assessmentId" element={<Results />} />
          <Route path="/heatmap" element={<Heatmap />} />
          <Route path="/login" element={<Heatmap />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;