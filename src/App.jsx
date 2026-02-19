import React from 'react'
import Dashboard from './components/Dashboard'
import { BrowserRouter } from "react-router-dom";
import AdminRoute from './Admin/AdminRoute';
const App = () => {
  return (
<BrowserRouter>
<Dashboard/>
</BrowserRouter>
  )
}

export default App
