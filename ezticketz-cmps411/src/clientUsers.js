// src/ClientUsers.js
import React, { useState } from 'react';
import Client from './Client';

const ClientUsers = () => {
  // Define the initial state for the client users list
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
  });

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
    const nextId = clients.length ? Math.max(clients.map(client => client.id)) + 1 : 1;
    const newClientData = {
      id: nextId,
      name: newClient.name,
      email: newClient.email,
      phone: newClient.phone,
    };
    setClients((prevClients) => [...prevClients, newClientData]);
    setNewClient({ name: '', email: '', phone: '' }); // Reset input fields
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
