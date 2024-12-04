import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const NewTicketClient = () => {
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [issueId, setIssueId] = useState('');
  const [subIssueId, setSubIssueId] = useState('');

  const [issueTypes, setIssueTypes] = useState([]);
  const [subIssueTypes, setSubIssueTypes] = useState([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Get clientId and companyId from localStorage
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const clientId = storedUser?.userId;
  const companyId = storedUser?.companyId;

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
  const fetchSubIssueTypes = async (issueTypeId) => {
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
      setSubIssueTypes(data);
    } catch (error) {
      console.error('Error fetching sub-issue types:', error.message);
      setSubIssueTypes([]);
    }
  };

  useEffect(() => {
    fetchIssueTypes();
  }, []);

  useEffect(() => {
    if (issueId) {
      fetchSubIssueTypes(issueId);
    } else {
      setSubIssueTypes([]);
    }
  }, [issueId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ticketTitle || !ticketDescription || !issueId) {
      setError('Please fill out all required fields.');
      return;
    }

    const ticketData = {
      ticketTitle,
      ticketDescription,
      issueId: Number(issueId),
      subIssueId: subIssueId ? Number(subIssueId) : null,
      clientId, // Automatically set to the signed-in client
      companyId, // Automatically set to the client's assigned company
      techId: 5, // Automatically assigned to Tech User with ID 5
    };

    console.log('Payload being sent:', ticketData);

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

      const createdTicket = await response.json(); // Assuming the backend returns the created ticket details
      console.log('Created Ticket:', createdTicket);

      // Redirect to the ticket details page
      navigate(`/tickets/${createdTicket.id}`);
    } catch (error) {
      console.error('Error creating ticket:', error.message);
      setError('Failed to create ticket. Please try again.');
    }
  };

  return (
    <div className="new-ticket-container">
      <h1>Create New Ticket</h1>
      <form onSubmit={handleSubmit}>
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className="submit-button">
          Create Ticket
        </button>
      </form>
    </div>
  );
};

export default NewTicketClient;
