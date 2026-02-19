import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">

        {/* Brand */}
        <h1 className="text-4xl font-bold mb-4">Voltique</h1>
        <p className="text-gray-400 max-w-md mb-8">
          Your one-stop shop for premium headphones from Apple, Sony,
          Samsung, and more.
        </p>

        {/* Links */}
        <div className="flex flex-wrap gap-6 mb-8 text-gray-300">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/products" className="hover:text-white transition">Products</Link>
          <Link to="/about" className="hover:text-white transition">About</Link>
          <Link to="/contact" className="hover:text-white transition">Contact</Link>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 mb-8">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <Facebook className="hover:text-blue-500 transition" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <Twitter className="hover:text-blue-400 transition" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <Instagram className="hover:text-pink-500 transition" />
          </a>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-gray-500 text-sm text-center">
          © 2026 Voltique. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
