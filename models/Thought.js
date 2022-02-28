const { Schema, Types, model } = require('mongoose');
const userSchema = require('./User');


const reactionSchema = new Schema(
  {
    reactionId: {
      type: Types.ObjectId,
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);


thoughtSchema
  .virtual('reactionCount')
  .get(function() {
    return this.reactions.length
  })

// Initialize our User model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
