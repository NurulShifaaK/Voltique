import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import {
  ShieldCheck,
  ChevronRight,
  CreditCard,
  UserCheck,
} from "lucide-react";
import Navbar from "./Navbar";
import axios from "axios";

const Checkout = () => {
   const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
const userid=localStorage.getItem("userid");

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
      const res = await axios.get(
        `${API}/cart/${userid}`
      );
      setcheckcart(res.data.cart.items);
      console.log(res.data.cart.items)
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

      const res = await axios.post(
        `${API}/checkout`,
        orderData
      );

      alert("Order placed successfully!");
      console.log(res.data);
      navigate("/orders")

    } catch (err) {
      console.log(err);
      alert("Error placing order");
    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen text-[#1d1d1f] font-sans">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-12">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* LEFT SIDE FORM */}
            <div className="lg:col-span-7 space-y-12">

              <p className="text-center font-semibold text-2xl">
                Checkout Page
              </p>

              {/* Personal Details */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  Personal Details
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="border rounded px-4 py-2 border-black/30"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="border rounded px-4 py-2 border-black/30"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="col-span-2 border rounded px-4 py-2 border-black/30"
                    required
                  />
                </div>
              </section>

              {/* Shipping */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  Shipping Address
                </h2>

                <div className="grid grid-cols-6 gap-4">
                  <input
                    type="text"
                    name="street"
                    placeholder="Street Address"
                    value={formData.street}
                    onChange={handleChange}
                    className="col-span-6 border rounded px-4 py-2 border-black/30"
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="col-span-3 border rounded px-4 py-2 border-black/30"
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    className="col-span-3 border rounded px-4 py-2 border-black/30"
                    required
                  />
                  <input
                    type="number"
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="col-span-3 border rounded px-4 py-2 border-black/30"
                    required
                  />
                  <input
                    type="number"
                    name="phone"
                    placeholder="Phone No"
                    value={formData.phone}
                    onChange={handleChange}
                    className="col-span-3 border rounded px-4 py-2 border-black/30"
                    required
                  />
                </div>
              </section>

              {/* Payment */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  Payment Method
                </h2>

                <div className="p-6 rounded-2xl border border-black/30 bg-white space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className="pl-12 border rounded px-4 w-full py-2 border-black/30"
                      required
                    />
                    <CreditCard
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM / YY"
                      value={formData.expiry}
                      onChange={handleChange}
                      className="border rounded px-4 py-2 border-black/30"
                      required
                    />
                    <input
                      type="password"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleChange}
                      className="border rounded px-4 py-2 border-black/30"
                      required
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT SIDE SUMMARY */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-8 shadow-lg sticky top-12">

                <h3 className="text-lg font-bold mb-6">
                  In Your Bag
                </h3>

                {checkcart.map((item) => (
                  <div key={item._id} className="flex gap-4 mb-4">
                    <img
                      src={item.product.images[0]?.url}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <div>
                      <p className="font-semibold text-sm">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm font-bold">
                        ₹ {item.product.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between py-6 font-bold text-lg">
                  <span>Total</span>
                  <span>₹ {total.toFixed(2)}</span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-full font-bold flex items-center justify-center gap-2"
                >
                  Place Order
                  <ChevronRight size={20} />
                </button>

              </div>
            </div>

          </div>
        </form>
      </main>
    </div>
  );
};

export default Checkout;
