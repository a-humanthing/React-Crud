import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "../Pages/Admin/Home"
import AddEdit from "../Pages/Admin/AddEdit"
import View from "../Pages/Admin/View"
import { ToastContainer } from "react-toastify"
import NavBar from "../Components/Nav/NavBar"
import Login from "../Pages/Admin/Login"
import PrivateAdminRoutes from "./PrivateAdminRoutes"

const AdminRoutes = () => {
  return (
    <div>
      <NavBar user="admin" />
      <ToastContainer position="top-right" />
      <Routes>
        <Route element={<PrivateAdminRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddEdit />} />
          <Route path="/update/:id" element={<AddEdit />} />
          <Route path="/view/:id" element={<View />} />
        </Route>
        <Route path="/login" element={<Login />} />

        {/* <Route path="/about" element={<About />} />
      <Route path="/register" element={<Register />} /> */}
      </Routes>
    </div>
  )
}

export default AdminRoutes
