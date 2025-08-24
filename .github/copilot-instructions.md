# Copilot Instructions for TeamSkill Demo Repository

## Repository Overview

This repository contains a **Team Member Skillset Datastore Web App** - a secure web application for storing, managing, and visualizing team members' skillsets and strengths. The project is currently in early development stages.

### Project Purpose
- Allow team members to complete self-assessment forms based on dynamically uploaded assessments
- Enable team leaders to view aggregated skill data and generate reports
- Secure authentication via Microsoft Entra ID (Azure AD)
- Host on Azure platform with modern web technologies

### Repository Size & Current State
- **Size**: Small (~10 files), early development stage
- **Type**: Full-stack web application (planned)
- **Languages**: Python (backend), JavaScript/TypeScript (frontend planned)
- **Target Users**: ~50-100 team members and managers

## Technical Stack & Architecture

### Current Tech Stack
- **Backend**: Python with FastAPI or Flask (to be implemented)
- **Frontend**: React.js (planned, not yet implemented)
- **Database**: Azure SQL or Cosmos DB (planned)
- **Authentication**: Microsoft Entra ID (OAuth2/OpenID Connect)
- **Storage**: Azure Blob Storage for assessment uploads
- **Hosting**: Azure App Service or Static Web Apps
- **Testing**: Playwright MCP server configuration planned

### Runtime Versions
- **Python**: 3.12+ recommended
- **Node.js**: 20.x+ for frontend development
- **npm**: 10.x+ for package management

## Build and Development Instructions

### Prerequisites
Since this is an early-stage project, most build infrastructure is not yet implemented. The following instructions prepare for future development:

#### Python Backend Setup (When Implemented)
```bash
# Always create and activate virtual environment first
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies (when requirements.txt exists)
pip install -r requirements.txt

# For FastAPI development
pip install fastapi uvicorn

# Run development server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend Setup (When Implemented)
```bash
# Navigate to frontend directory (when created)
cd frontend/

# Always install dependencies before building
npm install

# Development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

### Project Structure (Planned)

```
teamskill-demo/
├── .github/                    # GitHub configuration
│   ├── workflows/             # CI/CD pipelines (to be added)
│   └── copilot-instructions.md # This file
├── backend/                   # Python FastAPI application (to be created)
│   ├── app/                   # Application code
│   ├── tests/                 # Backend tests
│   ├── requirements.txt       # Python dependencies
│   └── main.py               # Application entry point
├── frontend/                  # React application (to be created)
│   ├── src/                   # Source code
│   ├── public/               # Static assets
│   ├── package.json          # Node.js dependencies
│   └── vite.config.js        # Build configuration
├── docs/                      # Documentation
│   └── prd.md                # Product Requirements Document
├── .gitignore                # Git ignore rules
├── README.md                 # Project documentation
└── ISSUES.md                 # Current project issues
```

## Validation and Testing

### IMPORTANT: Mega Linter Validation

**After making ANY code changes, you MUST run Mega Linter and fix all reported issues:**

```bash
# Run Mega Linter locally
npx mega-linter-runner --flavor cupcake

# Or using Docker (recommended)
docker run --rm -v $(pwd):/tmp/lint oxsecurity/megalinter:v8

# Or if you have a GitHub Actions workflow
act -j megalinter
```

**Critical Requirements:**
1. **Always** run Mega Linter after making changes
2. **Always** review the Mega Linter report in `megalinter-reports/megalinter-report.html`
3. **Always** fix ALL errors and failures before considering changes complete
4. **Always** fix as many warnings as practical
5. If Mega Linter reports failures, you MUST:
   - Read the specific error messages
   - Apply the suggested fixes
   - Re-run Mega Linter to verify fixes
   - Repeat until all errors are resolved

### Mega Linter Configuration
If `.mega-linter.yml` exists in the repository, respect its configuration. Common linters include:
- **Python**: black, flake8, pylint, mypy, bandit
- **JavaScript/TypeScript**: eslint, prettier
- **Markdown**: markdownlint
- **YAML**: yamllint
- **JSON**: jsonlint
- **Dockerfile**: hadolint
- **Security**: gitleaks, secretlint

