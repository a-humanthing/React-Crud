import React from "react"
import { Navigate, Outlet } from "react-router-dom"

const PrivateAdminRoutes = () => {
  const adminDetails = localStorage.getItem("admin")
  return adminDetails ? <Outlet /> : <Navigate to="/admin/login" />
}

export default PrivateAdminRoutes
