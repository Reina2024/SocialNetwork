// Import Express router and controller functions for user operations
const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

// Define routes for handling user-related requests
// GET and POST requests to '/' handle retrieving all users and creating a new user
router.route("/").get(getUsers).post(createUser);

// GET, PUT, and DELETE requests to '/:userId' handle retrieving, updating, and deleting a single user by userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// POST and DELETE requests to '/:userId/friends/:friendId' handle adding and removing friends for a specific user
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

// Export the router to be used in other parts of the application
module.exports = router;
