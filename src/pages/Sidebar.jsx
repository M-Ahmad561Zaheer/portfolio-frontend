import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiGrid, FiBookOpen, FiBriefcase, FiMail, 
  FiCheckCircle, FiLogOut, FiX, FiMenu, FiCpu, FiActivity 
} from 'react-icons/fi';

const menuItems = [
  { id: 'projects',   label: 'Projects',   icon: <FiGrid /> },
  { id: 'experience', label: 'Experience', icon: <FiBriefcase /> },
  { id: 'education',  label: 'Education',  icon: <FiBookOpen /> },
  { id: 'messages',   label: 'Messages',   icon: <FiMail /> },
  { id: 'reviews',    label: 'Reviews',    icon: <FiCheckCircle /> }
];

const Sidebar = ({ type, setType, isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <>
      {/* MOBILE HEADER (NEON GLASS) */}
      <div className="lg:hidden fixed top-0 w-full bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 p-5 z-[100] flex justify-between items-center shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-cyan-500 rounded-lg flex items-center justify-center font-black text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]">AZ</div>
          <span className="font-black tracking-[0.2em] text-[10px] text-white uppercase">Control Center</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          className="p-3 bg-white/5 rounded-xl border border-white/10 text-cyan-400 active:scale-90 transition-all"
        >
          {isSidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* OVERLAY FOR MOBILE */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR MAIN */}
      <aside className={`fixed lg:sticky top-0 h-screen w-80 bg-[#020617] border-r border-white/5 p-8 flex flex-col z-[60] transition-all duration-500 ease-in-out ${isSidebarOpen ? 'translate-x-0 shadow-[20px_0_40px_rgba(0,0,0,0.5)]' : '-translate-x-full lg:translate-x-0'}`}>
        
        {/* BRANDING HUB */}
        <div className="hidden lg:flex flex-col gap-1 mb-16">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-cyan-500 rounded-xl blur opacity-20 group-hover:opacity-60 transition duration-500" />
              <div className="relative w-12 h-12 bg-black border border-cyan-500/50 rounded-xl flex items-center justify-center font-black text-xl text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]">AZ</div>
            </div>
            <div>
              <h2 className="text-sm font-black tracking-[0.3em] text-white uppercase">CORE <span className="text-cyan-500">OS</span></h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">System Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* NAVIGATION STREAM */}
        <nav className="space-y-3 flex-1 pt-24 lg:pt-0">
          <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] mb-6 ml-2">Main Directives</p>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setType(item.id); setIsSidebarOpen(false); }}
              className={`group relative w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                type === item.id 
                ? 'bg-white/5 text-white border border-white/10' 
                : 'text-slate-500 hover:text-cyan-400 hover:bg-white/[0.02]'
              }`}
            >
              {/* ACTIVE GLOW BAR */}
              {type === item.id && (
                <motion.div 
                  layoutId="sidebarGlow"
                  className="absolute left-0 w-1 h-6 bg-cyan-500 rounded-r-full shadow-[0_0_15px_#06b6d4]"
                />
              )}
              
              <span className={`text-xl transition-colors duration-300 ${type === item.id ? 'text-cyan-400' : 'text-slate-600 group-hover:text-cyan-500'}`}>
                {item.icon}
              </span>
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* FOOTER SYSTEM READOUT */}
        <div className="mt-auto space-y-6">
          <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <FiActivity size={10} className="text-cyan-500" /> API Latency
              </span>
              <span className="text-[8px] font-bold text-emerald-500">12ms</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.1)]" />
            </div>
          </div>

          <button
            onClick={() => { localStorage.removeItem("adminToken"); window.location.href = "/"; }}
            className="group w-full flex items-center justify-between p-5 rounded-2xl bg-red-500/5 border border-red-500/10 hover:bg-red-500 hover:border-red-500 transition-all duration-500"
          >
            <span className="text-[10px] font-black text-red-500 group-hover:text-white uppercase tracking-widest flex items-center gap-3 transition-colors">
              <FiLogOut className="text-lg" /> Logout Session
            </span>
            <div className="w-2 h-2 rounded-full bg-red-500 group-hover:bg-white transition-colors" />
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;