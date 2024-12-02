import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';


const TicketsList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [titleSearchTerm, setTitleSearchTerm] = useState('');
  const [techSearchTerm, setTechSearchTerm] = useState('');
  const [clientSearchTerm, setClientSearchTerm] = useState('');
  const [issueSearchTerm, setIssueSearchTerm] = useState('');


  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default to 5 items per page


  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('http://localhost:5099/api/tickets');
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


  if (loading) return <div>Loading tickets...</div>;
  if (error) return <div>{error}</div>;


  // Filter tickets based on search terms
  const filteredTickets = tickets.filter((ticket) => {
    const title = ticket.ticketTitle?.toLowerCase() || '';
    const tech = ticket.techName?.toLowerCase() || '';
    const client = ticket.clientName?.toLowerCase() || '';
    const issue = ticket.issueTypeName?.toLowerCase() || '';


    return (
      title.includes(titleSearchTerm.toLowerCase()) &&
      tech.includes(techSearchTerm.toLowerCase()) &&
      client.includes(clientSearchTerm.toLowerCase()) &&
      issue.includes(issueSearchTerm.toLowerCase())
    );
  });


  // Calculate pagination indexes
  const indexOfLastTicket = currentPage * itemsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - itemsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);


  // Pagination handlers
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);


  return (
    <div className="tickets-list-container">
      <h1>Global Tickets</h1>


      {/* Search Inputs */}
      <div className="search-filters">
        <input type="text" placeholder="Search Title" value={titleSearchTerm} onChange={(e) => setTitleSearchTerm(e.target.value)} />
        <input type="text" placeholder="Search Tech" value={techSearchTerm} onChange={(e) => setTechSearchTerm(e.target.value)} />
        <input type="text" placeholder="Search Client" value={clientSearchTerm} onChange={(e) => setClientSearchTerm(e.target.value)} />
        <input type="text" placeholder="Search Issue" value={issueSearchTerm} onChange={(e) => setIssueSearchTerm(e.target.value)} />
      </div>


      {/* Ticket Table */}
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
          {currentTickets.length === 0 ? (
            <tr>
              <td colSpan="5">No tickets found.</td>
            </tr>
          ) : (
            currentTickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>
                  <Link to={`/tickets/${ticket.id}`} className="ticket-link">{ticket.ticketTitle}</Link>
                </td>
                <td>
                  <Link to={`/techusers/${ticket.techId}`} className="tech-link">{ticket.techName}</Link>
                </td>
                <td>
                  <Link to={`/clients/${ticket.clientId}`} className="client-link">{ticket.clientName}</Link>
                </td>
                <td>{ticket.issueTypeName}</td>
                <td>{new Date(ticket.creationDate).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>


      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>


      {/* Items Per Page Dropdown */}
      <div className="items-per-page">
        <label>Tickets per page:</label>
        <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>
    </div>
  );
};


export default TicketsList;





