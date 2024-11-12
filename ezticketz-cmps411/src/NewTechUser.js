import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './App.css'; // Import the stylesheet

const NewTechUser = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [techLevel, setTechLevel] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Password field
  const [confirmPassword, setConfirmPassword] = useState(''); // Confirm Password field
  const [error, setError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState({
    length: false,
    uppercase: false,
    specialChar: false,
    number: false,
  });

  const navigate = useNavigate(); // Hook to handle navigation

  // Handle email validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle password validation
  const validatePassword = (value) => {
    const length = value.length >= 8;
    const uppercase = /[A-Z]/.test(value);
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const number = /[0-9]/.test(value);

    setPasswordErrors({
      length: !length,
      uppercase: !uppercase,
      specialChar: !specialChar,
      number: !number,
    });
  };

  // Handle submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure all required fields are filled out
    if (!firstName || !lastName || !techLevel || !email || !password || !confirmPassword) {
      setError('Please fill out all fields.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Invalid email format.');
      return;
    }

    if (Object.values(passwordErrors).some((error) => error)) {
      setError('Password must meet all the requirements.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Combine first and last names into the full name
    const name = `${firstName} ${lastName}`;

    // Send data to the backend (create new tech user)
    fetch('http://localhost:5099/api/techusers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name, // Store the full name (first name + last name)
        techLevel,
        email,
        password, // Store password as a string for now
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Tech User created:', data);
        // Reset form
        setFirstName('');
        setLastName('');
        setTechLevel(1);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError('');

        // Redirect to the Technicians page after successful creation
        navigate('/technicians');
      })
      .catch((error) => {
        console.error('Error creating tech user:', error);
        setError('Failed to create tech user. Please try again.');
      });
  };

  return (
    <div className="new-client-container">
      <h1>Create New Tech User</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:
            {firstName === '' && <span className="required-asterisk"> *</span>}
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name:
            {lastName === '' && <span className="required-asterisk"> *</span>}
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Tech Level:
            {techLevel === '' && <span className="required-asterisk"> *</span>}
          </label>
          <select
            className="styled-select" // Add a class for custom styling
            value={techLevel}
            onChange={(e) => setTechLevel(e.target.value)}
            required
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="form-group">
          <label>Email:
            {email === '' && <span className="required-asterisk"> *</span>}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:
            {password === '' && <span className="required-asterisk"> *</span>}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            required
          />
          <ul className="password-requirements">
            {password && passwordErrors.length && <li>At least 8 characters</li>}
            {password && passwordErrors.uppercase && <li>One uppercase letter</li>}
            {password && passwordErrors.specialChar && <li>One special character</li>}
            {password && passwordErrors.number && <li>One number</li>}
          </ul>
        </div>
        <div className="form-group">
          <label>Confirm Password:
            {confirmPassword === '' && <span className="required-asterisk"> *</span>}
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">Create Tech User</button>
      </form>
    </div>
  );
};

export default NewTechUser;
