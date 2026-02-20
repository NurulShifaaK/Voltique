import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {  useNavigate } from "react-router-dom";
import { Menu, X, LayoutDashboard, PackagePlus, Users, ShoppingBag, LogOut } from "lucide-react";

const SuperAdminNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Dashboard", path: "/superadmindashboard", icon: LayoutDashboard },
    { name: "Products", path: "/productupload", icon: PackagePlus },
    { name: "Users", path: "/superadminusermanagement", icon: Users },
  ];

  return (
    <>
      {/* --- TOP NAVBAR --- */}
      <nav className="fixed w-full z-[100] bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-blue-950 rounded-lg flex items-center justify-center">
              <div className="h-3 w-3 bg-white rotate-45" />
            </div>
            <h1 className="text-lg font-bold text-blue-950 tracking-tight">
              SUPER <span className="font-light text-slate-400">ADMIN</span>
            </h1>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                    isActive 
                      ? "bg-blue-950 text-white shadow-lg shadow-blue-900/20" 
                      : "text-slate-500 hover:text-blue-950 hover:bg-slate-50"
                  }`}
                >
                  <link.icon size={16} />
                  {link.name}
                </Link>
              );
            })}
            
            <div className="h-6 w-[1px] bg-slate-200 mx-4" />
            
            <button className="p-2 text-slate-400 hover:text-rose-600 transition-colors">
              <LogOut size={20} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(true)}
              className="p-2 text-blue-950 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE SIDEBAR --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-blue-950/20 backdrop-blur-sm z-[110]"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar Content */}
            <div className="fixed top-0 left-0 h-full w-72 bg-white z-120 shadow-2xl flex flex-col">
              <div className="flex justify-between items-center px-4 py-3 border-b border-slate-100 bg-blue-950">
                <div className="flex items-center gap-2 ">
                  <div className="h-6 w-6 bg-white rounded" />
                  <h2 className=" font-bold text-white">Menu</h2>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-slate-400" />
                </button>
              </div>

              <div className="flex flex-col gap-2 p-4 flex-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold transition-all ${
                        isActive 
                          ? "bg-blue-950 text-white" 
                          : "text-slate-500 hover:bg-slate-50 hover:text-blue-950"
                      }`}
                    >
                      <link.icon size={18} />
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              <div className="p-6 border-t border-slate-100">
                <Link to={"/login"}>
                <button 
                
                className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold text-rose-500 hover:bg-rose-50 transition-all">
                  <LogOut size={18} />
                  LogOut
                </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Spacing for Fixed Nav */}
      <div className="h-20" />
    </>
  );
};

// Simple AnimatePresence wrapper if you aren't using framer-motion elsewhere, 
// otherwise just import it at the top.
const AnimatePresence = ({ children }) => <>{children}</>;

export default SuperAdminNav;