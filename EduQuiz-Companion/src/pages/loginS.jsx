import React, { useState } from 'react';
import "../logins.css";
import img1 from '../assets/student_login.jpg';

const LoginStudent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/login', {
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
  
      // Store the user's name in local storage
      localStorage.setItem('userName', userData.user.Name);
      localStorage.setItem('studentId', username)
      console.log(localStorage.getItem('studentId'))
      
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
    <div className="login-container"  styles={{height:"100vh"}}>
      <div className="left-side">
        <img src={img1} alt="Logo" className="logo-image" />
      </div>
      <div className="right-side">
        <b>
        <h2 className="xyz">Login to Your Student Account</h2>
        </b>
        <form>
          <div className="form-group" style={{marginBottom:"30px"}}>
            <input type="text" id="username" name="username" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)}  />
          </div>
          <div className="form-group" style={{marginBottom:"30px"}}>
            <input type="password" id="password" name="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}  />
          </div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button type="submit" style={{marginTop:"30px"}} onClick={handleLogin}>Login</button>
        </form>
        <div className="forgot-password-link" onClick={handleForgotPassword}>
          <a href="#">Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginStudent;
