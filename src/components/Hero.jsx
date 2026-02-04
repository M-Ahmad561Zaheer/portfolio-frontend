import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiArrowRight, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-[#020617] overflow-hidden px-6">
      
      {/* --- BACKGROUND ANIMATIONS (Decorative) --- */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
      
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center z-10">
        
        {/* Small Intro Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 text-blue-400 text-xs font-mono tracking-widest uppercase mb-8 backdrop-blur-md"
        >
          🚀 Available for New Projects
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-black text-white text-4xl tracking-tighter mb-8"
        >
          Building Digital <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Masterpieces.
          </span>
        </motion.h1>

        {/* English Intro Description */}
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-slate-400 text-lg md:text-xl max-w-3xl leading-relaxed mb-10 mx-auto"
            >
            I am a <span className="text-blue-400 font-semibold">Full-Stack Developer</span> dedicated to 
            transforming complex challenges into seamless <span className="text-white font-medium">digital experiences</span>. 
            Specializing in the <span className="text-indigo-400">MERN Stack</span>, I bridge the gap between 
            bold ideas and high-performance, functional software.
        </motion.p>

        {/* Call to Action Buttons (CTA) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-5 mb-12"
        >
          {/* Action: Link to Projects */}
          <a 
            href="#projects" 
            className="group bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-2 shadow-xl shadow-blue-900/20 active:scale-95"
          >
            Explore My Work 
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
          
          {/* Action: Open CV in new tab */}
          <a 
            href="/frontend/public/Muhammad Ahmad Zaheer_CV.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-2 shadow-lg cursor-pointer active:scale-95"
          >
            Download CV <FiDownload />
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex gap-8 text-slate-500"
        >
          <a href="https://github.com/M-Ahmad561Zaheer" target="_blank" className="hover:text-blue-400 transition-colors"><FiGithub size={24} /></a>
          <a href="https://linkedin.com/in/ahmad561" target="_blank" className="hover:text-blue-400 transition-colors"><FiLinkedin size={24} /></a>
                  
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-600 hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-blue-500 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;