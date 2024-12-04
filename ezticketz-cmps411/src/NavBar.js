import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "./App.css"; // Import your CSS file

function NavBar() {
  const [userName, setUserName] = useState('');
  const [userProfileUrl, setUserProfileUrl] = useState('');
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log('Stored User:', storedUser); // Debugging line to check stored user information

    if (storedUser) {
      setUserName(storedUser.name);
      setUserType(storedUser.userType);

      // Construct the user-specific profile URL based on userType and userId
      const profileUrl = storedUser.userType === 'TechUser'
        ? `/techusers/${storedUser.userId}`
        : `/clients/${storedUser.userId}`;

      setUserProfileUrl(profileUrl);
    }
  }, []);

  return (
    <div className='navbar'>
      <div className='navbar-logo'>
        <Link to="/home" className="logo-link">Ez Tickets</Link>
      </div>
      <ul className='navbar-menu'>
        {userType === 'TechUser' ? (
          <>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/tickets-list">Tickets List</Link></li>
            <li><Link to="/new-ticket">New Ticket</Link></li>
            <li><Link to="/company">Company</Link></li>
            <li><Link to="/technicians">Technicians</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/company">Company</Link></li>
          </>
        )}
      </ul>
      <div className='navbar-user'>
        {userName ? (
          <Link to={userProfileUrl} className="navbar-user-link">{userName}</Link>
        ) : (
          "Guest"
        )}
      </div>
    </div>
  );
}

export default NavBar;
