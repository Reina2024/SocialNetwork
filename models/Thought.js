const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

//schema:Thought model
const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        minlength: [4, "Please enter 4 or more characters"],
        maxlength: 350,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (time) => new Date(time).toISOString()
      },
      username: {
        type: String,
        required: true,
      },
      reactions: [reactionSchema],
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    }
  );
  
  // This virtual field calculates the number of reactions associated with the thought
thoughtSchema
.virtual('reactionCount')
.get(function () {
  return this.reactions.length;
});

// Initialize thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;