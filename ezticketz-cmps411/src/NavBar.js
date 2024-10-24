import React from 'react';
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className='navbar'>
      <div className='navbar-logo'>
        Ez Tickets
      </div>
      <ul className='navbar-menu'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/tickets-list">Tickets List</Link></li>
        <li><Link to="/new-ticket">New Ticket</Link></li>
        <li><Link to="/company">Company</Link></li>
        <li><Link to="/technicians">Technicians</Link></li>
      </ul>
    </div>
  );
}

export default NavBar;
