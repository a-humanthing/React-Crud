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
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddEdit />} />
          <Route path="/update/:id" element={<AddEdit />} />
          <Route path="/view/:id" element={<View />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
