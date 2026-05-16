import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Vehicles from './pages/Vehicles';
import VehicleForm from './pages/VehicleForm';
import Drivers from './pages/Drivers';
import DriverForm from './pages/DriverForm';
import Trips from './pages/Trips';
import TripForm from './pages/TripForm';
import Fuel from './pages/Fuel';
import FuelForm from './pages/FuelForm';
import Maintenance from './pages/Maintenance';
import MaintenanceForm from './pages/MaintenanceForm';
import Expenses from './pages/Expenses';
import ExpenseForm from './pages/ExpenseForm';
import Reports from './pages/Reports';
import NotFound from './pages/NotFound';

function App() {
  const [user, setUser] = useState(() => {
    const storage = localStorage.getItem('fleetUser');
    return storage ? JSON.parse(storage) : null;
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAuthPath = location.pathname === '/login' || location.pathname === '/register';

    if (!user && !isAuthPath) {
      navigate('/login');
    }
  }, [location.pathname, navigate, user]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="min-h-screen bg-slate-100">
      {!isAuthPage && user ? (
        <div className="min-h-screen lg:flex">
          <Sidebar
            isOpen={sidebarOpen}
            toggleSidebar={() => setSidebarOpen((open) => !open)}
            closeSidebar={() => setSidebarOpen(false)}
          />

          <main className="min-h-screen flex-1 bg-slate-100 lg:ml-60">
            <Routes>
              <Route element={<PrivateRoute user={user} />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/vehicles" element={<Vehicles />} />
                <Route path="/vehicles/new" element={<VehicleForm />} />
                <Route path="/vehicles/edit/:id" element={<VehicleForm />} />
                <Route path="/drivers" element={<Drivers />} />
                <Route path="/drivers/new" element={<DriverForm />} />
                <Route path="/drivers/edit/:id" element={<DriverForm />} />
                <Route path="/trips" element={<Trips />} />
                <Route path="/trips/new" element={<TripForm />} />
                <Route path="/trips/edit/:id" element={<TripForm />} />
                <Route path="/fuel" element={<Fuel />} />
                <Route path="/fuel/new" element={<FuelForm />} />
                <Route path="/maintenance" element={<Maintenance />} />
                <Route path="/maintenance/new" element={<MaintenanceForm />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/expenses/new" element={<ExpenseForm />} />
                <Route
                  path="/reports"
                  element={
                    <Reports
                      user={user}
                      onOpenSidebar={() => setSidebarOpen(true)}
                    />
                  }
                />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
