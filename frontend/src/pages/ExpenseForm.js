import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

const ExpenseForm = () => {
  const navigate = useNavigate();
  const [expense, setExpense] = useState({ type: 'fuel', amount: '', vehicle: '', date: '', description: '' });
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => { API.get('/vehicles').then(({ data }) => setVehicles(data)); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/expenses', expense);
      navigate('/expenses');
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    }
  };

  return (
    <div className="page-section">
      <section className="hero-panel">
        <div className="row g-4 align-items-center">
          <div className="col-lg-8">
            <span className="hero-kicker">Cost Entry</span>
            <h1 className="page-title">Record a fleet expense with the details finance and operations both need.</h1>
            <p className="page-subtitle">Tie spend to the right vehicle, date, and category so monthly reporting stays accurate from day one.</p>
          </div>
          <div className="col-lg-4">
            <div className="hero-actions">
              <Link className="btn btn-outline-primary" to="/expenses">Back to Expenses</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card surface-card h-100">
            <div className="form-intro">
              <div className="form-section-title">Fast, structured entry</div>
              <p className="form-section-copy">Use consistent categories so the expense summary stays reliable and easy to scan.</p>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="card form-card">
            <div className="mb-4">
              <div className="surface-card-title">Add Expense</div>
              <p className="surface-card-subtitle">Fill in the expense details below to save a new financial record.</p>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <form className="form-shell" onSubmit={handleSubmit}>
              <div className="row g-4">
                <div className="col-md-6">
                  <label className="form-label">Type</label>
                  <select className="form-select" value={expense.type} onChange={(e) => setExpense({ ...expense, type: e.target.value })} required>
                    <option value="fuel">Fuel</option>
                    <option value="repair">Repair</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Amount</label>
                  <input type="number" step="0.01" className="form-control" value={expense.amount} onChange={(e) => setExpense({ ...expense, amount: e.target.value })} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Vehicle</label>
                  <select className="form-select" value={expense.vehicle} onChange={(e) => setExpense({ ...expense, vehicle: e.target.value })}>
                    <option value="">None</option>
                    {vehicles.map((v) => (<option key={v._id} value={v._id}>{v.number}</option>))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Date</label>
                  <input type="date" className="form-control" value={expense.date} onChange={(e) => setExpense({ ...expense, date: e.target.value })} required />
                </div>
                <div className="col-12">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" value={expense.description} onChange={(e) => setExpense({ ...expense, description: e.target.value })} />
                </div>
              </div>
              <div className="d-flex flex-wrap gap-3">
                <button className="btn btn-primary" type="submit">Save Expense</button>
                <Link className="btn btn-outline-primary" to="/expenses">Cancel</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseForm;
