
import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_USER } from '../constants';
import { AttendanceRecord, TeamMember } from '../types';

interface AttendanceProps {
  teamMembers?: TeamMember[];
}

export const Attendance: React.FC<AttendanceProps> = ({ teamMembers = [] }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logs, setLogs] = useState<AttendanceRecord[]>(MOCK_USER.attendance);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleLogin = () => {
    const timeStr = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    const dateStr = currentTime.toISOString().split('T')[0];
    
    if (!isLoggedIn) {
      const newLog: AttendanceRecord = {
        id: `A${Date.now()}`,
        date: dateStr,
        loginTime: timeStr,
        logoutTime: null,
        status: 'present',
        locationName: 'HQ Digital Gateway'
      };
      setLogs([newLog, ...logs]);
      setIsLoggedIn(true);
    } else {
      const updatedLogs = [...logs];
      const currentLog = updatedLogs.find(log => log.logoutTime === null);
      if (currentLog) currentLog.logoutTime = timeStr;
      setLogs(updatedLogs);
      setIsLoggedIn(false);
    }
  };

  const presentCount = useMemo(() => 
    teamMembers.filter(m => m.status === 'online' || m.status === 'on-site').length
  , [teamMembers]);

  const absentCount = useMemo(() => 
    teamMembers.filter(m => m.status === 'offline').length
  , [teamMembers]);

  const presencePercentage = teamMembers.length > 0 
    ? Math.round((presentCount / teamMembers.length) * 100) 
    : 0;

  const timeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  const dateString = currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      
      {/* 1. Fleet Presence Hub - NEW SECTION */}
      <div className="bg-white rounded-[40px] md:rounded-[56px] p-8 md:p-12 border border-slate-100 shadow-xl relative overflow-hidden group">
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-2">
               <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Fleet Presence Intelligence</h3>
               <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em]">Live Node Deployment & Absence Audit</p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
               <div className="flex-1 md:flex-none bg-emerald-50 px-8 py-5 rounded-[24px] border border-emerald-100 text-center">
                  <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1">Active Nodes</p>
                  <p className="text-3xl font-black text-slate-900">{presentCount.toString().padStart(2, '0')}</p>
               </div>
               <div className="flex-1 md:flex-none bg-rose-50 px-8 py-5 rounded-[24px] border border-rose-100 text-center">
                  <p className="text-[9px] font-black text-rose-600 uppercase tracking-widest mb-1">Off-Grid (Leave)</p>
                  <p className="text-3xl font-black text-slate-900">{absentCount.toString().padStart(2, '0')}</p>
               </div>
            </div>
         </div>

         <div className="mt-10 relative z-10">
            <div className="flex justify-between items-end mb-3">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Deployment Density</span>
               <span className="text-xs font-black text-indigo-600">{presencePercentage}% Capacity</span>
            </div>
            <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden p-0.5 border border-slate-100 shadow-inner">
               <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-1000 shadow-lg shadow-indigo-200"
                  style={{ width: `${presencePercentage}%` }}
               ></div>
            </div>
         </div>
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] rounded-full -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-1000"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 2. Advanced Punch Terminal */}
        <div className="lg:col-span-5 bg-slate-900 p-8 md:p-12 rounded-[40px] md:rounded-[56px] shadow-2xl relative overflow-hidden text-white border border-slate-800">
          <div className="relative z-10 text-center space-y-3 md:space-y-4 mb-10 md:mb-16">
            <h4 className="text-[10px] md:text-[11px] font-black text-indigo-400 uppercase tracking-[0.4em]">Atomic Time</h4>
            <p className="text-4xl md:text-5xl font-black tracking-tighter font-mono">{timeString}</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{dateString}</p>
          </div>

          <div className="relative mb-10 md:mb-16 flex justify-center z-10">
             <div className={`w-40 h-40 md:w-48 md:h-48 rounded-[48px] border-2 flex items-center justify-center transition-all duration-700 relative cursor-pointer ${
               isLoggedIn ? 'border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_40px_rgba(16,185,129,0.2)]' : 'border-indigo-500/30 bg-indigo-500/10 shadow-[0_0_40px_rgba(99,102,241,0.2)]'
             }`}>
                <div className="text-center">
                   <div className={`text-5xl md:text-6xl mb-4 transition-all duration-700 ${isLoggedIn ? 'text-emerald-400 scale-110' : 'text-indigo-400'}`}>
                      <i className={`fas ${isLoggedIn ? 'fa-fingerprint' : 'fa-id-badge'}`}></i>
                   </div>
                   <p className={`text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] ${isLoggedIn ? 'text-emerald-400' : 'text-indigo-400'}`}>
                      {isLoggedIn ? 'Authenticated' : 'Access Node'}
                   </p>
                </div>
             </div>
          </div>

          <button 
            onClick={toggleLogin}
            className={`w-full py-5 md:py-6 rounded-3xl font-black text-xs md:text-sm uppercase tracking-[0.3em] transition-all relative z-10 shadow-2xl active:scale-95 ${
              isLoggedIn 
                ? 'bg-rose-600 text-white shadow-rose-900/30 hover:bg-rose-700' 
                : 'bg-indigo-600 text-white shadow-indigo-900/30 hover:bg-indigo-700'
            }`}
          >
            {isLoggedIn ? 'Terminate Shift' : 'Initiate Shift'}
          </button>
        </div>

        {/* 3. Shift Logs */}
        <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[40px] md:rounded-[56px] border border-slate-100 shadow-xl flex flex-col min-h-[400px]">
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-8">Shift Ledger</h3>
          <div className="space-y-4 md:space-y-6 flex-1 overflow-y-auto custom-scroll pr-2">
            {logs.map((log) => (
              <div key={log.id} className="p-5 md:p-6 rounded-[28px] md:rounded-[32px] border border-slate-50 bg-slate-50/40 hover:bg-white transition-all hover:shadow-xl group/log">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white border border-slate-100 flex flex-col items-center justify-center shrink-0 group-hover/log:border-indigo-200 transition-colors">
                    <span className="text-[10px] font-black text-indigo-500 uppercase">{new Date(log.date).toLocaleString('default', { month: 'short' })}</span>
                    <span className="text-2xl font-black text-slate-900">{log.date.split('-')[2]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-slate-900 truncate tracking-tight group-hover/log:text-indigo-600 transition-colors">{log.locationName}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                      {log.loginTime} - {log.logoutTime || '---'}
                    </p>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest hidden sm:block ${
                    log.status === 'present' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-amber-500 text-white shadow-lg shadow-amber-200'
                  }`}>
                    {log.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
