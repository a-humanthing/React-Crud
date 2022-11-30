import React from "react"
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"

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
