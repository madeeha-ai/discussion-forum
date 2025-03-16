import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Import custom styles

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Discussion Forum</div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/create">Create a New Thread</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
