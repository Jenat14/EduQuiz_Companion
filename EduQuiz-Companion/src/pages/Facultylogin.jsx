import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import "../Facultylogin.css";
import img1 from '../assets/facultylogin.png';

const Facultylogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/facultylogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      // Login successful, handle the response data
      const userData = await response.json();
      console.log('Login successful:', userData);
      // Redirect to the dashboard or whatever page you want
      window.location.href = "/cardpage";

    } catch (error) {
      setErrorMessage(error.message);
      // Clear error message after 3 seconds
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here
    console.log('Forgot password...');
  };

  return (
    <div className="login-container">
      <div className="left-side">
        <img src={img1} alt="Logo" className="logo-image" />
      </div>
      <div className="right-side">
        <b>
        <h1 className="xyz">Login to Your Faculty Account</h1>
        </b>
        <form onClick={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)}  />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}  />
          </div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button type="button" onClick={handleLogin} style={{marginTop:"30px"}}>Login</button>
        </form>
        <div className="forgot-password-link" onClick={handleForgotPassword}>
          <a href="#">Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default Facultylogin;

