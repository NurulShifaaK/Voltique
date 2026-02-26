import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Rocket, Mail, Lock, ArrowRight, CheckCircle2, AlertCircle, X, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";
import loginbg from "../assets/login.jpeg";

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

      localStorage.setItem("userLoggedIn", "true");
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("userid", user._id);

      showToast("Welcome back!", "success");

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
      showToast(error.response?.data?.message || "Invalid credentials", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const testimonials = [
    {
      id: 1,
      name: "SDL Creative",
      initials: "SC",
      text: "Experience premium quality and seamless performance with every login.",
      color: "from-violet-400 to-purple-500"
    },
    {
      id: 2,
      name: "Secure Access",
      initials: "SA",
      text: "Your security is our priority. Enterprise-grade protection for your account.",
      color: "from-blue-400 to-indigo-500"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

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

      {/* --- LEFT SECTION (Image Background) --- */}
      <div className="flex-1 hidden md:flex relative overflow-hidden">
        {/* Main Background Image */}
        <img 
          src={loginbg} 
          alt="Login background" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 w-full h-full p-12 flex flex-col justify-between text-white">
          <Link to="/" className="text-2xl lg:text-3xl flex items-center gap-3 font-bold tracking-tighter italic">
            <div className="w-10 h-8 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg border border-white/30">
              <img src={logo} className="w-6 h-6 object-contain" alt="Logo" />
            </div>
            <span>SDL CREATIVE GROUPS</span>
          </Link>

          <div className="max-w-md">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl text-white/60 font-bold leading-tight"
            >
              Welcome back to <br/> Modest Elegance.
            </motion.h1>
            <p className="text-white/60 mt-6 leading-relaxed">
              Login to access your dashboard, track your creative orders, and explore our premium collections.
            </p>
          </div>

          {/* Testimonial slider */}
          <div className="h-24 relative max-w-sm bg-black/20 backdrop-blur-lg p-6 rounded-3xl border border-white/10">
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
                  <p className="text-white/90 text-sm italic leading-snug">"{testimonials[currentTestimonial].text}"</p>
                  <p className="text-white/50 text-[10px] uppercase tracking-widest mt-2">{testimonials[currentTestimonial].name}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* --- RIGHT SECTION (Form) --- */}
      <div className="flex-1 flex flex-col px-6 sm:px-12 justify-center bg-white">
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="w-full max-w-md mx-auto"
        >
          <div className="mb-10 text-center md:text-left">
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
                  className="w-full px-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8E7DBE] transition-all text-gray-900 shadow-sm"
                  type="email"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Password</label>
                <button type="button" className="text-[10px] font-bold text-[#8E7DBE] hover:text-black uppercase tracking-widest transition-colors">
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input
                  value={loginpass}
                  onChange={(e) => setloginpass(e.target.value)}
                  className="w-full px-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8E7DBE] transition-all text-gray-900 shadow-sm"
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
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-[#8E7DBE] hover:bg-black hover:scale-[1.01] active:scale-[0.99] shadow-purple-900/20"
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
              <span className="bg-white px-4 text-gray-400 font-medium">Secure Login</span>
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#8E7DBE] font-bold hover:underline ml-1">
              Create Account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;