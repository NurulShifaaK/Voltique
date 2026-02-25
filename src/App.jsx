import React from 'react'
import Dashboard from './components/Dashboard'
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AdminRoute from './Admin/AdminRoute';
const App = () => {
  return (
<BrowserRouter>
<Toaster position="top-right"
  toastOptions={{
    style: {
      background: "#0f172a",
      color: "#fff",
      borderRadius: "12px",
    },
  }} />
<Dashboard/>
</BrowserRouter>
  )
}

export default App
