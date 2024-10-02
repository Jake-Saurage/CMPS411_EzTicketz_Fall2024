import React, { useState } from 'react';
import './App.css';
import ConfirmationModal from './ConfirmationModal'; // Import the Confirmation Modal


function Ticket() {
  const [tickets, setTickets] = useState([]);
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketStatus, setTicketStatus] = useState('Open');
  const [errors, setErrors] = useState({ title: '', description: '' });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState(null); // Track the ticket to delete
  const [selectedFile, setSelectedFile] = useState(null); // State for the file chooser


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


  // Get Progress Percentage
  const getProgressPercentage = (status) => {
    switch (status) {
      case 'Open':
        return 0;
      case 'In Progress':
        return 50; // Arbitrary value; adjust as needed
      case 'Completed':
        return 100;
      case 'Closed':
        return 100;
      default:
        return 0;
    }
  };


  // Add or Edit Ticket
  const handleAddEditTicket = () => {
    if (validateForm()) {
      const newTickets = [...tickets];


      const ticketData = {
        title: ticketTitle,
        description: ticketDescription,
        status: ticketStatus,
        createdAt: new Date().toLocaleString(),
        progress: getProgressPercentage(ticketStatus), // Set initial progress
        isCompleted: false, // Track completion status
        fileName: selectedFile ? selectedFile.name : '', // Store file name if selected
      };


      if (editIndex !== null) {
        newTickets[editIndex] = ticketData;
        setEditIndex(null);
        setToastMessage('Ticket updated successfully!');
      } else {
        newTickets.push(ticketData);
        setToastMessage('Ticket added successfully!');
      }


      setTickets(newTickets);
      setTicketTitle('');
      setTicketDescription('');
      setTicketStatus('Open');
      setErrors({ title: '', description: '' });
      setSelectedFile(null); // Reset selected file


      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };


  // Delete Ticket
  const handleDeleteTicket = (index) => {
    setTicketToDelete(index); // Set the ticket to delete
    setShowModal(true); // Show the confirmation modal
  };


  const confirmDeleteTicket = () => {
    const newTickets = tickets.filter((_, i) => i !== ticketToDelete);
    setTickets(newTickets);
    setToastMessage('Ticket deleted successfully!');
    setShowToast(true);
    setShowModal(false); // Close the modal
    setTimeout(() => setShowToast(false), 3000);
  };


  const cancelDelete = () => {
    setShowModal(false); // Close the modal without deleting
    setTicketToDelete(null); // Reset the ticket to delete
  };


  // Edit Ticket
  const handleEditTicket = (index) => {
    setTicketTitle(tickets[index].title);
    setTicketDescription(tickets[index].description);
    setTicketStatus(tickets[index].status);
    setEditIndex(index);
    setSelectedFile(null); // Reset selected file
  };


  // Filter tickets based on search query
  const filteredTickets = tickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.description.toLowerCase().includes(searchQuery.toLowerCase())
  );


  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file); // Set the selected file
    }
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


        {/* File Chooser */}
        <input
          type="file"
          onChange={handleFileChange}
          className="file-input"
        />
        {selectedFile && <p>Selected File: {selectedFile.name}</p>} {/* Display selected file name */}


        <button onClick={handleAddEditTicket} className="ticket-button">
          {editIndex !== null ? 'Update Ticket' : 'Add Ticket'}
        </button>
      </div>


      {/* Search Input */}
      <input
        type="text"
        placeholder="Search Tickets..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />


      {/* Display Tickets */}
      <div className="ticket-list">
        <h2>Your Tickets</h2>
        {filteredTickets.length === 0 ? (
          <p>No tickets found.</p>
        ) : (
          <div className="ticket-grid">
            {filteredTickets.map((ticket, index) => (
              <div key={index} className={`ticket-item ${ticket.isCompleted ? 'completed' : ''}`}>
                <h3>{ticket.title}</h3>
                <p>{ticket.description}</p>
                <p><strong>Created At:</strong> {ticket.createdAt}</p>
                {ticket.fileName && <p><strong>Attached File:</strong> {ticket.fileName}</p>} {/* Display attached file name */}
                <div className="ticket-progress">
                  <div className="progress-bar" style={{ width: `${ticket.progress}%` }}>
                    {ticket.progress}%
                  </div>
                </div>
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


      {/* Confirmation Modal */}
      {showModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this ticket?"
          onConfirm={confirmDeleteTicket}
          onCancel={cancelDelete}
        />
      )}


      {/* Toast Message */}
      {showToast && (
        <div className={`toast ${showToast ? 'show' : ''}`} aria-live="polite">
          {toastMessage}
        </div>
      )}
    </div>
  );
}


export default Ticket;