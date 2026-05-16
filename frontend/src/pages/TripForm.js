import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/api';

const TripForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState({ title: '', vehicle: '', driver: '', origin: '', destination: '', startDate: '', endDate: '', status: 'pending', remarks: '' });
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get('/vehicles').then(({ data }) => setVehicles(data));
    API.get('/drivers').then(({ data }) => setDrivers(data));
    if (id) {
      API.get('/trips').then(({ data }) => {
        const item = data.find((t) => t._id === id);
        if (item) setTrip({
          title: item.title,
          vehicle: item.vehicle?._id || '',
          driver: item.driver?._id || '',
          origin: item.origin,
          destination: item.destination,
          startDate: item.startDate?.split('T')[0] || '',
          endDate: item.endDate?.split('T')[0] || '',
          status: item.status,
          remarks: item.remarks || '',
        });
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) await API.put(`/trips/${id}`, trip);
      else await API.post('/trips', trip);
      navigate('/trips');
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    }
  };

  return (
    <div className="col-md-8 mx-auto">
      <div className="card p-4">
        <h3>{id ? 'Edit Trip' : 'Create Trip'}</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3"><label className="form-label">Title</label><input className="form-control" value={trip.title} onChange={(e) => setTrip({ ...trip, title: e.target.value })} required /></div>
          <div className="mb-3"><label className="form-label">Vehicle</label><select className="form-select" value={trip.vehicle} onChange={(e) => setTrip({ ...trip, vehicle: e.target.value })} required><option value="">Select vehicle</option>{vehicles.map((v) => (<option key={v._id} value={v._id}>{v.number} - {v.model}</option>))}</select></div>
          <div className="mb-3"><label className="form-label">Driver</label><select className="form-select" value={trip.driver} onChange={(e) => setTrip({ ...trip, driver: e.target.value })} required><option value="">Select driver</option>{drivers.map((d) => (<option key={d._id} value={d._id}>{d.name}</option>))}</select></div>
          <div className="mb-3"><label className="form-label">Origin</label><input className="form-control" value={trip.origin} onChange={(e) => setTrip({ ...trip, origin: e.target.value })} required /></div>
          <div className="mb-3"><label className="form-label">Destination</label><input className="form-control" value={trip.destination} onChange={(e) => setTrip({ ...trip, destination: e.target.value })} required /></div>
          <div className="row g-3 mb-3"><div className="col-md-6"><label className="form-label">Start Date</label><input type="date" className="form-control" value={trip.startDate} onChange={(e) => setTrip({ ...trip, startDate: e.target.value })} required /></div><div className="col-md-6"><label className="form-label">End Date</label><input type="date" className="form-control" value={trip.endDate} onChange={(e) => setTrip({ ...trip, endDate: e.target.value })} /></div></div>
          <div className="mb-3"><label className="form-label">Status</label><select className="form-select" value={trip.status} onChange={(e) => setTrip({ ...trip, status: e.target.value })}><option value="pending">Pending</option><option value="ongoing">Ongoing</option><option value="completed">Completed</option></select></div>
          <div className="mb-3"><label className="form-label">Remarks</label><textarea className="form-control" value={trip.remarks} onChange={(e) => setTrip({ ...trip, remarks: e.target.value })} /></div>
          <button className="btn btn-primary">Save Trip</button>
        </form>
      </div>
    </div>
  );
};

export default TripForm;
