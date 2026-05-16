import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({ total: 0, byType: [] });
  const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  const loadExpenses = async () => {
    const [{ data: expensesData }, { data: summaryData }] = await Promise.all([API.get('/expenses'), API.get('/expenses/summary')]);
    setExpenses(expensesData);
    setSummary(summaryData);
  };

  useEffect(() => { loadExpenses(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete expense?')) return;
    await API.delete(`/expenses/${id}`);
    loadExpenses();
  };

  const typeVariant = {
    fuel: 'pill-warning',
    repair: 'pill-success',
    other: 'pill-neutral'
  };

  return (
    <div className="page-section">
      <section className="hero-panel">
        <div className="row g-4 align-items-center">
          <div className="col-lg-8">
            <span className="hero-kicker">Finance Monitor</span>
            <h1 className="page-title">Track fleet spending with cleaner operational visibility.</h1>
            <p className="page-subtitle">
              Review expense trends, keep vehicle-linked charges organized, and act on cost spikes before they become routing or maintenance issues.
            </p>
          </div>
          <div className="col-lg-4">
            <div className="hero-actions">
              <Link className="btn btn-outline-primary" to="/reports">Open Reports</Link>
              <Link className="btn btn-primary" to="/expenses/new">Add Expense</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="row g-4">
        <div className="col-lg-4">
          <div className="card metric-card highlight">
            <div className="metric-label">Total Expense</div>
            <div className="metric-value">{currency.format(summary.total || 0)}</div>
            <p className="metric-footnote">Combined spend across all recorded fleet expense categories.</p>
          </div>
        </div>
        {summary.byType?.map((item) => (
          <div key={item._id} className="col-md-6 col-lg-4">
            <div className="card metric-card">
              <div className="d-flex justify-content-between align-items-start gap-3">
                <div>
                  <div className="metric-label">{item._id}</div>
                  <div className="metric-value">{currency.format(item.amount || 0)}</div>
                </div>
                <span className={`pill ${typeVariant[item._id] || 'pill-neutral'}`}>{item._id}</span>
              </div>
              <p className="metric-footnote">Breakdown by expense type for quick budgeting review.</p>
            </div>
          </div>
        ))}
      </section>

      <section className="table-panel">
        <div className="table-panel-header d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div>
            <div className="surface-card-title">Expense Ledger</div>
            <p className="surface-card-subtitle">Every logged operating cost, organized by date, vehicle, and type.</p>
          </div>
          <span className="pill">{expenses.length} records</span>
        </div>
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Vehicle</th>
                <th>Description</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-state">No expenses yet. Add your first record to start tracking costs.</td>
                </tr>
              ) : expenses.map((item) => (
                <tr key={item._id}>
                  <td className="table-strong">{new Date(item.date).toLocaleDateString()}</td>
                  <td><span className={`pill ${typeVariant[item.type] || 'pill-neutral'}`}>{item.type}</span></td>
                  <td className="table-strong">{currency.format(item.amount || 0)}</td>
                  <td>{item.vehicle?.number || 'Unassigned'}</td>
                  <td className="record-note">{item.description || 'No description provided'}</td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Expenses;
