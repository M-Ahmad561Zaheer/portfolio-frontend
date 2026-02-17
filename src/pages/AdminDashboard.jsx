import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiGrid, FiBookOpen, FiBriefcase, FiMail, FiPlus, 
  FiTrash2, FiEdit, FiActivity, FiLogOut, FiSearch, 
  FiCheckCircle, FiTrendingUp, FiLayers, FiSend, FiX, FiMenu 
} from 'react-icons/fi';

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

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("adminToken");

  // Fetch Data Function
  const fetchData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const config = { headers: { "admin-secret-key": String(token).trim() } };
      
      const [dataRes, msgRes] = await Promise.all([
        axios.get(`${API_URL}/${type}`, config),
        axios.get(`${API_URL}/messages`, config)
      ]);

      setItems(Array.isArray(dataRes.data) ? dataRes.data : dataRes.data.data || []);
      setMessages(Array.isArray(msgRes.data) ? msgRes.data : msgRes.data.messages || []);
    } catch (err) {
      if(err.response?.status === 401) alert("Session Expired or Unauthorized!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    setEditId(null);
    setFormData({});
  }, [type]);

  const handleEdit = (item) => {
    setEditId(item._id);
    // Convert techStack array to string for input field
    const formattedItem = { ...item };
    if (Array.isArray(formattedItem.techStack)) {
      formattedItem.techStack = formattedItem.techStack.join(', ');
    }
    setFormData(formattedItem);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let finalData = { ...formData };
    
    // Convert TechStack string back to Array
    if (finalData.techStack && typeof finalData.techStack === 'string') {
      finalData.techStack = finalData.techStack.split(',').map(item => item.trim());
    }

    // 1. Projects ke liye TechStack Array convert karein
    if (type === 'projects' && finalData.techStack && typeof finalData.techStack === 'string') {
        finalData.techStack = finalData.techStack.split(',').map(item => item.trim());
    }

    // 2. Reviews ke liye rating ko Number mein convert karein
    if (type === 'reviews' && finalData.rating) {
        finalData.rating = Number(finalData.rating);
    }

    const config = { withCredentials: true };

    try {
      const url = `${API_URL}/${type}${editId ? `/${editId}` : ''}`;
      if (editId) {
        await axios.put(url, finalData, config);
      } else {
        await axios.post(url, finalData, config);
      }
      alert("Success! Database Updated ✅");
      setEditId(null); 
      setFormData({}); 
      fetchData();
    } catch (err) { 
      alert(err.response?.data?.message || "Error saving data"); 
    }
  };

  const handleDelete = async (id, deleteType = type) => {
    if (window.confirm("Permanent Delete? This cannot be undone.")) {
      try {
        await axios.delete(`${API_URL}/${deleteType}/${id}`, {
          headers: { 'admin-secret-key': token }
        });
        fetchData();
      } catch (err) {
        console.error(err);
        alert("Delete failed");
      }
    }
  };

  const handleSendReply = async (id, email, subject) => {
    if (!replyText) return alert("Write something!");
    setSendingReply(true);
    try {
      await axios.post(`${API_URL}/messages/reply`, 
        { id, to: email, subject: `Re: ${subject}`, message: replyText }, 
        { headers: { 'admin-secret-key': token } }
      );
      alert("Email Dispatched! 📧");
      setReplyId(null);
      setReplyText("");
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to send reply.");
    } finally {
      setSendingReply(false);
    }
  };

  const menuItems = [
    { id: 'projects', label: 'Projects', icon: <FiGrid /> },
    { id: 'experience', label: 'Experience', icon: <FiBriefcase /> },
    { id: 'education', label: 'Education', icon: <FiBookOpen /> },
    { id: 'messages', label: 'Messages', icon: <FiMail /> },
    { id: 'reviews', label: 'Reviews', icon: <FiCheckCircle /> }
  ];

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-500/30">
      
      {/* MOBILE HEADER */}
      <div className="lg:hidden fixed top-0 w-full bg-[#0b1120] border-b border-white/5 p-4 z-50 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">A</div>
            <span className="font-black tracking-tighter text-sm">ADMIN PANEL</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-white/5 rounded-lg">
            {isSidebarOpen ? <FiX size={20}/> : <FiMenu size={20}/>}
        </button>
      </div>

      {/* SIDEBAR (Desktop & Mobile) */}
      <aside className={`fixed lg:sticky top-0 h-screen w-72 bg-[#0b1120] border-r border-white/5 p-8 flex flex-col z-[60] transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="hidden lg:flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-blue-600/20">A</div>
          <h2 className="text-xl font-black tracking-widest text-white">CORE DB</h2>
        </div>

        <nav className="space-y-2 flex-1 pt-16 lg:pt-0">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setType(item.id); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all ${type === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        <button onClick={() => { localStorage.removeItem("adminToken"); window.location.href="/"; }} className="flex items-center gap-3 p-4 text-slate-500 hover:text-red-400 font-bold text-xs uppercase tracking-widest transition-colors border-t border-white/5 pt-8">
          <FiLogOut /> Termination Session
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 lg:p-12 pt-24 lg:pt-12 max-w-7xl mx-auto w-full">
        
        {/* DASHBOARD STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Live Items', value: items.length, icon: <FiLayers />, color: 'text-blue-500', bg: 'bg-blue-500/10' },
            { label: 'Unread Mail', value: messages.filter(m => m.status !== 'Replied').length, icon: <FiMail />, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
            { label: 'Server', value: 'Active', icon: <FiActivity />, color: 'text-orange-500', bg: 'bg-orange-500/10' },
            { label: 'Uptime', value: '99.9%', icon: <FiTrendingUp />, color: 'text-purple-500', bg: 'bg-purple-500/10' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-[#0b1120] border border-white/5 p-6 rounded-3xl flex items-center gap-5">
              <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center text-2xl`}>{stat.icon}</div>
              <div>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
                <h3 className="text-2xl font-black">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* HEADER AREA */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl lg:text-5xl font-black mb-2 uppercase tracking-tighter">{type}</h1>
            <p className="text-slate-500 flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span> Syncing with Cloud
            </p>
          </div>
          <div className="relative group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" placeholder="Search entries..." className="bg-[#0b1120] border border-white/10 pl-12 pr-6 py-4 rounded-2xl w-full md:w-80 focus:ring-2 focus:ring-blue-600 outline-none transition-all" onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </header>

        <AnimatePresence mode="wait">
          {type !== 'messages' ? (
            <motion.div key={type} initial={{opacity:0}} animate={{opacity:1}} className="grid grid-cols-1 xl:grid-cols-12 gap-10">
              
   {/* INPUT FORM */}
{/* INPUT FORM */}
<div className="xl:col-span-5">
  <div className="bg-[#0b1120] border border-white/10 p-8 rounded-[2.5rem] shadow-2xl sticky top-12">
    <h3 className="text-xl font-black mb-8 flex items-center gap-3">
      <FiPlus className="text-blue-500" /> {editId ? "MODIFICATION" : `INITIALIZE ${type}`}
    </h3>

    <form onSubmit={handleSubmit} className="space-y-6">
      {type === 'reviews' ? (
        /* REVIEWS FORM */
        <div className="space-y-4">
          <input 
            required 
            className="w-full bg-[#050816] border border-white/5 p-4 rounded-2xl outline-none focus:border-blue-500" 
            placeholder="Client Name" 
            value={formData.clientName || ''} 
            onChange={(e) => setFormData({...formData, clientName: e.target.value})} 
          />
          <input 
            className="w-full bg-[#050816] border border-white/5 p-4 rounded-2xl outline-none" 
            placeholder="Client Role (e.g. CEO at TechHub)" 
            value={formData.clientRole || ''} 
            onChange={(e) => setFormData({...formData, clientRole: e.target.value})} 
          />
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Rating (1-5)</label>
            <input 
              type="number" min="1" max="5" 
              className="w-full bg-[#050816] border border-white/5 p-4 rounded-2xl outline-none" 
              value={formData.rating || 5} 
              onChange={(e) => setFormData({...formData, rating: e.target.value})} 
            />
          </div>
          <textarea 
            required 
            className="w-full bg-[#050816] border border-white/5 p-4 rounded-2xl min-h-[100px] outline-none" 
            placeholder="Client's Feedback..." 
            value={formData.reviewText || ''} 
            onChange={(e) => setFormData({...formData, reviewText: e.target.value})} 
          />
        </div>
      ) : (
        /* STANDARD FORM (Projects, Exp, Edu) */
        <>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
              {type === 'education' ? 'Academic Degree' : type === 'experience' ? 'Position/Role' : 'Project Identity'}
            </label>
            <input required className="w-full bg-[#050816] border border-white/5 p-4 rounded-2xl focus:border-blue-500 outline-none transition-all" 
              value={formData.title || formData.role || formData.degree || ''}
              onChange={(e) => {
                const key = type === 'education' ? 'degree' : type === 'experience' ? 'role' : 'title';
                setFormData({...formData, [key]: e.target.value});
              }}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
              {type === 'education' ? 'Institution' : type === 'experience' ? 'Organization' : 'Tech Stack (Array)'}
            </label>
            <input required className="w-full bg-[#050816] border border-white/5 p-4 rounded-2xl focus:border-blue-500 outline-none" 
              value={formData.institute || formData.company || formData.techStack || ''}
              placeholder={type === 'projects' ? "React, Node.js, MongoDB" : ""}
              onChange={(e) => {
                const key = type === 'education' ? 'institute' : type === 'experience' ? 'company' : 'techStack';
                setFormData({...formData, [key]: e.target.value});
              }}
            />
          </div>

          {type === 'projects' ? (
            <div className="grid grid-cols-1 gap-4">
              <input className="w-full bg-[#050816] border border-white/5 p-4 rounded-2xl text-sm outline-none" placeholder="GitHub URL" value={formData.githubLink || ''} onChange={(e) => setFormData({...formData, githubLink: e.target.value})} />
              <input className="w-full bg-[#050816] border border-white/5 p-4 rounded-2xl text-sm outline-none" placeholder="Live URL" value={formData.liveLink || ''} onChange={(e) => setFormData({...formData, liveLink: e.target.value})} />
              <input className="w-full bg-[#050816] border border-white/5 p-4 rounded-2xl text-sm outline-none" placeholder="Image URL" value={formData.image || ''} onChange={(e) => setFormData({...formData, image: e.target.value})} />
            </div>
          ) : (
            <input className="w-full bg-[#050816] border border-white/5 p-4 rounded-2xl text-sm outline-none" placeholder="Time Interval" value={formData.duration || ''} onChange={(e) => setFormData({...formData, duration: e.target.value})} />
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Contextual Info</label>
            <textarea className="w-full bg-[#050816] border border-white/5 p-4 rounded-2xl min-h-[120px] outline-none" value={formData.description || ''} onChange={(e) => setFormData({...formData, description: e.target.value})} />
          </div>
        </>
      )}

      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-blue-600/20 transition-all active:scale-95">
        {editId ? "Confirm Overwrite" : "Commit to Database"}
      </button>
      {editId && <button onClick={() => {setEditId(null); setFormData({});}} type="button" className="w-full bg-white/5 text-slate-400 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest">Abort Edit</button>}
    </form>
  </div>
</div>

              {/* LIST DISPLAY */}
   {/* LIST DISPLAY */}
<div className="xl:col-span-7 space-y-6">
  <h3 className="text-xl font-black mb-8 flex items-center gap-3">
    <FiLayers className="text-blue-500" /> DATABASE ENTRIES
  </h3>
  
  <div className="grid grid-cols-1 gap-4">
    {items
      .filter(i => (i.title || i.role || i.degree || i.clientName)?.toLowerCase().includes(searchTerm.toLowerCase()))
      .map((item) => (
        <div key={item._id} className="bg-[#0b1120] border border-white/5 p-6 rounded-[2rem] flex items-center justify-between group hover:border-blue-500/30 transition-all shadow-xl">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
              <FiCheckCircle size={22}/>
            </div>
            <div>
              <h4 className="font-black text-lg leading-tight mb-1">
                {item.title || item.role || item.degree || item.clientName}
              </h4>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                {item.company || item.institute || item.clientRole || 'Public Project'}
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => handleEdit(item)} 
              className="p-3 bg-white/5 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
              title="Edit Entry"
            >
              <FiEdit />
            </button>
            <button 
              onClick={() => handleDelete(item._id)} 
              className="p-3 bg-white/5 rounded-xl hover:bg-red-600 hover:text-white transition-all"
              title="Delete Entry"
            >
              <FiTrash2 />
            </button>
          </div>
        </div>
    ))}

    {items.length === 0 && (
      <div className="text-center py-20 bg-[#0b1120] rounded-[3rem] border border-dashed border-white/10">
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No Records Found in {type}</p>
      </div>
    )}
  </div>
</div>
            </motion.div>
          ) : (
            /* MESSAGES ENGINE */
            <motion.div key="messages" initial={{opacity:0}} animate={{opacity:1}} className="space-y-6">
              {messages.map((m) => (
                <div key={m._id} className={`bg-[#0b1120] p-8 rounded-[3rem] border transition-all ${m.status === 'Replied' ? 'border-emerald-500/20' : 'border-white/5 shadow-2xl'}`}>
                  <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-black text-xl text-white shadow-lg">
                        {m.name?.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xl font-black leading-none mb-1">{m.name}</h4>
                        <p className="text-blue-500 text-xs font-bold uppercase tracking-widest">{m.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${m.status === 'Replied' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'}`}>
                            {m.status || 'Pending'}
                        </span>
                        <button onClick={() => handleDelete(m._id, 'messages')} className="p-2 text-slate-600 hover:text-red-500"><FiTrash2 size={20}/></button>
                    </div>
                  </div>
                  
                  <div className="bg-[#050816] p-6 rounded-3xl border border-white/5 mb-6">
                    <h5 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Transmission Content</h5>
                    <p className="text-slate-300 leading-relaxed font-medium italic">"{m.message}"</p>
                  </div>

                  {m.replyText && (
                    <div className="mb-6 p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl">
                        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Outbound Response</p>
                        <p className="text-slate-400 text-sm italic">"{m.replyText}"</p>
                    </div>
                  )}

                  <button 
                    onClick={() => { setReplyId(replyId === m._id ? null : m._id); setReplyText(""); }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${replyId === m._id ? 'bg-red-500/10 text-red-500' : 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'}`}
                  >
                    {replyId === m._id ? <><FiX/> Close Terminal</> : <><FiSend/> Respond via Email</>}
                  </button>

                  <AnimatePresence>
                    {replyId === m._id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mt-6">
                        <textarea 
                          className="w-full bg-[#050816] border-2 border-blue-500/20 p-6 rounded-[2rem] outline-none text-white text-sm focus:border-blue-500 transition-all"
                          placeholder="Type your official response..."
                          rows="5"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                        />
                        <button 
                          disabled={sendingReply}
                          onClick={() => handleSendReply(m._id, m.email, m.subject)}
                          className="mt-4 w-full bg-emerald-600 hover:bg-emerald-500 py-5 rounded-2xl font-black uppercase tracking-widest text-sm disabled:opacity-50 shadow-xl shadow-emerald-900/20"
                        >
                          {sendingReply ? "TRANSFUSING DATA..." : "AUTHORIZE & SEND EMAIL"}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;