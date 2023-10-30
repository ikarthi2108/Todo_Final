import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import jwtDecode from "jwt-decode";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSave } from "@fortawesome/free-solid-svg-icons";

// Interface for Task
interface Task {
  _id: number;
  text: string;
  userId: string;
  createdAt: string;
}

const TaskList: React.FC = () => {
  const [editTask, setEditTask] = useState<Task | null>(null); // State to store the task being edited

  const Token = localStorage.getItem("accessToken");
  const Tokenpayload = Token ? (jwtDecode(Token) as { id: string }) : null;
  const userToken = Tokenpayload?.id;

  const queryKey = ["tasks", userToken];

  // Query to fetch tasks
  const { data: taskData, isLoading, isError, refetch } = useQuery(queryKey, () =>
    axios.get(`http://localhost:3001/getTask?user=${userToken}`).then((res) => res.data)
  );

  // function to delete a task
  const deleteTask = useMutation((taskId: number) => axios.delete(`http://localhost:3001/deleteTask/${taskId}`), {
    onSuccess: () => {
      refetch(); // Refetch the data after a successful delete
    },
  });

  // Create a function to save the edited task
  const saveEdit = useMutation((editedTask: Task) =>
    axios.put(`http://localhost:3001/editTask/${editedTask._id}`, { text: editedTask.text }), {
    onSettled: () => {
      setEditTask(null); // Clear the editing state after saving
      refetch(); // Refetch the data after a successful edit
    },
  });

  return (
    <Container>
      <h2>Your Tasks:</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error fetching tasks</p>
      ) : (
        <ListGroup>
          {taskData.length > 0 ? (
            taskData.map((task: Task) => (
              <ListGroup.Item key={task._id} className="d-flex justify-content-between align-items-center">
                <div>
                  {editTask && editTask._id === task._id ? (
                    <input
                      type="text"
                      value={editTask.text}
                      onChange={(e) => setEditTask({ ...editTask, text: e.target.value })}
                    />
                  ) : (
                    <p>{task.text}</p>
                  )}
                  <small>{new Date(task.createdAt).toLocaleString()}</small>
                </div>
                <div>
                  {editTask && editTask._id === task._id ? (
                    <Button
                      variant="success"
                      className="mr-2"
                      onClick={() => saveEdit.mutate(editTask)}
                    >
                      <FontAwesomeIcon icon={faSave} />
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      className="mr-2"
                      onClick={() => setEditTask(task)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                  )}
                  <Button
                    variant="danger"
                    onClick={() => deleteTask.mutate(task._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </div>
              </ListGroup.Item>
            ))
          ) : (
            <p>No tasks Created.</p>
          )}
        </ListGroup>
      )}
    </Container>
  );
};

export default TaskList;
