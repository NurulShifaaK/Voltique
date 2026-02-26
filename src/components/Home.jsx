import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Diamond, ShieldCheck, ShoppingBag, ArrowRight } from "lucide-react"; // Optional: npm install lucide-react
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();
  const API = "https://app-product-qh1f.onrender.com/api/v1";
//  const API="http://localhost:3000/api/v1"
  const [categories, setCategories] = useState([]);
  const [testimonal, settestimonal] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const primaryColor = "#8E7DBE";

  // --- New: Scroll Progress for Parallax ---
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API}/category`);
      setCategories(res.data.allcategory || []);
    } catch (err) {
      toast.error("Fetch Error");
    }
  };

  const handlecategory = (categoryName) => {
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

  useEffect(() => {
    if (testimonal.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const isMobile = window.innerWidth < 768;
        const maxIndex = isMobile ? testimonal.length - 1 : testimonal.length - 3;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [testimonal]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden selection:bg-[#8E7DBE] selection:text-white bg-white">
      <Navbar />

      {/* --- Enhanced Hero Section with Parallax --- */}
      <div className="relative overflow-hidden h-[500px] md:h-[650px]">
        <motion.div style={{ scale }} className="w-full h-full">
          <img
            className="w-full h-full object-cover brightness-[0.85]"
            src="https://i.pinimg.com/1200x/0f/ac/a0/0faca0106acafa81e3a9206701febbc4.jpg"
            alt="Main Banner"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white/10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-0 flex flex-col justify-center items-center text-center px-4"
        >
          <span className="text-white uppercase tracking-[0.5em] text-[10px] mb-4 bg-black/20 backdrop-blur-md px-4 py-1 rounded-full">New Season</span>
          <h1 className="text-5xl md:text-8xl font-serif italic text-white drop-shadow-2xl">
            The <span style={{ color: primaryColor }}>Abaya</span> Edit
          </h1>
          <p className="text-white/90 mt-6 max-w-lg text-sm md:text-base font-light tracking-wide leading-relaxed">
            Discover the perfect blend of tradition and modern luxury. Crafted for the woman of grace.
          </p>
        </motion.div>
      </div>

      <main className="max-w-7xl bg-gray-50/50 mx-auto px-4 md:px-8 py-3 flex-1 w-full mt-5 rounded-t-[3rem]">
        
        {/* --- Multi-Banner Slider Section (Existing) --- */}
        <div className="w-full py-10 overflow-hidden relative">
          <motion.div 
            className="flex gap-6"
            animate={{ 
              x: `calc(-${currentIndex * (window.innerWidth < 768 ? 100 : 33.33)}% - ${currentIndex * 1.5}rem)` 
            }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          >
            {testimonal.map((item) => {
              const hasBgImg = item.bgimg && item.bgimg[0] && item.bgimg[0].url;
              return (
                <div
                  key={item._id}
                  className="relative flex-shrink-0 w-full md:w-[calc(33.33%-1rem)] h-[250px] overflow-hidden group rounded-[2.5rem] shadow-xl transition-all duration-500 hover:shadow-2xl"
                  style={{
                    backgroundImage: hasBgImg ? `url(${item.bgimg[0].url})` : 'none',
                    backgroundColor: item.bgcolor ? `#${item.bgcolor.replace('#', '')}` : primaryColor,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {hasBgImg && <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />}

                  <div className="relative z-10 w-[65%] p-8 h-full flex flex-col justify-center text-white">
                    <h3 className="text-2xl font-black italic tracking-tighter leading-none mb-1 uppercase">
                      {item.imgtext || "Exclusive"}
                    </h3>
                    <p className="text-white/80 text-[11px] font-bold uppercase tracking-widest mb-4">
                      {item.imgsubtext || "Limited Edition"}
                    </p>
                    <button className="w-fit px-6 py-2 bg-white text-black rounded-full text-[10px] font-bold uppercase hover:bg-black hover:text-white transition-all transform hover:scale-110">
                      Shop Now
                    </button>
                  </div>

                  <div className="absolute right-[-10px] bottom-[-10px] w-1/2 h-full flex items-center justify-center">
                    {item.floatimg?.[0] && (
                      <motion.img
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        src={item.floatimg[0].url}
                        alt="promo"
                        className="w-full h-auto object-contain drop-shadow-2xl transform group-hover:rotate-6 transition-transform duration-500"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>

          <div className="flex justify-center mt-6 gap-3">
            {testimonal.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === currentIndex ? "w-12 bg-[#8E7DBE]" : "w-3 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

   

        {/* --- Infinite Brand Ticker (Existing) --- */}
        <div className="relative sm:py-16 py-8 overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap gap-10 items-center"
            animate={{ x: [0, -2000] }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="flex items-center sm:gap-10 gap-6 group">
                <span className="sm:text-8xl text-4xl font-black opacity-10" style={{ color: primaryColor }}>MODESTY</span>
                <span className="sm:text-4xl text-2xl font-light text-gray-300 uppercase tracking-[0.4em] group-hover:text-[#8E7DBE] transition-all">
                  AL-VOGUE
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* --- NEW SECTION: DYNAMIC LOOKBOOK --- */}
        <section className="py-16">
          <div className="flex flex-col mb-4 md:flex-row gap-4 h-[600px]">
            <motion.div 
               whileHover={{ flex: 1.5 }}
               className="flex-1 relative rounded-[3rem] overflow-hidden group transition-all duration-700"
            >
               <img className="w-full h-full object-cover" src="https://i.pinimg.com/736x/b0/41/ef/b041ef101f05b251886010c1fed7819a.jpg" alt="lookbook"/>
               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all"/>
               <div className="absolute bottom-10 left-10 text-white">
                  <h3 className="text-3xl font-serif italic">Evening Grace</h3>
                  <button className="mt-2 flex items-center gap-2 text-xs uppercase tracking-widest font-bold">Explore <ArrowRight size={14}/></button>
               </div>
            </motion.div>
            <div className="flex-1 flex flex-col  gap-4">
              <div className="flex-1 relative rounded-[3rem] overflow-hidden group">
                <img className="w-full h-full object-cover bg-amber-950/50" src="https://i.pinimg.com/1200x/0f/a0/43/0fa0432e69c76f03a48364ed66b1cf6e.jpg" alt="lookbook"/>
                <div className="absolute inset-0 bg-black/10"/>
              </div>
              <div className="flex-1  bg-[#8E7DBE] rounded-[3rem] p-10 flex flex-col justify-center text-white">
                
                <h2 className="text-4xl font-serif italic">Pure Nida Fabric</h2>
                <p className="mt-4 text-sm font-light opacity-80 leading-relaxed">Our fabrics are sourced from the finest mills to ensure breathability and an elegant drape that lasts a lifetime.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Collections Section (Existing) --- */}
        <section className="py-25 flex flex-col items-center">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase font-light text-gray-400 tracking-[0.5em]">Curated Selection</span>
            <h2 className="text-5xl md:text-6xl font-serif text-gray-800 italic font-light tracking-tight mt-2">
              The <span style={{ color: primaryColor }}>Collections</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-12 w-full">
            {categories.map((item, index) => (
              <motion.div
                key={item._id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -15 }}
                className="group cursor-pointer flex flex-col items-center"
                onClick={() => handlecategory(item.name)}
              >
                <div className="relative overflow-hidden w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-full shadow-lg group-hover:shadow-2xl transition-all border-4 border-white">
                  <img src={item.image?.url} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125 group-hover:rotate-3" />
                  <div className="absolute inset-0 bg-[#8E7DBE]/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-[2px]">
                    <p className="text-white font-black text-xs uppercase tracking-widest">View</p>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-[12px] md:text-[13px] font-bold uppercase tracking-[0.3em] text-gray-600 group-hover:text-[#8E7DBE] transition-colors duration-300">
                    {item.name}
                  </p>
                  <div className="h-[2px] w-0 group-hover:w-full bg-[#8E7DBE] mx-auto transition-all duration-700 mt-2 opacity-60" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Testimonials (Existing) --- */}
        <section className="mt-20 py-24 rounded-[4rem] relative overflow-hidden shadow-2xl" style={{ backgroundColor: primaryColor }}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-20 -mb-20 blur-3xl" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <h2 className="text-5xl font-light text-white italic mb-16 tracking-tight">Elegance Shared</h2>
            <div className="flex overflow-hidden">
              <motion.div 
                className="flex gap-10"
                animate={{ x: [0, -1200] }}
                transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-xl p-10 rounded-[3rem] border border-white/30 min-w-[350px] text-left">
                    <div className="flex gap-1 mb-4">
                      {[1,2,3,4,5].map(s => <Sparkles key={s} size={12} className="text-white opacity-80"/>)}
                    </div>
                    <p className="text-white text-lg italic mb-8 font-light leading-relaxed">"The fabric quality is unmatched. Beautifully crafted and the fit is absolutely perfect. Truly a vogue experience."</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-black border border-white/40 shadow-inner">V</div>
                      <div>
                        <span className="text-white font-bold text-sm block tracking-wide">Customer Reviews</span>
                        <span className="text-white/60 text-[10px] uppercase font-bold tracking-widest">Verified Buyer</span>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </main>

           {/* --- NEW SECTION: CRAFTSMANSHIP FEATURES --- */}
        <section className="py-20 grid grid-cols-1 md:grid-cols-4 gap-8 border-y border-gray-100 my-10">
          {[
            { icon: <Diamond size={24}/>, title: "Premium Fabric", text: "Pure Nida & French Crepe" },
            { icon: <ShieldCheck size={24}/>, title: "Hand-Stitched", text: "Artisan embroidery details" },
            { icon: <Sparkles size={24}/>, title: "Custom Fit", text: "Tailored to your measurements" },
            { icon: <ShoppingBag size={24}/>, title: "Fast Delivery", text: "Global shipping within 7 days" },
          ].map((item, i) => (
            <motion.div 
              whileHover={{ y: -10 }}
              key={i} 
              className="flex flex-col items-center text-center p-6 bg-white rounded-3xl shadow-sm border border-gray-50"
            >
              <div className="mb-4 p-4 rounded-2xl bg-gray-50" style={{ color: primaryColor }}>{item.icon}</div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-gray-800">{item.title}</h4>
              <p className="text-xs text-gray-400 mt-2">{item.text}</p>
            </motion.div>
          ))}
        </section>

      {/* --- NEW SECTION: NEWSLETTER / JOIN --- */}
      <section className="py-24 bg-white flex flex-col items-center px-6">
        <h2 className="text-3xl font-serif italic text-gray-800">Join the Al-Vogue Circle</h2>
        <p className="text-gray-400 mt-2 text-sm tracking-widest uppercase">Get 10% off your first purchase</p>
        <div className="mt-10 flex w-full max-w-md border-b-2 border-gray-100 py-2">
           <input type="email" placeholder="Your Email Address" className="flex-1 outline-none text-sm font-light uppercase tracking-widest px-4"/>
           <button className="font-bold text-xs uppercase tracking-[0.3em] px-6 py-2 hover:text-[#8E7DBE] transition-all">Subscribe</button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;