import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Heart, RefreshCcwDotIcon, TimerReset } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const API = import.meta.env.VITE_API_URL;
  const [allproduct, setAllproduct] = useState([]);
  const[product,setproduct]=useState([])
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [search,setsearch]=useState("");
  const[category,setcategory]=useState("");

   
//get all product
  useEffect(() => {
    const fetchproduct = async () => {
      try {
        const res = await axios.get(
        //   "https://app-product-qh1f.onrender.com/api/v1/products"
        // `http://localhost:3000/api/v1/products?keyword=${search || ""}`
         `${API}/products?keyword=${search || ""}&category=${category || ""}`
   
        );
        setAllproduct(res.data.products);
        // console.log(res.data.products)
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchproduct();
  }, [search,category]);



  return (
    <div className="bg-gray-100 min-h-screen">
        <div className="sticky top-0 z-80">
      <Navbar />
      </div>
      <div className="w-full h-[300px] bg-red-400 p-4">
         <div>
            <input type="text" 
            value={search}
            onChange={(e)=>setsearch(e.target.value)}
            placeholder="Search"
            className="border border-black/20 outline-none shadow bg-white w-full px-4 rounded py-2  "/>
         </div>

         <div className="flex justify-around mt-2 flex-wrap gap-2">
            <p onClick={()=>{setcategory("iPhone")}} 
            className="bg-white px-3 py-1 rounded font-semibold">Mobile</p>
            <p 
             onClick={()=>{setcategory("Mac")}} 
            className="bg-white px-3 py-1 rounded font-semibold">Laptop</p>
            <p 
             onClick={()=>{setcategory("Headphones")}} 
            className="bg-white px-3 py-1 rounded font-semibold">Headphone</p>
            <p 
             onClick={()=>{setcategory("Watch")}} 
            className="bg-white px-3 py-1 rounded font-semibold">Watch</p>
             <p 
             onClick={()=>{setcategory("");
    setsearch("");
    setLoading(true);}} 
            className="bg-white px-3 py-1 rounded font-semibold"><RefreshCcwDotIcon/></p>
         </div>
        
      </div>
      <div className="max-w-7xl mx-auto px-6 py-10">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-lg font-semibold">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {allproduct.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl text-center shadow-md overflow-hidden relative p-4 hover:shadow-xl transition"
              >

                {/* Heart Icon */}
                <button
                  onClick={() => console.log("Wishlist clicked")}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
                >
                  <Heart size={18} />
                </button>

                {/* Product Image */}
                <img
                  src={item.images[0]?.url}
                  alt={item.name}
                  className="w-[200px] h-[200px] mx-auto rounded-lg"
                />

                {/* Product Details */}
                <div className="mt-4">
                  <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">
                    {item.name}
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">{item.category}</p>

                  <p className="text-lg font-bold mt-2">₹ {item.price}</p>

                  {/* <button
                    onClick={() => navigate(`/singleproduct/${item._id}`)}
                    className="bg-gray-500/70 text-white w-full py-2 rounded mt-3 hover:opacity-80 transition"
                  >

                    View
                  </button> */}

                 <button
  onClick={() => {
    const isLoggedIn = localStorage.getItem("userLoggedIn") === "true";
    if (isLoggedIn) {
      navigate(`/singleproduct/${item._id}`);
    } else {
      // Redirect to login and pass state to come back here after login
      navigate("/login", { state: { from: `/products` } });
    }
  }}
  className="bg-gray-500/70 text-white w-full py-2 rounded mt-3 hover:opacity-80 transition"
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

export default Product;
