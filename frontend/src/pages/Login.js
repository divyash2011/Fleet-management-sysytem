import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', { email, password });
      localStorage.setItem('fleetToken', data.token);
      localStorage.setItem('fleetUser', JSON.stringify(data.user));
      setUser(data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card row g-0">
        <div className="col-lg-5 auth-aside">
          <span className="hero-kicker">Control Center</span>
          <h2>Run fleet operations from one professional dashboard.</h2>
          <p>Monitor vehicles, drivers, trips, maintenance, and expense trends through a single admin workspace.</p>
          <ul className="auth-list">
            <li>Centralized fleet records</li>
            <li>Operational reporting and cost tracking</li>
            <li>Cleaner day-to-day dispatch visibility</li>
          </ul>
        </div>
        <div className="col-lg-7 auth-form">
          <h3>Admin Login</h3>
          <p className="surface-card-subtitle">Enter your credentials to access the fleet management suite.</p>
          {error && <div className="alert alert-danger">{error}</div>}
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-4">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button className="btn btn-primary w-100">Login</button>
          </form>
          <p className="mt-4 mb-0 text-center">
            New admin? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
