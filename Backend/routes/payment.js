// routes/payment.js
const express = require('express');
const router = express.Router();
const { Client, Environment } = require('square/legacy');
const { v4: uuidv4 } = require('uuid');
const Consultation = require('../models/Consultation');
const authenticateToken = require('../middleware/authenticateToken');
require('dotenv').config();

// Convert all BigInts to strings recursively
function convertBigIntToString(obj) {
  if (typeof obj === 'bigint') {
    return obj.toString();
  }
  if (Array.isArray(obj)) {
    return obj.map(convertBigIntToString);
  }
  if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, convertBigIntToString(v)]),
    );
  }
  return obj;
}

const squareClient = new Client({
  bearerAuthCredentials: {
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
  },
  environment: Environment.Sandbox, // or Environment.Production
});

// POST /api/payment/process-payment
router.post('/process-payment', authenticateToken, async (req, res) => {
  const { nonce, name, relationship, department } = req.body;
  const amount = 50000; // ₹500 as cents

  try {
    const response = await squareClient.paymentsApi.createPayment({
      sourceId: nonce,
      idempotencyKey: uuidv4(),
      amountMoney: {
        amount,
        currency: 'USD',
      },
    });

    // Generate unique Jitsi room name using consultation ID (after save)
    const consultation = new Consultation({
      patientId: req.user.id,
      name,
      relationship,
      department,
      amount: 500,
      status: response.result.payment.status,
      squarePaymentId: response.result.payment.id,
    });

    await consultation.save();

    // Now generate the Jitsi room name based on consultation ID
    const jitsiRoom = `ConsultRoom-${consultation._id}`;

    // Update consultation with the Jitsi room name
    consultation.jitsiRoom = jitsiRoom;
    await consultation.save();

    const safeResult = convertBigIntToString(response.result);

    res.json({
      success: true,
      message: 'Payment and booking successful',
      data: safeResult,
      consultationId: consultation._id,
      jitsiRoom, // return the room to frontend
      jitsiURL: `https://meet.jit.si/${jitsiRoom}`, // full link
    });
  } catch (err) {
    console.error('Square Payment Error:', err);
    res.status(500).json({
      success: false,
      message: 'Payment failed',
      error: err.message || err,
    });
  }
});

module.exports = router;
