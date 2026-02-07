
import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Task } from '../types';
import { PRODUCTIVITY_DATA, TASK_TREND_DATA } from '../constants';

interface TasksProps {
  tasks: Task[];
  onAddTask: () => void;
  onToggleStatus: (taskId: string) => void;
}

const PRIORITY_COLORS: Record<string, string> = {
  high: '#f43f5e',
  medium: '#f59e0b',
  low: '#3b82f6',
};

export const Tasks: React.FC<TasksProps> = ({ tasks, onAddTask, onToggleStatus }) => {
  const [filterAssignee, setFilterAssignee] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesAssignee = filterAssignee === 'all' || task.assigneeId === filterAssignee;
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           task.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesAssignee && matchesSearch;
    });
  }, [tasks, filterAssignee, searchQuery]);

  const priorityData = useMemo(() => {
    const counts = filteredTasks.reduce((acc: any, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  }, [filteredTasks]);

  const pendingTasks = filteredTasks.filter(t => t.status === 'pending');
  const completedTasks = filteredTasks.filter(t => t.status === 'completed');

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      {/* 1. Header & Quick Actions */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Strategic Ops Radar</h2>
          <p className="text-slate-400 font-bold text-sm mt-2 uppercase tracking-[0.3em]">Field Deployment & Objective Control</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
          <div className="relative w-full sm:w-64">
            <input 
              type="text" placeholder="Scan Objectives..." 
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-100 px-6 py-4 rounded-2xl text-sm font-bold shadow-xl focus:ring-8 focus:ring-indigo-500/5 transition-all outline-none"
            />
            <i className="fas fa-search absolute right-6 top-1/2 -translate-y-1/2 text-slate-300"></i>
          </div>
          <div className="relative w-full sm:w-64">
            <select 
              value={filterAssignee}
              onChange={(e) => setFilterAssignee(e.target.value)}
              className="w-full bg-white border border-slate-100 px-6 py-4 rounded-2xl text-sm font-bold appearance-none shadow-xl outline-none"
            >
              <option value="all">Global Fleet</option>
              {PRODUCTIVITY_DATA.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
            <i className="fas fa-filter absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none"></i>
          </div>
          <button 
            onClick={onAddTask}
            className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl hover:bg-indigo-600 transition-all active:scale-95 group"
          >
            <i className="fas fa-plus-circle text-lg group-hover:rotate-90 transition-transform"></i>
            Deploy Mission
          </button>
        </div>
      </div>

      {/* 2. Analytics Hub - THE TRENDING GRAPH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white rounded-[48px] p-10 md:p-12 border border-slate-50 shadow-2xl relative overflow-hidden group">
           <div className="flex justify-between items-end mb-12 relative z-10">
              <div>
                 <h3 className="text-2xl font-black text-slate-900 tracking-tight">Mission Velocity</h3>
                 <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">Completion Momentum - Last 7 Cycles</p>
              </div>
              <div className="flex gap-4">
                 <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                    <span className="text-[10px] font-black uppercase text-slate-400">Completed</span>
                 </div>
              </div>
           </div>
           
           <div className="h-[300px] w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={TASK_TREND_DATA}>
                    <defs>
                       <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <Tooltip 
                       contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                    />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800, fill: '#94a3b8'}} />
                    <Area type="monotone" dataKey="completed" stroke="#6366f1" fillOpacity={1} fill="url(#colorTrend)" strokeWidth={4} />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
           <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform pointer-events-none">
              <i className="fas fa-chart-line text-[120px]"></i>
           </div>
        </div>

        <div className="lg:col-span-4 bg-slate-900 rounded-[48px] p-10 md:p-12 text-white shadow-2xl flex flex-col justify-between relative overflow-hidden">
           <div className="relative z-10">
              <h3 className="text-2xl font-black tracking-tight mb-2">Priority Matrix</h3>
              <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Load distribution analysis</p>
           </div>
           
           <div className="h-[200px] w-full relative z-10 my-8">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie
                       data={priorityData}
                       cx="50%" cy="50%"
                       innerRadius={60}
                       outerRadius={80}
                       paddingAngle={8}
                       dataKey="value"
                    >
                       {priorityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PRIORITY_COLORS[entry.name] || '#ccc'} />
                       ))}
                    </Pie>
                    <Tooltip />
                 </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="text-center">
                    <p className="text-3xl font-black tracking-tighter">{filteredTasks.length}</p>
                    <p className="text-[8px] font-black uppercase text-slate-500">Total</p>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-3 gap-2 relative z-10">
              {['high', 'medium', 'low'].map(p => (
                 <div key={p} className="text-center">
                    <p className={`text-[10px] font-black uppercase mb-1`} style={{color: PRIORITY_COLORS[p]}}>{p}</p>
                    <p className="text-lg font-black">{priorityData.find(d => d.name === p)?.value || 0}</p>
                 </div>
              ))}
           </div>
           <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/10 blur-[60px] rounded-full"></div>
        </div>
      </div>

      {/* 3. Task Management Section */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* Pending Column */}
        <div className="xl:col-span-7 space-y-8">
          <div className="flex items-center gap-4 px-4">
             <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
                <i className="fas fa-bolt-lightning"></i>
             </div>
             <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">Active Operations</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{pendingTasks.length} Units in Phase</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pendingTasks.map(task => {
              const assignee = PRODUCTIVITY_DATA.find(e => e.id === task.assigneeId);
              return (
                <div key={task.id} className="group bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden flex flex-col justify-between">
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                       <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-white shadow-lg`} style={{backgroundColor: PRIORITY_COLORS[task.priority]}}>
                          {task.priority} Prio
                       </span>
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${assignee?.avatar}`} className="w-12 h-12 rounded-2xl bg-slate-50 border-4 border-white shadow-xl" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">{task.title}</h4>
                    <p className="text-slate-400 font-bold text-xs leading-relaxed line-clamp-2">{task.description}</p>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between relative z-10">
                     <div className="flex items-center gap-2">
                        <i className="far fa-calendar-alt text-indigo-500 text-xs"></i>
                        <span className="text-[10px] font-black text-slate-500 uppercase">{task.dueDate}</span>
                     </div>
                     <button onClick={() => onToggleStatus(task.id)} className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-emerald-500 transition-all shadow-lg active:scale-90">
                        <i className="fas fa-check"></i>
                     </button>
                  </div>
                  <div className={`absolute top-0 right-0 w-24 h-24 opacity-[0.03] -mr-4 -mt-4 transition-transform group-hover:scale-150`} style={{color: PRIORITY_COLORS[task.priority]}}>
                     <i className="fas fa-shield-halved text-[100px]"></i>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Completed Column */}
        <div className="xl:col-span-5 space-y-8">
           <div className="flex items-center gap-4 px-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner">
                 <i className="fas fa-circle-check"></i>
              </div>
              <div>
                 <h3 className="text-lg font-black text-slate-900 tracking-tight">Mission Archives</h3>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{completedTasks.length} Successful Deployments</p>
              </div>
           </div>

           <div className="space-y-4">
              {completedTasks.map(task => (
                <div key={task.id} className="p-6 bg-white/60 backdrop-blur-md rounded-[32px] border border-slate-100 flex items-center justify-between group hover:bg-white transition-all shadow-sm">
                   <div className="flex items-center gap-5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                         <i className="fas fa-check-double"></i>
                      </div>
                      <div>
                         <h4 className="font-black text-slate-400 line-through text-sm group-hover:text-slate-700 transition-all">{task.title}</h4>
                         <p className="text-[8px] font-black text-slate-400 uppercase mt-0.5">Objective Finalized</p>
                      </div>
                   </div>
                   <button onClick={() => onToggleStatus(task.id)} className="text-[9px] font-black text-indigo-500 hover:bg-indigo-50 px-3 py-1.5 rounded-lg uppercase tracking-widest transition-all">Re-init</button>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};
