import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './App.css'; // Ensure this file exists with appropriate styles

const TicketsList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('http://localhost:5099/api/tickets'); // Your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch tickets');
        }
        const data = await response.json();
        setTickets(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setError('Failed to load tickets. Please try again later.');
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return <div className="loading-message">Loading tickets...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="tickets-list-container">
      <h1>Global Tickets</h1>
      <table className="tickets-table">
        <thead>
          <tr>
            <th>Ticket Title</th>
            <th>Assigned Tech</th>
            <th>Client</th>
            <th>Issue Type</th>
            <th>Creation Date</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length === 0 ? (
            <tr>
              <td colSpan="5">No tickets available.</td>
            </tr>
          ) : (
            tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>
                  <Link to={`/companies/${ticket.companyId}`} className="ticket-link">
                    {ticket.ticketTitle}
                  </Link>
                </td>
                <td>
                  <Link to={`/techusers/${ticket.techId}`} className="tech-link">
                    {ticket.techName}
                  </Link>
                </td>
                <td>
                  <Link to={`/clients/${ticket.clientId}`} className="client-link">
                    {ticket.clientName}
                  </Link>
                </td>
                <td>{ticket.issueTypeName}</td>
                <td>{new Date(ticket.creationDate).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TicketsList;
