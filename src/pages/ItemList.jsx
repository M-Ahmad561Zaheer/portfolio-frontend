import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiLayers, FiCheckCircle, FiEdit, FiTrash2, 
  FiDatabase, FiActivity, FiHash, FiClock 
} from 'react-icons/fi';

const ItemList = ({ type, items, searchTerm, handleEdit, handleDelete }) => {
  const filteredItems = items.filter(i =>
    (i.title || i.role || i.degree || i.clientName)
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="xl:col-span-7 space-y-8">
      {/* SECTION HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
            <FiDatabase className="text-cyan-400" size={20} />
          </div>
          <div>
            <h3 className="text-xl font-black text-white tracking-tight uppercase">Live Data Stream</h3>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Querying: {type}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{filteredItems.length} Entities Found</span>
        </div>
      </div>

      {/* DATA CARDS */}
      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              key={item._id}
              className="relative group bg-white/[0.02] border border-white/5 p-6 lg:p-8 rounded-[2.5rem] flex items-center justify-between hover:bg-white/[0.05] hover:border-cyan-500/30 transition-all duration-500 shadow-2xl overflow-hidden"
            >
              {/* ACCENT GLOW HOVER */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="flex items-center gap-8 relative z-10">
                {/* STATUS INDICATOR */}
                <div className="hidden sm:flex flex-col items-center gap-2">
                    <FiHash className="text-slate-700" size={12} />
                    <span className="text-[10px] font-black text-slate-700 tabular-nums">0{index + 1}</span>
                </div>

                <div className="w-14 h-14 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl flex items-center justify-center text-cyan-500 group-hover:border-cyan-500/40 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-500">
                  <FiCheckCircle size={24} />
                </div>

                <div>
                  <h4 className="font-black text-xl text-white group-hover:text-cyan-400 transition-colors duration-300 tracking-tight mb-2">
                    {item.title || item.role || item.degree || item.clientName}
                  </h4>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                        <FiActivity className="text-cyan-500/50" size={12} />
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                            {item.company || item.institute || item.clientRole || 'UNASSIGNED_ENTITY'}
                        </p>
                    </div>
                    {item.duration && (
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                            <FiClock className="text-slate-500" size={10} />
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">{item.duration}</span>
                        </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS (Sliding Reveal) */}
              <div className="flex gap-3 relative z-10 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <button
                  onClick={() => handleEdit(item)}
                  className="w-12 h-12 flex items-center justify-center bg-white text-black rounded-xl hover:bg-cyan-400 transition-all shadow-xl active:scale-90"
                  title="Modify Entity"
                >
                  <FiEdit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="w-12 h-12 flex items-center justify-center bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-90"
                  title="Purge Record"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* EMPTY STATE */}
        {filteredItems.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 bg-white/[0.01] rounded-[3.5rem] border border-dashed border-white/10"
          >
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/5">
                <FiLayers className="text-slate-700" size={32} />
            </div>
            <p className="text-slate-500 font-black uppercase tracking-[0.4em] text-[10px]">
              No matching records in the current matrix
            </p>
            <button 
                onClick={() => handleEdit({})} // Simple way to clear form/trigger new
                className="mt-6 text-cyan-500 font-bold text-[9px] uppercase tracking-widest hover:underline"
            >
                Initialize New Entry
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ItemList;