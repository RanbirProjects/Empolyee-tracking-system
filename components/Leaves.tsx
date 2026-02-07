
import React, { useState, useMemo } from 'react';

interface LeaveItem {
  id: string;
  type: string;
  range: string;
  status: string;
  days: number;
}

interface LeavesProps {
  leaves: LeaveItem[];
  teamData: any[];
  onAddLeave: () => void;
  onApprove: (id: string) => void;
  onDeny: (id: string) => void;
}

export const Leaves: React.FC<LeavesProps> = ({ leaves, teamData, onAddLeave, onApprove, onDeny }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmpId, setSelectedEmpId] = useState<string | null>(null);

  const filteredTeam = useMemo(() => teamData.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchTerm.toLowerCase())
  ), [searchTerm, teamData]);

  const selectedEmployee = useMemo(() => 
    teamData.find(e => e.id === selectedEmpId)
  , [selectedEmpId, teamData]);

  const getMockHistory = (emp: any) => {
    if (!emp) return [];
    const history = [];
    if (emp.leavesTaken > 0) history.push({ id: 'H1', type: 'Annual Vacation', range: 'May 01 - May 05', status: 'Approved', days: 5 });
    if (emp.leavesTaken > 5) history.push({ id: 'H2', type: 'Sick Leave', range: 'Apr 12 - Apr 14', status: 'Approved', days: 3 });
    if (emp.pendingLeaves > 0) history.push({ id: 'H4', type: 'Unpaid Leave', range: 'Jun 15 - Jun 17', status: 'Pending', days: emp.pendingLeaves });
    return history;
  };

  const historyToDisplay = selectedEmployee ? getMockHistory(selectedEmployee) : leaves;

  const categoryConfig: Record<string, { color: string, light: string, icon: string }> = {
    'Vacation': { color: 'bg-indigo-600', light: 'bg-indigo-50 text-indigo-600', icon: 'fa-plane-departure' },
    'Sick Leave': { color: 'bg-rose-600', light: 'bg-rose-50 text-rose-600', icon: 'fa-pills' },
    'Unpaid Leave': { color: 'bg-amber-600', light: 'bg-amber-50 text-amber-600', icon: 'fa-user-clock' },
    'Personal Leave': { color: 'bg-emerald-600', light: 'bg-emerald-50 text-emerald-600', icon: 'fa-mug-hot' },
    'Annual Leave': { color: 'bg-purple-600', light: 'bg-purple-50 text-purple-600', icon: 'fa-calendar-check' },
    'Annual Vacation': { color: 'bg-indigo-600', light: 'bg-indigo-50 text-indigo-600', icon: 'fa-plane-departure' },
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      {/* 1. Statistics Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[56px] p-16 text-white relative overflow-hidden shadow-2xl animate-glow">
            <div className="relative z-10">
               <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-xl text-indigo-400 shadow-xl border border-white/10">
                     <i className="fas fa-calendar-day"></i>
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400">Absence Telemetry Node</span>
               </div>
               <div className="flex flex-col md:flex-row gap-16">
                  <div>
                    <h2 className="text-6xl font-black tracking-tighter mb-3">
                       {teamData.reduce((acc, curr) => acc + curr.leavesTaken, 0)} <span className="text-3xl text-slate-500">Days</span>
                    </h2>
                    <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Fleet-Wide Utilization (YTD)</p>
                  </div>
                  <div className="h-20 w-px bg-white/10 hidden md:block mt-2"></div>
                  <div>
                    <h2 className="text-6xl font-black tracking-tighter mb-3 text-amber-500">
                       {teamData.reduce((acc, curr) => acc + curr.pendingLeaves, 0)} <span className="text-3xl text-slate-500">Items</span>
                    </h2>
                    <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Actionable Requests Queue</p>
                  </div>
               </div>
            </div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full"></div>
         </div>
         
         <div className="bg-white rounded-[56px] p-12 card-hover border border-slate-100 shadow-xl flex flex-col justify-between group">
            <div className="w-20 h-20 bg-indigo-50 rounded-[32px] flex items-center justify-center text-indigo-600 mb-10 group-hover:scale-110 transition-transform shadow-inner">
               <i className="fas fa-paper-plane text-3xl"></i>
            </div>
            <div>
               <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight leading-tight">Apply for Absence</h3>
               <p className="text-slate-400 font-bold text-xs uppercase tracking-widest leading-relaxed">Secure Node Submission</p>
            </div>
            <button onClick={onAddLeave} className="w-full mt-10 py-6 bg-indigo-600 text-white rounded-[32px] font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">Initiate Request</button>
         </div>
      </div>

      {/* 2. Team Directory with Selection */}
      <div className="bg-white rounded-[56px] p-16 card-hover border border-slate-100 shadow-xl overflow-hidden relative">
         <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-10 mb-16 relative z-10">
            <div>
               <h3 className="text-4xl font-black text-slate-900 tracking-tighter">Absence Tracking Radar</h3>
               <p className="text-slate-400 font-bold text-sm mt-3 leading-relaxed max-w-xl">Deep telemetry of workforce availability. Select a node for history drill-down.</p>
            </div>
            <div className="relative w-full xl:w-96">
               <input 
                  type="text" placeholder="Search Identity or Role..." 
                  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 pl-16 pr-8 py-6 rounded-[32px] font-black text-sm focus:ring-8 focus:ring-indigo-500/5 focus:bg-white outline-none transition-all shadow-inner"
               />
               <i className="fas fa-search absolute left-7 top-1/2 -translate-y-1/2 text-slate-300 text-xl"></i>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 relative z-10">
            {filteredTeam.map((emp) => (
               <div 
                  key={emp.id} onClick={() => setSelectedEmpId(selectedEmpId === emp.id ? null : emp.id)}
                  className={`group p-10 rounded-[48px] border transition-all duration-500 flex flex-col cursor-pointer ${
                     selectedEmpId === emp.id ? 'bg-slate-900 text-white border-slate-900 shadow-[0_30px_60px_-15px_rgba(15,23,42,0.4)]' : 'bg-white border-slate-100 hover:border-indigo-100 hover:shadow-2xl'
                  }`}
               >
                  <div className="flex items-center gap-6 mb-10">
                     <div className="relative">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${emp.avatar}`} className="w-20 h-20 rounded-[32px] bg-slate-100 border border-slate-200 group-hover:scale-110 transition-transform" />
                        <div className={`absolute -bottom-1 -right-1 w-7 h-7 border-4 rounded-full ${emp.pendingLeaves > 0 ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'} ${selectedEmpId === emp.id ? 'border-slate-900' : 'border-white'}`}></div>
                     </div>
                     <div>
                        <h4 className={`text-xl font-black transition-colors tracking-tight ${selectedEmpId === emp.id ? 'text-white' : 'text-slate-900 group-hover:text-indigo-600'}`}>{emp.name}</h4>
                        <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${selectedEmpId === emp.id ? 'text-slate-500' : 'text-slate-400'}`}>{emp.role}</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5 mb-10">
                     <div className={`p-6 rounded-[32px] text-center transition-colors ${selectedEmpId === emp.id ? 'bg-white/5 border border-white/5' : 'bg-slate-50 border border-slate-50'}`}>
                        <p className="text-[9px] font-black uppercase text-slate-400 mb-2 tracking-widest">Utilized</p>
                        <p className="text-2xl font-black">{emp.leavesTaken}d</p>
                     </div>
                     <div className={`p-6 rounded-[32px] text-center transition-colors ${selectedEmpId === emp.id ? 'bg-white/5 border border-white/5' : 'bg-slate-50 border border-slate-50'}`}>
                        <p className="text-[9px] font-black uppercase text-slate-400 mb-2 tracking-widest">Pending</p>
                        <p className={`text-2xl font-black ${emp.pendingLeaves > 0 ? 'text-amber-500' : ''}`}>{emp.pendingLeaves}d</p>
                     </div>
                  </div>

                  {emp.pendingLeaves > 0 && (
                     <div className="flex gap-4" onClick={e => e.stopPropagation()}>
                        <button onClick={() => onApprove(emp.id)} className="flex-1 py-4 bg-emerald-500 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 active:scale-95">Approve</button>
                        <button onClick={() => onDeny(emp.id)} className="flex-1 py-4 bg-white/10 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-white/20 transition-all active:scale-95 border border-white/10">Deny</button>
                     </div>
                  )}
               </div>
            ))}
         </div>
      </div>

      {/* 3. Drill-Down Ledger */}
      <div className="bg-white p-16 rounded-[56px] border border-slate-100 shadow-xl relative overflow-hidden animate-in slide-in-from-top-10 duration-700">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-16 relative z-10">
            <div>
               <h3 className="text-3xl font-black text-slate-900 tracking-tighter">
                  {selectedEmployee ? `${selectedEmployee.name}'s History Ledger` : 'Personal Activity Ledger'}
               </h3>
               <p className="text-slate-400 font-bold text-[11px] uppercase tracking-[0.25em] mt-3">Node Data Audit Path</p>
            </div>
            {selectedEmployee && <button onClick={() => setSelectedEmpId(null)} className="px-8 py-3 bg-indigo-50 text-indigo-600 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-100 transition-all border border-indigo-100">Release Focus</button>}
         </div>

         <div className="space-y-6 relative z-10">
            {historyToDisplay.length > 0 ? historyToDisplay.map(item => {
               const config = categoryConfig[item.type] || categoryConfig['Personal Leave'];
               return (
                  <div key={item.id} className="flex items-center p-8 rounded-[40px] border border-slate-50 bg-slate-50/20 hover:bg-white hover:border-indigo-100 transition-all group hover:shadow-2xl hover:-translate-y-1">
                     <div className={`w-20 h-20 rounded-[32px] flex items-center justify-center mr-10 shadow-lg ${config.light} group-hover:scale-110 transition-transform`}>
                        <i className={`fas ${config.icon} text-3xl`}></i>
                     </div>
                     <div className="flex-1">
                        <div className="flex items-center gap-4">
                           <h4 className="font-black text-slate-900 text-xl tracking-tight">{item.type}</h4>
                           <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm ${item.status === 'Approved' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>{item.status}</span>
                        </div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-2 flex items-center gap-2">
                           <i className="far fa-calendar-alt text-indigo-500"></i> {item.range}
                        </p>
                     </div>
                     <div className="text-right">
                        <p className="text-4xl font-black text-slate-900 tracking-tighter">{item.days}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Business Days</p>
                     </div>
                  </div>
               );
            }) : (
               <div className="py-24 text-center border-4 border-dashed border-slate-50 rounded-[56px]">
                  <i className="fas fa-folder-open text-slate-100 text-7xl mb-6"></i>
                  <p className="text-slate-300 font-black uppercase text-sm tracking-widest">No Historical Logs Available</p>
               </div>
            )}
         </div>
         <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-gradient-to-tr from-indigo-500/5 to-purple-500/5 rounded-full blur-[100px] animate-pulse"></div>
      </div>
    </div>
  );
};