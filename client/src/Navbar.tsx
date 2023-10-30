import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from './features/userSlice';
import logo from '../src/Assests/logo-blue.png'; 

import { RootState } from "./features/store";

const NavBar: React.FC = () => {
  //without redux
 const userFound=localStorage.getItem("accessToken")

  //only redux
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const navigate=useNavigate()

  const handleLogout = () => {
    // Dispatch the logout action to clear user data in Redux
    dispatch(logout());
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="nav-bar">
      <Navbar expand="lg" bg="dark" variant="light" className="justify-content-start">
        <Link to="/" className="text-decoration-none">
          <div className="ps-2">
          <Navbar.Brand>
  <Link to="/" className="text-decoration-none">
    
      <img src={logo} alt="Logo" width={60} /> {/* Add your logo here */}
 
  </Link>
</Navbar.Brand>
          </div>
        </Link>
        <div className="p-2 ms-auto ">
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
          />
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ms-3">
            
          </Nav>
          <Nav className="align-items-start">
            {userFound || user ? (
              <div className="d-flex align-items-center">
         
                <button
                  className="btn btn-link nav-link p-3 text-danger"
                  onClick={handleLogout}
                >
                  <strong>Logout</strong>
                </button>
              </div>
            ) : (
              <Nav.Link as={NavLink} to="/" className="nav-link me-5 ms-3 text-white">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
