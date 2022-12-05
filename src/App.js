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
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
