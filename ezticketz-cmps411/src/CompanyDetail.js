import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './App.css'; 
import NavBar from './NavBar.js';
import ConfirmationModal from './ConfirmationModal'; // Import the confirmation modal

const CompanyDetail = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [clientToDelete, setClientToDelete] = useState(null); // Client to delete state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await fetch(`http://localhost:5099/api/company/${companyId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch company');
        }
        const data = await response.json();
        setCompany(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCompany();
  }, [companyId]);

  const handleCreateClient = () => {
    navigate(`/createClient?companyId=${companyId}`);
  };

  const handleDeleteClient = (client) => {
    setClientToDelete(client); // Set the client to be deleted
    setShowModal(true); // Show the modal
  };

  // Confirm deletion in modal
  const confirmDeleteClient = async () => {
    if (clientToDelete) {
      try {
        const response = await fetch(`http://localhost:5099/api/clients/${clientToDelete.id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete client');
        }

        // Update the UI after deletion
        setCompany((prevCompany) => ({
          ...prevCompany,
          clients: prevCompany.clients.filter(client => client.id !== clientToDelete.id)
        }));

        setShowModal(false); // Close the modal
        setClientToDelete(null); // Reset the client to delete
      } catch (error) {
        setError(error.message);
      }
    }
  };

  // Cancel deletion and close modal
  const cancelDeleteClient = () => {
    setShowModal(false); // Close the modal
    setClientToDelete(null); // Reset the client to delete
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!company) {
    return <div className="no-company">No company found</div>;
  }

  const clients = company.clients || [];

  return (
    <div>
      <NavBar />
      <div className="company-detail-container">
        <h1 className="company-name">Company Name: {company.companyName || "Unnamed Company"}</h1>
        
        <h2>Clients Assigned:</h2>
        {clients.length > 0 ? (
          <ul className="clients-list">
            {clients.map(client => (
              <li key={client.id} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '10px', 
                  border: '1px solid #e0e0e0', 
                  borderRadius: '5px', 
                  marginBottom: '10px' 
                }}>
                <div style={{ display: 'flex', flexGrow: 1 }}>
                  <Link to={`/clients/${client.id}`} className="client-info-link" style={{ flex: 1 }}>
                    <span className="client-info">{client.name}</span>
                  </Link>
                </div>
                <div style={{ marginRight: '115px', marginLeft: 'auto' }}>
                  <span style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                    Total Tickets: {client.totalTickets}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteClient(client)}
                  style={{ 
                    backgroundColor: '#dc3545', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px', 
                    padding: '8px', 
                    cursor: 'pointer', 
                    marginLeft: '10px' 
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-clients">No clients assigned to this company.</p>
        )}

        {/* Create Client Button */}
        <button onClick={handleCreateClient} className="create-client-button">
          Create Client
        </button>

        {/* Company Wide Tickets Box */}
        <div className="company-wide-tickets">
          <h3>Company Wide Tickets</h3>
          <p>{company.totalTickets}</p>
        </div>
      </div>

      {/* Render the Confirmation Modal if showModal is true */}
      {showModal && (
        <ConfirmationModal
          message={`Are you sure you want to delete ${clientToDelete?.name}?`}
          onConfirm={confirmDeleteClient}
          onCancel={cancelDeleteClient}
        />
      )}
    </div>
  );
};

export default CompanyDetail;
