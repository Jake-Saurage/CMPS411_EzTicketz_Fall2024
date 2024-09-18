// src/TechsUser.js
import React, { useState } from 'react';

const TechsUser = () => {
  // Define the initial state for the tech users and clients
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Tech Enthusiast',
      skills: ['JavaScript', 'React', 'Node.js'],
      username: 'tech_enthusiast',
      password: 'password123',
    },
  ]);

  const [clients, setClients] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
  });

  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Function to add a new skill (for existing user)
  const addSkill = (newSkill) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === 1 // Assuming you are modifying the first user
          ? { ...user, skills: [...user.skills, newSkill] }
          : user
      )
    );
  };

  // Function to handle new user input change
  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevNewUser) => ({
      ...prevNewUser,
      [name]: value,
    }));
  };

  // Function to create a new tech user
  const createUser = () => {
    const nextId = users.length ? Math.max(users.map(user => user.id)) + 1 : 1;
    const newTechUserData = {
      id: nextId,
      name: `User ${nextId}`,
      skills: [],
      username: newUser.username,
      password: newUser.password,
    };
    setUsers((prevTechUsers) => [...prevTechUsers, newTechUserData]);
    setNewUser({ username: '', password: '' }); // Reset input fields
  };

  // Function to handle new client input change
  const handleClientInputChange = (e) => {
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
      <h1>Existing Tech Users:</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - Skills: {user.skills.join(', ')}
          </li>
        ))}
      </ul>
      <h2>Add a Skill to Tech Enthusiast:</h2>
      <button onClick={() => addSkill('TypeScript')}>Add TypeScript</button>

      <h2>Create a New Tech User:</h2>
      <div>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={newUser.username}
            onChange={handleUserInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleUserInputChange}
          />
        </label>
      </div>
      <button onClick={createUser}>Create User</button>

      <h1>Create Client Users:</h1>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newClient.name}
            onChange={handleClientInputChange}
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
            onChange={handleClientInputChange}
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
            onChange={handleClientInputChange}
          />
        </label>
      </div>
      <button onClick={createClient}>Create Client</button>

      <h2>Existing Clients:</h2>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <h3>Client Information</h3>
            <p><strong>Name:</strong> {client.name}</p>
            <p><strong>Email:</strong> {client.email}</p>
            <p><strong>Phone:</strong> {client.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TechsUser;