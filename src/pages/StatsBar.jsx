import React from 'react';
import { motion } from 'framer-motion';
import { FiLayers, FiMail, FiActivity, FiTrendingUp, FiZap } from 'react-icons/fi';

const StatsBar = ({ items, messages }) => {
  const stats = [
    { 
      label: 'Core Database', 
      value: items.length, 
      sub: 'Entries Indexed',
      icon: <FiLayers />, 
      color: 'cyan', 
      glow: 'shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
    },
    { 
      label: 'Signal Relay', 
      value: messages.filter(m => m.status !== 'Replied').length, 
      sub: 'Packets Pending',
      icon: <FiMail />, 
      color: 'emerald', 
      glow: 'shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
    },
    { 
      label: 'Compute Node', 
      value: 'Online', 
      sub: 'Latency 14ms',
      icon: <FiActivity />, 
      color: 'orange', 
      glow: 'shadow-[0_0_15px_rgba(249,115,22,0.3)]' 
    },
    { 
      label: 'System Uptime', 
      value: '99.98%', 
      sub: 'Standard Protocol',
      icon: <FiTrendingUp />, 
      color: 'purple', 
      glow: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
    },
  ];

  // Helper for color mapping
  const getColorClasses = (color) => {
    const maps = {
      cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      orange: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
      purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    };
    return maps[color];
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
      {stats.map((stat, idx) => (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          key={idx} 
          className="relative group bg-[#020617] border border-white/5 p-7 rounded-[2.5rem] flex items-center gap-6 overflow-hidden hover:border-white/10 transition-all duration-500"
        >
          {/* BACKGROUND DECORATIVE GLOW */}
          <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-[50px] opacity-10 transition-opacity group-hover:opacity-30 ${getColorClasses(stat.color).split(' ')[1]}`} />

          {/* SENSOR ICON */}
          <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition-all duration-500 ${getColorClasses(stat.color)} ${stat.glow} group-hover:scale-110`}>
            <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl border border-current opacity-20"
            />
            {stat.icon}
          </div>

          {/* METRIC TEXT */}
          <div className="relative z-10 flex-1">
            <div className="flex items-center justify-between mb-1">
                <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.3em]">{stat.label}</p>
                <FiZap size={10} className="text-slate-800 group-hover:text-cyan-500/50 transition-colors" />
            </div>
            <h3 className="text-3xl font-black text-white tracking-tighter mb-1 tabular-nums">
                {stat.value}
            </h3>
            <div className="flex items-center gap-2">
                <div className={`w-1 h-1 rounded-full animate-pulse ${getColorClasses(stat.color).split(' ')[0]}`} />
                <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">{stat.sub}</p>
            </div>
          </div>

          {/* MINI SPARKLINE DECOR */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/[0.02] overflow-hidden">
             <motion.div 
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className={`w-1/3 h-full bg-gradient-to-r from-transparent via-current to-transparent opacity-20 ${getColorClasses(stat.color).split(' ')[0]}`}
             />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsBar;