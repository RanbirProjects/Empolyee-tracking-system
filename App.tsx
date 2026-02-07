
import React, { useState, useEffect } from 'react';
import { NAVIGATION, PRODUCTIVITY_DATA, MOCK_TASKS, MOCK_TEAM } from './constants';
import { Dashboard } from './components/Dashboard';
import { Attendance } from './components/Attendance';
import { Tasks } from './components/Tasks';
import { Salary } from './components/Salary';
import { LiveTracking } from './components/LiveTracking';
import { Leaves } from './components/Leaves';
import { Task } from './types';

const App: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState<'task' | 'leave' | null>(null);
  
  const [teamData, setTeamData] = useState(PRODUCTIVITY_DATA);
  const [userTasks, setUserTasks] = useState<Task[]>(MOCK_TASKS);
  const [userLeaves, setUserLeaves] = useState([
    { id: 'L1', type: 'Vacation', range: 'May 10 - May 15', status: 'Approved', days: 5 },
    { id: 'L2', type: 'Sick Leave', range: 'Apr 02 - Apr 03', status: 'Approved', days: 2 },
  ]);

  // Form State for New Task
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    priority: 'medium',
    assigneeId: PRODUCTIVITY_DATA[0].id,
    dueDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail.includes('@')) setLoggedInUser(loginEmail);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setLoginEmail('');
    setActiveTab('dashboard');
  };

  const handleApproveLeave = (empId: string) => {
    setTeamData(prev => prev.map(emp => {
      if (emp.id === empId && emp.pendingLeaves > 0) {
        return {
          ...emp,
          leavesTaken: emp.leavesTaken + 1,
          pendingLeaves: emp.pendingLeaves - 1
        };
      }
      return emp;
    }));
  };

  const handleDenyLeave = (empId: string) => {
    setTeamData(prev => prev.map(emp => {
      if (emp.id === empId && emp.pendingLeaves > 0) {
        return { ...emp, pendingLeaves: emp.pendingLeaves - 1 };
      }
      return emp;
    }));
  };

  const toggleTaskStatus = (taskId: string) => {
    setUserTasks(userTasks.map(t => 
      t.id === taskId ? { ...t, status: t.status === 'pending' ? 'completed' : 'pending' } : t
    ));
  };

  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    const task: Task = {
      id: `T-${Date.now()}`,
      title: newTask.title || 'Untitled Mission',
      description: newTask.description || 'No parameters provided.',
      status: 'pending',
      dueDate: newTask.dueDate || '',
      priority: (newTask.priority as any) || 'medium',
      assigneeId: newTask.assigneeId || '1'
    };
    setUserTasks([task, ...userTasks]);
    setModalOpen(null);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      assigneeId: PRODUCTIVITY_DATA[0].id,
      dueDate: new Date().toISOString().split('T')[0]
    });
  };

  if (!loggedInUser) {
    return (
      <div className="h-screen flex items-center justify-center login-bg p-4 overflow-hidden relative">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 blur-[120px] animate-pulse delay-700"></div>
        
        <div className="w-full max-w-lg glass p-8 md:p-12 rounded-[40px] md:rounded-[56px] shadow-2xl animate-in zoom-in-95 duration-700 text-center relative z-10 border border-white/40">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white rounded-3xl flex items-center justify-center shadow-2xl mx-auto mb-8 md:mb-10 transform -rotate-12 hover:rotate-0 transition-transform duration-500">
            <i className="fas fa-radar text-3xl md:text-4xl"></i>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2 tracking-tighter">NexusHR</h1>
          <p className="text-slate-500 font-bold text-[10px] md:text-sm mb-8 md:mb-12 uppercase tracking-[0.3em]">Workforce OS v2.0</p>
          <form onSubmit={handleLogin} className="space-y-6 text-left">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Authentication Key</label>
              <input 
                type="email" required value={loginEmail} 
                onChange={(e) => setLoginEmail(e.target.value)} 
                placeholder="admin@nexus-hr.io" 
                className="w-full bg-white/50 border border-slate-200 px-6 md:px-8 py-4 md:py-5 rounded-3xl focus:ring-8 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-800"
              />
            </div>
            <button type="submit" className="w-full py-5 md:py-6 bg-slate-900 text-white rounded-3xl font-black text-lg hover:bg-black transition-all shadow-xl shadow-slate-900/30 active:scale-95 group">
              Launch Interface <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden text-slate-900 bg-slate-50 font-sans selection:bg-indigo-100">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && window.innerWidth < 1024 && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[55] animate-in fade-in duration-300" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      <aside className={`fixed lg:relative inset-y-0 left-0 glass border-r border-slate-200 transition-all duration-500 flex flex-col z-[60] ${isSidebarOpen ? 'w-80 translate-x-0' : 'w-0 lg:w-24 -translate-x-full lg:translate-x-0 overflow-hidden'}`}>
        <div className="h-24 md:h-28 flex items-center px-8 md:px-10 border-b border-slate-100 shrink-0">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-200 shrink-0"><i className="fas fa-radar text-xl"></i></div>
          {isSidebarOpen && <span className="ml-5 text-xl md:text-2xl font-black tracking-tighter bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">NEXUS</span>}
          {window.innerWidth < 1024 && (
            <button onClick={() => setIsSidebarOpen(false)} className="ml-auto text-slate-400"><i className="fas fa-times"></i></button>
          )}
        </div>
        
        <nav className="flex-1 mt-6 md:mt-10 px-4 space-y-2 md:space-y-3 overflow-y-auto custom-scroll">
          {NAVIGATION.map((item) => (
            <button 
              key={item.id} 
              onClick={() => {
                setActiveTab(item.id);
                if (window.innerWidth < 1024) setIsSidebarOpen(false);
              }} 
              className={`w-full flex items-center gap-5 p-4 md:p-5 rounded-[20px] md:rounded-[24px] transition-all group relative ${
                activeTab === item.id 
                  ? 'sidebar-active' 
                  : 'text-slate-400 hover:bg-white hover:text-slate-900'
              }`}
            >
              <i className={`fas ${item.icon} text-lg md:text-xl transition-transform group-hover:scale-110`}></i>
              {isSidebarOpen && <span className="font-bold text-sm tracking-tight">{item.name}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 md:p-6 border-t border-slate-100 shrink-0">
          <button onClick={handleLogout} className="w-full py-4 md:py-5 bg-rose-50 text-rose-500 rounded-2xl md:rounded-3xl hover:bg-rose-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-4 group">
            <i className="fas fa-power-off text-lg"></i>
            {isSidebarOpen && <span className="font-black text-[10px] md:text-xs uppercase tracking-widest">Logout</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 md:h-24 px-6 md:px-12 flex items-center justify-between glass border-b border-slate-100 z-40 shrink-0">
           <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all shadow-sm"><i className="fas fa-bars-staggered text-lg md:text-xl"></i></button>
           
           <div className="flex items-center gap-4 md:gap-6">
              <div className="flex items-center gap-3 md:gap-4 group cursor-pointer">
                 <div className="text-right hidden sm:block">
                    <p className="text-sm font-black text-slate-900 tracking-tight">{loggedInUser.split('@')[0]}</p>
                    <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest">Global Admin</p>
                 </div>
                 <div className="relative">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${loggedInUser}`} className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-slate-100 border-2 border-white shadow-lg group-hover:scale-105 transition-transform" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                 </div>
              </div>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scroll px-4 md:px-12 py-6 md:py-12">
           <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
              {activeTab === 'dashboard' && <Dashboard tasks={userTasks} teamData={teamData} greeting="Nexus Console" />}
              {activeTab === 'attendance' && <Attendance teamMembers={MOCK_TEAM} />}
              {activeTab === 'tasks' && <Tasks tasks={userTasks} onAddTask={() => setModalOpen('task')} onToggleStatus={toggleTaskStatus} />}
              {activeTab === 'salary' && <Salary teamData={teamData} />}
              {activeTab === 'leaves' && <Leaves leaves={userLeaves} teamData={teamData} onAddLeave={() => {}} onApprove={handleApproveLeave} onDeny={handleDenyLeave} />}
              {activeTab === 'maps' && <LiveTracking />}
           </div>
        </div>
      </main>

      {/* Deploy Mission Modal */}
      {modalOpen === 'task' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-xl p-4 md:p-8 animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-xl rounded-[48px] shadow-2xl overflow-hidden relative border border-white/20 animate-in zoom-in-95 duration-500">
              <div className="bg-slate-900 p-10 text-white flex justify-between items-center relative overflow-hidden">
                 <div className="relative z-10">
                    <h2 className="text-3xl font-black tracking-tighter mb-1">New Mission</h2>
                    <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em]">Operational Parameters</p>
                 </div>
                 <button onClick={() => setModalOpen(null)} className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-lg hover:bg-white/20 transition-all z-10 border border-white/10">
                    <i className="fas fa-times"></i>
                 </button>
                 <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/20 blur-[60px] rounded-full -mr-24 -mt-24"></div>
              </div>

              <form onSubmit={handleSaveTask} className="p-10 space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Objective Title</label>
                    <input 
                       required value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})}
                       className="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl font-bold text-slate-900 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                       placeholder="Mission Name..."
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Fleet Assignee</label>
                    <div className="relative">
                       <select 
                          value={newTask.assigneeId} onChange={e => setNewTask({...newTask, assigneeId: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl font-bold text-slate-900 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all appearance-none"
                       >
                          {teamData.map(emp => (
                             <option key={emp.id} value={emp.id}>{emp.name} ({emp.role})</option>
                          ))}
                       </select>
                       <i className="fas fa-chevron-down absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none"></i>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Priority</label>
                       <select 
                          value={newTask.priority} onChange={e => setNewTask({...newTask, priority: e.target.value as any})}
                          className="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl font-bold text-slate-900 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all appearance-none"
                       >
                          <option value="low">Low Impact</option>
                          <option value="medium">Medium Priority</option>
                          <option value="high">Critical / High</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Due Date</label>
                       <input 
                          type="date" value={newTask.dueDate} onChange={e => setNewTask({...newTask, dueDate: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl font-bold text-slate-900 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                       />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mission Briefing</label>
                    <textarea 
                       value={newTask.description} onChange={e => setNewTask({...newTask, description: e.target.value})}
                       className="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl font-bold text-slate-900 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all min-h-[100px]"
                       placeholder="Strategic objectives and constraints..."
                    ></textarea>
                 </div>

                 <button type="submit" className="w-full py-5 bg-indigo-600 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95 mt-4">
                    Confirm Deployment
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;
