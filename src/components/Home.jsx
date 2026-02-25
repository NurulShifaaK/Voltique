import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();
    const API = "https://app-product-qh1f.onrender.com/api/v1";
  
  const [categories, setCategories] = useState([]);
  const [testimonal, settestimonal] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const primaryColor = "#8E7DBE";

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API}/category`);
      setCategories(res.data.allcategory || []);
    } catch (err) {
      toast.error("Fetch Error");
    }
  };

  const handlecategory = (categoryName) => {
    // Navigates to /category and passes the name via state
    navigate("/category", { state: { category: categoryName } });
  };

  const fetchallbanner = async () => {
    try {
      const res = await axios.get(`${API}/bannerupload`);
      settestimonal(res.data.banner || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchallbanner();
  }, []);

  // --- Auto-Slide Logic ---
  useEffect(() => {
    if (testimonal.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        // Logic for infinite loop
        // In Desktop (3 items), we stop at length - 3
        // In Mobile (1 item), we stop at length - 1
        const isMobile = window.innerWidth < 768;
        const maxIndex = isMobile ? testimonal.length - 1 : testimonal.length - 3;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 3000); // 3 Seconds pause

    return () => clearInterval(timer);
  }, [testimonal]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden selection:bg-[#8E7DBE] selection:text-white">
      <Navbar />

      <div>
          <img className="w-full h-[400px] object-cover" src="https://i.pinimg.com/1200x/0f/ac/a0/0faca0106acafa81e3a9206701febbc4.jpg"/>
      </div>

      <main className="max-w-7xl bg-gray-50 mx-auto px-4 md:px-8 py-3 flex-1 w-full mt-5">
        
        {/* --- Multi-Banner Slider Section --- */}
        <div className="w-full py-10 overflow-hidden relative">
          <motion.div 
            className="flex gap-6"
            animate={{ 
              // Moves the track based on current index
              // Mobile: 100% width, Desktop: ~33.33% width
              x: `calc(-${currentIndex * (window.innerWidth < 768 ? 100 : 33.33)}% - ${currentIndex * 1.5}rem)` 
            }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            {testimonal.map((item) => {
              const hasBgImg = item.bgimg && item.bgimg[0] && item.bgimg[0].url;
              return (
                <div
                  key={item._id}
                  className="relative flex-shrink-0 w-full md:w-[calc(33.33%-1rem)] h-[220px] overflow-hidden group rounded-[2rem] shadow-lg transition-all duration-500 hover:shadow-2xl"
                  style={{
                    backgroundImage: hasBgImg ? `url(${item.bgimg[0].url})` : 'none',
                    backgroundColor: item.bgcolor ? `#${item.bgcolor.replace('#', '')}` : primaryColor,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {hasBgImg && <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />}

                  {/* Text */}
                  <div className="relative z-10 w-[65%] p-6 h-full flex flex-col justify-center text-white">
                    <h3 className="text-xl font-black italic tracking-tighter leading-none mb-1 uppercase">
                      {item.imgtext || "Exclusive"}
                    </h3>
                    <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest">
                      {item.imgsubtext || "Limited"}
                    </p>
                    <button className="mt-4 w-fit px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-[9px] font-bold uppercase hover:bg-white hover:text-black transition-all">
                      View
                    </button>
                  </div>

                  {/* Floating Image */}
                  <div className="absolute right-[-10px] bottom-[-10px] w-1/2 h-full flex items-center justify-center">
                    {item.floatimg?.[0] && (
                      <img
                        src={item.floatimg[0].url}
                        alt="promo"
                        className="w-full h-auto object-contain drop-shadow-xl transform group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonal.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "w-8 bg-[#8E7DBE]" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* --- Infinite Brand Ticker --- */}
        <div className="relative sm:py-10 py-5 overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap gap-10 items-center"
            animate={{ x: [0, -1500] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          >
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="flex items-center sm:gap-6 gap-4 group">
                <span className="sm:text-7xl text-xl font-black opacity-30" style={{ color: primaryColor }}>0{item}</span>
                <span className="sm:text-3xl text-xl font-bold text-gray-400 uppercase tracking-widest group-hover:text-[#8E7DBE] transition-all">
                  AL-VOGUE BOUTIQUE
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* --- Collections Section --- */}
        <section className="py-10 flex flex-col items-center">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase font-light text-gray-400 tracking-[0.5em]">Curated Selection</span>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-800 italic font-light tracking-tight mt-2">
              The <span style={{ color: primaryColor }}>Collections</span>
            </h2>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-8 w-full">
            {categories.map((item, index) => (
              <motion.div
                key={item._id || index}
                whileHover={{ y: -10 }}
                className="group cursor-pointer flex flex-col items-center"
                onClick={() => handlecategory(item.name)}
              >
                <div className="relative overflow-hidden w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full shadow-md group-hover:shadow-xl transition-all">
                  <img src={item.image?.url} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                    <p className="text-white font-bold text-[10px] uppercase">{item.name}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Testimonials --- */}
        <section className="mt-20 py-16 rounded-[3rem] relative overflow-hidden" style={{ backgroundColor: primaryColor }}>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <h2 className="text-4xl text-center font-light text-white italic mb-12">Elegance Shared</h2>
            <div className="flex overflow-hidden">
              <motion.div 
                className="flex gap-8"
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              >
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/20 min-w-[300px]">
                    <p className="text-white italic mb-6">"The fabric quality is unmatched. Beautifully crafted."</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">F</div>
                      <span className="text-white font-bold text-sm">Customer {i}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;