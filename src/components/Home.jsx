import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
 import iphone from "../assets/phone.jpeg";
 import mac from "../assets/lap.jpeg";
 import watch from "../assets/watch.jpeg";
import head from "../assets/headphone.jpeg";

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Premium Gadgets",
      subtitle: "in Voltique",
      desc: "Shop the latest electronics crafted for speed, style, and seamless performance.",
      img: "https://i.pinimg.com/1200x/a2/bd/77/a2bd772fa3e1bd696391fb57ac2cb9ba.jpg",
    //   color: "from-blue-600 to-cyan-400"
    },
    {
      title: "Precision Time",
      subtitle: "Watch Series 11",
      desc: "More than just a watch. A complete health and performance tracker for your wrist.",
      img: watch,
      //color: "from-orange-500 to-red-600"
    },
    {
      title: "Powerful Computing",
      subtitle: "MacBook Pro",
      desc: "Built for creators, engineered for power. Unleash your full potential.",
      img: mac,
      //color: "from-gray-700 to-black"
    }
  ];

  // Auto-slide Hero Section
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlecategory = (category) => {
    navigate("/category", { state: { category } });
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className=" min-h-screen flex flex-col overflow-x-hidden selection:bg-black selection:text-white">
      <Navbar />

      <main className="max-w-7xl bg-gray-100 mx-auto px-4 md:px-8 py-3 flex-1 w-full mt-16">
        
        {/* --- Hero Section with Auto-Slider --- */}
        <div className="relative h-[410px] md:h-[500px] w-full overflow-hidden rounded-3xl shadow-2xl border border-gray-100 bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col md:flex-row items-center justify-between p-6 md:p-16"
            >
              <div className="md:w-1/2 flex flex-col gap-2 sm:gap-5 text-center md:text-left z-10">
                <motion.h1 
                  className="text-2xl md:text-6xl font-black tracking-tighter text-gray-900"
                >
                  {heroSlides[currentSlide].title} <br /> 
                  <span className={`${heroSlides[currentSlide].color}`}>
                    {heroSlides[currentSlide].subtitle}
                  </span>
                </motion.h1>
                <p className="sm:text-lg text-sm text-gray-500 sm:leading-relaxed max-w-md mx-auto md:mx-0">
                  {heroSlides[currentSlide].desc}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0,0,0,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/products")}
                  className="bg-blue-950 text-white text-sm sm:text-lg font-bold px-6 sm:px-8 sm:py-4 py-1 rounded-full w-fit mx-auto md:mx-0"
                >
                  Explore Products
                </motion.button>
              </div>

              <div className="md:w-1/2 flex justify-center md:mt-0 relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${heroSlides[currentSlide].color} blur-[120px] opacity-20 rounded-full animate-pulse`}></div>
                <motion.img
                  src={heroSlides[currentSlide].img}
                  alt="Slide"
                  className="w-full max-w-sm h-40 md:h-96 object-contain z-10"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 transition-all duration-300 rounded-full ${currentSlide === idx ? "w-8 bg-black" : "w-2 bg-gray-300"}`}
              />
            ))}
          </div>
        </div>

        {/* --- Infinite Brand Ticker --- */}
        <div className="relative sm:py-20 py-5 overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap gap-10 items-center"
            animate={{ x: [0, -1500] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="flex items-center sm:gap-6 gap-4 group">
                <span className="sm:text-7xl text-xl font-black text-blue-800 group-hover:text-blue-500 transition-all duration-500 outline-text">
                  0{item}
                </span>
                <span className="sm:text-2xl font-bold text-blue-950 uppercase tracking-widest group-hover:text-black transition-all">
                  Voltique Exclusive
                </span>
              </div>
            ))}
          </motion.div>
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-70 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-70 to-transparent z-10"></div>
        </div>

        {/* --- Category Grid --- */}
        <section >
          <motion.h2 initial="hidden" whileInView="visible" variants={fadeUp} className="sm:text-4xl text-2xl font-bold text-center mb-8">
            Shop by Category
          </motion.h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 sm:gap-8 gap-2">
            {[
              { img: iphone, cat: "iPhone", color: "hover:border-blue-500" },
              { img: mac, cat: "Mac", color: "hover:border-purple-500" },
              { img: watch, cat: "Watch", color: "hover:border-orange-500" },
              { img: head, cat: "Headphones", color: "hover:border-pink-500" }
            ].map(({ img, cat, color }) => (
              <motion.div
                key={cat}
                onClick={() => handlecategory(cat)}
                whileHover={{ y: -15, scale: 1.02 }}
                className={`group cursor-pointer bg-white sm:p-8 p-4 rounded-2xl border-2 border-transparent shadow-xl transition-all duration-500 flex flex-col items-center`}
              >
                <div className="w-full flex items-center justify-center mb-6">
                  <img src={img} alt={cat} className="w-full h-[200px] object-contain group-hover:rotate-6 transition-transform duration-500" />
                </div>
                <h3 className="sm:text-xl font-bold text-gray-800">{cat}</h3>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Automatically Sliding Testimonials --- */}
        <section className="sm:mt-12 mt-6  ">
          <motion.h2 className="sm:text-4xl text-xl font-black text-center sm:mb-15 mb-5 tracking-tight">Voices of Voltique</motion.h2>
          <div className="relative overflow-hidden ">
            <motion.div 
              className="flex sm:gap-8"
              animate={{ x: [0, -2000] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            >
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-8">
                  {[
                    { name: "Aarav Mehta", role: "Tech Enthusiast", review: "Absolutely premium quality! The performance and build feel next level." },
                    { name: "Sneha Kapoor", role: "Designer", review: "Super smooth experience. The gadgets look stunning and work flawlessly." },
                    { name: "Rahul Sharma", role: "Entrepreneur", review: "Fast shipping and top-tier electronics. My go-to store for tech upgrades." },
                    { name: "Esha Verma", role: "Vlogger", review: "The camera quality on the new iPhone is insane. Voltique is the best!" }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 sm:w-[350px] w-[200px] mb-5">
                      <div className="flex mb-4 text-yellow-400 text-sm">★★★★★</div>
                      <p className="text-gray-600 text-[10px] italic sm:mb-8 mb-3 sm:text-lg leading-relaxed">"{item.review}"</p>
                      <div className="flex items-center gap-4">
                        <div className="sm:h-12 sm:w-12 h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                          {item.name[0]}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm sm:text-[14px] text-gray-900">{item.name}</h4>
                          <p className="sm:text-xs text-[10px] text-gray-400 font-bold uppercase tracking-widest">{item.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;