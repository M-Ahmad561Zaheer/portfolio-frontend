import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // For animations
import { ShieldCheck, Lock, Eye, EyeOff, Loader2 } from 'lucide-react'; // Pro Icons

const Login = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;
  const ADMIN_PATH = import.meta.env.VITE_ADMIN_PATH;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { password });

      if (res.data.success) {
        console.log("Token received from backend:", res.data.adminKey);
        localStorage.setItem("adminToken", res.data.adminKey);
        // Chota sa delay for feel-good effect
        setTimeout(() => {
          navigate(`/${ADMIN_PATH}`);
        }, 1000);
      } 
   }  catch (err) {
  console.error("Axios Error Details:", err.response); // Ye console mein check karein
  alert(err.response?.data?.message || "Something went wrong!"); 
}finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#020617] flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background Animated Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-[#0b1120]/80 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          
          {/* Top Icon Area */}
          <div className="flex justify-center mb-8">
            <div className="bg-blue-600/20 p-4 rounded-2xl border border-blue-500/30">
              <ShieldCheck className="text-blue-500 w-10 h-10" />
            </div>
          </div>

          <h2 className="text-4xl font-black mb-2 text-center bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
            System Identity
          </h2>
          <p className="text-slate-500 text-center mb-10 text-sm font-medium">Verify credentials to bypass security.</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors">
                <Lock size={20} />
              </div>
              
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Encrypted Password" 
                className="w-full bg-[#050816]/50 border border-white/10 p-4 pl-12 pr-12 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-white placeholder:text-slate-600 font-mono tracking-widest"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 py-4 rounded-2xl font-bold transition-all text-white shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "INITIALIZE ACCESS"
              )}
            </motion.button>
          </form>

          {/* Bottom Hint */}
          <div className="mt-8 flex justify-center gap-2">
            <div className="h-1 w-12 bg-blue-600 rounded-full" />
            <div className="h-1 w-1 bg-slate-800 rounded-full" />
            <div className="h-1 w-1 bg-slate-800 rounded-full" />
          </div>
        </div>

        <p className="text-center mt-8 text-slate-600 text-xs font-mono uppercase tracking-[0.2em]">
          Authorized Access Only • Security Level 4
        </p>
      </motion.div>
    </div>
  );
};

export default Login;