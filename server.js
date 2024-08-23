// Import necessary modules
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = 3001; // Port number for the server
const app = express(); // Create an instance of an Express application

// Middleware to parse URL-encoded data with extended syntax and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up routing using the routes defined in the './routes' module
app.use(routes);

// Connect to the database and start the server once the connection is established
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for social backend running on port ${PORT}!`);
  });
});
