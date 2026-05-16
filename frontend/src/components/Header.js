import React from 'react';
import { Menu, Plus } from 'lucide-react';

const Header = ({
  onMenuClick,
  onAddRecord,
  title = 'Fleet Dashboard',
  sectionTitle = 'Maintenance',
  user
}) => {
  const initials =
    user?.name
      ?.split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase() || 'FM';

  return (
    <header className="rounded-3xl border border-slate-200 bg-white px-5 py-5 shadow-sm sm:px-7 sm:py-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <button
            type="button"
            onClick={onMenuClick}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-white lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
              Operations overview
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              {title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                {sectionTitle}
              </span>
              <span className="text-sm text-slate-500">
                Upcoming service work, completed jobs, and record history in one place.
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="hidden items-center gap-3 rounded-2xl bg-slate-950 px-4 py-3 text-white shadow-sm sm:flex">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-semibold">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{user?.name || 'Fleet Admin'}</p>
              <p className="truncate text-xs text-slate-300">{user?.email || 'Operations team'}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onAddRecord}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          >
            <Plus size={18} />
            Add Record
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
