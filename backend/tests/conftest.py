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