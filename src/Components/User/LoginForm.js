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
import { useDispatch } from "react-redux"
import { login } from "../../features/auth/authSlice"

function LoginForm() {
  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")
  const [user, setUser] = useState()

  function validateRegisterForm() {
    if (password.length < 1 || email.length < 3) {
      return false
    } else {
      return true
    }
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()

  async function loginUser(e) {
    e.preventDefault()
    const isValidated = validateRegisterForm()
    if (isValidated) {
      try {
        const response = await axios.post("http://localhost:5000/user/login", {
          email,
          password,
        })

        if (response.data.success) {
          setUser(response.data)
          localStorage.setItem("user", JSON.stringify(response.data))
          dispatch(login(response.data))
          console.log("login response.data = ", response.data)
          toast.success("Succesfully Logged In")
          setTimeout(() => {
            navigate("/home")
          }, 500)
        } else {
          toast.error("Invalid Login")
        }
      } catch (error) {
        toast.error("Invalid password or email")
      }
    } else {
      toast.error("Invalid password or email")
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
                Login
              </h6>
              <form onSubmit={loginUser}>
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
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput
                    placeholder="Password"
                    id="form3"
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* <MDBBtn className="mb-4" size="lg">
                  Login
                </MDBBtn> */}
                <Button type="submit" variant="primary">
                  Login
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

export default LoginForm
