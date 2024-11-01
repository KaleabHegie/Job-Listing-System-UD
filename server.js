const express = require('express');
const { errorHandler } = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');
const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const adminRoutes = require('./routes/adminRoutes'); 
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
require('dotenv').config();

connectDB();
const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());
// Use user routes
app.use('/api/admin', adminRoutes); 
app.use('/api/candidate', candidateRoutes); 
app.use('/api/auth', userRoutes); 
app.use('/api/job', jobRoutes); 
app.use('/api/application', applicationRoutes);









// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
    console.log(`Job-Listing-System listening at http://localhost:${port}`);
});
