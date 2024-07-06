import React from 'react';
import "../Css/Navbar.css";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {

const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);

    navigate("/signup-login")
  };

  return (
    <div className="navbar">
      <div className="navbar-logo">TaskSpark</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        {isAuthenticated && <Link to="/todo">Todo</Link>}
        <Link to="/about">About</Link>
      </div>
      <div className="navbar-signin">
        {isAuthenticated ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/signup-login">
            <button>Sign In</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
