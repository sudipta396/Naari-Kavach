const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const sosRoutes = require('./routes/sosRoutes');
const locationRoutes = require('./routes/locationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/naarikavach", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ DB Error:", err));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to NaariKavach API');
});

app.use('/api/auth', authRoutes);
app.use('/api/sos', sosRoutes);
app.use('/api/location', locationRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
