import React from 'react';
import { Link } from "react-router-dom";
import './App'; // Make sure to import your CSS file

function NavBar() {
    return (
        <div className='navbar'>
            <div className='navbar-logo'>
                <Link to="/" className="logo-link">Ez Tickets</Link>
            </div>
            <ul className='navbar-menu'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/tickets">Tickets</Link></li>
                <li><Link to="/techUser">Tech User</Link></li>
                <li><Link to="/company">Company</Link></li>
            </ul>
        </div>
    );
}

export default NavBar;
