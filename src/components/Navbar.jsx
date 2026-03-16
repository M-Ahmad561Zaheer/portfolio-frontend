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
    { name: 'Reviews', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${
      scrolled 
      ? 'bg-[#020617]/70 backdrop-blur-xl py-3 shadow-[0_10px_30px_-10px_rgba(168,85,247,0.2)] border-b border-white/5' 
      : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo with Magnetic Hover */}
        <motion.a 
          href="#" 
          className="text-xl md:text-2xl font-black text-white tracking-tighter flex items-center gap-1 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="bg-purple-600 text-white px-2 py-0.5 rounded-lg group-hover:bg-purple-500 transition-colors shadow-[0_0_15px_rgba(168,85,247,0.4)]">A</span>
          <span className="hidden sm:inline">hmad Zaheer</span>
          <span className="text-purple-500">.</span>
        </motion.a>

        {/* Desktop Menu - Enhanced with Hover Effects */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <motion.a 
              key={link.name} 
              href={link.href}
              whileHover={{ y: -2 }}
              className="relative px-5 py-2 text-[13px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all duration-300 group"
            >
              {link.name}
              {/* --- WOW FACTOR: Hover Underline Animation --- */}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.a>
          ))}
          
          <motion.a 
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168,85,247,0.4)" }}
            whileTap={{ scale: 0.95 }}
            href="#contact" 
            className="ml-4 px-6 py-2.5 bg-purple-600/10 border border-purple-500/20 text-purple-400 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-purple-600 hover:text-white transition-all duration-500"
          >
            Hire Me
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <motion.button 
          whileTap={{ scale: 0.9 }}
          className="md:hidden p-2 text-slate-300 hover:text-white transition-colors" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </motion.button>
      </div>

      {/* Mobile Menu Overlay with Staggered Slide */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-[80%] h-screen bg-[#020617]/95 backdrop-blur-2xl border-l border-white/5 md:hidden z-50"
          >
            <div className="flex flex-col p-10 pt-24 space-y-4">
              {navLinks.map((link, index) => (
                <motion.a 
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-black uppercase tracking-widest text-slate-300 hover:text-purple-400 transition-colors"
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