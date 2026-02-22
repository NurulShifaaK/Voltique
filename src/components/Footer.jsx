import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Soft font style classes
  const softFont = "font-sans tracking-tight";

  return (
    <footer className={`bg-white pt-20 pb-10 ${softFont}`}>
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-1 space-y-6">
            <motion.h1 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-3xl font-bold text-blue-950 tracking-tighter"
            >
              Voltique<span className="text-blue-500">.</span>
            </motion.h1>
            <p className="text-gray-500 leading-relaxed text-[15px]">
              Crafting premium audio experiences with precision and passion. 
              Join thousands of audiophiles worldwide.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, backgroundColor: "#020617", color: "#ffffff" }}
                  className="p-2.5 rounded-full bg-gray-50 text-gray-400 transition-all duration-300"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <FooterColumn 
              title="Products" 
              links={["Headphones", "Earbuds", "Accessories", "Gift Cards"]} 
            />
            <FooterColumn 
              title="Support" 
              links={["Help Center", "Shipping", "Returns", "Contact"]} 
            />
            <FooterColumn 
              title="Company" 
              links={["Our Story", "Careers", "Press", "Terms"]} 
            />
          </div>

          {/* Newsletter Card */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-8 rounded-[2rem] space-y-4 border border-gray-100">
              <h4 className="font-bold text-blue-950">Join the circle</h4>
              <p className="text-xs text-gray-500">Get early access to new drops and sonic updates.</p>
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Email address"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-950 transition-all"
                />
                <button className="absolute right-1.5 top-1.5 bg-blue-950 text-white p-2 rounded-lg hover:bg-blue-900 transition-all">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} <span className="text-blue-950 font-semibold">Voltique</span>. Built for sound.
          </p>
          
          <div className="flex items-center gap-8">
            <motion.div whileHover={{ x: 5 }} className="flex items-center gap-2 cursor-pointer">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">System Status: Optimal</span>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper component for clean columns
const FooterColumn = ({ title, links }) => (
  <div className="space-y-5">
    <h4 className="text-[13px] font-black uppercase tracking-widest text-blue-950 opacity-80">{title}</h4>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link}>
          <Link 
            to="#" 
            className="text-gray-500 hover:text-blue-950 transition-all text-[14px] font-medium"
          >
            {link}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;