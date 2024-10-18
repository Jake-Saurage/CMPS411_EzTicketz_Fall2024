import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Import the CSS file

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = () => {
    const isTechUser = username.includes('@') ? false : true; // Simple logic to check if it's a tech user or client

    // Determine the API endpoint based on user type
    const apiEndpoint = isTechUser
      ? 'http://localhost:5099/api/auth/techuser-login'
      : 'http://localhost:5099/api/auth/client-login';

    // Prepare login data based on user type
    const loginData = isTechUser
      ? { username, password }  // For tech users
      : { email: username, password: password };  

    // Send login request to the appropriate API
    fetch(apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            console.error('Error:', response.status, err);  // Log the status and error details
            throw new Error('Invalid username or password');
          });
        }
        return response.json();  // Parse the response as JSON
      })
      .then(data => {
        // Store the JWT token in local storage
        localStorage.setItem('token', data.token);
        navigate('/');  // Redirect to home page or dashboard
      })
      .catch(error => {
        console.log(error); // Log the error to inspect it
        setError(error.message);  
      });
  };

  return (
    <div className="sign-in-form-container">
      <h2>Sign In</h2>
      <div className="input-container">
        <label>
          Username / Email:
          <input
            type="text"
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Password:
          <input
            type="password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button className="submit-button" onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default SignIn;
