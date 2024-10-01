import React, { useState, useEffect } from 'react';

const TechsUser = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
  });

  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    // Fetch the existing tech users from the backend
    fetch('http://localhost:5000/api/techusers')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching tech users:', error));
  }, []);

  // Function to add a new skill (for the first user in the list)
  const addSkill = (newSkill) => {
    const userId = users[0]?.id; // Assuming you are modifying the first user
    if (!userId) return;

    fetch(`http://localhost:5000/api/techusers/${userId}/addskill`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSkill),
    })
      .then(response => response.json())
      .then(updatedUser => {
        setUsers(prevUsers =>
          prevUsers.map(user => user.id === updatedUser.id ? updatedUser : user)
        );
      })
      .catch(error => console.error('Error adding skill:', error));
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
    fetch('http://localhost:5000/api/techusers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: newUser.username,
        password: newUser.password,
        name: `User ${users.length + 1}`,
        skills: [],
      }),
    })
      .then(response => response.json())
      .then(newUser => {
        setUsers((prevTechUsers) => [...prevTechUsers, newUser]);
        setNewUser({ username: '', password: '' }); // Reset input fields
      })
      .catch(error => console.error('Error creating user:', error));
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
      <h2>Add a Skill to First Tech User:</h2>
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
    </div>
  );
};

export default TechsUser;
