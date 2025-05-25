import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Users, Clock, Home, Eye, EyeOff, ChevronRight, LogOut } from 'lucide-react';

const MyProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    isPasswordResetVisible: false,
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:5000/api/patients/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData((prevState) => ({
          ...prevState,
          name: response.data.fullName,
          email: response.data.email,
          phone: response.data.phone,
          gender: response.data.gender,
        }));
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      alert('New passwords do not match');
      return;
    }
    try {
      const token = localStorage.getItem('authToken');
      await axios.post(
        'http://localhost:5000/api/patients/reset-password',
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          confirmNewPassword: formData.confirmNewPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Password reset successful');
      setFormData({ ...formData, currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('Error resetting password');
    }
  };

  const togglePasswordReset = () => {
    setFormData({ ...formData, isPasswordResetVisible: !formData.isPasswordResetVisible });
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const sidebarItems = [
    { name: 'Dashboard', icon: Home, link: '/new-interface' },
    { name: 'My Profile', icon: User, link: '/profile' },
    { name: 'Book Consultation', icon: Clock, link: '/BookConsultation' },
    { name: 'Patient History', icon: Users, link: '/PatientHistory' },
    { name: 'Logout', icon: LogOut, action: () => setShowLogoutConfirm(true) },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-gradient-to-b from-indigo-800 to-indigo-700 text-white flex-shrink-0"
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
          <nav>
            <ul className="space-y-4">
              {sidebarItems.map((item, index) => (
                <motion.li key={index} whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
                  {item.link ? (
                    <Link
                      to={item.link}
                      className="flex items-center py-2 px-4 rounded hover:bg-indigo-600 transition-colors duration-200"
                    >
                      <item.icon className="mr-3" size={18} />
                      {item.name}
                      <ChevronRight className="ml-auto" size={18} />
                    </Link>
                  ) : (
                    <button
                      onClick={item.action}
                      className="flex items-center w-full py-2 px-4 rounded hover:bg-indigo-600 transition-colors duration-200 text-left"
                    >
                      <item.icon className="mr-3" size={18} />
                      {item.name}
                      <ChevronRight className="ml-auto" size={18} />
                    </button>
                  )}
                </motion.li>
              ))}
            </ul>
          </nav>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
            <h1 className="text-3xl font-semibold">My Profile</h1>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Name', value: formData.name, icon: User },
                  { label: 'Email', value: formData.email, icon: Mail },
                  { label: 'Phone Number', value: formData.phone, icon: Phone },
                  { label: 'Gender', value: formData.gender, icon: Users },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg flex items-center"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <item.icon className="text-indigo-600 mr-3" size={20} />
                    <div>
                      <p className="text-sm text-gray-600">{item.label}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.button
              onClick={togglePasswordReset}
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-6 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {formData.isPasswordResetVisible ? 'Cancel Password Reset' : 'Reset Password'}
            </motion.button>

            {formData.isPasswordResetVisible && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
                <form onSubmit={handlePasswordReset} className="space-y-4">
                  {[
                    {
                      label: 'Current Password',
                      name: 'currentPassword',
                      show: showCurrentPassword,
                      setShow: setShowCurrentPassword,
                    },
                    {
                      label: 'New Password',
                      name: 'newPassword',
                      show: showNewPassword,
                      setShow: setShowNewPassword,
                    },
                    {
                      label: 'Confirm New Password',
                      name: 'confirmNewPassword',
                      show: showConfirmNewPassword,
                      setShow: setShowConfirmNewPassword,
                    },
                  ].map((item, index) => (
                    <div key={index}>
                      <label htmlFor={item.name} className="block text-gray-700 font-medium mb-1">
                        {item.label}:
                      </label>
                      <div className="relative">
                        <input
                          type={item.show ? 'text' : 'password'}
                          id={item.name}
                          name={item.name}
                          value={formData[item.name]}
                          onChange={handleChange}
                          placeholder={item.label}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => item.setShow(!item.show)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                          {item.show ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                  ))}
                  <motion.button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Reset Password
                  </motion.button>
                </form>
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>

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
                onClick={handleLogout}
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

export default MyProfile;
