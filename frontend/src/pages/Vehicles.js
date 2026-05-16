import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const loadVehicles = async () => {
    const { data } = await API.get('/vehicles', { params: { search, status } });
    setVehicles(data);
  };

  useEffect(() => { loadVehicles(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete vehicle?')) return;
    await API.delete(`/vehicles/${id}`);
    loadVehicles();
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    loadVehicles();
  };

  const statusVariant = {
    available: 'pill-success',
    assigned: 'pill-warning',
    maintenance: 'pill-neutral'
  };

  return (
    <div className="page-section">
      <section className="hero-panel">
        <div className="row g-4 align-items-center">
          <div className="col-lg-8">
            <span className="hero-kicker">Fleet Inventory</span>
            <h1 className="page-title">Manage every active vehicle from a cleaner, operationally focused workspace.</h1>
            <p className="page-subtitle">Search the fleet roster, review readiness, and jump into edits without losing context.</p>
          </div>
          <div className="col-lg-4">
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/vehicles/new">Add Vehicle</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="card surface-card">
        <div className="row g-3 align-items-end">
          <div className="col-lg-5">
            <label className="form-label">Search vehicle</label>
            <input value={search} onChange={(e) => setSearch(e.target.value)} className="form-control" placeholder="Plate, fleet number, or model" />
          </div>
          <div className="col-lg-3">
            <label className="form-label">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-select">
              <option value="">All status</option>
              <option value="available">Available</option>
              <option value="assigned">Assigned</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          <div className="col-lg-2">
            <button className="btn btn-secondary w-100" type="button" onClick={handleSearch}>Filter</button>
          </div>
          <div className="col-lg-2 text-lg-end">
            <span className="pill">{vehicles.length} vehicles</span>
          </div>
        </div>
      </section>

      <section className="table-panel">
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Number</th>
                <th>Model</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Mileage</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-state">No vehicles match the current filters.</td>
                </tr>
              ) : vehicles.map(vehicle => (
                <tr key={vehicle._id}>
                  <td className="table-strong">{vehicle.number}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.capacity}</td>
                  <td><span className={`pill ${statusVariant[vehicle.status] || 'pill-neutral'}`}>{vehicle.status}</span></td>
                  <td>{vehicle.mileage}</td>
                  <td className="text-end">
                    <Link className="btn btn-sm btn-outline-primary me-2" to={`/vehicles/edit/${vehicle._id}`}>Edit</Link>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(vehicle._id)}>Delete</button>
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

export default Vehicles;
