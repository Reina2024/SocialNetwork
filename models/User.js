const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

//schema to create User model
const userSchema = new Schema(
    {
      username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [
          /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
          "Invalid Email. Re-enter yoour email",
        ],
      },
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: "thought",
        },
      ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
      ],
    },
    {
      
      //indicates that virtuals are wanted with our response, overrides the default behavior
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    }
  );
  
  //gets the number of user's friends
  userSchema
    .virtual("friendCount")
    .get(function () {
      return this.friends.length;
    });
  
  //initialize User model
  const User = model("user", userSchema);
  
  module.exports = User;