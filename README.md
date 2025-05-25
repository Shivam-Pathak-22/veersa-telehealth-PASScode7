DEMO VIDEO : https://drive.google.com/file/d/10lkg-MCTX8Xk6U7NqScVJ7U-Cmlh0Ly1/view?usp=sharing

Figma Design : https://www.figma.com/design/hoN8VhZddfucHQmG169YFb/final?node-id=0-1&t=jp6TLIDvBSDRSYgx-1

Introduction:
The evolution of digital technology has profoundly impacted the healthcare industry, paving the way for innovative solutions such as telehealth. Telemedicine bridges the gap between patients and healthcare professionals, especially for those living in remote locations or facing mobility challenges. The Online Telehealth Consultation System leverages modern web technologies to simulate real-time clinical workflows. By allowing users to interact through dashboards, book appointments, manage slots, and access consultation records, it modernizes healthcare delivery.
With the healthcare system under increasing strain—due to rising patient volumes, limited clinical infrastructure, and unforeseen global emergencies—there is a growing need for reliable and scalable telehealth solutions. The platform ensures that essential healthcare services are never out of reach, regardless of time or location. Additionally, it upholds strong security practices using JWT-based authentication, allowing both patients and doctors to safely access and manage confidential medical information.
By integrating user-friendly interfaces with a robust backend, the system represents a future-ready model for accessible and efficient healthcare delivery. It opens the door for future integrations such as electronic health records (EHR), AI-powered diagnostics, and even video consultation modules.

Problem Statement:
Access to efficient healthcare remains difficult in remote and underserved regions. Traditional hospital visits often involve long waits, overcrowding, and travel inconveniences. During crises such as pandemics, these challenges intensify, leaving many without timely care. Moreover, urban areas also face issues like overbooked schedules and limited doctor availability.
Most existing systems do not combine all the necessary features—like dynamic slot scheduling, queue tracking, secure login, and consultation history—in one unified platform. There’s also a gap in role-based access control and secure handling of sensitive medical data.
The Online Telehealth Consultation System aims to solve these issues by offering a centralized, secure, and easy-to-use platform where users can book and manage appointments, receive timely consultations, and view past records, all in real time.

FRONTEND
1. Overview of the Frontend Application Structure
Online Telehealth Consultation System is a responsive and modern React-based frontend for a digital healthcare platform. It provides intuitive navigation across public-facing pages and a secure, authenticated dashboard for patients.
This frontend application is built to:
•	Offer clean and informative public pages.
•	Provide logged-in users with personalized health tools.
•	Interface with backend services via Axios (e.g., for login, registration).
•	Deliver engaging animations using Framer Motion.
File Organization
/components       // Reusable UI components (e.g., Navbar, Route Protection)
/pages            // All page-level views (e.g., Home, Login, Dashboard)
/App.jsx          // Central routing and layout logic

2. Routing and Navigation Logic
  App.jsx — Route Setup
  Routing is handled using react-router-dom, clearly separating public and private views:
  Public Routes (use OldNavbar)
  •	/ → Home.jsx
  •	/about → About.jsx
  •	/service, /speciality, /procedure → Healthcare services
  •	/contact → Contact.jsx
  •	/register → RegistrationForm.jsx
  •	/login → LoginPage.jsx
  Private Routes (wrapped with PrivateRoute)
  •	/new-interface → Dashboard.jsx
  •	/profile → MyProfile.jsx
  •	/BookConsultation → BookConsultation.jsx
  •	/PatientHistory → PatientHistory.jsx
  PrivateRoute.jsx
  This component restricts access to authenticated routes:
  •	It checks for an authToken in localStorage.
  •	Unauthenticated users are redirected to /login.
  API token validation is assumed to be handled by backend services.

3. Public Pages & Key Components
  Home.jsx
  The homepage includes:
  •	A full-screen hero section with looping background video and animated text.
  •	A service highlight grid showcasing six core offerings.
  •	A testimonial carousel to build user trust.
  •	Call-to-action section leading users to book or contact.
  •	Uses Framer Motion and react-icons for animations and visuals.
  LoginPage.jsx
  Secure login interface for patients:
  •	Accepts email and password.
  •	Password visibility toggle using Eye/EyeOff icons.
  •	Sends credentials via Axios to /api/patients/login.
  •	Saves token to localStorage and redirects on success.
  All communication is from the frontend to an external backend.
   RegistrationForm.jsx
  This form collects the following:
  •	Full name, email, phone number
  •	Date of birth, gender, address
  •	Password & Confirm password
  Features:
  •	Input validation (e.g., password match)
  •	UI animations with Framer Motion
  •	Submits data via Axios to /api/patients/register
  •	Mobile-optimized layout with clean gradient styling

