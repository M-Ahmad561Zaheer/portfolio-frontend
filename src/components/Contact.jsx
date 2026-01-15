import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiSend, FiMail, FiMapPin, FiCheckCircle, FiLoader } from 'react-icons/fi';

const API_URL = import.meta.env.VITE_API_URL;

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'AZ Developers', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      const res = await axios.post(`${API_URL}/contact`, formData);
      if (res.status === 200) {
        setStatus({ loading: false, success: true, error: null });
        setFormData({ name: '', email: '', subject: 'Portfolio Inquiry', message: '' });
        setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.response?.data?.message || "Something went wrong" });
    }
  };

  return (
    // Py-16 for mobile, py-24 for desktop
    <section id="contact" className="py-16 md:py-24 bg-[#020617] px-4 md:px-6 relative overflow-hidden">
      {/* Background Decorative Blur - Adjusted size for mobile */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600/5 blur-[80px] md:blur-[120px] rounded-full -z-10" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        
        {/* Left Side: Text & Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left" // Mobile pe text center kar diya
        >
          {/* Text size adjusted: text-3xl for mobile, text-6xl for desktop */}
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 md:mb-6 leading-tight">
            Let's build something <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Great.</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg mb-8 md:10 max-w-md mx-auto md:mx-0">
            I'm currently open for new projects, collaborations, or just a friendly hello.
          </p>
          
          <div className="space-y-6 md:space-y-8 inline-block md:block text-left">
            <div className="flex items-center gap-4 md:gap-5 group">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-900 flex items-center justify-center rounded-xl md:rounded-2xl border border-slate-800 group-hover:border-blue-500/50 transition-all duration-300 shadow-xl">
                <FiMail className="text-blue-400 text-lg md:text-xl"/>
              </div>
              <div>
                <p className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-bold mb-0.5 md:mb-1">Email Me</p>
                <p className="text-white font-medium text-base md:text-lg break-all">ahmedzaheer2004.24@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-5 group">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-900 flex items-center justify-center rounded-xl md:rounded-2xl border border-slate-800 group-hover:border-emerald-500/50 transition-all duration-300 shadow-xl">
                <FiMapPin className="text-emerald-400 text-lg md:text-xl"/>
              </div>
              <div>
                <p className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-bold mb-0.5 md:mb-1">Location</p>
                <p className="text-white font-medium text-base md:text-lg">Lahore, Pakistan</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full"
        >
          {/* Reduced padding on mobile (p-6) */}
          <form 
            onSubmit={handleSubmit}
            className="bg-[#0f172a]/80 backdrop-blur-xl p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-800 shadow-2xl space-y-4 md:space-y-5"
          >
            <div>
              <input 
                required
                type="text"
                placeholder="Your Name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-[#1e293b]/50 border border-slate-700 p-3.5 md:p-4 rounded-xl md:rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white text-sm md:text-base" 
              />
            </div>
            <div>
              <input 
                required
                type="email"
                placeholder="Email Address" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-[#1e293b]/50 border border-slate-700 p-3.5 md:p-4 rounded-xl md:rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white text-sm md:text-base" 
              />
            </div>
            <div>
              <textarea 
                required
                placeholder="Tell me about your project..." 
                rows="4" 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-[#1e293b]/50 border border-slate-700 p-3.5 md:p-4 rounded-xl md:rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white resize-none text-sm md:text-base"
              ></textarea>
            </div>

            <button 
              disabled={status.loading}
              className={`w-full py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-lg ${
                status.success 
                ? 'bg-emerald-600 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-900/20'
              }`}
            >
              {status.loading ? (
                <FiLoader className="animate-spin text-xl" />
              ) : status.success ? (
                <><FiCheckCircle className="text-xl" /> Message Sent!</>
              ) : (
                <><FiSend /> Send Message</>
              )}
            </button>

            {status.error && (
              <p className="text-red-400 text-xs md:text-sm text-center font-medium mt-2">{status.error}</p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;