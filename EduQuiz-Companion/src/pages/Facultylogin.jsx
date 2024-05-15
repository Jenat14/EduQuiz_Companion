import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import "../Facultylogin.css";
import img1 from '../assets/facultylogin.png';

const Facultylogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const handleLogin = async (event) => {
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

      const userData = await response.json();
      localStorage.setItem('userName', userData.user.Name);
      localStorage.setItem('Id', username);
      window.location.href = "/Facultydash";

    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
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
        <form >
          <div className="form-group">
            <input type="text" id="username" name="username" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)}  />
          </div>
          <div className="form-group">
            <input type="password" id="password" name="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}  />
          </div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button type="submit" onClick={handleLogin} style={{marginTop:"30px"}}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Facultylogin;

