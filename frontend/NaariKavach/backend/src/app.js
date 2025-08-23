const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
const sosRoutes = require('./routes/sosRoutes');
const authRoutes = require('./routes/authRoutes');
const locationRoutes = require('./routes/locationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test Route
app.get('/', (req, res) => {
    res.send('🚀 Welcome to NaariKavach API');
});

// Use Routes
app.use('/sos', sosRoutes);
app.use('/auth', authRoutes);
app.use('/location', locationRoutes);

// Global Error Handler (optional but useful)
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
