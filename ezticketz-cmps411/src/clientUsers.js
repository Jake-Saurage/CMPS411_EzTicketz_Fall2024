import React, { useState, useEffect } from 'react';
import Client from './Client';

const ClientUsers = () => {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    // Fetch the existing client users from the backend
    fetch('http://localhost:5000/api/clients')
      .then(response => response.json())
      .then(data => setClients(data))
      .catch(error => console.error('Error fetching clients:', error));
  }, []);

  // Function to handle new client input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient((prevNewClient) => ({
      ...prevNewClient,
      [name]: value,
    }));
  };

  // Function to create a new client
  const createClient = () => {
    fetch('http://localhost:5000/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newClient),
    })
      .then(response => response.json())
      .then(newClientData => {
        setClients((prevClients) => [...prevClients, newClientData]);
        setNewClient({ name: '', email: '', phone: '' }); // Reset input fields
      })
      .catch(error => console.error('Error creating client:', error));
  };

  return (
    <div>
      <h1>Client Users:</h1>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <Client client={client} />
          </li>
        ))}
      </ul>
      <h2>Create a New Client:</h2>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newClient.name}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={newClient.email}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={newClient.phone}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <button onClick={createClient}>Create Client</button>
    </div>
  );
};

export default ClientUsers;
