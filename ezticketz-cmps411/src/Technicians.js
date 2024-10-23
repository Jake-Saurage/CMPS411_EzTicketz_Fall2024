import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './App.css'; // Import the stylesheet

const Technicians = () => {
  const [techUsers, setTechUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch tech users from the API
    const fetchTechUsers = async () => {
      try {
        const response = await fetch('http://localhost:5099/api/techusers'); // Adjust the API URL
        if (!response.ok) {
          throw new Error('Failed to fetch tech users');
        }
        const data = await response.json();
        setTechUsers(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTechUsers();
  }, []);

  const handleCreateTechUser = () => {
    // Navigate to the /createTechUser route
    navigate('/createTechUser');
  };

  const handleTechUserClick = (id) => {
    // Navigate to the tech user details page when the name is clicked
    navigate(`/techusers/${id}`);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="technicians-container">
      <h1>List of Technicians</h1>
      {techUsers.length > 0 ? (
        <ul className="tech-users-list">
          {techUsers.map((techUser) => (
            <li key={techUser.id} className="tech-user-item">
              <div className="tech-user-row">
                {/* Clicking on the tech user name navigates to the details page */}
                <span 
                  className="tech-user-name" 
                  onClick={() => handleTechUserClick(techUser.id)}
                >
                  {techUser.name}
                </span>
                <span className="tech-user-email">{techUser.email}</span>
                <span className="tech-user-level">Level: {techUser.techLevel}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No technicians found.</p>
      )}

      {/* Button to navigate to the NewTechUser page */}
      <button onClick={handleCreateTechUser} className="create-tech-user-button">
        Create New Tech User
      </button>
    </div>
  );
};

export default Technicians;
