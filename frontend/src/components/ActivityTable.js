import React from 'react';
import { ChevronRight } from 'lucide-react';

const ActivityTable = ({ data = [] }) => {
  const sampleData = [
    {
      id: 1,
      vehicle: 'Tesla Model 3',
      driver: 'John Smith',
      tripType: 'Delivery',
      distance: '45.2 km',
      duration: '1h 30m',
      fuel: '12.5 L',
      status: 'Completed',
      statusColor: 'bg-green-50 text-green-700 border-green-200'
    },
    {
      id: 2,
      vehicle: 'Ford Transit',
      driver: 'Sarah Johnson',
      tripType: 'Service',
      distance: '23.8 km',
      duration: '45m',
      fuel: '8.3 L',
      status: 'In Progress',
      statusColor: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      id: 3,
      vehicle: 'BMW X5',
      driver: 'Michael Brown',
      tripType: 'Client Visit',
      distance: '62.1 km',
      duration: '2h 15m',
      fuel: '15.2 L',
      status: 'Completed',
      statusColor: 'bg-green-50 text-green-700 border-green-200'
    },
    {
      id: 4,
      vehicle: 'Volvo V90',
      driver: 'Emma Wilson',
      tripType: 'Maintenance',
      distance: '8.5 km',
      duration: '20m',
      fuel: '2.1 L',
      status: 'Scheduled',
      statusColor: 'bg-amber-50 text-amber-700 border-amber-200'
    }
  ];

  const displayData = data.length > 0 ? data : sampleData;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-slate-100">
        <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
        <p className="text-sm text-slate-600 mt-1">Latest vehicle trips and operations</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Vehicle</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 hidden md:table-cell">Driver</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 hidden lg:table-cell">Trip Type</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 hidden md:table-cell">Distance</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((row, idx) => (
              <tr
                key={row.id}
                className="border-b border-slate-100 hover:bg-blue-50/30 transition-colors duration-200 last:border-b-0"
              >
                <td className="px-6 py-4">
                  <p className="font-semibold text-slate-900">{row.vehicle}</p>
                  <p className="text-xs text-slate-500">{row.duration}</p>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <p className="text-sm text-slate-700">{row.driver}</p>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                    {row.tripType}
                  </span>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <p className="text-sm font-medium text-slate-700">{row.distance}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-lg border ${row.statusColor}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-100 transition-colors group">
                    <ChevronRight size={18} className="text-slate-400 group-hover:text-slate-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
        <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
          View All Activities →
        </button>
      </div>
    </div>
  );
};

export default ActivityTable;
