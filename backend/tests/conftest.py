"""
Pytest configuration and fixtures for TeamSkill Demo tests.
"""

import pytest
from fastapi.testclient import TestClient
from app.main import app


@pytest.fixture
def client():
    """
    Create a test client for the FastAPI application.
    """
    return TestClient(app)


@pytest.fixture
def sample_context():
    """
    Sample context data for template testing.
    """
    return {
        "title": "Test Title",
        "message": "Test Message",
        "description": "Test Description"
    }


@pytest.fixture
def render_template_with_context(sample_context):
    """
    Utility fixture to render a template with the sample context.
    
    Returns a function that renders a specified template with sample_context.
    """
    from fastapi import Request
    from fastapi.templating import Jinja2Templates
    import os
    
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    templates = Jinja2Templates(directory=os.path.join(BASE_DIR, "templates"))
    
    def _render(template_name="index.html", extra_context=None):
        mock_request = Request({"type": "http", "query_string": b"", "headers": []})
        context = {**sample_context, "request": mock_request}
        
        if extra_context:
            context.update(extra_context)
            
        return templates.get_template(template_name).render(context)
    
    return _render