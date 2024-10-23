// TicketDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the ticketId from the URL
import './App.css'; // Import your CSS styling

const TicketDetails = () => {
  const { ticketId } = useParams(); // Get the ticketId from the URL
  const [ticket, setTicket] = useState(null); // State to store the ticket data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to store errors

  useEffect(() => {
    // Fetch the ticket data from the API
    const fetchTicket = async () => {
      try {
        const response = await fetch(`http://localhost:5099/api/tickets/${ticketId}`); // Adjust the API endpoint as needed
        if (!response.ok) {
          throw new Error('Failed to fetch ticket');
        }
        const data = await response.json();
        setTicket(data); // Set the ticket data in state
        setLoading(false); // Set loading to false
      } catch (error) {
        setError(error.message); // Handle errors
        setLoading(false);
      }
    };

    fetchTicket(); // Call the fetch function when the component mounts
  }, [ticketId]); // Re-run this effect if ticketId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!ticket) {
    return <div>No ticket found.</div>;
  }

  return (
    <div className="ticket-details-container">
      <h1>Ticket Details</h1>
      <p><strong>Title:</strong> {ticket.ticketTitle}</p>
      <p><strong>Description:</strong> {ticket.ticketDescription}</p>
      <p><strong>Resolution:</strong> {ticket.resolution}</p>
      <p><strong>Client ID:</strong> {ticket.clientId}</p>
      <p><strong>Tech ID:</strong> {ticket.techId}</p>
      <p><strong>Company ID:</strong> {ticket.companyId}</p>
      <p><strong>Issue ID:</strong> {ticket.issueId}</p>
      <p><strong>Sub-Issue ID:</strong> {ticket.subIssueId}</p>
      <p><strong>Notes:</strong> {ticket.ticketNotes}</p>
      {/* Add any additional fields you want to display */}
    </div>
  );
};

export default TicketDetails;
