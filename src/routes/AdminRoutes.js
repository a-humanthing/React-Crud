import React from "react"
import { Route } from "react-router-dom"
import Home from "../Pages/Home"

const AdminRoutes = () => {
  return (
    <div>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddEdit />} />
      <Route path="/update/:id" element={<AddEdit />} />
      <Route path="/view/:id" element={<View />} />
    </div>
  )
}

export default AdminRoutes
