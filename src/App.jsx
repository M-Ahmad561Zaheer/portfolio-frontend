import React, { Suspense, lazy } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy Load Pages for Performance
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// Home Component to keep App.js clean
const Home = () => (
  <div className="bg-[#020617] min-h-screen text-white font-sans scroll-smooth">
    <Navbar />
    <Hero />
    <About />
    <main className="max-w-6xl mx-auto px-6 pb-20 space-y-32">
      <section id="experience"><Experience /></section>
      <section id="projects"><Projects /></section>
      <section id="education"><Education /></section>
      <section id="contact"><Contact /></section>
    </main>

    <footer className="relative bg-[#050816] pt-20 pb-10 overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-8 group cursor-default">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500">
            AZ
          </div>
          <h3 className="text-xl font-bold tracking-tighter text-white">
            AZ <span className="text-blue-500">DEVELOPERS</span>
          </h3>
        </div>

        <div className="flex gap-6 mb-10">
          {['GitHub', 'LinkedIn', 'Twitter', 'Instagram'].map((p) => (
            <a key={p} href="#" className="text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors duration-300">{p}</a>
          ))}
        </div>

        <div className="w-16 h-px bg-slate-800 mb-10" />

        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] font-mono uppercase tracking-[0.2em] text-slate-600">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            SYSTEMS OPERATIONAL
          </div>

          <p className="order-last md:order-none italic">
            © 2026 <span className="text-slate-400 not-italic font-bold">Ahmad Zaheer</span>
          </p>

          <div className="flex items-center gap-4">
            <span>Region: PK // LHE</span>
            <Link to="/login" className="opacity-5 hover:opacity-100 transition-opacity cursor-default text-slate-400 font-bold">
              [ . ]
            </Link>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

function App() {
  return (
    <Suspense fallback={
      <div className="h-screen bg-[#020617] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-blue-500 font-mono text-xs tracking-widest animate-pulse">INITIALIZING SYSTEM...</p>
      </div>
    }>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Admin Route */}
        <Route 
          path="/ahmad-secret-portal-786" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* 404 Redirect to Home */}
        <Route path="*" element={<Link to="/" className="h-screen bg-[#020617] flex items-center justify-center text-slate-500">Page not found. Return to Home</Link>} />
      </Routes>
    </Suspense>
  );
}

export default App;