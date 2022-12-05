import React, { useState } from "react"
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit"
import { toast } from "react-toastify"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"

function RegisterForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [cpassword, setCpassword] = useState("")

  const navigate = useNavigate()

  function validateRegisterForm() {
    if (!(name.trim().length > 3 && /^[A-Za-z ]+$/.test(name))) {
      toast.error("Invalid name")
      return false
    } else if (password.trim().length > 5) {
      toast.error("Password should be minimum 5 characters")
      return false
    } else if (password !== cpassword) {
      toast.error("Password Mismatch")
      return false
    } else if (email.length < 3) {
      toast.error("Invalid Email")
      return false
    } else {
      return true
    }
  }

  async function registerUser(e) {
    e.preventDefault()
    const isValidated = validateRegisterForm()
    try {
      if (isValidated) {
        const response = await axios.post(
          "http://localhost:5000/user/register",
          {
            name,
            email,
            phone,
            password,
          }
        )
        if (response.status === 200) {
          console.log("register = ", response)
          toast.success("Submited")
          setTimeout(() => {
            navigate("/login")
          }, 500)
        } else {
          toast.error("failed")
          console.log("failed")
        }
      }
    } catch (error) {
      toast.error("Registration Failed , Try Again")
    }
  }

  return (
    <MDBContainer fluid>
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol
              md="10"
              lg="6"
              className="order-2 order-lg-1 d-flex flex-column align-items-center"
            >
              <h6 className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                Sign up
              </h6>
              <form onSubmit={registerUser}>
                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    placeholder="Your Name"
                    id="form1"
                    type="text"
                    className="w-100"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size="lg" />
                  <MDBInput
                    placeholder="Your Email"
                    id="form2"
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="phone me-3" size="lg" />
                  <MDBInput
                    placeholder="Your mobile"
                    id="form5"
                    value={phone}
                    type="number"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput
                    placeholder="Password"
                    id="form3"
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="key me-3" size="lg" />
                  <MDBInput
                    placeholder="Repeat your password"
                    value={cpassword}
                    onChange={(e) => setCpassword(e.target.value)}
                    id="form4"
                    type="password"
                  />
                </div>

                <Button type="submit" className="mb-4">
                  Register
                </Button>
              </form>
            </MDBCol>

            <MDBCol
              md="10"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                fluid
              />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
      <link
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
        rel="stylesheet"
      />
    </MDBContainer>
  )
}

export default RegisterForm
