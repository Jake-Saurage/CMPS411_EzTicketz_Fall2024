import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './App.css'; 
import NavBar from './NavBar'; // Import the NavBar component

const TicketDetails = () => {
  const { ticketId } = useParams(); 
  const [ticket, setTicket] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch(`http://localhost:5099/api/tickets/${ticketId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch ticket');
        }
        const data = await response.json();
        setTicket(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!ticket) {
    return <div className="no-ticket">No ticket found.</div>;
  }

  return (
    <div>
      <NavBar /> {/* Render the NavBar component */}
      
      <div className="ticket-details-container">
        <div className="ticket-title-container">
          <h1 className="ticket-title">{ticket.ticketTitle}</h1>
        </div>

        <div className="ticket-main-content">
          <div className="ticket-description-container">
            <p>{ticket.ticketDescription}</p>
          </div>

          <div className="ticket-side-container">
            <div className="client-container">
              <p><strong>Client: </strong> 
                <Link to={`/clients/${ticket.clientId}`} className="details-link">
                  {ticket.clientName}
                </Link>
              </p>
            </div>

            <div className="tech-container">
              <p><strong>Tech User: </strong> 
                <Link to={`/techusers/${ticket.techId}`} className="details-link">
                  {ticket.techName}
                </Link>
              </p>
            </div>

            <div className="issue-info-container">
              <div className="issue-type">
                <p><strong>Issue Type: </strong> {ticket.issueId}</p>
              </div>

              <div className="sub-issue-type">
                <p><strong>Sub-Issue Type: </strong> {ticket.subIssueId}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="ticket-notes-container">
          <h2>Notes</h2>
          <p>{ticket.ticketNotes || 'No notes available'}</p>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;