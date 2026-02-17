import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiCheckCircle, FiActivity } from 'react-icons/fi';

const API_URL = import.meta.env.VITE_API_URL;

const Experience = () => {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await axios.get(`${API_URL}/experience`);
        setExperience(res.data);
      } catch (err) {
        console.error("Error fetching experience:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, []);

  return (
    <section id="experience" className="py-24 bg-[#020617] text-white px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-purple-600/10 blur-[120px] rounded-full -z-10" />

      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full text-center mb-20 flex flex-col items-center"
        >
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-widest">
            Career Path
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-500 bg-clip-text text-transparent">
            Professional Experience
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            My journey through the tech industry, contributing to various teams and building robust solutions.
          </p>
        </motion.div>

        <div className="relative border-l-2 border-slate-800/50 ml-4 md:ml-10">
          {loading ? (
             <div className="pl-10 space-y-8">
               {[1, 2].map(n => (
                 <div key={n} className="h-40 bg-slate-900/50 rounded-[2rem] animate-pulse border border-slate-800" />
               ))}
             </div>
          ) : experience.length > 0 ? (
            experience.map((exp, index) => (
              <motion.div 
                key={exp._id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-16 relative pl-10 md:pl-20 group"
              >
                {/* Modern Timeline Dot */}
                <div className="absolute -left-[13px] top-2 w-6 h-6 bg-[#020617] border-2 border-purple-500 rounded-full flex items-center justify-center z-10 group-hover:scale-125 group-hover:bg-purple-500 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                  <div className="w-2 h-2 bg-purple-500 group-hover:bg-white rounded-full animate-pulse group-hover:animate-none" />
                </div>

                {/* Content Card */}
                <div className="bg-[#0f172a]/30 backdrop-blur-xl border border-white/5 p-8 md:p-10 rounded-[2.5rem] hover:border-purple-500/40 hover:bg-slate-900/40 transition-all duration-500 shadow-2xl relative overflow-hidden">
                  
                  {/* Decorative Icon */}
                  <FiActivity className="absolute -right-6 -top-6 text-purple-500/5 text-9xl -rotate-12 group-hover:rotate-0 transition-transform duration-1000" />

                  <div className="flex flex-wrap justify-between items-start gap-6 mb-8 relative z-10">
                    <div className="space-y-2">
                      <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-purple-400 transition-colors tracking-tight">
                        {exp.role}
                      </h3>
                      <p className="text-purple-300 font-bold flex items-center gap-2 text-lg">
                        <FiBriefcase className="text-sm" />
                        {exp.company}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <span className="flex items-center gap-2 bg-slate-800 text-purple-300 px-5 py-2 rounded-2xl text-xs font-bold border border-slate-700 shadow-inner">
                        <FiCalendar className="text-purple-500" /> {exp.duration}
                      </span>
                      <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] ${
                        exp.type?.toLowerCase() === 'internship' 
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {exp.type || 'Full Time'}
                      </span>
                    </div>
                  </div>

                  {/* Description Handling */}
                  <div className="relative z-10 space-y-4">
                    {exp.description.split('\n').map((point, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <FiCheckCircle className="text-purple-500 mt-1.5 shrink-0 text-sm" />
                        <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                          {point.trim()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-slate-800 rounded-[2rem]">
                <p className="text-slate-500 font-mono">No professional history found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;