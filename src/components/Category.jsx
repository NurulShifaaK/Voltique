import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { ArrowLeft, ShoppingBag, Eye, Star, ChevronRight, Filter, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Category = () => {
    const API = "https://app-product-qh1f.onrender.com/api/v1";
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [selectedMaterial, setSelectedMaterial] = useState("All Materials");
  const [selectedStyle, setSelectedStyle] = useState("All Styles");

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const category = location.state?.category || query.get("category");

  const clothTypeOptions = ["All Materials", "Nida", "Premium Chiffon", "Lexington", "Crepe", "Satin", "Linen", "Velvet", "Jersey", "Nada Silk"];
  const styleOptions = ["All Styles", "Casualwear", "Bridal", "Officewear", "Traditional", "Modest", "Collegewear", "Hijab", "Kimono"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API}/products/category?category=${category}`);
        setProducts(res.data.products);
        setFilteredProducts(res.data.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (category) fetchProducts();
  }, [category]);

  useEffect(() => {
    let result = products;
    if (selectedMaterial !== "All Materials") result = result.filter(p => p.clothType === selectedMaterial);
    if (selectedStyle !== "All Styles") result = result.filter(p => p.categorywears === selectedStyle);
    setFilteredProducts(result);
  }, [selectedMaterial, selectedStyle, products]);

  return (
    <div className="bg-[#fcfcfc] min-h-screen text-slate-900 font-sans pb-20">
      <Navbar />

      {/* --- LUXURY HEADER --- */}
      <section className="relative h-[280px] bg-[#8E7DBE] flex flex-col justify-center items-center px-6 overflow-hidden">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center z-10">
          <button onClick={() => navigate("/products")} className="text-[10px] font-black uppercase tracking-[0.4em] text-white/80 mb-4 flex items-center justify-center gap-2 mx-auto hover:text-white transition-all">
            <ArrowLeft size={14} /> Boutique
          </button>
          <h1 className="text-5xl md:text-6xl font-light italic text-white capitalize">
            {category}<span className="text-blue-300 font-bold not-italic">.</span>
          </h1>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        
        {/* --- FLEX OPTION FILTERS --- */}
        <div className="space-y-8 mb-16">
          {/* Material Pills */}
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-2">Select Fabric</p>
            <div className="flex flex-wrap gap-3">
              {clothTypeOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSelectedMaterial(opt)}
                  className={`px-6 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 border ${
                    selectedMaterial === opt 
                    ? "bg-[#8E7DBE] text-white border-[#8E7DBE] shadow-lg shadow-[#8E7DBE]/20 scale-105" 
                    : "bg-purple-50 text-[#8E7DBE] border-purple-100 hover:bg-purple-100"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Style Pills */}
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-2">Wear Style</p>
            <div className="flex flex-wrap gap-3">
              {styleOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSelectedStyle(opt)}
                  className={`px-6 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 border ${
                    selectedStyle === opt 
                    ? "bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20 scale-105" 
                    : "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- PRODUCT GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((item) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group cursor-pointer"
                onClick={() => navigate(`/singleproduct/${item._id}`)}
              >
                <div className="relative aspect-[3/4] bg-white rounded-[2rem] overflow-hidden mb-5 border border-slate-100 shadow-sm group-hover:shadow-xl transition-all duration-500">
                  <img src={item.images[0]?.url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl flex justify-between items-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                       <div>
                         <p className="text-[10px] font-black text-[#8E7DBE] uppercase tracking-tighter">{item.clothType}</p>
                         <p className="text-sm font-bold text-slate-900 line-clamp-1">{item.name}</p>
                       </div>
                       <p className="text-sm font-black text-slate-900">₹{item.price}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- EMPTY STATE --- */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200">
            <ShoppingBag size={40} className="mx-auto text-slate-200 mb-4" />
            <h2 className="text-xl font-bold text-slate-900">No matches in this category</h2>
            <button 
              onClick={() => { setSelectedMaterial("All Materials"); setSelectedStyle("All Styles"); }}
              className="mt-4 text-xs font-black text-[#8E7DBE] uppercase tracking-widest hover:underline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;