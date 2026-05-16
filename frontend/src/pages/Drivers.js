import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Plus, Trash2, Users } from 'lucide-react';
import API from '../services/api';

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);

  const loadDrivers = async () => {
    const { data } = await API.get('/drivers');
    setDrivers(data);
  };

  useEffect(() => { loadDrivers(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete driver?')) return;
    await API.delete(`/drivers/${id}`);
    loadDrivers();
  };

  const assignedDrivers = drivers.filter((driver) => driver.assignedVehicle).length;
  const availableDrivers = drivers.filter((driver) => driver.status === 'available').length;

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section className="rounded-3xl border border-slate-200 bg-white px-5 py-6 shadow-sm sm:px-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-50 text-blue-700">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                  Team operations
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                  Drivers
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-slate-500">
                  Manage assignments, monitor availability, and keep your active driver roster organized.
                </p>
              </div>
            </div>

            <Link
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              to="/drivers/new"
            >
              <Plus size={18} />
              Add Driver
            </Link>
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total Drivers</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">{drivers.length}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Assigned</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">{assignedDrivers}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Available</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">{availableDrivers}</p>
          </div>
        </div>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4 sm:px-7">
            <h2 className="text-xl font-semibold text-slate-950">Driver Roster</h2>
            <p className="mt-1 text-sm text-slate-500">
              View driver details, current assignment status, and quick actions.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full min-w-[780px] text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.18em] text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-semibold sm:px-7">Name</th>
                  <th className="px-5 py-4 font-semibold">License</th>
                  <th className="px-5 py-4 font-semibold">Phone</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Vehicle</th>
                  <th className="px-5 py-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {drivers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-5 py-12 text-center text-slate-500 sm:px-7">
                      No drivers yet. Add your first driver to start assigning vehicles.
                    </td>
                  </tr>
                ) : (
                  drivers.map((driver, index) => (
                    <tr
                      key={driver._id}
                      className={`border-t border-slate-200 transition hover:bg-blue-50/70 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
                      }`}
                    >
                      <td className="px-5 py-4 font-semibold text-slate-900 sm:px-7">{driver.name}</td>
                      <td className="px-5 py-4">{driver.licenseNumber}</td>
                      <td className="px-5 py-4">{driver.phone}</td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            driver.status === 'available'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {driver.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">{driver.assignedVehicle?.number || 'Not assigned'}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                            to={`/drivers/edit/${driver._id}`}
                          >
                            <Pencil size={14} />
                            Edit
                          </Link>
                          <button
                            className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:border-rose-300 hover:bg-rose-100"
                            onClick={() => handleDelete(driver._id)}
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Drivers;
