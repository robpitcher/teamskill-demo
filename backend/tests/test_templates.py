"""
Unit tests for template rendering functionality in TeamSkill Demo.
Tests template context handling and rendering behavior.
"""


def test_template_responsive_structure(client):
    """Test that the template includes responsive design elements."""
    response = client.get("/")
    assert response.status_code == 200

    content = response.text

    # Check for responsive meta tag
    assert 'name="viewport"' in content
    assert "width=device-width" in content


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


def test_render_template_with_context_fixture(
    render_template_with_context, sample_context
):
    """Test using the render_template_with_context utility fixture."""
    # Render the template with sample_context
    template_content = render_template_with_context()

    # Verify sample context variables are rendered
    assert sample_context["title"] in template_content
    assert sample_context["message"] in template_content
    assert sample_context["description"] in template_content

    # Test with extra context
    extra_context = {"extra_var": "Extra Value"}
    template_content = render_template_with_context(extra_context=extra_context)

    # Verify both sample context and extra context variables are rendered
    assert sample_context["title"] in template_content
    assert "Extra Value" in template_content