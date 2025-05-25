import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './pages/RegistrationForm/RegistrationForm.jsx';
import Home from './pages/Home/Home.jsx';
import About from './pages/About/About.jsx';
import Service from './pages/Service/Service.jsx';
import Contact from './pages/Contact/Contact.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import Specialities from './pages/Specialities/Specialities.jsx';
import Procedures from './pages/Procedures/Procedures.jsx';
import NewInterface from './components/NewInterface/NewInterface.jsx';
import OldNavbar from './components/OldNavBar/OldNavBar.jsx';
import MyProfile from './pages/Dashboard/MyProfile/MyProfile.jsx';
import BookConsultation from './pages/Dashboard/BookConsultation/BookConsultation.jsx';
import PatientHistory from './pages/Dashboard/PatientHistory/PatientHistory.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import VideoConsult from './pages/Dashboard/VideoConsult/VideoConsult.jsx';


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes with OldNavbar */}
        <Route path="/" element={<><OldNavbar /> <Home /></>} />
        <Route path="/about" element={<><OldNavbar /><About /></>} />
        <Route path="/service" element={<><OldNavbar /><Service /></>} />
        <Route path="/speciality" element={<><OldNavbar /><Specialities /></>} />
        <Route path="/procedure" element={<><OldNavbar /><Procedures /></>} />
        <Route path="/contact" element={<><OldNavbar /><Contact /></>} />
        <Route path="/register" element={<><OldNavbar /><RegistrationForm /></>} />
        <Route path="/login" element={<><OldNavbar /><LoginPage /></>} />

        {/* Protected Routes */}
        <Route path="/new-interface" element={<PrivateRoute><NewInterface /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><MyProfile /></PrivateRoute>} />
        <Route path="/BookConsultation" element={<PrivateRoute><BookConsultation /></PrivateRoute>} />
        <Route path="/video-call" element={<PrivateRoute><VideoConsult /></PrivateRoute>} />        
        <Route path="/PatientHistory" element={<PrivateRoute><PatientHistory /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
