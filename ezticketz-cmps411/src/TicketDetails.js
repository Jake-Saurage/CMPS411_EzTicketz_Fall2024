import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar";

const TicketDetails = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  // States
  const [ticket, setTicket] = useState(null); // Ticket data
  const [notes, setNotes] = useState([]); // Notes associated with the ticket
  const [newNote, setNewNote] = useState(""); // For adding a new note
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Metadata
  const [issueTypeName, setIssueTypeName] = useState("");
  const [subIssueTypeName, setSubIssueTypeName] = useState("");

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    ticketTitle: "",
    ticketDescription: "",
    issueId: "",
    subIssueId: "",
    clientId: "",
    companyId: "",
    techId: "",
  });

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        // Fetch ticket details
        const ticketResponse = await fetch(`http://localhost:5099/api/tickets/${ticketId}`);
        if (!ticketResponse.ok) throw new Error("Failed to fetch ticket");
        const ticketData = await ticketResponse.json();

        setTicket(ticketData);
        setEditData({
          ticketTitle: ticketData.ticketTitle,
          ticketDescription: ticketData.ticketDescription,
          issueId: ticketData.issueId,
          subIssueId: ticketData.subIssueId,
          clientId: ticketData.clientId,
          companyId: ticketData.companyId,
          techId: ticketData.techId,
        });

        // Fetch issue type and sub-issue type
        if (ticketData.issueId) {
          const issueResponse = await fetch(`http://localhost:5099/api/issuetypes/${ticketData.issueId}`);
          if (issueResponse.ok) {
            const issueData = await issueResponse.json();
            setIssueTypeName(issueData.issueTypeName);
          }
        }

        if (ticketData.subIssueId) {
          const subIssueResponse = await fetch(`http://localhost:5099/api/subissuetypes/${ticketData.subIssueId}`);
          if (subIssueResponse.ok) {
            const subIssueData = await subIssueResponse.json();
            setSubIssueTypeName(subIssueData.subIssueName);
          }
        }

        // Fetch notes for the ticket
        const notesResponse = await fetch(`http://localhost:5099/api/notes/ticket/${ticketId}`);
        if (!notesResponse.ok) throw new Error("Failed to fetch notes");
        const notesData = await notesResponse.json();

        setNotes(notesData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching ticket data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTicketData();
  }, [ticketId]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddNote = async () => {
    if (!newNote.trim()) {
      alert("Please write a note before submitting.");
      return;
    }
  
    // Parse the user object from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (!user || !user.userId || !user.userType || (user.userType !== "TechUser" && user.userType !== "Client")) {
      alert("User information is missing or invalid. Please log in again.");
      return;
    }
  
    try {
      // Prepare the payload for the backend
      const payload = {
        noteDescription: newNote.trim(),
        techId: user.userType === "TechUser" ? user.userId : null,
        clientId: user.userType === "Client" ? user.userId : null,
      };
  
      const response = await fetch(`http://localhost:5099/api/notes/ticket/${ticketId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add note");
      }
  
      const createdNote = await response.json();
  
      // Add the new note to the existing notes list
      setNotes((prevNotes) => [...prevNotes, createdNote]);
      setNewNote(""); // Clear the input field
    } catch (error) {
      console.error("Error adding note:", error);
      alert("Failed to add note. Please try again.");
    }
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5099/api/tickets/${ticketId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: ticketId, ...editData }),
      });
      if (!response.ok) throw new Error("Failed to update ticket");
      setIsEditing(false);
      navigate(0); // Refresh the page
    } catch (err) {
      console.error("Error updating ticket:", err);
      setError("Failed to update ticket");
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
          {!isEditing && (
            <button onClick={handleEditClick} className="edit-button">
              Edit Ticket
            </button>
          )}
        </div>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="ticket-edit-form">
            <label>
              Ticket Title
              <input
                type="text"
                name="ticketTitle"
                value={editData.ticketTitle}
                onChange={handleChange}
              />
            </label>
            <label>
              Ticket Description
              <textarea
                name="ticketDescription"
                value={editData.ticketDescription}
                onChange={handleChange}
              />
            </label>
            <label>
              Issue Type
              <input
                type="text"
                name="issueId"
                value={issueTypeName}
                disabled
              />
            </label>
            <label>
              Sub-Issue Type
              <input
                type="text"
                name="subIssueId"
                value={subIssueTypeName}
                disabled
              />
            </label>
            <button type="submit" className="save-button">
              Save Changes
            </button>
          </form>
        ) : (
          <div className="ticket-main-content">
            <div className="ticket-description-container">
              <p>{ticket.ticketDescription}</p>
            </div>

            <div className="ticket-side-container">
              <div className="client-container">
                <p>
                  <strong>Client: </strong>
                  <Link to={`/clients/${ticket.clientId}`} className="details-link">
                    {ticket.clientName}
                  </Link>
                </p>
              </div>

              <div className="tech-container">
                <p>
                  <strong>Tech User: </strong>
                  <Link to={`/techusers/${ticket.techId}`} className="details-link">
                    {ticket.techName}
                  </Link>
                </p>
              </div>

              <div className="issue-info-container">
                <div className="issue-type">
                  <p>
                    <strong>Issue Type: </strong>
                    {issueTypeName || "No issue type available"}
                  </p>
                </div>

                <div className="sub-issue-type">
                  <p>
                    <strong>Sub-Issue Type: </strong>
                    {subIssueTypeName || "No sub-issue type available"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notes Section */}
        <div className="ticket-notes-container">
          <h2>Notes</h2>
          {notes.length > 0 ? (
  <ul className="notes-list">
    {notes.map((note) => (
      <li key={note.id} className="note-item">
        <p>{note.noteDescription}</p>
        <small>
          Posted by:{" "}
          {note.techName ? (
            <Link to={`/techusers/${note.techId}`} className="details-link">
              {note.techName}
            </Link>
          ) : note.clientName ? (
            <Link to={`/clients/${note.clientId}`} className="details-link">
              {note.clientName}
            </Link>
          ) : (
            "Unknown"
          )}{" "}
          at {new Date(note.noteTimePosted).toLocaleString()}
        </small>
      </li>
    ))}
  </ul>
) : (
  <p>No notes available</p>
)}


          {/* Add New Note */}
          <div className="add-note-container">
            <textarea
              placeholder="Leave a note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="note-input"
            />
            <button onClick={handleAddNote} className="add-note-button">
              Add Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
