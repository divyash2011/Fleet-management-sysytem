import React from 'react';

const formatDate = (value) => {
  if (!value) {
    return 'Pending';
  }

  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const formatCost = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value || 0);

const ReportsTable = ({ records, loading, onDelete }) => {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4 sm:px-7">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">Maintenance</h2>
            <p className="mt-1 text-sm text-slate-500">
              Track scheduled work, completed service, and maintenance spend by vehicle.
            </p>
          </div>
          <span className="inline-flex w-fit items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
            {records.length} records
          </span>
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
            {loading ? (
              <tr>
                <td colSpan="7" className="px-5 py-12 text-center text-sm text-slate-500 sm:px-7">
                  Loading maintenance records...
                </td>
              </tr>
            ) : records.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-5 py-12 text-center text-sm text-slate-500 sm:px-7">
                  No maintenance records yet. Add your first record to populate this dashboard.
                </td>
              </tr>
            ) : (
              records.map((record, index) => (
                <tr
                  key={record._id}
                  className={`border-t border-slate-200 transition hover:bg-amber-50/70 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
                  }`}
                >
                  <td className="px-5 py-4 font-semibold text-slate-900 sm:px-7">
                    {record.vehicle?.number || record.vehicle?.name || 'Unknown vehicle'}
                  </td>
                  <td className="px-5 py-4">{record.type || 'General'}</td>
                  <td className="px-5 py-4">{formatDate(record.scheduledDate)}</td>
                  <td className="px-5 py-4">{formatDate(record.completedDate)}</td>
                  <td className="px-5 py-4 font-medium text-slate-900">{formatCost(record.cost)}</td>
                  <td className="px-5 py-4 text-slate-500">{record.notes || 'No notes added'}</td>
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => onDelete(record._id)}
                      className="inline-flex items-center justify-center rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:border-rose-300 hover:bg-rose-100"
                    >
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
  );
};

export default ReportsTable;
