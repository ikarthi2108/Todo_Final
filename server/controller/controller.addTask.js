const Task = require("../models/taskModel"); 

const handleAddTask=async (req, res) => {
    const { userId, text } = req.body; 
  
    try {
      const task = new Task({ userId, text });
      await task.save();
      res.status(201).json(task);
    } catch (error) {
      console.error("Error adding task:", error);
      res.status(500).json({ error: "An error occurred while adding the task." });
    }
  }

  const handleTaskData=async(req,res)=>{
    try{
        const {user}=req.query
        const taskData= await Task.find({userId:user})

        res.status(200).json(taskData)
    }
 catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

const handleDelete=async (req, res) => {
  const taskId = req.params.taskId;

  try {
    // Find the task by ID and remove it
    const deletedTask = await Task.findByIdAndRemove(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully', deletedTask });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the task', error: error.message });
  }
}

const handleEdit=async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const newText = req.body.text; 

 
    const task = await Task.findByIdAndUpdate(taskId, { text: newText }, { new: true });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

  module.exports={handleTaskData,handleAddTask,handleDelete,handleEdit}