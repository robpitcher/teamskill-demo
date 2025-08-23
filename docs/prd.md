# Product Requirements Document (PRD)
## Team Member Skillset Datastore Web App

---

### 1. Purpose

Create a secure, user-friendly web application for storing, managing, and visualizing team members’ skillsets/strengths. The app will allow users to complete a self-assessment form (based on a dynamically uploaded assessment), track their own skill ratings, and enable team leaders to view aggregated skill data. Authentication will be handled via Microsoft Entra ID, and the app will be hosted on Azure.

---

### 2. Target Users

- Team members (~50-100 users)
- Team leaders/managers

---

### 3. Key Features

#### 3.1. Authentication
- Use Microsoft Entra ID (formerly Azure AD) for Single Sign-On (SSO).
- Only authenticated users can access the app and submit/view data.

#### 3.2. Assessment Management
- Admins can upload new assessments (question sets) via a secure interface.
- Supported upload format: JSON or CSV (define schema for assessment questions).
- Each assessment contains:
  - A set of skill areas
  - Questions per skill area
  - Answer/rating options (e.g., 1–5 scale, multiple choice)

#### 3.3. Self-Assessment Form Page
- Users can fill out the latest self-assessment.
- UI dynamically generates questions based on the uploaded assessment.
- Users rate themselves in each skill area.
- Required fields validation.
- Option to save progress and submit when ready.

#### 3.4. Skillset Data Storage
- Store user responses securely in Azure database (e.g., Azure SQL, Cosmos DB).
- Each user can only see/edit their own assessments.
- Admins/team leads can view aggregated skill data.

#### 3.5. Data Visualization & Reporting
- Dashboard for team leads/admins:
  - Aggregate skill strengths/weaknesses across team
  - Filter by skill area, team, role, etc.
  - Export data (CSV, PDF)
- Individual user dashboard showing their skill profile over time.

#### 3.6. Security & Privacy
- All data encrypted at rest and in transit.
- Role-based access (User, Admin/Lead)
- Activity logging and audit trail for uploads/changes.

---

### 4. Technical Requirements

#### 4.1. Platform
- Web app (responsive, desktop/tablet/mobile)
- Hosted in Azure (App Service or Static Web Apps)
- Database: Azure SQL or Cosmos DB
- Storage for assessment uploads: Azure Blob Storage

#### 4.2. Authentication & User Management
- Integrate with Entra ID using OAuth2/OpenID Connect
- Map Entra ID groups to app roles (User, Admin)

#### 4.3. App Stack
- Frontend: React.js (preferred) or similar modern framework
- Backend: Node.js/Express, .NET Core, or Azure Functions
- API layer for database and file upload operations

#### 4.4. Scalability & Performance
- Designed for ~100 users; fast response time for all operations
- Efficient querying and aggregation of skill data

---

### 5. UX/UI

- Clean, intuitive interface
- Accessible for WCAG 2.1 AA standards
- Clear navigation: Dashboard, Assessment Form, Profile, Admin (if role)

---

### 6. Non-Functional Requirements

- Uptime: 99.9% (Azure SLA)
- Data backup and recovery plan
- Support for future extensibility (adding new assessments, custom reports, etc.)

---

### 7. Success Criteria

- 95%+ of users complete their first assessment without support
- Team leads can generate skill reports in under 2 minutes
- All data is secure and access is appropriately restricted

---

### 8. Risks & Mitigations

- **Authentication issues:** Use well-documented Entra ID libraries and test integration.
- **Data privacy:** Enforce strict RBAC, encrypt data, audit access.
- **Assessment upload errors:** Validate file schema, provide user feedback.

---

### 9. Open Questions

- What skill areas/questions will be included in the initial assessment?
- Who will upload/manage assessments (Admins only)?
- Do users need to see past self-assessments or just the latest?
- Any integration with other HR or team management tools?