import React, { useState, useEffect } from 'react';

const TechsUser = () => {
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [newClient, setNewClient] = useState({ name: '', email: '', phone: '' });
  const [error, setError] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [userNameToAddLevel, setUserNameToAddLevel] = useState('');
  const [userLevelError, setUserLevelError] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    // Fetch existing tech users from the backend
    fetch('http://localhost:5099/api/techusers')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched Tech Users:', data); // Debugging log

        // Use level data as provided by the backend
        const formattedData = data.map(user => ({
          ...user,
          level: Array.isArray(user.level) ? user.level : [user.level] // Ensure level is treated as an array
        }));

        // Log each user's levels to ensure they're properly formatted
        formattedData.forEach(user => {
          console.log(`User ${user.name}'s Levels:`, user.level); // Log each user's levels
        });

        setUsers(formattedData);
      })
      .catch((error) => console.error('Error fetching tech users:', error));

    // Fetch existing clients from the backend
    fetch('http://localhost:5099/api/clients')
      .then((response) => response.json())
      .then((data) => setClients(data))
      .catch((error) => console.error('Error fetching clients:', error));
  }, []);

  const addLevel = (userName, newLevel) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.name === userName
          ? { ...user, level: [...(user.level || []), newLevel] } // Ensure level is treated as an array
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

    const nextId = users.length ? Math.max(users.map((user) => user.id)) + 1 : 1;
    const newTechUserData = {
      id: nextId,
      name: newUser.username,
      level: [], // Set level to an empty array initially
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

    const nextId = clients.length
      ? Math.max(clients.map((client) => client.id)) + 1
      : 1;
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
      setFilteredUsers([]);
    } else {
      setUserLevelError('Please select a level to add.');
    }
  };

  const handleUserNameChange = (e) => {
    const value = e.target.value;
    setUserNameToAddLevel(value);

    // Filter users based on input value
    if (value) {
      const filtered = users.filter((user) =>
        user.username.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }

    setUserLevelError('');
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f0f0f0',
      borderRadius: '8px',
    },
    heading: {
      textAlign: 'center',
      color: '#333',
    },
    formGroup: {
      marginBottom: '15px',
    },
    input: {
      width: '100%',
      padding: '8px',
      margin: '5px 0',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    button: {
      padding: '10px 15px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    errorMessage: {
      color: 'red',
    },
    userList: {
      listStyle: 'none',
      padding: 0,
    },
    userItem: {
      backgroundColor: '#fff',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      marginBottom: '10px',
    },
    clientInfo: {
      marginTop: '20px',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Tech Users and Clients Management</h1>

      <h2>Existing Tech Users:</h2>
      <ul style={styles.userList}>
        {users.map((user) => (
          <li key={user.id} style={styles.userItem}>
            {user.name} - level: {user.level && user.level.length > 0
              ? user.level.map((lvl, index) => <span key={index}>{lvl}</span>) // Display each level in the array
              : 'No levels assigned'}
          </li>
        ))}
      </ul>

      <h2>Add a Level to Tech User:</h2>
      <div style={styles.formGroup}>
        <label>
          Name:
          <input
            type="text"
            value={userNameToAddLevel}
            onChange={handleUserNameChange}
            style={styles.input}
          />
        </label>
        {userLevelError && (
          <p style={styles.errorMessage}>{userLevelError}</p>
        )}

        {/* Autofill suggestions */}
        {filteredUsers.length > 0 && (
          <div
            style={{
              border: '1px solid #ccc',
              maxHeight: '100px',
              overflowY: 'auto',
              backgroundColor: '#fff',
            }}
          >
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
          <select
            value={selectedLevel}
            onChange={handleLevelChange}
            style={styles.input}
            required
          >
            <option value="" disabled hidden>
              Select a level
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <button style={styles.button} onClick={handleAddLevel}>
          Add Level
        </button>
      </div>

      <h2>Create a New Tech User:</h2>
      {error && error !== 'All fields must be filled!' && (
        <p style={styles.errorMessage}>{error}</p>
      )}
      <div style={styles.formGroup}>
        <label>
          Name:
          <input
            type="text"
            name="username"
            value={newUser.username}
            onChange={handleUserInputChange}
            style={styles.input}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleUserInputChange}
            style={styles.input}
          />
        </label>
        <button style={styles.button} onClick={createUser}>
          Create User
        </button>
      </div>

      <h2>Create a New Client:</h2>
      <div style={styles.formGroup}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newClient.name}
            onChange={handleClientInputChange}
            style={styles.input}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={newClient.email}
            onChange={handleClientInputChange}
            style={styles.input}
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={newClient.phone}
            onChange={handleClientInputChange}
            style={styles.input}
          />
        </label>
        <button style={styles.button} onClick={createClient}>
          Create Client
        </button>
      </div>

      <h2 className={styles.clientInfo}>Existing Clients:</h2>
      <ul style={styles.userList}>
        {clients.map((client) => (
          <li key={client.id} style={styles.userItem}>
            <h3>Client Info</h3>
            <p>
              <strong>Name:</strong> {client.name}
            </p>
            <p>
              <strong>Email:</strong> {client.email}
            </p>
            <p>
              <strong>Phone:</strong> {client.phone}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TechsUser;
