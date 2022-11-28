import { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { useNavigate, Link, useLocation, redirect } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"

function NavBar() {
  const [activeTab, setActiveTab] = useState("Home")
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    if (location.pathname === "/") setActiveTab("Home")
    if (location.pathname === "/add") setActiveTab("AddUser")
    if (location.pathname === "/about") setActiveTab("About")
  }, [location])
  return (
    <Navbar bg="success" expand="lg">
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
            <LinkContainer to="/about">
              <Nav.Link
                className={`${activeTab == "About" ? "active" : ""}`}
                onClick={() => setActiveTab("About")}
              >
                About
              </Nav.Link>
            </LinkContainer>
            <Nav.Link href="#link">
              Log
              {/* {userDetails ? userDetails : "Not Logged"} */}
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
            <Nav.Link href="#home">Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
