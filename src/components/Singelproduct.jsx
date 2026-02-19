import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { MinusIcon, PlusCircle, PlusIcon } from "lucide-react";
import { useNavigate} from "react-router-dom";
const Singelproduct = () => {
  const userid=localStorage.getItem("userid");
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchsingleproduct = async () => {
      try {
        const res = await axios.get(
          `https://app-product-qh1f.onrender.com/api/v1/product/${id}`
        );
        setProduct(res.data.singleproduct);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchsingleproduct();
    }
  }, [id]);

  const [increment,setincrement]=useState(1)

 const handleaddcart=async()=>{
    try{
    await axios.post("http://localhost:3000/api/v1/addtocart",{
        sessionId:userid,
        productId:id,
        quantity:increment,
    })

    alert("Added to Cart")
    navigate("/cart"); 
 }catch(err){
    console.log(err)
 }
}
  return (
    <>
    <div className="bg-gray-100 ">
      <Navbar />

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto sm:px-6 py-12">

          <div className=" sm:flex  rounded-2xl  p-8 gap-10">

            {/* Image Section */}
            <div className="flex  justify-center">
              <img
                src={product?.images?.[0]?.url}
                alt={product?.name}
                className="w-90 h-90 object-cover rounded-2xl"
              />
            </div>

            {/* Details Section */}
            <div>

              <p className="text-sm text-gray-500 uppercase tracking-wider">
                {product?.category}
              </p>

              <h1 className="text-3xl font-bold mt-2 text-gray-900">
                {product?.name}
              </h1>

              <p className="text-3xl font-bold text-black mt-6">
                ₹ {product?.price}
              </p>

              <p
                className={`mt-3 font-semibold ${
                  product?.stock > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {product?.stock > 0 ? "In Stock" : "Out of Stock"}
              </p>

              <p className="text-gray-600 mt-6 leading-relaxed">
                {product?.description}
              </p>

            
                <button className="border flex gap-2 font-semibold border-black/50 px-4 py-2 rounded mt-3">
                <span onClick={()=>{setincrement(prev=> prev+1)}}><PlusIcon/></span>Quantity: {increment}
                <span onClick={()=>{setincrement(prev=>Math.max(1,prev -1))}}><MinusIcon/></span></button>
            
              
              <div className="space-x-4">

                 <button 
                 onClick={()=>{navigate("/checkout")}}
                 className="bg-gray-400 text-white mt-4 px-8 py-3 rounded-xl hover:opacity-80 transition">
                Buy Now
              </button>

               <button
               onClick={handleaddcart} 
               className="bg-gray-400 text-white mt-8 px-8 py-3 rounded-xl hover:opacity-80 transition">
                Add to Cart
              </button>
              </div>
             
         
            </div>
            
          </div>
          <div className="flex justify-around mt-7 text-xl sm:text-2xl font-semibold">
             <p>Product</p>  
             <p>About</p> 
             <p>Review</p>
            </div>
            <div>

            </div>
        </div>
      )}
       
    </div>
    <div>  <Footer/></div>
  
    </>
  );
};

export default Singelproduct;


