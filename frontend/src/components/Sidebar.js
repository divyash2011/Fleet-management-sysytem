import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Truck,
  Users,
  Wrench,
  Fuel,
  BarChart,
  FileText,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar, closeSidebar }) => {
  const menuItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/vehicles', label: 'Vehicles', icon: Truck },
    { to: '/drivers', label: 'Drivers', icon: Users },
    { to: '/maintenance', label: 'Maintenance', icon: Wrench },
    { to: '/fuel', label: 'Fuel Logs', icon: Fuel },
    { to: '/reports', label: 'Reports', icon: FileText }
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-950/50 backdrop-blur-sm lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-screen w-60 flex-col border-r border-white/10 bg-slate-950 text-white shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-sm font-bold tracking-[0.2em] text-emerald-300">
              FM
            </div>
            <div>
              <div className="text-base font-semibold text-white">Fleet Management</div>
              <div className="text-xs text-slate-400">Operations Suite</div>
            </div>
          </div>
          <button
            type="button"
            onClick={toggleSidebar}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 text-slate-300 transition hover:bg-slate-900 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 px-4 py-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => {
                  if (window.innerWidth < 1024 && closeSidebar) {
                    closeSidebar();
                  }
                }}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={18} className="transition-transform group-hover:scale-105" />
                    <span>{item.label}</span>
                    {isActive && (
                      <div className="ml-auto h-2.5 w-2.5 rounded-full bg-slate-950" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-slate-800 px-5 py-5">
          <div className="rounded-2xl bg-slate-900 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Reports active
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Monitor maintenance activity, service timing, and record cleanup from one workspace.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
