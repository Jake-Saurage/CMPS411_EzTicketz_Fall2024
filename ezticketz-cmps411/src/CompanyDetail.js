import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link from react-router-dom
import './App.css'; 
import NavBar from './NavBar.js';

const CompanyDetail = () => {
  const { companyId } = useParams(); // Get the company ID from the URL
  const [company, setCompany] = useState(null); // State to hold the company data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await fetch(`http://localhost:5099/api/company/${companyId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch company');
        }
        const data = await response.json();
        console.log('Fetched Company Data:', data); // Log the response to the console
        setCompany(data); // Store the fetched company data
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCompany();
  }, [companyId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!company) {
    return <div className="no-company">No company found</div>;
  }

  // Safe fallback for Clients (ensure Clients is always an array)
  const clients = company.clients || [];

  return (
    <div>
      <NavBar />
      <div className="company-detail-container">
        {/* Conditionally render the company name only if it exists */}
        <h1 className="company-name">Company Name: {company.companyName || "Unnamed Company"}</h1>
        <h2>Clients Assigned:</h2>
        {clients.length > 0 ? (
          <ul className="clients-list">
            {clients.map(client => (
              <li key={client.id}>
                {/* Link to the client's details page */}
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
        <h3 className="total-tickets">Total Tickets for All Clients: {company.totalTickets}</h3>
      </div>
    </div>
  );
};

export default CompanyDetail;
