import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Tag, Trash2, Search, 
  Layers, Loader2, Image as ImageIcon,
  X, ChevronDown
} from 'lucide-react';
import SuperAdminNav from './SuperAdminNav';
import toast from 'react-hot-toast';

const CategoryUpload = () => {
 const API = "https://app-product-qh1f.onrender.com/api/v1";
  // Configuration for your specific niche
  const categoryOptions = [
    "Casualwear", "Bridal", "Officewear", "Traditional", "Modest","Collegewear", 
    "Hijab", "Double Piece", "Kimono", "Embroidered Abaya", 
    "Colored Abaya", "Front-Zip Abaya"
  ];

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  
  // Form State - Initialized with first option to prevent empty submissions
  const [formData, setFormData] = useState({
    name: categoryOptions[0],
    description: "",
    image: null
  });

  // Local state for image preview URL
  const [preview, setPreview] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API}/category`);
      setCategories(res.data.allcategory || []);
    } catch (err) {
      toast.error("Failed to sync with registry");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchCategories(); 
  }, []);

  // Handle File Change & Preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file)); // Create local URL for preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) return toast.error("Please select an image");
    
    setActionLoading(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("image", formData.image);

      const res = await axios.post(`${API}/category`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast.success(`${formData.name} provisioned successfully!`);
        // Reset form to defaults
        setFormData({ name: categoryOptions[0], description: "", image: null });
        setPreview(null);
        fetchCategories();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Provisioning failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to decommission this category?")) return;
    
    try {
      const res = await axios.delete(`${API}/category/${id}`);
      if (res.data.success) {
        toast.success("Category removed from vault");
        fetchCategories();
      }
    } catch (err) {
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50  font-sans pb-20">
      <SuperAdminNav />

      <main className="max-w-[1400px] mx-auto p-6 lg:p-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-light tracking-tight">
            Category <span className="font-bold text-[#8E7DBE]">Vault</span>
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
                <Plus size={18} className="text-[#8E7DBE]" /> Add Collection
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Image Preview Area */}
                <div className="relative group w-full h-40 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl overflow-hidden flex flex-col items-center justify-center transition-all hover:border-blue-400">
                  {preview ? (
                    <>
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => {setPreview(null); setFormData({...formData, image: null})}}
                        className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur rounded-full text-rose-600 shadow-sm"
                      >
                        <X size={14} />
                      </button>
                    </>
                  ) : (
                    <div className="text-center p-4">
                      <ImageIcon className="mx-auto text-slate-300 mb-2" size={32} />
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Select Thumbnail</p>
                    </div>
                  )}
                  <input 
                    type='file'
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>

                <div className="space-y-1 relative">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category Type</label>
                  <select 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-4 focus:ring-blue-900/5 outline-none transition-all appearance-none cursor-pointer"
                  >
                    {categoryOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-5 top-[38px] pointer-events-none text-slate-400" size={16} />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Brief Description</label>
                  <textarea 
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe this collection..."
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-4 focus:ring-blue-900/5 outline-none transition-all resize-none"
                  />
                </div>

                <button 
                  disabled={actionLoading}
                  className="w-full py-4 bg-[#8E7DBE] text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-900/20 hover:bg-blue-900 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
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
                <Loader2 className="animate-spin text-blue-600 mb-4" size={32} />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Syncing with Registry</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode='popLayout'>
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
                        <div className="h-24 w-24 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
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
                              className="text-slate-300 hover:text-rose-600 transition-colors p-1"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                            {cat.description || "No description provided."}
                          </p>
                          <div className="mt-4 flex items-center gap-2">
                             <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg uppercase tracking-wider">
                               Live in Store
                             </span>
                          </div>
                        </div>
                      </div>
                      <Layers className="absolute -bottom-4 -right-4 text-slate-50 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity" size={120} />
                    </motion.div>
                  ))}
                </AnimatePresence>

                {categories.length === 0 && (
                  <div className="col-span-full py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-100 flex flex-col items-center">
                    <Layers className="text-slate-200 mb-4" size={48} />
                    <p className="text-sm font-medium text-slate-400 text-center px-6">No collections found. Start by provisioning one on the left.</p>
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

export default CategoryUpload;