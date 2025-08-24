#!/bin/bash
# Setup script for TeamSkill Demo development environment

echo "Setting up TeamSkill Demo development environment..."

# Check Python version
echo "Checking Python version..."
python3 --version

# Create and activate virtual environment
echo "Creating Python virtual environment..."
python3 -m venv venv

echo "Activating virtual environment..."
source venv/bin/activate

# Install Python dependencies
echo "Installing backend dependencies..."
cd backend
pip install -r requirements.txt

echo "Setup complete!"
echo ""
echo "To start the development server:"
echo "1. Activate virtual environment: source venv/bin/activate"
echo "2. Change to backend directory: cd backend"
echo "3. Start server: python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"
echo ""
echo "Application will be available at: http://localhost:8000"
