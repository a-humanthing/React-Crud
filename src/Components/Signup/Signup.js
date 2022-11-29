import React from "react"
import { Button } from "react-bootstrap"

const Signup = () => {
  return (
    <div>
      <h1>SignUp</h1>
      <input type="text" placeholder="Name" /> <br />
      <input type="text" placeholder="password" /> <br />
      <Button variant="primary" />
    </div>
  )
}

export default Signup
