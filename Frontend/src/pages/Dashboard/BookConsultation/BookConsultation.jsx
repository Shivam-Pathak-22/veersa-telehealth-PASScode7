import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Clock, Users, Home, ChevronRight, LogOut, Video } from 'lucide-react';

const BookConsultation = () => {
  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    department: '',
  });

  const [message, setMessage] = useState('');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [payments, setPayments] = useState(null);
  const [paymentForm, setPaymentForm] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  const isFormValid = formData.name && formData.relationship && formData.department;

  const sidebarItems = [
    { name: 'Dashboard', icon: Home, link: '/new-interface' },
    { name: 'My Profile', icon: User, link: '/profile' },
    { name: 'Book Consultation', icon: Clock, link: '/BookConsultation' },
    { name: 'Patient History', icon: Users, link: '/PatientHistory' },
    { name: 'Logout', icon: LogOut, action: () => setShowLogoutConfirm(true) },
  ];

  // Load Square payment form on mount
  useEffect(() => {
    if (window.Square) {
      const payments = window.Square.payments(import.meta.env.VITE_SQUARE_APP_ID, import.meta.env.VITE_SQUARE_LOCATION_ID);
      setPayments(payments);
    } else {
      setMessage('Square payment SDK not loaded');
    }
  }, []);

  // Create card payment form
  useEffect(() => {
    if (!payments) return;

    async function initializeCard(payments) {
      const card = await payments.card();
      await card.attach('#card-container');
      setPaymentForm(card);
    }
    initializeCard(payments);
  }, [payments]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    if (!paymentForm) {
      setMessage('Payment form not initialized.');
      return;
    }

    if (!isFormValid) {
      setMessage('Please fill in all the fields.');
      return;
    }

    setMessage('Processing payment...');

    try {
      const result = await paymentForm.tokenize();
      if (result.status !== 'OK') {
        setMessage(`Tokenization failed: ${result.errors ? result.errors[0].message : 'Unknown error'}`);
        return;
      }

      const nonce = result.token;
      const token = localStorage.getItem('authToken');

      if (!token) {
        setMessage('Please login to continue');
        navigate('/login');
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/process-payment`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nonce,
          name: formData.name,
          relationship: formData.relationship,
          department: formData.department,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Payment successful! Starting video call with doctor...');
        setPaymentSuccess(true);
        // Reset form after successful payment
        setFormData({ name: '', relationship: '', department: '' });
        
        // Redirect to video call after a delay
        setTimeout(() => {
          navigate('/video-call', { state: { 
            department: formData.department,
            consultationId: data.consultationId 
          }});
        }, 3000);
      } else {
        setMessage('Payment failed: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      setMessage('Payment error: ' + error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

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
                      className={`flex items-center py-2 px-4 rounded transition-colors duration-200 ${
                        item.name === 'Book Consultation' ? 'bg-indigo-600' : 'hover:bg-indigo-600'
                      }`}
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
          className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
            <h1 className="text-3xl font-semibold">Book Consultation</h1>
          </div>

          <div className="p-8">
            {paymentSuccess ? (
              <div className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <Video className="w-12 h-12 text-green-500 animate-pulse" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Payment Successful!</h2>
                <p className="text-gray-600 mb-6">Preparing your video consultation with the doctor...</p>
                <div className="animate-pulse text-indigo-600">
                  <p>You will be redirected shortly</p>
                </div>
              </div>
            ) : (
              <>
                {message && (
                  <div className={`mb-4 p-3 rounded ${
                    message.includes('successful') ? 'bg-green-100 text-green-800' : 
                    message.includes('error') || message.includes('failed') ? 'bg-red-100 text-red-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {message}
                  </div>
                )}
                <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />

                  <select
                    name="relationship"
                    value={formData.relationship}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Relationship with Patient</option>
                    <option value="self">Self</option>
                    <option value="parent">Parent</option>
                    <option value="child">Child</option>
                    <option value="spouse">Spouse</option>
                    <option value="other">Other</option>
                  </select>

                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="general">General Medicine</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="neurology">Neurology</option>
                    <option value="gastroenterology">Gastroenterology</option>
                    <option value="orthopedic">Orthopedic</option>
                    <option value="oncology">Oncology</option>
                    <option value="gynecology">Gynecology</option>
                    <option value="dermatology">Dermatology</option>
                    <option value="ophthalmology">Ophthalmology</option>
                    <option value="pediatrics">Pediatrics</option>
                    <option value="endocrinology">Endocrinology</option>
                    <option value="urology">Urology</option>
                    <option value="nephrology">Nephrology</option>
                    <option value="pulmonology">Pulmonology</option>
                    <option value="rheumatology">Rheumatology</option>
                    <option value="neurosurgery">Neurosurgery</option>
                    <option value="radiology">Radiology</option>
                    <option value="plastic_surgery">Plastic Surgery</option>
                    <option value="neonatology">Neonatology</option>
                    <option value="vascular_surgery">Vascular Surgery</option>
                    <option value="psychiatry">Psychiatry</option>
                    <option value="dentistry">Dentistry</option>
                    <option value="ent">ENT (Ear, Nose, Throat)</option>
                  </select>

                  <div id="card-container" className="mb-4 p-4 border border-gray-300 rounded-lg"></div>

                  <button
                    type="button"
                    onClick={handlePayment}
                    disabled={!isFormValid}
                    className={`w-full py-3 font-semibold rounded-lg transition-colors duration-200 
                      ${isFormValid ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
                  >
                    Pay Now ₹500
                  </button>
                </form>
              </>
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

export default BookConsultation;
