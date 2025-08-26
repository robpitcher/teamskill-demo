"""
Pytest configuration and fixtures for TeamSkill Demo tests.
"""

import os

import pytest
from app.main import app
from fastapi import Request
from fastapi.templating import Jinja2Templates
from fastapi.testclient import TestClient


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
        "description": "Test Description",
    }


@pytest.fixture
def render_template_with_context(sample_context):
    """
    Utility fixture to render a template with the sample context.

    Returns a function that renders a specified template with sample_context.
    """

    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    templates = Jinja2Templates(directory=os.path.join(BASE_DIR, "templates"))

    def _render(template_name="index.html", extra_context=None):
        # Create a mock request object
        mock_request = Request({"type": "http", "query_string": b"", "headers": []})

        # Create the context with sample data and request
        context = {**sample_context, "request": mock_request}

        # Update with any extra context
        if extra_context:
            context.update(extra_context)

        # Instead of using get_template directly, use TemplateResponse to
        # ensure context variables are properly processed
        response = templates.TemplateResponse(template_name, context)
        return response.body.decode()

    return _render
