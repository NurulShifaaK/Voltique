import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ShieldCheck, 
  ChevronRight, 
  Truck, 
  UserCheck, 
  ArrowLeft, 
  MonitorSmartphone, 
  Lock, 
  CreditCard, 
  Wallet,
  ChevronLeft
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Checkout = () => {
  const API = "https://app-product-qh1f.onrender.com/api/v1";
  // const API = "http://localhost:3000/api/v1";
  const navigate = useNavigate();
  const userid = localStorage.getItem("userid");

  const [checkcart, setcheckcart] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "",
    street: "", city: "", state: "", pincode: "", phone: ""
  });

  // Razorpay Payment Logic (Functionality preserved)
  const handlepayment = async () => {
    const subtotal = checkcart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const total = subtotal + (subtotal * 0.05); // 5% Tax
    try {
      const { data } = await axios.post(`${API}/createorder`, {
        amount: total
      });
      const options = {
        key: data.key,
        amount: total * 100,
        currency: "INR",
        name: "SDL Creative Groups",
        description: "Order Payment",
        order_id: data.orderId,
        handler: function (response) {
          alert("Payment Successful");
          console.log(response);
          // You might want to trigger handleSubmit(null) here after successful payment
        },
        theme: {
          color: "#0A2540",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.log("Payment Error:", err);
    }
  };

  useEffect(() => {
    const getcart = async () => {
      try {
        const res = await axios.get(`${API}/cart/${userid}`);
        const validItems = res.data.cart.items.filter(item => item.product !== null);
        setcheckcart(validItems);
      } catch (err) { console.log(err); }
    };
    if (userid) getcart();
  }, [userid, API]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const subtotal = checkcart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      const orderData = {
        userid,
        items: checkcart,
        personalDetails: { firstName: formData.firstName, lastName: formData.lastName, email: formData.email },
        shippingAddress: { ...formData },
        total: total
      };

      const res = await axios.post(`${API}/checkout`, orderData);
      if (res.data.success) {
        alert("Order and email send sucessfully");
        navigate("/orders");
      }
    } catch (err) {
      // alert(err.response?.data?.message || "Error placing order");
    }
  };

  // const cashondelivery=()=>{

  // }

  const[cash,setcash]=useState("")
  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans text-gray-900 flex flex-col">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* --- LUXURY HERO SECTION --- */}
      <section className="relative h-[300px] bg-blue-950 flex flex-col justify-center items-center px-6 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center z-10"
        >
          <button 
            onClick={() => navigate(-1)}
            className="text-[11px] font-bold uppercase tracking-[0.3em] text-blue-400 mb-4 flex items-center justify-center gap-2 mx-auto hover:text-white transition-colors"
          >
            <ChevronLeft size={14} /> Back to Bag
          </button>
          <h1 className="text-5xl md:text-6xl font-light tracking-tighter italic text-white">
            Secure Checkout
          </h1>
        </motion.div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/5 -z-0 select-none uppercase">
          Payment
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-6 py-16 w-full flex-1">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: FORM FIELDS */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Personal Details */}
            <motion.section 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-100/60 p-8 rounded-[2.5rem] border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-[#0A2540] rounded-2xl text-white">
                    <UserCheck size={20} />
                </div>
                <h2 className="text-2xl font-semibold text-[#0A2540]">Personal Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input name="firstName" placeholder="First Name" onChange={handleChange} className="bg-white/80 border-none p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none" required />
                <input name="lastName" placeholder="Last Name" onChange={handleChange} className="bg-white/80 border-none p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none" required />
                <input name="email" type="email" placeholder="Email Address" onChange={handleChange} className="bg-white/80 border-none p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none md:col-span-2" required />
              </div>
            </motion.section>

            {/* Shipping Address */}
            <motion.section 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-100/60 p-8 rounded-[2.5rem] border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-[#0A2540] rounded-2xl text-white">
                    <Truck size={20} />
                </div>
                <h2 className="text-2xl font-semibold text-[#0A2540]">Delivery Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input name="street" placeholder="Street Address" onChange={handleChange} className="bg-white/80 border-none p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none md:col-span-2" required />
                <input name="city" placeholder="City" onChange={handleChange} className="bg-white/80 border-none p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none" required />
                <input name="state" placeholder="State" onChange={handleChange} className="bg-white/80 border-none p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none" required />
                <input name="pincode" placeholder="Pincode" onChange={handleChange} className="bg-white/80 border-none p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none" required />
                <input name="phone" placeholder="Phone Number" onChange={handleChange} className="bg-white/80 border-none p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none" required />
              </div>
            </motion.section>

            {/* Payment Method */}
            <motion.section 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-100/60 p-8 rounded-[2.5rem] border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-[#0A2540] rounded-2xl text-white">
                    <MonitorSmartphone size={20} />
                </div>
                <h2 className="text-2xl font-semibold text-[#0A2540]">Select Payment</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-white rounded-[2rem] border border-gray-100 flex items-center gap-4 hover:border-blue-500 transition-all cursor-pointer group shadow-sm">
                    <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-blue-50 transition-colors">
                        <Wallet className="text-gray-400 group-hover:text-blue-600" />
                    </div>
                    <span 
                    // onClick={()=>{cashondelivery("click")}}
                    onClick={()=>setcash(true)}
                    className="font-bold text-[#0A2540]">Cash on Delivery</span>
                    
                </div>
                
                <div 
                    onClick={handlepayment}
                    className="p-6 bg-white rounded-[2rem] border-2 border-transparent flex items-center gap-4 hover:border-blue-500 transition-all cursor-pointer group shadow-sm"
                >
                    <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-blue-50 transition-colors">
                        <CreditCard className="text-gray-400 group-hover:text-blue-600" />
                    </div>
                    <span className="font-bold text-[#0A2540]">Pay with Razorpay</span>
                </div>
              </div>
            </motion.section>
          </div>

          {/* RIGHT: SUMMARY SIDEBAR */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-950 text-white p-10 rounded-[2.5rem] sticky top-28 shadow-2xl overflow-hidden"
            >
              {/* Decorative circle */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
              
              <div className="flex items-center gap-3 mb-8 relative">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <ShieldCheck size={20} className="text-blue-400" />
                  </div>
                  <h2 className="text-xl font-semibold tracking-tight">Order Summary</h2>
              </div>

              <div className="space-y-4 mb-8 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar relative">
                {checkcart.map(item => (
                  <div key={item._id} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium line-clamp-1 w-40">{item.product.name}</span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest">Qty: {item.quantity}</span>
                    </div>
                    <span className="font-semibold italic">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 text-sm relative">
                <div className="flex justify-between opacity-60">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between opacity-60">
                  <span>Shipping Fee</span>
                  <span className="text-blue-400 font-bold text-[10px] uppercase">Complimentary</span>
                </div>
                <div className="flex justify-between opacity-60">
                  <span>GST (5%)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                
                <div className="h-[1px] bg-white/10 my-6" />
                
                <div className="flex justify-between items-end">
                  <span className="text-xl font-light italic">Total Due:</span>
                  <p className="text-3xl font-semibold">₹{total.toLocaleString()}</p>
                </div>
              </div>
              <p className="mt-5 text-red-500 ">{cash}</p>

              <button 
                type="submit"
                onClick={handleSubmit}
                className="w-full mt-5 bg-white text-[#0A2540] py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-400 hover:text-white transition-all shadow-xl group"
              >
                <Lock size={18} /> COMPLETE ORDER <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="mt-8 flex flex-col items-center gap-4 opacity-30 grayscale relative">
                 <p className="text-[10px] font-bold tracking-[0.2em] uppercase">Trusted Checkout</p>
                 <div className="flex gap-4 h-4">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" />
                 </div>
              </div>
            </motion.div>
            
            <div className="mt-8 p-6 border border-dashed border-gray-200 rounded-[2rem] flex items-center gap-4">
                <ShieldCheck className="text-gray-300" size={32} />
                <p className="text-[11px] text-gray-400 font-medium leading-relaxed uppercase tracking-wider">
                    Your transaction is encrypted. Our servers do not store your full card details for maximum security.
                </p>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;