import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "../Pages/Home"
import AddEdit from "../Pages/AddEdit"
import View from "../Pages/View"
import { ToastContainer } from "react-toastify"
import NavBar from "../Components/Nav/NavBar"
import Login from "../Pages/Login"

const AdminRoutes = () => {
  return (
    <div>
      <NavBar user="admin" />
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddEdit />} />
        <Route path="/update/:id" element={<AddEdit />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/login" element={<Login />} />

        {/* <Route path="/about" element={<About />} />
      <Route path="/register" element={<Register />} /> */}
      </Routes>
    </div>
  )
}

export default AdminRoutes
