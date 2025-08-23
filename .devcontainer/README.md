# DevContainer for TeamSkill Demo

This directory contains the configuration for developing the TeamSkill Demo application using VS Code's DevContainer feature.

## What's Included

- Python 3.12 environment
- Node.js 20.x for frontend development
- Azure CLI for interacting with Azure services
- GitHub CLI for repository management
- Common VS Code extensions for Python and web development
- Pre-configured development settings

## Getting Started

### Prerequisites

- [VS Code](https://code.visualstudio.com/)
- [Docker](https://www.docker.com/products/docker-desktop)
- [Remote - Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) for VS Code

### Opening the Project in a Container

1. Open VS Code
2. Click on the green "><" icon in the bottom-left corner
3. Select "Reopen in Container"

VS Code will build the container and set up the development environment automatically.

### Running the Application

Once the container is running, you can start the development server with:

```bash
cd backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

The application will be available at http://localhost:8000.

## Port Forwarding

The DevContainer is configured to forward the following ports:
- 8000: Backend API (FastAPI)
- 3000: Frontend development server (standard React port)
- 5173: Frontend development server (Vite default port)

## Customizing the DevContainer

You can modify the configuration in:
- `devcontainer.json`: VS Code settings and extensions
- `docker-compose.yml`: Container orchestration
- `Dockerfile`: Base image and dependencies
