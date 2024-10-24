import React, { useState, useEffect } from 'react';
import './App.css'; // Ensure this file exists with appropriate styles

function Ticket() {
  const [tickets, setTickets] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [titleSearchTerm, setTitleSearchTerm] = useState('');
  const [techSearchTerm, setTechSearchTerm] = useState('');
  const [clientSearchTerm, setClientSearchTerm] = useState('');
  const [issueSearchTerm, setIssueSearchTerm] = useState('');

  // Fetch tickets from the API
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('http://localhost:5099/api/tickets'); // Your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch tickets');
        }
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  // Sorting function
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Search and filter the tickets
  const filteredTickets = tickets.filter((ticket) => {
    const title = ticket.title ? ticket.title.toLowerCase() : '';
    const tech = ticket.assignedTech ? ticket.assignedTech.toLowerCase() : '';
    const client = ticket.client ? ticket.client.toLowerCase() : '';
    const issue = ticket.issueType ? ticket.issueType.toLowerCase() : '';

    return (
      title.includes(titleSearchTerm.toLowerCase()) &&
      tech.includes(techSearchTerm.toLowerCase()) &&
      client.includes(clientSearchTerm.toLowerCase()) &&
      issue.includes(issueSearchTerm.toLowerCase())
    );
  });

  // Sorting based on current configuration
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  // Pagination logic
  const indexOfLastTicket = currentPage * itemsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - itemsPerPage;
  const currentTickets = sortedTickets.slice(indexOfFirstTicket, indexOfLastTicket);
  const totalPages = Math.ceil(sortedTickets.length / itemsPerPage);

  // Pagination controls
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Highlight search terms
  const highlightText = (text, term) => {
    if (!term) return text;

    const parts = text.split(new RegExp(`(${term})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <span key={index} className="highlight">{part}</span>
      ) : part
    );
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <h1>EZ Ticketz</h1>
        <p>Create and manage your tickets with ease!</p>
      </header>

      {/* Ticket List */}
      {tickets.length > 0 && (
        <div className="ticket-list">
          <h2>Your Tickets</h2>

          {/* Ticket Table */}
          <table className="ticket-table">
            <thead>
              <tr>
                <th>
                  Ticket Title <input
                    type="text"
                    placeholder="Search Title"
                    value={titleSearchTerm}
                    onChange={(e) => setTitleSearchTerm(e.target.value)}
                    className="form-input titleSearch"
                  />
                </th>
                <th>
                  Assigned Tech <input
                    type="text"
                    placeholder="Search Tech"
                    value={techSearchTerm}
                    onChange={(e) => setTechSearchTerm(e.target.value)}
                    className="form-input techSearch"
                  />
                </th>
                <th>
                  Client <input
                    type="text"
                    placeholder="Search Client"
                    value={clientSearchTerm}
                    onChange={(e) => setClientSearchTerm(e.target.value)}
                    className="form-input clientSearch"
                  />
                </th>
                <th>
                  Issue Type <input
                    type="text"
                    placeholder="Search Issue"
                    value={issueSearchTerm}
                    onChange={(e) => setIssueSearchTerm(e.target.value)}
                    className="form-input issueSearch"
                  />
                </th>
                <th onClick={() => handleSort('createdAt')}>
                  Creation Date {sortConfig.key === 'createdAt' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                </th>
              </tr>
            </thead>
            <tbody>
              {currentTickets.length === 0 ? (
                <tr>
                  <td colSpan="5">No tickets found.</td>
                </tr>
              ) : (
                currentTickets.map((ticket, index) => (
                  <tr key={index}>
                    <td>{highlightText(ticket.title || '', titleSearchTerm)}</td>
                    <td>{highlightText(ticket.assignedTech || '', techSearchTerm)}</td>
                    <td>{highlightText(ticket.client || '', clientSearchTerm)}</td>
                    <td>{highlightText(ticket.issueType || '', issueSearchTerm)}</td>
                    <td>{ticket.createdAt}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Dropdown for items per page */}
          <div className="items-per-page">
            <label htmlFor="itemsPerPage">Tickets per page: </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="form-select"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>

          {/* Pagination controls */}
          <div className="pagination-controls">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Ticket;
