const express = require("express");
const router = express.Router();
const {handleAddTask,handleTaskData, handleDelete, handleEdit}=require('../controller/controller.addTask')




// POST a new task
router.post("/addtask", handleAddTask);

router.get("/getTask",handleTaskData);

router.delete('/deleteTask/:taskId',handleDelete );

// Route to edit a task
router.put("/editTask/:taskId", handleEdit);

module.exports = router;
