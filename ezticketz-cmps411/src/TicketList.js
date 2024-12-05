import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import 'boxicons/css/boxicons.min.css'; // Import Boxicons if using npm

const TicketsList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [titleSearchTerm, setTitleSearchTerm] = useState('');
  const [techSearchTerm, setTechSearchTerm] = useState('');
  const [clientSearchTerm, setClientSearchTerm] = useState('');
  const [issueSearchTerm, setIssueSearchTerm] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [sortConfig, setSortConfig] = useState({
    key: 'ticketTitle',
    direction: 'asc',
  });

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

  const sortedTickets = filteredTickets.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const indexOfLastTicket = currentPage * itemsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - itemsPerPage;
  const currentTickets = sortedTickets.slice(indexOfFirstTicket, indexOfLastTicket);
  const totalPages = Math.ceil(sortedTickets.length / itemsPerPage);

  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const handleSort = (column) => {
    let direction = 'asc';
    if (sortConfig.key === column && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: column, direction });
  };

  const getSortIndicator = (column) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === 'asc' ? '↑' : '↓';
    }
    return '';
  };

  return (
    <div className="tickets-list-container">
      <h1>Global Tickets</h1>

      <div className="search-filters">
        <input type="text" placeholder="Search Title" value={titleSearchTerm} onChange={(e) => setTitleSearchTerm(e.target.value)} />
        <input type="text" placeholder="Search Tech" value={techSearchTerm} onChange={(e) => setTechSearchTerm(e.target.value)} />
        <input type="text" placeholder="Search Client" value={clientSearchTerm} onChange={(e) => setClientSearchTerm(e.target.value)} />
        <input type="text" placeholder="Search Issue" value={issueSearchTerm} onChange={(e) => setIssueSearchTerm(e.target.value)} />
      </div>

      <table className="tickets-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('ticketTitle')}>
              Ticket Title {getSortIndicator('ticketTitle')}
            </th>
            <th onClick={() => handleSort('techName')}>
              Assigned Tech {getSortIndicator('techName')}
            </th>
            <th onClick={() => handleSort('clientName')}>
              Client {getSortIndicator('clientName')}
            </th>
            <th onClick={() => handleSort('issueTypeName')}>
              Issue Type {getSortIndicator('issueTypeName')}
            </th>
            <th onClick={() => handleSort('creationDate')}>
              Creation Date {getSortIndicator('creationDate')}
            </th>
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
                  <Link to={`/tickets/${ticket.id}`} className="ticket-link">
                    {ticket.ticketTitle}
                    <i className="bx bx-link-external" title='Open Ticket Details'></i> {/* Boxicon for external link */}
                  </Link>
                </td>
                <td>
                  <Link to={`/techusers/${ticket.techId}`} className="tech-link">{ticket.techName}
                  <i className="bx bx-link-external" title="Open Tech User Details" ></i> {/* Boxicon for external link */}
                  </Link>
                </td>
                <td>
                  <Link to={`/clients/${ticket.clientId}`} className="client-link">{ticket.clientName}
                  <i className="bx bx-link-external" title='Open Client Details'></i> {/* Boxicon for external link */}
                  </Link>
                </td>
                <td>{ticket.issueTypeName}</td>
                <td>{new Date(ticket.creationDate).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>

      <div className="items-per-page">
        <label>Tickets per page:</label>
        <select
          value={itemsPerPage}
          onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
          className="items-per-page-select"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={25}>25</option>
        </select>
      </div>

      <style>
        {`

  .tickets-list-container {
      margin: 40px auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      margin-top: 5%;
    }

          th {
            cursor: pointer;
            user-select: none;
          }

          th:hover {
            text-decoration: underline;
          }

          .items-per-page {
            margin-top: 20px;
          }

          .items-per-page-select {
            padding: 8px;
            margin-left: 5px;
            font-size: 16px;
            border-radius: 5px;
            border: 1px solid #ccc;
            transition: background-color 0.3s, border-color 0.3s;
          }

          .items-per-page-select:hover {
              border-color: #007BFF;

          }

          .items-per-page-select:focus {
            outline: none;
            border-color: #007BFF;
            box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
          }
        `}
      </style>
    </div>
  );
};

export default TicketsList;
