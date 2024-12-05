import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "./App.css";

function NavBar() {
  const [userName, setUserName] = useState('');
  const [userProfileUrl, setUserProfileUrl] = useState('');
  const [userType, setUserType] = useState('');
  const [companyId, setCompanyId] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      console.log('Stored User:', storedUser);

      if (storedUser) {
        setUserName(storedUser.name);
        setUserType(storedUser.userType);

        const profileUrl = storedUser.userType === 'TechUser'
          ? `/techusers/${storedUser.userId}`
          : `/clients/${storedUser.userId}`;
        setUserProfileUrl(profileUrl);

        if (storedUser.userType === 'Client') {
          setCompanyId(storedUser.companyId || null);
        }
      }
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
    }
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("user");
    setShowToast(true);

    // Hide the toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
      window.location.href = "http://localhost:3000/";
    }, 3000);
  };

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
          <>
            <Link to={userProfileUrl} className="navbar-user-link">{userName}</Link>
            <a href="/" onClick={handleLogout} className="navbar-user-link">Logout</a>
          </>
        ) : (
          "Guest"
        )}
      </div>

      {/* Toast for logout */}
      {showToast && (
        <div className="toast">
          <p>You have successfully logged out.</p>
        </div>
      )}

      <style>
        {`
          .toast {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #28a745;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            opacity: 0;
            animation: fadeInOut 3s ease-out forwards;
          }

          @keyframes fadeInOut {
            0% {
              opacity: 0;
              transform: translateX(-50%) translateY(20px);
            }
            50% {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
            100% {
              opacity: 0;
              transform: translateX(-50%) translateY(20px);
            }
          }
        `}
      </style>
    </div>
  );
}

export default NavBar;
