import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const FuelForm = () => {
  const navigate = useNavigate();
  const [fuel, setFuel] = useState({ vehicle: '', date: '', liters: '', cost: '', odometer: '', notes: '' });
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => { API.get('/vehicles').then(({ data }) => setVehicles(data)); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/fuel', fuel);
      navigate('/fuel');
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    }
  };

  return (
    <div className="col-md-8 mx-auto">
      <div className="card p-4">
        <h3>Add Fuel Entry</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3"><label className="form-label">Vehicle</label><select className="form-select" value={fuel.vehicle} onChange={(e) => setFuel({ ...fuel, vehicle: e.target.value })} required><option value="">Select vehicle</option>{vehicles.map((v) => (<option key={v._id} value={v._id}>{v.number} - {v.model}</option>))}</select></div>
          <div className="mb-3"><label className="form-label">Date</label><input type="date" className="form-control" value={fuel.date} onChange={(e) => setFuel({ ...fuel, date: e.target.value })} required /></div>
          <div className="row g-3 mb-3"><div className="col-md-4"><label className="form-label">Liters</label><input type="number" step="0.1" className="form-control" value={fuel.liters} onChange={(e) => setFuel({ ...fuel, liters: e.target.value })} required /></div><div className="col-md-4"><label className="form-label">Cost</label><input type="number" step="0.01" className="form-control" value={fuel.cost} onChange={(e) => setFuel({ ...fuel, cost: e.target.value })} required /></div><div className="col-md-4"><label className="form-label">Odometer</label><input type="number" className="form-control" value={fuel.odometer} onChange={(e) => setFuel({ ...fuel, odometer: e.target.value })} required /></div></div>
          <div className="mb-3"><label className="form-label">Notes</label><textarea className="form-control" value={fuel.notes} onChange={(e) => setFuel({ ...fuel, notes: e.target.value })} /></div>
          <button className="btn btn-primary">Save Fuel Entry</button>
        </form>
      </div>
    </div>
  );
};

export default FuelForm;
