import axios from "axios"
import React, { useState } from "react"
import { Button } from "react-bootstrap"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import Signup from "../Components/Signup/Signup"

const Register = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [cpassword, setCpassword] = useState()
  const navigate = useNavigate()
  const registerUser = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:5000/admin/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        cpassword,
      }),
    })
    const data = await response.json()
    console.log(data)
  }
  return (
    <div className="col-6 offset-3 ">
      <h1>SignUp</h1>
      <form onSubmit={registerUser}>
        <input
          value={name}
          className="form-control"
          type="text"
          placeholder="Name"
        />{" "}
        <br />
        <input
          value={email}
          className="form-control"
          type="email"
          placeholder="Email"
        />{" "}
        <br />
        <input
          value={password}
          className="form-control"
          type="password"
          placeholder="Set password"
        />{" "}
        <br />
        <input
          value={cpassword}
          className="form-control"
          type="password"
          placeholder="Confirm password"
        />{" "}
        <br />
        <Button type="submit" className="form-control" variant="primary">
          {" "}
          Signup
        </Button>
      </form>
    </div>
  )
}

export default Register
