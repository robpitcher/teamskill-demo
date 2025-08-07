import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHeatmapData, getAllAssessments, SKILL_CATEGORIES } from '../utils/assessmentData';
import './Heatmap.css';

/**
 * Heatmap - Team skill overview page
 * 
 * Displays aggregated team skill data with visual heatmap,
 * showing strengths, skill gaps, and overall team metrics.
 */
const Heatmap = () => {
  const navigate = useNavigate();
  const [heatmapData, setHeatmapData] = useState(null);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      const data = getHeatmapData();
      const allAssessments = getAllAssessments();
      setHeatmapData(data);
      setAssessments(allAssessments);
      setLoading(false);
    };

    loadData();
  }, []);

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleTakeAssessment = () => {
    navigate('/self-assessment');
  };

  const getHeatmapColor = (average) => {
    if (average >= 3.5) return '#28a745'; // Strong - Dark Green
    if (average >= 3.0) return '#6dbf73'; // Good - Light Green
    if (average >= 2.5) return '#ffc107'; // Developing - Yellow
    if (average >= 2.0) return '#fd7e14'; // Needs attention - Orange
    return '#dc3545'; // Critical gap - Red
  };

  const getHeatmapIntensity = (average) => {
    return Math.max(0.3, average / 4); // Minimum 30% opacity
  };

  if (loading) {
    return (
      <div className="heatmap loading">
        <div className="loading-message">Loading team data...</div>
      </div>
    );
  }

  if (heatmapData.assessmentCount === 0) {
    return (
      <div className="heatmap empty">
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
        
        <div className="empty-state">
          <div className="empty-container">
            <div className="empty-icon">📊</div>
            <h1>No Assessment Data Available</h1>
            <p>Team heatmap data will appear here once team members complete their skill assessments.</p>
            <button onClick={handleTakeAssessment} className="action-button primary">
              Take First Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="heatmap">
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
      <main className="heatmap-content" role="main">
        <div className="heatmap-container">
          {/* Header */}
          <div className="heatmap-header">
            <h1 className="heatmap-title">Team Skill Heatmap</h1>
            <div className="team-metrics">
              <div className="metric">
                <span className="metric-number">{heatmapData.assessmentCount}</span>
                <span className="metric-label">Team Members Assessed</span>
              </div>
              <div className="metric">
                <span className="metric-number">{Object.keys(SKILL_CATEGORIES).length}</span>
                <span className="metric-label">Skill Areas</span>
              </div>
            </div>
          </div>

          {/* Heatmap Visualization */}
          <div className="heatmap-section">
            <h2 className="section-title">Skill Overview</h2>
            <div className="heatmap-grid">
              {Object.entries(SKILL_CATEGORIES).map(([skillKey, skillName]) => {
                const average = heatmapData.averages[skillKey] || 0;
                const color = getHeatmapColor(average);
                const intensity = getHeatmapIntensity(average);
                
                return (
                  <div 
                    key={skillKey} 
                    className="heatmap-cell"
                    style={{ 
                      backgroundColor: color,
                      opacity: intensity
                    }}
                  >
                    <div className="cell-content">
                      <h3 className="skill-name">{skillName}</h3>
                      <div className="skill-average">{average.toFixed(1)}</div>
                      <div className="skill-rating">
                        {average >= 3.5 ? 'Strong' :
                         average >= 3.0 ? 'Good' :
                         average >= 2.5 ? 'Developing' :
                         average >= 2.0 ? 'Needs Attention' :
                         'Critical Gap'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="heatmap-legend">
            <h3 className="legend-title">Skill Level Guide</h3>
            <div className="legend-items">
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#28a745' }}></div>
                <span className="legend-text">Strong (3.5+)</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#6dbf73' }}></div>
                <span className="legend-text">Good (3.0-3.4)</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#ffc107' }}></div>
                <span className="legend-text">Developing (2.5-2.9)</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#fd7e14' }}></div>
                <span className="legend-text">Needs Attention (2.0-2.4)</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#dc3545' }}></div>
                <span className="legend-text">Critical Gap (&lt;2.0)</span>
              </div>
            </div>
          </div>

          {/* Insights */}
          <div className="insights-section">
            <div className="insights-grid">
              {/* Strengths */}
              <div className="insight-card strengths">
                <h3 className="insight-title">Team Strengths</h3>
                {heatmapData.strengths.length > 0 ? (
                  <ul className="insight-list">
                    {heatmapData.strengths.map((strength, index) => (
                      <li key={index} className="insight-item">
                        <span className="insight-skill">{strength.skill}</span>
                        <span className="insight-value">{strength.average}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="insight-empty">No strong skill areas identified yet. Consider additional training and development.</p>
                )}
              </div>

              {/* Skill Gaps */}
              <div className="insight-card gaps">
                <h3 className="insight-title">Skill Gaps</h3>
                {heatmapData.skillGaps.length > 0 ? (
                  <ul className="insight-list">
                    {heatmapData.skillGaps.map((gap, index) => (
                      <li key={index} className="insight-item">
                        <span className="insight-skill">{gap.skill}</span>
                        <span className="insight-value">{gap.average}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="insight-empty">No critical skill gaps identified. Team is performing well across all areas.</p>
                )}
              </div>
            </div>
          </div>

          {/* Recent Assessments */}
          <div className="recent-assessments">
            <h2 className="section-title">Recent Assessments</h2>
            <div className="assessments-list">
              {assessments.slice(-5).reverse().map((assessment) => (
                <div key={assessment.id} className="assessment-item">
                  <div className="assessment-info">
                    <span className="assessment-name">{assessment.name}</span>
                    <span className="assessment-date">
                      {new Date(assessment.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="assessment-scores">
                    {Object.entries(assessment.skills).map(([skillKey, rating]) => (
                      <span 
                        key={skillKey} 
                        className="score-badge"
                        style={{ backgroundColor: getHeatmapColor(rating) }}
                      >
                        {rating}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="heatmap-actions">
            <button 
              onClick={handleTakeAssessment}
              className="action-button primary"
            >
              Add New Assessment
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Heatmap;