// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "./Navbar";
// import { ArrowBigLeft, Heart } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";

// const Category = () => {
//   const API = "https://app-product-qh1f.onrender.com/api/v1";
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();
//   const location = useLocation();

//   // Get category from state or query parameter
//   const query = new URLSearchParams(location.search);
//   const category = location.state?.category || query.get("category");
//   console.log("Category:", category);

//   // Fetch products for this category
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get(
//           `${API}/products/category?category=${category}`
//         );
//         setProducts(res.data.products);
//         console.log(res.data.products);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (category) fetchProducts();
//   }, [category]);

//   if (!category) return <p>Please select a category.</p>;
 
//   const[cartvalue,setcartvalue]=useState({});

//   const handlecart=(id)=>{
//    setcartvalue(prev=>({
//     ...prev,
//     [id]:prev[id]?prev[id]+1:1
//    }))
//   }

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <Navbar />

//       <button 
//       onClick={()=>navigate("/products")}
//       className="px-4 mt-4 font-semibold text-xl flex items-center gap-1">Back</button>

//       <div className="max-w-7xl mx-auto px-6 py-5">
//         <h1 className="text-3xl font-bold mb-6">{category} Products</h1>

//         {loading ? (
//           <div className="flex justify-center items-center h-40">
//             <p className="text-lg font-semibold">Loading...</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {products.map((item) => (
//               <div
//                 key={item._id}
//                 className="bg-white rounded-2xl shadow-md overflow-hidden relative p-4 hover:shadow-xl transition"
//               >
//                 {/* Heart Icon */}
//  <button
//   onClick={() => handlecart(item._id)}
//   className="absolute hover:text-rose-700 top-3 right-3 bg-white p-2 rounded-full shadow "
// >
//   <Heart size={18} />
//   <span className="absolute top-5 right-1 text-[10px]">
//     {cartvalue[item._id] || 0}
//   </span>
// </button>

//                 {/* Product Image */}
//                 <img
//                   src={item.images[0]?.url}
//                   alt={item.name}
//                   className="rounded-lg w-45 h-50"
//                 />

//                 {/* Product Details */}
//                 <div className="mt-4">
//                   <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">
//                     {item.name}
//                   </h2>

//                   <p className="text-xs text-gray-500 mt-1">{item.category}</p>

//                   <p className="text-lg font-bold mt-2">₹ {item.price}</p>

//                   <button
//                     onClick={() => navigate(`/singleproduct/${item._id}`)}
//                     className="bg-gray-400/70 text-white w-full py-2 rounded mt-3 hover:opacity-80 transition"
//                   >
//                     View
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Category;


import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { ArrowLeft, Heart, ShoppingCart, Eye, Star, Plus } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Category = () => {
  const API = "https://app-product-qh1f.onrender.com/api/v1";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartValue, setCartValue] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const category = location.state?.category || query.get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API}/products/category?category=${category}`);
        setProducts(res.data.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (category) fetchProducts();
  }, [category]);

  const handleCart = (id, e) => {
    e.stopPropagation();
    setCartValue(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  if (loading) return (
    <div className="h-screen bg-white flex flex-col items-center justify-center">
      <div className="w-10 h-10 border-4 border-gray-100 border-t-blue-600 rounded-full animate-spin mb-4" />
      <p className="text-gray-400 font-medium">Loading {category}...</p>
    </div>
  );

  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb & Title */}
        <div className="mb-12">
          <button 
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-6 font-bold text-sm"
          >
            <ArrowLeft size={16} /> ALL COLLECTIONS
          </button>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-5xl font-black tracking-tight text-slate-900">
              {category}<span className="text-blue-600">.</span>
            </h1>
            <p className="text-slate-500 font-medium max-w-xs md:text-right">
              Explore our highly curated selection of {category} essentials.
            </p>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {products.map((item, idx) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group relative"
            >
              {/* Product Image Card */}
              <div className="relative aspect-[4/5] bg-gray-50 rounded-3xl overflow-hidden mb-5 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-200/50">
                <img
                  src={item.images[0]?.url}
                  alt={item.name}
                  className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Cart Quick-Add */}
                <button 
                  onClick={(e) => handleCart(item._id, e)}
                  className="absolute bottom-4 right-4 bg-blue-600 text-white p-4 rounded-2xl shadow-xl shadow-blue-600/30 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-slate-900"
                >
                  <Plus size={20} />
                </button>

                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 p-2.5 bg-white/80 backdrop-blur-md rounded-xl text-slate-400 hover:text-rose-500 transition-colors">
                  <Heart size={18} />
                </button>

                {/* Item Count Badge */}
                {cartValue[item._id] > 0 && (
                  <div className="absolute top-4 left-4 bg-slate-900 text-white text-[10px] font-bold px-3 py-1 rounded-full">
                    {cartValue[item._id]} IN BAG
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="px-1">
                <div className="flex justify-between items-start mb-2">
                  <h2 
                    onClick={() => navigate(`/singleproduct/${item._id}`)}
                    className="text-lg font-bold text-slate-900 cursor-pointer hover:text-blue-600 transition-colors line-clamp-1"
                  >
                    {item.name}
                  </h2>
                  <span className="text-blue-600 font-bold">₹{item.price.toLocaleString()}</span>
                </div>
                <p className="text-sm text-slate-400 font-medium capitalize mb-4">{item.category}</p>
                
                <button 
                  onClick={() => navigate(`/singleproduct/${item._id}`)}
                  className="w-full py-3 border-2 border-slate-100 rounded-2xl text-sm font-bold text-slate-900 hover:border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;