
import React, { useState } from 'react';
import { MOCK_TEAM } from '../constants';
import { TeamMember } from '../types';

export const LiveTracking: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const events = [
    { time: '14:20', text: 'David Kim reached Bridge Project Site', type: 'info' },
    { time: '14:15', text: 'Low Battery Alert: Elena Rodriguez (15%)', type: 'warning' },
    { time: '14:05', text: 'Sarah Chen started travel to Central Mall', type: 'success' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-white p-6 md:p-8 rounded-[32px] border border-slate-100 shadow-sm gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-100 animate-pulse">
            <i className="fas fa-radar text-2xl"></i>
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Field Command Center</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Active Radar Protocol v4.2</p>
            </div>
          </div>
        </div>
        <div className="flex gap-3 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none px-6 py-3 bg-slate-50 text-slate-600 rounded-xl font-black text-xs uppercase tracking-widest border border-slate-200 hover:bg-slate-100 transition-all">
            History Playback
          </button>
          <button className="flex-1 lg:flex-none px-6 py-3 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-500/20 hover:scale-105 transition-all">
            Fleet Optimization
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column: Team & Events */}
        <div className="xl:col-span-4 space-y-6">
          {/* Active Fleet */}
          <div className="bg-white p-6 rounded-[40px] border border-slate-100 shadow-sm overflow-hidden h-[450px] flex flex-col">
            <div className="flex items-center justify-between mb-6 px-2">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Active Fleet</h3>
              <span className="text-[10px] font-black bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">{MOCK_TEAM.filter(m => m.status !== 'offline').length} Live</span>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scroll pr-2 space-y-3">
              {MOCK_TEAM.map(member => (
                <div 
                  key={member.id} 
                  onClick={() => setSelectedMember(member)}
                  className={`group p-4 rounded-3xl border transition-all cursor-pointer relative overflow-hidden ${
                    selectedMember?.id === member.id ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100' : 'bg-slate-50 border-slate-50 hover:border-indigo-100 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.avatar}`} className="w-12 h-12 rounded-xl bg-white/20 p-1" />
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-black truncate ${selectedMember?.id === member.id ? 'text-white' : 'text-slate-900'}`}>{member.name}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-[9px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded ${
                          selectedMember?.id === member.id ? 'bg-white/20' : 'bg-slate-200 text-slate-500'
                        }`}>
                          {member.role}
                        </span>
                        <span className={`text-[9px] font-bold ${selectedMember?.id === member.id ? 'text-indigo-100' : 'text-slate-400'}`}>• {member.lastSeen}</span>
                      </div>
                    </div>
                    {member.status === 'on-site' && (
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-500">
                        <i className="fas fa-location-dot"></i>
                      </div>
                    )}
                  </div>
                  
                  {/* Telemetry Strip - Visible only when selected or hovered */}
                  <div className={`mt-4 pt-3 border-t flex justify-between gap-4 ${selectedMember?.id === member.id ? 'border-white/10' : 'border-slate-100 hidden group-hover:flex'}`}>
                    <div className="flex items-center gap-1.5">
                       <i className={`fas fa-battery-${member.battery && member.battery > 50 ? 'full' : 'quarter'} text-[10px]`}></i>
                       <span className="text-[10px] font-black">{member.battery}%</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                       <i className="fas fa-gauge text-[10px]"></i>
                       <span className="text-[10px] font-black">{member.speed}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                       <i className="fas fa-signal text-[10px]"></i>
                       <span className="text-[10px] font-black">{member.signal}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comms Log / Events */}
          <div className="bg-slate-900 p-6 rounded-[40px] text-white shadow-2xl h-[300px] flex flex-col">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-xs">
                  <i className="fas fa-satellite-dish"></i>
                </div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400">Tactical Feed</h3>
             </div>
             <div className="flex-1 space-y-4 overflow-y-auto custom-scroll pr-2">
                {events.map((event, i) => (
                  <div key={i} className="flex gap-4 group">
                    <span className="text-[9px] font-black text-indigo-500/60 font-mono mt-0.5">{event.time}</span>
                    <p className={`text-[11px] font-medium leading-relaxed ${event.type === 'warning' ? 'text-amber-400' : 'text-slate-300 group-hover:text-white transition-colors'}`}>
                      {event.text}
                    </p>
                  </div>
                ))}
             </div>
             <div className="mt-4 pt-4 border-t border-white/5 flex justify-center">
                <button className="text-[9px] font-black text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-widest">Connect Radio Comms</button>
             </div>
          </div>
        </div>

        {/* Right Column: Dynamic Map Dashboard */}
        <div className="xl:col-span-8 bg-slate-950 rounded-[48px] shadow-2xl relative overflow-hidden group min-h-[700px]">
          {/* Animated Background Mesh */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000')] bg-cover opacity-20 contrast-125 grayscale"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-transparent to-indigo-900/20"></div>
          
          {/* HUD Elements */}
          <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5 rounded-[48px] m-4"></div>
          
          {/* Simulated Tactical Map Interface */}
          <div className="absolute top-10 left-10 z-20 space-y-2">
            <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 flex items-center gap-3">
               <span className="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></span>
               <span className="text-[10px] font-black text-white uppercase tracking-widest">Global Positioning Active</span>
            </div>
          </div>

          <div className="absolute bottom-10 left-10 z-20">
            <div className="bg-black/60 backdrop-blur-md p-6 rounded-[32px] border border-white/10 max-w-xs space-y-4 animate-in slide-in-from-left-4 duration-500">
               {selectedMember ? (
                 <>
                   <div className="flex items-center gap-4">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedMember.avatar}`} className="w-12 h-12 rounded-xl bg-white/10" />
                      <div>
                        <h4 className="font-black text-white">{selectedMember.name}</h4>
                        <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">{selectedMember.role}</p>
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="bg-white/5 p-3 rounded-2xl">
                         <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Location</p>
                         <p className="text-[10px] font-bold text-white truncate">{selectedMember.lastLocation}</p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-2xl">
                         <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Status</p>
                         <p className="text-[10px] font-bold text-emerald-400 uppercase">{selectedMember.status}</p>
                      </div>
                   </div>
                   <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-500/20">Init Direct Link</button>
                 </>
               ) : (
                 <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest italic">Target Not Acquired. Select Member...</p>
               )}
            </div>
          </div>

          {/* Dynamic Interactive Markers */}
          {MOCK_TEAM.map((member, i) => (
            <div 
              key={member.id}
              className={`absolute transition-all duration-1000 cursor-pointer group/marker ${
                selectedMember?.id === member.id ? 'z-50 scale-125' : 'z-10'
              }`}
              style={{
                top: `${20 + (i * 15)}%`,
                left: `${20 + (i * 20)}%`,
              }}
              onClick={() => setSelectedMember(member)}
            >
              <div className="relative">
                {/* Ping rings */}
                <div className={`absolute -inset-8 rounded-full animate-ping opacity-20 ${
                  member.status === 'on-site' ? 'bg-amber-500' : 'bg-indigo-500'
                }`}></div>
                <div className={`absolute -inset-4 rounded-full animate-ping opacity-40 delay-300 ${
                  member.status === 'on-site' ? 'bg-amber-500' : 'bg-indigo-500'
                }`}></div>
                
                {/* Marker body */}
                <div className={`relative w-10 h-10 rounded-2xl border-2 border-white flex items-center justify-center shadow-2xl transition-all ${
                  selectedMember?.id === member.id ? 'bg-indigo-600' : member.status === 'on-site' ? 'bg-amber-500' : 'bg-slate-800'
                }`}>
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.avatar}`} className="w-7 h-7" />
                </div>
                
                {/* Floating label */}
                <div className={`absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 whitespace-nowrap transition-all opacity-0 group-hover/marker:opacity-100 scale-90 group-hover/marker:scale-100 ${
                  selectedMember?.id === member.id ? 'opacity-100 scale-105' : ''
                }`}>
                  <p className="text-[10px] font-black text-white">{member.name}</p>
                  <p className="text-[8px] font-bold text-indigo-400 uppercase tracking-tighter">{member.lastLocation}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Control Interface */}
          <div className="absolute top-10 right-10 flex flex-col gap-3 z-30">
             <div className="bg-black/60 backdrop-blur-md p-2 rounded-2xl border border-white/10 flex flex-col gap-2">
                <button className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-all"><i className="fas fa-plus"></i></button>
                <button className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-all"><i className="fas fa-minus"></i></button>
             </div>
             <button className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-indigo-500/40 hover:scale-110 active:scale-95 transition-all">
               <i className="fas fa-crosshairs"></i>
             </button>
             <button className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-white/20 transition-all">
               <i className="fas fa-layer-group"></i>
             </button>
          </div>

          {/* Telemetry HUD - Center Top */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20 flex gap-6">
             <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-4">
                <div className="text-center">
                   <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-0.5">Fleet Signal</p>
                   <p className="text-xs font-black text-emerald-400 font-mono">ENCRYPTED</p>
                </div>
                <div className="h-6 w-px bg-white/10"></div>
                <div className="text-center">
                   <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-0.5">Sat Nodes</p>
                   <p className="text-xs font-black text-white font-mono">08 ACTIVE</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
