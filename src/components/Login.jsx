import React, { useState } from "react";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const Login = () => {
     const API = "https://app-product-qh1f.onrender.com/api/v1"
  const navigate = useNavigate();
  const[loginemail,setloginemail]=useState("");
  const[loginpass,setloginpass]=useState("");
  const[message,setmessage]=useState("")



const handlelogin = async () => {
  try {
    const res = await axios.post(`${API}/login`, {
      email: loginemail,
      password: loginpass,
    });

     console.log(res.data.user)
    const user = res.data.user;

    localStorage.setItem("userLoggedIn", "true"); 
    localStorage.setItem("userRole", user.role);  
    localStorage.setItem("userid",user._id);

    // console.log(user._id)
      
const roleRedirect = {
  USER: "/products",
  ADMIN: "/admindashboard",
  SUPERADMIN: "/superadmindashboard",
};

const from = location.state?.from || roleRedirect[user.role] || "/";
navigate(from, { replace: true });



    navigate(from, { replace: true });
  } catch (error) {
    console.error(error.response.data);
    alert("Invalid credentials or server error");
  }
};


  return (
    <div className="bg-gray-300 min-h-screen flex items-center justify-center p-4">
      
      {/* Card Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[900px] h-auto md:h-[550px] bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden"
      >

        {/* Left Side (Dark Section) */}
        <div className="w-full md:w-1/2 bg-gray-800 relative flex items-center justify-center p-12 overflow-hidden">
          
          {/* Decorative Shapes with subtle animation */}
          <motion.div 
            animate={{ rotate: [45, 48, 45] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[400px] h-[400px] bg-gray-600 rotate-45 -left-32"
          ></motion.div>
          <motion.div 
            animate={{ rotate: [45, 42, 45] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[300px] h-[300px] bg-gray-500 rotate-45 -left-20"
          ></motion.div>

          <div className="z-10 text-white text-center">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Welcome Back
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-300 font-medium"
            >
              Sign in to continue your journey
            </motion.p>
          </div>
        </div>

        {/* Right Side (Form Section) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-10 bg-white">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center mb-8"
          >
            <div className="bg-gray-800 p-4 rounded-full shadow-lg mb-4">
              <User size={28} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-gray-800 tracking-widest uppercase">Login</h2>
          </motion.div>

          {/* Email Input */}
          <div className="mb-6 border-b border-gray-200">
            <div className="flex items-center py-2 group">
              <Mail className="text-gray-400 mr-3 group-focus-within:text-gray-800 transition-colors" size={18} />
              <input
                type="email"
                value={loginemail}
                onChange={(e)=>{setloginemail(e.target.value)}}
                placeholder="Email"
                className="w-full outline-none bg-transparent text-gray-700 placeholder:text-gray-400 font-medium"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4 border-b border-gray-200">
            <div className="flex items-center py-2 group">
              <Lock className="text-gray-400 mr-3 group-focus-within:text-gray-800 transition-colors" size={18} />
              <input
                type="password"
                value={loginpass}
                onChange={(e)=>{setloginpass(e.target.value)}}
                placeholder="Password"
                className="w-full outline-none bg-transparent text-gray-700 placeholder:text-gray-400 font-medium"
              />
            </div>
          </div>

          <div className="text-right mb-6">
            <span className="text-xs font-bold text-gray-400 hover:text-gray-800 cursor-pointer uppercase tracking-tighter transition-colors">
              Forgot Password?
            </span>
          </div>

          {/* Login Button */}
          <motion.button 
          onClick={handlelogin}
            whileHover={{ scale: 1.02, backgroundColor: "#1f2937" }}
            whileTap={{ scale: 0.98 }}
            className="bg-gray-800 text-white py-3 rounded-full font-bold shadow-lg transition-all"
          >
            LOGIN
          </motion.button>

          {/* Bottom Navigation */}
          <div className="mt-10 text-center">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">New here?</p>
            <div className="flex justify-center gap-4">
              <motion.button 
                whileHover={{ backgroundColor: "#f3f4f6" }}
                onClick={() => navigate("/register")}
                className="border border-gray-300 px-6 py-2 rounded-full font-bold text-gray-700 transition-colors"
              >
                Sign Up
              </motion.button>
              <motion.button 
                whileHover={{ backgroundColor: "#f3f4f6" }}
                className="border border-gray-300 px-6 py-2 rounded-full font-bold text-gray-700 flex items-center gap-2 transition-colors"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="google" />
                Google
              </motion.button>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default Login;