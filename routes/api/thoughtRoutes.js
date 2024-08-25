const router = require('express').Router(); // Create a new router object from Express

// Import controller functions for handling thought-related routes
const {
  getThoughts,        
  getSingleThought,   
  createThought,      
  updateThought,      
  deleteThought,      
  addReaction,        
  deleteReaction      
} = require('../../controllers/thoughtController');

// Define routes for handling all thoughts
router.route('/')
  .get(getThoughts)       
  .post(createThought);   

// Define routes for handling a specific thought by ID
router.route('/:thoughtId')
  .get(getSingleThought)  
  .put(updateThought)     
  .delete(deleteThought); 

// Define routes for handling reactions on a specific thought
router.route('/:thoughtId/reactions')
  .post(addReaction);     

// Define routes for handling a specific reaction by ID
router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction); 

module.exports = router; // Export the router to be used in other parts of the application
