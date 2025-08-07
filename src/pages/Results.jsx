import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAssessmentById, SKILL_CATEGORIES } from '../utils/assessmentData';
import './Results.css';

/**
 * Results - Self-assessment results page
 * 
 * Displays detailed results for a specific assessment,
 * showing individual skill ratings and interpretations.
 */
const Results = () => {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAssessment = () => {
      if (assessmentId) {
        const data = getAssessmentById(assessmentId);
        setAssessment(data);
      }
      setLoading(false);
    };

    loadAssessment();
  }, [assessmentId]);

  const getSkillLevel = (rating) => {
    switch (rating) {
      case 1: return { level: 'Beginner', description: 'Limited experience', color: '#dc3545' };
      case 2: return { level: 'Developing', description: 'Some experience', color: '#fd7e14' };
      case 3: return { level: 'Proficient', description: 'Good experience', color: '#28a745' };
      case 4: return { level: 'Expert', description: 'Extensive experience', color: '#007bff' };
      default: return { level: 'Unknown', description: '', color: '#6c757d' };
    }
  };

  const getOverallRating = () => {
    if (!assessment) return 0;
    const total = Object.values(assessment.skills).reduce((sum, rating) => sum + rating, 0);
    return (total / Object.keys(assessment.skills).length).toFixed(1);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleViewHeatmap = () => {
    navigate('/heatmap');
  };

  const handleTakeNewAssessment = () => {
    navigate('/self-assessment');
  };

  if (loading) {
    return (
      <div className="results loading">
        <div className="loading-message">Loading your results...</div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="results error">
        <div className="error-container">
          <h1>Assessment Not Found</h1>
          <p>The assessment you're looking for could not be found.</p>
          <button onClick={handleBackToHome} className="action-button">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const overallRating = getOverallRating();
  const assessmentDate = new Date(assessment.timestamp).toLocaleDateString();

  return (
    <div className="results">
      {/* Navigation Header */}
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-container">
          <button 
            className="back-button"
            onClick={handleBackToHome}
            aria-label="Back to home"
          >
            ← TeamSkill
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="results-content" role="main">
        <div className="results-container">
          {/* Header */}
          <div className="results-header">
            <h1 className="results-title">Assessment Results</h1>
            <div className="assessment-info">
              <p className="participant-name">{assessment.name}</p>
              <p className="assessment-date">Completed on {assessmentDate}</p>
            </div>
          </div>

          {/* Overall Score */}
          <div className="overall-score">
            <h2 className="section-title">Overall Skill Level</h2>
            <div className="score-display">
              <div className="score-number">{overallRating}</div>
              <div className="score-details">
                <div className="score-label">Average Rating</div>
                <div className="score-description">
                  {parseFloat(overallRating) >= 3 ? 'Strong performer with good experience across skills' :
                   parseFloat(overallRating) >= 2.5 ? 'Developing well with room for growth' :
                   'Building foundation skills - great potential for growth'}
                </div>
              </div>
            </div>
          </div>

          {/* Individual Skill Results */}
          <div className="skill-results">
            <h2 className="section-title">Individual Skill Breakdown</h2>
            <div className="skills-grid">
              {Object.entries(SKILL_CATEGORIES).map(([skillKey, skillName]) => {
                const rating = assessment.skills[skillKey];
                const skillInfo = getSkillLevel(rating);
                
                return (
                  <div key={skillKey} className="skill-card">
                    <div className="skill-header">
                      <h3 className="skill-name">{skillName}</h3>
                      <div 
                        className="skill-rating"
                        style={{ backgroundColor: skillInfo.color }}
                      >
                        {rating}
                      </div>
                    </div>
                    <div className="skill-details">
                      <div className="skill-level" style={{ color: skillInfo.color }}>
                        {skillInfo.level}
                      </div>
                      <div className="skill-description">
                        {skillInfo.description}
                      </div>
                    </div>
                    <div className="skill-progress">
                      <div 
                        className="progress-bar"
                        style={{ 
                          width: `${(rating / 4) * 100}%`,
                          backgroundColor: skillInfo.color 
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommendations */}
          <div className="recommendations">
            <h2 className="section-title">Recommendations</h2>
            <div className="recommendation-grid">
              {Object.entries(assessment.skills).map(([skillKey, rating]) => {
                const skillName = SKILL_CATEGORIES[skillKey];
                
                if (rating <= 2) {
                  return (
                    <div key={skillKey} className="recommendation-item improvement">
                      <div className="recommendation-icon">📚</div>
                      <div className="recommendation-content">
                        <h4>Focus on {skillName}</h4>
                        <p>Consider additional training or practice to strengthen your {skillName.toLowerCase()}.</p>
                      </div>
                    </div>
                  );
                } else if (rating >= 4) {
                  return (
                    <div key={skillKey} className="recommendation-item strength">
                      <div className="recommendation-icon">⭐</div>
                      <div className="recommendation-content">
                        <h4>Leverage your {skillName}</h4>
                        <p>Your strong {skillName.toLowerCase()} could be valuable for mentoring others or leading initiatives.</p>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="results-actions">
            <button 
              onClick={handleTakeNewAssessment}
              className="action-button primary"
            >
              Take New Assessment
            </button>
            <button 
              onClick={handleViewHeatmap}
              className="action-button secondary"
            >
              View Team Heatmap
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;