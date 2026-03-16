import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiBookOpen, FiCalendar, FiMapPin, FiAward, FiStar } from 'react-icons/fi';

const API_URL = import.meta.env.VITE_API_URL;

const Education = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await axios.get(`${API_URL}/education`);
        setEducation(res.data);
      } catch (err) {
        console.error("Error fetching education data:", err);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchEducation();
  }, []);

  return (
    <section id="education" className="py-24 bg-[#020617] text-white px-6 relative overflow-hidden">
      {/* --- WOW FACTOR: Purple Gradient Orbs --- */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600/10 blur-[150px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-600/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <span className="text-purple-500 font-mono tracking-[0.4em] uppercase text-xs font-black">Academic Journey</span>
          <h2 className="text-5xl md:text-7xl font-black mt-4 mb-6 bg-gradient-to-b from-white to-purple-500 bg-clip-text text-transparent tracking-tighter">
            Education
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)]"></div>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Line - Updated to Purple Gradient */}
          <div className="absolute left-4 md:left-10 top-2 bottom-0 w-[2px] bg-gradient-to-b from-purple-600 via-slate-800 to-transparent opacity-40"></div>

          {loading ? (
            <div className="space-y-12 pl-14 md:pl-24">
               {[1,2].map(i => (
                 <div key={i} className="h-44 bg-slate-900/50 rounded-[2.5rem] animate-pulse border border-white/5 shadow-inner" />
               ))}
            </div>
          ) : education.length > 0 ? (
            education.map((edu, index) => (
              <motion.div 
                key={edu._id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="mb-20 relative pl-14 md:pl-24 group"
              >
                {/* Timeline Icon / Pulse Dot - Updated to Purple */}
                <div className="absolute left-4 md:left-10 -translate-x-1/2 top-0 z-20">
                  <motion.div 
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                    className="w-12 h-12 bg-[#020617] border-2 border-purple-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)] group-hover:border-purple-400 group-hover:bg-purple-500/10 transition-all"
                  >
                    <FiAward className="text-purple-400 text-xl" />
                  </motion.div>
                  <div className="absolute inset-0 w-12 h-12 bg-purple-500 rounded-2xl animate-ping opacity-10"></div>
                </div>

                {/* Card Content - Improved Glassmorphism */}
                <div className="relative bg-[#0f172a]/40 backdrop-blur-3xl border border-white/5 p-8 md:p-10 rounded-[2.5rem] hover:border-purple-500/30 transition-all duration-500 group-hover:translate-x-3 shadow-2xl overflow-hidden">
                  
                  {/* Subtle Corner Glow */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 relative z-10">
                    <div className="space-y-3">
                      <h3 className="text-2xl md:text-4xl font-black text-white group-hover:text-purple-400 transition-colors leading-tight tracking-tight">
                        {edu.degree}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2 text-slate-300 font-bold bg-slate-800/50 px-3 py-1.5 rounded-xl border border-white/5">
                          <FiMapPin className="text-purple-500" />
                          <span className="text-sm">{edu.institute}</span>
                        </div>
                        {edu.grade && (
                          <div className="flex items-center gap-1.5 text-emerald-400 font-black text-xs bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 uppercase tracking-tighter">
                            <FiStar className="fill-emerald-500/20" /> {edu.grade}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 bg-purple-600/10 text-purple-400 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-purple-500/20 shadow-lg self-start">
                      <FiCalendar />
                      {edu.duration}
                    </div>
                  </div>

                  <div className="relative z-10">
                    <p className="text-slate-400 leading-relaxed text-base md:text-lg italic font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                      "{edu.description || "Focused on mastering advanced concepts and applying theoretical knowledge to solve real-world technical challenges."}"
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="pl-14 md:pl-24">
               <div className="bg-slate-900/30 border-2 border-dashed border-white/5 p-12 rounded-[2.5rem] text-center">
                  <FiBookOpen className="text-slate-700 text-5xl mx-auto mb-4 opacity-20" />
                  <p className="text-slate-500 font-medium tracking-wide">Academic records are currently being refined.</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Education;