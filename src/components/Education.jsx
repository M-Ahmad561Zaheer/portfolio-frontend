import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiBookOpen, FiCalendar, FiMapPin, FiAward } from 'react-icons/fi';

const API_URL = import.meta.env.VITE_API_URL;

const Education = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        // Jab deploy karein toh localhost ko replace karna mat bhoolna
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
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600/5 blur-[120px] rounded-full"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <span className="text-blue-500 font-mono tracking-widest uppercase text-sm">Academic Path</span>
          <h2 className="text-4xl md:text-6xl font-black mt-2 mb-4 bg-gradient-to-r from-white via-blue-100 to-slate-500 bg-clip-text text-transparent">
            Education
          </h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full shadow-lg shadow-blue-500/50"></div>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-600 via-slate-800 to-transparent"></div>

          {loading ? (
            <div className="space-y-8 pl-12">
               {[1,2].map(i => <div key={i} className="h-32 bg-white/5 rounded-2xl animate-pulse border border-white/5"></div>)}
            </div>
          ) : education.length > 0 ? (
            education.map((edu, index) => (
              <motion.div 
                key={edu._id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-16 relative pl-12 md:pl-20 group"
              >
                {/* Timeline Pulse Dot */}
                <div className="absolute left-4 md:left-8 -translate-x-1/2 top-0">
                  <div className="w-10 h-10 bg-[#020617] border-2 border-blue-500 rounded-xl flex items-center justify-center z-10 group-hover:rotate-[360deg] transition-all duration-700 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    <FiAward className="text-blue-400 text-lg" />
                  </div>
                  <div className="absolute inset-0 w-10 h-10 bg-blue-500 rounded-xl animate-ping opacity-20"></div>
                </div>

                {/* Card Content - Glassmorphism */}
                <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:border-blue-500/40 transition-all duration-500 group-hover:translate-x-2 group-hover:shadow-2xl group-hover:shadow-blue-900/10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-blue-400 transition-colors">
                        {edu.degree}
                      </h3>
                      <div className="flex items-center gap-2 text-blue-400/80 mt-2 font-semibold">
                        <FiMapPin className="text-blue-500" />
                        <span>{edu.institute}</span>
                      </div>
                    </div>
                    
                    <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-400 px-4 py-2 rounded-xl text-sm font-bold border border-blue-500/20 self-start">
                      <FiCalendar />
                      {edu.duration}
                    </div>
                  </div>

                  <p className="text-slate-400 leading-relaxed text-base md:text-lg border-l-2 border-slate-800 pl-4 py-1">
                    {edu.description || "Pursued advanced studies focusing on core concepts and practical implementation in the field of technology."}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="pl-12">
               <div className="bg-white/5 border border-dashed border-white/10 p-8 rounded-3xl text-center">
                  <p className="text-slate-500 italic">Academic records are currently being updated.</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Education;