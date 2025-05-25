// routes/patients.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Patient = require('../models/Patients');
const Consultation = require('../models/Consultation');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/register', async (req, res) => {
  try {
    const { fullName, email, phone, dateOfBirth, gender, address, password, confirmPassword } = req.body;

    // Validate password confirmation
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newPatient = new Patient({
      fullName,
      email,
      phone,
      dateOfBirth,
      gender,
      address,
      password: hashedPassword,
    });

    await newPatient.save();
    res.status(201).json({ message: 'Patient registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering patient', error });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET || 'your_jwt_secret_key', { expiresIn: '1h' });

    res.json({
      success: true,
      message: 'Login successful',
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Fetch user details
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    console.log('Fetching patient profile for user ID:', req.user.id);
    const patient = await Patient.findById(req.user.id).select('-password');
    if (!patient) {
      console.error('Patient not found:', req.user.id);
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    console.error('Error fetching patient profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch consultations/payments for the authenticated user
router.get('/consultations', authenticateToken, async (req, res) => {
  try {
    console.log('Fetching consultations for user ID:', req.user.id);
    const consultations = await Consultation.find({ patientId: req.user.id })
      .sort({ createdAt: -1 }); // Sort by newest first
    
    res.json(consultations);
  } catch (error) {
    console.error('Error fetching consultations:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch payments for the authenticated user (alias for consultations)
router.get('/payments', authenticateToken, async (req, res) => {
  try {
    console.log('Fetching payments for user ID:', req.user.id);
    const payments = await Consultation.find({ patientId: req.user.id })
      .sort({ createdAt: -1 })
      .select('amount status createdAt squarePaymentId name department');
    
    // Transform data to match expected payment format
    const formattedPayments = payments.map(payment => ({
      date: payment.createdAt,
      amount: payment.amount,
      method: 'Credit Card', // Since you're using Square
      status: payment.status === 'COMPLETED' ? 'Paid' : 'Pending',
      department: payment.department,
      patientName: payment.name
    }));
    
    res.json(formattedPayments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reset password
router.post('/reset-password', authenticateToken, async (req, res) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  try {
    console.log('Resetting password for user ID:', req.user.id);
    const patient = await Patient.findById(req.user.id);
    if (!patient) {
      console.error('Patient not found for password reset:', req.user.id);
      return res.status(404).json({ message: 'Patient not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, patient.password);
    if (!isMatch) {
      console.error('Current password incorrect for user ID:', req.user.id);
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    if (newPassword !== confirmNewPassword) {
      console.error('New passwords do not match for user ID:', req.user.id);
      return res.status(400).json({ message: 'New passwords do not match' });
    }

    const salt = await bcrypt.genSalt(10);
    patient.password = await bcrypt.hash(newPassword, salt);
    await patient.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch patient details by ID
router.get('/appointments/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).select('fullName email phone');
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
