import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiCpu, FiShield, FiSave, FiXCircle, FiTerminal, FiStar } from 'react-icons/fi';

const ItemForm = ({ type, formData, setFormData, editId, setEditId, handleSubmit }) => {
  
  // Helper to calculate form completion percentage for the "Wow" meter
  const calculateProgress = () => {
    const fields = Object.values(formData).filter(v => v && v !== '');
    return Math.min((fields.length / 5) * 100, 100);
  };

  const inputStyle = "w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl outline-none focus:border-cyan-500/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-cyan-500/5 transition-all duration-300 font-medium text-slate-200 placeholder:text-slate-600";
  const labelStyle = "text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1 flex items-center gap-2";

  return (
    <div className="xl:col-span-5">
      <div className="relative group">
        {/* HOLOGRAPHIC OUTER GLOW */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-purple-600/20 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000" />
        
        <div className="relative bg-[#020617] border border-white/10 p-8 lg:p-10 rounded-[2.5rem] shadow-2xl sticky top-12 overflow-hidden">
          
          {/* DECORATIVE BACKGROUND ELEMENTS */}
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
            <FiCpu size={120} />
          </div>

          {/* HEADER WITH STATUS METER */}
          <div className="flex justify-between items-start mb-10">
            <div>
              <h3 className="text-2xl font-black tracking-tighter text-white flex items-center gap-3">
                <div className="p-2 bg-cyan-500/10 rounded-lg">
                    {editId ? <FiCpu className="text-cyan-400 animate-pulse" /> : <FiPlus className="text-cyan-400" />}
                </div>
                {editId ? "REWRITE_CORE" : "NEW_DATA_LINK"}
              </h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-2">
                Target: <span className="text-cyan-500">{type}</span>
              </p>
            </div>
            
            <div className="text-right">
                <div className="text-[9px] font-black text-slate-500 mb-1 uppercase tracking-widest">Integrity</div>
                <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${calculateProgress()}%` }}
                        className="h-full bg-gradient-to-r from-cyan-600 to-blue-500 shadow-[0_0_10px_#06b6d4]"
                    />
                </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={type}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                {type === 'reviews' ? (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className={labelStyle}><div className="w-1 h-1 bg-cyan-500 rounded-full animate-ping" /> Entity Name</label>
                      <input required className={inputStyle} placeholder="Client or Company Name" value={formData.clientName || ''} onChange={(e) => setFormData({ ...formData, clientName: e.target.value })} />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className={labelStyle}>Designation</label>
                            <input className={inputStyle} placeholder="CEO / Manager" value={formData.clientRole || ''} onChange={(e) => setFormData({ ...formData, clientRole: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <label className={labelStyle}>Rating Score</label>
                            <div className="relative">
                                <FiStar className="absolute right-4 top-1/2 -translate-y-1/2 text-yellow-500/50" />
                                <input type="number" min="1" max="5" className={inputStyle} value={formData.rating || 5} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                      <label className={labelStyle}>Testimonial Script</label>
                      <textarea required className={`${inputStyle} min-h-[120px] resize-none`} placeholder="Enter feedback payload..." value={formData.reviewText || ''} onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })} />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className={labelStyle}>
                        <div className="w-1 h-1 bg-cyan-500 rounded-full animate-ping" />
                        {type === 'education' ? 'Intel Class (Degree)' : type === 'experience' ? 'Position Rank' : 'Project Identity'}
                      </label>
                      <input required className={inputStyle} value={formData.title || formData.role || formData.degree || ''} 
                        onChange={(e) => {
                          const key = type === 'education' ? 'degree' : type === 'experience' ? 'role' : 'title';
                          setFormData({ ...formData, [key]: e.target.value });
                        }} placeholder="Primary Identifier..." />
                    </div>

                    <div className="space-y-2">
                      <label className={labelStyle}>
                        {type === 'education' ? 'Sector (Institution)' : type === 'experience' ? 'Command Center (Org)' : 'Stack Architecture'}
                      </label>
                      <input required className={inputStyle} value={formData.institute || formData.company || formData.techStack || ''} 
                        placeholder={type === 'projects' ? "React, Tailwind, Node.js" : "Name of the organization"}
                        onChange={(e) => {
                          const key = type === 'education' ? 'institute' : type === 'experience' ? 'company' : 'techStack';
                          setFormData({ ...formData, [key]: e.target.value });
                        }} />
                    </div>

                    {type === 'projects' ? (
                      <div className="grid grid-cols-1 gap-3">
                        <div className="relative group/input">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-cyan-500/50">GIT</div>
                            <input className={`${inputStyle} pl-12 text-xs`} placeholder="Repository URL" value={formData.githubLink || ''} onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })} />
                        </div>
                        <div className="relative group/input">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-blue-500/50">LIVE</div>
                            <input className={`${inputStyle} pl-12 text-xs`} placeholder="Production URL" value={formData.liveLink || ''} onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })} />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <label className={labelStyle}>Mission Timeline</label>
                        <input className={inputStyle} placeholder="e.g., 2023 - Present" value={formData.duration || ''} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} />
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className={labelStyle}>Data Description</label>
                      <textarea className={`${inputStyle} min-h-[120px] resize-none`} value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Comprehensive details..." />
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* ACTION BUTTONS */}
            <div className="pt-4 space-y-3">
                <button type="submit" className="w-full relative group/btn overflow-hidden bg-white text-black py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all active:scale-95">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    <span className="relative z-10 flex items-center justify-center gap-3 group-hover/btn:text-white transition-colors">
                        {editId ? <FiSave /> : <FiTerminal />}
                        {editId ? "Execute Overwrite" : "Commit to Matrix"}
                    </span>
                </button>

                {editId && (
                    <button
                        onClick={() => { setEditId(null); setFormData({}); }}
                        type="button"
                        className="w-full bg-white/5 hover:bg-red-500/10 text-slate-500 hover:text-red-400 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                    >
                        <FiXCircle /> Abort Modification
                    </button>
                )}
            </div>
          </form>

          {/* FOOTER DECOR */}
          <div className="mt-8 flex justify-center gap-2 opacity-20">
             {[...Array(5)].map((_, i) => <div key={i} className="w-1 h-1 bg-white rounded-full" />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemForm;