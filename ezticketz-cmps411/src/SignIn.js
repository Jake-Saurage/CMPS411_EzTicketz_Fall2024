import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleSignIn = () => {
    // Fetch Tech Users from your API or use existing user data
    fetch('http://localhost:5000/api/techusers')
      .then(response => response.json())
      .then(users => {
        // Check if the username and password match any Tech User
        const foundUser = users.find(user => user.username === username && user.password === password);
if (foundUser) {
          // Redirect to homepage for Tech Users
          navigate('/home'); // Use navigate instead of history.push
        } else {
          // If not found in Tech Users, fetch Client Users
          fetch('http://localhost:5000/api/clients')
            .then(response => response.json())
            .then(clients => {
              const foundClient = clients.find(client => client.email === username && client.phone === password);

              if (foundClient) {
                // Redirect to homepage for Clients
                navigate('/home'); // Use navigate instead of history.push
              } else {
                // Set error if no user is found
                setError('Invalid username or password');
              }
            });
        }
      });
  };

  return (
    <div>
      <h2>Sign In</h2>
      <div>
        <label>
          Username / Email:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default SignIn;