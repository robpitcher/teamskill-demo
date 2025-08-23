"""
TeamSkill Demo - Main FastAPI Application
A minimal web application for team skillset management.
"""

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import os

# Initialize FastAPI app
app = FastAPI(
    title="TeamSkill Demo",
    description="A secure web application for storing, managing, and visualizing team members' skillsets",
    version="0.1.0"
)

# Get the directory where this file is located
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Mount static files
app.mount("/static", StaticFiles(directory=os.path.join(BASE_DIR, "static")), name="static")

# Setup templates
templates = Jinja2Templates(directory=os.path.join(BASE_DIR, "templates"))


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    """
    Home page route - displays welcome message and basic app information.
    """
    return templates.TemplateResponse("index.html", {
        "request": request,
        "title": "TeamSkill Demo",
        "message": "Welcome to the TeamSkill Demo Application",
        "description": "A secure platform for team skillset management and assessment."
    })


@app.get("/health")
async def health_check():
    """
    Health check endpoint for monitoring and deployment verification.
    """
    return {"status": "healthy", "service": "teamskill-demo"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)