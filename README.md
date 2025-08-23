# TeamSkill Demo

A secure web application for storing, managing, and visualizing team members' skillsets and strengths. This application allows team members to complete self-assessment forms and enables team leaders to view aggregated skill data.

## Features (Planned)

- 🔐 **Microsoft Entra ID Authentication** - Secure single sign-on
- 📋 **Dynamic Assessment Forms** - Admin-uploaded skill assessments
- 📊 **Skill Data Visualization** - Individual and team skill dashboards
- 👥 **Team Management** - Role-based access control
- ☁️ **Azure Integration** - Cloud-hosted with Azure services

## Quick Start

### Prerequisites

- Python 3.12+
- pip (Python package manager)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/robpitcher/teamskill-demo.git
   cd teamskill-demo
   ```

2. **Create and activate Python virtual environment**
   ```bash
   python3 -m venv venv

   # On macOS/Linux:
   source venv/bin/activate

   # On Windows:
   venv\Scripts\activate
   ```

3. **Install Python dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. **Run the development server**
   ```bash
   # From the backend directory
   python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

   # Alternative method:
   python app/main.py
   ```

5. **Access the application**
   - Open your browser to: http://localhost:8000
   - Health check endpoint: http://localhost:8000/health

## Project Structure

```
teamskill-demo/
├── backend/                   # Python FastAPI application
│   ├── app/                   # Application code
│   │   ├── __init__.py
│   │   └── main.py           # FastAPI app with routes
│   ├── static/               # CSS, JS, images
│   ├── templates/            # Jinja2 HTML templates
│   ├── tests/                # Backend tests (placeholder)
│   └── requirements.txt      # Python dependencies
├── docs/                     # Documentation
│   └── prd.md               # Product Requirements Document
└── README.md                # This file
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Home page with welcome message |
| `/health` | GET | Health check for monitoring |

## Development

### Backend Development

The backend uses FastAPI with the following key components:
- **FastAPI**: Modern ASGI web framework
- **Uvicorn**: ASGI server for development and production
- **Jinja2**: Template engine for HTML rendering
- **Static files**: CSS and future JavaScript assets

### Adding New Routes

```python
@app.get("/new-endpoint")
async def new_endpoint():
    return {"message": "Hello from new endpoint"}
```

### Template Development

Templates are located in `backend/templates/` and use Jinja2 syntax:

```html
<h1>{{ title }}</h1>
<p>{{ description }}</p>
```

## Testing

### Running Backend Tests

```bash
cd backend
python -m pytest tests/  # When tests are added
```

## Deployment

### Local Development
- Backend: http://localhost:8000

### Future Azure Deployment
This application is designed for Azure hosting:
- **Azure App Service** for backend hosting
- **Azure SQL/Cosmos DB** for data storage
- **Azure Blob Storage** for file uploads
- **Microsoft Entra ID** for authentication

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `TEAMSKILL_BASE_URL` | Base URL for the application | `http://localhost:8000` |

## Contributing

1. Ensure Python virtual environment is activated
2. Install dependencies: `pip install -r backend/requirements.txt`
3. Run the development server: `uvicorn app.main:app --reload`
4. Make your changes

## Security Notes

- Authentication not implemented yet (planned: Microsoft Entra ID)
- No sensitive data storage in current version
- Future versions will include proper RBAC and data encryption

## License

This project is for demonstration purposes.

---

**Current Status**: 🚧 Early Development - Basic scaffold implemented

For detailed requirements and planned features, see [Product Requirements Document](docs/prd.md).