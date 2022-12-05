import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { LinkContainer } from "react-router-bootstrap"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

function UserNav() {
  const [username, setUsername] = useState()
  useEffect(() => {
    const userDetails = localStorage.getItem("user")
    const user = JSON.parse(userDetails)
    if (user) {
      setUsername(user.name)
      console.log(user.token)
    }
  }, [])
  const navigate = useNavigate()
  const handleLogout = () => {
    setUsername("")
    localStorage.removeItem("user")
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
