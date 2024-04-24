import React from 'react';
import '../logins.css';
import img1 from '../assets/student_login.jpg';

const LoginStudent = () => {
  const handleLogin = () => {
    // Handle login logic here
    console.log('Logging in...'); 
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here
    console.log('Forgot password...');
  };

  return (
    <div className="login-container" styles={{height:"100vh"}}>
      <div className="left-side">
        <img src={img1} alt="Logo" className="logo-image" />
      </div>
      <div className="right-side">
        <b>
          <h2 className="xyz">Login to Your Student Account</h2>
        </b>
        <form onSubmit={handleLogin}>
          <div className="form-group" style={{marginBottom:"30px"}}>
            <input type="text" id="username" name="username" placeholder="Enter your username" />
          </div>
          <div className="form-group" style={{marginBottom:"30px"}}>
            <input type="password" id="password" name="password" placeholder="Enter your password" />
          </div>
          <button type="submit" style={{marginTop:"30px"}}>Login</button>
        </form>
        <div className="forgot-password-link" onClick={handleForgotPassword}>
          <a href="#">Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginStudent;
