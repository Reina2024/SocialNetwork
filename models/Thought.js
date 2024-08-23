const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

//schema:Thought model
const thoughtSchema = new Schema(
  {
    username: { 
      type: String, 
      required: true
    }, 
    thoughtText: { 
      type: String, 
      required: true, 
      minLength: 1, 
      maxLength: 280  
    },
    createdAt: { 
      type: Date, 
      default: Date.now, 
      get: (time) => new Date(time).toISOString() 
    },
    reactions: [ reactionSchema ]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false, 
  }
);

thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

// Initialize thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;