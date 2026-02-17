import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion'; 
import { FiGithub, FiExternalLink, FiLayers } from 'react-icons/fi';

const ProjectSkeleton = () => (
  <div className="bg-[#0f172a]/50 border border-slate-800 rounded-[2.5rem] overflow-hidden animate-pulse">
    <div className="h-64 bg-slate-800/40" />
    <div className="p-8 space-y-5">
      <div className="h-8 bg-slate-800 rounded-xl w-3/4" />
      <div className="h-20 bg-slate-800/20 rounded-xl w-full" />
      <div className="flex gap-2">
        {[1, 2, 3].map(i => <div key={i} className="h-6 w-16 bg-slate-800/60 rounded-lg" />)}
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
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchProjects();
  }, [API_BASE_URL]);

  const formatLink = (url) => {
    if (!url) return "#";
    return url.startsWith('http') ? url : `https://${url}`;
  };

  return (
    <section id="projects" className="py-24 bg-[#020617] text-white px-6 relative overflow-hidden">
      {/* Background Decorative Blur - Updated to Purple */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-purple-600/10 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-widest">
            <FiLayers /> My Creative Works
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-b from-white to-purple-500 bg-clip-text text-transparent tracking-tighter">
            Featured Projects
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            Bridging the gap between robust backend systems and mesmerizing frontend interfaces.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {loading ? (
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
                  whileHover={{ y: -10 }}
                  className="group bg-[#0f172a]/40 backdrop-blur-md border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-purple-500/40 transition-all duration-500 shadow-2xl flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80 z-10" />
                    <img 
                      src={project.image?.startsWith('http') ? project.image : `${ASSET_URL}${project.image}`} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => { e.target.src = "https://placehold.co/600x400/1e293b/a855f7?text=Project+Preview"; }}
                    />
                    <div className="absolute top-5 right-5 z-20">
                       <span className="px-4 py-1.5 bg-purple-600 text-white rounded-xl text-[10px] font-black uppercase tracking-tighter shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                         {project.techStack?.[0] || 'Web App'}
                       </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-black mb-3 group-hover:text-purple-400 transition-colors tracking-tight text-white">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 min-h-[4.5rem] font-medium">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                      {project.techStack && project.techStack.map((tech, i) => (
                        <span key={i} className="text-[10px] uppercase tracking-widest font-black px-3 py-1.5 bg-purple-500/5 text-purple-300 border border-purple-500/10 rounded-lg group-hover:bg-purple-500/10 transition-all">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <a 
                        href={formatLink(project.githubLink)} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-all font-bold text-xs uppercase tracking-widest"
                      >
                        <FiGithub className="text-lg" /> Code
                      </a>
                      <a 
                        href={formatLink(project.liveLink)} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center gap-2 text-purple-400 hover:text-white transition-all font-black text-xs uppercase tracking-widest bg-purple-500/10 hover:bg-purple-600 px-5 py-2.5 rounded-xl border border-purple-500/20 shadow-lg shadow-purple-900/20"
                      >
                        Launch <FiExternalLink />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-32 bg-slate-900/20 rounded-[3rem] border-2 border-dashed border-white/5">
                <FiLayers className="text-5xl text-slate-700 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">No projects found. Launch your first one from the dashboard!</p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;