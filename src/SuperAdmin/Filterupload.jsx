import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Upload, Scissors, Shirt, Palette, Loader2, CheckCircle2, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminNavbar from '../Admin/AdminNavbar';
import SuperAdminNav from './SuperAdminNav';

const Filterupload = () => {
   
    const [loading, setLoading] = useState(false);
      const API = "https://app-product-qh1f.onrender.com/api/v1";

    // Your Specific Dropdown Options
    const categorywearsOptions = [
        "Casualwear", "Bridal", "Officewear", "Traditional", 
        "Modest", "Collegewear", "Hijab", "Double Piece", 
        "Kimono", "Embroidered Abaya", "Colored Abaya", "Front-Zip Abaya"
    ];

    const clothTypeOptions = [
        "Nida", "Premium Chiffon", "Lexington", "Crepe", 
        "Satin", "Linen", "Velvet", "Jersey", "Nada Silk"
    ];

    const [formData, setFormData] = useState({
        wearsname: '',
        clothname: '',
        colors: '#8E7DBE',
    });
    
    const [files, setFiles] = useState({
        wearsimage: null,
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFiles({ ...files, [e.target.name]: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.wearsname) return toast.error("Please select a wear style");
        // if (!formData.clothname) return toast.error("Please select a cloth type");
        if (!files.wearsimage) return toast.error("Please upload a style image");
        
        setLoading(true);
        try {
            const data = new FormData();
            data.append("wearsname", formData.wearsname);
            data.append("clothname", formData.clothname);
            data.append("colors", formData.colors);
            data.append("wearsimage", files.wearsimage);

            const res = await axios.post(`${API}/admin/filterupload`, data);
            
            if (res.data.success) {
                toast.success("Filter attribute synced successfully");
                setFormData({ wearsname: '', clothname: '', colors: '#8E7DBE' });
                setFiles({ wearsimage: null });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Upload failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <SuperAdminNav/>
        <div className="min-h-screen bg-slate-50 p-6 lg:p-12">
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-xl p-8 lg:p-12 border border-slate-100"
            >
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-serif italic text-slate-800">Filter Management</h1>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Sync Assets with Product Catalog</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Wear Style Dropdown */}
                    <div className="space-y-4 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                        <div className="flex items-center gap-2 mb-2">
                            <Shirt size={18} className="text-[#8E7DBE]" />
                            <h2 className="font-bold text-sm uppercase text-slate-600">Wear Style</h2>
                        </div>
                        <div className="relative">
                            <select 
                                name="wearsname"
                                value={formData.wearsname}
                                onChange={handleInputChange}
                                className="w-full px-5 py-3 rounded-xl border-none bg-white shadow-sm text-sm appearance-none outline-none focus:ring-2 focus:ring-[#8E7DBE]/20"
                            >
                                <option value="">Select Wear Type</option>
                                {categorywearsOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                        <div className="relative h-32 bg-white rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden group">
                            {files.wearsimage ? (
                                <div className="flex flex-col items-center">
                                    <CheckCircle2 className="text-emerald-500 mb-1" />
                                    <span className="text-[10px] text-emerald-600 font-bold uppercase">Ready</span>
                                </div>
                            ) : (
                                <Upload className="text-slate-300 group-hover:text-[#8E7DBE] transition-colors" />
                            )}
                            <p className="text-[10px] font-bold mt-2 text-slate-400 uppercase tracking-tighter">
                                {files.wearsimage ? files.wearsimage.name : 'Upload Style Icon'}
                            </p>
                            <input type="file" name="wearsimage" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                        </div>
                    </div>

                    {/* Material Dropdown */}
                    <div className="space-y-4 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                        <div className="flex items-center gap-2 mb-2">
                            <Scissors size={18} className="text-[#8E7DBE]" />
                            <h2 className="font-bold text-sm uppercase text-slate-600">Fabric Material</h2>
                        </div>
                        <div className="relative">
                            <select 
                                name="clothname"
                                value={formData.clothname}
                                onChange={handleInputChange}
                                className="w-full px-5 py-3 rounded-xl border-none bg-white shadow-sm text-sm appearance-none outline-none focus:ring-2 focus:ring-[#8E7DBE]/20"
                            >
                                <option value="">Select Fabric</option>
                                {clothTypeOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                        <div className="h-32 flex flex-col items-center justify-center text-center p-4 bg-white rounded-xl border border-slate-100">
                             <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Preview Pill</p>
                             <div 
                                style={{ backgroundColor: formData.colors }}
                                className="px-4 py-1.5 rounded-full text-[10px] text-white font-bold uppercase tracking-wider"
                             >
                                {formData.clothname || "Fabric"}
                             </div>
                        </div>
                    </div>

                    {/* Color Management */}
                    <div className="md:col-span-2 p-6 bg-slate-900 rounded-[2rem] text-white flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/10 rounded-2xl"><Palette size={24} /></div>
                            <div>
                                <h3 className="font-bold text-lg">Filter Color</h3>
                                <p className="text-xs text-slate-400">Map a theme color to this filter</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/10">
                            <input type="color" name="colors" value={formData.colors} onChange={handleInputChange} className="w-12 h-12 bg-transparent border-none cursor-pointer" />
                            <input 
                                name="colors" 
                                value={formData.colors} 
                                onChange={handleInputChange} 
                                className="bg-transparent border-none outline-none font-mono text-sm uppercase w-24 text-center" 
                            />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={loading}
                        className="md:col-span-2 w-full py-5 bg-[#8E7DBE] text-white rounded-[1.5rem] font-bold text-xs uppercase tracking-[0.4em] shadow-xl hover:bg-[#7a6aad] transition-all flex items-center justify-center gap-3 disabled:bg-slate-300 active:scale-95"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : 'Confirm Asset Sync'}
                    </button>
                </form>
            </motion.div>
        </div>
        </>
    );
};

export default Filterupload;