import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Tag, Trash2, Search, 
  Layers, Loader2, Image as ImageIcon,
  AlignLeft, CheckCircle2, X
} from 'lucide-react';
import SuperAdminNav from './SuperAdminNav';

const Categoryupload = () => {
  const API = "https://app-product-qh1f.onrender.com/api/v1";
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: ""
  });

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API}/category`);
     setCategories(res.data.allcategory || []);
   console.log(res.data.allcategory)
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        image: {
          public_id: `categories/${formData.name.toLowerCase()}`,
          url: formData.imageUrl
        }
      };
      
      await axios.post(`${API}/category`, payload);
      setFormData({ name: "", description: "", imageUrl: "" });
      fetchCategories();
    } catch (err) {
      alert("Failed to create category");
    } finally {
      setActionLoading(false);
    }
  };

const handleDelete=async(id)=>{
    const res=await axios.delete(`${API}/category/${id}`);
    if(res.data.success){
      fetchCategories();
    }else{
      alert("Failed to delete category");
    }
}

  return (
    <div className="min-h-screen bg-slate-50 text-blue-950 font-sans pb-20">
      <SuperAdminNav />

      <main className="max-w-[1400px] mx-auto p-6 lg:p-12">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-light tracking-tight">
            Category <span className="font-bold">Vault</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">Organize your products into visual collections.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: Creator Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4"
          >
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm sticky top-28">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Plus size={18} className="text-blue-600" /> Add Collection
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Name</label>
                  <input 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Headphones"
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-4 focus:ring-blue-900/5 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Thumbnail URL</label>
                  <input 
                    required
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    placeholder="https://images.com/photo.jpg"
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-4 focus:ring-blue-900/5 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Brief Description</label>
                  <textarea 
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe this category..."
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-4 focus:ring-blue-900/5 outline-none transition-all resize-none"
                  />
                </div>

                <button 
                  disabled={actionLoading}
                  className="w-full py-4 bg-blue-950 text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-900/20 hover:bg-blue-900 transition-all flex items-center justify-center gap-2"
                >
                  {actionLoading ? <Loader2 size={16} className="animate-spin" /> : "PROVISION CATEGORY"}
                </button>
              </form>
            </div>
          </motion.div>

          {/* RIGHT: Live Grid */}
          <div className="lg:col-span-8">
            {loading ? (
              <div className="flex flex-col items-center py-20">
                <Loader2 className="animate-spin text-blue-900 mb-4" size={32} />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Syncing with Registry</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence>
                  {categories.map((cat) => (
                    <motion.div 
                      key={cat._id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="group bg-white border border-slate-200 rounded-[2rem] p-6 hover:shadow-xl hover:shadow-blue-900/5 transition-all relative overflow-hidden"
                    >
                      <div className="flex gap-5">
                        <div className="h-24 w-24 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                          <img 
                            src={cat.image?.url} 
                            alt={cat.name} 
                            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" 
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold text-blue-950 capitalize truncate">{cat.name}</h3>
                            <button 
                              onClick={() => handleDelete(cat._id)}
                              className="text-slate-300 hover:text-rose-600 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                            {cat.description || "No description provided for this collection."}
                          </p>
                          <div className="mt-4 flex items-center gap-2">
                             <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-tighter">
                               Active Collection
                             </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Decorative Background Icon */}
                      <Layers className="absolute -bottom-4 -right-4 text-slate-50 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity" size={120} />
                    </motion.div>
                  ))}
                </AnimatePresence>

                {categories.length === 0 && (
                  <div className="col-span-full py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-100 flex flex-col items-center">
                    <Layers className="text-slate-200 mb-4" size={48} />
                    <p className="text-sm font-medium text-slate-400">No categories found in the database.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Categoryupload;