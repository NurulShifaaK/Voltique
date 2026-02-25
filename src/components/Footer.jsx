import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Send, MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const primaryColor = "#8E7DBE";

  return (
    <footer className="bg-white pt-24 pb-10 font-sans border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-1 space-y-8">
            <div className="space-y-4">
                <motion.h1 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-2xl font-serif italic tracking-tighter text-gray-900"
                >
                SDL <span style={{ color: primaryColor }}>BOUTIQUE</span>
                </motion.h1>
                <p className="text-gray-500 leading-relaxed text-[14px] font-light">
                Redefining modern modesty with premium fabrics and timeless silhouettes. 
                Our mission is to empower elegance in every stitch.
                </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3, color: primaryColor }}
                  className="text-gray-400 transition-colors duration-300"
                >
                  <Icon size={20} strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links Group */}
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
            <FooterColumn 
              title="Shop" 
              links={["Abayas", "Hijabs", "Modest Wear", "New Arrivals"]} 
              primaryColor={primaryColor}
            />
            <FooterColumn 
              title="Care" 
              links={["Size Guide", "Shipping Policy", "Returns", "FAQs"]} 
              primaryColor={primaryColor}
            />
            <div className="space-y-5">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Visit Us</h4>
                <ul className="space-y-4 text-[14px] text-gray-500 font-light">
                    <li className="flex items-start gap-3">
                        <MapPin size={16} style={{ color: primaryColor }} className="mt-1 flex-shrink-0" />
                        <span>123 Elegance Row,<br />Dubai, UAE</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <Phone size={16} style={{ color: primaryColor }} className="flex-shrink-0" />
                        <span>+971 50 123 4567</span>
                    </li>
                </ul>
            </div>
          </div>

          {/* Newsletter Card */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-8 rounded-[2.5rem] space-y-5 border border-gray-100">
              <div className="space-y-2">
                <h4 className="font-serif italic text-lg text-gray-900">Join the Circle</h4>
                <p className="text-[12px] text-gray-500 leading-tight">Subscribe for exclusive collection previews and modest styling tips.</p>
              </div>
              
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your Email"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-xs outline-none focus:border-[#8E7DBE] transition-all"
                />
                <button 
                  className="absolute right-2 top-2 p-2.5 rounded-xl text-white transition-all hover:scale-105 active:scale-95"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <p className="text-gray-400 text-[12px] tracking-wide">
              &copy; {currentYear} AL-VOGUE BOUTIQUE. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-4 text-[11px] text-gray-400 uppercase tracking-widest font-medium">
                <Link to="#" className="hover:text-gray-900 transition-colors">Privacy</Link>
                <Link to="#" className="hover:text-gray-900 transition-colors">Terms</Link>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Excellence in Modesty</span>
            <div className="w-8 h-[1px] bg-gray-200"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper component for clean columns
const FooterColumn = ({ title, links, primaryColor }) => (
  <div className="space-y-6">
    <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">{title}</h4>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link}>
          <Link 
            to="#" 
            className="text-gray-500 hover:text-gray-900 transition-all text-[14px] font-light block"
          >
            <motion.span whileHover={{ x: 3 }}>{link}</motion.span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;