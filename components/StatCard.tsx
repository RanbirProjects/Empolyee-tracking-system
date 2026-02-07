import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  trend?: string;
  isTrendPositive?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, trend, isTrendPositive }) => {
  return (
    <div className="premium-card p-6 lg:p-7 rounded-2xl group">
      <div className="flex items-start justify-between mb-6">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm ${color.replace('bg-', 'bg-opacity-10 text-').replace('text-', 'bg-')} ${color}`}>
          <i className={`fas ${icon} text-lg`}></i>
        </div>
        {trend && (
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tight ${isTrendPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            {isTrendPositive ? <i className="fas fa-arrow-trend-up"></i> : <i className="fas fa-arrow-trend-down"></i>}
            {trend}
          </div>
        )}
      </div>
      <div>
        <p className="text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-1">{title}</p>
        <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">{value}</h3>
      </div>
    </div>
  );
};