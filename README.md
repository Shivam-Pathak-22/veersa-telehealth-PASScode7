DEMO VIDEO : https://drive.google.com/file/d/10lkg-MCTX8Xk6U7NqScVJ7U-Cmlh0Ly1/view?usp=sharing

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
🔗 Figma Design - Final UI
Key Design Highlights:
•	Modern Aesthetic: The design features a minimalist yet visually rich layout using calm healthcare-friendly colors (indigo, blue, white).
•	User-Centric Navigation: Clear separation between public and dashboard views, with attention to usability and accessibility.
•	Responsive Layouts: Mobile-first approach ensures the interface adapts well across devices including phones, tablets, and desktops.
•	Consistent Design System: Reusable components like buttons, form fields, modals, and cards were structured as Figma components to maintain visual consistency throughout the application.
•	Visual Hierarchy & CTA Focus: Strategic use of font weights, iconography, and call-to-action buttons guide users toward critical tasks like booking consultations or logging in.
This design system serves as the blueprint for the frontend implementation and ensures that developers and designers remain aligned on UI consistency and user experience best practices.

