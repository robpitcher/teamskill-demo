"""
Unit tests for FastAPI routes in TeamSkill Demo application.
Tests the home page, health check, and static file functionality.
"""

import pytest
from fastapi.testclient import TestClient


def test_home_page_returns_200(client):
    """Test that the home page returns HTTP 200 status code."""
    response = client.get("/")
    assert response.status_code == 200


def test_home_page_content_type(client):
    """Test that the home page returns HTML content."""
    response = client.get("/")
    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]


def test_home_page_contains_expected_content(client):
    """Test that the home page contains expected content from template context."""
    response = client.get("/")
    assert response.status_code == 200
    
    content = response.text
    
    # Check for template context values
    assert "TeamSkill Demo" in content
    assert "Welcome to the TeamSkill Demo Application" in content
    assert "A secure platform for team skillset management and assessment." in content
    
    # Check for basic HTML structure
    assert "<!DOCTYPE html>" in content
    assert "<html" in content
    assert "<title>TeamSkill Demo</title>" in content


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