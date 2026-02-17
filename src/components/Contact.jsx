import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiMail, FiMapPin, FiCheckCircle, FiLoader, FiAlertCircle } from 'react-icons/fi';

const API_URL = import.meta.env.VITE_API_URL;

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Portfolio Inquiry', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      const res = await axios.post(`${API_URL}/contact`, formData);
      if (res.status === 200 || res.status === 201) {
        setStatus({ loading: false, success: true, error: null });
        setFormData({ name: '', email: '', subject: 'Portfolio Inquiry', message: '' });
        // Success message disappears after 5 seconds
        setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
      }
    } catch (err) {
      setStatus({ 
        loading: false, 
        success: false, 
        error: err.response?.data?.message || "Server connection failed. Try again later." 
      });
    }
  };

  return (
    <section id="contact" className="py-16 md:py-32 bg-[#020617] px-4 md:px-6 relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-600/10 blur-[100px] md:blur-[150px] rounded-full -z-10 animate-pulse" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
        
        {/* Left Side: Text & Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-[0.2em]">
            Get In Touch
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1]">
            Let's build something <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Extraordinary.
            </span>
          </h2>
          <p className="text-slate-400 text-base md:text-xl mb-10 max-w-md mx-auto md:mx-0 leading-relaxed">
            Have a project in mind or just want to say hi? My inbox is always open for interesting ideas.
          </p>
          
          <div className="space-y-6 text-left max-w-sm mx-auto md:mx-0">
            {[
              { icon: <FiMail />, title: 'Email Me', value: 'ahmedzaheer2004.24@gmail.com', color: 'text-blue-400', bg: 'border-blue-500/20' },
              { icon: <FiMapPin />, title: 'Location', value: 'Lahore, Pakistan', color: 'text-emerald-400', bg: 'border-emerald-500/20' }
            ].map((info, i) => (
              <div key={i} className="flex items-center gap-5 group">
                <div className={`w-14 h-14 bg-slate-900 flex items-center justify-center rounded-2xl border border-slate-800 group-hover:${info.bg} transition-all duration-300 shadow-xl`}>
                  <span className={`${info.color} text-xl`}>{info.icon}</span>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mb-1">{info.title}</p>
                  <p className="text-white font-semibold text-base md:text-lg break-all">{info.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <form 
            onSubmit={handleSubmit}
            className="bg-slate-900/40 backdrop-blur-3xl p-6 md:p-12 rounded-[2rem] border border-white/5 shadow-2xl space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input 
                required
                type="text"
                placeholder="Full Name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-slate-800/50 border border-slate-700/50 p-4 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder:text-slate-500" 
              />
              <input 
                required
                type="email"
                placeholder="Email Address" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-slate-800/50 border border-slate-700/50 p-4 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder:text-slate-500" 
              />
            </div>
            
            <textarea 
              required
              placeholder="Your Message..." 
              rows="5" 
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-slate-800/50 border border-slate-700/50 p-4 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white resize-none placeholder:text-slate-500"
            ></textarea>

            <button 
              disabled={status.loading}
              className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all duration-500 ${
                status.success 
                ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/25 hover:-translate-y-1'
              } disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {status.loading ? (
                <FiLoader className="animate-spin text-xl" />
              ) : status.success ? (
                <motion.div initial={{scale:0}} animate={{scale:1}} className="flex items-center gap-2">
                  <FiCheckCircle className="text-xl" /> Sent Successfully
                </motion.div>
              ) : (
                <><FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Send Message</>
              )}
            </button>

            {/* Error Message with Animation */}
            <AnimatePresence>
              {status.error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2 text-red-400 text-sm font-medium pt-2"
                >
                  <FiAlertCircle /> {status.error}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;