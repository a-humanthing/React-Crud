import React from "react"
import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import NavBar from "../Components/Nav/NavBar"
import UserRegister from "../Pages/user/UserRegister"
import Login from "../Pages/user/Login"
import UserHome from "../Pages/user/UserHome"
import UserNav from "../Components/Nav/UserNav"
import Profile from "../Pages/user/Profile"
import PrivateRoutes from "./PrivateRoutes"
import WelcomeRoute from "./WelcomeRoute"

const UserRoutes = () => {
  return (
    <div>
      <UserNav />
      <ToastContainer style={{ marginTop: "60px" }} position="top-right" />
      <Routes>
        <Route element={<WelcomeRoute />}>
          <Route path="/register" element={<UserRegister />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<UserHome />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  )
}

export default UserRoutes
