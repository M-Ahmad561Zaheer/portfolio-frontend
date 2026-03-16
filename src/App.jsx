import React, { Suspense, lazy } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Layout Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Testimonials from './components/Testimonials';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy Load Pages for Performance
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

const Home = () => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    className="bg-[#020617] min-h-screen text-white font-sans scroll-smooth selection:bg-purple-500/30"
  >
    <Navbar />
    <Hero />
    <About />
    <main className="max-w-6xl mx-auto px-6 pb-20 space-y-32">
      <section id="experience"><Experience /></section>
      <section id="projects"><Projects /></section>
      <section id="education"><Education /></section>
      <section id="testimonials"><Testimonials /></section>
      <section id="contact"><Contact /></section>
    </main>

    {/* --- SIGNATURE FOOTER --- */}
    <footer className="relative bg-[#050816] pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* Laser Top Border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <div className="flex items-center gap-4 mb-10 group cursor-default">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center font-black text-white shadow-xl shadow-purple-500/10 group-hover:rotate-[360deg] transition-all duration-700">
            AZ
          </div>
          <div className="flex flex-col">
            <h3 className="text-2xl font-black tracking-tighter text-white leading-none">
              AZ <span className="text-purple-500">DEVELOPERS</span>
            </h3>
            <span className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.4em]">Engineered Excellence</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {['GitHub', 'LinkedIn', 'Twitter', 'Fiverr'].map((p) => (
            <a key={p} href="#" className="text-slate-500 hover:text-purple-400 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300">
              {p}
            </a>
          ))}
        </div>

        <div className="w-24 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-12" />

        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-600">
          <div className="flex items-center gap-3 bg-slate-900/50 px-4 py-2 rounded-full border border-white/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-bold text-slate-400">Nodes: Operational</span>
          </div>

          <p className="order-last md:order-none opacity-60">
            © 2026 // <span className="text-slate-400 font-black">Ahmad Zaheer</span> // Built with MERN Stack
          </p>

          <div className="flex items-center gap-6">
            <span className="hidden sm:inline">Region: PK // LHE</span>
            {/* The "Invisible" Admin Portal link */}
            <Link to="/login" className="opacity-5 hover:opacity-100 transition-opacity cursor-crosshair text-purple-500 font-bold">
              [ ACCESS_CORE ]
            </Link>
          </div>
        </div>
      </div>
    </footer>
  </motion.div>
);

function App() {
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={
        <div className="h-screen bg-[#020617] flex flex-col items-center justify-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 border-2 border-purple-500/10 border-t-purple-500 rounded-full animate-spin" />
            <div className="absolute inset-0 w-16 h-16 border-2 border-indigo-500/5 border-b-indigo-500 rounded-full animate-spin [animation-duration:1.5s]" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-purple-500 font-mono text-[10px] font-black tracking-[0.5em] animate-pulse uppercase">
              Initializing Protocol
            </p>
            <div className="h-1 w-32 bg-slate-900 rounded-full overflow-hidden">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="h-full w-1/2 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
              />
            </div>
          </div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          <Route 
            path="/ahmad-secret-portal-786" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          <Route path="*" element={
            <div className="h-screen bg-[#020617] flex flex-col items-center justify-center text-center px-6">
              <h1 className="text-8xl font-black text-white/5 absolute select-none">404</h1>
              <p className="text-slate-500 font-mono text-sm tracking-widest uppercase relative z-10 mb-8">
                Data Stream Interrupted // Path Not Found
              </p>
              <Link to="/" className="px-8 py-3 bg-purple-600/10 border border-purple-500/20 rounded-xl text-purple-400 text-xs font-black tracking-widest hover:bg-purple-600 hover:text-white transition-all relative z-10">
                RETURN TO GRID
              </Link>
            </div>
          } />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default App;