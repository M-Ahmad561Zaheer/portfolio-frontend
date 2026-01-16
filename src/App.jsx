import React, { Suspense, lazy } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Login from './components/Login'; // Isse import karna zaroori hai
import ProtectedRoute from './components/ProtectedRoute';

const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

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

    <footer className="py-12 text-center border-t border-slate-900 text-slate-500 bg-[#020617]">
      <p>© 2026 AZ Developers</p>
      {/* Footer ka secret link aapke secret path par le jaye ga */}
      <Link to="/login" className="opacity-0 cursor-default">.</Link>
    </footer>
  </div>
);

function App() {
  return (
    <Suspense fallback={<div className="h-screen bg-[#020617] flex items-center justify-center text-blue-500">Loading...</div>}>
      <Routes>
        {/* Main Website */}
        <Route path="/" element={<Home />} />
        
        {/* Login Page - Ise standard /login rakhein taake aap asani se khol sakein */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Dashboard - Iska path secret .env wala hona chahiye */}
        {/* Protected Dashboard */}
<Route 
  path="/ahmad-secret-portal-786"  // Variable ki jagah direct likh dein
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  } 
/>
      </Routes>
    </Suspense>
  );
}

export default App;