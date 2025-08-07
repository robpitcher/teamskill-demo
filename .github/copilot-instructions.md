# GitHub Copilot Instructions for teamskill-demo

## Repository Overview

**teamskill-demo** is a minimal React component demonstration repository containing a single, comprehensive landing page component for a Team Skill Web App. This is a **component library/prototype repository** designed to showcase a professional landing page that can be integrated into React applications.

### High-Level Repository Details
- **Repository Type**: React component demo/library
- **Size**: Minimal (5 files total)
- **Primary Language**: JavaScript (JSX)
- **Framework**: React.js (functional components)
- **Dependencies**: None (designed to be dependency-free except React)
- **Target Use**: Copy-paste integration into React projects

## Critical Information for Agents

**⚠️ IMPORTANT**: This repository does NOT contain a buildable application. It contains a single React component meant to be integrated into other React projects. There is no package.json, build system, or CI/CD pipeline.

## Build Instructions

### Environment Requirements
- **Node.js**: 18+ (v20.19.4 confirmed working)
- **npm**: 10+ (v10.8.2 confirmed working)
- **React**: 16.8+ (for hooks support, though this component doesn't use hooks)

### No Build System Available
**There is no build system in this repository.** The component is designed to be:
1. Copied into an existing React project
2. Imported and used directly
3. Styled with included inline styles

### Testing the Component
Since there's no test framework, validate the component by:

```bash
# Syntax validation (always run this first)
node -e "
const fs = require('fs');
const content = fs.readFileSync('./src/pages/LandingPage.jsx', 'utf8');
if (content.includes('export default LandingPage')) {
  console.log('✓ Component export validated');
} else {
  console.error('✗ Component export missing');
}
"
```

### Integration Testing
To test the component in a real React application:

```bash
# Create a new React project (in a separate directory)
npx create-react-app test-integration
cd test-integration

# Copy the component
mkdir -p src/pages
cp /path/to/teamskill-demo/src/pages/LandingPage.jsx src/pages/

# Update src/App.js to import and use LandingPage
# Start the development server
npm start
```

### Validation Steps
1. **Always** verify the component syntax before making changes
2. Test integration in a separate React project when making significant changes
3. Validate responsive design on different screen sizes
4. Check accessibility with screen reader tools
5. Verify all navigation links work as expected

## Project Layout & Architecture

### File Structure
```
teamskill-demo/
├── src/pages/LandingPage.jsx    # Main React component (319 lines)
├── README.md                    # Minimal repository description
├── README-landing-page.md       # Comprehensive component documentation
├── prd-team-skill-web-app.md   # Product requirements document
└── LICENSE                      # MIT license
```

### Component Architecture
The `LandingPage.jsx` component is:
- **Self-contained**: All styles included inline using styled-jsx
- **Accessible**: WCAG 2.1 AA compliant with proper ARIA labels
- **Responsive**: Mobile-first design with breakpoints
- **Framework-agnostic**: Uses standard React patterns for easy integration

### Key Component Features
- Navigation header with brand logo
- Hero section with call-to-action buttons
- Feature cards grid (3 features)
- Footer with copyright
- Inline styles (no external CSS dependencies)
- Event handlers for navigation (currently uses window.location.href)

### Navigation Flow
- **"Start Your Self-Assessment"** → `/self-assessment`
- **"View Team Heatmap"** → `/login?role=manager`

## Development Workflow

### Making Changes to the Component
1. **Before editing**: Always run syntax validation
2. **Edit carefully**: The component uses inline styles - maintain the styled-jsx format
3. **Test integration**: Copy to a React project to test visual changes
4. **Accessibility**: Maintain ARIA labels and semantic HTML
5. **Responsive design**: Test on multiple screen sizes

### Common Tasks

#### Updating Styles
```javascript
// Styles are in the <style jsx> block at the end of the component
<style jsx>{`
  .landing-page {
    /* Update main container styles here */
  }
  .hero-section {
    /* Update hero background, colors here */
  }
`}</style>
```

#### Modifying Navigation
```javascript
// Update these functions in the component
const handleStartAssessment = () => {
  // For React Router: navigate('/self-assessment');
  window.location.href = '/self-assessment';
};

const handleViewHeatmap = () => {
  // For React Router: navigate('/login?role=manager');
  window.location.href = '/login?role=manager';
};
```

#### Adding New Features
- Maintain the existing styled-jsx pattern
- Keep accessibility features (ARIA labels, semantic HTML)
- Update responsive breakpoints if needed
- Follow the existing naming conventions

### Documentation Updates
When making changes, also update:
- `README-landing-page.md` - Component documentation
- Component JSDoc comments if adding new functions
- This file if changing architecture or workflow

## Dependencies & Integration

### External Dependencies
**None** - The component is designed to work with just React.

### Integration Requirements
To use this component in a React project:

```javascript
// 1. Copy LandingPage.jsx to your project
// 2. Import in your app
import LandingPage from './pages/LandingPage';

// 3. Use in your component tree
function App() {
  return <LandingPage />;
}
```

### For React Router Integration
```javascript
import { useNavigate } from 'react-router-dom';

// Update the component to use React Router
const navigate = useNavigate();
const handleStartAssessment = () => navigate('/self-assessment');
```

## Validation & Quality Assurance

### Before Committing Changes
1. **Syntax Check**: Run the Node.js validation script
2. **Visual Test**: Integration test in a React app
3. **Accessibility**: Screen reader and keyboard navigation testing
4. **Responsive**: Test on mobile, tablet, desktop viewports
5. **Documentation**: Update relevant documentation files

### No CI/CD Pipeline
There are **no automated tests or CI/CD workflows** in this repository. All validation must be done manually:
- No GitHub Actions workflows
- No automated testing
- No code quality checks
- No deployment pipeline

### Manual Testing Checklist
- [ ] Component syntax validates without errors
- [ ] Integration test in React app works
- [ ] Both CTA buttons are clickable and navigate correctly
- [ ] Design is responsive across screen sizes
- [ ] Accessibility features work with screen readers
- [ ] Keyboard navigation works for all interactive elements

## Key Facts for Efficient Development

### What This Repository IS
- A single, comprehensive React landing page component
- Copy-paste ready for React projects
- Fully documented with usage examples
- Accessible and responsive by design
- Self-contained with inline styles

### What This Repository IS NOT
- A complete React application
- A buildable project with npm scripts
- A project with testing infrastructure
- A project with CI/CD or automation

### Time-Saving Tips
1. **Always start** with the comprehensive documentation in `README-landing-page.md`
2. **Don't try to run** `npm install` or `npm start` - there's no package.json
3. **Use the validation script** before making changes
4. **Copy the component** to test in a real React environment
5. **Refer to the PRD** (`prd-team-skill-web-app.md`) for business context

### Common Pitfalls to Avoid
- Don't try to initialize npm or create build scripts
- Don't expect automated testing - everything is manual
- Don't modify the styled-jsx format without understanding it
- Don't remove accessibility features
- Don't change the responsive breakpoints without testing

## Trust These Instructions

**These instructions are comprehensive and accurate.** Only search for additional information if:
- You encounter specific errors not covered here
- You need to understand business requirements (see PRD)
- You need detailed component usage examples (see README-landing-page.md)
- These instructions appear to be incorrect or outdated

The repository structure and workflow are intentionally minimal. Focus on the component quality and integration guidance rather than looking for complex build systems that don't exist.