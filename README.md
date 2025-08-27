# TeamSkill Demo

A secure web application for storing, managing, and visualizing team members' skillsets and strengths. This application allows team members to complete self-assessment forms and enables team leaders to view aggregated skill data.

## Features (Planned)

- 🔐 **Microsoft Entra ID Authentication** - Secure single sign-on
- 📋 **Dynamic Assessment Forms** - Admin-uploaded skill assessments
- 📊 **Skill Data Visualization** - Individual and team skill dashboards
- 👥 **Team Management** - Role-based access control
- ☁️ **Azure Integration** - Cloud-hosted with Azure services
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices

## Quick Start

### Prerequisites

- Python 3.12+
- uv (Python package manager)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/robpitcher/teamskill-demo.git
   cd teamskill-demo
   ```

2. **Create Python virtual environment**
   ```bash
   uv venv
   ```

3. **Automated Setup (Linux/macOS)**
   ```bash
   # Make the setup script executable
   chmod +x setup.sh
   
   # Run the setup script
   ./setup.sh
   ```

4. **Manual Setup**
   ```bash
   # Install Python dependencies
   uv sync
   ```

5. **Start the development server**
   ```bash
   cd backend
   uv run uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

6. **Access the application**
   - Open your browser to: <http://localhost:8000>
   - Health check endpoint: <http://localhost:8000/health>

## Project Structure

```
teamskill-demo/
├── backend/                   # Python FastAPI application
│   ├── app/                   # Application code
│   │   ├── __init__.py
│   │   └── main.py           # FastAPI app with routes
│   ├── static/               # CSS, JS, images
│   │   └── style.css         # Application styling
│   ├── templates/            # Jinja2 HTML templates
│   │   └── index.html        # Home page template
│   └── tests/                # Test suite
├── docs/                     # Documentation
│   └── prd.md                # Product Requirements Document
├── frontend/                 # React frontend (placeholder)
│   └── README.md             # Frontend documentation
├── pyproject.toml            # Python project configuration and dependencies
├── uv.lock                   # Dependency lock file for reproducible builds
├── setup.sh                  # Setup automation script
└── README.md                 # This file
```

## API Endpoints

| Endpoint  | Method | Description                    |
|-----------|--------|--------------------------------|
| `/`       | GET    | Home page with welcome message |
| `/health` | GET    | Health check for monitoring    |

## Development

### Backend Development

The backend uses FastAPI with the following key components:
- **FastAPI**: Modern ASGI web framework for building APIs
- **Uvicorn**: ASGI server for development and production
- **Jinja2**: Template engine for HTML rendering (temporary until React frontend)
- **Static files**: CSS styling for the basic UI

### Template Development

Templates are located in `backend/templates/` and use Jinja2 syntax:

```html
<h1>{{ title }}</h1>
<p>{{ description }}</p>
```

### Adding New Routes

```python
@app.get("/new-endpoint")
async def new_endpoint():
    return {"message": "Hello from new endpoint"}
```

## Dependencies

Current backend dependencies:
- fastapi==0.104.1
- uvicorn==0.24.0
- jinja2==3.1.2
- python-multipart==0.0.6

## Testing

The project includes comprehensive unit tests for all existing functionality.

### Running Tests

```bash
cd backend
uv run python -m pytest tests/ -v
```

### Test Coverage

Current tests cover:
- ✅ **Route endpoints**: Home page (`/`) and health check (`/health`)
- ✅ **Static file serving**: CSS files and error handling
- ✅ **Template rendering**: Context variables and HTML structure
- ✅ **HTTP methods**: Proper method validation and error responses

For detailed testing documentation, see [`backend/tests/README.md`](backend/tests/README.md).

### Continuous Integration

GitHub Actions automatically runs all tests on pull requests to the main branch. The CI workflow:
- Sets up Python 3.12 environment
- Installs dependencies
- Runs pytest with verbose output
- Fails if any tests fail

## Code Quality & Linting

The project uses MegaLinter to ensure code quality and consistency across Python, HTML, and CSS files.

### Linting Standards

MegaLinter automatically runs on all pull requests to the main branch.


### Running Linter Locally

To run MegaLinter locally using Docker:

```bash
# Run MegaLinter on all files
docker run --rm -v $(pwd):/tmp/lint oxsecurity/megalinter:v7

# Run MegaLinter on changed files only (faster)
docker run --rm -v $(pwd):/tmp/lint oxsecurity/megalinter:v7 --env VALIDATE_ALL_CODEBASE=false
```

### Linter Configuration

The linting configuration is defined in `.mega-linter.yml` in the repository root. The configuration:
- Runs all linters
- Applys some fixes automatically

For more information about MegaLinter, visit the [official documentation](https://megalinter.github.io/).

## Future Plans

### Frontend Development

The frontend is planned to be built with:
- **React.js**: Modern UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool
- **Azure Static Web Apps**: Hosting platform

Refer to `frontend/README.md` for more details on the planned frontend implementation.

## Deployment

### Local Development
- Backend: <http://localhost:8000>

### Future Azure Deployment
This application is designed for Azure hosting:
- **Azure App Service**: For backend hosting
- **Azure Static Web Apps**: For React frontend hosting
- **Azure SQL/Cosmos DB**: For data storage
- **Azure Blob Storage**: For assessment file uploads
- **Microsoft Entra ID**: For secure authentication
- **Azure Monitor/App Insights**: For logging and diagnostics

## Environment Variables

The following environment variables will be used in future versions:

| Variable                          | Description                   | Default                 |
|-----------------------------------|-------------------------------|-------------------------|
| `TEAMSKILL_BASE_URL`              | Base URL for the application  | `http://localhost:8000` |
| `AZURE_STORAGE_CONNECTION_STRING` | Azure Blob Storage connection | Not set                 |
| `AZURE_DB_CONNECTION_STRING`      | Database connection string    | Not set                 |

## Contributing

1. Ensure Python virtual environment is activated
2. Install dependencies: `uv sync`
3. Run the development server: `uv run uvicorn app.main:app --reload`
4. Make your changes
5. Update documentation as needed

## Security Notes

- Authentication not implemented yet (planned: Microsoft Entra ID)
- No sensitive data storage in current version
- Future versions will include proper RBAC and data encryption

## License

This project is for demonstration purposes.

---

**Current Status**: 🚧 Early Development - Basic scaffold implemented

Last Updated: August 23, 2025

For detailed requirements and planned features, see [Product Requirements Document](docs/prd.md).