require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const patientRoutes = require('./routes/patients');
const paymentRoutes = require('./routes/payment'); // 👈 New line

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Use the built-in Express JSON parser

// Connect to MongoDB (use the MongoDB URI from environment variables or replace it)
mongoose.connect(process.env.MONGO_URI || 'your_mongo_uri', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use patient routes
app.use('/api/patients', patientRoutes);

// Add this below the other routes
app.use('/api/payment', paymentRoutes); 


// Root route to confirm the server is running
app.get('/', (req, res) => {
  res.send('Welcome to the Patient Registration and Appointment API');
});

// Fallback route for undefined paths
app.use((req, res) => {
  res.status(404).send('Route not found');
});
 
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
