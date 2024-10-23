import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const TechUserDetails = () => {
  const { id } = useParams(); // Extract the tech user ID from the URL
  const [techUser, setTechUser] = useState(null);
  const [tickets, setTickets] = useState([]); // State to hold the tickets data
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the specific tech user data from the backend
    fetch(`http://localhost:5099/api/techusers/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          setTechUser(data); // Set the tech user data if found
        } else {
          setError('Tech User not found');
        }
      })
      .catch(error => setError('Error fetching tech user data: ' + error));
  }, [id]);

  useEffect(() => {
    // Fetch the tickets assigned to the tech user
    fetch(`http://localhost:5099/api/tickets/techuser/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          setTickets(data); // Set the tickets data
        }
      })
      .catch(error => console.error('Error fetching tickets:', error));
  }, [id]);

  if (error) {
    return <div style={styles.errorContainer}><p>{error}</p></div>;
  }

  if (!techUser) {
    return <div style={styles.loadingContainer}><p>Loading tech user data...</p></div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Tech User Details</h1>
      <div style={styles.techUserCard}>
        <h2 style={styles.techEmail}>{techUser.name}</h2>
        <p style={styles.techUserInfo}><strong>Email:</strong> {techUser.email}</p>
        <p style={styles.techUserInfo}><strong>Tech Level:</strong> {techUser.techLevel}</p>
        {/* Add any additional tech user details here */}
      </div>

      {/* Tickets Section */}
      <div style={styles.ticketsBox}>
        <h2 style={styles.ticketsHeader}>Tickets Assigned to {techUser.name}</h2>
        {tickets.length > 0 ? (
          <ul style={styles.ticketsList}>
            {tickets.map(ticket => (
              <li key={ticket.id} style={styles.ticketItem}>
                <p><strong>Ticket ID:</strong> {ticket.id}</p>
                <p><strong>Description:</strong> {ticket.description}</p>
                <p><strong>Status:</strong> {ticket.status}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tickets assigned to this tech user.</p>
        )}
      </div>
    </div>
  );
};

// CSS styles for the page, similar to ClientDetails page
const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontSize: '2rem',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },
  techUserCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    border: '1px solid #ccc',
  },
  techEmail: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    color: '#0056b3',
    marginBottom: '15px',
  },
  techUserInfo: {
    fontSize: '1.1rem',
    marginBottom: '10px',
    color: '#555',
  },
  errorContainer: {
    textAlign: 'center',
    padding: '20px',
    color: 'red',
    fontWeight: 'bold',
  },
  loadingContainer: {
    textAlign: 'center',
    padding: '20px',
    color: '#555',
  },
  ticketsBox: {
    marginTop: '30px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    border: '1px solid #ccc',
  },
  ticketsHeader: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '20px',
  },
  ticketsList: {
    listStyleType: 'none',
    paddingLeft: '0',
  },
  ticketItem: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    marginBottom: '10px',
  },
};

export default TechUserDetails;
