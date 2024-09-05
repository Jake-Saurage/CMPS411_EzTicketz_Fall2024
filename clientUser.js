// src/components/Client.js
import React, { useState } from 'react';

const Client = () => {
  // Define the initial state for the client
  const [client, setClient] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '555-1234',
  });

  // Function to update the client information
  const updateClient = (newInfo) => {
    setClient((prevClient) => ({
      ...prevClient,
      ...newInfo
    }));
  };

  return (
    <div>
      <h1>Client Information</h1>
      <p><strong>Name:</strong> {client.name}</p>
      <p><strong>Email:</strong> {client.email}</p>
      <p><strong>Phone:</strong> {client.phone}</p>
      <button onClick={() => updateClient({ phone: '555-5678' })}>
        Update Phone Number
      </button>
    </div>
  );
};

export default Client;
