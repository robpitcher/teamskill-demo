/**
 * Assessment Data Management Utilities
 * Handles saving, loading, and aggregating skill assessment data using localStorage
 */

// Skill categories for the assessment
export const SKILL_CATEGORIES = {
  GITHUB: 'GitHub skills',
  AZURE_DEVOPS: 'Azure DevOps skills', 
  AI_FOUNDRY: 'AI Foundry skills',
  INDUSTRY_KNOWLEDGE: 'Industry knowledge skills'
};

// Assessment storage key
const ASSESSMENTS_STORAGE_KEY = 'teamskill_assessments';

/**
 * Save a new assessment to localStorage
 * @param {Object} assessment - Assessment data with name and skill ratings
 */
export const saveAssessment = (assessment) => {
  const assessments = getAllAssessments();
  const newAssessment = {
    ...assessment,
    id: Date.now().toString(),
    timestamp: new Date().toISOString()
  };
  
  assessments.push(newAssessment);
  localStorage.setItem(ASSESSMENTS_STORAGE_KEY, JSON.stringify(assessments));
  return newAssessment;
};

/**
 * Get all saved assessments from localStorage
 * @returns {Array} Array of assessment objects
 */
export const getAllAssessments = () => {
  try {
    const stored = localStorage.getItem(ASSESSMENTS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading assessments:', error);
    return [];
  }
};

/**
 * Get a specific assessment by ID
 * @param {string} id - Assessment ID
 * @returns {Object|null} Assessment object or null if not found
 */
export const getAssessmentById = (id) => {
  const assessments = getAllAssessments();
  return assessments.find(assessment => assessment.id === id) || null;
};

/**
 * Calculate aggregated heatmap data from all assessments
 * @returns {Object} Aggregated skill data for heatmap visualization
 */
export const getHeatmapData = () => {
  const assessments = getAllAssessments();
  
  if (assessments.length === 0) {
    return {
      averages: {},
      assessmentCount: 0,
      skillGaps: [],
      strengths: []
    };
  }

  // Calculate averages for each skill
  const skillTotals = {};
  const skillCategories = Object.keys(SKILL_CATEGORIES);
  
  skillCategories.forEach(skill => {
    skillTotals[skill] = 0;
  });

  assessments.forEach(assessment => {
    skillCategories.forEach(skill => {
      skillTotals[skill] += assessment.skills[skill] || 0;
    });
  });

  const averages = {};
  skillCategories.forEach(skill => {
    averages[skill] = skillTotals[skill] / assessments.length;
  });

  // Identify skill gaps (below 2.5 average) and strengths (above 3.0 average)
  const skillGaps = [];
  const strengths = [];
  
  Object.entries(averages).forEach(([skill, average]) => {
    const skillName = SKILL_CATEGORIES[skill];
    if (average < 2.5) {
      skillGaps.push({ skill: skillName, average: average.toFixed(1) });
    } else if (average >= 3.0) {
      strengths.push({ skill: skillName, average: average.toFixed(1) });
    }
  });

  return {
    averages,
    assessmentCount: assessments.length,
    skillGaps,
    strengths
  };
};

/**
 * Clear all assessment data (for testing purposes)
 */
export const clearAllAssessments = () => {
  localStorage.removeItem(ASSESSMENTS_STORAGE_KEY);
};