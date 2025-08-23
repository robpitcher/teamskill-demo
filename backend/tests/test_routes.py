"""
Unit tests for FastAPI routes in TeamSkill Demo application.
Tests the home page, health check, and static file functionality.
"""

import pytest
from fastapi.testclient import TestClient
from app.main import app


def test_home_page_returns_200(client):
    """Test that the home page returns HTTP 200 status code."""
    response = client.get("/")
    assert response.status_code == 200


def test_home_page_content_type(client):
    """Test that the home page returns HTML content."""
    response = client.get("/")
    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]


def test_home_page_template_structure(client):
    """Test that the home page has the expected HTML structure."""
    response = client.get("/")
    assert response.status_code == 200
    
    content = response.text
    
    # Check for key HTML elements
    assert "<header>" in content
    assert "<main" in content
    assert "<footer>" in content
    assert '<link href="/static/style.css"' in content


def test_health_check_returns_200(client):
    """Test that the health check endpoint returns HTTP 200 status code."""
    response = client.get("/health")
    assert response.status_code == 200


def test_health_check_content_type(client):
    """Test that the health check endpoint returns JSON content."""
    response = client.get("/health")
    assert response.status_code == 200
    assert "application/json" in response.headers["content-type"]


def test_health_check_response_structure(client):
    """Test that the health check endpoint returns the correct JSON structure."""
    response = client.get("/health")
    assert response.status_code == 200
    
    json_data = response.json()
    
    # Check required fields exist
    assert "status" in json_data
    assert "service" in json_data
    
    # Check correct values
    assert json_data["status"] == "healthy"
    assert json_data["service"] == "teamskill-demo"


def test_static_css_file_accessible(client):
    """Test that static CSS files are properly served."""
    response = client.get("/static/style.css")
    assert response.status_code == 200
    assert "text/css" in response.headers["content-type"]


def test_static_css_file_contains_expected_content(client):
    """Test that the CSS file contains expected styling rules."""
    response = client.get("/static/style.css")
    assert response.status_code == 200
    
    content = response.text
    
    # Check for some key CSS rules that should be in the file
    assert "TeamSkill Demo" in content or "body" in content
    assert "{" in content and "}" in content  # Basic CSS structure


def test_static_nonexistent_file_returns_404(client):
    """Test that requesting a non-existent static file returns 404."""
    response = client.get("/static/nonexistent.css")
    assert response.status_code == 404


def test_nonexistent_route_returns_404(client):
    """Test that requesting a non-existent route returns 404."""
    response = client.get("/nonexistent-route")
    assert response.status_code == 404


def test_home_page_with_different_http_methods(client):
    """Test that the home page only responds to GET requests."""
    # GET should work
    response = client.get("/")
    assert response.status_code == 200
    
    # POST should return 405 (Method Not Allowed)
    response = client.post("/")
    assert response.status_code == 405
    
    # PUT should return 405 (Method Not Allowed)
    response = client.put("/")
    assert response.status_code == 405


def test_health_check_with_different_http_methods(client):
    """Test that the health check endpoint only responds to GET requests."""
    # GET should work
    response = client.get("/health")
    assert response.status_code == 200
    
    # POST should return 405 (Method Not Allowed)
    response = client.post("/health")
    assert response.status_code == 405


def test_mock_home_with_sample_context(client, sample_context, monkeypatch):
    """Test a mock version of the home route with sample context data."""
    from fastapi import Request
    from fastapi.responses import HTMLResponse
    from app.main import templates
    
    # Create a mock route function that uses the sample_context
    async def mock_home(request: Request):
        return templates.TemplateResponse("index.html", {
            "request": request,
            **sample_context
        })
    
    # Apply the mock to the FastAPI app
    monkeypatch.setattr(app, "routes", [])
    app.get("/")(mock_home)
    
    # Test the mock route
    response = client.get("/")
    assert response.status_code == 200
    
    content = response.text
    
    # Verify the sample context values are used
    assert sample_context["title"] in content
    assert sample_context["message"] in content
    assert sample_context["description"] in content