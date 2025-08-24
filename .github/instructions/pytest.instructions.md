---
applyTo: "backend/tests/**/*.py"
---

# Pytest Instructions for TeamSkill Demo

## Overview

This document provides guidance for GitHub Copilot when working with pytest tests in the TeamSkill Demo project. It outlines key patterns, best practices, and conventions that should be followed when creating, modifying, or analyzing tests.

## Testing Architecture

The TeamSkill Demo project uses pytest as its primary testing framework, with tests organized in the `backend/tests/` directory. The main components are:

- `conftest.py`: Contains shared fixtures and test configuration
- `test_routes.py`: Tests for FastAPI route endpoints
- `test_templates.py`: Tests for template rendering functionality

## Fixtures

When working with tests, leverage these key fixtures:

- `client`: FastAPI test client for making HTTP requests to endpoints
- `sample_context`: Sample template context data for testing template rendering
- `render_template_with_context`: Utility fixture to render templates with context

## Test Patterns

### Route Testing

When writing tests for FastAPI routes:

1. **Test basic functionality first**:
   - HTTP status codes (200, 404, 405)
   - Content types (HTML, JSON, CSS)
   - Response structure

2. **Test each HTTP method separately**:
   ```python
   def test_endpoint_with_http_methods(client):
       # GET should work
       response = client.get("/endpoint")
       assert response.status_code == 200
       
       # POST should return appropriate status
       response = client.post("/endpoint", json={"key": "value"})
       assert response.status_code == 201  # Or other appropriate status
   ```

3. **Verify content and structure**:
   ```python
   def test_json_response_structure(client):
       response = client.get("/api/endpoint")
       json_data = response.json()
       
       # Check fields exist
       assert "status" in json_data
       assert "data" in json_data
       
       # Check specific values
       assert json_data["status"] == "success"
   ```

### Template Testing

For template tests:

1. **Check for required HTML elements**:
   ```python
   def test_template_structure(client):
       response = client.get("/")
       content = response.text
       
       assert "<header>" in content
       assert "<main" in content
       assert "<footer>" in content
   ```

2. **Verify context variables are rendered**:
   ```python
   def test_context_rendering(render_template_with_context):
       template_content = render_template_with_context(extra_context={"var": "value"})
       assert "value" in template_content
   ```

## Testing Conventions

### Naming

- Test files should be named `test_*.py`
- Test functions should be named `test_*`
- Names should clearly describe what is being tested:
  - `test_home_page_returns_200`
  - `test_health_check_response_structure`

### Documentation

- All test functions should have docstrings explaining what they test
- Docstrings should be clear and concise
- Complex test scenarios should include explanatory comments

### Assertions

- Use pytest's built-in assertions
- For complex comparisons, provide a failure message:
  ```python
  assert expected == actual, f"Expected {expected}, got {actual}"
  ```
- Group related assertions together

## Mocking

When mocking dependencies:

1. **Use the `monkeypatch` fixture** for function/method replacement:
   ```python
   def test_with_mock(monkeypatch):
       def mock_function(*args, **kwargs):
           return "mocked_result"
       
       monkeypatch.setattr("module.original_function", mock_function)
   ```

2. **Use `pytest.fixture` for complex mock objects**:
   ```python
   @pytest.fixture
   def mock_database():
       # Create mock database
       return MockDatabase()
   ```

## Test Isolation

- Each test should be independent and not rely on other tests
- Use fixtures for setup and teardown
- Avoid global state changes that affect other tests
- Reset any modified app state after testing:
  ```python
  # Backup original state
  original_state = app.state.copy()
  
  try:
      # Test with modified state
      app.state.value = "test"
      # ... test code ...
  
  finally:
      # Restore original state
      app.state = original_state
  ```

## Testing New Features

When adding new features to the application:

1. Write tests before implementing the feature (TDD approach)
2. Test both success and error cases
3. Cover edge cases and boundary conditions
4. Test for proper error handling and validation

## Running Tests

Tests should be run from the `backend` directory:

```bash
# Run all tests
python -m pytest tests/ -v

# Run specific test file
python -m pytest tests/test_routes.py -v

# Run specific test
python -m pytest tests/test_routes.py::test_home_page_returns_200 -v
```

## Test Debugging

For debugging failing tests:

```bash
# Show print output
python -m pytest tests/ -v -s

# Show local variables in traceback
python -m pytest tests/ --tb=long -v

# Drop into debugger on failure
python -m pytest tests/ --pdb
```

## Test Coverage

Aim for high test coverage, but prioritize testing critical paths:

1. Authentication and authorization flows
2. Data processing logic
3. API endpoints
4. Template rendering with different contexts

## Continuous Integration

Tests are automatically run in GitHub Actions on pull requests. Ensure all tests pass locally before pushing changes.