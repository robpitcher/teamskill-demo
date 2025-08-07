import React from 'react';

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

      {/* Inline Styles for Minimal Dependencies */}
      <style jsx>{`
        .landing-page {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          line-height: 1.6;
          color: #333;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* Navigation */
        .navbar {
          background: #fff;
          border-bottom: 1px solid #e9ecef;
          padding: 1rem 0;
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: #4a90e2;
          margin: 0;
        }

        /* Hero Section */
        .hero-section {
          flex: 1;
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 4rem 0;
        }

        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          text-align: center;
        }

        .hero-content {
          margin-bottom: 4rem;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .hero-tagline {
          font-size: 1.25rem;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto 3rem;
        }

        /* Call-to-Action */
        .cta-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .cta-button {
          background: #fff;
          color: #4a90e2;
          border: 2px solid #fff;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 280px;
          text-decoration: none;
          display: inline-block;
        }

        .cta-button:hover {
          background: transparent;
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .cta-button:focus {
          outline: 2px solid #fff;
          outline-offset: 2px;
        }

        .cta-secondary {
          background: transparent;
          color: #fff;
        }

        .cta-secondary:hover {
          background: #fff;
          color: #4a90e2;
        }

        .cta-description {
          font-size: 0.9rem;
          opacity: 0.8;
          margin: 0.5rem 0 0;
          max-width: 300px;
        }

        /* Features Grid */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 12px;
          text-align: center;
          backdrop-filter: blur(10px);
        }

        .feature-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .feature-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .feature-description {
          opacity: 0.9;
          font-size: 0.95rem;
        }

        /* Footer */
        .footer {
          background: #f8f9fa;
          padding: 2rem 0;
          margin-top: auto;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          text-align: center;
        }

        .footer-text {
          color: #6c757d;
          margin: 0;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }

          .hero-tagline {
            font-size: 1.1rem;
          }

          .navbar-container,
          .hero-container,
          .footer-container {
            padding: 0 1rem;
          }

          .cta-button {
            min-width: 240px;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 1.75rem;
          }

          .cta-button {
            min-width: 200px;
            padding: 0.875rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;