import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './Home';
import Product from './Product';
import Singelproduct from './Singelproduct';
import Category from './Category';
import Cart from './Cart';
import Checkout from './Checkout';
import Login from './Login';
import Register from './Register';
import AdminDashboard from '../Admin/AdminDashboard';
import Checkoutadmin from '../Admin/Checkoutadmin';
import Usermanagment from '../Admin/Usermanagment';
import Adminorders from '../Admin/Adminorders';
import Orders from './Orders';
import Superdashboard from '../SuperAdmin/Superdashboard';
import Productupload from '../SuperAdmin/Productupload';
import SuperAdminUser from '../SuperAdmin/SuperAdminUser';


const Dashboard = () => {
  return (
    
   <Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/products" element={<Product/>}/>
  <Route path="/singleproduct/:id" element={<Singelproduct/>}/>
  <Route path="/category" element={<Category/>}/>
  <Route path="/cart" element={<Cart/>}/>
  <Route path="/checkout" element={<Checkout/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/register" element={<Register/>}/>
<Route path="/admindashboard" element={<AdminDashboard/>}/>
  <Route path="/admincheckout" element={<Checkoutadmin/>}/>
  <Route path='/usermanagement' element={<Usermanagment/>}/>
  <Route path='/adminorder' element={<Adminorders/>}/>
  <Route path="/orders" element={<Orders/>}/>
  <Route path="/superadmindashboard" element={<Superdashboard/>}/>
  <Route path="/productupload" element={<Productupload/>}/>
  <Route path="/superadminusermanagement" element={<SuperAdminUser/>}/>
   </Routes>
  )
}

export default Dashboard