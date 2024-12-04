// eslint-disable-next-line no-unused-vars
import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/donors" className={({ isActive }) => isActive ? "active" : ""}>
            Donors
          </NavLink>
        </li>
        <li>
          <NavLink to="/inventory" className={({ isActive }) => isActive ? "active" : ""}>
            Inventory
          </NavLink>
        </li>
        <li>
          <NavLink to="/donations" className={({ isActive }) => isActive ? "active" : ""}>
            Donations
          </NavLink>
        </li>
        <li>
          <NavLink to="/transfusions" className={({ isActive }) => isActive ? "active" : ""}>
            Transfusions
          </NavLink>
        </li>
        <li>
          <NavLink to="/events" className={({ isActive }) => isActive ? "active" : ""}>
            Events
          </NavLink>
        </li>
        <li>
          <NavLink to="/requests" className={({ isActive }) => isActive ? "active" : ""}>
            Healthcare Requests
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;