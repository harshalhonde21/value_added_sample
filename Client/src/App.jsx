import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios'; 
import Navbar from './Components/Navbar';  
import Home from './Pages/Home';
import About from './Pages/About';
import Todo from './Pages/Todo';
import Signup from './Pages/Signup';
import { Toaster } from "react-hot-toast";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5500/api/v1/user/isLogin', {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.data.isLogin) {
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error('Authentication check failed:', error);
        }
      }
    };

    checkAuth();
  }, []); 

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        {isAuthenticated ? (
          <Route path="/todo" element={<Todo />} />
        ) : (
          <Route path="/todo" element={<Navigate to="/signup-login" />} />
        )}
        <Route path="/about" element={<About />} />
        <Route
          path="/signup-login"
          element={<Signup isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Toaster position="top-left" reverseOrder={false} />
    </div>
  );
}

export default App;
