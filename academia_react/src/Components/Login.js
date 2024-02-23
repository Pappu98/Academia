// Login.js

import React, { useState } from 'react';
import "./Login.css";
import Search from './Search';
import { BrowserRouter as Router, Route, Routes, Link, } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';


const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const { setAuthenticated } = useAuth();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      username: username,
      password: password
    };
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      if (response.ok) {
        // Login successful
        //const data = await response.json();
        // Handle storing tokens or session data
        setIsLoggedIn(true);
        setAuthenticated(true);
        //localStorage.setItem("save",true);
        //setUser(true);
        navigate('/search'); 
        console.log('Success');
        console.log(isLoggedIn);

      } else {
        // Login failed
        setShowError(true);
        console.error('Login failed');
      }
  }
    catch (error) {
    console.error('Error:', error);
}
};

  return (
    <div>
    {!isLoggedIn ? (
      <div>
        <h2>Login</h2>
        <div class="formcontainer">
        <form className= "form1" onSubmit={handleSubmit}>
          <div>
          {showError && (
        <div style={{ color: 'red', margin: '10px 0' }}>
          Login failed. Please check your credentials.
        </div>
      )}
            <div class="container">
  <label for="uname"><strong>Username</strong></label>
  <input
        type="text"
        id="username"
        value={username}
        onChange={handleUsernameChange}
      />
  <label for="psw"><strong>Password</strong></label>
  <input
        type="password"
        id="password"
        value={password}
        onChange={handlePasswordChange}
      />
</div>
          </div>
          <button type="submit">Login</button>
        </form>
        </div>
      </div>
    ) : (
      <p>Redirecting...</p>
    )}
  </div>
);
};

export default Login;