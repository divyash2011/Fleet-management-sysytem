import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download } from 'lucide-react';
import Header from '../components/Header';
import ReportsTable from '../components/ReportsTable';
import API from '../services/api';

const Reports = ({ user, onOpenSidebar }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loadRecords = async () => {
    setLoading(true);
    setError('');

    try {
      const { data } = await API.get('/maintenance');
      setRecords(Array.isArray(data) ? data : []);
    } catch (error) {
      setError(error?.response?.data?.message || 'Unable to load maintenance records right now.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const handleDownload = async (type) => {
    try {
      const response = await API.get(`/reports?type=${type}`, {
        responseType: 'blob'
      });

      const blobUrl = window.URL.createObjectURL(
        new Blob([response.data], { type: 'application/pdf' })
      );
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${type}-report.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (downloadError) {
      alert(downloadError?.response?.data?.message || 'Failed to download report.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this maintenance record?')) {
      return;
    }

    try {
      await API.delete(`/maintenance/${id}`);
      setRecords((current) => current.filter((record) => record._id !== id));
    } catch (error) {
      alert(error?.response?.data?.message || 'Failed to delete maintenance record.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <Header
          user={user}
          onMenuClick={onOpenSidebar}
          onAddRecord={() => navigate('/maintenance/new')}
        />

        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
            {error}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total Records</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">{records.length}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Pending Services</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">
              {records.filter((record) => !record.completedDate).length}
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Completed Jobs</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">
              {records.filter((record) => record.completedDate).length}
            </p>
          </div>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-950">Report Downloads</h2>
              <p className="mt-1 text-sm text-slate-500">
                Export fleet snapshots as PDF reports for sharing or recordkeeping.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {['vehicle', 'trip', 'expense'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleDownload(type)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white"
                >
                  <Download size={16} />
                  {type.charAt(0).toUpperCase() + type.slice(1)} Report
                </button>
              ))}
            </div>
          </div>
        </section>

        <ReportsTable
          records={records}
          loading={loading}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Reports;
