import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/api';

const DriverForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [driver, setDriver] = useState({ name: '', licenseNumber: '', phone: '', assignedVehicle: '' });
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get('/vehicles').then(({ data }) => setVehicles(data));
    if (id) {
      API.get('/drivers').then(({ data }) => {
        const item = data.find((d) => d._id === id);
        if (item) setDriver({ ...item, assignedVehicle: item.assignedVehicle?._id || '' });
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) await API.put(`/drivers/${id}`, driver);
      else await API.post('/drivers', driver);
      navigate('/drivers');
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    }
  };

  return (
    <div className="col-md-8 mx-auto">
      <div className="card p-4">
        <h3>{id ? 'Edit Driver' : 'Add Driver'}</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3"><label className="form-label">Name</label><input className="form-control" value={driver.name} onChange={(e) => setDriver({ ...driver, name: e.target.value })} required /></div>
          <div className="mb-3"><label className="form-label">License Number</label><input className="form-control" value={driver.licenseNumber} onChange={(e) => setDriver({ ...driver, licenseNumber: e.target.value })} required /></div>
          <div className="mb-3"><label className="form-label">Phone</label><input className="form-control" value={driver.phone} onChange={(e) => setDriver({ ...driver, phone: e.target.value })} required /></div>
          <div className="mb-3"><label className="form-label">Assign Vehicle</label><select className="form-select" value={driver.assignedVehicle} onChange={(e) => setDriver({ ...driver, assignedVehicle: e.target.value })}>
            <option value="">None</option>
            {vehicles.map((vehicle) => (<option key={vehicle._id} value={vehicle._id}>{vehicle.number} - {vehicle.model}</option>))}
          </select></div>
          <button className="btn btn-primary">Save Driver</button>
        </form>
      </div>
    </div>
  );
};

export default DriverForm;
