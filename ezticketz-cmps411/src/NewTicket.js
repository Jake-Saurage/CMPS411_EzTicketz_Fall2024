import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const NewTicket = () => {
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [resolution, setResolution] = useState('');
  const [issueId, setIssueId] = useState(0);
  const [subIssueId, setSubIssueId] = useState(0);
  const [ticketNotes, setTicketNotes] = useState('');

  const [techSearch, setTechSearch] = useState('');
  const [clientSearch, setClientSearch] = useState('');

  const [techSuggestions, setTechSuggestions] = useState([]);
  const [clientSuggestions, setClientSuggestions] = useState([]);
  const [companies, setCompanies] = useState([]); // Store all available companies

  const [selectedTechId, setSelectedTechId] = useState(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState(null);

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const fetchSuggestions = async (endpoint, searchQuery, setSuggestions) => {
    if (searchQuery.length === 0) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(`http://localhost:5099/api/${endpoint}?search=${searchQuery}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint} suggestions`);
      }
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await fetch('http://localhost:5099/api/company');
      if (!response.ok) {
        throw new Error('Failed to fetch companies');
      }
      const data = await response.json();
      setCompanies(data); // Store fetched companies in state
    } catch (error) {
      console.error('Error fetching companies:', error.message);
    }
  };

  useEffect(() => {
    fetchCompanies(); // Fetch all companies when the component loads
  }, []);

  useEffect(() => {
    fetchSuggestions('techusers', techSearch, setTechSuggestions);
  }, [techSearch]);

  useEffect(() => {
    fetchSuggestions('clients', clientSearch, setClientSuggestions);
  }, [clientSearch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ticketTitle || !ticketDescription || !issueId || !subIssueId || !selectedClientId || !selectedCompanyId || !selectedTechId) {
      setError('Please fill out all required fields.');
      return;
    }

    const ticketData = {
      ticketTitle,
      ticketDescription,
      resolution: resolution || '',
      issueId,
      subIssueId,
      clientId: selectedClientId,
      companyId: selectedCompanyId,
      techId: selectedTechId,
      ticketNotes: ticketNotes || '',
    };

   // Inside your handleSubmit function:
try {
  const response = await fetch('http://localhost:5099/api/tickets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ticketData),
  });

  if (!response.ok) {
    throw new Error('Failed to create ticket.');
  }

  // Reset fields after successful creation
  setTicketTitle('');
  setTicketDescription('');
  setResolution('');
  setIssueId(0);
  setSubIssueId(0);
  setTechSearch('');
  setClientSearch('');
  setSelectedTechId(null);
  setSelectedCompanyId(null);
  setSelectedClientId(null);
  setTicketNotes('');
  setError('');

  // Redirect to the tickets list page (ensure it's "/tickets-list")
  navigate('/tickets-list');
} catch (error) {
  console.error('Error creating ticket:', error);
  setError('Failed to create ticket. Please try again.');
}

  };

  return (
    <div className="new-ticket-container">
      <h1>Create New Ticket</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Ticket Title:</label>
          <input
            type="text"
            value={ticketTitle}
            onChange={(e) => setTicketTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Ticket Description:</label>
          <textarea
            value={ticketDescription}
            onChange={(e) => setTicketDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Resolution (Optional):</label>
          <input
            type="text"
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Issue ID:</label>
          <input
            type="number"
            value={issueId}
            onChange={(e) => setIssueId(Number(e.target.value))}
            required
          />
        </div>

        <div className="form-group">
          <label>Sub Issue ID:</label>
          <input
            type="number"
            value={subIssueId}
            onChange={(e) => setSubIssueId(Number(e.target.value))}
            required
          />
        </div>

        <div className="form-group">
          <label>Select Company:</label>
          <select
            value={selectedCompanyId || ''}
            onChange={(e) => setSelectedCompanyId(e.target.value)}
            required
          >
            <option value="">Select a Company</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.companyName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Search Client:</label>
          <input
            type="text"
            value={clientSearch}
            onChange={(e) => setClientSearch(e.target.value)}
          />
          {clientSuggestions.length > 0 && (
            <ul className="suggestions-list" style={{ width: '100%' }}>
              {clientSuggestions.map((client) => (
                <li
                  key={client.id}
                  onClick={() => {
                    setSelectedClientId(client.id);
                    setClientSearch(client.name);
                    setClientSuggestions([]);
                  }}
                >
                  {client.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="form-group">
          <label>Search Tech User:</label>
          <input
            type="text"
            value={techSearch}
            onChange={(e) => setTechSearch(e.target.value)}
          />
          {techSuggestions.length > 0 && (
            <ul className="suggestions-list" style={{ width: '100%' }}>
              {techSuggestions.map((tech) => (
                <li
                  key={tech.id}
                  onClick={() => {
                    setSelectedTechId(tech.id);
                    setTechSearch(tech.name);
                    setTechSuggestions([]);
                  }}
                >
                  {tech.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="form-group">
          <label>Ticket Notes (Optional):</label>
          <textarea
            value={ticketNotes}
            onChange={(e) => setTicketNotes(e.target.value)}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="submit-button">Create Ticket</button>
      </form>
    </div>
  );
};

export default NewTicket;
