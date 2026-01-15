import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiCheckCircle } from 'react-icons/fi';

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
    <section id="experience" className="py-24 bg-[#020617] text-white px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
                    <div className="w-full text-center mb-12 flex flex-col items-center justify-center"> 
            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent inline-block">
              Professional Experience
            </h2>

            {/* Paragraph: mx-auto is the key here */}
            <p className="text-slate-400 text-center text-lg max-w-2xl mx-auto">
              My journey through the tech industry, contributing to various teams and building robust solutions.
            </p>
          </div>
        </motion.div>

        <div className="relative border-l-2 border-slate-800 ml-4 md:ml-10">
          {loading ? (
             <p className="pl-10 text-slate-500 animate-pulse">Fetching career history...</p>
          ) : experience.length > 0 ? (
            experience.map((exp, index) => (
              <motion.div 
                key={exp._id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-12 relative pl-10 md:pl-16 group"
              >
                {/* Modern Timeline Dot */}
                <div className="absolute -left-[13px] top-0 w-6 h-6 bg-[#020617] border-2 border-purple-500 rounded-full flex items-center justify-center z-10 group-hover:scale-125 transition-transform duration-300">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                </div>

                {/* Content Card */}
                <div className="bg-[#0f172a]/40 backdrop-blur-md border border-slate-800 p-8 rounded-[2rem] hover:border-purple-500/30 transition-all duration-500 shadow-2xl relative overflow-hidden group">
                  {/* Decorative Background Icon */}
                  <FiBriefcase className="absolute -right-4 -bottom-4 text-purple-500/5 text-9xl rotate-12 group-hover:scale-110 transition-transform duration-700" />

                  <div className="flex flex-wrap justify-between items-start gap-4 mb-6 relative z-10">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-purple-300 font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                        {exp.company}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className="flex items-center gap-2 bg-purple-500/10 text-purple-400 px-4 py-1.5 rounded-full text-xs font-bold border border-purple-500/20">
                        <FiCalendar /> {exp.duration}
                      </span>
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                        exp.type === 'Internship' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {exp.type || 'Full Time'}
                      </span>
                    </div>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-start gap-3">
                      <FiCheckCircle className="text-purple-500 mt-1 shrink-0" />
                      <p className="text-slate-400 leading-relaxed text-sm md:text-base nnt-italic">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="pl-10 text-slate-500">No experience added yet.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;