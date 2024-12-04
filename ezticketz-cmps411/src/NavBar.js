import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "./App.css"; // Import your CSS file

function NavBar() {
  const [userName, setUserName] = useState('');
  const [userProfileUrl, setUserProfileUrl] = useState('');
  const [userType, setUserType] = useState('');
  const [companyId, setCompanyId] = useState(null); // Use null as initial state for better error handling

  useEffect(() => {
    try {
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

        // Set the companyId for Client users
        if (storedUser.userType === 'Client') {
          setCompanyId(storedUser.companyId || null); // Ensure companyId exists, fallback to null if missing
        }
      }
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
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
        ) : userType === 'Client' ? (
          companyId ? (
            <>
              <li><Link to="/home">Home</Link></li>
              <li><Link to={`/companies/${companyId}`}>Company</Link></li>
              <li><Link to="/new-ticket-client">New Ticket</Link></li>
            </>
          ) : (
            <li>Error: Company ID not found. Please contact support.</li>
          )
        ) : (
          <li>Error: User type not recognized.</li>
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
