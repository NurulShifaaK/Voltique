import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'
import Checkoutadmin from './Checkoutadmin'

const AdminRoute = () => {
  return (
  <Routes>
    <Route path="/admindashboard" element={<AdminDashboard/>}/>
     <Route path="/admincheckout" element={<Checkoutadmin/>}/>
  </Routes>
  )
}

export default AdminRoute