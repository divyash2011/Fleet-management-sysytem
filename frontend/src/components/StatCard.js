import React from 'react';

const StatCard = ({ icon: Icon, label, value, subtitle, bgGradient, isHighlight }) => {
  return (
    <div
      className={`rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-transparent ${
        isHighlight
          ? 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200'
          : 'bg-white'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 mb-2">{label}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              {value}
            </h3>
          </div>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-3 font-medium">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div
            className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg ${bgGradient}`}
          >
            <Icon size={28} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
