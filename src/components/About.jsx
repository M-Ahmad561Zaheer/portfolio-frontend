import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiReact, SiMongodb, SiNodedotjs, 
  SiTailwindcss, SiJavascript, SiMysql, SiCplusplus, 
  SiOpenjdk 
} from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb'; // C# ke liye ye 100% chalega

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
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest">
              My Expertise
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[1.1] bg-gradient-to-br from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
              Tech Explorer & <br /> 
              <span className="text-blue-500">Problem Solver.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed max-w-xl">
              I am a Full-Stack Developer with a solid foundation in Computer Science. 
              Beyond the MERN stack, I build systems with <span className="text-slate-200 font-semibold">C++</span> and enterprise logic in <span className="text-slate-200 font-semibold">Java/C#</span>. 
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`group relative p-6 bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-3xl flex flex-col items-center justify-center gap-4 hover:border-blue-500/40 transition-all duration-300 shadow-2xl ${skill.glow}`}
              >
                <div className={`text-5xl text-slate-600 transition-all duration-500 transform group-hover:scale-110 z-10 ${skill.color}`}>
                  {skill.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-white z-10 transition-colors">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;