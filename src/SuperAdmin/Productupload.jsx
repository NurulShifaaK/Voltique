import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import SuperAdminNav from "./SuperAdminNav"
import { 
  Pencil, Trash2, Plus, Package, 
  BarChart3, AlertCircle, Search, 
  X, Image as ImageIcon, IndianRupee,
  Loader2
} from 'lucide-react';

const ProductManagement = () => {
const API = "https://app-product-qh1f.onrender.com/api/v1";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal & Action States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null); // Tracks if we are editing
  const [deleteId, setDeleteId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "", description: "", price: "", offerprice:"",
    category: "", categoryType: "", stock: 1,
    imageUrl: ""
  });

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API}/products`);
      setProducts(res.data.products);
      console.log(res)
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const resetForm = () => {
    setFormData({ name: "", description: "", price: "",offerprice: "", category: "", categoryType: "", stock: 1, imageUrl: "" });
    setEditId(null);
    setIsModalOpen(false);
  };

  // Open Edit Modal
  const openEditModal = (product) => {
    setEditId(product._id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      offerprice:product.offerprice,
      category: product.category,
      categoryType: product.categoryType,
      stock: product.stock,
      imageUrl: product.images?.[0]?.url || ""
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const submissionData = {
        ...formData,
         price: Number(formData.price),
  stock: Number(formData.stock),
  offerprice: formData.offerprice ? Number(formData.offerprice) : null,
        images: [{ public_id: `img_${Date.now()}`, url: formData.imageUrl }]
      };

      if (editId) {
        // UPDATE LOGIC
        await axios.put(`${API}/product/${editId}`, submissionData);
        alert("Product updated successfully");
      } else {
        // CREATE LOGIC
        await axios.post(`${API}/products`, submissionData);
        alert("Product created successfully");
      }
      
      fetchData();
      resetForm();
    } catch (error) {
      alert("Action failed: " + (error.response?.data?.message || "Server Error"));
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setActionLoading(true);
      await axios.delete(`${API}/product/${deleteId}`);
      setProducts(prev => prev.filter(p => p._id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    } finally {
      setActionLoading(false);
    }
  };

  const stats = {
    total: products.length,
    value: products.reduce((acc, p) => acc + (Number(p.price) * (p.stock || 0)), 0),
    lowStock: products.filter(p => p.stock < 10).length
  };

  return (
    <div className="min-h-screen bg-slate-50 text-blue-950 font-sans pb-20">
      <SuperAdminNav />
      
      <main className="max-w-[1500px] mx-auto p-6 lg:p-12">
        {/* Analytics Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Live Catalog', val: stats.total, icon: Package, color: 'text-blue-600' },
            { label: 'Inventory Value', val: `₹${stats.value.toLocaleString()}`, icon: IndianRupee, color: 'text-emerald-600' },
            { label: 'Restock Alerts', val: stats.lowStock, icon: AlertCircle, color: 'text-rose-600' },
          ].map((stat, i) => (
            <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay: i*0.1}} key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
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

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="Search SKU or Name..." className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-900/5 outline-none"/>
          </div>
          <button 
            onClick={() => { resetForm(); setIsModalOpen(true); }}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-blue-950 text-white rounded-xl font-bold text-xs hover:bg-blue-900 transition-all shadow-lg shadow-blue-950/20"
          >
            <Plus size={18} /> NEW PRODUCT
          </button>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex flex-col items-center py-20 gap-4">
            <Loader2 className="animate-spin text-blue-900" size={32}/>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Accessing SKU Database</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <motion.div layout key={product._id} className="group bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-xl hover:shadow-blue-900/5 transition-all">
                <div className="aspect-square bg-slate-50 rounded-xl overflow-hidden mb-4 relative">
                  <img src={product.images?.[0]?.url} alt={product.name} className="object-cover w-50 h-60 mx-auto  group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-2 right-2">
                    <span className="bg-white/90 backdrop-blur px-2 py-1 rounded text-[9px] font-bold text-blue-950 shadow-sm border border-slate-100">
                      {product.category}
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-sm text-blue-950 line-clamp-1 mb-1">{product.name}</h3>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Stock: <span className={product.stock < 10 ? 'text-rose-500' : 'text-emerald-500'}>{product.stock}</span></p>
                    {/* <p className="text-lg font-bold text-blue-950 mt-1">₹{product.price?.toLocaleString()}</p> */}
                    <div className="flex items-center gap-2 mt-1">
  {product.offerprice && (
    <>
      <p className="text-sm text-slate-400 line-through">
        ₹{product.price?.toLocaleString()}
      </p>
      <p className="text-lg font-bold text-blue-950">
        ₹{product.offerprice?.toLocaleString()}
      </p>
    </>
  )}
  {!product.offerprice && (
    <p className="text-lg font-bold text-blue-950">
      ₹{product.price?.toLocaleString()}
    </p>
  )}
</div>
                  </div>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => openEditModal(product)}
                      className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                    >
                      <Pencil size={15}/>
                    </button>
                    <button 
                      onClick={() => setDeleteId(product._id)}
                      className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 size={15}/>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* --- FORM MODAL (Add & Update) --- */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={resetForm} className="fixed inset-0 bg-blue-950/20 backdrop-blur-sm z-[60]" />
            <motion.div initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring', damping:25}} className="fixed right-0 top-0 h-full w-full max-w-lg bg-white z-[70] shadow-2xl p-8 overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold">{editId ? 'Update' : 'New'} <span className="text-blue-600">Product</span></h2>
                <button onClick={resetForm} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={20}/></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Product Name</label>
                  <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="e.g. iPhone 15 Pro Max"/>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">original Price (₹)</label>
                    <input required type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none" placeholder="0.00"/>
                  </div>
                   <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Offer Price (₹)</label>
                    <input required type="number" value={formData.offerprice} onChange={(e) => setFormData({...formData, offerprice: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none" placeholder="0.00"/>
                  </div>
                 
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Category</label>
                    <input required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none" placeholder="Mobile"/>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Category Type</label>
                    <input required value={formData.categoryType} onChange={(e) => setFormData({...formData, categoryType: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none" placeholder="Smartphone"/>
                  </div>
                </div>

                <div className="space-y-1 grid grid-cols-2 gap-4 place-content-center">
                      <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-blue-600 flex items-center gap-1">
                    <ImageIcon size={12}/> Image URL
                  </label>
                  <input required value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} className="w-full p-3 bg-blue-50/50 border border-blue-100 rounded-xl text-sm outline-none" placeholder="https://cloud.com/image.jpg"/>
                  </div>
                   <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Current Stock</label>
                    <input required type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none"/>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Full Description</label>
                  <textarea required rows={4} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none resize-none" placeholder="Enter specifications..."/>
                </div>

                <button 
                  type="submit" 
                  disabled={actionLoading}
                  className="w-full py-4 bg-blue-950 text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-900/20 hover:bg-blue-900 transition-all mt-4 flex items-center justify-center gap-2"
                >
                  {actionLoading && <Loader2 size={16} className="animate-spin" />}
                  {editId ? 'Update Registry' : 'Register Product'}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- DELETE CONFIRMATION MODAL --- */}
      <AnimatePresence>
        {deleteId && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-blue-950/20 backdrop-blur-sm z-[80]" onClick={() => setDeleteId(null)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="fixed inset-0 flex items-center justify-center z-[90]">
              <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-2xl border border-slate-200 mx-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-rose-50 rounded-xl"><AlertCircle className="text-rose-500" size={22} /></div>
                  <h3 className="text-lg font-bold text-blue-950">Confirm Deletion?</h3>
                </div>
                <p className="text-sm text-slate-500 mb-6">This SKU will be permanently purged from the database. This action is irreversible.</p>
                <div className="flex gap-3 justify-end">
                  <button onClick={() => setDeleteId(null)} className="px-5 py-2 text-sm font-semibold rounded-xl bg-slate-100 hover:bg-slate-200">Cancel</button>
                  <button onClick={handleDelete} disabled={actionLoading} className="px-5 py-2 text-sm font-semibold rounded-xl bg-rose-600 text-white hover:bg-rose-700 flex items-center gap-2">
                    {actionLoading && <Loader2 size={14} className="animate-spin" />} Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductManagement;