import React, { useState, useEffect } from 'react';

const CompanyManager = () => {
  const [companies, setCompanies] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch companies from backend when component mounts
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('http://localhost:5099/api/company');
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${errorText}`);
        }
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Add or Update Company
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCompany = {
      CompanyName: companyName,
    };

    try {
      let response;
      if (isEditing) {
        response = await fetch(`http://localhost:5099/api/company/${editingCompany.Id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newCompany)
        });
      } else {
        response = await fetch('http://localhost:5099/api/company', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newCompany)
        });
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }
      
      const result = await response.json();

      if (isEditing) {
        setCompanies(companies.map(company =>
          company.Id === editingCompany.Id ? result : company
        ));
      } else {
        setCompanies([...companies, result]);
      }
      
      resetForm();
    } catch (error) {
      setError(error.message);
    }
  };

  // Edit an existing company
  const handleEdit = (company) => {
    setIsEditing(true);
    setEditingCompany(company);
    setCompanyName(company.CompanyName);
  };

  // Delete a company
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5099/api/company/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      setCompanies(companies.filter(company => company.Id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  // Reset form after adding or updating
  const resetForm = () => {
    setIsEditing(false);
    setEditingCompany(null);
    setCompanyName('');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Company Manager</h1>

      {loading && <p>Loading companies...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* Form for adding/updating a company */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
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
            <h3 style={styles.companyName}>{company.CompanyName || 'No Name'}</h3> {/* Use fallback if name is missing */}
            <p style={styles.companyInfo}>Assigned Tickets: {company.AssignedTickets || 0}</p> {/* Fallback for assigned tickets */}
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

// Styles (same as before)
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
