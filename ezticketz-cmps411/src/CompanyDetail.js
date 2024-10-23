import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './App.css'; 
import NavBar from './NavBar.js';

const CompanyDetail = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
              <li key={client.id}>
                <Link to={`/clients/${client.id}`} className="client-info-link">
                  <span className="client-info">{client.name}</span>
                </Link>
                <span>Total Tickets: {client.totalTickets}</span>
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
    </div>
  );
};

export default CompanyDetail;
