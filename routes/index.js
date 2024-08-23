// Import the Express router
const router = require('express').Router();

// Import API routes from the './api' module
const apiRoutes = require('./api');

// Use the imported API routes for any request starting with '/api'
// This means that all routes defined in './api' will be prefixed with '/api'
router.use('/api', apiRoutes);

// Handle any requests to routes that do not match the above routes
// This middleware will catch any unmatched routes and respond with 'Wrong route!'
router.use((req, res) => {
  return res.send('Wrong route!');
});

// Export the configured router to be used in the main application file
module.exports = router;
