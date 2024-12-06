const express = require('express');
const { errorHandler } = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');
const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const adminRoutes = require('./routes/adminRoutes'); 
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const jobSectorRoutes = require('./routes/jobSectorRoutes');
const companyRoutes = require('./routes/companyRoutes');
require('dotenv').config();

const cors = require("cors");

const app = express();

// Enable CORS for all origins
app.use(cors());

connectDB();
const port = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());
// Use user routes
app.use('/api/admin', adminRoutes); 
app.use('/api/candidate', candidateRoutes); 
app.use('/api/auth', userRoutes); 
app.use('/api/job', jobRoutes); 
app.use('/api/application', applicationRoutes);
app.use('/api/job-sectors', jobSectorRoutes);
app.use('/api/companies', companyRoutes);









// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
    console.log(`Job-Listing-System listening at http://localhost:${port}`);
});
