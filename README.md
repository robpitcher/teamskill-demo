# TeamSkill Demo - MVP

A minimum viable product for the Team Skill Web Application. This MVP provides a fully buildable React application with a professional landing page showcasing the core features planned for the complete platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (tested with v20.19.4)
- npm 10+ (tested with v10.8.2)

### Installation & Running

1. **Clone and install dependencies:**
   ```bash
   git clone https://github.com/robpitcher/teamskill-demo.git
   cd teamskill-demo
   npm install
   ```

2. **Start development server:**
   ```bash
   npm start
   ```
   
   The application will open at [http://localhost:3000](http://localhost:3000)

3. **Build for production:**
   ```bash
   npm run build
   ```
   
   Creates optimized production build in the `build/` directory.

4. **Run tests:**
   ```bash
   npm test
   ```

## 📱 MVP Features

This MVP includes:

✅ **Fully buildable React application** with modern development workflow  
✅ **Professional landing page** with responsive design  
✅ **Accessible design** (WCAG 2.1 AA compliant)  
✅ **Call-to-action buttons** with navigation functionality  
✅ **Feature showcase** highlighting planned capabilities  
✅ **Mobile-responsive design** optimized for all devices  

### Current Navigation
- **"Start Your Self-Assessment"** → Routes to `/self-assessment`
- **"View Team Heatmap"** → Routes to `/login?role=manager`

*Note: These routes currently show the landing page as placeholder content. Future development will implement the actual assessment and dashboard features.*

## 🏗️ MVP Architecture

- **Framework:** React 18.2.0
- **Build System:** Create React App (react-scripts)
- **Styling:** Standard CSS with responsive design
- **State Management:** React hooks (functional components)
- **Accessibility:** Semantic HTML with ARIA labels

## 🎯 What's NOT in the MVP

As specified in the requirements, the following features are **intentionally excluded** from this MVP:

❌ Authentication system  
❌ Self-assessment functionality  
❌ Team heatmap dashboard  
❌ User management  
❌ Data persistence  
❌ API integration  

These features are planned for future development phases as outlined in the [Product Requirements Document](prd-team-skill-web-app.md).

## 📂 Project Structure

```
teamskill-demo/
├── public/
│   ├── index.html          # HTML template
│   └── manifest.json       # PWA manifest
├── src/
│   ├── pages/
│   │   ├── LandingPage.jsx  # Main landing page component
│   │   └── LandingPage.css  # Landing page styles
│   ├── App.js              # Root application component
│   ├── App.css             # Application styles
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## 🧪 Testing the MVP

### Manual Testing Checklist

1. **Application Startup:**
   - [ ] `npm install` completes without errors
   - [ ] `npm start` launches development server successfully
   - [ ] Application loads at http://localhost:3000

2. **Build Process:**
   - [ ] `npm run build` creates production build successfully
   - [ ] Build outputs to `build/` directory

3. **User Interface:**
   - [ ] Landing page displays with proper styling
   - [ ] Both CTA buttons are clickable and functional
   - [ ] Navigation URLs change correctly (/self-assessment and /login?role=manager)
   - [ ] Responsive design works on mobile and desktop
   - [ ] All text is readable and accessible

4. **Browser Compatibility:**
   - [ ] Works in Chrome, Firefox, Safari
   - [ ] No console errors in developer tools

## 🔄 Development Workflow

### Making Changes
```bash
# Start development server with hot reload
npm start

# Make your changes to components in src/

# Build and test
npm run build
npm test
```

### Adding New Features
Future development should extend this MVP by:
1. Adding React Router for proper routing
2. Creating authentication components
3. Building assessment and dashboard pages
4. Integrating with backend APIs

## 📋 Next Steps

This MVP establishes the foundation for the complete Team Skill Web Application. Future development phases should implement:

1. **Phase 2:** User authentication and role-based access
2. **Phase 3:** Self-assessment functionality  
3. **Phase 4:** Team heatmap dashboard
4. **Phase 5:** Analytics and reporting features

See the [Product Requirements Document](prd-team-skill-web-app.md) for detailed feature specifications.

## 📝 Documentation

- [Landing Page Component Documentation](README-landing-page.md)
- [Product Requirements Document](prd-team-skill-web-app.md)

## 🐛 Troubleshooting

### Common Issues

**Build fails:** Ensure Node.js 18+ and npm 10+ are installed  
**Port 3000 in use:** Kill existing processes or use `npm start -- --port 3001`  
**Dependency issues:** Delete `node_modules/` and `package-lock.json`, then run `npm install`

### Getting Help

For issues with this MVP:
1. Check the console for error messages
2. Verify all dependencies are installed correctly
3. Ensure you're using compatible Node.js/npm versions