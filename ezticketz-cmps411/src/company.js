import React, { useState, useEffect } from 'react';

const CompanyManager = () => {
  const [companies, setCompanies] = useState([
    { Id: 1, CompanyName: 'Tech Solutions', CompanyWideTickets: 50 },
    { Id: 2, CompanyName: 'Web Innovators', CompanyWideTickets: 30 },
    { Id: 3, CompanyName: 'Cloud Services', CompanyWideTickets: 75 },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [companyName, setCompanyName] = useState('');
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
    setCompanyWideTickets('');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Company Manager</h1>

      {/* Form for adding/updating a company */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Company Wide Tickets"
          value={companyWideTickets}
          onChange={(e) => setCompanyWideTickets(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>{isEditing ? 'Update Company' : 'Add Company'}</button>
        {isEditing && <button type="button" onClick={resetForm} style={styles.cancelButton}>Cancel</button>}
      </form>

      {/* List of companies */}
      <div style={styles.companyList}>
        <h2 style={styles.subHeader}>Company List</h2>
        {companies.map((company) => (
          <div key={company.Id} style={styles.companyCard}>
            <h3 style={styles.companyName}>{company.CompanyName}</h3>
            <p style={styles.companyInfo}>Company Wide Tickets: {company.CompanyWideTickets}</p>
            <div style={styles.buttonGroup}>
              <button onClick={() => handleEdit(company)} style={styles.editButton}>Edit</button>
              <button onClick={() => handleDelete(company.Id)} style={styles.deleteButton}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    margin: '5px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
    transition: 'border 0.3s',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '5px 0',
  },
  cancelButton: {
    padding: '10px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '5px 0',
  },
  companyList: {
    marginTop: '20px',
  },
  subHeader: {
    color: '#555',
  },
  companyCard: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '15px',
    margin: '10px 0',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
  },
  companyName: {
    color: '#007BFF',
  },
  companyInfo: {
    color: '#666',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '8px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '8px',
    cursor: 'pointer',
  },
};

export default CompanyManager;
