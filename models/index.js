// Import the User model from the 'User' module
const User = require('./User');

// Import the Thought model from the 'Thought' module
const Thought = require('./Thought');

// Export both User and Thought models as an object
// This allows other modules to import and use these models
module.exports = { User, Thought };
