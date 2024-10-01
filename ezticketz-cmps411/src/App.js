import React, { useState } from 'react';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketStatus, setTicketStatus] = useState('Open'); // Default status
  const [errors, setErrors] = useState({ title: '', description: '' });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  // Validate Form
  const validateForm = () => {
    let valid = true;
    let titleError = '';
    let descriptionError = '';

    if (!ticketTitle) {
      titleError = 'Title is required';
      valid = false;
    }

    if (!ticketDescription) {
      descriptionError = 'Description is required';
      valid = false;
    }

    setErrors({ title: titleError, description: descriptionError });
    return valid;
  };

  // Add or Edit Ticket
  const handleAddEditTicket = () => {
    if (validateForm()) {
      const newTickets = [...tickets];

      if (editIndex !== null) {
        // Edit existing ticket
        newTickets[editIndex] = { 
          title: ticketTitle,
          description: ticketDescription,
          status: ticketStatus // Include status in edit
        };
        setEditIndex(null);
        setToastMessage('Ticket updated successfully!');
      } else {
        // Add new ticket
        newTickets.push({ 
          title: ticketTitle,
          description: ticketDescription,
          status: ticketStatus // Include status in new ticket
        });
        setToastMessage('Ticket added successfully!');
      }

      setTickets(newTickets);
      setTicketTitle('');
      setTicketDescription('');
      setTicketStatus('Open'); // Reset status to default
      setErrors({ title: '', description: '' });

      // Show toast message
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  // Delete Ticket
  const handleDeleteTicket = (index) => {
    const newTickets = tickets.filter((_, i) => i !== index);
    setTickets(newTickets);
    setToastMessage('Ticket deleted successfully!');

    // Show toast message
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Edit Ticket
  const handleEditTicket = (index) => {
    setTicketTitle(tickets[index].title);
    setTicketDescription(tickets[index].description);
    setTicketStatus(tickets[index].status); // Set the current status
    setEditIndex(index);
  };

  return (
    <div className="App">
      {/* Header Section */}
      <header className="header">
        <h1>EZ Ticketz</h1>
        <p>Create and manage your tickets easily!</p>
      </header>

      {/* Ticket Form */}
      <div className="ticket-form-container">
        <h2>{editIndex !== null ? 'Edit Ticket' : 'Create a Ticket'}</h2>

        <input
          type="text"
          placeholder="Ticket Title"
          value={ticketTitle}
          onChange={(e) => setTicketTitle(e.target.value)}
          className={`ticket-input ${errors.title ? 'error-input' : ''}`}
        />
        {errors.title && <p className="error-message">{errors.title}</p>}

        <textarea
          placeholder="Ticket Description"
          value={ticketDescription}
          onChange={(e) => setTicketDescription(e.target.value)}
          className={`ticket-textarea ${errors.description ? 'error-input' : ''}`}
        />
        {errors.description && <p className="error-message">{errors.description}</p>}

        <select
          value={ticketStatus}
          onChange={(e) => setTicketStatus(e.target.value)}
          className="ticket-status-select"
        >
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Closed">Closed</option>
        </select>

        <button onClick={handleAddEditTicket} className="ticket-button">
          {editIndex !== null ? 'Update Ticket' : 'Add Ticket'}
        </button>
      </div>

      {/* Toast Message */}
      {showToast && (
        <div className={`toast ${showToast ? 'show' : ''}`} aria-live="polite">
          {toastMessage}
        </div>
      )}

      {/* Display Tickets */}
      <div className="ticket-list">
        <h2>Your Tickets</h2>
        {tickets.length === 0 ? (
          <p>No tickets added yet.</p>
        ) : (
          <div className="ticket-grid"> {/* Use a grid layout */}
            {tickets.map((ticket, index) => (
              <div key={index} className="ticket-item">
                <h3>{ticket.title}</h3>
                <p>{ticket.description}</p>
                <div className="status-bubbles">
                  {ticket.status === 'Open' && <div className="bubble open">O</div>}
                  {ticket.status === 'In Progress' && <div className="bubble in-progress">IP</div>}
                  {ticket.status === 'Completed' && <div className="bubble completed">C</div>}
                  {ticket.status === 'Closed' && <div className="bubble closed">CL</div>}
                </div>
                <button onClick={() => handleEditTicket(index)} className="edit-button">Edit</button>
                <button onClick={() => handleDeleteTicket(index)} className="delete-button">Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
