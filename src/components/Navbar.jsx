import React, { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, User, Search, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png"

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Scroll effect for dynamic styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Orders", path: "/orders" },
    { name: "Cart", path: "/cart" },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-[100] transition-all duration-500 px-6 md:px-12 py-2 flex items-center justify-between ${
          scrolled ? "bg-white/80 backdrop-blur-xl py-3  shadow-sm" : "bg-transparent"
        }`}
      >
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 group">
        

      <div>
            <img className="w-6 h-6 sm:h-13 sm:w-13 bg-white" src={logo}/>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path} 
              className={`relative text-[15px] font-bold uppercase  transition-colors ${
                location.pathname === link.path ? "text-blue-950" : "text-gray-400 hover:text-black"
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div 
                  layoutId="navUnderline"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-blue-950"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-5 text-gray-500">
          <button className="hover:text-black transition-colors hidden sm:block"><Search size={18} /></button>
          <Link to="/cart" className="relative hover:text-black transition-colors">
            <ShoppingBag size={18} />
            <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-white text-[8px] w-3 h-3 rounded-full flex items-center justify-center font-bold">0</span>
          </Link>
          <Link to="/login" className="hover:text-black transition-colors hidden sm:block"><User size={18} /></Link>
          <button className="md:hidden hover:text-black transition-colors" onClick={() => setOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Luxury Sidebar Overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[110]"
              onClick={() => setOpen(false)}
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-[300px] bg-white z-[120] p-8 shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-16">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">Menu</span>
                <button onClick={() => setOpen(false)} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={link.name}
                  >
                    <Link 
                      to={link.path} 
                      onClick={() => setOpen(false)}
                      className="text-2xl font-light italic tracking-tight hover:text-[#D4AF37] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto border-t border-gray-100 pt-8 flex items-center justify-between">
                <Link to="/login" className="text-xs font-bold flex items-center gap-2 text-gray-400 hover:text-black transition-colors">
                  <LogOut size={16} /> Logout
                </Link>
                <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;