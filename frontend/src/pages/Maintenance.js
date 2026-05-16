import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarClock, Plus, Trash2, Wrench } from 'lucide-react';
import API from '../services/api';

const Maintenance = () => {
  const [records, setRecords] = useState([]);

  const loadRecords = async () => {
    const { data } = await API.get('/maintenance');
    setRecords(data);
  };

  useEffect(() => { loadRecords(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete maintenance record?')) return;
    await API.delete(`/maintenance/${id}`);
    loadRecords();
  };

  const pendingCount = records.filter((item) => !item.completedDate).length;
  const completedCount = records.filter((item) => item.completedDate).length;
  const totalCost = records.reduce((sum, item) => sum + (Number(item.cost) || 0), 0);

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section className="rounded-3xl border border-slate-200 bg-white px-5 py-6 shadow-sm sm:px-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-amber-50 text-amber-700">
                <Wrench size={24} />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                  Service scheduling
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                  Maintenance
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-slate-500">
                  Track scheduled upkeep, completed work, service notes, and maintenance spend by vehicle.
                </p>
              </div>
            </div>

            <Link
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              to="/maintenance/new"
            >
              <Plus size={18} />
              Add Record
            </Link>
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Pending Service</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">{pendingCount}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Completed Service</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">{completedCount}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total Cost</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">
              ${totalCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4 sm:px-7">
            <div className="flex items-center gap-3">
              <CalendarClock size={18} className="text-slate-500" />
              <div>
                <h2 className="text-xl font-semibold text-slate-950">Maintenance Records</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Keep every scheduled and completed maintenance item in one responsive table.
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full min-w-[860px] text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.18em] text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-semibold sm:px-7">Vehicle</th>
                  <th className="px-5 py-4 font-semibold">Type</th>
                  <th className="px-5 py-4 font-semibold">Scheduled Date</th>
                  <th className="px-5 py-4 font-semibold">Completed Date</th>
                  <th className="px-5 py-4 font-semibold">Cost</th>
                  <th className="px-5 py-4 font-semibold">Notes</th>
                  <th className="px-5 py-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-5 py-12 text-center text-slate-500 sm:px-7">
                      No maintenance records yet. Add your first service record to populate this list.
                    </td>
                  </tr>
                ) : (
                  records.map((item, index) => (
                    <tr
                      key={item._id}
                      className={`border-t border-slate-200 transition hover:bg-amber-50/70 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
                      }`}
                    >
                      <td className="px-5 py-4 font-semibold text-slate-900 sm:px-7">
                        {item.vehicle?.number || 'Unknown vehicle'}
                      </td>
                      <td className="px-5 py-4">{item.type}</td>
                      <td className="px-5 py-4">
                        {new Date(item.scheduledDate).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-4">
                        {item.completedDate ? new Date(item.completedDate).toLocaleDateString() : 'Pending'}
                      </td>
                      <td className="px-5 py-4 font-medium text-slate-900">
                        ${Number(item.cost || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </td>
                      <td className="px-5 py-4 text-slate-500">{item.notes || 'No notes added'}</td>
                      <td className="px-5 py-4">
                        <button
                          className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:border-rose-300 hover:bg-rose-100"
                          onClick={() => handleDelete(item._id)}
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

export default Maintenance;
