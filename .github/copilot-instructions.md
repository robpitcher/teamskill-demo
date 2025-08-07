# GitHub Copilot Instructions for teamskill-demo

## Repository Overview

**teamskill-demo** is a React web application for team skill assessment and management. Currently in early development, it contains a comprehensive landing page component and is evolving into a full buildable application for organizations to identify skill gaps, optimize team composition, and drive strategic workforce development.

### High-Level Repository Details
- **Repository Type**: React web application (evolving from component prototype)
- **Current State**: Landing page component with plans for full application build system
- **Primary Language**: JavaScript (JSX)
- **Framework**: React.js (functional components)
- **Target Use**: Standalone web application for team skill management
- **Vision**: Complete platform with self-assessment tools, team heatmaps, and analytics

## Critical Information for Agents

**⚠️ CURRENT STATE**: This repository is transitioning from a component prototype to a full buildable React application. Currently, there is no package.json or build system, but the goal is to evolve it into a complete standalone web app as outlined in the PRD (`prd-team-skill-web-app.md`).

## Build Instructions

### Environment Requirements
- **Node.js**: 18+ (v20.19.4 confirmed working)
- **npm**: 10+ (v10.8.2 confirmed working)
- **React**: 16.8+ (for hooks support)

### Current Build Status
**Currently transitioning to full build system.** The repository is in development with these options:

#### Option 1: Initialize as React App (Recommended for full app development)
```bash
# Initialize the project as a buildable React application
npm init react-app . --template typescript
# or for JavaScript:
npm init react-app .

# Move existing component to appropriate location
mkdir -p src/pages
cp src/pages/LandingPage.jsx src/pages/
```

#### Option 2: Component Testing (Current method)
For immediate component validation without full build system:

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

### Integration Testing (Temporary approach)
To test the component while transitioning to full app:

```bash
# Create a test React project (in a separate directory)
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
2. **Build system**: Consider initializing full React app build system when adding new features
3. Test integration in a separate React project when making significant changes
4. Validate responsive design on different screen sizes
5. Check accessibility with screen reader tools
6. Verify all navigation links work as expected

## Project Layout & Architecture

### Current File Structure
```
teamskill-demo/
├── src/pages/LandingPage.jsx    # Main React component (landing page)
├── README.md                    # Repository description
├── README-landing-page.md       # Component documentation
├── prd-team-skill-web-app.md   # Product requirements document
├── LICENSE                      # MIT license
└── .github/copilot-instructions.md  # This file
```

### Planned Application Architecture
Based on the PRD, the full application will include:
- **Landing Page** (current) - Entry point with navigation to main features
- **Self-Assessment Module** - Individual skill assessment tools
- **Team Heatmap Dashboard** - Manager view of team skills and gaps
- **Analytics & Reporting** - Skill trends and insights
- **User Management** - Authentication and role-based access
- **Admin Tools** - Organization-wide settings and data management

### Current Component Architecture
The `LandingPage.jsx` component is:
- **Self-contained**: All styles included inline using styled-jsx
- **Accessible**: WCAG 2.1 AA compliant with proper ARIA labels
- **Responsive**: Mobile-first design with breakpoints
- **Framework-ready**: Uses standard React patterns for integration into full app

### Key Component Features
- Navigation header with brand logo
- Hero section with call-to-action buttons
- Feature cards grid (3 features aligning with PRD goals)
- Footer with copyright
- Inline styles (transitioning to app-wide CSS system)
- Event handlers for navigation (ready for React Router integration)

### Navigation Flow (Current Implementation)
- **"Start Your Self-Assessment"** → `/self-assessment` (planned: individual skill assessment)
- **"View Team Heatmap"** → `/login?role=manager` (planned: manager dashboard)

## Development Workflow

### Making Changes to the Application

#### Current Component Development
1. **Before editing**: Always run syntax validation
2. **Edit carefully**: The component uses inline styles - maintain consistency or prepare for CSS migration
3. **Test integration**: Copy to a React project to test visual changes
4. **Accessibility**: Maintain ARIA labels and semantic HTML
5. **Responsive design**: Test on multiple screen sizes

#### Transitioning to Full Application
When adding new features or pages:
1. **Initialize build system**: Run `npm init react-app .` to create full application structure
2. **Migrate existing component**: Move LandingPage.jsx to appropriate location in new structure
3. **Add routing**: Implement React Router for navigation between pages
4. **State management**: Consider Context API or Redux for application state
5. **Testing**: Set up Jest and React Testing Library

### Common Tasks

#### Building the Full Application (Future)
```bash
# After initializing React app
npm install
npm start     # Development server
npm run build # Production build
npm test      # Run tests
```

#### Updating Styles (Current)
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

#### Modifying Navigation (Preparing for React Router)
```javascript
// Current implementation (will be updated with React Router)
const handleStartAssessment = () => {
  // Future: navigate('/self-assessment');
  window.location.href = '/self-assessment';
};

