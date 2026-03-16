import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import { ShieldCheck, Lock, Eye, EyeOff, Loader2, Cpu } from 'lucide-react';

const Login = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;
  const ADMIN_PATH = import.meta.env.VITE_ADMIN_PATH;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${API_URL}/auth/login`, 
        { password },
        { withCredentials: true } 
      );

      if (data.success) {
        localStorage.setItem("isAdminAuthenticated", "true"); 
        const targetPath = `/${ADMIN_PATH?.trim() || 'dashboard'}`;
        navigate(targetPath);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Grid Connection Failed!";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#020617] flex items-center justify-center p-4 overflow-hidden relative">
      {/* --- WOW FACTOR: Carbon Fibre & Pulse Background --- */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-600/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-900/10 blur-[150px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-[#0b1120]/60 backdrop-blur-3xl p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
          {/* Subtle Scanning Light Effect */}
          <motion.div 
            animate={{ y: [0, 400, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-[1px] bg-purple-500/20 z-0"
          />
          
          {/* Header Section */}
          <div className="text-center mb-10 relative z-10">
            <motion.div 
              whileHover={{ rotateY: 180 }}
              transition={{ duration: 0.8 }}
              className="inline-flex bg-purple-600/10 p-4 rounded-3xl border border-purple-500/20 mb-6 relative group cursor-help"
            >
              <div className="absolute inset-0 bg-purple-500/20 blur-xl group-hover:blur-2xl transition-all" />
              <ShieldCheck className="text-purple-400 w-12 h-12 relative z-10" />
            </motion.div>
            <h2 className="text-4xl font-black tracking-tighter text-white mb-2 uppercase">
              Core Admin
            </h2>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2">
              <Cpu size={12} className="text-purple-500 animate-pulse" /> System Auth Protocol
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-purple-400 transition-colors">
                <Lock size={18} />
              </div>
              
              {/* Accessibility inputs for browser autofill */}
              <input type="text" name="username" value="admin" readOnly className="hidden" autoComplete="username" />

              <input 
                type={showPassword ? "text" : "password"} 
                autoComplete="current-password"
                placeholder="ENTER ACCESS CODE" 
                className="w-full bg-[#050816]/80 border border-white/5 p-5 pl-14 pr-14 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 transition-all text-white placeholder:text-slate-800 font-mono tracking-[0.3em] text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(168, 85, 247, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit" 
              className="w-full bg-gradient-to-br from-purple-600 to-indigo-700 py-5 rounded-2xl font-black text-xs tracking-[0.3em] text-white flex items-center justify-center gap-3 disabled:opacity-50 transition-all shadow-xl shadow-purple-900/20"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>INITIALIZE PROTOCOL</>
              )}
            </motion.button>
          </form>

          {/* Footer Decoration */}
          <div className="mt-10 pt-8 border-t border-white/5 flex flex-col items-center gap-4 relative z-10">
             <div className="flex gap-1.5">
                {[1, 2, 3].map(i => (
                  <motion.div 
                    key={i} 
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                    className={`h-1.5 w-8 rounded-full ${i===1 ? 'bg-purple-600' : 'bg-slate-800'}`} 
                  />
                ))}
             </div>
             <span className="text-[9px] text-slate-600 font-black uppercase tracking-[0.2em]">
                Encryption Level: AES-256-GCM
             </span>
          </div>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8 text-slate-600 text-[10px] font-mono uppercase tracking-[0.4em]"
        >
          Secure Terminal v2.04 • Ahmad Zaheer
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;