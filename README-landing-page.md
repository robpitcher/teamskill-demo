# Landing Page Prototype - Team Skill Web App

This document explains how to use and integrate the Team Skill Web App landing page prototype.

## Overview

The `LandingPage.jsx` component is a professional, accessible React functional component designed to serve as the entry point for the Team Skill Web App. It features a modern design with clear calls-to-action and is ready for integration into a React application.

## Features

### 🎨 Design & Accessibility
- **Modern Design**: Clean, professional interface with gradient backgrounds and subtle animations
- **Fully Accessible**: WCAG 2.1 AA compliant with proper ARIA labels and semantic HTML
- **Responsive**: Mobile-first design that works on all screen sizes
- **No External Dependencies**: Includes inline styles to minimize dependencies

### 🚀 Key Components
- **Navigation Header**: Clean navigation with brand logo
- **Hero Section**: Compelling title, tagline, and main call-to-action buttons
- **Feature Cards**: Three key features with icons and descriptions
- **Footer**: Simple footer with branding

### 🔗 Call-to-Action Buttons
1. **"Start Your Self-Assessment"** - Routes to `/self-assessment`
2. **"View Team Heatmap"** - Routes to `/login?role=manager`

## Usage

### Quick Start

```jsx
import React from 'react';
import LandingPage from './src/pages/LandingPage';

function App() {
  return (
    <div className="App">
      <LandingPage />
    </div>
  );
}

export default App;
```

### Integration with React Router

For a complete application with routing, integrate with React Router:

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './src/pages/LandingPage';
import SelfAssessment from './src/pages/SelfAssessment';
import Login from './src/pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/self-assessment" element={<SelfAssessment />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
```

### Customizing Navigation

To use React Router's `useNavigate` instead of `window.location.href`, update the button handlers:

```jsx
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    navigate('/self-assessment');
  };

  const handleViewHeatmap = () => {
    navigate('/login?role=manager');
  };

  // ... rest of component
};
```

## File Structure

```
src/
└── pages/
    └── LandingPage.jsx    # Main landing page component
```

## Styling Approach

The component uses inline styles with the `jsx` styled-jsx syntax for:
- **Zero Dependencies**: No need for external CSS frameworks
- **Component Isolation**: Styles are scoped to the component
- **Easy Customization**: Modify styles directly in the component
- **Server-Side Rendering**: Compatible with SSR frameworks

### Customizing Styles

To customize the appearance, modify the `<style jsx>` block at the bottom of the component:

```jsx
<style jsx>{`
  .landing-page {
    /* Customize main container */
  }
  
  .hero-section {
    /* Customize hero background, colors */
    background: linear-gradient(135deg, #your-color 0%, #your-color-2 100%);
  }
  
  .cta-button {
    /* Customize button appearance */
  }
`}</style>
```

## Accessibility Features

The component includes comprehensive accessibility features:

- **Semantic HTML**: Proper use of `nav`, `main`, `footer` elements
- **ARIA Labels**: Navigation and button groups have appropriate labels
- **Descriptive Text**: Buttons include descriptions for screen readers
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Focus Indicators**: Clear focus outlines for keyboard users
- **Color Contrast**: Meets WCAG AA standards for color contrast

## Responsive Design

The design adapts to different screen sizes:

- **Desktop (1200px+)**: Full-width layout with three-column feature grid
- **Tablet (768px-1199px)**: Responsive grid and adjusted font sizes
- **Mobile (480px-767px)**: Single-column layout, optimized touch targets
- **Small Mobile (<480px)**: Compact design with smaller elements

## Browser Support

Compatible with modern browsers:
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Performance Considerations

- **Minimal JavaScript**: Uses React hooks efficiently
- **Inline Styles**: Eliminates additional CSS file requests
- **Optimized Images**: Uses emoji for icons (no image files)
- **Lazy Loading Ready**: Can be easily adapted for code splitting

## Testing

### Manual Testing Checklist

- [ ] Page loads without errors
- [ ] Both CTA buttons are clickable
- [ ] Buttons navigate to correct URLs
- [ ] Design is responsive on mobile/tablet/desktop
- [ ] Accessibility features work with screen readers
- [ ] Keyboard navigation works for all interactive elements

### Automated Testing Example

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import LandingPage from './LandingPage';

test('renders landing page with correct title', () => {
  render(<LandingPage />);
  expect(screen.getByText('Unlock Your Team\'s Potential')).toBeInTheDocument();
});

test('self-assessment button navigates correctly', () => {
  // Mock window.location
  delete window.location;
  window.location = { href: '' };
  
  render(<LandingPage />);
  fireEvent.click(screen.getByText('Start Your Self-Assessment'));
  expect(window.location.href).toBe('/self-assessment');
});
```

## Integration Examples

### With Next.js

```jsx
// pages/index.js
import LandingPage from '../src/pages/LandingPage';

export default function Home() {
  return <LandingPage />;
}
```

### With Create React App

```jsx
// src/App.js
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <div className="App">
      <LandingPage />
    </div>
  );
}

export default App;
```

### With Vite

```jsx
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import LandingPage from './pages/LandingPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>
);
```

## Development Workflow

1. **Clone/Copy**: Copy the `LandingPage.jsx` file to your project
2. **Install React**: Ensure React 16.8+ is installed for hooks support
3. **Import**: Import the component into your application
4. **Customize**: Modify styles, text, or functionality as needed
5. **Test**: Verify accessibility and responsiveness
6. **Deploy**: Deploy with your preferred React hosting solution

## Next Steps

After integrating the landing page:

1. **Create Assessment Page**: Build the self-assessment flow (`/self-assessment`)
2. **Create Login Page**: Build the login/authentication system (`/login`)
3. **Add Routing**: Implement React Router for navigation
4. **Connect Backend**: Integrate with your API endpoints
5. **Add Analytics**: Track user interactions and conversions
6. **Performance Optimization**: Implement code splitting and lazy loading

## Support

For questions or issues with the landing page prototype:
- Review the component code for implementation details
- Check browser console for any JavaScript errors
- Verify React version compatibility (16.8+)
- Test accessibility with screen reader tools

---

**Note**: This is a prototype component designed to be integrated into a larger React application. The navigation currently uses `window.location.href` but should be updated to use React Router's `useNavigate` hook in a production application.