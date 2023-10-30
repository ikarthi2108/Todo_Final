import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState(""); 
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const isAuthenticated = () => {
    const auth = localStorage.getItem("accessToken");
    return !!auth;
  };

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/tasks");
    }
  }, [navigate]);

  const handleLogin = () => {
    setEmailError("");
    setPasswordError("");
    setLoginError(""); 

    if (email === "") {
      setEmailError("Email is required");
      return;
    }

    if (password === "") {
      setPasswordError("Password is required");
      return;
    }

    const userData = {
      email,
      password,
    };

    axios
      .post("http://localhost:3001/login", userData)
      .then((response) => {
        alert("Login Successful");
        dispatch(login(response.data.user));
        localStorage.setItem("accessToken", response.data.accessToken);
        navigate("/tasks");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setLoginError("Invalid credentials");
        } else {
          console.error("Login failed", error);
        }
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100 border p-3" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>
        <Form>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
            <div className="text-danger">{emailError}</div>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="mb-3"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
            <div className="text-danger">{passwordError}</div>
          </Form.Group>

          {loginError && (
            <div className="text-danger mb-3">{loginError}</div>
          )}

          <Button
            variant="primary"
            onClick={handleLogin}
            className="d-flex justify-content-center"
          >
            Login
          </Button>
        </Form>

        <div className="text-center mt-3">
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Login;
