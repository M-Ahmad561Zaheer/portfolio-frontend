import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiReact, SiMongodb, SiNodedotjs, 
  SiJavascript, SiMysql, SiCplusplus, 
  SiOpenjdk 
} from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';

const About = () => {
  const skills = [
    { name: 'React.js', icon: <SiReact />, color: 'group-hover:text-cyan-400', glow: 'group-hover:shadow-cyan-500/20' },
    { name: 'Node.js', icon: <SiNodedotjs />, color: 'group-hover:text-green-500', glow: 'group-hover:shadow-green-500/20' },
    { name: 'Java', icon: <SiOpenjdk />, color: 'group-hover:text-red-500', glow: 'group-hover:shadow-red-500/20' },
    { name: 'C++', icon: <SiCplusplus />, color: 'group-hover:text-blue-600', glow: 'group-hover:shadow-blue-600/20' },
    { name: 'C#', icon: <TbBrandCSharp />, color: 'group-hover:text-purple-500', glow: 'group-hover:shadow-purple-500/20' },
    { name: 'MySQL', icon: <SiMysql />, color: 'group-hover:text-blue-400', glow: 'group-hover:shadow-blue-400/20' },
    { name: 'MongoDB', icon: <SiMongodb />, color: 'group-hover:text-emerald-500', glow: 'group-hover:shadow-emerald-500/20' },
    { name: 'JavaScript', icon: <SiJavascript />, color: 'group-hover:text-yellow-400', glow: 'group-hover:shadow-yellow-400/20' },
  ];

  return (
    <section id="about" className="py-32 bg-[#020617] text-white px-6 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[150px] rounded-full -translate-y-1/2 -z-0" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-[10px] font-black uppercase tracking-[0.3em]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              Identity Protocol
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] bg-gradient-to-br from-white via-slate-200 to-slate-500 bg-clip-text text-transparent tracking-tighter">
              Tech Explorer & <br /> 
              <span className="text-purple-500">Problem Solver.</span>
            </h2>
            
            <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-xl font-medium">
              I am a Full-Stack Developer with a deep-rooted passion for architecting scalable systems. 
              Currently in my <span className="text-white font-bold italic">7th Semester at UCP</span>, 
              I specialize in the MERN stack while bridging the gap between high-level web logic and 
              low-level performance with <span className="text-purple-400">C++</span> and <span className="text-purple-400">Java</span>.
            </p>

            {/* Micro-Stats Bar */}
            <div className="flex gap-8 border-t border-white/5 pt-10">
              <div>
                <h4 className="text-3xl font-black text-white">20+</h4>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Projects</p>
              </div>
              <div className="w-px h-10 bg-slate-800" />
              <div>
                <h4 className="text-3xl font-black text-white">03+</h4>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Years Coding</p>
              </div>
            </div>
          </motion.div>

          {/* Skill Grid with 3D Interaction */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ 
                  y: -8,
                  rotateX: 5,
                  rotateY: 5,
                }}
                className={`group relative p-8 bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2rem] flex flex-col items-center justify-center gap-4 hover:border-purple-500/40 transition-all duration-300 shadow-2xl ${skill.glow}`}
              >
                {/* Icon with Dynamic Color */}
                <div className={`text-5xl text-slate-700 transition-all duration-500 transform group-hover:scale-110 z-10 ${skill.color} drop-shadow-xl`}>
                  {skill.icon}
                </div>
                
                {/* Label */}
                <span className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-500 group-hover:text-white z-10 transition-colors">
                  {skill.name}
                </span>

                {/* Hover Ambient Light */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;