import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const NewTicketClient = ({ clientId, companyId }) => {
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [issueId, setIssueId] = useState('');
  const [subIssueId, setSubIssueId] = useState('');

  const [issueTypes, setIssueTypes] = useState([]);
  const [subIssueTypes, setSubIssueTypes] = useState([]);

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
      setIssueId('');
      setSubIssueId('');
      setError('');

      // Redirect to the tickets list page
      navigate('/tickets-list');
    } catch (error) {
      console.error('Error creating ticket:', error);
      setError('Failed to create ticket. Please try again.');
    }
  };

  return React.createElement(
    'div',
    { className: 'new-ticket-container' },
    React.createElement('h1', null, 'Create New Ticket'),
    React.createElement(
      'form',
      { onSubmit: handleSubmit },
      React.createElement(
        'div',
        { className: 'form-group' },
        React.createElement('label', null, 'Ticket Title'),
        React.createElement('input', {
          type: 'text',
          value: ticketTitle,
          onChange: (e) => setTicketTitle(e.target.value),
          required: true,
        })
      ),
      React.createElement(
        'div',
        { className: 'form-group' },
        React.createElement('label', null, 'Ticket Description'),
        React.createElement('textarea', {
          value: ticketDescription,
          onChange: (e) => setTicketDescription(e.target.value),
          required: true,
        })
      ),
      React.createElement(
        'div',
        { className: 'form-group' },
        React.createElement('label', null, 'Issue Type'),
        React.createElement(
          'select',
          {
            value: issueId,
            onChange: (e) => setIssueId(e.target.value),
            required: true,
          },
          React.createElement('option', { value: '' }, 'Select an Issue Type'),
          issueTypes.map((issue) =>
            React.createElement('option', {
              key: issue.id,
              value: issue.id,
              title: issue.issueTypeDescription, // Tooltip description
            }, issue.issueTypeName)
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'form-group' },
        React.createElement('label', null, 'Sub Issue Type'),
        React.createElement(
          'select',
          {
            value: subIssueId,
            onChange: (e) => setSubIssueId(e.target.value),
          },
          React.createElement('option', { value: '' }, 'Select a Sub Issue Type'),
          subIssueTypes.map((subIssue) =>
            React.createElement('option', {
              key: subIssue.id,
              value: subIssue.id,
              title: subIssue.subIssueDescription, // Tooltip description
            }, subIssue.subIssueName)
          )
        )
      ),
      error && React.createElement('p', { className: 'error-message' }, error),
      React.createElement(
        'button',
        { type: 'submit', className: 'submit-button' },
        'Create Ticket'
      )
    )
  );
};

export default NewTicketClient;
