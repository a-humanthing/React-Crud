import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { LinkContainer } from "react-router-bootstrap"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { reset } from "../../features/auth/authSlice"

function UserNav() {
  const [username, setUsername] = useState()
  const data = useSelector((state) => state.auth)
  console.log("reduxt data = ", data)
  const userDetails = localStorage.getItem("user")
  useEffect(() => {
    const user = JSON.parse(userDetails)
    if (user) {
      setUsername(user.name)
      console.log(user.token)
    }
  }, [userDetails])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = () => {
    setUsername("")
    localStorage.removeItem("user")
    dispatch(reset())
    toast.success("Logout Succesfully")
    setTimeout(() => {
      navigate("/login")
    }, 500)
  }
  return (
    <>
      <Navbar style={{ marginBottom: "50px" }} bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>User</Navbar.Brand>
          <Nav className="me-auto">
            <LinkContainer to="/home">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
              <Nav.Link>Register</Nav.Link>
            </LinkContainer>
            {!username ? (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            ) : (
              <LinkContainer to="/profile">
                <Nav.Link>{username}</Nav.Link>
              </LinkContainer>
            )}
            {username && (
              <LinkContainer to="/login">
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default UserNav
