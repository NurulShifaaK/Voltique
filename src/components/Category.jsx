import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { ArrowLeft, Heart, ShoppingBag, Eye, ChevronRight, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Category = () => {
    const API = "https://app-product-qh1f.onrender.com/api/v1";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartValue, setCartValue] = useState({});
  const [filterData, setFilterData] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    style: null,
    fabric: null,
    color: null
  });

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const category = location.state?.category || query.get("category");

  // ================================
  // GET FILTER ASSETS
  // ================================
  const handleGetAllFilters = async () => {
    try {
      const res = await axios.get(`${API}/filters`);
      setFilterData(res.data.filters.rawDetails || []);
    } catch (err) {
      console.error("Filter fetch error:", err);
    }
  };

  // ================================
  // TOGGLE FILTER
  // ================================
  const toggleFilter = (type, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [type]: prev[type] === value ? null : value
    }));
  };

  // ================================
  // CLEAR FILTERS
  // ================================
  const clearAllFilters = () => {
    setActiveFilters({
      style: null,
      fabric: null,
      color: null
    });
  };

  // ================================
  // FETCH PRODUCTS WITH FILTERS
  // ================================
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();
      params.append("category", category);

      if (activeFilters.style) {
        params.append("categorywears", activeFilters.style);
      }

      if (activeFilters.fabric) {
        params.append("clothType", activeFilters.fabric);
      }

      if (activeFilters.color) {
        params.append("colors", activeFilters.color);
      }

      const res = await axios.get(
        `${API}/products/category?${params.toString()}`
      );

      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Product fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // EFFECTS
  // ================================
  useEffect(() => {
    handleGetAllFilters();
  }, []);

  useEffect(() => {
    if (category) fetchProducts();
  }, [category, activeFilters]);

  const handleCart = (id, e) => {
    e.stopPropagation();
    setCartValue(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  // ================================
  // LOADING STATE
  // ================================
  if (loading)
    return (
      <div className="h-screen bg-white flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-100 border-t-[#8E7DBE] rounded-full animate-spin mb-4" />
        <p className="text-[#0A2540] font-black uppercase tracking-widest text-xs">
          Loading {category}...
        </p>
      </div>
    );

  return (
    <div className="bg-[#fcfcfc] min-h-screen text-slate-900 font-sans pb-20">
      <Navbar />

      {/* HERO HEADER */}
      <section className="relative h-[350px] bg-[#8E7DBE] flex flex-col justify-center items-center px-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center z-10"
        >
          <button
            onClick={() => navigate("/products")}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-6 flex items-center justify-center gap-2 mx-auto hover:opacity-70 transition-all"
          >
            <ArrowLeft size={14} /> All Collections
          </button>

          <h1 className="text-5xl md:text-7xl font-light tracking-tighter italic text-white capitalize">
            {category}
            <span className="text-white/30 font-bold not-italic">.</span>
          </h1>
        </motion.div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black text-white/5 -z-0 select-none uppercase tracking-tighter">
          {category}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">

        {/* FILTER SECTION */}
        <div className="mb-12 mt-20 space-y-8">

          {/* STYLE FILTER */}
          <div className="flex flex-wrap items-center gap-6">
            {filterData
              .filter(i => i.wearsname && i.wearsimage?.url)
              .map(item => (
                <button
                  key={item._id}
                  onClick={() => toggleFilter("style", item.wearsname)}
                  className="flex flex-col items-center gap-2 group outline-none"
                >
                  <div
                    className={`w-14 h-14 rounded-full p-0.5 border-2 transition-all ${
                      activeFilters.style === item.wearsname
                        ? "border-[#8E7DBE] scale-110 shadow-lg"
                        : "border-slate-100 group-hover:border-slate-300"
                    }`}
                  >
                    <img
                      className="w-full h-full rounded-full object-cover"
                      src={item.wearsimage.url}
                      alt={item.wearsname}
                    />
                  </div>
                  <span
                    className={`text-[9px] font-bold uppercase tracking-tighter ${
                      activeFilters.style === item.wearsname
                        ? "text-[#8E7DBE]"
                        : "text-slate-400"
                    }`}
                  >
                    {item.wearsname}
                  </span>
                </button>
              ))}
          </div>

          {/* FABRIC + COLOR */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-6">
            <div className="flex flex-wrap items-center gap-3">

              {/* FABRIC */}
              {[...new Set(filterData.map(item => item.clothname))]
                .filter(c => c?.trim())
                .map((cloth, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleFilter("fabric", cloth)}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-bold border transition-all ${
                      activeFilters.fabric === cloth
                        ? "bg-slate-900 border-slate-900 text-white"
                        : "border-slate-200 text-slate-500 hover:border-slate-400"
                    }`}
                  >
                    {cloth}
                  </button>
                ))}

              {/* COLOR */}
              {/* <div className="h-4 w-[1px] bg-slate-200 mx-2" /> */}

              {/* {filterData
                .filter(i => i.colors?.trim())
                .map(item => (
                  <button
                    key={item._id}
                    onClick={() => toggleFilter("color", item.colors)}
                    style={{ backgroundColor: `#${item.colors}` }}
                    className={`w-5 h-5 rounded-full border-2 border-white ring-1 transition-all hover:scale-125 ${
                      activeFilters.color === item.colors
                        ? "ring-[#8E7DBE] scale-125"
                        : "ring-slate-100"
                    }`}
                  />
                ))} */}


            </div>

            {/* CLEAR */}
            {(activeFilters.style ||
              activeFilters.fabric ||
              activeFilters.color) && (
              <button
                onClick={clearAllFilters}
                className="text-[10px] font-bold text-rose-500 flex items-center gap-1 hover:underline"
              >
                <X size={12} /> Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {products.map((item, idx) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group"
              >
                <div className="relative aspect-[4/5] bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden mb-6 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-[#8E7DBE]/10">
                  <img
                    src={item.images[0]?.url || "/placeholder.png"}
                    alt={item.name}
                    className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                <div className="px-2">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-lg font-bold text-slate-800 line-clamp-1 tracking-tight w-2/3">
                      {item.name}
                    </h2>
                      <span className=" line-through px-3 text-lg font-light text-[#8E7DBE]">
                      ₹{item.price.toLocaleString()}
                    </span>
                    <span className="text-lg font-bold text-[#8E7DBE]">
                      ₹{item.offerprice.toLocaleString()}
                    </span>
                   
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/singleproduct/${item._id}`)
                    }
                    className="w-full py-4 bg-[#8E7DBE] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-lg hover:bg-[#7a6aad] transition-all flex items-center justify-center gap-2"
                  >
                    View Details <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* EMPTY STATE */}
        {products.length === 0 && (
          <div className="text-center py-40 bg-white rounded-[3rem] border border-dashed border-slate-200">
            <ShoppingBag size={60} className="mx-auto text-slate-100 mb-6" />
            <h2 className="text-2xl font-black text-slate-800">
              Collection Empty
            </h2>
            <p className="text-slate-400 mt-2">
              No products found with selected filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;