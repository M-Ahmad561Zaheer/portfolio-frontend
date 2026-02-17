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
        setLoading(false);
      }
    };
    fetchEducation();
  }, []);

  return (
    <section id="education" className="py-24 bg-[#020617] text-white px-6 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 blur-[150px] rounded-full -z-10" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <span className="text-blue-500 font-mono tracking-[0.3em] uppercase text-xs font-bold">Academic Journey</span>
          <h2 className="text-5xl md:text-7xl font-black mt-4 mb-6 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
            Education
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)]"></div>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Line with Gradient Stop */}
          <div className="absolute left-4 md:left-10 top-2 bottom-0 w-[2px] bg-gradient-to-b from-blue-600 via-slate-800 to-transparent opacity-50"></div>

          {loading ? (
            <div className="space-y-12 pl-14 md:pl-24">
               {[1,2].map(i => (
                 <div key={i} className="h-44 bg-slate-900/50 rounded-3xl animate-pulse border border-white/5 shadow-inner" />
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
                {/* Timeline Icon / Pulse Dot */}
                <div className="absolute left-4 md:left-10 -translate-x-1/2 top-0 z-20">
                  <div className="w-12 h-12 bg-[#020617] border-2 border-blue-500 rounded-2xl flex items-center justify-center group-hover:rotate-[360deg] transition-all duration-1000 shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover:border-blue-400 group-hover:bg-blue-500/10">
                    <FiAward className="text-blue-400 text-xl group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="absolute inset-0 w-12 h-12 bg-blue-500 rounded-2xl animate-ping opacity-10"></div>
                </div>

                {/* Card Content - Improved Glassmorphism */}
                <div className="relative bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 md:p-10 rounded-[2.5rem] hover:border-blue-500/30 transition-all duration-500 group-hover:translate-x-3 group-hover:bg-slate-900/60 shadow-2xl">
                  
                  {/* Subtle Corner Glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 relative z-10">
                    <div className="space-y-3">
                      <h3 className="text-2xl md:text-4xl font-black text-white group-hover:text-blue-400 transition-colors leading-tight">
                        {edu.degree}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2 text-slate-300 font-bold bg-slate-800/50 px-3 py-1 rounded-lg border border-white/5">
                          <FiMapPin className="text-blue-500" />
                          <span>{edu.institute}</span>
                        </div>
                        {edu.grade && (
                          <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-sm bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                            <FiStar className="fill-emerald-500/20" /> {edu.grade}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 bg-blue-600/10 text-blue-400 px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest border border-blue-500/20 shadow-lg self-start">
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