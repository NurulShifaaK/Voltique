import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Voltique</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 font-medium">
          <Link to="/" className="hover:text-gray-600">Home</Link>
          <Link to="/products" className="hover:text-gray-600">Products</Link>
           <Link to="/cart" className="hover:text-gray-600">Cart</Link>
            <Link to="/orders" className="hover:text-gray-600">Order</Link>
               <Link to="/login" className="hover:text-gray-600">Logout</Link>

        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Menu size={28} onClick={() => setOpen(true)} />
        </div>
      </nav>

      {/* Overlay */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <X size={28} onClick={() => setOpen(false)} />
        </div>

        {/* Links */}
        <div className="flex flex-col gap-6 px-6 text-lg font-medium">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setOpen(false)}>Products</Link>
          <Link to="/cart" onClick={() => setOpen(false)}>Cart</Link>
          <Link to="/orders" onClick={() => setOpen(false)}>Order</Link>
           <Link to="/login" onClick={() => setOpen(false)}>Logout</Link>

        </div>
      </div>
    </>
  );
};

export default Navbar;

