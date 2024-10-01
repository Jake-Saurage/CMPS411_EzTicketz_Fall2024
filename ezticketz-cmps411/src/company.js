import React, { useState, useEffect } from 'react';

const CompanyManager = () => {
  const [companies, setCompanies] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [userId, setUserId] = useState('');
  const [companyWideTickets, setCompanyWideTickets] = useState('');

  // Fetch companies from backend when component mounts
  useEffect(() => {
    fetch('/api/company')
      .then(response => response.json())
      .then(data => setCompanies(data))
      .catch(error => console.log(error));
  }, []);

  // Add or Update Company
  const handleSubmit = (e) => {
    e.preventDefault();

    const newCompany = {
      CompanyName: companyName,
      UserId: parseInt(userId),
      CompanyWideTickets: parseInt(companyWideTickets),
    };

    if (isEditing) {
      // Update existing company
      fetch(`/api/company/${editingCompany.Id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCompany)
      })
      .then(response => response.json())
      .then(updatedCompany => {
        setCompanies(companies.map(company =>
          company.Id === editingCompany.Id ? updatedCompany : company
        ));
        resetForm();
      })
      .catch(error => console.log(error));
    } else {
      // Add new company
      fetch('/api/company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCompany)
      })
      .then(response => response.json())
      .then(addedCompany => {
        setCompanies([...companies, addedCompany]);
        resetForm();
      })
      .catch(error => console.log(error));
    }
  };

  // Edit an existing company
  const handleEdit = (company) => {
    setIsEditing(true);
    setEditingCompany(company);
    setCompanyName(company.CompanyName);
    setUserId(company.UserId);
    setCompanyWideTickets(company.CompanyWideTickets);
  };

  // Delete a company
  const handleDelete = (id) => {
    fetch(`/api/company/${id}`, {
      method: 'DELETE'
    })
    .then(() => setCompanies(companies.filter(company => company.Id !== id)))
    .catch(error => console.log(error));
  };

  // Reset form after adding or updating
  const resetForm = () => {
    setIsEditing(false);
    setEditingCompany(null);
    setCompanyName('');
    setUserId('');
    setCompanyWideTickets('');
  };

  return (
    <div>
      <h1>Company Manager</h1>

      {/* Form for adding/updating a company */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Company Wide Tickets"
          value={companyWideTickets}
          onChange={(e) => setCompanyWideTickets(e.target.value)}
        />
        <button type="submit">{isEditing ? 'Update Company' : 'Add Company'}</button>
        {isEditing && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      {/* List of companies */}
      <div>
        <h2>Company List</h2>
        {companies.map((company) => (
          <div key={company.Id} style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
            <h3>{company.CompanyName}</h3>
            <p>User ID: {company.UserId}</p>
            <p>Company Wide Tickets: {company.CompanyWideTickets}</p>
            <button onClick={() => handleEdit(company)}>Edit</button>
            <button onClick={() => handleDelete(company.Id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyManager;
