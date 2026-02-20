import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Heart, RefreshCcwDotIcon, Search, Star, ShoppingBag, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "./Footer";

const Product = () => {
  const API = "https://app-product-qh1f.onrender.com/api/v1";
  const [allproduct, setAllproduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [search, setsearch] = useState("");
  const [category, setcategory] = useState("");

  const categories = [
    { name: "All", value: "" },
    { name: "iPhone", value: "iPhone" },
    { name: "MacBook", value: "Mac" },
    { name: "Audio", value: "Headphones" },
    { name: "Watch", value: "Watch" },
  ];

  useEffect(() => {
    const fetchproduct = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API}/products?keyword=${search || ""}&category=${category || ""}`);
        setAllproduct(res.data.products);
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchproduct();
  }, [search, category]);

  return (
    <div className="bg-white min-h-screen font-sans text-[#1a1a1a]">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* --- LUXURY HERO SECTION --- */}
      <section className="relative h-[400px]  bg-blue-950 flex flex-col justify-center items-center px-6 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center z-10"
        >
          <span className="text-[13px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-4 block">Spring Collection 2026</span>
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-8 italic">The Art of Tech</h1>
          
          <div className="relative mx-auto group">
            <Search className="absolute  left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={20} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setsearch(e.target.value)}
              placeholder="Search our collection..."
              className="sm:w-[400px]  pl-16 pr-6 py-3 bg-white rounded-full border border-transparent shadow-sm focus:border-gray-200 outline-none transition-all text-sm"
            />
          </div>
        </motion.div>
        
        {/* Background Decor */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-gray-50/20 -z-0 select-none">
          ECHO
        </div>
      </section>

      {/* --- MINIMALIST FILTERS --- */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-100 pb-2 gap-6">
          <div className="flex gap-8 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setcategory(cat.value)}
                className={`text-sm font-bold tracking-[1px] transition-all relative pb-2 whitespace-nowrap ${
                  category === cat.value ? "text-black" : "text-gray-400 hover:text-black"
                }`}
              >
                {cat.name}
                {category === cat.value && (
                  <motion.div layoutId="activeCat" className="absolute bottom-0 left-0 right-0 h-[2px] bg-black" />
                )}
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => {setcategory(""); setsearch("");}}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
          >
            <RefreshCcwDotIcon size={14} /> Reset Filters
          </button>
        </div>

        {/* --- PRODUCT GRID --- */}
        <div className="mt-12">
          {loading ? (
            <div className="h-[40vh] flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin" />
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
            >
              <AnimatePresence>
                {allproduct.map((item) => (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group cursor-pointer"
                    onClick={() => navigate(`/singleproduct/${item._id}`)}
                  >
                    {/* Image Box */}
                    <div className="relative aspect-[4/5] bg-[#fcfcfc] overflow-hidden mb-6 flex items-center justify-center rounded-sm">
                      <img
                        src={item.images[0]?.url}
                        alt={item.name}
                        className="w-[80%] h-[80%] object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                        <Heart size={16} />
                      </button>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-blue-950 text-white backdrop-blur-sm">
                         <span className="text-[13px] font-bold uppercase flex items-center justify-between">
                            Quick View <ArrowRight size={12} />
                         </span>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-start">
                        <h2 className="text-sm font-medium text-gray-800 tracking-tight">{item.name}</h2>
                      </div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.category}</p>
                      <div className="flex items-center gap-4 pt-2">
                        <p className="text-base font-light italic">₹{item.price.toLocaleString()}</p>
                        <div className="h-[1px] flex-1 bg-gray-100" />
                        <ShoppingBag size={14} className="text-gray-300 group-hover:text-black transition-colors" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* --- LOOPING TESTIMONIALS --- */}
      <section className="bg-blue-950 py-12 overflow-hidden mt-10">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center gap-12 mx-12">
              <span className="text-white text-2xl sm:text-4xl md:text-6xl font-light italic opacity-50 ">Uncompromising Quality</span>
              <div className="w-3 h-3 bg-white rounded-full" />
              <span className="text-white text-4xl md:text-6xl font-light tracking-tighter italic">Designed for Life</span>
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
          ))}
        </div>
      </section>
<div className="mt-5"> 
     <Footer/>

     </div>

      {/* Marquee CSS Integration */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
};

export default Product;