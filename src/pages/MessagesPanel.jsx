import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiTrash2, FiSend, FiX, FiMail, FiZap, 
  FiShield, FiClock, FiCornerDownRight 
} from 'react-icons/fi';

const MessagesPanel = ({
  messages,
  replyId, setReplyId,
  replyText, setReplyText,
  sendingReply,
  handleDelete,
  handleSendReply
}) => {
  return (
    <motion.div 
      key="messages" 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="max-w-5xl mx-auto space-y-8 pb-20"
    >
      {/* HEADER STATS */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
            <FiMail className="text-cyan-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Inbound Signal Stream</span>
        </div>
        <div className="text-[10px] font-black uppercase tracking-widest text-cyan-500/50">
            {messages.length} Active Packets
        </div>
      </div>

      {messages.map((m, idx) => (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          key={m._id}
          className={`relative group bg-[#0b1120]/40 backdrop-blur-xl p-8 lg:p-10 rounded-[3.5rem] border transition-all duration-500 ${
            replyId === m._id 
            ? 'border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.1)]' 
            : m.status === 'Replied' 
              ? 'border-emerald-500/10 grayscale-[0.5] hover:grayscale-0' 
              : 'border-white/5 hover:border-white/10 shadow-2xl'
          }`}
        >
          {/* Status Pulse */}
          <div className="absolute top-10 right-10 flex items-center gap-2">
             <div className={`w-2 h-2 rounded-full animate-pulse ${m.status === 'Replied' ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-cyan-500 shadow-[0_0_10px_#06b6d4]'}`} />
             <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{m.status || 'Active Signal'}</span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500/20 blur-lg rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0f172a] to-black border border-white/10 flex items-center justify-center font-black text-2xl text-white shadow-2xl group-hover:border-cyan-500/50 transition-all">
                  {m.name?.charAt(0)}
                </div>
              </div>
              <div>
                <h4 className="text-2xl font-black tracking-tighter text-white mb-1">{m.name}</h4>
                <div className="flex items-center gap-3">
                    <p className="text-cyan-500 text-[10px] font-bold uppercase tracking-widest">{m.email}</p>
                    <span className="w-1 h-1 bg-slate-700 rounded-full" />
                    <div className="flex items-center gap-1 text-slate-500 text-[9px] font-bold uppercase">
                        <FiClock size={10} /> {new Date(m.createdAt).toLocaleDateString() || 'Recent'}
                    </div>
                </div>
              </div>
            </div>

            <button 
                onClick={() => handleDelete(m._id, 'messages')} 
                className="p-4 bg-white/[0.02] border border-white/5 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all group/trash"
            >
              <FiTrash2 size={18} className="group-hover/trash:scale-110 transition-transform" />
            </button>
          </div>

          {/* Subject Line Chip */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/5 rounded-full mb-6">
             <FiZap size={10} className="text-cyan-500" />
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SUB: {m.subject || "No Subject"}</span>
          </div>

          {/* Transmission Body */}
          <div className="relative bg-black/40 p-8 rounded-[2.5rem] border border-white/5 mb-8 group-hover:border-white/10 transition-all">
            <FiShield className="absolute top-4 right-6 text-white/5" size={40} />
            <p className="text-slate-300 text-lg leading-relaxed font-medium italic relative z-10">
              "{m.message}"
            </p>
          </div>

          {/* History Overlay (If Replied) */}
          {m.replyText && (
            <div className="mb-8 p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-[2rem] flex items-start gap-4">
              <FiCornerDownRight className="text-emerald-500 mt-1 shrink-0" />
              <div>
                <p className="text-[9px] font-black text-emerald-500/80 uppercase tracking-[0.2em] mb-2">Previous Outbound Response</p>
                <p className="text-slate-400 text-sm font-medium italic leading-relaxed">"{m.replyText}"</p>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => { setReplyId(replyId === m._id ? null : m._id); setReplyText(""); }}
              className={`group/btn flex items-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                replyId === m._id 
                ? 'bg-red-500/10 text-red-500 border border-red-500/20' 
                : 'bg-white text-black hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]'
              }`}
            >
              {replyId === m._id ? <><FiX /> Terminate Relay</> : <><FiSend /> Initialize Response</>}
            </button>
          </div>

          {/* Holographic Reply Terminal */}
          <AnimatePresence>
            {replyId === m._id && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: 'auto', opacity: 1, marginTop: 24 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="relative group/term">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-[2.5rem] blur opacity-50" />
                    <div className="relative bg-[#020617] border border-cyan-500/30 p-2 rounded-[2.5rem]">
                        <textarea
                          className="w-full bg-transparent p-8 rounded-[2rem] outline-none text-white text-sm placeholder:text-slate-700 font-medium leading-relaxed resize-none"
                          placeholder="Type encrypted message..."
                          rows="6"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                        />
                    </div>
                </div>
                
                <button
                  disabled={sendingReply || !replyText}
                  onClick={() => handleSendReply(m._id, m.email, m.subject)}
                  className="mt-4 w-full group/send relative overflow-hidden bg-gradient-to-r from-cyan-600 to-blue-700 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] disabled:opacity-30 transition-all active:scale-95"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {sendingReply ? "UPLOADING DATA PACKETS..." : "AUTHORIZE TRANSMISSION"}
                    <FiSend className={sendingReply ? "animate-bounce" : "group-hover/send:translate-x-1 transition-transform"} />
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      {/* Empty State */}
      {messages.length === 0 && (
        <div className="text-center py-32 bg-white/[0.02] border border-dashed border-white/5 rounded-[4rem]">
           <FiMail className="mx-auto text-slate-800 mb-6" size={48} />
           <p className="text-slate-500 font-black uppercase tracking-[0.5em] text-xs">No Signal Detected</p>
        </div>
      )}
    </motion.div>
  );
};

export default MessagesPanel;