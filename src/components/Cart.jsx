// import React, { useEffect, useState } from 'react'
// import Navbar from './Navbar'
// import axios from 'axios'
// import { useNavigate} from "react-router-dom";
// const Cart = () => {
// const API = "https://app-product-qh1f.onrender.com/api/v1";
// const navigate = useNavigate();
// const [cart,setcart]=useState([])

// const userid=localStorage.getItem("userid");
//     useEffect(()=>{
//      getallcart()
//     },[])

//     const getallcart=async()=>{
//     //  const res= await axios.get(`${API}/cart/${userid}`);
//     const res=await axios.get(`https://app-product-qh1f.onrender.com/api/v1/cart/${userid}`)
//     console.log(res.data.cart.items);
//      setcart(res.data.cart.items);
//     }
  


//     const handleremovecart=async(productid)=>{
//         try{
//             await axios.delete(`${API}/cart/${userid}/${productid}`)
//              getallcart();
//         }
//         catch(err){
//        console.log(err)
//         }
//     }
// return (
//   <div className="bg-gray-100">
//     <Navbar />
    

//     <div className="max-w-5xl mx-auto mt-8 px-4 ">
//       {/* <h2 className="text-3xl font-bold mb-6 text-center">Your Cart</h2> */}

//       {cart.length === 0 ? (
//         <p className="text-center text-gray-500 ">Your cart is empty</p>
//       ) : (
//         <div className="space-y-6  flex flex-col justify-between  min-h-[80vh]">
//           {cart.map((item) => (
//             <div
//               key={item.product._id}
//               className="bg-white p-5 rounded-xl shadow-md flex flex-col sm:flex-row gap-6 hover:shadow-lg transition duration-300"
//             >
//               {/* Product Image */}
//               <div className="flex justify-center">
//                 <img
//                   src={item.product.images[0]?.url}
//                   alt={item.product.name}
//                   className="w-40 h-40 object-cover rounded-lg"
//                 />
//               </div>

//               {/* Product Details */}
//               <div className="flex-1">
//                 <h3 className="text-xl font-semibold">
//                   {item.product.name}
//                 </h3>

               

//                 <p className="text-gray-500 mt-1">
//                   ₹ {item.product.price}
//                 </p>

//                 <p className="mt-2">
//                   Quantity:{" "}
//                   <span className="font-semibold">
//                     {item.quantity}
//                   </span>
//                 </p>

//                 <p className="mt-2 font-bold text-lg">
//                   Total: ₹ {item.product.price * item.quantity}
//                 </p>

//                <button 
//                onClick={()=>handleremovecart(item.product._id)}
//                className='mt-2 text-red-500'>Remove</button>
//               </div>
//             </div>
//           ))}

//           {/* Grand Total */}
//           <div className="bg-white flex justify-center gap-4 px-4 py-2 rounded-xl shadow-md text-right">
//             <h3 className="text-lg sm:text-2xl font-bold">
//               Grand Total: ₹{" "}
//               {cart.reduce(
//                 (acc, item) =>
//                   acc + item.product.price * item.quantity,
//                 0
//               )}
//             </h3>
//               <button 
//               onClick={()=>navigate("/checkout")}
//               className='bg-gray-400/70 px-8 py-3 rounded text-white font-semibold'>Buy</button>
//           </div>
//         </div>
//       )}
//     </div>
//   </div>
// );

// }

// export default Cart


import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowRight, ChevronLeft, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const API = "https://app-product-qh1f.onrender.com/api/v1";
  const navigate = useNavigate();
  const [cart, setcart] = useState([]);
  const [loading, setLoading] = useState(true);

  const userid = localStorage.getItem("userid");

  useEffect(() => {
    getallcart();
  }, []);

  const getallcart = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/cart/${userid}`);
      setcart(res.data.cart.items || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleremovecart = async (productid) => {
    try {
      await axios.delete(`${API}/cart/${userid}/${productid}`);
      // Optimistic UI update for smoother animation
      setcart((prev) => prev.filter(item => item.product._id !== productid));
    } catch (err) {
      console.log(err);
      getallcart(); // Revert on error
    }
  };

  const grandTotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans text-gray-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-gray-100 pb-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 mt-20 text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-blue-900 mb-2 transition-colors"
            >
              <ChevronLeft size={14} /> Back
            </button>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Your Bag</h1>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="hidden md:block">
            <p className="text-sm font-medium text-gray-500">
              {cart.length} items selected — Total: <span className="text-gray-900 font-bold">₹{grandTotal.toLocaleString()}</span>
            </p>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <div className="w-10 h-10 border-4 border-gray-100 border-t-blue-900 rounded-full animate-spin" />
          </div>
        ) : cart.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200"
          >
            <ShoppingBag size={48} className="mx-auto text-gray-200 mb-4" />
            <h2 className="text-xl font-bold">Your bag is empty</h2>
            <p className="text-gray-500 mt-2 mb-8 text-sm">Looks like you haven't added anything yet.</p>
            <button 
              onClick={() => navigate("/")}
              className="bg-blue-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-black transition-all shadow-lg shadow-blue-900/10"
            >
              Start Shopping
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* --- CART LIST (Left 8 Columns) --- */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-8 space-y-4"
            >
              <AnimatePresence mode='popLayout'>
                {cart.map((item) => (
                  <motion.div
                    key={item.product._id}
                    variants={itemVariants}
                    layout
                    className="bg-white border border-gray-100 p-4 sm:p-6 rounded-2xl flex gap-4 sm:gap-6 items-center hover:shadow-sm transition-shadow"
                  >
                    {/* Image */}
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-xl flex-shrink-0 p-2 overflow-hidden flex items-center justify-center">
                      <img
                        src={item.product.images[0]?.url}
                        alt={item.product.name}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">{item.product.category}</p>
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                            {item.product.name}
                          </h3>
                        </div>
                        <button
                          onClick={() => handleremovecart(item.product._id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all flex-shrink-0"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="flex justify-between items-end mt-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                           <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                             <span className="text-xs text-gray-500 font-bold uppercase">Qty</span>
                             <span className="text-sm font-bold text-gray-900">{item.quantity}</span>
                           </div>
                           <p className="text-xs text-gray-400 font-medium">₹{item.product.price.toLocaleString()} / unit</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            ₹ {(item.product.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* --- SUMMARY SIDEBAR (Right 4 Columns) --- */}
            <div className="lg:col-span-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 sticky top-24 shadow-sm"
              >
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                   Order Summary
                </h2>
                
                <div className="space-y-4 text-sm font-medium">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-400">Bag Subtotal</span>
                    <span className="text-gray-900">₹{grandTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-400">Shipping</span>
                    <span className="text-green-600 font-bold">Complimentary</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-50 pb-4">
                    <span className="text-gray-400">Estimated Taxes</span>
                    <span className="text-gray-900">₹0.00</span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-base font-bold text-gray-900">Total Amount</span>
                    <span className="text-2xl font-black text-blue-900">₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full mt-8 bg-blue-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl shadow-blue-900/10 active:scale-[0.98]"
                >
                  <Lock size={18} /> Checkout Securely
                </button>

                <div className="mt-6 flex flex-col items-center gap-3">
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Guaranteed Safe Checkout</p>
                   <div className="flex gap-4 opacity-40 grayscale scale-90">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
                   </div>
                </div>
              </motion.div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;