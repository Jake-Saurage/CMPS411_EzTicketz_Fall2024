import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from './NavBar'; // Import the NavBar component

const ClientDetails = () => {
  const { id } = useParams(); // Extract the client ID from the URL
  const [client, setClient] = useState(null);
  const [tickets, setTickets] = useState([]); // State to hold the tickets data
  const [error, setError] = useState('');
  const [isHovered, setIsHovered] = useState(false); // Add hover state

  useEffect(() => {
    // Fetch the specific client data from the backend
    fetch(`http://localhost:5099/api/clients/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          setClient(data); // Set the client data if found
        } else {
          setError('Client not found');
        }
      })
      .catch(error => setError('Error fetching client data: ' + error));
  }, [id]);

  useEffect(() => {
    // Fetch the tickets assigned to the client
    fetch(`http://localhost:5099/api/tickets/client/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          setTickets(data); // Set the tickets data
        }
      })
      .catch(error => console.error('Error fetching tickets:', error));
  }, [id]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if (error) {
    return <div style={styles.errorContainer}><p>{error}</p></div>;
  }

  if (!client) {
    return <div style={styles.loadingContainer}><p>Loading client data...</p></div>;
  }

  return (
    <div>
      <NavBar /> {/* Include the NavBar */}
      <div style={styles.container}>
        <h1 style={styles.header}>Client Details</h1>
        <div style={styles.clientCard}>
          <h2 style={styles.clientName}>{client.name}</h2>
          <p style={styles.clientInfo}><strong>Email:</strong> {client.email}</p>
          <p style={styles.clientInfo}><strong>Phone:</strong> {client.phone}</p>
          {client.companyId ? (
            <p style={styles.clientInfo}>
              <strong>Company: </strong> 
              <Link
                to={`/companies/${client.companyId}`}
                style={isHovered ? styles.companyLinkHover : styles.companyLink}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {client.companyName}
              </Link>
            </p>
          ) : (
            <p style={styles.clientInfo}><strong>Company:</strong> No company assigned</p>
          )}
        </div>

        {/* Tickets Section */}
        <div style={styles.ticketsBox}>
          <h2 style={styles.ticketsHeader}>Tickets Assigned to {client.name}</h2>
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
            <p>No tickets assigned to this client.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// CSS styles for the page, similar to CompanyPage
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
    clientCard: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      border: '1px solid #ccc',
    },
    clientName: {
      fontSize: '1.75rem',
      fontWeight: 'bold',
      color: '#0056b3',
      marginBottom: '15px',
    },
    clientInfo: {
      fontSize: '1.1rem',
      marginBottom: '10px',
      color: '#555',
    },
    companyLink: {
      textDecoration: 'none',
      color: '#007bff',
      fontWeight: 'bold',
      transition: 'color 0.3s ease',
    },
    companyLinkHover: {
      textDecoration: 'none',
      color: '#0056b3', // Darker blue on hover
      fontWeight: 'bold',
      transition: 'color 0.3s ease',
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
export default ClientDetails;
