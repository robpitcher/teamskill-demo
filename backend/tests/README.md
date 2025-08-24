# Testing Documentation

## Overview

This document describes how to run the unit tests for the TeamSkill Demo FastAPI application.

## Test Framework

The project uses **pytest** as the testing framework with the following dependencies:
- `pytest==7.4.3` - Main testing framework
- `pytest-asyncio==0.21.1` - Support for async tests
- `httpx==0.25.2` - HTTP client for testing FastAPI endpoints

## Test Structure

Tests are organized in the `backend/tests/` directory:

```
backend/tests/
├── __init__.py          # Package initialization
├── conftest.py          # Pytest fixtures and configuration
├── test_routes.py       # Tests for FastAPI route endpoints
└── test_templates.py    # Tests for template rendering functionality
```

## Running Tests

### Prerequisites

1. Ensure you're in the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Running All Tests

```bash
python -m pytest tests/ -v
```

### Running Specific Test Files

```bash
# Test only routes
python -m pytest tests/test_routes.py -v

# Test only templates
python -m pytest tests/test_templates.py -v
```

### Running Specific Tests

```bash
# Run a specific test function
python -m pytest tests/test_routes.py::test_home_page_returns_200 -v
```

### Test Output Options

```bash
# Verbose output with detailed test names
python -m pytest tests/ -v

# Short traceback format
python -m pytest tests/ --tb=short

# Show local variables in tracebacks
python -m pytest tests/ --tb=long -v
```

## Test Coverage

The current test suite covers:

### Route Tests (`test_routes.py`)
- ✅ Home page endpoint (`/`)
  - Returns HTTP 200 status code
  - Returns HTML content type
  - Contains expected template content
  - Has proper HTML structure
  - Only responds to GET requests

- ✅ Health check endpoint (`/health`)
  - Returns HTTP 200 status code
  - Returns JSON content type
  - Contains correct response structure
  - Only responds to GET requests

- ✅ Static file serving
  - CSS files are properly served
  - Returns correct content types
  - Returns 404 for non-existent files

- ✅ Error handling
  - Returns 404 for non-existent routes
  - Returns 405 for unsupported HTTP methods

### Template Tests (`test_templates.py`)
- ✅ Template context variables
  - All context variables are properly rendered
  - Template includes expected content sections
  - HTML structure is correct and responsive

- ✅ Template content verification
  - Application status information
  - Planned features section
  - Footer information
  - CSS and resource linking

## GitHub Actions CI

The project includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that:

- Triggers on pull requests to the main branch
- Sets up Python 3.12 environment
- Installs all dependencies
- Runs all tests with verbose output
- Fails the workflow if any tests fail

## Test Fixtures

The `conftest.py` file provides shared test fixtures:

- `client`: FastAPI test client for making HTTP requests
- `sample_context`: Sample template context data for testing

## Adding New Tests

When adding new functionality to the application:

1. Create corresponding test functions in the appropriate test file
2. Use descriptive test function names starting with `test_`
3. Include docstrings describing what the test validates
4. Use the `client` fixture for making HTTP requests
5. Assert expected status codes, content types, and response content
6. Test both success and error cases

## Example Test Function

```python
def test_new_endpoint_returns_200(client):
    """Test that the new endpoint returns HTTP 200 status code."""
    response = client.get("/new-endpoint")
    assert response.status_code == 200
    assert "application/json" in response.headers["content-type"]
    
    json_data = response.json()
    assert "expected_field" in json_data
```

## Troubleshooting

### Common Issues

1. **Import errors**: Ensure you're running tests from the `backend` directory
2. **Missing dependencies**: Run `pip install -r requirements.txt`
3. **Path issues**: Tests expect to be run from the backend directory

### Debug Mode

To run tests with more detailed output:

```bash
python -m pytest tests/ -v -s --tb=long
```

This will show print statements and detailed tracebacks for debugging.