// src/TechsUser.js
import React, { useState } from 'react';

const TechsUser = () => {
  // Define the initial state for the techs user
  const [user, setUser] = useState({
    name: 'Tech Enthusiast',
    skills: ['JavaScript', 'React', 'Node.js']
  });

  // Function to add a new skill
  const addSkill = (newSkill) => {
    setUser((prevUser) => ({
      ...prevUser,
      skills: [...prevUser.skills, newSkill]
    }));
  };

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Skills:</h2>
      <ul>
        {user.skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
      <button onClick={() => addSkill('TypeScript')}>Add TypeScript</button>
    </div>
  );
};

export default TechsUser;
