import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiReact, SiMongodb, SiNodedotjs, SiExpress, 
  SiTailwindcss, SiJavascript, SiMysql, SiCplusplus, 
  SiSharp, // C# ke liye SiSharp ya SiCsharp check karein
  SiOpenjdk 
} from 'react-icons/si';

const About = () => {
  const skills = [
    { name: 'React.js', icon: <SiReact />, color: 'group-hover:text-cyan-400' },
    { name: 'Node.js', icon: <SiNodedotjs />, color: 'group-hover:text-green-500' },
    { name: 'Java', icon: <SiOpenjdk />, color: 'group-hover:text-red-500' },
    { name: 'C++', icon: <SiCplusplus />, color: 'group-hover:text-blue-600' },
    { name: 'C#', icon: <SiSharp />, color: 'group-hover:text-purple-500' },
    { name: 'MySQL', icon: <SiMysql />, color: 'group-hover:text-blue-400' },
    { name: 'MongoDB', icon: <SiMongodb />, color: 'group-hover:text-emerald-500' },
    { name: 'JavaScript', icon: <SiJavascript />, color: 'group-hover:text-yellow-400' },
  ];

  return (
    <section id="about" className="py-24 bg-[#020617] text-white px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Tech Explorer & <br /> Problem Solver.
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              I am a Full-Stack Developer with a solid foundation in Computer Science. 
              Beyond the MERN stack, I have experience with systems programming in C++ and enterprise logic in Java/C#. 
              My expertise in both SQL (MySQL) and NoSQL (MongoDB) allows me to build versatile, data-driven applications.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group p-6 bg-[#0f172a] border border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-blue-500/50 transition-all duration-300 shadow-xl"
              >
                <div className={`text-4xl text-slate-500 transition-colors duration-500 ${skill.color}`}>
                  {skill.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-white">
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