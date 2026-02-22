import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Rocket, User, Mail, Lock, ArrowRight, CheckCircle2, AlertCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo2.jpeg";

const Register = () => {
  const API = "https://app-product-qh1f.onrender.com/api/v1";
  const navigate = useNavigate();
  
  // Form State
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Toast State
  const [toast, setToast] = useState({ show: false, message: "", type: "success" }); 

  // Testimonial State
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // --- TOAST HANDLER ---
  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  // --- HANDLE REGISTER ---
  const handleregister = async (e) => {
    e.preventDefault();

    if (!name || !email || !pass) {
      showToast("Please fill all the fields", "error");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(`${API}/register`, {
        name: name,
        email: email,
        password: pass
      });

      if (res.data) {
        showToast("Account Created Successfully!", "success");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.message || "Registration failed. Please try again.";
      showToast(errorMsg, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // --- TESTIMONIAL DATA ---
  const testimonials = [
    {
      id: 1,
      name: "Voltique Premium",
      initials: "VP",
      text: "Experience the next generation of sound with our curated audio collection.",
      color: "from-violet-400 to-purple-500"
    },
    {
      id: 2,
      name: "Smart Living",
      initials: "SL",
      text: "Intuitive gadgets that blend perfectly into your modern lifestyle.",
      color: "from-blue-400 to-indigo-500"
    },
    {
      id: 3,
      name: "Global Shipping",
      initials: "GS",
      text: "Fast, secure, and trackable delivery to your doorstep worldwide.",
      color: "from-pink-400 to-rose-500"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // --- ANIMATION VARIANTS ---
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const floatingAnimation = (duration) => ({
    y: [0, -30, 0],
    transition: { duration: duration, repeat: Infinity, ease: "easeInOut" },
  });

  const heading = "Step Into the Future of Tech.";

  return (
    <div className="relative min-h-screen flex bg-white font-sans">
      
      {/* --- TOAST COMPONENT --- */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 20 }}
            className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border ${
              toast.type === "success" 
                ? "bg-white border-green-500/20 text-green-700" 
                : "bg-white border-red-500/20 text-red-600"
            }`}
          >
            {toast.type === "success" ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <AlertCircle className="w-5 h-5 text-red-500" />}
            <p className="text-sm font-semibold">{toast.message}</p>
            <button onClick={() => setToast({ ...toast, show: false })} className="ml-2 hover:bg-gray-100 rounded-full p-1">
               <X className="w-4 h-4 text-gray-400" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- LEFT SECTION --- */}
      <div className="relative flex-1 px-8 lg:px-12 py-8 hidden md:flex flex-col justify-between overflow-hidden bg-blue-950">
        
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div animate={floatingAnimation(3)} className="absolute top-20 right-20 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl" />
          <motion.div animate={floatingAnimation(4)} className="absolute bottom-40 left-10 w-40 h-40 bg-indigo-400/20 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute -top-20 -right-20 w-96 h-96 border border-white/5 rounded-full" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full text-white">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl lg:text-3xl flex items-center gap-3 font-bold tracking-tighter italic">
            <div className="w-10 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
             <img  src={logo}/>
            </div>
            <span>SDL CREATIVE GROUPS</span>
          </motion.div>

          <motion.div variants={container} initial="hidden" animate="show" className="w-full max-w-md">
            <h1 className="flex flex-wrap text-4xl lg:text-5xl font-bold leading-tight">
              {heading.split(" ").map((word, index) => (
                <motion.span key={index} variants={itemAnimation} className="mr-2">{word}</motion.span>
              ))}
            </h1>
            <motion.p variants={itemAnimation} className="text-sm lg:text-base text-white/60 mt-6 leading-relaxed">
              Join our community of tech enthusiasts. Unlock premium gadgets, exclusive early-bird pricing, and a seamless shopping experience.
            </motion.p>
          </motion.div>

          {/* ROTATING TESTIMONIAL */}
          <div className="h-32 w-full max-w-md relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[currentTestimonial].id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 "
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${testimonials[currentTestimonial].color} flex items-center justify-center text-sm font-bold shadow-xl`}>
                    {testimonials[currentTestimonial].initials}
                  </div>
                  <div>
                    <p className="text-white/90 text-sm font-medium leading-relaxed italic">
                      "{testimonials[currentTestimonial].text}"
                    </p>
                    <p className="text-white/40 text-xs mt-1 uppercase tracking-widest">{testimonials[currentTestimonial].name}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* --- RIGHT SECTION (Form) --- */}
      <div className="flex-1 flex flex-col px-6 sm:px-12 p-6 justify-center bg-gray-50">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-md mx-auto">
          
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create Account</h1>
            <p className="text-sm text-gray-500 mt-2">Enter your details to start your journey.</p>
          </div>

          <form onSubmit={handleregister} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  className="w-full px-12 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-gray-900 shadow-sm"
                  type="text"
                  placeholder="e.g. Alex Carter"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="w-full px-12 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-gray-900 shadow-sm"
                  type="email"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input
                  value={pass}
                  onChange={(e) => setpass(e.target.value)}
                  className="w-full px-12 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-gray-900 shadow-sm"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className={`w-full py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2 transition-all shadow-xl mt-4
                ${isLoading 
                  ? "bg-blue-600 text-black cursor-not-allowed" 
                  : "bg-blue-950 hover:bg-black hover:scale-[1.02] shadow-blue-900/20"
                }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  GET STARTED
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-50 px-4 text-gray-400 font-medium">Or continue with</span>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
             <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-2xl hover:bg-gray-100 transition-colors font-semibold text-gray-700">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="google" />
                Google
             </button>
          </div>

          <p className="text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;