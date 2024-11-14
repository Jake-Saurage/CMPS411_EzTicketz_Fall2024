import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "./App.css"; // Import your CSS file

function NavBar() {
  const [userName, setUserName] = useState('');
  const [userProfileUrl, setUserProfileUrl] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserName(storedUser.name);

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
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/tickets-list">Tickets List</Link></li>
        <li><Link to="/new-ticket">New Ticket</Link></li>
        <li><Link to="/company">Company</Link></li>
        <li><Link to="/technicians">Technicians</Link></li>
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