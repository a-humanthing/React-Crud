import React from "react"
import { Navigate, Outlet } from "react-router-dom"

const WelcomeRoute = () => {
  const user = localStorage.getItem("user")
  return user ? <Navigate to="/home" /> : <Outlet />
}

export default WelcomeRoute
