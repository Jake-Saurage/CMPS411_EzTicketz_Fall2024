import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom'; // Import to get URL search parameters
import './App.css'; // Import the stylesheet

const NewClient = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState(''); // Password field
  const [error, setError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState({
    length: true,
    uppercase: true,
    specialChar: true,
    number: true,
  });

  const [searchParams] = useSearchParams(); // Hook to get URL search parameters
  const companyId = searchParams.get('companyId'); // Get the companyId from the URL

  // Handle email validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle phone formatting and validation (cap to 10 digits)
  const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, ''); // Remove non-numeric characters
    const trimmed = cleaned.substring(0, 10); // Limit to 10 digits
    const match = trimmed.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]})-${match[2]}-${match[3]}`;
    }
    return trimmed;
  };

  // Handle phone input change
  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhone(e.target.value);
    setPhone(formattedPhone);
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

    if (!firstName || !lastName || !email || !phone || !password || !companyId) {
      setError('Please fill out all fields.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Invalid email format.');
      return;
    }

    const formattedPhone = phone;
    if (formattedPhone.replace(/\D/g, '').length !== 10) {
      setError('Phone number must be exactly 10 digits.');
      return;
    }

    if (Object.values(passwordErrors).some((error) => error)) {
      setError('Password must meet all the requirements.');
      return;
    }

    // Combine first and last name
    const fullName = `${firstName} ${lastName}`;

    // Send data to the backend (create new client user)
    fetch('http://localhost:5099/api/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: fullName,
        email,
        phone: formattedPhone,
        password, // Store password as a string for now
        companyId: companyId, // Use companyId from the URL
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Client created:', data);
        // Reset form
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setError('');
      })
      .catch((error) => {
        console.error('Error creating client:', error);
        setError('Failed to create client. Please try again.');
      });
  };

  return (
    <div className="new-client-container">
      <h1>Create New Client User</h1>
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
          <label>Phone:
            {phone === '' && <span className="required-asterisk"> *</span>}
          </label>
          <input
            type="text"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="(xxx)-xxx-xxxx"
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
            {passwordErrors.length && <li>At least 8 characters</li>}
            {passwordErrors.uppercase && <li>One uppercase letter</li>}
            {passwordErrors.specialChar && <li>One special character</li>}
            {passwordErrors.number && <li>One number</li>}
          </ul>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">Create Client</button>
      </form>
    </div>
  );
};

export default NewClient;