const handleViewHeatmap = () => {
  // Future: navigate('/login?role=manager');
  window.location.href = '/login?role=manager';
};
```

#### Adding New Pages/Features
When expanding beyond the landing page:
- Create new components in `src/pages/` or `src/components/`
- Follow the accessibility and responsive design patterns from LandingPage
- Integrate with the overall application navigation
- Reference the PRD for feature requirements and user flows

### Documentation Updates
When making changes, also update:
- `README-landing-page.md` - Component documentation (current state)
- `README.md` - Repository overview (update as app evolves)
- Component JSDoc comments if adding new functions
- This file if changing architecture or workflow
- Consider creating additional documentation as the app grows

## Dependencies & Integration

### Current Dependencies
**Minimal** - Currently only requires React for the landing page component.

### Planned Dependencies (Full Application)
As the application evolves, consider these standard React app dependencies:
- **React Router** - Client-side routing for navigation
- **Axios/Fetch** - API communication for skill assessments and data
- **Authentication Library** - User management (Auth0, Firebase Auth, or custom)
- **State Management** - Context API or Redux for application state
- **UI Framework** - Material-UI, Chakra UI, or custom design system
- **Testing** - Jest, React Testing Library (included with create-react-app)
- **Form Handling** - Formik or React Hook Form for assessment forms

### Current Integration Approach
To use the current component:

```javascript
// In a React application
import LandingPage from './pages/LandingPage';

function App() {
  return <LandingPage />;
}
```

### Future Application Integration
```javascript
// With React Router (planned)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SelfAssessment from './pages/SelfAssessment';
import TeamHeatmap from './pages/TeamHeatmap';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/self-assessment" element={<SelfAssessment />} />
        <Route path="/team-heatmap" element={<TeamHeatmap />} />
      </Routes>
    </Router>
  );
}
```

## Validation & Quality Assurance

### Before Committing Changes
1. **Syntax Check**: Run the Node.js validation script for current component
2. **Build Test**: If build system is initialized, run `npm run build`
3. **Visual Test**: Integration test in React app or development server
4. **Accessibility**: Screen reader and keyboard navigation testing
5. **Responsive**: Test on mobile, tablet, desktop viewports
6. **Documentation**: Update relevant documentation files

### Current Testing Status
**Manual testing required** - No automated test framework currently exists:
- No GitHub Actions workflows
- No automated testing
- No code quality checks
- No deployment pipeline

### Planned Testing Framework
When transitioning to full application:
- **Unit Tests**: Jest + React Testing Library (included with create-react-app)
- **Integration Tests**: Test navigation flows and user interactions
- **Accessibility Tests**: Automated a11y checks
- **E2E Tests**: Cypress or Playwright for full user workflows
- **CI/CD**: GitHub Actions for automated testing and deployment

### Manual Testing Checklist (Current)
- [ ] Component syntax validates without errors
- [ ] Integration test in React app works (if build system exists)
- [ ] Both CTA buttons are clickable and navigate correctly
- [ ] Design is responsive across screen sizes
- [ ] Accessibility features work with screen readers
- [ ] Keyboard navigation works for all interactive elements

## Key Facts for Efficient Development

### What This Repository IS
- **Team Skill Web Application** - A React app for skill assessment and team management (in development)
- **Current State**: Professional landing page component with plans for full application
- **Production Ready**: Landing page is accessible, responsive, and ready for integration
- **Well-Documented**: Comprehensive PRD and component documentation
- **Evolving Architecture**: Transitioning from component prototype to full buildable app

### What This Repository IS BECOMING
- A complete React application with multiple pages and features
- Self-assessment tools for individual skill evaluation
- Team heatmap dashboards for managers
- Analytics and reporting capabilities
- User authentication and role-based access control
- A deployable web application for organizational skill management

### Current Development Approach
1. **Start with PRD**: Review `prd-team-skill-web-app.md` for feature requirements and user stories
2. **Understand current component**: Examine `LandingPage.jsx` and its documentation
3. **Plan for scale**: Consider how new features fit into the overall application architecture
4. **Maintain quality**: Keep accessibility and responsive design standards
5. **Document changes**: Update relevant documentation as features are added

### Time-Saving Tips
1. **Always start** with the PRD to understand business requirements
2. **Use existing patterns** from LandingPage.jsx for consistency
3. **Plan for React Router** when adding navigation features
4. **Consider build system** when adding significant new functionality
5. **Maintain documentation** as the application evolves

### Common Development Paths

#### Adding New Pages
1. Create new component in `src/pages/`
2. Follow LandingPage.jsx patterns for accessibility and styling
3. Plan navigation integration (currently window.location, future React Router)
4. Update documentation and navigation flows

#### Implementing Full Build System
1. Run `npm init react-app .` to initialize build system
2. Migrate existing component to new structure
3. Add React Router for navigation
4. Set up state management as needed
5. Configure testing framework

### Common Pitfalls to Avoid
- Don't lose the accessibility features when adding new components
- Don't break responsive design when adding new features
- Don't ignore the PRD when implementing new functionality
- Don't forget to update documentation as the app evolves
- Don't overcomplicate the architecture in early stages

## Trust These Instructions

**These instructions reflect the evolving nature of this repository.** The repository is transitioning from a component prototype to a full React application. Always refer to:

- **Current state guidance** for working with existing components
- **Evolution guidance** for adding new features and build systems
- **PRD** (`prd-team-skill-web-app.md`) for business requirements and feature priorities
- **Component documentation** (`README-landing-page.md`) for current implementation details

Search for additional information when:
- You need to understand specific business requirements (see PRD)
- You need detailed component usage examples (see README-landing-page.md)
- You're implementing features not covered in current documentation
- You need to set up new development tools or frameworks

**The repository architecture is intentionally evolving.** Focus on maintaining code quality and following the established patterns while preparing for the transition to a full application build system.