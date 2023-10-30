import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Authentication/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./Authentication/Register";
import { Provider } from "react-redux/es/exports";
import store from "./features/store";
import Navbar from "./Navbar";
import TodoPage from "./Todo/TodoPage";

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
  <Navbar/>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path="/tasks" element={<TodoPage/>}></Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;