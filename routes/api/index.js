const router = require('express').Router(); // Import the Express router
const thoughtRoutes = require('./thoughtRoutes'); // Import routes related to 'thoughts'
const userRoutes = require('./userRoutes'); // Import routes related to 'users'

// Use the 'userRoutes' module for all routes that start with '/users'
router.use('/users', userRoutes);

// Use the 'thoughtRoutes' module for all routes that start with '/thoughts'
router.use('/thoughts', thoughtRoutes);

module.exports = router; // Export the configured router to be used in the main application
