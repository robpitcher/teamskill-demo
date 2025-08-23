"""
Unit tests for template rendering functionality in TeamSkill Demo.
Tests template context handling and rendering behavior.
"""

import pytest
from fastapi.testclient import TestClient


def test_home_template_context_variables(client):
    """Test that template context variables are properly passed and rendered."""
    response = client.get("/")
    assert response.status_code == 200
    
    content = response.text
    
    # Verify template variables are rendered correctly
    assert "TeamSkill Demo" in content  # title variable
    assert "Welcome to the TeamSkill Demo Application" in content  # message variable
    assert "A secure platform for team skillset management and assessment." in content  # description variable


def test_template_includes_development_status(client):
    """Test that the template includes expected application status information."""
    response = client.get("/")
    assert response.status_code == 200
    
    content = response.text
    
    # Check for status information that should be in the template
    assert "Application Status" in content
    assert "Development" in content
    assert "0.1.0" in content  # Version
    assert "FastAPI" in content  # Framework


def test_template_includes_planned_features(client):
    """Test that the template includes the planned features section."""
    response = client.get("/")
    assert response.status_code == 200
    
    content = response.text
    
    # Check for planned features section
    assert "Planned Features" in content
    assert "Microsoft Entra ID Authentication" in content
    assert "Dynamic Assessment Forms" in content
    assert "Skill Data Visualization" in content


def test_template_responsive_structure(client):
    """Test that the template includes responsive design elements."""
    response = client.get("/")
    assert response.status_code == 200
    
    content = response.text
    
    # Check for responsive meta tag
    assert 'name="viewport"' in content
    assert 'width=device-width' in content


def test_template_footer_information(client):
    """Test that the template includes correct footer information."""
    response = client.get("/")
    assert response.status_code == 200
    
    content = response.text
    
    # Check footer content
    assert "2024 TeamSkill Demo" in content
    assert "Secure Team Skillset Management Platform" in content


def test_template_css_link_correct(client):
    """Test that the template correctly links to the CSS file."""
    response = client.get("/")
    assert response.status_code == 200
    
    content = response.text
    
    # Check CSS link is correct
    assert '<link href="/static/style.css" rel="stylesheet">' in content


def test_template_proper_html_structure(client):
    """Test that the template has proper HTML5 structure."""
    response = client.get("/")
    assert response.status_code == 200
    
    content = response.text
    
    # Check HTML5 structure
    assert "<!DOCTYPE html>" in content
    assert '<html lang="en">' in content
    assert "<head>" in content
    assert "<body>" in content
    assert '<meta charset="UTF-8">' in content


def test_template_navigation_structure(client):
    """Test that the template includes proper navigation structure."""
    response = client.get("/")
    assert response.status_code == 200
    
    content = response.text
    
    # Check navigation elements
    assert "<nav" in content
    assert "navbar" in content
    assert "nav-brand" in content


def test_template_main_content_structure(client):
    """Test that the template has proper main content structure."""
    response = client.get("/")
    assert response.status_code == 200
    
    content = response.text
    
    # Check main content structure
    assert "<main" in content
    assert "container" in content
    assert "hero" in content
    assert "status-card" in content
    assert "features-preview" in content


def test_template_context_data_integration(client):
    """Test that template context data is properly integrated in the final HTML."""
    response = client.get("/")
    assert response.status_code == 200
    
    content = response.text
    
    # Verify that all context variables are properly rendered
    # This tests the integration between route handler and template rendering
    expected_context = {
        "title": "TeamSkill Demo",
        "message": "Welcome to the TeamSkill Demo Application", 
        "description": "A secure platform for team skillset management and assessment."
    }
    
    for key, value in expected_context.items():
        assert value in content, f"Template context variable '{key}' with value '{value}' not found in rendered HTML"