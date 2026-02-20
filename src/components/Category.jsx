import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { ArrowBigLeft, Heart } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Category = () => {
  const API = "https://app-product-qh1f.onrender.com/api/v1";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  // Get category from state or query parameter
  const query = new URLSearchParams(location.search);
  const category = location.state?.category || query.get("category");
  console.log("Category:", category);

  // Fetch products for this category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${API}/products/category?category=${category}`
        );
        setProducts(res.data.products);
        console.log(res.data.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (category) fetchProducts();
  }, [category]);

  if (!category) return <p>Please select a category.</p>;
 
  const[cartvalue,setcartvalue]=useState({});

  const handlecart=(id)=>{
   setcartvalue(prev=>({
    ...prev,
    [id]:prev[id]?prev[id]+1:1
   }))
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <button 
      onClick={()=>navigate("/products")}
      className="px-4 mt-4 font-semibold text-xl flex items-center gap-1">Back</button>

      <div className="max-w-7xl mx-auto px-6 py-5">
        <h1 className="text-3xl font-bold mb-6">{category} Products</h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-lg font-semibold">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden relative p-4 hover:shadow-xl transition"
              >
                {/* Heart Icon */}
 <button
  onClick={() => handlecart(item._id)}
  className="absolute hover:text-rose-700 top-3 right-3 bg-white p-2 rounded-full shadow "
>
  <Heart size={18} />
  <span className="absolute top-5 right-1 text-[10px]">
    {cartvalue[item._id] || 0}
  </span>
</button>

                {/* Product Image */}
                <img
                  src={item.images[0]?.url}
                  alt={item.name}
                  className="rounded-lg w-45 h-50"
                />

                {/* Product Details */}
                <div className="mt-4">
                  <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">
                    {item.name}
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">{item.category}</p>

                  <p className="text-lg font-bold mt-2">₹ {item.price}</p>

                  <button
                    onClick={() => navigate(`/singleproduct/${item._id}`)}
                    className="bg-gray-400/70 text-white w-full py-2 rounded mt-3 hover:opacity-80 transition"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
