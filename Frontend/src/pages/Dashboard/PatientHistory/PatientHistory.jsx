import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Users, Clock, Home, ChevronRight, LogOut, RefreshCw } from 'lucide-react';

const PatientHistory = () => {
  const [consultations, setConsultations] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const navigate = useNavigate();

  const fetchPatientHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        setError('Please login to view your history');
        navigate('/login');
        return;
      }

      const [consultRes, paymentRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/patients/consultations`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/patients/payments`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setConsultations(consultRes.data);
      setPayments(paymentRes.data);
    } catch (err) {
      console.error('Error fetching patient history:', err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError('Session expired. Please login again.');
        localStorage.removeItem('authToken');
        navigate('/login');
      } else {
        setError('Failed to load patient history. Please try again later.');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPatientHistory();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPatientHistory();
  };

  const sidebarItems = [
    { name: 'Dashboard', icon: Home, link: '/new-interface' },
    { name: 'My Profile', icon: User, link: '/profile' },
    { name: 'Book Consultation', icon: Clock, link: '/BookConsultation' },
    { name: 'Patient History', icon: Users, link: '/PatientHistory' }, // current page
    { name: 'Logout', icon: LogOut, action: () => setShowLogoutConfirm(true) },
  ];

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const formatDepartment = (dept) => {
    const departmentMap = {
      'general': 'General Medicine',
      'cardiology': 'Cardiology',
      'neurology': 'Neurology',
      'gastroenterology': 'Gastroenterology',
      'orthopedic': 'Orthopedic',
      'oncology': 'Oncology',
      'gynecology': 'Gynecology',
      'dermatology': 'Dermatology',
      'ophthalmology': 'Ophthalmology',
      'pediatrics': 'Pediatrics',
      'endocrinology': 'Endocrinology',
      'urology': 'Urology',
      'nephrology': 'Nephrology',
      'pulmonology': 'Pulmonology',
      'rheumatology': 'Rheumatology',
      'neurosurgery': 'Neurosurgery',
      'radiology': 'Radiology',
      'plastic_surgery': 'Plastic Surgery',
      'neonatology': 'Neonatology',
      'vascular_surgery': 'Vascular Surgery',
      'psychiatry': 'Psychiatry',
      'dentistry': 'Dentistry',
      'ent': 'ENT (Ear, Nose, Throat)'
    };
    return departmentMap[dept] || dept;
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
                        item.name === 'Patient History' ? 'bg-indigo-600' : 'hover:bg-indigo-600'
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
          className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white flex items-center justify-between">
            <h1 className="text-3xl font-semibold">Patient History & Payments</h1>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors duration-200 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          <div className="p-8">
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <span className="ml-3 text-gray-500">Loading patient history...</span>
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            {!loading && !error && (
              <>
                {/* Previous Consultations */}
                <section className="mb-10">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Previous Consultations</h2>
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                      {consultations.length} Records
                    </span>
                  </div>
                  
                  {consultations.length === 0 ? (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                      <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 text-lg">No consultation records found.</p>
                      <p className="text-gray-500 mt-2">Book your first consultation to see it here.</p>
                      <Link 
                        to="/BookConsultation"
                        className="inline-block mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                      >
                        Book Consultation
                      </Link>
                    </div>
                  ) : (
                    <div className="overflow-x-auto shadow-sm border border-gray-200 rounded-lg">
                      <table className="w-full table-auto">
                        <thead className="bg-indigo-50">
                          <tr>
                            <th className="px-6 py-4 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Patient Name</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Department</th>
              
                            <th className="px-6 py-4 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Notes</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {consultations.map((c, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {new Date(c.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDepartment(c.department)}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  c.status === 'COMPLETED' 
                                    ? 'bg-green-100 text-green-800' 
                                    : c.status === 'PENDING'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {c.status === 'COMPLETED' ? 'Completed' : c.status === 'PENDING' ? 'Pending' : c.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-900">{c.notes || c.diagnosis || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>

                {/* Payment History */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Payment History</h2>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {payments.length} Payments
                    </span>
                  </div>
                  
                  {payments.length === 0 ? (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                      <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 text-lg">No payment records found.</p>
                      <p className="text-gray-500 mt-2">Your payment history will appear here after booking consultations.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto shadow-sm border border-gray-200 rounded-lg">
                      <table className="w-full table-auto">
                        <thead className="bg-green-50">
                          <tr>
                            <th className="px-6 py-4 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Patient Name</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Department</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Payment Method</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Status</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {payments.map((p, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {new Date(p.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.patientName}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDepartment(p.department)}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹{p.amount.toFixed(2)}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.method}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  p.status.toLowerCase() === 'paid' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {p.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>

                {/* Summary Stats */}
                {(consultations.length > 0 || payments.length > 0) && (
                  <section className="mt-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-indigo-50 rounded-lg p-6 text-center">
                        <div className="text-2xl font-bold text-indigo-600">{consultations.length}</div>
                        <div className="text-sm text-indigo-800">Total Consultations</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-6 text-center">
                        <div className="text-2xl font-bold text-green-600">
                          ₹{payments.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}
                        </div>
                        <div className="text-sm text-green-800">Total Payments</div>
                      </div>
                      <div className="bg-yellow-50 rounded-lg p-6 text-center">
                        <div className="text-2xl font-bold text-yellow-600">
                          {consultations.filter(c => c.status === 'PENDING').length}
                        </div>
                        <div className="text-sm text-yellow-800">Pending Consultations</div>
                      </div>
                    </div>
                  </section>
                )}
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
                className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
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

export default PatientHistory;
