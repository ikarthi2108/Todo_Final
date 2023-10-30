import React from "react";
import AddTask from "./AddTask"; 
import TaskList from "./TaskList"; 
import jwtDecode from "jwt-decode"; 
import axios from "axios";
import { useQueryClient } from "react-query"; 

const TodoPage: React.FC = () => {
  const queryClient = useQueryClient(); 

  // Function to fetch the user's task data from the server
  const fetchTaskData = () => {

    const Token = localStorage.getItem("accessToken");

    // Decode the JWT token to extract the user's 'id'
    const Tokenpayload = Token ? (jwtDecode(Token) as { id: string } | null) : null;

    // Assign the user's 'id' to 'userToken' or an empty string if it doesn't exist
    const userToken = Tokenpayload?.id || '';

    // Fetch task data from the server using the user's 'id'
    return axios.get(`http://localhost:3001/getTask?user=${userToken}`).then((res) => res.data);
  };

  // Function to handle the addition of a new task
  const handleTaskAdded = async () => {
    const Token = localStorage.getItem("accessToken");

    // Decode the JWT token to extract the user's 'id' or provide an empty string if it doesn't exist
    const userToken = Token ? (jwtDecode(Token) as { id: string } | null)?.id : '';

    // Fetch updated task data after adding a new task
    const data = await fetchTaskData();

    // Update the cached task data, triggering a re-render of components that use it
    queryClient.setQueryData(["tasks", userToken], data);
  };

  return (
    <div>
      {/* AddTask component, passing the 'handleTaskAdded' function to trigger data refresh */}
      <AddTask fetchTaskData={handleTaskAdded} />
      <TaskList />
    </div>
  );
};

export default TodoPage;
