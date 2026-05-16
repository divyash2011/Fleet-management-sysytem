import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import API from '../services/api';

const VehicleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState({ number: '', model: '', capacity: '', status: 'available', mileage: 0, notes: '' });
  const [error, setError] = useState('');
  const isEditing = Boolean(id);

  useEffect(() => {
    if (id) {
      API.get(`/vehicles`, { params: { search: '' } }).then(({ data }) => {
        const item = data.find((v) => v._id === id);
        if (item) setVehicle(item);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) await API.put(`/vehicles/${id}`, vehicle);
      else await API.post('/vehicles', vehicle);
      navigate('/vehicles');
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    }
  };

  return (
    <div className="page-section">
      <section className="hero-panel">
        <div className="row g-4 align-items-center">
          <div className="col-lg-8">
            <span className="hero-kicker">Vehicle Directory</span>
            <h1 className="page-title">{isEditing ? 'Refine vehicle details with confidence.' : 'Add a vehicle to the fleet with a complete operations profile.'}</h1>
            <p className="page-subtitle">
              Capture clear identifiers, readiness status, and service notes so dispatch, maintenance, and reporting all stay aligned.
            </p>
          </div>
          <div className="col-lg-4">
            <div className="hero-actions">
              <Link className="btn btn-outline-primary" to="/vehicles">Back to Vehicles</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card surface-card h-100">
            <div className="form-intro">
              <div className="form-section-title">{isEditing ? 'Update record' : 'Create record'}</div>
              <p className="form-section-copy">
                Keep the fleet roster accurate with a standardized record for identity, carrying capacity, and current assignment state.
              </p>
            </div>
            <div className="mt-4 d-grid gap-3">
              <div>
                <div className="metric-label">Suggested status</div>
                <div className="metric-value fs-3 text-capitalize">{vehicle.status}</div>
              </div>
              <p className="surface-card-subtitle">Use notes for maintenance history, route suitability, or assignment constraints.</p>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="card form-card">
            <div className="mb-4">
              <div className="surface-card-title">{isEditing ? 'Edit Vehicle' : 'Add Vehicle'}</div>
              <p className="surface-card-subtitle">Complete the fields below to save a clean operational record.</p>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <form className="form-shell" onSubmit={handleSubmit}>
              <div className="row g-4">
                <div className="col-md-6">
                  <label className="form-label">Vehicle Number</label>
                  <input className="form-control" value={vehicle.number} onChange={(e) => setVehicle({ ...vehicle, number: e.target.value })} required />
                  <div className="field-note">Use the fleet ID, license, or other unique operational number.</div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Model</label>
                  <input className="form-control" value={vehicle.model} onChange={(e) => setVehicle({ ...vehicle, model: e.target.value })} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Capacity</label>
                  <input className="form-control" value={vehicle.capacity} onChange={(e) => setVehicle({ ...vehicle, capacity: e.target.value })} required />
                  <div className="field-note">Enter seats, load capacity, or your preferred internal format.</div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Status</label>
                  <select className="form-select" value={vehicle.status} onChange={(e) => setVehicle({ ...vehicle, status: e.target.value })}>
                    <option value="available">Available</option>
                    <option value="assigned">Assigned</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Mileage</label>
                  <input type="number" className="form-control" value={vehicle.mileage} onChange={(e) => setVehicle({ ...vehicle, mileage: Number(e.target.value) })} />
                </div>
                <div className="col-12">
                  <label className="form-label">Notes</label>
                  <textarea className="form-control" value={vehicle.notes} onChange={(e) => setVehicle({ ...vehicle, notes: e.target.value })} />
                </div>
              </div>
              <div className="d-flex flex-wrap gap-3">
                <button className="btn btn-primary" type="submit">{isEditing ? 'Update Vehicle' : 'Save Vehicle'}</button>
                <Link className="btn btn-outline-primary" to="/vehicles">Cancel</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleForm;
