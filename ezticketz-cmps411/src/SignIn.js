import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import useAuth
import './App.css';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = useAuth(); // Get signIn from context

  const handleSignIn = async () => {
    setError(''); // Clear any previous errors

    try {
      const response = await fetch('http://localhost:5099/api/authentication/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password }),
      });

      if (response.ok) {
        const result = await response.json();

        // Store user info in the auth context, including name and userType
        signIn({
          userId: result.userId,
          userType: result.userType,
          name: result.name,
          email: result.email,
        });

        // Store the signed-in user in localStorage as well
        localStorage.setItem('user', JSON.stringify({
          userId: result.userId,
          userType: result.userType,
          email: result.email,
          name: result.name
        }));

        // Navigate based on user type
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
