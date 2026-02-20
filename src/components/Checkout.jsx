// import React, { useEffect, useState } from "react";
// import { useNavigate} from "react-router-dom";
// import {
//   ShieldCheck,
//   ChevronRight,
//   CreditCard,
//   UserCheck,
// } from "lucide-react";
// import Navbar from "./Navbar";
// import axios from "axios";

// const Checkout = () => {
//    const API = "https://app-product-qh1f.onrender.com/api/v1";
//   const navigate = useNavigate();
// const userid=localStorage.getItem("userid");

//   const [checkcart, setcheckcart] = useState([]);

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     pincode: "",
//     phone: "",
//     cardNumber: "",
//     expiry: "",
//     cvv: "",
//   });

//   useEffect(() => {
//     getallcart();
//   }, [userid]);

//   const getallcart = async () => {
//     try {
//       const res = await axios.get(
//         `${API}/cart/${userid}`
//       );
//       setcheckcart(res.data.cart.items);
//       console.log(res.data.cart.items)
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const subtotal = checkcart.reduce(
//     (acc, item) => acc + item.product.price * item.quantity,
//     0
//   );

//   const tax = subtotal * 0.05;
//   const total = subtotal + tax;

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const orderData = {
//         userid: userid,
//         items: checkcart,
//         personalDetails: {
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.email,
//         },
//         shippingAddress: {
//           street: formData.street,
//           city: formData.city,
//           state: formData.state,
//           pincode: formData.pincode,
//           phone: formData.phone,
//         },
//         paymentDetails: {
//           cardNumber: formData.cardNumber,
//           expiry: formData.expiry,
//           cvv: formData.cvv,
//         },
//         subtotal,
//         tax,
//         total,
//       };

//       const res = await axios.post(
//         `${API}/checkout`,
//         orderData
//       );

//       alert("Order placed successfully!");
//       console.log(res.data);
//       navigate("/orders")

//     } catch (err) {
//       console.log(err);
//       alert("Error placing order");
//     }
//   };

//   return (
//     <div className="bg-[#FAFAFA] min-h-screen text-[#1d1d1f] font-sans">
//       <Navbar />

//       <main className="max-w-6xl mx-auto px-6 py-12">
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

//             {/* LEFT SIDE FORM */}
//             <div className="lg:col-span-7 space-y-12">

//               <p className="text-center font-semibold text-2xl">
//                 Checkout Page
//               </p>

//               {/* Personal Details */}
//               <section>
//                 <h2 className="text-2xl font-semibold mb-4">
//                   Personal Details
//                 </h2>

//                 <div className="grid grid-cols-2 gap-4">
//                   <input
//                     type="text"
//                     name="firstName"
//                     placeholder="First Name"
//                     value={formData.firstName}
//                     onChange={handleChange}
//                     className="border rounded px-4 py-2 border-black/30"
//                     required
//                   />
//                   <input
//                     type="text"
//                     name="lastName"
//                     placeholder="Last Name"
//                     value={formData.lastName}
//                     onChange={handleChange}
//                     className="border rounded px-4 py-2 border-black/30"
//                     required
//                   />
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Email Address"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="col-span-2 border rounded px-4 py-2 border-black/30"
//                     required
//                   />
//                 </div>
//               </section>

//               {/* Shipping */}
//               <section>
//                 <h2 className="text-2xl font-semibold mb-4">
//                   Shipping Address
//                 </h2>

//                 <div className="grid grid-cols-6 gap-4">
//                   <input
//                     type="text"
//                     name="street"
//                     placeholder="Street Address"
//                     value={formData.street}
//                     onChange={handleChange}
//                     className="col-span-6 border rounded px-4 py-2 border-black/30"
//                     required
//                   />
//                   <input
//                     type="text"
//                     name="city"
//                     placeholder="City"
//                     value={formData.city}
//                     onChange={handleChange}
//                     className="col-span-3 border rounded px-4 py-2 border-black/30"
//                     required
//                   />
//                   <input
//                     type="text"
//                     name="state"
//                     placeholder="State"
//                     value={formData.state}
//                     onChange={handleChange}
//                     className="col-span-3 border rounded px-4 py-2 border-black/30"
//                     required
//                   />
//                   <input
//                     type="number"
//                     name="pincode"
//                     placeholder="Pincode"
//                     value={formData.pincode}
//                     onChange={handleChange}
//                     className="col-span-3 border rounded px-4 py-2 border-black/30"
//                     required
//                   />
//                   <input
//                     type="number"
//                     name="phone"
//                     placeholder="Phone No"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="col-span-3 border rounded px-4 py-2 border-black/30"
//                     required
//                   />
//                 </div>
//               </section>

//               {/* Payment */}
//               <section>
//                 <h2 className="text-2xl font-semibold mb-4">
//                   Payment Method
//                 </h2>

//                 <div className="p-6 rounded-2xl border border-black/30 bg-white space-y-4">
//                   <div className="relative">
//                     <input
//                       type="text"
//                       name="cardNumber"
//                       placeholder="Card Number"
//                       value={formData.cardNumber}
//                       onChange={handleChange}
//                       className="pl-12 border rounded px-4 w-full py-2 border-black/30"
//                       required
//                     />
//                     <CreditCard
//                       className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//                       size={18}
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <input
//                       type="text"
//                       name="expiry"
//                       placeholder="MM / YY"
//                       value={formData.expiry}
//                       onChange={handleChange}
//                       className="border rounded px-4 py-2 border-black/30"
//                       required
//                     />
//                     <input
//                       type="password"
//                       name="cvv"
//                       placeholder="CVV"
//                       value={formData.cvv}
//                       onChange={handleChange}
//                       className="border rounded px-4 py-2 border-black/30"
//                       required
//                     />
//                   </div>
//                 </div>
//               </section>
//             </div>

//             {/* RIGHT SIDE SUMMARY */}
//             <div className="lg:col-span-5">
//               <div className="bg-white rounded-3xl p-8 shadow-lg sticky top-12">

//                 <h3 className="text-lg font-bold mb-6">
//                   In Your Bag
//                 </h3>

//                 {checkcart.map((item) => (
//                   <div key={item._id} className="flex gap-4 mb-4">
//                     <img
//                       src={item.product.images[0]?.url}
//                       alt={item.product.name}
//                       className="w-20 h-20 object-cover rounded-xl"
//                     />
//                     <div>
//                       <p className="font-semibold text-sm">
//                         {item.product.name}
//                       </p>
//                       <p className="text-xs text-gray-500">
//                         Quantity: {item.quantity}
//                       </p>
//                       <p className="text-sm font-bold">
//                         ₹ {item.product.price * item.quantity}
//                       </p>
//                     </div>
//                   </div>
//                 ))}

//                 <div className="flex justify-between py-6 font-bold text-lg">
//                   <span>Total</span>
//                   <span>₹ {total.toFixed(2)}</span>
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-black text-white py-4 rounded-full font-bold flex items-center justify-center gap-2"
//                 >
//                   Place Order
//                   <ChevronRight size={20} />
//                 </button>

//               </div>
//             </div>

//           </div>
//         </form>
//       </main>
//     </div>
//   );
// };

// export default Checkout;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  ChevronRight,
  CreditCard,
  UserCheck,
  Lock,
  Truck,
  ArrowLeft
} from "lucide-react";
import Navbar from "./Navbar";
import axios from "axios";
import { motion } from "framer-motion";

const Checkout = () => {
  const API = "https://app-product-qh1f.onrender.com/api/v1";
  const navigate = useNavigate();
  const userid = localStorage.getItem("userid");

  const [checkcart, setcheckcart] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  useEffect(() => {
    getallcart();
  }, [userid]);

  const getallcart = async () => {
    try {
      const res = await axios.get(`${API}/cart/${userid}`);
      setcheckcart(res.data.cart.items);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const subtotal = checkcart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        userid: userid,
        items: checkcart,
        personalDetails: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
        },
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          phone: formData.phone,
        },
        paymentDetails: {
          cardNumber: formData.cardNumber,
          expiry: formData.expiry,
          cvv: formData.cvv,
        },
        subtotal,
        tax,
        total,
      };

      await axios.post(`${API}/checkout`, orderData);
      alert("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.log(err);
      alert("Error placing order");
    }
  };

  const inputStyle = "w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 text-gray-700 bg-white";
  const labelStyle = "block text-sm font-semibold text-gray-700 mb-2";

  return (
    <div className="bg-[#F8F9FA] min-h-screen text-gray-900 font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft size={18} /> Back to Bag
        </button>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* LEFT SIDE: FORMS */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 space-y-10"
          >
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Secure Checkout</h1>
              <p className="text-gray-500 mt-2">Complete your purchase by providing your details below.</p>
            </div>

            {/* Personal Details */}
            <section className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <UserCheck size={20} />
                </div>
                <h2 className="text-xl font-bold">Personal Details</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelStyle}>First Name</label>
                  <input type="text" name="firstName" placeholder="e.g. John" value={formData.firstName} onChange={handleChange} className={inputStyle} required />
                </div>
                <div>
                  <label className={labelStyle}>Last Name</label>
                  <input type="text" name="lastName" placeholder="e.g. Doe" value={formData.lastName} onChange={handleChange} className={inputStyle} required />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelStyle}>Email Address</label>
                  <input type="email" name="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} className={inputStyle} required />
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Truck size={20} />
                </div>
                <h2 className="text-xl font-bold">Shipping Address</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-6 gap-6">
                <div className="sm:col-span-6">
                  <label className={labelStyle}>Street Address</label>
                  <input type="text" name="street" placeholder="123 Luxury Lane" value={formData.street} onChange={handleChange} className={inputStyle} required />
                </div>
                <div className="sm:col-span-3">
                  <label className={labelStyle}>City</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} className={inputStyle} required />
                </div>
                <div className="sm:col-span-3">
                  <label className={labelStyle}>State</label>
                  <input type="text" name="state" value={formData.state} onChange={handleChange} className={inputStyle} required />
                </div>
                <div className="sm:col-span-3">
                  <label className={labelStyle}>Pincode</label>
                  <input type="number" name="pincode" value={formData.pincode} onChange={handleChange} className={inputStyle} required />
                </div>
                <div className="sm:col-span-3">
                  <label className={labelStyle}>Phone Number</label>
                  <input type="number" name="phone" value={formData.phone} onChange={handleChange} className={inputStyle} required />
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <CreditCard size={20} />
                  </div>
                  <h2 className="text-xl font-bold">Payment Method</h2>
                </div>
                <div className="flex gap-2">
                   <div className="w-8 h-5 bg-gray-100 rounded"></div>
                   <div className="w-8 h-5 bg-gray-100 rounded"></div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="relative">
                  <label className={labelStyle}>Card Number</label>
                  <div className="relative">
                    <input type="text" name="cardNumber" placeholder="0000 0000 0000 0000" value={formData.cardNumber} onChange={handleChange} className={`${inputStyle} pl-12`} required />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className={labelStyle}>Expiry (MM/YY)</label>
                    <input type="text" name="expiry" placeholder="12/28" value={formData.expiry} onChange={handleChange} className={inputStyle} required />
                  </div>
                  <div>
                    <label className={labelStyle}>CVV</label>
                    <input type="password" name="cvv" placeholder="***" value={formData.cvv} onChange={handleChange} className={inputStyle} required />
                  </div>
                </div>
              </div>
            </section>
          </motion.div>

          {/* RIGHT SIDE: SUMMARY */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5"
          >
            <div className="bg-white rounded-3xl p-6 mt-25 sm:p-8 border border-gray-100 shadow-xl lg:sticky lg:top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h3>

              <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar space-y-4 mb-8">
                {checkcart.map((item) => (
                  <div key={item._id} className="flex gap-4 items-center p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                    <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                      <img src={item.product.images[0]?.url} alt={item.product.name} className="w-16 h-16 object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-gray-900 line-clamp-1">{item.product.name}</p>
                      <p className="text-xs font-semibold text-gray-500 mt-1">Qty: {item.quantity}</p>
                      <p className="text-sm font-bold text-blue-600 mt-1">₹ {(item.product.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t border-gray-100 pt-6">
                <div className="flex justify-between text-sm font-semibold text-gray-500">
                  <span>Subtotal</span>
                  <span>₹ {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-gray-500">
                  <span>Shipping</span>
                  <span className="text-green-600 uppercase text-[10px] tracking-widest font-bold">Complimentary</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-gray-500">
                  <span>Estimated Tax (5%)</span>
                  <span>₹ {tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-4 border-t border-gray-100 mt-4">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-black text-blue-600">₹ {total.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-950 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]"
              >
                Place Secure Order
                <ChevronRight size={20} />
              </button>

              <div className="mt-6 p-4 bg-gray-50 rounded-2xl flex items-center gap-3">
                <ShieldCheck className="text-green-600" size={24} />
                <p className="text-[11px] font-semibold text-gray-500 leading-tight">
                  Your data is protected by industry-standard SSL encryption. By placing this order, you agree to our Terms of Service.
                </p>
              </div>
            </div>
          </motion.div>
        </form>
      </main>
    </div>
  );
};

export default Checkout;