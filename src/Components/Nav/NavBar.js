import { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { useNavigate, Link, useLocation, redirect } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"
import { toast } from "react-toastify"

function NavBar() {
  const [activeTab, setActiveTab] = useState("Home")
  const [username, setUsername] = useState()
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    if (location.pathname === "/") setActiveTab("Home")
    if (location.pathname === "/add") setActiveTab("AddUser")
    if (location.pathname === "/about") setActiveTab("About")
    if (location.pathname === "/register") setActiveTab("Register")
  }, [location])
  useEffect(() => {
    const userDetails = localStorage.getItem("user")
    const user = JSON.parse(userDetails)
    if (user) {
      setUsername(user.name)
      console.log(user.name)
    }
  }, [])

  const handleLogout = () => {
    setUsername("")
    localStorage.clear()
    toast.success("Logout Succesfully")
  }

  return (
    <Navbar bg="secondary" expand="lg">
      <Container>
        <Navbar.Brand>User Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link
                className={`${activeTab == "Home" ? "active" : ""}`}
                onClick={() => setActiveTab("Home")}
              >
                Home
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/add">
              <Nav.Link
                className={`${activeTab == "AddUser" ? "active" : ""}`}
                onClick={() => setActiveTab("AddUser")}
              >
                AddUser
              </Nav.Link>
            </LinkContainer>
            {username && (
              <LinkContainer to="/about">
                <Nav.Link
                  className={`${activeTab == "About" ? "active" : ""}`}
                  onClick={handleLogout}
                >
                  Logout
                </Nav.Link>
              </LinkContainer>
            )}
            <LinkContainer to="/register">
              <Nav.Link
                className={`${activeTab == "Register" ? "active" : ""}`}
                onClick={() => setActiveTab("Register")}
              >
                {username ? username : "Not Logged"}
              </Nav.Link>
            </LinkContainer>
            <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
            <Nav.Link href="#home">Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
