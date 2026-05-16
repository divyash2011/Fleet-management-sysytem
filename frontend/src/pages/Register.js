import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

const Register = ({ setUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/register', { name, email, password });
      localStorage.setItem('fleetToken', data.token);
      localStorage.setItem('fleetUser', JSON.stringify(data.user));
      setUser(data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card row g-0">
        <div className="col-lg-5 auth-aside">
          <span className="hero-kicker">Admin Setup</span>
          <h2>Set up secure access for your fleet operations team.</h2>
          <p>Create an admin account to start managing vehicles, trips, drivers, and operational spending from one place.</p>
          <ul className="auth-list">
            <li>Fast onboarding for operations staff</li>
            <li>Shared visibility across dispatch and finance</li>
            <li>Scalable structure for daily fleet workflows</li>
          </ul>
        </div>
        <div className="col-lg-7 auth-form">
          <h3>Admin Register</h3>
          <p className="surface-card-subtitle">Create your account to begin configuring the platform.</p>
          {error && <div className="alert alert-danger">{error}</div>}
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-4">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="6" />
            </div>
            <button className="btn btn-primary w-100">Register</button>
          </form>
          <p className="mt-4 mb-0 text-center">
            Already have account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
