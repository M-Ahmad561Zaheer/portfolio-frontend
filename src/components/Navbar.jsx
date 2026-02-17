import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Reviews', href: '#testimonials' }, // ✅ Reviews Link Added
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${
      scrolled 
      ? 'bg-[#020617]/70 backdrop-blur-xl py-3 shadow-[0_10px_30px_-10px_rgba(168,85,247,0.2)] border-b border-white/5' 
      : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo - Updated to Purple */}
        <motion.a 
          href="#" 
          className="text-xl md:text-2xl font-black text-white tracking-tighter flex items-center gap-1 group"
          whileHover={{ scale: 1.02 }}
        >
          <span className="bg-purple-600 text-white px-2 py-0.5 rounded-lg group-hover:bg-purple-500 transition-colors shadow-[0_0_15px_rgba(168,85,247,0.4)]">A</span>
          <span className="hidden sm:inline">hmad Zaheer</span>
          <span className="text-purple-500">.</span>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="px-5 py-2 text-[13px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300"
            >
              {link.name}
            </a>
          ))}
          {/* Hire Me Button - Updated to Purple Theme */}
          <a 
            href="#contact" 
            className="ml-4 px-6 py-2.5 bg-purple-600/10 border border-purple-500/20 text-purple-400 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-purple-600 hover:text-white transition-all duration-500 shadow-lg shadow-purple-900/20"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-slate-300 hover:text-white transition-colors" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-[#020617]/95 backdrop-blur-2xl border-b border-white/5 md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-2">
              {navLinks.map((link, index) => (
                <motion.a 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="block py-4 px-4 text-lg font-bold text-slate-300 hover:text-purple-400 hover:bg-purple-500/5 rounded-2xl transition-all"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;