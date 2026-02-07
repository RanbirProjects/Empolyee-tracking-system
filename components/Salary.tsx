
import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SalaryProps {
  teamData: any[];
}

export const Salary: React.FC<SalaryProps> = ({ teamData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayslip, setSelectedPayslip] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const filteredTeam = useMemo(() => teamData.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchTerm.toLowerCase())
  ), [searchTerm, teamData]);

  const chartData = useMemo(() => teamData.map(e => ({ name: e.name.split(' ')[0], val: e.baseSalary + e.bonus - e.deductions })), [teamData]);

  const openPayslip = (emp: any) => {
    setSelectedPayslip({ ...emp, month: 'MAY 2024', net: emp.baseSalary + emp.bonus - emp.deductions });
  };

  const handleDownload = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert(`Success: Payroll documentation for ${selectedPayslip.name} has been securely exported.`);
      setSelectedPayslip(null);
    }, 1500);
  };

  const totalDisbursement = teamData.reduce((acc, curr) => acc + (curr.baseSalary + curr.bonus - curr.deductions), 0);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      
      {/* 1. Global Financial Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[56px] p-16 text-white relative overflow-hidden shadow-2xl animate-glow">
          <div className="relative z-10 flex flex-col xl:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-10">
                 <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-xl shadow-xl border border-white/20">
                    <i className="fas fa-sack-dollar"></i>
                 </div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-100">Treasury Disbursement Node</span>
              </div>
              <h2 className="text-7xl font-black tracking-tighter mb-4">
                 ${totalDisbursement.toLocaleString()}
              </h2>
              <p className="text-indigo-100/70 font-bold text-sm uppercase tracking-widest leading-relaxed">Active Capital Allocation - May Phase Cycle</p>
            </div>
            <div className="h-[180px] w-full xl:w-80">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorSal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#fff" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#fff" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="val" stroke="#fff" fillOpacity={1} fill="url(#colorSal)" strokeWidth={4} />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[100px] rounded-full animate-pulse"></div>
        </div>

        <div className="bg-white rounded-[56px] p-12 card-hover border border-slate-100 shadow-xl flex flex-col justify-between group">
           <div>
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-[28px] flex items-center justify-center text-2xl mb-10 group-hover:rotate-12 transition-transform shadow-inner">
                 <i className="fas fa-shield-check"></i>
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tighter leading-tight">Secure Vault</h3>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Personal Earnings Repository</p>
           </div>
           <div className="space-y-3 mt-10">
              <button className="w-full py-5 bg-slate-900 text-white rounded-[28px] font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-emerald-600 transition-all active:scale-95">Download Payslip</button>
              <button className="w-full py-5 bg-slate-50 text-slate-400 rounded-[28px] font-black text-xs uppercase tracking-[0.2em] border border-slate-100 hover:bg-slate-100 transition-all">Audit History</button>
           </div>
        </div>
      </div>

      {/* 2. Directory */}
      <div className="bg-white rounded-[56px] p-16 card-hover border border-slate-100 shadow-xl overflow-hidden relative">
         <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-10 mb-16 relative z-10">
            <div>
               <h3 className="text-4xl font-black text-slate-900 tracking-tighter">Compensation Directory</h3>
               <p className="text-slate-400 font-bold text-sm mt-3 leading-relaxed max-w-xl">Centralized node for payroll generation and mission incentive audits.</p>
            </div>
            <div className="relative w-full xl:w-96">
               <input 
                  type="text" placeholder="Personnel Name or ID..." 
                  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 pl-16 pr-8 py-6 rounded-[32px] font-black text-sm focus:ring-8 focus:ring-indigo-500/5 focus:bg-white outline-none transition-all shadow-inner"
               />
               <i className="fas fa-search absolute left-7 top-1/2 -translate-y-1/2 text-slate-300 text-xl"></i>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 relative z-10">
            {filteredTeam.map((emp) => (
               <div key={emp.id} className="group p-10 rounded-[48px] border border-slate-100 bg-white hover:border-indigo-100 hover:shadow-2xl transition-all duration-500 flex flex-col">
                  <div className="flex items-center gap-6 mb-10">
                     <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${emp.avatar}`} className="w-20 h-20 rounded-[32px] bg-slate-100 border border-slate-100 shadow-sm" />
                     <div>
                        <h4 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight">{emp.name}</h4>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">{emp.role}</p>
                     </div>
                  </div>

                  <div className="space-y-5 flex-1">
                     <div className="p-8 bg-slate-50 rounded-[32px] space-y-4 border border-slate-50">
                        <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                           <span className="text-slate-400">Core Base</span>
                           <span className="text-slate-900 font-mono">${emp.baseSalary.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                           <span className="text-emerald-500">Mission Credits</span>
                           <span className="text-emerald-600 font-mono">+${emp.bonus.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                           <span className="text-rose-500">Deductions</span>
                           <span className="text-rose-600 font-mono">-${emp.deductions.toLocaleString()}</span>
                        </div>
                     </div>
                     <div className="px-2 pt-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Final Net Payload</p>
                        <h3 className="text-4xl font-black text-slate-900 tracking-tighter">${(emp.baseSalary + emp.bonus - emp.deductions).toLocaleString()}</h3>
                     </div>
                  </div>

                  <button onClick={() => openPayslip(emp)} className="w-full mt-12 py-6 bg-slate-900 text-white rounded-[32px] font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-xl flex items-center justify-center gap-4 active:scale-95 group">
                     <i className="fas fa-fingerprint opacity-50 text-lg group-hover:scale-125 transition-transform"></i> Generate Slip
                  </button>
               </div>
            ))}
         </div>
         <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px]"></div>
      </div>

      {/* 3. Modal */}
      {selectedPayslip && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-xl p-4 animate-in fade-in duration-500">
          <div className="bg-white w-full max-w-2xl rounded-[64px] shadow-2xl overflow-hidden relative border border-white/20">
            <div className="bg-slate-900 p-14 text-white flex justify-between items-center relative overflow-hidden">
               <div className="relative z-10">
                  <h2 className="text-4xl font-black tracking-tighter mb-2">Compensation Summary</h2>
                  <p className="text-indigo-400 text-[11px] font-black uppercase tracking-[0.4em]">{selectedPayslip.month} Operation</p>
               </div>
               <button onClick={() => setSelectedPayslip(null)} className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-xl hover:bg-white/20 transition-all z-10 border border-white/10"><i className="fas fa-times"></i></button>
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[80px] rounded-full -mr-32 -mt-32"></div>
            </div>
            <div className="p-16 space-y-12">
               <div className="grid grid-cols-2 gap-12">
                  <div className="flex items-center gap-6">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedPayslip.avatar}`} className="w-20 h-20 rounded-[32px] bg-slate-100 border border-slate-100 shadow-xl" />
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Personnel</p>
                      <p className="font-black text-2xl tracking-tight text-slate-900">{selectedPayslip.name}</p>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">{selectedPayslip.role}</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col justify-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Node Identity</p>
                    <p className="font-mono text-3xl font-black text-indigo-600">ID-{(selectedPayslip as any).id.padStart(4, '0')}</p>
                  </div>
               </div>
               <div className="bg-slate-50 rounded-[48px] p-12 space-y-6 border border-slate-100 shadow-inner">
                  <div className="flex justify-between font-bold text-slate-600"><span>Core Allocations</span><span className="font-mono">${selectedPayslip.baseSalary.toLocaleString()}</span></div>
                  <div className="flex justify-between font-bold text-emerald-600"><span>Incentive Dividends</span><span className="font-mono">+${selectedPayslip.bonus.toLocaleString()}</span></div>
                  <div className="flex justify-between font-bold text-rose-500"><span>Security Deductions</span><span className="font-mono">-${selectedPayslip.deductions.toLocaleString()}</span></div>
                  <div className="h-px bg-slate-200 my-4"></div>
                  <div className="flex justify-between text-5xl font-black tracking-tighter text-slate-900"><span>Net Payload</span><span className="font-mono">${selectedPayslip.net.toLocaleString()}</span></div>
               </div>
               <button 
                  onClick={handleDownload} disabled={isGenerating}
                  className="w-full py-7 bg-slate-900 text-white rounded-[32px] font-black text-sm uppercase tracking-[0.3em] shadow-2xl flex items-center justify-center gap-5 disabled:opacity-50 hover:bg-indigo-600 transition-all active:scale-95"
               >
                  {isGenerating ? <i className="fas fa-circle-notch animate-spin text-xl"></i> : <i className="fas fa-shield-halved text-xl"></i>}
                  {isGenerating ? 'Encrypting Node...' : 'Secure Export as PDF'}
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};