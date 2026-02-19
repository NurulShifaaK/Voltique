import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setIsOpen(true)}
        >
          ☰
        </button>

        <h1 className="text-xl font-semibold text-gray-800">
          Admin Panel
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-gray-600 font-medium">
          <Link to="/admindashboard" className="hover:text-black transition">
            Dashboard
          </Link>

          <Link to="/adminorder" className="hover:text-black transition">
            Orders
          </Link>

            <Link 
            to="/usermanagement"
            className="hover:text-black transition">
            UserManagement
            </Link>
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0  bg-opacity-30 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Left Slide Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            className="text-xl"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col p-6 gap-6 text-gray-700 font-medium">
          <Link
            to="/admindashboard"
            onClick={() => setIsOpen(false)}
            className="hover:text-black transition"
          >
            Dashboard
          </Link>

          <Link
            to="/adminorder"
            onClick={() => setIsOpen(false)}
            className="hover:text-black transition"
          >
            Orders
          </Link>

          
          <Link
           to="/usermanagement"
            onClick={() => setIsOpen(false)}
            className="hover:text-black transition"
          >
            Usermanagement
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
