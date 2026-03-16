import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiDownload, FiArrowRight, FiGithub, FiLinkedin } from 'react-icons/fi';

const Hero = () => {
  // --- WOW FACTOR: Interactive Spotlight Effect ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <section 
      id="home" 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center bg-[#020617] overflow-hidden px-6 group/section"
    >
      
      {/* --- WOW FACTOR: Dynamic Background Spotlight --- */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover/section:opacity-100"
        style={{
          background: useMotionValue(
            `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(37, 99, 235, 0.15), transparent 80%)`
          ),
        }}
      />
      
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center z-10">
        
       
        {/* Main Heading with Staggered Entrance */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[1.1]"
        >
          Building Digital <br />
          <motion.span 
            initial={{ backgroundPosition: "200% center" }}
            animate={{ backgroundPosition: "0% center" }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-[length:200%_auto] bg-clip-text text-transparent"
          >
            Masterpieces.
          </motion.span>
        </motion.h1>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-slate-400 text-base md:text-xl max-w-3xl leading-relaxed mb-12 mx-auto"
        >
          I am a <span className="text-blue-400 font-bold">Full-Stack Developer</span> dedicated to 
          transforming complex challenges into seamless <span className="text-white font-semibold">digital experiences</span>. 
          Specializing in the <span className="text-indigo-400">MERN Stack</span>, I bridge the gap between 
          bold ideas and high-performance software.
        </motion.p>

 {/* Call to Action Buttons */}
<div className="flex flex-col sm:flex-row justify-center gap-6 mb-20 w-full sm:w-auto">
  {/* Primary Action: Launch Projects */}
  <motion.a 
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    href="#projects" 
    className="group bg-purple-600 text-black px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-purple-500/20"
  >
    Launch Projects 
    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
  </motion.a>
  
  {/* Secondary Action: Download CV */}
  <motion.a 
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    href="/Ahmad_CV.pdf"
    target="_blank"
    download
    className="group bg-transparent hover:bg-white/5 text-white border border-white/10 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3"
  >
    Download Protocol 
    <FiDownload className="text-purple-500 group-hover:animate-bounce" />
  </motion.a>
</div>
        {/* Social Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex gap-10 text-slate-500"
        >
          {[
            { Icon: FiGithub, link: "https://github.com/M-Ahmad561Zaheer" },
            { Icon: FiLinkedin, link: "https://linkedin.com/in/ahmad561" }
          ].map((item, idx) => (
            <motion.a 
              key={idx}
              whileHover={{ y: -5, color: "#fff" }}
              href={item.link}  
              target="_blank" 
              rel="noreferrer" 
              className="transition-colors duration-300"
            >
              <item.Icon size={24} />
            </motion.a>
          ))}
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