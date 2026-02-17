import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiMessageSquare, FiStar, FiActivity, FiUser } from 'react-icons/fi';

const API_URL = import.meta.env.VITE_API_URL;

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${API_URL}/reviews`);
        setReviews(res.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-[#020617] text-white px-6 relative overflow-hidden">
      {/* Background Glow - Matching Experience.jsx */}
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-purple-600/10 blur-[120px] rounded-full -z-10" />

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full text-center mb-20 flex flex-col items-center"
        >
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-widest">
            Wall of Love
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-500 bg-clip-text text-transparent">
            Client Transmissions
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            Feedback from people I've collaborated with to build impactful digital experiences.
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            [1, 2, 3].map(n => (
              <div key={n} className="h-64 bg-slate-900/50 rounded-[2.5rem] animate-pulse border border-slate-800" />
            ))
          ) : reviews.length > 0 ? (
            reviews.map((rev, index) => (
              <motion.div
                key={rev._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-[#0f172a]/30 backdrop-blur-xl border border-white/5 p-8 rounded-[2.5rem] hover:border-purple-500/40 hover:bg-slate-900/40 transition-all duration-500 shadow-2xl overflow-hidden"
              >
                {/* Background Decorative Icon - Like Experience.jsx */}
                <FiMessageSquare className="absolute -right-6 -top-6 text-purple-500/5 text-9xl -rotate-12 group-hover:rotate-0 transition-transform duration-1000" />

                <div className="relative z-10">
                  {/* Star Rating */}
                  <div className="flex gap-1 mb-6 text-purple-400">
                    {[...Array(Number(rev.rating) || 5)].map((_, i) => (
                      <FiStar key={i} fill="currentColor" size={14} className="drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]" />
                    ))}
                  </div>

                  {/* Feedback Message */}
                  <p className="text-slate-300 leading-relaxed italic mb-8 min-h-[100px] text-base">
                    "{rev.reviewText}"
                  </p>

                  {/* Client Info */}
                  <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center font-black text-white text-xl shadow-[0_0_15px_rgba(168,85,247,0.3)] group-hover:scale-110 transition-transform duration-500">
                      {rev.clientName?.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white group-hover:text-purple-400 transition-colors tracking-tight">
                        {rev.clientName}
                      </h4>
                      <p className="text-[10px] font-black text-purple-500 uppercase tracking-widest flex items-center gap-1">
                        <FiActivity className="text-[8px]" /> {rev.clientRole || "Satisfied Client"}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-800 rounded-[2rem]">
              <p className="text-slate-500 font-mono italic">No client transmissions decoded yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;