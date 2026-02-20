import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { useNavigate} from "react-router-dom";
const Cart = () => {
const API = "https://app-product-qh1f.onrender.com/api/v1";
const navigate = useNavigate();
const [cart,setcart]=useState([])

const userid=localStorage.getItem("userid");
    useEffect(()=>{
     getallcart()
    },[])

    const getallcart=async()=>{
    //  const res= await axios.get(`${API}/cart/${userid}`);
    const res=await axios.get(`https://app-product-qh1f.onrender.com/api/v1/cart/${userid}`)
    console.log(res.data.cart.items);
     setcart(res.data.cart.items);
    }
  


    const handleremovecart=async(productid)=>{
        try{
            await axios.delete(`${API}/cart/${userid}/${productid}`)
             getallcart();
        }
        catch(err){
       console.log(err)
        }
    }
return (
  <div className="bg-gray-100">
    <Navbar />
    

    <div className="max-w-5xl mx-auto mt-8 px-4 ">
      {/* <h2 className="text-3xl font-bold mb-6 text-center">Your Cart</h2> */}

      {cart.length === 0 ? (
        <p className="text-center text-gray-500 ">Your cart is empty</p>
      ) : (
        <div className="space-y-6  flex flex-col justify-between  min-h-[80vh]">
          {cart.map((item) => (
            <div
              key={item.product._id}
              className="bg-white p-5 rounded-xl shadow-md flex flex-col sm:flex-row gap-6 hover:shadow-lg transition duration-300"
            >
              {/* Product Image */}
              <div className="flex justify-center">
                <img
                  src={item.product.images[0]?.url}
                  alt={item.product.name}
                  className="w-40 h-40 object-cover rounded-lg"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold">
                  {item.product.name}
                </h3>

               

                <p className="text-gray-500 mt-1">
                  ₹ {item.product.price}
                </p>

                <p className="mt-2">
                  Quantity:{" "}
                  <span className="font-semibold">
                    {item.quantity}
                  </span>
                </p>

                <p className="mt-2 font-bold text-lg">
                  Total: ₹ {item.product.price * item.quantity}
                </p>

               <button 
               onClick={()=>handleremovecart(item.product._id)}
               className='mt-2 text-red-500'>Remove</button>
              </div>
            </div>
          ))}

          {/* Grand Total */}
          <div className="bg-white flex justify-center gap-4 px-4 py-2 rounded-xl shadow-md text-right">
            <h3 className="text-lg sm:text-2xl font-bold">
              Grand Total: ₹{" "}
              {cart.reduce(
                (acc, item) =>
                  acc + item.product.price * item.quantity,
                0
              )}
            </h3>
              <button 
              onClick={()=>navigate("/checkout")}
              className='bg-gray-400/70 px-8 py-3 rounded text-white font-semibold'>Buy</button>
          </div>
        </div>
      )}
    </div>
  </div>
);

}

export default Cart