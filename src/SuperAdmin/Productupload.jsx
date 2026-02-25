import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import SuperAdminNav from "./SuperAdminNav";
import { 
  Pencil, Trash2, Plus, Package, 
  AlertCircle, Search, X, Image as ImageIcon, 
  IndianRupee, Loader2, ChevronDown, Scissors 
} from 'lucide-react';
import toast from 'react-hot-toast';

const Productupload = () => {
 const API = "https://app-product-qh1f.onrender.com/api/v1";

  // Abaya-Specific Dropdown Options
  const categoryOptions = [
    "Casualwear", "Bridal", "Officewear", "Traditional", 
    "Modest", "Collegewear", "Hijab", "Double Piece", 
    "Kimono", "Embroidered Abaya", "Colored Abaya", "Front-Zip Abaya"
  ];

  const clothTypeOptions = [
    "Nida", "Premium Chiffon", "Lexington", "Crepe", 
    "Satin", "Linen", "Velvet", "Jersey", "Nada Silk"
  ];

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Added Search Logic

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    offerprice: "",
    category: categoryOptions[0],
    categoryType: clothTypeOptions[0], // Key matches Backend
    stock: 1,
    image: null
  });

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API}/products`);
      setProducts(res.data.products || []);
      console.log(res)
    } catch (error) {
      toast.error("Database sync failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const resetForm = () => {
    setFormData({
      name: "", description: "", price: "", offerprice: "",
      category: categoryOptions[0], categoryType: clothTypeOptions[0],
      stock: 1, image: null
    });
    setPreview(null);
    setEditId(null);
    setIsModalOpen(false);
  };

  const openEditModal = (product) => {
    setEditId(product._id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      offerprice: product.offerprice || "",
      category: product.category,
      categoryType: product.categoryType || clothTypeOptions[0], // Corrected Key
      stock: product.stock,
      image: null 
    });
    setPreview(product.images?.[0]?.url || null);
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("offerprice", formData.offerprice);
      data.append("category", formData.category);
      data.append("categoryType", formData.categoryType); // Fixed Mismatch
      data.append("stock", formData.stock);
      
      if (formData.image) {
        data.append("image", formData.image);
      }

      if (editId) {
        await axios.put(`${API}/product/${editId}`, data);
        toast.success("Abaya design updated");
      } else {
        if (!formData.image) throw new Error("Please select a product image");
        await axios.post(`${API}/products`, data);
        toast.success("New Abaya listed successfully");
      }

      fetchData();
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setActionLoading(true);
      await axios.delete(`${API}/product/${deleteId}`);
      toast.success("Item purged from vault");
      setProducts(prev => prev.filter(p => p._id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      toast.error("Deletion failed");
    } finally {
      setActionLoading(false);
    }
  };

  // Filter products based on search
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: products.length,
    value: products.reduce((acc, p) => acc + (Number(p.price) * (p.stock || 0)), 0),
    lowStock: products.filter(p => p.stock < 5).length
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      <SuperAdminNav />
      
      <main className="max-w-[1500px] mx-auto p-6 lg:p-12">
        {/* Statistics Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Boutique Catalog', val: stats.total, icon: Package, color: 'text-[#8E7DBE]' },
            { label: 'Total Stock Value', val: `₹${stats.value.toLocaleString()}`, icon: IndianRupee, color: 'text-emerald-600' },
            { label: 'Low Inventory', val: stats.lowStock, icon: AlertCircle, color: 'text-rose-600' },
          ].map((stat, i) => (
            <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay: i*0.1}} key={i} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.val}</p>
                </div>
                <div className={`p-3 rounded-xl bg-slate-50 ${stat.color}`}><stat.icon size={20}/></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search designs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-[#8E7DBE]/5 outline-none transition-all"
            />
          </div>
          <button 
            onClick={() => { resetForm(); setIsModalOpen(true); }}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-[#8E7DBE] text-white rounded-2xl font-bold text-xs tracking-widest hover:bg-[#7a6aad] transition-all shadow-lg shadow-[#8E7DBE]/20"
          >
            <Plus size={18} /> ADD NEW DESIGN
          </button>
        </div>

        {/* Product Display Grid */}
        {loading ? (
          <div className="flex flex-col items-center py-20 gap-4">
            <Loader2 className="animate-spin text-[#8E7DBE]" size={32}/>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Opening Vault...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <motion.div layout key={product._id} className="group bg-white rounded-[2.5rem] border border-slate-200 p-5 hover:shadow-2xl hover:shadow-[#8E7DBE]/10 transition-all">
                <div className="aspect-[4/5] bg-slate-50 rounded-[2rem] overflow-hidden mb-4 relative">
                  <img src={product.images?.[0]?.url} alt={product.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black text-[#8E7DBE] shadow-sm">
                      {product.category}
                    </span>
                    <span className="bg-slate-900/80 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black text-white shadow-sm uppercase">
                      {product.categoryType} {/* Fixed Display Field */}
                    </span>
                  </div>
                </div>
                
                <h3 className="font-serif italic font-bold text-base text-slate-800 line-clamp-1 mb-1">{product.name}</h3>
                
                <div className="flex justify-between items-end mt-4">
                  <div>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Availability: <span className={product.stock < 5 ? 'text-rose-500' : 'text-emerald-500'}>{product.stock} Units</span></p>
                    <div className="flex items-center gap-2 mt-1">
                      {product.offerprice ? (
                        <>
                          <p className="text-sm text-slate-300 line-through">₹{product.price}</p>
                          <p className="text-lg font-bold text-slate-900">₹{product.offerprice}</p>
                        </>
                      ) : (
                        <p className="text-lg font-bold text-slate-900">₹{product.price}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => openEditModal(product)} className="p-2 text-slate-400 hover:text-[#8E7DBE] hover:bg-slate-50 rounded-full transition-all"><Pencil size={16}/></button>
                    <button onClick={() => setDeleteId(product._id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all"><Trash2 size={16}/></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* --- SIDE SLIDE MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={resetForm} className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60]" />
            <motion.div initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring', damping:30, stiffness:200}} className="fixed right-0 top-0 h-full w-full max-w-xl bg-white z-[70] shadow-2xl p-10 overflow-y-auto">
              
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-2xl font-serif italic">{editId ? 'Edit Design' : 'List New Abaya'}</h2>
                  <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Product Details & Specs</p>
                </div>
                <button onClick={resetForm} className="p-3 hover:bg-slate-50 rounded-full transition-colors"><X size={24}/></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload Area */}
                <div className="relative group w-full h-56 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] overflow-hidden flex flex-col items-center justify-center transition-all hover:border-[#8E7DBE]">
                  {preview ? (
                    <>
                      <img src={preview} alt="Product" className="w-full h-full object-contain p-4" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white text-xs font-bold">CLICK TO CHANGE IMAGE</p>
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <ImageIcon className="mx-auto text-slate-300 mb-2" size={40} />
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Upload HD Preview Image</p>
                    </div>
                  )}
                  <input type='file' accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Design Name</label>
                  <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-4 focus:ring-[#8E7DBE]/5 outline-none" placeholder="e.g. Midnight Silk Kimono Abaya"/>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1 relative">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Collection</label>
                    <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none appearance-none cursor-pointer">
                      {categoryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    <ChevronDown className="absolute right-5 top-11 text-slate-400" size={16} />
                  </div>
                  <div className="space-y-1 relative">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cloth Material</label>
                    <select value={formData.categoryType} onChange={(e) => setFormData({...formData, categoryType: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none appearance-none cursor-pointer">
                      {clothTypeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    <Scissors className="absolute right-5 top-11 text-slate-400" size={16} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">Price (₹)</label>
                    <input required type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm" placeholder="2999"/>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">Offer (₹)</label>
                    <input type="number" value={formData.offerprice} onChange={(e) => setFormData({...formData, offerprice: e.target.value})} className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm" placeholder="2499"/>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">Stock Units</label>
                    <input required type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm"/>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Fabric & Style Description</label>
                  <textarea required rows={4} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none resize-none" placeholder="Detail the embroidery, cut, and fit..."/>
                </div>

                <button 
                  type="submit" 
                  disabled={actionLoading}
                  className="w-full py-5 bg-[#8E7DBE] text-white rounded-2xl font-bold text-xs uppercase tracking-[0.3em] shadow-xl shadow-[#8E7DBE]/20 hover:bg-[#7a6aad] transition-all flex items-center justify-center gap-2"
                >
                  {actionLoading ? <Loader2 className="animate-spin" size={20} /> : (editId ? 'Sync Updates' : 'Publish Design')}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteId && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-[80]" onClick={() => setDeleteId(null)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="fixed inset-0 flex items-center justify-center z-[90]">
              <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-10 shadow-2xl mx-4 text-center">
                <div className="p-4 bg-rose-50 rounded-full w-fit mx-auto mb-6"><AlertCircle className="text-rose-500" size={30} /></div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Remove Design?</h3>
                <p className="text-sm text-slate-500 mb-8">This Abaya model will be removed from your public storefront.</p>
                <div className="flex gap-3">
                  <button onClick={() => setDeleteId(null)} className="flex-1 py-3 text-sm font-bold rounded-xl bg-slate-100">Cancel</button>
                  <button onClick={handleDelete} className="flex-1 py-3 text-sm font-bold rounded-xl bg-rose-600 text-white">Delete</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Productupload;