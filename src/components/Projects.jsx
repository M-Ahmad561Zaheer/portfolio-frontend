import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion'; 
import { FiGithub, FiExternalLink } from 'react-icons/fi';

// 1. Skeleton Card Component (Loading ke waqt dikhane ke liye)
const ProjectSkeleton = () => (
  <div className="bg-[#0f172a]/50 border border-slate-800 rounded-[2.5rem] overflow-hidden animate-pulse">
    <div className="h-60 bg-slate-800/40" />
    <div className="p-8 space-y-5">
      <div className="h-8 bg-slate-800 rounded-xl w-3/4" />
      <div className="space-y-2">
        <div className="h-4 bg-slate-800 rounded-md w-full" />
        <div className="h-4 bg-slate-800 rounded-md w-5/6" />
      </div>
      <div className="flex gap-2 pt-2">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-6 w-16 bg-slate-800/60 rounded-lg" />
        ))}
      </div>
      <div className="flex gap-8 pt-6 border-t border-slate-800/50">
        <div className="h-5 w-20 bg-slate-800 rounded-md" />
        <div className="h-5 w-20 bg-slate-800 rounded-md" />
      </div>
    </div>
  </div>
);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const ASSET_URL = API_BASE_URL.replace('/api/v1', '');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/projects`);
        setProjects(res.data);
      } catch (err) { 
        console.error("Fetch Error:", err); 
      } finally {
        // Thora sa extra delay taake animation smoothly khatam ho
        setTimeout(() => setLoading(false), 500);
      }
    };
    fetchProjects();
  }, [API_BASE_URL]);

  const formatLink = (url) => {
    if (!url) return "#";
    return url.startsWith('http') ? url : `https://${url}`;
  };

  return (
    <section id="projects" className="min-h-screen py-24 bg-[#020617] text-white px-6 md:px-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
          A collection of my recent work, focusing on high-performance applications and clean user interfaces.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {loading ? (
          // Jab loading ho raha ho toh 6 Skeletons dikhao
          [1, 2, 3, 4, 5, 6].map((item) => <ProjectSkeleton key={item} />)
        ) : (
          projects.length > 0 ? (
            projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -12 }}
                className="group relative bg-[#0f172a]/80 backdrop-blur-sm border border-slate-800 rounded-[2.5rem] overflow-hidden hover:border-blue-500/40 transition-all duration-500 shadow-2xl"
              >
                <div className="relative h-60 overflow-hidden">
                  <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={project.image?.startsWith('http') ? project.image : `${ASSET_URL}${project.image}`} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.target.src = "https://placehold.co/600x400"; }}
                  />
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.techStack && project.techStack.map((tech, i) => (
                      <span key={i} className="text-[10px] uppercase tracking-widest font-black px-3 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-8 pt-4 border-t border-slate-800/50">
                    <a 
                      href={formatLink(project.githubLink)} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-2 text-slate-400 hover:text-white transition-all duration-300 font-medium group/link"
                    >
                      <FiGithub size={20} className="group-hover/link:rotate-12 transition-transform" /> 
                      <span>Source</span>
                    </a>
                    <a 
                      href={formatLink(project.liveLink)} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-all duration-300 font-bold group/link"
                    >
                      <FiExternalLink size={20} className="group-hover/link:scale-110 transition-transform" /> 
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-slate-500 italic">No projects found. Add some from the admin dashboard.</p>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Projects;