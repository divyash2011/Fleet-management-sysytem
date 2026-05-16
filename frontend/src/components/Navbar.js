import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const navLinks = [
    { to: '/vehicles', label: 'Vehicles' },
    { to: '/drivers', label: 'Drivers' },
    { to: '/trips', label: 'Trips' },
    { to: '/fuel', label: 'Fuel' },
    { to: '/maintenance', label: 'Maintenance' },
    { to: '/expenses', label: 'Expenses' },
    { to: '/reports', label: 'Reports' }
  ];

  return (
    <nav className="navbar navbar-expand-lg topbar">
      <div className="container app-main">
        <div className="topbar-panel w-100">
        <Link className="navbar-brand d-flex align-items-center gap-3 me-4" to="/">
          <span className="brand-mark">FM</span>
          <span className="brand-copy">
            <small>Operations Suite</small>
            <span>Fleet Management</span>
          </span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {user && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {navLinks.map(({ to, label }) => (
                <li className="nav-item" key={to}>
                  <NavLink className="nav-link" to={to}>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
          <div className="d-flex align-items-center gap-2 flex-wrap">
            {user ? (
              <>
                <span className="user-chip">{user.name}</span>
                <button className="btn btn-soft-light btn-sm" onClick={onLogout}>Logout</button>
              </>
            ) : (
              <Link className="btn btn-soft-light btn-sm" to="/login">Login</Link>
            )}
          </div>
        </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
