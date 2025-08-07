import React from 'react';
import './LandingPage.css';

/**
 * LandingPage - Professional landing page for Team Skill Web App
 * 
 * A modern, accessible React functional component featuring:
 * - Clean, responsive design
 * - Clear call-to-action buttons
 * - Ready for React Router integration
 */
const LandingPage = () => {
  const handleStartAssessment = () => {
    // In a real app with React Router, this would use navigate('/self-assessment')
    window.location.href = '/self-assessment';
  };

  const handleViewHeatmap = () => {
    // In a real app with React Router, this would use navigate('/login?role=manager')
    window.location.href = '/login?role=manager';
  };

  return (
    <div className="landing-page">
      {/* Navigation Header */}
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-container">
          <div className="navbar-brand">
            <h1 className="logo">TeamSkill</h1>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="hero-section" role="main">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Unlock Your Team's Potential
            </h1>
            <p className="hero-tagline">
              Discover skill gaps, build stronger teams, and drive organizational growth 
              with data-driven insights and personalized assessments.
            </p>

            {/* Call-to-Action Buttons */}
            <div className="cta-section" role="group" aria-label="Main actions">
              <button 
                className="cta-button cta-primary"
                onClick={handleStartAssessment}
                aria-describedby="assessment-description"
              >
                Start Your Self-Assessment
              </button>
              <p id="assessment-description" className="cta-description">
                Take a quick skill assessment to identify your strengths and growth areas
              </p>

              <button 
                className="cta-button cta-secondary"
                onClick={handleViewHeatmap}
                aria-describedby="heatmap-description"
              >
                View Team Heatmap
              </button>
              <p id="heatmap-description" className="cta-description">
                Access management dashboard to view team skill insights (login required)
              </p>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">📊</div>
              <h3 className="feature-title">Skill Assessment</h3>
              <p className="feature-description">
                Comprehensive self-assessment tools to evaluate technical and soft skills
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">🎯</div>
              <h3 className="feature-title">Team Insights</h3>
              <p className="feature-description">
                Visual heatmaps showing team strengths, gaps, and development opportunities
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">📈</div>
              <h3 className="feature-title">Growth Tracking</h3>
              <p className="feature-description">
                Monitor progress over time and set targeted learning goals
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer" role="contentinfo">
        <div className="footer-container">
          <p className="footer-text">
            &copy; 2024 TeamSkill. Built for modern teams.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;