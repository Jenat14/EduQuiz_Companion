import React from 'react';
import { useNavigate } from "react-router-dom";

import "./Facultylogin.css";
import img1 from './assets/fac.jpg';

const Facultylogin = () => {
  
  const navigate = useNavigate();
  const handleLogin = () => {
    // Handle login logic here
    console.log('Logging in...'); 
    navigate("/facultydash");
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
            <input type="text" id="username" name="username" placeholder="Enter your username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" />
          </div>
          <button type="button" onClick={handleLogin}>Login</button>
        </form>
        <div className="forgot-password-link" onClick={handleForgotPassword}>
          <a href="#">Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default Facultylogin;

