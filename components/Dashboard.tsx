
import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { PRODUCTIVITY_DATA, MOCK_USER } from '../constants';
import { EmployeeProductivity, Task } from '../types';

interface DashboardProps {
  tasks: Task[];
  teamData: (EmployeeProductivity & { pendingCount: number, completedCount: number })[];
  greeting: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ tasks, teamData, greeting }) => {
  const [selectedEmpId, setSelectedEmpId] = useState<string | null>(null);

  const stats = useMemo(() => {
    const avgProd = teamData.reduce((acc, curr) => acc + curr.productivity, 0) / teamData.length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    return { avgProd: Math.round(avgProd), pending, completed };
  }, [tasks, teamData]);

  const radarData = useMemo(() => [
    { subject: 'Productivity', A: stats.avgProd, fullMark: 100 },
    { subject: 'Attendance', A: 85, fullMark: 100 },
    { subject: 'Missions', A: Math.min(100, (stats.completed / (stats.pending + stats.completed)) * 100), fullMark: 100 },
    { subject: 'Wellness', A: MOCK_USER.averageSleepScore, fullMark: 100 },
    { subject: 'Loyalty', A: 92, fullMark: 100 },
  ], [stats]);

  const selectedEmployee = useMemo(() => 
    teamData.find(e => e.id === selectedEmpId)
  , [selectedEmpId, teamData]);

  const empTasks = useMemo(() => 
    tasks.filter(t => t.assigneeId === selectedEmpId)
  , [selectedEmpId, tasks]);

  const getEmpHistory = (emp: any) => {
    if (!emp) return [];
    const history = [];
    if (emp.leavesTaken > 0) history.push({ id: 'H1', type: 'Annual Vacation', range: 'May 01 - May 05', status: 'Approved', days: 5 });
    if (emp.leavesTaken > 5) history.push({ id: 'H2', type: 'Sick Leave', range: 'Apr 12 - Apr 14', status: 'Approved', days: 3 });
    if (emp.pendingLeaves > 0) history.push({ id: 'H4', type: 'Unpaid Leave', range: 'Jun 15 - Jun 17', status: 'Pending', days: emp.pendingLeaves });
    return history;
  };

  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      
      {/* 1. Tactical Command Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
        <div className="lg:col-span-8 bg-slate-950 rounded-[48px] md:rounded-[64px] p-8 md:p-14 text-white relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center gap-4 mb-8">
                 <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full flex items-center gap-3">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_10px_#6366f1]"></span>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">System Integrity: Nominal</span>
                 </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">{greeting}</h1>
              <p className="text-slate-400 font-bold text-xs md:text-sm uppercase tracking-[0.25em] max-w-xl leading-relaxed">
                Workforce Intelligence Engine v4.08 <br/> 
                <span className="text-indigo-400 opacity-80 italic lowercase tracking-normal">synchronizing fleet telemetry...</span>
              </p>
            </div>
            
            <div className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
               {[
                 { label: 'Avg Pulse', val: `${stats.avgProd}%`, col: 'text-indigo-400' },
                 { label: 'Active Ops', val: stats.pending, col: 'text-rose-400' },
                 { label: 'Nodes', val: teamData.length, col: 'text-emerald-400' },
                 { label: 'Uptime', val: '99.9%', col: 'text-amber-400' }
               ].map((item, idx) => (
                 <div key={idx} className="group cursor-pointer">
                    <p className={`text-[10px] font-black uppercase tracking-widest mb-2 transition-colors group-hover:text-white ${item.col}`}>{item.label}</p>
                    <p className="text-3xl md:text-5xl font-black tracking-tighter">{item.val}</p>
                 </div>
               ))}
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[140px] rounded-full -mr-40 -mt-40 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/5 blur-[100px] rounded-full -ml-20 -mb-20"></div>
        </div>

        {/* Strategic Analysis (Radar Chart) */}
        <div className="lg:col-span-4 bg-white rounded-[48px] md:rounded-[64px] p-8 md:p-12 border border-slate-100 shadow-2xl flex flex-col relative overflow-hidden group">
           <div className="relative z-10 mb-8">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Strategic View</h3>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">Global Team Dynamics</p>
           </div>
           
           <div className="flex-1 min-h-[250px] relative z-10 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#f1f5f9" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 800 }} />
                  <Radar
                    name="Fleet Performance"
                    dataKey="A"
                    stroke="#6366f1"
                    strokeWidth={3}
                    fill="#6366f1"
                    fillOpacity={0.15}
                  />
                </RadarChart>
              </ResponsiveContainer>
           </div>
           
           <div className="mt-8 p-6 bg-slate-50 rounded-[32px] border border-slate-100 relative z-10">
              <div className="flex justify-between items-center mb-2">
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Team Sync</span>
                 <span className="text-xs font-black text-indigo-600">Optimal</span>
              </div>
              <div className="w-full h-2 bg-white rounded-full overflow-hidden shadow-inner">
                 <div className="h-full bg-indigo-500 rounded-full" style={{ width: '88%' }}></div>
              </div>
           </div>
        </div>
      </div>

      {/* 2. Workforce Matrix Grid */}
      <div className="bg-white rounded-[48px] md:rounded-[64px] p-10 md:p-16 border border-slate-100 shadow-2xl overflow-hidden relative">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 relative z-10">
            <div>
               <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">Workforce Matrix</h3>
               <p className="text-slate-400 font-bold text-sm mt-2">Biometric telemetry for all deployed nodes.</p>
            </div>
            <div className="bg-slate-50 p-2 rounded-2xl flex gap-1 border border-slate-100">
               <button className="px-6 py-2 bg-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm border border-slate-100">Grid View</button>
               <button className="px-6 py-2 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-slate-600 transition-colors">List View</button>
            </div>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 relative z-10">
            {teamData.map((emp) => (
              <div 
                key={emp.id} 
                onClick={() => setSelectedEmpId(emp.id)}
                className="group/item p-8 rounded-[44px] border border-slate-100 bg-white hover:bg-slate-50/50 hover:border-indigo-200 hover:shadow-[0_30px_60px_-15px_rgba(99,102,241,0.15)] transition-all duration-700 flex flex-col items-center text-center cursor-pointer hover:-translate-y-3 relative overflow-hidden"
              >
                 <div className="relative mb-8 z-10">
                    <div className="absolute inset-0 bg-indigo-500/20 blur-[30px] rounded-full scale-0 group-hover/item:scale-100 transition-transform duration-700"></div>
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${emp.avatar}`} className="w-24 h-24 md:w-28 md:h-28 rounded-[36px] bg-slate-50 border-4 border-white shadow-2xl group-hover/item:border-indigo-100 transition-all duration-500 relative z-10" />
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-xs font-black shadow-2xl border-2 border-white group-hover/item:bg-indigo-600 transition-colors z-20">
                       <i className="fas fa-microchip"></i>
                    </div>
                 </div>
                 
                 <div className="relative z-10 space-y-1 mb-8">
                    <h4 className="text-xl md:text-2xl font-black text-slate-900 group-hover/item:text-indigo-600 transition-colors tracking-tighter">{emp.name}</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{emp.role}</p>
                 </div>
                 
                 <div className="w-full space-y-5 relative z-10">
                    <div className="grid grid-cols-2 gap-3">
                       <div className="bg-slate-50 group-hover/item:bg-white p-4 rounded-2xl border border-slate-50 transition-colors">
                          <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Status</p>
                          <p className="text-[10px] font-black text-emerald-500 uppercase">Deployed</p>
                       </div>
                       <div className="bg-slate-50 group-hover/item:bg-white p-4 rounded-2xl border border-slate-50 transition-colors">
                          <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Efficiency</p>
                          <p className="text-[10px] font-black text-slate-900 uppercase">{emp.productivity}%</p>
                       </div>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700 group-hover/item:opacity-100 opacity-60" style={{ width: `${emp.productivity}%` }}></div>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* 4. Intelligence Overlay Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-3xl p-0 md:p-12 animate-in fade-in zoom-in-95 duration-700 overflow-hidden">
           <div className="bg-white w-full h-full md:h-auto md:max-w-7xl md:rounded-[64px] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.6)] overflow-hidden relative flex flex-col lg:flex-row border border-white/10">
              
              {/* Profile Sidebar */}
              <div className="lg:w-[420px] bg-slate-900 p-10 md:p-16 text-white flex flex-col relative overflow-hidden shrink-0 border-r border-white/5">
                 <button 
                    onClick={() => setSelectedEmpId(null)}
                    className="absolute top-8 right-8 w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all border border-white/5 z-20 group"
                 >
                    <i className="fas fa-times group-hover:rotate-90 transition-transform"></i>
                 </button>
                 
                 <div className="relative z-10 flex lg:flex-col items-center gap-8 lg:gap-12 lg:text-center mt-6">
                    <div className="relative shrink-0">
                       <div className="absolute inset-0 bg-indigo-500/20 blur-[50px] rounded-full animate-pulse"></div>
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedEmployee.avatar}`} className="w-32 h-32 lg:w-48 lg:h-48 rounded-[48px] lg:rounded-[64px] bg-white border-8 border-white shadow-2xl relative z-10" />
                    </div>
                    <div className="flex-1 lg:flex-none text-left lg:text-center">
                       <h2 className="text-3xl lg:text-5xl font-black tracking-tighter mb-2">{selectedEmployee.name}</h2>
                       <p className="text-indigo-400 text-xs font-black uppercase tracking-[0.3em] mb-6 lg:mb-12">{selectedEmployee.role}</p>
                       <div className="hidden lg:block w-full h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                          <div className="h-full bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-shimmer" style={{ width: `${selectedEmployee.productivity}%`, backgroundSize: '200% 100%' }}></div>
                       </div>
                       <p className="hidden lg:block text-[10px] font-black text-slate-500 uppercase tracking-widest">{selectedEmployee.productivity}% Efficiency Rating</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-6 mt-12 lg:mt-16 relative z-10">
                    <div className="bg-white/5 p-6 rounded-[36px] text-center border border-white/5 hover:bg-white/10 transition-colors">
                       <p className="text-[9px] font-black text-slate-500 uppercase mb-2">Ops Success</p>
                       <p className="text-3xl font-black">{selectedEmployee.completedCount}</p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-[36px] text-center border border-white/5 hover:bg-white/10 transition-colors">
                       <p className="text-[9px] font-black text-slate-500 uppercase mb-2">Leave Node</p>
                       <p className="text-3xl font-black">{selectedEmployee.leavesTaken}d</p>
                    </div>
                 </div>
                 
                 <div className="mt-auto pt-10 relative z-10">
                    <button className="w-full py-6 bg-indigo-600 text-white rounded-[28px] font-black text-xs uppercase tracking-[0.3em] hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-950 active:scale-95">
                       Sync Telemetry
                    </button>
                 </div>
              </div>

              {/* Data Content Area */}
              <div className="flex-1 p-10 lg:p-20 overflow-y-auto custom-scroll space-y-16">
                 <section>
                    <div className="flex items-center justify-between mb-10">
                       <div>
                          <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Mission Deployment</h3>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Strategic Objective History</p>
                       </div>
                       <span className="px-5 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest">{empTasks.length} Assigned</span>
                    </div>
                    <div className="space-y-5">
                       {empTasks.map(task => (
                          <div key={task.id} className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 flex items-center justify-between group hover:bg-white hover:shadow-2xl transition-all duration-500">
                             <div className="flex items-center gap-6">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-lg shadow-sm ${
                                   task.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-100 text-indigo-600'
                                }`}>
                                   <i className={`fas ${task.status === 'completed' ? 'fa-check-double' : 'fa-rocket'}`}></i>
                                </div>
                                <div>
                                   <h4 className={`text-lg font-black tracking-tight ${task.status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{task.title}</h4>
                                   <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5 tracking-widest">Phase: {task.status}</p>
                                </div>
                             </div>
                             <div className="text-right">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">Target Date</span>
                                <span className="text-xs font-black text-slate-900">{task.dueDate}</span>
                             </div>
                          </div>
                       ))}
                    </div>
                 </section>

                 <section>
                    <div className="flex items-center justify-between mb-10">
                       <div>
                          <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Wellness Telemetry</h3>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Node Recovery Audit</p>
                       </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                       <div className="p-10 bg-indigo-600 rounded-[48px] text-white shadow-2xl relative overflow-hidden group">
                          <h4 className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">Avg Recovery</h4>
                          <p className="text-5xl font-black tracking-tighter">84%</p>
                          <div className="mt-8 flex gap-1">
                             {[...Array(12)].map((_, i) => (
                               <div key={i} className="flex-1 h-8 bg-white/10 rounded-full overflow-hidden">
                                  <div className="w-full h-full bg-white opacity-40 animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
                               </div>
                             ))}
                          </div>
                          <i className="fas fa-heart-pulse absolute -bottom-4 -right-4 text-9xl opacity-5 group-hover:scale-125 transition-transform duration-1000"></i>
                       </div>
                       <div className="p-10 bg-white rounded-[48px] border border-slate-100 shadow-xl flex flex-col justify-between">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Deep Sleep Analysis</p>
                          <div className="flex items-end justify-between">
                             <div className="space-y-1">
                                <p className="text-4xl font-black text-slate-900">06h 42m</p>
                                <p className="text-[10px] font-bold text-emerald-500 uppercase">+12% vs last cycle</p>
                             </div>
                             <div className="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center text-white">
                                <i className="fas fa-moon text-xl"></i>
                             </div>
                          </div>
                       </div>
                    </div>
                 </section>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
