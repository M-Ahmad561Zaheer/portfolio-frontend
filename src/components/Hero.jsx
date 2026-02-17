import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiArrowRight, FiGithub, FiLinkedin } from 'react-icons/fi';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-[#020617] overflow-hidden px-6">
      
      {/* --- BACKGROUND DECORATIVE ELEMENTS --- */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/10 blur-[120px] rounded-full animate-pulse -z-10" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-600/5 blur-[120px] rounded-full animate-pulse -z-10" />
      
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center z-10">
        
        {/* Intro Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="px-4 py-2 rounded-full bg-blue-500/5 border border-blue-500/20 text-blue-400 text-[10px] md:text-xs font-black tracking-[0.2em] uppercase mb-8 backdrop-blur-md"
        >
          🚀 Available for New Projects
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[1.1]"
        >
          Building Digital <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Masterpieces.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-slate-400 text-base md:text-xl max-w-3xl leading-relaxed mb-12 mx-auto"
        >
          I am a <span className="text-blue-400 font-bold">Full-Stack Developer</span> dedicated to 
          transforming complex challenges into seamless <span className="text-white font-semibold">digital experiences</span>. 
          Specializing in the <span className="text-indigo-400">MERN Stack</span>, I bridge the gap between 
          bold ideas and high-performance software.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-5 mb-16 w-full sm:w-auto"
        >
          <a 
            href="#projects" 
            className="group bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 shadow-2xl shadow-blue-900/40 active:scale-95"
          >
            Explore My Work 
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a 
            href="/Muhammad Ahmad Zaheer_CV.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            download
            className="bg-slate-900 hover:bg-slate-800 text-white border border-white/10 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer active:scale-95"
          >
            Download CV <FiDownload className="group-hover:translate-y-0.5 transition-transform" />
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex gap-10 text-slate-500"
        >
          <a href="https://github.com/M-Ahmad561Zaheer" target="_blank" rel="noreferrer" className="hover:text-white hover:scale-125 transition-all duration-300">
            <FiGithub size={24} />
          </a>
          <a href="https://linkedin.com/in/ahmad561" target="_blank" rel="noreferrer" className="hover:text-blue-400 hover:scale-125 transition-all duration-300">
            <FiLinkedin size={24} />
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-700 hidden lg:block"
      >
        <div className="w-[30px] h-[50px] border-2 border-slate-800 rounded-full flex justify-center p-2">
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-blue-500 rounded-full" 
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;