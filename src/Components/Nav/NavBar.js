import { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { useNavigate, Link, useLocation, redirect } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"
import { toast } from "react-toastify"

function NavBar(props) {
  const [activeTab, setActiveTab] = useState("Home")
  const [username, setUsername] = useState()
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    if (location.pathname === "/admin/") setActiveTab("Home")
    if (location.pathname === "/admin/add") setActiveTab("AddUser")
    if (location.pathname === "/admin/about") setActiveTab("About")
    if (location.pathname === "/admin/register") setActiveTab("Register")

    const adminDetails = localStorage.getItem("admin")
    if (adminDetails) {
      const admin = JSON.parse(adminDetails)
      if (admin) {
        setUsername("admin")
        console.log(admin.token)
      }
    }
  }, [location])

  const handleLogout = () => {
    setUsername("")
    localStorage.removeItem("admin")
    toast.success("Admin Logout Succesfull")
    setTimeout(() => {
      navigate("/admin/login")
    }, 500)
  }
  return (
    <Navbar bg={props.user === "user" ? "secondary" : "primary"} expand="lg">
      <Container>
        <Navbar.Brand>User Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/admin/">
              <Nav.Link
                className={`${activeTab == "Home" ? "active" : ""}`}
                onClick={() => setActiveTab("Home")}
              >
                Home
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/admin/add">
              <Nav.Link
                className={`${activeTab == "AddUser" ? "active" : ""}`}
                onClick={() => setActiveTab("AddUser")}
              >
                AddUser
              </Nav.Link>
            </LinkContainer>
            {username ? (
              <Nav.Link
                className={`${activeTab == "About" ? "active" : ""}`}
                onClick={handleLogout}
              >
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link onClick={() => navigate("/admin/login")}>
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
