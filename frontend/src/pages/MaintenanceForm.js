import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const MaintenanceForm = () => {
  const navigate = useNavigate();
  const [maintenance, setMaintenance] = useState({ vehicle: '', scheduledDate: '', completedDate: '', type: '', cost: '', notes: '' });
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => { API.get('/vehicles').then(({ data }) => setVehicles(data)); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/maintenance', maintenance);
      navigate('/maintenance');
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    }
  };

  return (
    <div className="col-md-8 mx-auto">
      <div className="card p-4">
        <h3>Add Maintenance Record</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3"><label className="form-label">Vehicle</label><select className="form-select" value={maintenance.vehicle} onChange={(e) => setMaintenance({ ...maintenance, vehicle: e.target.value })} required><option value="">Select vehicle</option>{vehicles.map((v) => (<option key={v._id} value={v._id}>{v.number} - {v.model}</option>))}</select></div>
          <div className="row g-3 mb-3"><div className="col-md-6"><label className="form-label">Scheduled Date</label><input type="date" className="form-control" value={maintenance.scheduledDate} onChange={(e) => setMaintenance({ ...maintenance, scheduledDate: e.target.value })} required /></div><div className="col-md-6"><label className="form-label">Completed Date</label><input type="date" className="form-control" value={maintenance.completedDate} onChange={(e) => setMaintenance({ ...maintenance, completedDate: e.target.value })} /></div></div>
          <div className="mb-3"><label className="form-label">Type</label><input className="form-control" value={maintenance.type} onChange={(e) => setMaintenance({ ...maintenance, type: e.target.value })} required /></div>
          <div className="mb-3"><label className="form-label">Cost</label><input type="number" step="0.01" className="form-control" value={maintenance.cost} onChange={(e) => setMaintenance({ ...maintenance, cost: e.target.value })} /></div>
          <div className="mb-3"><label className="form-label">Notes</label><textarea className="form-control" value={maintenance.notes} onChange={(e) => setMaintenance({ ...maintenance, notes: e.target.value })} /></div>
          <button className="btn btn-primary">Save Maintenance</button>
        </form>
      </div>
    </div>
  );
};

export default MaintenanceForm;
