import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiGrid, FiBookOpen, FiBriefcase, FiMail, FiPlus, 
  FiTrash2, FiEdit, FiActivity, FiLogOut, FiSearch, 
  FiCheckCircle, FiTrendingUp, FiLayers, FiSend 
} from 'react-icons/fi';

const AdminDashboard = () => {
  const [type, setType] = useState('projects');
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [items, setItems] = useState([]);
  const [messages, setMessages] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [replyId, setReplyId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

 const fetchData = async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem("adminToken");
    
    // Agar token nahi mila toh request na bhein
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    const config = {
      headers: {
        "admin-secret-key": String(token).trim() // Ensure no extra spaces
      }
    };

    // Console mein check karein ke URL aur Header sahi hain
    console.log("Fetching from:", `${API_URL}/${type}`);

    const [dataRes, msgRes] = await Promise.all([
      axios.get(`${API_URL}/${type}`, config),
      axios.get(`${API_URL}/messages`, config)
    ]);

    // Data format handle karein (backend agar direct array bhej raha hai)
    setItems(Array.isArray(dataRes.data) ? dataRes.data : dataRes.data.data || []);
    setMessages(Array.isArray(msgRes.data) ? msgRes.data : msgRes.data.messages || []);

  } catch (err) {
    console.error("Fetch Error Detail:", err.response?.status, err.response?.data);
    if(err.response?.status === 401) {
       alert("Authorization Failed! Token mismatch.");
    }
  }
  setLoading(false);
};
  const handleEdit = (item) => {
    setEditId(item._id);
    setFormData(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken"); // Token get karein

    // TechStack logic
    let finalData = { ...formData };
    if (finalData.techStack && typeof finalData.techStack === 'string') {
      finalData.techStack = finalData.techStack.split(',').map(item => item.trim());
    }

    // Prepare Data
    let dataToSend;
    let headers = { 
      'admin-secret-key': token // Har request mein token lazmi hai
    };

    if (type === 'projects') {
      dataToSend = new FormData();
      Object.keys(finalData).forEach(key => {
        if (key === 'techStack') {
          // Array ko stringify karke bhejien (backend pe split ho jayega)
          dataToSend.append(key, finalData[key]); 
        } else {
          dataToSend.append(key, finalData[key]);
        }
      });
      if (file) dataToSend.append('image', file);
      
      // FormData ke liye boundary auto-set hoti hai, bas token dein
    } else {
      dataToSend = finalData;
    }

    try {
      const url = `${API_URL}/${type}${editId ? `/${editId}` : ''}`;
      
      if (editId) {
        await axios.put(url, dataToSend, { headers });
      } else {
        await axios.post(url, dataToSend, { headers });
      }

      alert("Data Saved Successfully! ✅");
      setEditId(null); 
      setFormData({}); 
      setFile(null); 
      fetchData();
    } catch (err) { 
      console.error("Submit Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error saving data (401 Unauthorized?)"); 
    }
};

  useEffect(() => {
    fetchData();
  }, [type]);



  const handleDelete = async (id, deleteType = type) => {
  if (window.confirm("Are you sure?")) {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${API_URL}/${deleteType}/${id}`, {
        headers: { 'admin-secret-key': token }
      });
      fetchData();
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Delete failed");
    }
  }
};

  // --- UPDATED REPLY FUNCTION (Added ID and Refresh) ---
  const handleSendReply = async (id, email, subject) => {
    if (!replyText) return alert("Please write a message first!");
    
    const token = localStorage.getItem("adminToken"); // Token yahan se uthayein
    setSendingReply(true);

    try {
      await axios.post(`${API_URL}/messages/reply`, 
        {
          id: id,
          to: email,
          subject: `Re: ${subject}`,
          message: replyText
        }, 
        {
          headers: { 'admin-secret-key': String(token).trim() } // Security Header
        }
      );

      alert("Reply sent successfully! 📧");
      setReplyId(null);
      setReplyText("");
      fetchData(); // List refresh karein taake status update ho jaye
    } catch (err) {
      console.error("Reply Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to send reply. Auth issue?");
    } finally {
      setSendingReply(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#050816] text-slate-100 font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#0b1120]/80 backdrop-blur-xl border-r border-white/5 p-8 flex flex-col hidden lg:flex sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-blue-600/20">A</div>
          <h2 className="text-xl font-black tracking-widest bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">DASHBOARD</h2>
        </div>

        <nav className="space-y-3 flex-1">
          {[
            { id: 'projects', label: 'Projects', icon: <FiGrid /> },
            { id: 'experience', label: 'Experience', icon: <FiBriefcase /> },
            { id: 'education', label: 'Education', icon: <FiBookOpen /> },
            { id: 'messages', label: 'Messages', icon: <FiMail /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setType(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-semibold transition-all duration-300 ${type === item.id ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-600/20' : 'hover:bg-white/5 text-slate-400'}`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        <button onClick={() => { localStorage.removeItem("adminToken"); window.location.href="/"; }} className="mt-auto flex items-center gap-3 p-4 text-slate-500 hover:text-red-400 transition-colors">
          <FiLogOut /> Sign Out
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full">
        
        {/* STATS SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Live Content', value: items.length, icon: <FiLayers />, color: 'text-blue-500', bg: 'bg-blue-500/10' },
            { label: 'Total Mail', value: messages.length, icon: <FiMail />, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
            { label: 'Site Status', value: 'Online', icon: <FiActivity />, color: 'text-orange-500', bg: 'bg-orange-500/10' },
            { label: 'Performance', value: '98%', icon: <FiTrendingUp />, color: 'text-purple-500', bg: 'bg-purple-500/10' },
          ].map((stat, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: idx * 0.1 }}
              className="bg-[#0b1120] border border-white/5 p-6 rounded-[2rem] flex items-center gap-5 shadow-xl"
            >
              <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center text-2xl shadow-inner`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-2xl font-black">{stat.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black mb-2 capitalize">{type}</h1>
            <p className="text-slate-500 flex items-center gap-2 font-medium"> <FiActivity className="text-emerald-500"/> Real-time Database Link Active</p>
          </div>
          <div className="relative group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" placeholder="Filter list..." className="bg-[#0b1120] border border-white/5 pl-12 pr-6 py-3 rounded-2xl w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all" onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </header>

        <AnimatePresence mode="wait">
          {type !== 'messages' ? (
            <motion.div key={type} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="grid grid-cols-1 xl:grid-cols-12 gap-10">
              {/* FORM */}
              <div className="xl:col-span-5">
                <div className="bg-[#0b1120] border border-white/5 p-8 rounded-[2rem] shadow-2xl sticky top-12">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <FiPlus className="text-blue-500" /> {editId ? "Update Entry" : `New ${type}`}
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Title/Role/Degree Field */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                      {type === 'education' ? 'Degree' : type === 'experience' ? 'Role' : 'Project Title'}
                    </label>
                    <input 
                      required 
                      className="w-full bg-[#050816] border border-white/10 p-4 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" 
                      value={formData.title || formData.role || formData.degree || ''}
                      onChange={(e) => {
                        const key = type === 'education' ? 'degree' : type === 'experience' ? 'role' : 'title';
                        setFormData({...formData, [key]: e.target.value});
                      }}
                    />
                  </div>

  {/* Tech/Company/Institute Field */}
  <div className="space-y-1">
    <label className="text-xs font-bold text-slate-500 uppercase ml-1">
      {type === 'education' ? 'Institute' : type === 'experience' ? 'Company' : 'Tech Stack (Comma separated)'}
    </label>
    <input 
      required 
      className="w-full bg-[#050816] border border-white/10 p-4 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" 
      value={formData.institute || formData.company || formData.techStack || ''}
      onChange={(e) => {
        const key = type === 'education' ? 'institute' : type === 'experience' ? 'company' : 'techStack';
        setFormData({...formData, [key]: e.target.value});
      }}
    />
  </div>

  {/* Dynamic Row: Project Links OR Duration */}
  {type === 'projects' ? (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">GitHub Link</label>
          <input 
            className="w-full bg-[#050816] border border-white/10 p-4 rounded-xl text-sm outline-none" 
            placeholder="https://github.com/..."
            value={formData.githubLink || ''} 
            onChange={(e) => setFormData({...formData, githubLink: e.target.value})} 
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">Live Demo</label>
          <input 
            className="w-full bg-[#050816] border border-white/10 p-4 rounded-xl text-sm outline-none" 
            placeholder="https://project.vercel.app"
            value={formData.liveLink || ''} 
            onChange={(e) => setFormData({...formData, liveLink: e.target.value})} 
          />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Project Image</label>
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files[0])} 
          className="w-full text-[10px] text-slate-500 p-2 bg-white/5 rounded-lg border border-white/10" 
        />
      </div>
    </>
  ) : (
    <div className="space-y-1">
      <label className="text-xs font-bold text-slate-500 uppercase ml-1">Duration</label>
      <input 
        className="w-full bg-[#050816] border border-white/10 p-4 rounded-xl text-sm outline-none" 
        placeholder="e.g. 2021 - 2024"
        value={formData.duration || ''} 
        onChange={(e) => setFormData({...formData, duration: e.target.value})} 
      />
    </div>
  )}

  <div className="space-y-1">
    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Description</label>
    <textarea 
      className="w-full bg-[#050816] border border-white/10 p-4 rounded-xl min-h-[100px] outline-none" 
      value={formData.description || ''} 
      onChange={(e) => setFormData({...formData, description: e.target.value})} 
    />
  </div>

  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-black shadow-lg shadow-blue-600/20 transition-all">
    {editId ? "CONFIRM CHANGES" : "SAVE TO DATABASE"}
  </button>
</form>
                </div>
              </div>

              {/* LIST VIEW */}
              <div className="xl:col-span-7 space-y-4">
                {items.filter(i => (i.title || i.role || i.degree)?.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
                  <div key={item._id} className="bg-[#0b1120] p-6 rounded-2xl flex justify-between items-center border border-white/5 hover:border-blue-500/30 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform"><FiCheckCircle /></div>
                      <div>
                        <h4 className="font-bold text-lg leading-none mb-1">{item.title || item.role || item.degree}</h4>
                        <p className="text-slate-500 text-xs uppercase tracking-wider">{item.company || item.institute || 'Project'}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(item)} className="p-3 bg-white/5 rounded-xl hover:text-blue-400"><FiEdit /></button>
                      <button onClick={() => handleDelete(item._id)} className="p-3 bg-white/5 rounded-xl hover:text-red-400"><FiTrash2 /></button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* MESSAGES WITH REPLY LOGIC */
            <motion.div key="messages" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="space-y-6">
              {messages.length > 0 ? messages.map((m) => (
                <div key={m._id} className="bg-[#0b1120] p-6 rounded-[2rem] border border-white/5 shadow-xl hover:border-blue-500/20 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold text-lg">
                        {m.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <span className="text-white font-bold block text-lg">{m.name}</span>
                        <span className="text-slate-500 text-[10px] uppercase tracking-widest">{m.email}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                       <span className="text-slate-600 text-[10px] font-mono bg-white/5 px-3 py-1 rounded-full">{new Date(m.createdAt).toLocaleDateString()}</span>
                       <div className="flex gap-2 mt-2">
                         <button 
                            onClick={() => { setReplyId(replyId === m._id ? null : m._id); setReplyText(""); }}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${replyId === m._id ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20'}`}
                         >
                            {replyId === m._id ? 'Cancel' : 'Reply Now'}
                         </button>
                         <button onClick={() => handleDelete(m._id, 'messages')} className="text-slate-500 hover:text-red-500 p-2 transition-colors">
                            <FiTrash2 size={18}/>
                         </button>
                       </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#050816] p-5 rounded-2xl border border-white/5">
                    <h4 className="text-sm font-bold mb-2 text-blue-400">Subject: {m.subject}</h4>
                    <p className="text-slate-400 italic text-sm">"{m.message}"</p>
                  </div>

                  {/* SHOW PREVIOUS REPLY IF EXISTS */}
                  {m.status === 'Replied' && m.replyText && (
                    <div className="mt-4 p-4 bg-emerald-500/10 border-l-4 border-emerald-500 rounded-r-2xl">
                      <p className="text-[10px] font-bold text-emerald-400 mb-1 uppercase">Admin Response Sent:</p>
                      <p className="text-slate-300 text-sm italic">"{m.replyText}"</p>
                    </div>
                  )}

                  {/* REPLY FORM */}
                  <AnimatePresence>
                    {replyId === m._id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
                          <textarea 
                            className="w-full bg-[#050816] border border-blue-500/30 p-5 rounded-2xl outline-none text-white text-sm"
                            placeholder={`Write reply to ${m.name}...`}
                            rows="4"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                          />
                          <button 
                            disabled={sendingReply}
                            onClick={() => handleSendReply(m._id, m.email, m.subject)}
                            className="w-full bg-emerald-600 hover:bg-emerald-500 py-4 rounded-xl font-black flex items-center justify-center gap-3 disabled:opacity-50 transition-all"
                          >
                            {sendingReply ? "Sending..." : <><FiSend /> DELIVER REPLY</>}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )) : (
                <div className="text-center py-24 bg-[#0b1120] rounded-[3rem] border border-dashed border-white/10 text-slate-500">No messages.</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;