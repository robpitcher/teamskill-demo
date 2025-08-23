# Issue Title: Create minimal Python web app project scaffold and add Playwright MCP server config

## Description:
Set up initial project scaffolding for the Teamskill web app using Python. This first iteration should be minimal and focus on establishing the basic structure of the application, with boilerplate code and placeholder content only.

### Requirements:
- Use Python as the backend (any lightweight ASGI framework such as FastAPI, Flask, etc.—leave choice flexible).
- Include a simple home page route (e.g., “/”) that renders a basic welcome page or message.
- The project should be organized with best practices (separate folders for static files, templates, and application code).
- No authentication or user management needed yet.
- No assessment forms or data models at this stage.
- Include a README with setup instructions.
- Add a .gitignore suitable for Python projects.
- Prepare for future integration with React frontend and Azure services, but do not implement these yet.
- Add Playwright MCP server configuration:
  - Include necessary config and setup files to support running Playwright tests against an MCP server.
  - Provide a placeholder or sample configuration for the MCP server, with instructions in the README for future customization.

### Acceptance Criteria:
- The code runs locally via a standard Python command for the chosen framework (e.g., flask run, uvicorn main:app, etc.).
- Visiting the home page in a browser displays a placeholder message.
- Project structure is clear and ready for future feature additions.
- Playwright MCP server config is present and documented in the README.