### Current Validation Steps
1. **Documentation Review**: Ensure changes align with PRD requirements in `docs/prd.md`
2. **Git Status**: Check `git status` before making changes
3. **File Structure**: Maintain organized structure per .gitignore expectations
4. **Mega Linter**: Run and resolve all issues

### Future Validation (When Implemented)
1. **Python Linting**: Will use `black`, `flake8`, `mypy`
2. **Frontend Linting**: Will use `eslint`, `prettier`
3. **Testing**: Pytest for backend, Jest/Testing Library for frontend
4. **CI/CD**: GitHub Actions workflows (to be implemented)

### Build Commands (When Implemented)
```bash
# Backend validation
cd backend/
python -m pytest tests/
black --check .
flake8 .
mypy .

# Frontend validation
cd frontend/
npm run lint
npm run test
npm run build

# ALWAYS run Mega Linter last
cd ..  # Return to project root
npx mega-linter-runner --flavor cupcake
```

## Key Development Guidelines

### Code Changes
- **Always** check the current project state before making changes - this is an early-stage project
- **Always** create appropriate directory structure if implementing new components
- **Always** follow the planned architecture in the PRD document
- **Always** update documentation when adding new features
- **Always** run Mega Linter and fix all issues before finalizing changes

### Common Pitfalls to Avoid
1. **Missing Dependencies**: Always run `pip install -r requirements.txt` before Python development
2. **Node Modules**: Always run `npm install` before frontend development
3. **Virtual Environment**: Always activate Python virtual environment before backend work
4. **Port Conflicts**: Backend typically runs on port 8000, frontend on 3000/5173
5. **Linting Failures**: Never skip Mega Linter validation

### Security Considerations
- **Never** commit secrets or API keys
- **Always** use environment variables for configuration
- **Always** validate user inputs
- **Always** implement proper authentication checks
- **Always** fix security issues flagged by Mega Linter

## Architecture Details

### Authentication Flow (Planned)
1. User authenticates via Microsoft Entra ID
2. JWT tokens used for API authorization
3. Role-based access control (User, Admin/Lead)

### Database Schema (Planned)
- Users table with Entra ID integration
- Assessments table for dynamic question sets
- Responses table for user assessment data
- Audit tables for compliance tracking

### API Structure (Planned)
- RESTful APIs with FastAPI
- OpenAPI/Swagger documentation
- Secure endpoints with proper authorization
- File upload endpoints for assessment management

## Troubleshooting

### Common Issues
1. **Import Errors**: Ensure virtual environment is activated and dependencies installed
2. **Port Already in Use**: Kill existing processes or use different ports
3. **Permission Errors**: Check file permissions and virtual environment setup
4. **Build Failures**: Ensure all dependencies are installed and up to date
5. **Mega Linter Failures**: Review the HTML report and fix each issue systematically

### Mega Linter Troubleshooting
- **Docker Issues**: Ensure Docker is running if using Docker-based Mega Linter
- **Permission Errors**: Run with appropriate permissions or use sudo (carefully)
- **Configuration Conflicts**: Check `.mega-linter.yml` for custom rules
- **False Positives**: Add justified exceptions to `.mega-linter.yml` with clear comments

### Environment Setup Issues
- **Python Version**: Ensure Python 3.12+ is available
- **Node Version**: Ensure Node.js 20+ for optimal compatibility
- **Virtual Environment**: Always use isolated Python environments

## Additional Notes

### MCP Servers
Check for and be sure to use MCP servers configured in `.vscode\mcp.json`

### Playwright MCP Server Configuration
The project includes planned Playwright MCP server configuration for testing. This will be documented in the main README when implemented.

### Azure Integration
Future Azure services integration will include:
- Azure App Service for hosting
- Azure SQL/Cosmos DB for data storage
- Azure Blob Storage for file uploads
- Azure Monitor for logging and diagnostics

### Performance Considerations
- Target: ~100 concurrent users
- Fast response times for all operations
- Efficient database queries for skill aggregation
- Responsive design for desktop/tablet/mobile

### Code Quality Standards
All code must pass Mega Linter validation before being considered complete. This includes:
- Proper formatting and style
- No security vulnerabilities
- Documentation compliance
- Best practices adherence

---

**Important**: This repository is in early development. Many features described are planned but not yet implemented. Always check the current state of files and directories before making assumptions about available functionality. Always run Mega Linter after any changes and resolve all issues.