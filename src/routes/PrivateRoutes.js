import React from "react"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoutes = () => {
  const userDetails = localStorage.getItem("user")
  return userDetails ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes
