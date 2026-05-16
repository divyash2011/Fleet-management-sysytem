import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

const Trips = () => {
  const [trips, setTrips] = useState([]);

  const loadTrips = async () => {
    const { data } = await API.get('/trips');
    setTrips(data);
  };

  useEffect(() => { loadTrips(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete trip?')) return;
    await API.delete(`/trips/${id}`);
    loadTrips();
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Trips</h3>
        <Link className="btn btn-primary" to="/trips/new">Create Trip</Link>
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead><tr><th>Title</th><th>Vehicle</th><th>Driver</th><th>Status</th><th>Route</th><th>Dates</th><th>Actions</th></tr></thead>
          <tbody>
            {trips.map((trip) => (
              <tr key={trip._id}>
                <td>{trip.title}</td>
                <td>{trip.vehicle?.number}</td>
                <td>{trip.driver?.name}</td>
                <td>{trip.status}</td>
                <td>{trip.origin} → {trip.destination}</td>
                <td>{new Date(trip.startDate).toLocaleDateString()} - {trip.endDate ? new Date(trip.endDate).toLocaleDateString() : '...'}</td>
                <td>
                  <Link className="btn btn-sm btn-outline-primary me-2" to={`/trips/edit/${trip._id}`}>Edit</Link>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(trip._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Trips;
