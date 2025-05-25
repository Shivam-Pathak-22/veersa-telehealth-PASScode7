// backend/models/Patients.js
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Email as username
  phone: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true }, // Hashed password
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;

