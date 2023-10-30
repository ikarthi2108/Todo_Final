const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema({
  userId: {
    type: String, 
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("Tasks", taskSchema);

module.exports = Task;
