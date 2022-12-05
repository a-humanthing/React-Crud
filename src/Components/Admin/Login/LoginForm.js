import axios from "axios"
import React, { useState } from "react"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function validateRegisterForm() {
    if (password.length < 1 || username.length < 3) {
      return false
    } else {
      return true
    }
  }
  const navigate = useNavigate()
  async function handleLogin(e) {
    e.preventDefault()
    console.log("on fn")
    const isValidated = validateRegisterForm()
    if (isValidated) {
      try {
        const response = await axios.post("http://localhost:5000/admin/login", {
          username,
          password,
        })
        if (response.data.success) {
          localStorage.setItem("admin", JSON.stringify(response.data))
          console.log("login response.data = ", response.data)
          toast.success("Admin Succesfully Logged In")
          setTimeout(() => {
            navigate("/")
          }, 500)
        }
      } catch (error) {
        console.log(error)
        toast.error("Invalid password or email")
      }
    } else {
      toast.error("Invalid password or email")
    }
  }
  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          placeholder="Name"
        />{" "}
        <br />
        <br />
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          placeholder="Password"
        />{" "}
        <br />
        <br />
        <Button type="submit" variant="primary">
          Log In
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
