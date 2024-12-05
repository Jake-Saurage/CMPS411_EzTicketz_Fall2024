import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const NewTicket = () => {
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [resolution, setResolution] = useState("Work Performed:");
  const [issueId, setIssueId] = useState('');
  const [subIssueId, setSubIssueId] = useState('');
  const [ticketNotes, setTicketNotes] = useState('');

  const [issueTypes, setIssueTypes] = useState([]);
  const [subIssueTypes, setSubIssueTypes] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [techSearch, setTechSearch] = useState('');
  const [clientSearch, setClientSearch] = useState('');
  const [techSuggestions, setTechSuggestions] = useState([]);
  const [clientSuggestions, setClientSuggestions] = useState([]);

  const [selectedTechId, setSelectedTechId] = useState(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState(null);

  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Fetch issue types when component mounts
  const fetchIssueTypes = async () => {
    try {
      const response = await fetch('http://localhost:5099/api/issuetypes');
      if (!response.ok) {
        throw new Error('Failed to fetch issue types');
      }
      const data = await response.json();
      setIssueTypes(data);
    } catch (error) {
      console.error('Error fetching issue types:', error.message);
    }
  };

  // Fetch sub-issue types based on selected issue type
  const fetchSubIssueTypes = useCallback(async (issueTypeId) => {
    if (!issueTypeId) {
      setSubIssueTypes([]);
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5099/api/subissuetypes?issueTypeId=${issueTypeId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch sub-issue types');
      }
      const data = await response.json();
      setSubIssueTypes(data); // Ensure `data` contains objects with `id` and `subIssueName`
    } catch (error) {
      console.error('Error fetching sub-issue types:', error.message);
      setSubIssueTypes([]);
    }
  }, []);
  

  
  

  const fetchCompanies = async () => {
    try {
      const response = await fetch('http://localhost:5099/api/company');
      if (!response.ok) {
        throw new Error('Failed to fetch companies');
      }
      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      console.error('Error fetching companies:', error.message);
    }
  };

  const fetchTechSuggestions = async (searchTerm) => {
    try {
      const response = await fetch(`http://localhost:5099/api/techusers`);
      if (!response.ok) {
        throw new Error('Failed to fetch tech users');
      }
      const data = await response.json();
      setTechSuggestions(
        data.filter((tech) => tech.name.toLowerCase().startsWith(searchTerm.toLowerCase()))
      );
    } catch (error) {
      console.error('Error fetching tech users:', error.message);
    }
  };

  const fetchClientSuggestions = async (searchTerm, companyId) => {
    if (!companyId) {
      setClientSuggestions([]);
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5099/api/clients`);
      if (!response.ok) {
        throw new Error('Failed to fetch clients');
      }
      const data = await response.json();
  
      // Filter clients based on both companyId and searchTerm
      setClientSuggestions(
        data.filter((client) => 
          client.companyId === Number(companyId) &&
          client.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        )
      );
    } catch (error) {
      console.error('Error fetching clients:', error.message);
    }
  };
  

  useEffect(() => {
    fetchCompanies();
    fetchIssueTypes();
  }, []);
 
  useEffect(() => {
    if (selectedCompanyId) {
      fetchClientSuggestions(clientSearch, selectedCompanyId);
    }
  }, [selectedCompanyId, clientSearch]);
  
  // Fetch sub-issues when issueId changes
  useEffect(() => {
    if (issueId) {
      fetchSubIssueTypes(issueId);
    } else {
      setSubIssueTypes([]);
    }
  }, [issueId, fetchSubIssueTypes]);
  
  useEffect(() => {
    console.log("Sub-issue types state updated:", subIssueTypes); // Debugging log
  }, [subIssueTypes]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ticketTitle || !ticketDescription || !issueId || !selectedClientId || !selectedCompanyId || !selectedTechId) {
      setError('Please fill out all required fields.');
      return;
    }

    const ticketData = {
      ticketTitle,
      ticketDescription,
      resolution: resolution || '',
      issueId: Number(issueId),
      subIssueId: subIssueId ? Number(subIssueId) : null,
      clientId: Number(selectedClientId),
      companyId: Number(selectedCompanyId),
      techId: Number(selectedTechId),
      ticketNotes: ticketNotes || '',
    };

    console.log('Ticket Data:', ticketData); // Debugging line to check the ticket data
    console.log('Selected IDs:', {
      clientId: selectedClientId,
      companyId: selectedCompanyId,
      techId: selectedTechId,
      issueId,
      subIssueId
    }); // Debugging line to check selected IDs

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
      setIssueId('');
      setSubIssueId('');
      setTechSearch('');
      setClientSearch('');
      setSelectedTechId(null);
      setSelectedCompanyId(null);
      setSelectedClientId(null);
      setTicketNotes('');
      setError('');

      // Redirect to the tickets list page
      navigate('/tickets-list');
    } catch (error) {
      console.error('Error creating ticket:', error);
      setError('Failed to create ticket. Please try again.');
    }
  };

  return (
    <div className="new-ticket-container">
      <h1>Create New Ticket</h1>
      <form
  onSubmit={handleSubmit}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default form submission
    }
  }}
>
        <div className="form-group">
          <label>Ticket Title</label>
          <input
            type="text"
            value={ticketTitle}
            onChange={(e) => setTicketTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Ticket Description</label>
          <textarea
            value={ticketDescription}
            onChange={(e) => setTicketDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Issue Type</label>
          <select
            value={issueId}
            onChange={(e) => setIssueId(e.target.value)}
            required
          >
            <option value="">Select an Issue Type</option>
            {issueTypes.map((issue) => (
              <option key={issue.id} value={issue.id}>
                {issue.issueTypeName}
              </option>
            ))}
          </select>
        </div>

        
        <div className="form-group">
  <label>Sub Issue Type</label>
  <select
  value={subIssueId}
  onChange={(e) => setSubIssueId(e.target.value)}
>
  <option value="">Select a Sub Issue Type</option>
  {subIssueTypes.map((subIssue) => (
    <option key={subIssue.id} value={subIssue.id}>
      {subIssue.subIssueName}
    </option>
  ))}
</select>

</div>




        <div className="form-group">
          <label>Select Company</label>
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
          <label>Tech User</label>
          <input
            type="text"
            value={techSearch}
            onChange={(e) => {
              setTechSearch(e.target.value);
              fetchTechSuggestions(e.target.value);
            }}
            placeholder="Search for Tech User"
          />
          {techSearch && techSuggestions.length > 0 && (
            <div className="dropdown polished-dropdown">
              {techSuggestions.map((tech) => (
                <div
                  key={tech.id}
                  className="dropdown-item polished-dropdown-item"
                  onClick={() => {
                    setSelectedTechId(tech.id);
                    setTechSearch(tech.name); // Set the selected tech user name in the input
                    setTechSuggestions([]); // Clear the suggestions
                  }}
                >
                  {tech.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Client</label>
          <input
            type="text"
            value={clientSearch}
            onChange={(e) => {
              setClientSearch(e.target.value);
              fetchClientSuggestions(e.target.value);
            }}
            placeholder="Search for Client"
          />
          {clientSearch && clientSuggestions.length > 0 && (
            <div className="dropdown polished-dropdown">
              {clientSuggestions.map((client) => (
                <div
                  key={client.id}
                  className="dropdown-item polished-dropdown-item"
                  onClick={() => {
                    setSelectedClientId(client.id);
                    setClientSearch(client.name); // Set the selected client name in the input
                    setClientSuggestions([]); // Clear the suggestions
                  }}
                >
                  {client.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-group">
  <label>Resolution</label>
  <textarea
    value={resolution}
    onChange={(e) => setResolution(e.target.value)} // Handles updates
    rows="5" // Set an appropriate number of visible rows
    style={{
      width: "100%", // Make it visually appealing
      whiteSpace: "pre-wrap", // Ensure spaces and newlines are displayed
    }}
    placeholder="Enter resolution details here..."
  />
</div>



        <div className="form-group">
          <label>Ticket Notes</label>
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