4. Dashboard Pages 
  Accessible only after successful login.

   Dashboard.jsx (/new-interface)
  •	Personalized greeting
  •	Navigation cards for core actions
  •	Footer with telehealth organization info

   BookConsultation.jsx
  •	Appointment booking form with validation
  •	Integrates payment logic (via Square SDK)
  •	Sidebar navigation with links
  •	Confirmation dialog for logout

   MyProfile.jsx
  •	Displays patient's personal data
  •	Allows secure password reset
  •	Sidebar UI for navigation

   PatientHistory.jsx
  •	Renders medical consultation and payment history
  •	Real-time refresh with animated spinners
  •	Provides total consultations, payments, and pending items

6. Frontend Security & UX Practices
   Route Protection & Session Management
  •	PrivateRoute blocks unauthorized access.
  •	Token stored in localStorage and used for secured API calls.
  •	Assumes backend handles authentication, session expiration, and token verification.

 7. UX and Design Approach
  •	Color system: clean blue/indigo gradients
  •	Fully mobile-responsive
  •	Accessible form controls
  •	Smooth animations powered by Framer Motion
  •	Clear navigation patterns and intuitive layout

8. Potential Frontend Enhancements
   Future UI improvements could include:
  •	Doctor/Admin dashboards
  •	Patient notification system (email/push)
  •	Profile picture upload support
  •	Charts and analytics (Recharts, Chart.js)
  •	Lazy loading and route-based code splitting

UI/UX Design Reference
The user interface design for the Online Telehealth Consultation System was meticulously crafted in Figma. The design focuses on creating a clean, intuitive, and patient-centric experience. The Figma design assets are available here:

