import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Gauge, Plus, Trash2 } from 'lucide-react';
import API from '../services/api';

const Fuel = () => {
  const [fuelEntries, setFuelEntries] = useState([]);

  const loadFuel = async () => {
    const { data } = await API.get('/fuel');
    setFuelEntries(data);
  };

  useEffect(() => { loadFuel(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete fuel entry?')) return;
    await API.delete(`/fuel/${id}`);
    loadFuel();
  };

  const totalLiters = fuelEntries.reduce((sum, fuel) => sum + (Number(fuel.liters) || 0), 0);
  const totalCost = fuelEntries.reduce((sum, fuel) => sum + (Number(fuel.cost) || 0), 0);
  const latestOdometer = fuelEntries.reduce(
    (max, fuel) => Math.max(max, Number(fuel.odometer) || 0),
    0
  );

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section className="rounded-3xl border border-slate-200 bg-white px-5 py-6 shadow-sm sm:px-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-50 text-cyan-700">
                <Droplets size={24} />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                  Fuel tracking
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                  Fuel Logs
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-slate-500">
                  Review fill-ups, fuel spend, odometer history, and notes from every vehicle stop.
                </p>
              </div>
            </div>

            <Link
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              to="/fuel/new"
            >
              <Plus size={18} />
              Add Fuel Entry
            </Link>
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total Liters</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">{totalLiters.toFixed(1)} L</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Fuel Spend</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">
              ${totalCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Latest Odometer</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">
              {latestOdometer.toLocaleString('en-US')} km
            </p>
          </div>
        </div>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4 sm:px-7">
            <div className="flex items-center gap-3">
              <Gauge size={18} className="text-slate-500" />
              <div>
                <h2 className="text-xl font-semibold text-slate-950">Fuel History</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Search-friendly rows with clearer spacing, striping, and quick delete actions.
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full min-w-[860px] text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.18em] text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-semibold sm:px-7">Date</th>
                  <th className="px-5 py-4 font-semibold">Vehicle</th>
                  <th className="px-5 py-4 font-semibold">Liters</th>
                  <th className="px-5 py-4 font-semibold">Cost</th>
                  <th className="px-5 py-4 font-semibold">Odometer</th>
                  <th className="px-5 py-4 font-semibold">Notes</th>
                  <th className="px-5 py-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {fuelEntries.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-5 py-12 text-center text-slate-500 sm:px-7">
                      No fuel entries yet. Add a fill-up record to start tracking usage.
                    </td>
                  </tr>
                ) : (
                  fuelEntries.map((fuel, index) => (
                    <tr
                      key={fuel._id}
                      className={`border-t border-slate-200 transition hover:bg-cyan-50/70 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
                      }`}
                    >
                      <td className="px-5 py-4 font-semibold text-slate-900 sm:px-7">
                        {new Date(fuel.date).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-4">{fuel.vehicle?.number || 'Unknown vehicle'}</td>
                      <td className="px-5 py-4">{Number(fuel.liters || 0).toFixed(1)} L</td>
                      <td className="px-5 py-4 font-medium text-slate-900">
                        ${Number(fuel.cost || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </td>
                      <td className="px-5 py-4">{Number(fuel.odometer || 0).toLocaleString('en-US')}</td>
                      <td className="px-5 py-4 text-slate-500">{fuel.notes || 'No notes added'}</td>
                      <td className="px-5 py-4">
                        <button
                          className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:border-rose-300 hover:bg-rose-100"
                          onClick={() => handleDelete(fuel._id)}
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
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

export default Fuel;
