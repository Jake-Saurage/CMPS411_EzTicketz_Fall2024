import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Import the CSS file

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = () => {
    fetch('http://localhost:5099/api/techusers')
      .then(response => response.json())
      .then(users => {
        const foundUser = users.find(user => user.username === username && user.password === password);
        if (foundUser) {
          navigate('/');
        } else {
          fetch('http://localhost:5099/api/clients')
            .then(response => response.json())
            .then(clients => {
              const foundClient = clients.find(client => client.email === username && client.phone === password);
              if (foundClient) {
                navigate('/');
              } else {
                setError('Invalid username or password');
              }
            });
        }
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
