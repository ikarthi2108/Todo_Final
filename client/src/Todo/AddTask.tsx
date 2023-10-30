import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import jwtDecode from "jwt-decode";
import axios from "axios"; 

interface AddTaskProps {
  fetchTaskData: () => Promise<any>;
}

const AddTask: React.FC<AddTaskProps> = ({ fetchTaskData }) => {
  const [taskText, setTaskText] = useState("");
  const [error, setError] = useState("");

  const Token = localStorage.getItem("accessToken");
  const Tokenpayload = Token ? (jwtDecode(Token) as { id: string }) : null;
  const userToken = Tokenpayload?.id;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userToken) {
      if (!taskText) {
        setError("Please enter a task.");
        return;
      }

      const taskData = {
        userId: userToken,
        text: taskText,
      };

      axios
        .post("http://localhost:3001/addtask", taskData)
        .then((response) => {
          if (response.status === 201) {
            setTaskText("");
            setError("");
            fetchTaskData(); 
          } else {
            setError("An error occurred while adding the task.");
          }
        })
        .catch((error) => {
          setError("An error occurred while adding the task.");
          console.error("Error adding task:", error);
        });
    } else {
      setError("User not logged in.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-start">
        <div className="col-6">
          <form onSubmit={handleSubmit} className="form-inline">
            <div className="form-group mb-2 d-flex">
              <input
                type="text"
                placeholder="Add Task"
                className="form-control form-control-sm"
                value={taskText}
                onChange={(e) => {
                  setTaskText(e.target.value);
                  setError("");
                }}
              />
              <button type="submit" className="btn btn-primary ms-3 ml-2">
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </form>
          {error && <p className="text-danger">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default AddTask;
