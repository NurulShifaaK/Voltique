import React, { useEffect, useState } from "react";
import SuperAdminNav from "./SuperAdminNav";
import { motion } from "framer-motion";
import { Plus, Image as ImageIcon, Link, Palette, Type, Layout, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

const BannerUpload = () => {
   const API = "https://app-product-qh1f.onrender.com/api/v1";

  const [bannerdata, setBannerData] = useState([]);
  const [formData, setFormData] = useState({
    imgtext: "",
    imgsubtext: "",
    bgcolor: "",
    floatimg: "",
    bgimg: ""
  });

  const fetchallbanner = async () => {
    try {
      const res = await axios.get(`${API}/bannerupload`);
      setBannerData(res.data.banner);
    } catch (err) {
      console.error("Error fetching banners:", err);
    }
  };

  useEffect(() => {
    fetchallbanner();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleaddbanner = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        imgtext: formData.imgtext,
        imgsubtext: formData.imgsubtext,
        bgcolor: formData.bgcolor,
        floatimg: formData.floatimg ? [
          {
            public_id: `banners/${formData.imgtext.toLowerCase().replace(/\s+/g, '-')}-float`,
            url: formData.floatimg
          }
        ] : [],
        bgimg: formData.bgimg ? [
          {
            public_id: `banners/${formData.imgtext.toLowerCase().replace(/\s+/g, '-')}-bg`,
            url: formData.bgimg,
          }
        ] : []
      };

      const res = await axios.post(`${API}/bannerupload`, payload);
      if (res.data) {
        toast.success("Banner added successfully!");
        setFormData({ imgtext: "", imgsubtext: "", bgcolor: "", floatimg: "", bgimg: "" }); // Reset form
        fetchallbanner();
      }
    } catch (err) {
      toast.error("Failed to add banner. Please check your API connection.");
    }
  };

  const handledelete = async (id) => {
    try {
      const res = await axios.delete(`${API}/bannerupload/${id}`);
      if (res.data.success) {
        toast.success("Banner deleted successfully!");
        fetchallbanner();
      }
    } catch (err) {
      toast.error("Failed to delete banner.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-[#8E7DBE] pb-20">
      <SuperAdminNav />

      <main className="max-w-[1400px] mx-auto p-6 lg:p-12">
        <div className="mb-12">
          <h1 className="text-3xl font-light tracking-tight">
            Banner <span className="font-bold">Studio</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Design your storefront by providing image URLs and theme colors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT PANEL - CONFIGURATION */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5"
          >
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm sticky top-28">
              <h2 className="text-lg font-bold mb-8 flex items-center gap-2 text-slate-800">
                <Plus size={18} className="text-[#8E7DBE]" />
                Banner Configuration
              </h2>

              <form onSubmit={handleaddbanner} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Type size={12} /> Banner Title
                  </label>
                  <input
                    type="text"
                    name="imgtext"
                    value={formData.imgtext}
                    onChange={handleChange}
                    placeholder="E.g., SHOES OFFERS"
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-4 focus:ring-[#8E7DBE]/5 outline-none transition"
                    
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Link size={12} /> Banner Subtitle
                  </label>
                  <input
                    type="text"
                    name="imgsubtext"
                    value={formData.imgsubtext}
                    onChange={handleChange}
                    placeholder="E.g., 20% Discount on Every Shoes"
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-4 focus:ring-[#8E7DBE]/5 outline-none transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Layout size={12} /> Floating Product Image URL
                  </label>
                  <input
                    type="text"
                    name="floatimg"
                    value={formData.floatimg}
                    onChange={handleChange}
                    placeholder="https://example.com/shoe.png"
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-4 focus:ring-[#8E7DBE]/5 outline-none transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <ImageIcon size={12} /> Background Image URL (Optional)
                  </label>
                  <input
                    type="text"
                    name="bgimg"
                    value={formData.bgimg}
                    onChange={handleChange}
                    placeholder="https://example.com/pattern.jpg"
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-4 focus:ring-[#8E7DBE]/5 outline-none transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Palette size={12} /> Theme Hex Color
                  </label>
                  <input
                    type="text"
                    name="bgcolor"
                    value={formData.bgcolor}
                    onChange={handleChange}
                    placeholder="E36A6A (without #)"
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-4 focus:ring-[#8E7DBE]/5 outline-none transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-4 bg-[#8E7DBE] text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-[#8E7DBE]/20 hover:bg-[#7a6aa8] transition-all active:scale-[0.98]"
                >
                  Publish Banner
                </button>
              </form>
            </div>
          </motion.div>

          {/* RIGHT SIDE - VISUAL PREVIEW LIST */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-6 lg:p-10 shadow-sm min-h-[600px]">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">
                Live Preview & Management
              </h2>
              
              <div className="flex flex-col gap-6">
                {bannerdata.length === 0 && (
                  <div className="text-center py-20 text-slate-300">
                    <ImageIcon size={48} className="mx-auto mb-4 opacity-20" />
                    <p>No banners created yet.</p>
                  </div>
                )}

                {bannerdata.map((item) => {
                  const hasBgImg = item.bgimg && item.bgimg.length > 0 && item.bgimg[0].url;
                  
                  return (
                    <div 
                      key={item._id}
                      className="relative w-full h-[220px] rounded-[2rem] overflow-hidden group shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                      style={{ 
                        backgroundColor: item.bgcolor ? `#${item.bgcolor.replace('#', '')}` : '#f3f4f6',
                        backgroundImage: hasBgImg ? `url(${item.bgimg[0].url})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      {/* Dark Overlay for Text Readability if BG Image exists */}
                      {hasBgImg && <div className="absolute inset-0 bg-black/20" />}

                      {/* Content */}
                      <div className="relative z-10 p-8 h-full flex flex-col justify-center max-w-[60%] text-white">
                        <h3 className="text-3xl font-black italic tracking-tighter leading-none uppercase">
                          {item.imgtext}
                        </h3>
                        <p className="mt-2 text-white/90 text-[10px] font-bold uppercase tracking-[0.15em] leading-relaxed">
                          {item.imgsubtext}
                        </p>
                        <button className="mt-5 w-fit px-6 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-[9px] font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all">
                          Claim Offer
                        </button>
                      </div>

                      {/* Floating Image */}
                      <div className="absolute right-6 bottom-0 w-[40%] h-full flex items-center justify-center">
                        {item.floatimg && item.floatimg[0] && (
                          <img
                            src={item.floatimg[0].url}
                            alt="Product"
                            className="max-h-[85%] w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)] transform group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500"
                          />
                        )}
                      </div>

                      {/* Delete Action */}
                      <button 
                        onClick={() => handledelete(item._id)}
                        className="absolute top-4 right-4 p-3 bg-white/90 text-red-500 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default BannerUpload;