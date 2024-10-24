import React, { useState } from 'react';
import './App.css'; // Ensure this file exists with appropriate styles

function Ticket() {
  const [tickets, setTickets] = useState([]);
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketStatus, setTicketStatus] = useState('Open');
  const [assignedTech, setAssignedTech] = useState('');
  const [client, setClient] = useState('');
  const [issueType, setIssueType] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page

  const [titleSearchTerm, setTitleSearchTerm] = useState('');
  const [techSearchTerm, setTechSearchTerm] = useState('');
  const [clientSearchTerm, setClientSearchTerm] = useState('');
  const [issueSearchTerm, setIssueSearchTerm] = useState('');

  // Function to add a new ticket
  const handleAddTicket = () => {
    if (!ticketTitle || !assignedTech || !client || !issueType || !ticketDescription) {
      alert('Please fill in all required fields.');
      return;
    }

    const newTicket = {
      title: ticketTitle,
      description: ticketDescription,
      status: ticketStatus,
      assignedTech,
      client,
      issueType,
      createdAt: new Date().toLocaleString(),
    };

    setTickets([...tickets, newTicket]);
    setTicketTitle('');
    setTicketDescription('');
    setTicketStatus('Open');
    setAssignedTech('');
    setClient('');
    setIssueType('');
  };

  // Sorting function
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const filteredTickets = tickets.filter((ticket) => {
    return (
      ticket.title.toLowerCase().includes(titleSearchTerm.toLowerCase()) &&
      ticket.assignedTech.toLowerCase().includes(techSearchTerm.toLowerCase()) &&
      ticket.client.toLowerCase().includes(clientSearchTerm.toLowerCase()) &&
      ticket.issueType.toLowerCase().includes(issueSearchTerm.toLowerCase())
    );
  });

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

  // Highlighting function
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

      {/* Ticket Form */}
      <div className="ticket-form-container">
        <h2>Create a Ticket</h2>

        <input
          type="text"
          placeholder="Ticket Title*"
          value={ticketTitle}
          onChange={(e) => setTicketTitle(e.target.value)}
          className="form-input"
          required
        />
        <input
          type="text"
          placeholder="Assigned Tech*"
          value={assignedTech}
          onChange={(e) => setAssignedTech(e.target.value)}
          className="form-input"
          required
        />
        <input
          type="text"
          placeholder="Client*"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          className="form-input"
          required
        />
        <input
          type="text"
          placeholder="Issue Type*"
          value={issueType}
          onChange={(e) => setIssueType(e.target.value)}
          className="form-input"
          required
        />
        <textarea
          placeholder="Ticket Description*"
          value={ticketDescription}
          onChange={(e) => setTicketDescription(e.target.value)}
          className="form-textarea"
          required
        />

        <select
          value={ticketStatus}
          onChange={(e) => setTicketStatus(e.target.value)}
          className="form-select"
        >
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Closed">Closed</option>
        </select>

        <button onClick={handleAddTicket} className="form-button">
          Add Ticket
        </button>
      </div>

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
                    <td>{highlightText(ticket.title, titleSearchTerm)}</td>
                    <td>{highlightText(ticket.assignedTech, techSearchTerm)}</td>
                    <td>{highlightText(ticket.client, clientSearchTerm)}</td>
                    <td>{highlightText(ticket.issueType, issueSearchTerm)}</td>
                    <td>{ticket.createdAt}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Dropdown for items per page (now placed under the table) */}
          <div className="items-per-page">
            <label htmlFor="itemsPerPage">Tickets per page: </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1); // Reset to the first page when items per page changes
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
