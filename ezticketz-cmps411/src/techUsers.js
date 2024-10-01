import React, { useState } from 'react';

const TechsUser = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Tech Enthusiast',
      level: [2],
      username: 'tech_enthusiast',
      password: 'password123',
    },
    {
      id: 2,
      name: 'Java Dev',
      level: [3],
      username: 'java_dev',
      password: 'password123',
    },
    {
      id: 3,
      name: 'Pythonista',
      level: [1],
      username: 'pythonista',
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

  const [error, setError] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [userNameToAddLevel, setUserNameToAddLevel] = useState('');
  const [userLevelError, setUserLevelError] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const addLevel = (userName, newLevel) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.name === userName
          ? { ...user, level: [...user.level, `Level ${newLevel}`] }
          : user
      )
    );
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevNewUser) => ({
      ...prevNewUser,
      [name]: value,
    }));
    setError('');
  };

  const createUser = () => {
    if (!newUser.username || !newUser.password) {
      setError('Both Name and Password must be filled!');
      return;
    }

    const nextId = users.length ? Math.max(users.map(user => user.id)) + 1 : 1;
    const newTechUserData = {
      id: nextId,
      name: newUser.username,
      level: [],
      username: newUser.username,
      password: newUser.password,
    };
    setUsers((prevTechUsers) => [...prevTechUsers, newTechUserData]);
    setNewUser({ username: '', password: '' });
  };

  const handleClientInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient((prevNewClient) => ({
      ...prevNewClient,
      [name]: value,
    }));
    setError('');
  };

  const createClient = () => {
    if (!newClient.name || !newClient.email || !newClient.phone) {
      setError('All fields must be filled!');
      return;
    }

    const nextId = clients.length ? Math.max(clients.map(client => client.id)) + 1 : 1;
    const newClientData = {
      id: nextId,
      name: newClient.name,
      email: newClient.email,
      phone: newClient.phone,
    };
    setClients((prevClients) => [...prevClients, newClientData]);
    setNewClient({ name: '', email: '', phone: '' });
  };

  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
  };

  const handleAddLevel = () => {
    if (selectedLevel) {
      addLevel(userNameToAddLevel, selectedLevel);
      setSelectedLevel('');
      setUserLevelError('');
      setUserNameToAddLevel('');
      setFilteredUsers([]); // Clear filtered users after adding level
    } else {
      setUserLevelError('Please select a level to add.');
    }
  };

  const handleUserNameChange = (e) => {
    const value = e.target.value;
    setUserNameToAddLevel(value);

    // Filter users based on input value
    if (value) {
      const filtered = users.filter(user => user.username.toLowerCase().includes(value.toLowerCase()));
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
    
    setUserLevelError('');
  };

  return (
    <div>
      <h1>Existing Tech Users:</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - level: {user.level.join(', ')}
          </li>
        ))}
      </ul>

      <h2>Add a Level to Tech User:</h2>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={userNameToAddLevel}
            onChange={handleUserNameChange}
          />
        </label>
        {userLevelError && <p style={{ color: 'red' }}>{userLevelError}</p>}
        
        {/* Autofill suggestions */}
        {filteredUsers.length > 0 && (
          <div style={{ border: '1px solid #ccc', maxHeight: '100px', overflowY: 'auto' }}>
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => {
                  setUserNameToAddLevel(user.username);
                  setFilteredUsers([]); // Clear suggestions after selection
                }}
                style={{ padding: '5px', cursor: 'pointer' }}
              >
                {user.name}
              </div>
            ))}
          </div>
        )}

        <label>
          Select Level:
          <select value={selectedLevel} onChange={handleLevelChange} required>
            <option value="" disabled hidden>Select a level</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <button onClick={handleAddLevel}>Add Level</button>
      </div>

      <h2>Create a New Tech User:</h2>
      {error && error !== 'All fields must be filled!' && (
        <p style={{ color: 'red' }}>{error}</p>
      )}
      <div>
        <label>
          Name:
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
      {error === 'All fields must be filled!' && (
        <p style={{ color: 'red' }}>{error}</p>
      )}
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
