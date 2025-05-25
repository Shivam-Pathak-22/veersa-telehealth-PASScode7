// models/Consultation.js
const mongoose = require('mongoose');

const ConsultationSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  relationship: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'PENDING'
  },
  squarePaymentId: {
    type: String,
    required: true
  },
  // Additional fields for consultation history

  diagnosis: {
    type: String,
    default: 'Consultation Booked'
  },
  notes: {
    type: String,
    default: ''
  },
  consultationDate: {
    type: Date,
    default: null // Will be set when consultation is scheduled
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Consultation', ConsultationSchema);
