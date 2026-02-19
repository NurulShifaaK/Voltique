import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userid = localStorage.getItem("userid");

  useEffect(() => {
    const orderstatus = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/checkout/${userid}`);
        setOrders(res.data.orders);
      } catch (err) {
        console.log(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    orderstatus();
  }, [userid]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-700 border-green-200";
      case "Processing": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Placed": return "bg-orange-100 text-orange-700 border-orange-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen italic">Loading Orders...</div>;

  return (
    <>
      <Navbar />
      <div className="px-4 md:px-10 lg:px-32 py-12 bg-[#F9FAFB] min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2">My Orders</h2>
          <p className="text-gray-500 mb-10">Manage your recent orders and track shipments.</p>

          <div className="flex flex-col gap-8">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                
                {/* ORDER HEADER */}
                <div className="bg-gray-50 border-b border-gray-200 p-5 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex gap-10">
                    <div>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Order ID</p>
                      <p className="text-sm font-mono text-gray-700">#{order._id.slice(-8)}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Date</p>
                      <p className="text-sm font-medium text-gray-700">
                        {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Total</p>
                      <p className="text-sm font-bold text-gray-900">₹{order.totalamount.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold ${getStatusStyle(order.status)}`}>
                    {order.status === "Delivered" ? <CheckCircle size={14} /> : <Clock size={14} />}
                    {order.status.toUpperCase()}
                  </div>
                </div>

                {/* PRODUCT LIST */}
                <div className="p-6">
                  {order.products.map((item, index) => (
                    <div key={index} className="flex flex-col md:flex-row md:items-center justify-between py-4 last:pb-0 first:pt-0 border-b last:border-0 border-gray-100">
                      <div className="flex gap-6 items-center">
                        {/* THE IMAGE FETCHED FROM YOUR DATA */}
                        <div className="w-24 h-24 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0">
                          <img 
                            src={item.product?.images?.[0]?.url || "https://via.placeholder.com/150"} 
                            alt={item.product?.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>

                        <div>
                          <h4 className="font-bold text-gray-900 text-lg leading-tight">
                            {item.product?.name || "Product Name"}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1 capitalize">{item.product?.category}</p>
                          <div className="flex items-center gap-4 mt-3">
                            <span className="text-sm bg-gray-100 px-2 py-0.5 rounded text-gray-600">Qty: {item.quantity}</span>
                            <span className="font-semibold text-blue-600">₹{item.price.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 md:mt-0 flex gap-3">
                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all">
                          View Product
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* SHIPPING FOOTER */}
                <div className="bg-gray-50/50 p-5 flex flex-col md:flex-row justify-between items-start md:items-center border-t border-gray-100 gap-4">
                   <div className="flex items-start gap-3">
                      <Truck className="text-gray-400 mt-1" size={18} />
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-tight">Shipping To</p>
                        <p className="text-sm text-gray-600">
                          {order.shippingDetails.firstname} {order.shippingDetails.lastname} — {order.shippingDetails.street}, {order.shippingDetails.city}
                        </p>
                      </div>
                   </div>
                   <button className="text-blue-600 text-sm font-bold hover:underline">
                      Track Package →
                   </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;