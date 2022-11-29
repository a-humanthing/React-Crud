import React, { useContext, useEffect } from "react"
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Home from "./Pages/Home"
import SignupPage from "./Pages/Signup"
import AddEdit from "./Pages/AddEdit"
import About from "./Pages/About"
import View from "./Pages/View"
import NavBar from "./Components/Nav/NavBar"
import Register from "./Pages/Register"
import UserRegister from "./Pages/user/UserRegister"
import Login from "./Pages/user/Login"
import UserHome from "./Pages/user/UserHome"
import AdminRoutes from "./routes/AdminRoutes"
import UserRoutes from "./routes/UserRoutes"
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/*" element={<AdminRoutes />} />
          <Route path="/user/*" element={<UserRoutes />} />
          {/* <Route path="/user/register" element={<UserRegister />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/home" element={<UserHome />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
