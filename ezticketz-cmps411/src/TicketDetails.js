import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './App.css'; 
import NavBar from './NavBar';

const TicketDetails = () => {
  const { ticketId } = useParams(); 
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [issueTypeName, setIssueTypeName] = useState('');
  const [subIssueTypeName, setSubIssueTypeName] = useState('');
  const [issueTypes, setIssueTypes] = useState([]);
  const [subIssueTypes, setSubIssueTypes] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [techSuggestions, setTechSuggestions] = useState([]);
  const [clientSuggestions, setClientSuggestions] = useState([]);
  const [techSearch, setTechSearch] = useState('');
  const [clientSearch, setClientSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    ticketTitle: '',
    ticketDescription: '',
    issueId: '',
    subIssueId: '',
    clientId: '',
    companyId: '',
    techId: ''
  });

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch(`http://localhost:5099/api/tickets/${ticketId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch ticket');
        }
        const data = await response.json();
        setTicket(data);
        setEditData({
          ticketTitle: data.ticketTitle,
          ticketDescription: data.ticketDescription,
          issueId: data.issueId,
          subIssueId: data.subIssueId,
          clientId: data.clientId,
          companyId: data.companyId,
          techId: data.techId
        });

        if (data.issueId) {
          const issueResponse = await fetch(`http://localhost:5099/api/issuetypes/${data.issueId}`);
          if (issueResponse.ok) {
            const issueData = await issueResponse.json();
            setIssueTypeName(issueData.issueTypeName);
          }
        }

        if (data.subIssueId) {
          const subIssueResponse = await fetch(`http://localhost:5099/api/subissuetypes/${data.subIssueId}`);
          if (subIssueResponse.ok) {
            const subIssueData = await subIssueResponse.json();
            setSubIssueTypeName(subIssueData.subIssueName);
          }
        }

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    const fetchIssueTypes = async () => {
      try {
        const response = await fetch('http://localhost:5099/api/issuetypes');
        if (!response.ok) {
          throw new Error('Failed to fetch issue types');
        }
        const data = await response.json();
        setIssueTypes(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSubIssueTypes = async () => {
      try {
        const response = await fetch('http://localhost:5099/api/subissuetypes');
        if (!response.ok) {
          throw new Error('Failed to fetch sub-issue types');
        }
        const data = await response.json();
        setSubIssueTypes(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCompanies = async () => {
      try {
        const response = await fetch('http://localhost:5099/api/company');
        if (!response.ok) {
          throw new Error('Failed to fetch companies');
        }
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTicket();
    fetchIssueTypes();
    fetchSubIssueTypes();
    fetchCompanies();
  }, [ticketId]);

  const fetchTechSuggestions = async (searchTerm) => {
    try {
      const response = await fetch('http://localhost:5099/api/techusers');
      if (!response.ok) {
        throw new Error('Failed to fetch tech users');
      }
      const data = await response.json();
      setTechSuggestions(
        data.filter((tech) => tech.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const fetchClientSuggestions = async (searchTerm, companyId) => {
    if (!companyId) return;
    try {
      const response = await fetch('http://localhost:5099/api/clients');
      if (!response.ok) {
        throw new Error('Failed to fetch clients');
      }
      const data = await response.json();
      setClientSuggestions(
        data.filter((client) => 
          client.companyId === Number(companyId) &&
          client.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
    if (name === 'clientSearch') fetchClientSuggestions(value, editData.companyId);
    if (name === 'techSearch') fetchTechSuggestions(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5099/api/tickets/${ticketId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: ticketId, ...editData })
      });
      if (!response.ok) {
        throw new Error('Failed to update ticket');
      }
      setIsEditing(false);
      navigate(0); // Refresh the page to show updated data
    } catch (error) {
      console.error('Error updating ticket:', error);
      setError('Failed to update ticket');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!ticket) return <div className="no-ticket">No ticket found.</div>;

  return (
    <div>
      <NavBar />
      
      <div className="ticket-details-container">
        <div className="ticket-title-container">
          <h1 className="ticket-title">{ticket.ticketTitle}</h1>
          {!isEditing && <button onClick={handleEditClick} className="edit-button">Edit Ticket</button>}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="ticket-edit-form">
            <label>
              Ticket Title
              <input type="text" name="ticketTitle" value={editData.ticketTitle} onChange={handleChange} />
            </label>
            <label>
              Ticket Description
              <textarea name="ticketDescription" value={editData.ticketDescription} onChange={handleChange} />
            </label>
            <label>
              Company
              <select name="companyId" value={editData.companyId} onChange={handleChange}>
                <option value="">Select a Company</option>
                {companies.map(company => (
                  <option key={company.id} value={company.id}>
                    {company.companyName}
                  </option>
                ))}
              </select>
            </label>

            {/* Client search field */}
            <label>
              Client
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  name="clientSearch"
                  value={clientSearch}
                  onChange={(e) => {
                    setClientSearch(e.target.value);
                    fetchClientSuggestions(e.target.value, editData.companyId);
                  }}
                  placeholder="Search for Client"
                />
                {clientSearch && clientSuggestions.length > 0 && (
                  <div className="dropdown polished-dropdown">
                    {clientSuggestions.map(client => (
                      <div
                        key={client.id}
                        className="dropdown-item polished-dropdown-item"
                        onClick={() => {
                          setEditData((prevData) => ({ ...prevData, clientId: client.id }));
                          setClientSearch(client.name); // Set selected client name in input
                          setClientSuggestions([]); // Clear suggestions
                        }}
                      >
                        {client.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </label>

            {/* Tech User search field */}
            <label>
              Tech User
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  name="techSearch"
                  value={techSearch}
                  onChange={(e) => {
                    setTechSearch(e.target.value);
                    fetchTechSuggestions(e.target.value);
                  }}
                  placeholder="Search for Tech User"
                />
                {techSearch && techSuggestions.length > 0 && (
                  <div className="dropdown polished-dropdown">
                    {techSuggestions.map(tech => (
                      <div
                        key={tech.id}
                        className="dropdown-item polished-dropdown-item"
                        onClick={() => {
                          setEditData((prevData) => ({ ...prevData, techId: tech.id }));
                          setTechSearch(tech.name); // Set selected tech user name in input
                          setTechSuggestions([]); // Clear suggestions
                        }}
                      >
                        {tech.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </label>

            <label>
              Issue Type
              <select name="issueId" value={editData.issueId} onChange={handleChange}>
                <option value="">Select an Issue Type</option>
                {issueTypes.map(issueType => (
                  <option key={issueType.id} value={issueType.id}>
                    {issueType.issueTypeName}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Sub Issue Type
              <select name="subIssueId" value={editData.subIssueId} onChange={handleChange}>
                <option value="">Select a Sub Issue Type</option>
                {subIssueTypes.map(subIssueType => (
                  <option key={subIssueType.id} value={subIssueType.id}>
                    {subIssueType.subIssueName}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className="save-button">Save Changes</button>
          </form>
        ) : (
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
                  <p><strong>Issue Type: </strong> {issueTypeName || 'No issue type available'}</p>
                </div>

                <div className="sub-issue-type">
                  <p><strong>Sub-Issue Type: </strong> {subIssueTypeName || 'No sub-issue type available'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="ticket-notes-container">
          <h2>Notes</h2>
          <p>{ticket.ticketNotes || 'No notes available'}</p>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
