import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiRefreshCcw, FiActivity, FiTerminal } from 'react-icons/fi';

import api from '../api/api';
import Sidebar from './Sidebar';
import StatsBar from './StatsBar';
import ItemForm from './ItemForm';
import ItemList from './ItemList';
import MessagesPanel from './MessagesPanel';
import ProjectCharts from './ProjectCharts';

const AdminDashboard = () => {
  const [type, setType] = useState('projects');
  const [formData, setFormData] = useState({});
  const [items, setItems] = useState([]);
  const [messages, setMessages] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [replyId, setReplyId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  // 1. Fetch Data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [dataRes, msgRes] = await Promise.all([
        api.get(`/${type}`),
        api.get(`/messages`)
      ]);
      setItems(Array.isArray(dataRes.data) ? dataRes.data : dataRes.data.data || []);
      setMessages(Array.isArray(msgRes.data) ? msgRes.data : msgRes.data.messages || []);
    } catch (err) {
      console.error("Fetch Error:", err);
      if (err.response?.status === 401) {
        window.location.href = "/login";
      }
    } finally {
      // Small timeout to prevent flicker on fast connections
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    fetchData();
    setEditId(null);
    setFormData({});
  }, [type]);

  // 2. Handle Edit
  const handleEdit = (item) => {
    setEditId(item._id);
    const formattedItem = { ...item };
    if (Array.isArray(formattedItem.techStack)) {
      formattedItem.techStack = formattedItem.techStack.join(', ');
    }
    setFormData(formattedItem);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 3. Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let finalData = { ...formData };
    if (finalData.techStack && typeof finalData.techStack === 'string') {
      finalData.techStack = finalData.techStack.split(',').map(item => item.trim());
    }
    if (type === 'reviews' && finalData.rating) {
      finalData.rating = Number(finalData.rating);
    }

    try {
      if (editId) {
        await api.put(`/${type}/${editId}`, finalData);
      } else {
        await api.post(`/${type}`, finalData);
      }
      setEditId(null);
      setFormData({});
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Error saving data");
      setLoading(false);
    }
  };

  // 4. Delete
  const handleDelete = async (id, deleteType = type) => {
    if (window.confirm("Permanent Purge? This cannot be undone.")) {
      try {
        await api.delete(`/${deleteType}/${id}`);
        fetchData();
      } catch (err) { alert("Purge failed"); }
    }
  };

  // 5. Send Reply
  const handleSendReply = async (id, email, subject) => {
    if (!replyText) return;
    setSendingReply(true);
    try {
      await api.post(`/messages/reply`, {
        id, to: email, subject: `Re: ${subject}`, message: replyText
      });
      setReplyId(null);
      setReplyText("");
      fetchData();
    } catch (err) { alert("Failed to send reply."); }
    finally { setSendingReply(false); }
  };

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-100 selection:bg-cyan-500/30 font-sans overflow-x-hidden">
      
      {/* GLOBAL LOADING OVERLAY */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center"
          >
             <div className="relative">
                <div className="w-24 h-24 border-2 border-cyan-500/20 rounded-full animate-spin border-t-cyan-500" />
                <FiTerminal className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-500 animate-pulse" size={30} />
             </div>
             <p className="mt-8 text-[10px] font-black uppercase tracking-[0.5em] text-cyan-500/50 animate-pulse">
                Decrypting Matrix Data...
             </p>
          </motion.div>
        )}
      </AnimatePresence>

      <Sidebar
        type={type}
        setType={setType}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* MAIN CONTENT SPACE */}
      <main className="flex-1 p-6 lg:p-12 xl:p-20 pt-28 lg:pt-20 max-w-[1600px] mx-auto w-full">
        
        {/* TOP LEVEL TELEMETRY */}
        <StatsBar items={items} messages={messages} />

        {/* Add the Chart here */}
        <ProjectCharts items={items} />

        {/* SECTION HEADER */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div 
            initial={{ x: -20, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }}
            key={type + "header"}
          >
            <div className="flex items-center gap-3 mb-4">
               <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
                  <span className="text-[9px] font-black text-cyan-500 uppercase tracking-widest">Active Node</span>
               </div>
               <div className="flex items-center gap-1.5">
                  <FiActivity size={12} className="text-slate-600" />
                  <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">v3.4.0-Stable</span>
               </div>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black mb-4 uppercase tracking-tighter italic bg-gradient-to-r from-white via-white to-white/20 bg-clip-text text-transparent">
              {type}
            </h1>
            <p className="text-slate-500 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span> 
              Cloud Sync Active
            </p>
          </motion.div>

          {/* HOLOGRAPHIC SEARCH */}
          <div className="relative group w-full md:w-96">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-transparent rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
            <div className="relative flex items-center">
                <FiSearch className="absolute left-5 text-slate-500 group-focus-within:text-cyan-500 transition-colors" />
                <input
                  type="text"
                  placeholder={`Search ${type}...`}
                  className="bg-[#0b1120]/60 border border-white/5 pl-14 pr-6 py-5 rounded-2xl w-full focus:bg-[#0b1120] focus:border-cyan-500/50 outline-none transition-all text-sm font-medium placeholder:text-slate-600"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={fetchData} className="absolute right-4 p-2 text-slate-600 hover:text-white transition-colors">
                    <FiRefreshCcw size={16} className={loading ? "animate-spin" : ""} />
                </button>
            </div>
          </div>
        </header>

        {/* CORE INTERFACE STACK */}
        <AnimatePresence mode="wait">
          {type !== 'messages' ? (
            <motion.div 
              key={type + "grid"}
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 xl:grid-cols-12 gap-12"
            >
              <ItemForm
                type={type}
                formData={formData}
                setFormData={setFormData}
                editId={editId}
                setEditId={setEditId}
                handleSubmit={handleSubmit}
              />
              <ItemList
                type={type}
                items={items}
                searchTerm={searchTerm}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </motion.div>
          ) : (
            <motion.div
              key="messages-panel"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <MessagesPanel
                messages={messages}
                replyId={replyId}
                setReplyId={setReplyId}
                replyText={replyText}
                setReplyText={setReplyText}
                sendingReply={sendingReply}
                handleDelete={handleDelete}
                handleSendReply={handleSendReply}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* DECORATIVE AMBIENT GLOW */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/5 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
};

export default AdminDashboard;