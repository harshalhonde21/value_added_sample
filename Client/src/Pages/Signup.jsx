import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import "../Css/Signup.css"; 
import toast from "react-hot-toast";

const Signup = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate(); 
  const [isLogin, setIsLogin] = useState(true); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAuthenticated) {
    navigate('/todo');
    return null; 
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = { name, email, password };
      let response;
      if (isLogin) {
        response = await axios.post('http://localhost:5500/api/v1/user/login', userData);
        toast.success("Login successful!");
        setError("Login successful!");
      } else {
        response = await axios.post('http://localhost:5500/api/v1/user/register', userData);
        toast.success("Signup successful!");
        
        setError("Signup successful!");
      }
      const { token } = response.data;
      localStorage.setItem('token', token); 

      setName("");
      setEmail("");
      setPassword("");
      setError("");
      setIsAuthenticated(true); 
      navigate('/todo');
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      } else if (error.request) {
        setError("Network error occurred. Please try again.");
        toast.error("Network error occurred. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="home">
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <div className="glass-structure">
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input 
              type="text" 
              placeholder="Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          )}
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit" className="cta-button">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
        {error && <p style={{color:'red', fontFamily:'Montserrat', fontWeight:'800', fontSize:'25px'}} className="error-message">{error}</p>}
        <p onClick={toggleForm} className="toggle-form">
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
        </p>
      </div>
    </div>
  );
}

export default Signup;
