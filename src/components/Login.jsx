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
    if (loading) return; // Double click prevention

    setLoading(true);
    try {
      // Logic same: Backend ko password bhej rahe hain
      const { data } = await axios.post(`${API_URL}/auth/login`, { password });

      if (data.success) {
        localStorage.setItem("adminToken", data.adminKey);
        
        // Clean navigation with trim to avoid whitespace errors
        const targetPath = `/${ADMIN_PATH?.trim() || 'dashboard'}`;
        navigate(targetPath);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Grid Connection Failed!";
      console.error("Auth Protocol Error:", err.response);
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#020617] flex items-center justify-center p-4 overflow-hidden relative">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/20 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-900/20 blur-[150px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-[#0b1120]/60 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/5 shadow-2xl">
          
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="inline-flex bg-blue-600/10 p-4 rounded-3xl border border-blue-500/20 mb-6 relative group">
              <div className="absolute inset-0 bg-blue-500/20 blur-xl group-hover:blur-2xl transition-all" />
              <ShieldCheck className="text-blue-400 w-12 h-12 relative z-10" />
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white mb-2">
              Core Admin
            </h2>
            <p className="text-slate-400 text-sm font-medium flex items-center justify-center gap-2">
              <Cpu size={14} className="text-blue-500" /> System Authentication Required
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors">
                <Lock size={18} />
              </div>
              {/* Hidden username field for accessibility/browser autofill */}
<input 
  type="text" 
  name="username" 
  value="admin" 
  readOnly 
  style={{ display: 'none' }} 
  autoComplete="username" 
/>

<input 
  type={showPassword ? "text" : "password"} 
  autoComplete="current-password"
  // ... baaki props
/>
              
              <input 
                type={showPassword ? "text" : "password"} 
                autoComplete="current-password"
                placeholder="ACCESS CODE" 
                className="w-full bg-[#050816]/80 border border-white/5 p-5 pl-14 pr-14 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all text-white placeholder:text-slate-700 font-mono tracking-[0.3em] text-sm"
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
              whileHover={{ scale: 1.01, boxShadow: "0 0 20px rgba(37, 99, 235, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit" 
              className="w-full bg-gradient-to-br from-blue-600 to-indigo-700 py-5 rounded-2xl font-black text-xs tracking-[0.2em] text-white flex items-center justify-center gap-3 disabled:opacity-50 transition-all"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>INITIALIZE PROTOCOL</>
              )}
            </motion.button>
          </form>

          {/* Footer Decoration */}
          <div className="mt-10 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
             <div className="flex gap-1.5">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`h-1 w-8 rounded-full ${i===1 ? 'bg-blue-600' : 'bg-slate-800'}`} />
                ))}
             </div>
             <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                Nodes Encrypted: 256-Bit SSL
             </span>
          </div>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8 text-slate-500 text-[10px] font-mono uppercase tracking-[0.4em]"
        >
          Secure Terminal v2.04 • Ahmad Zaheer
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;