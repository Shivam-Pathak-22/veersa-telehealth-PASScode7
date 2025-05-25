'use client';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Calendar, Users, LogOut, Mail, Phone, MapPin } from 'lucide-react';

const Dashboard = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  // State for showing logout confirmation modal
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login', { replace: true });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const dashboardCards = [
    {
      title: "My Profile",
      description: "View and edit your profile details.",
      icon: User,
      href: "/profile"
    },
    {
      title: "Book Consultation",
      description: "Book your Consultation.",
      icon: Calendar,
      href: "/BookConsultation"
    },
    {
      title: "Patient History",
      description: "Check your previous interactions.",
      icon: Users,
      href: "/PatientHistory"
    },
    {
      title: "Logout",
      description: "Sign out of your account securely.",
      icon: LogOut,
      isButton: true,
      onClick: () => setShowLogoutConfirm(true)
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-200 relative">
      {/* Main Dashboard Content */}
      <div 
        className="flex-grow container mx-auto py-10 px-4"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/3683056/pexels-photo-3683056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl p-8 mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-blue-900 text-center mb-10"
          >
            Welcome to Your MediQueue Dashboard
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dashboardCards.map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
              >
                {item.isButton ? (
                  <div
                    onClick={item.onClick}
                    className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    <item.icon className="w-12 h-12 text-red-600 mb-4" />
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">{item.title}</h2>
                    <p className='text-lg text-gray-600'>{item.description}</p>
                  </div>
                ) : (
                  <Link to={item.href}>
                    <motion.div 
                      className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <item.icon className="w-12 h-12 text-blue-600 mb-4" />
                      <h2 className="text-2xl font-semibold mb-4 text-gray-800">{item.title}</h2>
                      <p className='text-lg text-gray-600'>{item.description}</p>
                    </motion.div>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer with Contact Details */}
      <footer className="bg-blue-900 py-8 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <h2 className="text-2xl font-semibold mb-2">MediQueue Contact Details</h2>
              <div className="flex items-center mb-2">
                <Mail className="mr-2" size={18} />
                <p>support@mediqueue.com</p>
              </div>
              <div className="flex items-center mb-2">
                <Phone className="mr-2" size={18} />
                <p>+1 123-456-7890</p>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2" size={18} />
                <p>123 Healthcare Lane, City, Country</p>
              </div>
            </div>
            <div className="w-full md:w-1/2 text-right">
              <p>&copy; {currentYear} MediQueue. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  handleLogout();
                }}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
