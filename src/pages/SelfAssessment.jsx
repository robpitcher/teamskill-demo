import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveAssessment, SKILL_CATEGORIES } from '../utils/assessmentData';
import './SelfAssessment.css';

/**
 * SelfAssessment - Self-assessment questionnaire page
 * 
 * Allows users to rate their skills in 4 categories (1-4 scale)
 * and manually enter their name for the assessment.
 */
const SelfAssessment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    skills: {
      GITHUB: 1,
      AZURE_DEVOPS: 1,
      AI_FOUNDRY: 1,
      INDUSTRY_KNOWLEDGE: 1
    }
  });

  const handleNameChange = (e) => {
    setFormData({
      ...formData,
      name: e.target.value
    });
  };

  const handleSkillChange = (skillKey, rating) => {
    setFormData({
      ...formData,
      skills: {
        ...formData.skills,
        [skillKey]: parseInt(rating)
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Please enter your name');
      return;
    }

    // Save the assessment
    const savedAssessment = saveAssessment(formData);
    
    // Navigate to results page with the assessment ID
    navigate(`/results/${savedAssessment.id}`);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="self-assessment">
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
      <main className="assessment-content" role="main">
        <div className="assessment-container">
          <div className="assessment-header">
            <h1 className="assessment-title">Self-Assessment Questionnaire</h1>
            <p className="assessment-description">
              Rate your skills in each area on a scale of 1-4, where:
            </p>
            <div className="rating-legend">
              <div className="legend-item">
                <span className="legend-number">1</span>
                <span className="legend-text">Beginner - Limited experience</span>
              </div>
              <div className="legend-item">
                <span className="legend-number">2</span>
                <span className="legend-text">Developing - Some experience</span>
              </div>
              <div className="legend-item">
                <span className="legend-number">3</span>
                <span className="legend-text">Proficient - Good experience</span>
              </div>
              <div className="legend-item">
                <span className="legend-number">4</span>
                <span className="legend-text">Expert - Extensive experience</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="assessment-form">
            {/* Name Input */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleNameChange}
                className="form-input"
                placeholder="Enter your full name"
                required
                aria-describedby="name-help"
              />
              <p id="name-help" className="form-help">
                This will identify your assessment results
              </p>
            </div>

            {/* Skill Rating Questions */}
            <div className="skills-section">
              <h2 className="skills-title">Rate Your Skills</h2>
              
              {Object.entries(SKILL_CATEGORIES).map(([skillKey, skillName]) => (
                <div key={skillKey} className="skill-group">
                  <label className="skill-label">
                    Rate your {skillName}
                  </label>
                  
                  <div className="rating-options" role="radiogroup" aria-labelledby={`${skillKey}-label`}>
                    {[1, 2, 3, 4].map((rating) => (
                      <label key={rating} className="rating-option">
                        <input
                          type="radio"
                          name={skillKey}
                          value={rating}
                          checked={formData.skills[skillKey] === rating}
                          onChange={(e) => handleSkillChange(skillKey, e.target.value)}
                          className="rating-input"
                        />
                        <span className="rating-display">
                          <span className="rating-number">{rating}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="form-actions">
              <button
                type="submit"
                className="submit-button"
                aria-describedby="submit-help"
              >
                Submit Assessment
              </button>
              <p id="submit-help" className="form-help">
                Your results will be saved and you'll see detailed feedback
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SelfAssessment;