🔗 Figma Design - Final UI(Figma Design : https://www.figma.com/design/hoN8VhZddfucHQmG169YFb/final?node-id=0-1&t=jp6TLIDvBSDRSYgx-1)

Key Design Highlights:
•	Modern Aesthetic: The design features a minimalist yet visually rich layout using calm healthcare-friendly colors (indigo, blue, white).
•	User-Centric Navigation: Clear separation between public and dashboard views, with attention to usability and accessibility.
•	Responsive Layouts: Mobile-first approach ensures the interface adapts well across devices including phones, tablets, and desktops.
•	Consistent Design System: Reusable components like buttons, form fields, modals, and cards were structured as Figma components to maintain visual consistency throughout the application.
•	Visual Hierarchy & CTA Focus: Strategic use of font weights, iconography, and call-to-action buttons guide users toward critical tasks like booking consultations or logging in.
This design system serves as the blueprint for the frontend implementation and ensures that developers and designers remain aligned on UI consistency and user experience best practices.

BACKEND
AuthenticateToken.js
• Middleware function for backend route protection using JWT (JSON Web Tokens).
• Imports jsonwebtoken to verify tokens.
• Checks for Authorization header in incoming requests (expects format: Bearer <token>).
• Extracts token from the header; if missing, responds with 401 Unauthorized.
• Verifies token using secret key from environment variable JWT_SECRET.
• If valid, attaches decoded user info to req.user and calls next() to proceed.
• If invalid or expired, responds with 403 Forbidden.
• Provides stateless, scalable authentication without server-side session storage.

Models/Consultation.js
• Defines a Mongoose schema for storing consultation records in MongoDB.
• patientId: references Patient model’s ObjectId, linking consultation to a patient.
•Stores patientName and patientRelation as required strings.
• department: records the hospital department for the consultation.
• amount: stores consultation fee.
• status: tracks consultation state, defaults to "PENDING".
• squarePaymentId: stores unique payment ID from Square payment gateway.
• Medical fields include:
•	diagnosis (default or specific diagnosis),
•	notes for doctor’s remarks,
•	consultationDate (initially null, updated when scheduled).
• createdAt: timestamp of when the consultation record was created (auto-generated).
• Exported as a Mongoose model named Consultation for use in the app.

Models/Patient.js
• Defines a Mongoose schema for storing patient information in the database.
• Each document represents a unique registered patient.
• Fields include:
•	fullName: required, stores patient’s complete name.
•	email: required, unique, used as login identifier.
•	phone: required, stores contact number.
•	dateOfBirth: required, stores birth date.
•	gender: stores patient’s gender.
•	address: stores residential information.
•	password: required, stores hashed password for security.
• Ensures data validation, consistency, and security.
• Exported as a Mongoose model named Patient.
•Used for patient record management, authentication, profile retrieval, and updates throughout the backend.

Routes/patient.js
• Defines Express routes for patient-related operations, interacting with MongoDB via Mongoose.
• POST /register: Registers a new patient; validates matching passwords, hashes password with bcryptjs, saves patient data.
• POST /login: Authenticates patient with email and password; returns a JWT token if valid.
•GET /profile: Returns logged-in patient’s profile (excluding password); uses authenticateToken middleware.
•GET /consultations: Retrieves authenticated patient’s consultation history, sorted by creation date.
•GET /payments: Returns formatted consultation data as payment history for the authenticated user.
• POST /reset-password: Allows password change after verifying current password; hashes and updates new password.
•GET /appointments/:id: Fetches patient info (full name, email, phone) by patient ID for appointment display.
• All sensitive routes use authenticateToken to ensure only authorized access and data security

Routes/payment.js
• Handles payment processing and consultation booking using Square API and Express routes.
• Uses authenticateToken middleware to restrict payment initiation to authenticated users.
• Defines POST /process-payment route that accepts:
•	Square nonce (tokenized card details),
•	Consultation details (name, relationship, department).
• Payment amount is fixed at 50,000 cents ($500) for test environment.
• Uses Square Payments API to create the transaction with a unique idempotencyKey (via uuidv4()) to avoid duplicate charges.
• On successful payment:
•	Creates a new consultation record in the database with user ID, patient info, department, amount, payment status, and Square payment ID.
• Includes a recursive utility convertBigIntToString() to convert BigInt values in Square’s response to strings for JSON compatibility.
• Returns success message, processed payment result, and consultation ID on success.
• Logs errors and sends error responses if payment fails.
• Ensures secure, atomic payment and consultation booking integration for hospital management.

Server.js
• Entry point for the Patient Registration and Appointment System backend.
• Loads environment variables with dotenv for sensitive configs (MongoDB URI, port).
• Initializes Express app and applies middleware:
•	cors for cross-origin requests,
•	express.json() to parse JSON request bodies.
• Connects to MongoDB via Mongoose using MONGO_URI from env or fallback URI.
• Logs confirmation upon successful database connection.
• Registers main API routes:
1.	/api/patients — patient-related operations,
2.	/api/opd — outpatient department functionalities,
3.	/api/appointments — appointment management,
4.	/api/payment — payment processing and consultation booking.
• Root route (/) sends a welcome message confirming server is running.
• Fallback route returns 404 error for undefined endpoints.
• Server listens on configured port (env variable or 5000) and logs startup info.
• Ensures proper routing, error handling, and backend integration with frontend/external systems.

Dependencies
In the backend of our application, we utilized several key dependencies to handle different aspects of functionality, security, and external service integration:
•	express: The core framework used to build the server. It allows us to create APIs and manage routing, middleware, and HTTP requests with ease.
•	mongoose: Used to interact with MongoDB, this library provides a powerful schema-based solution to model and manage application data in a structured way.
•	dotenv: Enables loading of environment variables from a .env file, ensuring that sensitive information like API keys and database URIs are not hardcoded and can be securely managed.
•	cors: Implements Cross-Origin Resource Sharing, allowing the frontend (running on a different domain or port) to communicate with the backend server without being blocked by the browser.
•	body-parser: Helps parse incoming request bodies in JSON and URL-encoded formats. (Note: In newer versions of Express, its core express.json() and express.urlencoded() can be used instead.)
•	bcryptjs: Used for securely hashing user passwords before storing them in the database, ensuring credentials are protected even in case of a data breach.
•	jsonwebtoken: Allows us to implement authentication using JSON Web Tokens (JWT). It is used to sign and verify tokens that ensure only authorized users can access protected routes.
•	uuid: Generates unique identifiers, particularly useful for creating idempotency keys in payment processing or other unique resource identifiers.
•	square: Integrates the Square Payment API into the system. It enables secure payment processing for appointment bookings, handling transactions, and tracking payment statuses.
These dependencies collectively enable a robust, secure, and well-structured backend that supports user management, data persistence, secure authentication, and third-party payment integration.
How To Run the Backend
To run the backend server, first ensure you have cloned the repository and navigated to the backend project folder. Then, install all necessary dependencies by running npm install in the terminal. After installing the packages, create a .env file in the root directory to configure your environment variables such as the MongoDB connection string (MONGO_URI), JWT secret key (JWT_SECRET), Square access token (SQUARE_ACCESS_TOKEN), and the server port (PORT). Once the environment is set up, you can start the server by running node server.js or, if you have defined a start script, simply use npm start. The backend server will then run locally and be accessible at http://localhost:5000. This setup allows you to use all the API routes and services implemented in the backend.
Requirements to solve the Problem Statement:
•	Registration and Login
•	Profile Tab to capture basic patient information
•	Book Consulation Form and a Payment Gateway
•	Patient History Tab to Information for Future Reference 
•	Chat and Video Call Feature


