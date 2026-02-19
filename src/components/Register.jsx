import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const[name,setname]=useState("")
  const[email,setemail]=useState("")
  const[pass,setpass]=useState("")

  const handleregister=async()=>{
    const res=await axios.post("http://localhost:3000/api/v1/register",{
        name:name,
        email:email,
        password:pass
    })
    console.log(res)
    navigate("/login")
  }

  return (
    <div className="bg-gray-300 min-h-screen flex items-center justify-center p-4">
      
      {/* Main Card Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[900px] h-auto md:h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden"
      >

        {/* Left Side (Decorative) */}
        <div className="w-full md:w-1/2 bg-gray-800 relative flex items-center justify-center p-12 overflow-hidden">
          
          {/* Decorative Shapes with subtle floating animation */}
          <motion.div 
            animate={{ rotate: [45, 50, 45], x: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[450px] h-[450px] bg-gray-600 rotate-45 -left-32"
          ></motion.div>
          <motion.div 
            animate={{ rotate: [45, 40, 45], x: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[350px] h-[350px] bg-gray-500 rotate-45 -left-20"
          ></motion.div>

          <div className="z-10 text-white text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-4xl font-bold mb-4 tracking-tight">Join Voltique</h2>
              <p className="text-gray-300 font-medium">Step into the future of premium gadgets</p>
            </motion.div>
          </div>
        </div>

        {/* Right Side (Form) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-10 md:px-16 py-10 bg-white">
          
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col items-center mb-8"
          >
            <div className="bg-gray-800 p-4 rounded-full shadow-lg mb-4">
              <ShieldCheck size={28} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-gray-800 tracking-widest uppercase">Register</h2>
          </motion.div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* Full Name */}
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="border-b border-gray-200">
              <div className="flex items-center py-2 group">
                <User className="text-gray-400 mr-3 group-focus-within:text-gray-800 transition-colors" size={18} />
                <input
                  type="text"
                  value={name}
                  onChange={(e)=>{setname(e.target.value)}}
                  placeholder="Full Name"
                  className="w-full outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
                />
              </div>
            </motion.div>

            {/* Email */}
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="border-b border-gray-200">
              <div className="flex items-center py-2 group">
                <Mail className="text-gray-400 mr-3 group-focus-within:text-gray-800 transition-colors" size={18} />
                <input
                value={email}
                onChange={(e)=>{setemail(e.target.value)}}
                  type="email"
                  placeholder="Email Address"
                  className="w-full outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="border-b border-gray-200">
              <div className="flex items-center py-2 group">
                <Lock className="text-gray-400 mr-3 group-focus-within:text-gray-800 transition-colors" size={18} />
                <input
                value={pass}
                onChange={(e)=>{setpass(e.target.value)}}
                  type="password"
                  placeholder="Create Password"
                  className="w-full outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
                />
              </div>
            </motion.div>

            {/* Register Button */}
            <motion.button 
              whileHover={{ scale: 1.02, backgroundColor: "#1f2937" }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gray-800 text-white py-3 rounded-full font-bold shadow-lg mt-4 transition-all"
              onClick={handleregister}
            >
              SIGN UP
            </motion.button>
          </form>

          {/* Bottom Navigation */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 text-center"
          >
            <p className="text-sm text-gray-400 mb-4 font-medium italic">Already have an account?</p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => navigate("/login")}
                className="border border-gray-300 px-6 py-2 rounded-full font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Login
              </button>
              <button className="border border-gray-300 px-6 py-2 rounded-full font-bold text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="google" />
                Google
              </button>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default Register;