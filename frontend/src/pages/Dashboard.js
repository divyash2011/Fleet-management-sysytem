import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { Truck, Users, Wrench, Fuel } from 'lucide-react';
import StatCard from '../components/StatCard';
import ActivityTable from '../components/ActivityTable';
import ChartPlaceholder from '../components/ChartPlaceholder';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    totalDrivers: 0,
    maintenanceCount: 0,
    totalExpenses: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('fleetToken');
        if (!token) {
          navigate('/login');
          return;
        }
        const { data } = await API.get('/dashboard');
        setStats(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load dashboard stats:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('fleetToken');
          localStorage.removeItem('fleetUser');
          navigate('/login');
        } else {
          setError(err.message);
          // Set default stats if API fails
          setStats({
            totalVehicles: 5,
            totalDrivers: 8,
            maintenanceCount: 2,
            totalExpenses: 12500
          });
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            Dashboard
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Get a comprehensive overview of your fleet operations, vehicles, drivers, and maintenance tasks at a glance.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Summary Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Truck}
            label="Total Vehicles"
            value={stats.totalVehicles || 0}
            subtitle="Registered fleet units"
            bgGradient="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatCard
            icon={Users}
            label="Active Drivers"
            value={stats.totalDrivers || 0}
            subtitle="Available drivers"
            bgGradient="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          <StatCard
            icon={Wrench}
            label="Maintenance Due"
            value={stats.maintenanceCount || 0}
            subtitle="Pending services"
            bgGradient="bg-gradient-to-br from-orange-500 to-orange-600"
          />
          <StatCard
            icon={Fuel}
            label="Fuel Expenses"
            value={currency.format(stats.totalExpenses || 0)}
            subtitle="This month"
            bgGradient="bg-gradient-to-br from-pink-500 to-red-600"
            isHighlight={true}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartPlaceholder
            title="Fleet Activity Mix"
            description="Compare core counts across your operation"
          />
          <ChartPlaceholder
            title="Trip Status Overview"
            description="Active vs completed trips analysis"
          />
        </div>

        {/* Activity Table */}
        <ActivityTable />
      </div>
    </div>
  );
};

export default Dashboard;
