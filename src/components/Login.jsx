import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Rocket, Mail, Lock, ArrowRight, CheckCircle2, AlertCircle, X, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";

const Login = () => {
  const API = "https://app-product-qh1f.onrender.com/api/v1";
  const navigate = useNavigate();
  const location = useLocation();

  // Form State
  const [loginemail, setloginemail] = useState("");
  const [loginpass, setloginpass] = useState("");
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

  // --- HANDLE LOGIN ---
  const handlelogin = async (e) => {
    if (e) e.preventDefault();
    
    if (!loginemail || !loginpass) {
      showToast("Please enter both email and password", "error");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(`${API}/login`, {
        email: loginemail,
        password: loginpass,
      });

      const user = res.data.user;

      // Store Auth Data
      localStorage.setItem("userLoggedIn", "true");
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("userid", user._id);

      showToast("Welcome back!", "success");

      // Role-based Redirect Logic
      const roleRedirect = {
        USER: "/products",
        ADMIN: "/admindashboard",
        SUPERADMIN: "/superadmindashboard",
      };

      const from = location.state?.from || roleRedirect[user.role] || "/";
      
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);

    } catch (error) {
      console.error(error.response?.data);
      showToast(error.response?.data?.message || "Invalid credentials", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // --- TESTIMONIAL DATA (Sync with Register for consistency) ---
  const testimonials = [
    {
      id: 1,
      name: "Voltique Premium",
      initials: "VP",
      text: "Returning to the hub of innovation? Your personalized collection is waiting.",
      color: "from-violet-400 to-purple-500"
    },
    {
      id: 2,
      name: "Smart Secure",
      initials: "SS",
      text: "Enterprise-grade security keeps your data and transactions protected.",
      color: "from-blue-400 to-indigo-500"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // --- ANIMATION VARIANTS ---
  const floatingAnimation = (duration) => ({
    y: [0, -25, 0],
    transition: { duration: duration, repeat: Infinity, ease: "easeInOut" },
  });

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

      {/* --- LEFT SECTION (Visual/Dark) --- */}
      <div className="relative flex-1 px-8 lg:px-12 py-8 hidden md:flex flex-col justify-between overflow-hidden bg-blue-950">
        
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div animate={floatingAnimation(4)} className="absolute top-1/4 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <motion.div animate={floatingAnimation(6)} className="absolute bottom-1/4 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: '32px 32px' }} />
        </div>

        <div className="relative z-10 flex flex-col justify-between h-full text-white">
          <Link to="/" className="text-2xl lg:text-3xl flex items-center gap-3 font-bold tracking-tighter italic">
            <div className="w-10 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <img src={logo}/>
            </div>
            <span>SDL CREATIVE GROUPS</span>
          </Link>

          <div className="max-w-md">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-5xl font-bold leading-tight"
            >
              Welcome back to the future.
            </motion.h1>
            <p className="text-white/60 mt-6 leading-relaxed">
              Login to access your dashboard, track orders, and explore our newest arrivals in premium technology.
            </p>
          </div>

          {/* Testimonial slider */}
          <div className="h-24 relative max-w-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-start gap-4"
              >
                <div className={`shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${testimonials[currentTestimonial].color} flex items-center justify-center text-xs font-bold`}>
                  {testimonials[currentTestimonial].initials}
                </div>
                <div>
                  <p className="text-white/80 text-sm italic leading-snug">"{testimonials[currentTestimonial].text}"</p>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest mt-2">{testimonials[currentTestimonial].name}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* --- RIGHT SECTION (Form) --- */}
      <div className="flex-1 flex flex-col px-6 sm:px-12 justify-center bg-gray-50">
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="w-full max-w-md mx-auto"
        >
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Sign In</h1>
            <p className="text-sm text-gray-500 mt-2">Enter your credentials to access your account.</p>
          </div>

          <form onSubmit={handlelogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input
                  value={loginemail}
                  onChange={(e) => setloginemail(e.target.value)}
                  className="w-full px-12 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-gray-900 shadow-sm"
                  type="email"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Password</label>
                <button type="button" className="text-[10px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-widest">
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input
                  value={loginpass}
                  onChange={(e) => setloginpass(e.target.value)}
                  className="w-full px-12 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-gray-900 shadow-sm"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className={`w-full py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-3 transition-all shadow-xl
                ${isLoading 
                  ? "bg-blue-400 cursor-not-allowed" 
                  : "bg-blue-950 hover:bg-black hover:scale-[1.01] active:scale-[0.99] shadow-blue-900/20"
                }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  SIGN IN
                </>
              )}
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-50 px-4 text-gray-400 font-medium">Or log in with</span>
            </div>
          </div>

          <div className="flex gap-4 mb-10">
             <button className="flex-1 flex items-center justify-center gap-2 py-3.5 border border-gray-200 rounded-2xl hover:bg-white hover:shadow-md transition-all font-semibold text-gray-700 bg-white/50">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="google" />
                Google
             </button>
          </div>

          <p className="text-center text-gray-500 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 font-bold hover:underline ml-1">
              Create Account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;