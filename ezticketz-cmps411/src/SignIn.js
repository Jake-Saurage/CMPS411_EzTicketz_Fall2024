import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    setError(''); // Clear any previous errors

    try {
      const response = await fetch('http://localhost:5099/api/authentication/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password: password }),
      });

      console.log("Response Status:", response.status); // Log response status
      if (response.ok) {
        const result = await response.json();
        console.log("Sign-in Successful:", result.message); // Log successful message

        // Check if the user is a client or tech user and navigate accordingly
        if (result.userType === "Client") {
          navigate(`/clients/${result.userId}`);
        } else if (result.userType === "TechUser") {
          navigate(`/techusers/${result.userId}`);
        }
      } else if (response.status === 401) {
        setError('Invalid username or password');
      } else {
        setError('An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="sign-in-form-container">
      <h2>Sign In</h2>
      <div className="input-container">
        <label>
          Email:
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
