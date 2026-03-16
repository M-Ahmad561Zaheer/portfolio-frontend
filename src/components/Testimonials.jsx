import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiMessageSquare, FiStar, FiActivity } from 'react-icons/fi';
import { Quote } from 'lucide-react'; // Import from Lucide instead

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
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchReviews();
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-[#020617] text-white px-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-600/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/10 blur-[150px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-[10px] font-black uppercase tracking-[0.2em]">
            <FiMessageSquare size={12} /> Wall of Love
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-b from-white to-purple-500 bg-clip-text text-transparent tracking-tighter">
            Client Transmissions
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl font-medium">
            Verified feedback from global collaborators and direct freelance clients.
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            [1, 2, 3].map(n => (
              <div key={n} className="h-72 bg-slate-900/40 rounded-[2.5rem] animate-pulse border border-white/5" />
            ))
          ) : reviews.length > 0 ? (
            reviews.map((rev, index) => (
              <motion.div
                key={rev._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-[#0f172a]/30 backdrop-blur-3xl border border-white/5 p-10 rounded-[2.5rem] hover:border-purple-500/40 transition-all duration-500 shadow-2xl flex flex-col"
              >
                {/* WOW FACTOR: Floating Quote Icon */}
                <div className="absolute top-8 right-8 text-purple-500/10 group-hover:text-purple-500/20 transition-colors">
                  <Quote size={40} /> {/* Change FiQuote to Quote */}
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Star Rating with Glow */}
                  <div className="flex gap-1.5 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <FiStar 
                        key={i} 
                        size={14} 
                        className={`${i < (rev.rating || 5) ? 'text-purple-400 fill-purple-400' : 'text-slate-700'} drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]`} 
                      />
                    ))}
                  </div>

                  {/* Feedback Message */}
                  <p className="text-slate-300 leading-relaxed italic mb-10 text-lg font-medium">
                    "{rev.reviewText}"
                  </p>

                  {/* Client Info - Locked to Bottom */}
                  <div className="flex items-center gap-4 border-t border-white/5 pt-8 mt-auto">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center font-black text-white text-xl shadow-lg group-hover:rotate-6 transition-transform">
                        {rev.clientName?.charAt(0)}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-[#020617] rounded-full" title="Verified Client" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white group-hover:text-purple-400 transition-colors tracking-tight text-lg">
                        {rev.clientName}
                      </h4>
                      <p className="text-[10px] font-black text-purple-500 uppercase tracking-[0.2em] flex items-center gap-2">
                        <FiActivity size={10} className="animate-pulse" /> {rev.clientRole || "Project Partner"}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-24 text-center bg-slate-900/20 rounded-[3rem] border-2 border-dashed border-white/5">
              <FiMessageSquare className="text-5xl text-slate-800 mx-auto mb-4 opacity-30" />
              <p className="text-slate-500 font-mono text-sm tracking-widest uppercase">No encrypted transmissions found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;