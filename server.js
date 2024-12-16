// Backend Implementation for School Management System

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes'); // Assuming routes/index.js aggregates all routes
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorHandler');
const { authenticateJWT } = require('./middlewares/auth');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Initialize app
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.',
});
app.use(limiter);

// Database connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', authenticateJWT, routes);

// Error handling
app.use(errorHandler);

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
