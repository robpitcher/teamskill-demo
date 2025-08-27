#!/bin/bash
# Setup script for TeamSkill Demo development environment

echo "Setting up TeamSkill Demo development environment..."

# Check Python version
echo "Checking Python version..."
python3 --version

# Create virtual environment with uv
echo "Creating Python virtual environment with uv..."
uv venv

echo "Installing dependencies with uv..."
uv sync

echo "Setup complete!"
echo ""
echo "To start the development server:"
echo "1. Activate virtual environment: source .venv/bin/activate"
echo "2. Change to backend directory: cd backend"
echo "3. Start server: uv run uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"
echo ""
echo "Application will be available at: http://localhost:8000"
