import React from 'react';

import './index.css'; // Importing the CSS file for styling
import img1 from '../assets/ppng.jpg';

const login = () => {
  const handleLogin = () => {
    // Handle login logic here
    console.log('Logging in...'); 
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
        <h1 className="xyz">Login to Your Student Account</h1>
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

export default login;

