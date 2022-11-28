import React, { useEffect, useState } from "react"
import NavBar from "../Components/Nav/NavBar"
import "./Home.css"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import axios from "axios"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
const Home = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users")
    if (response.status == 200) {
      setData(response.data)
    }
  }
  const onDeleteUser = async (id) => {
    if (window.confirm("Do you want delete?")) {
      const response = await axios.delete(`http://localhost:5000/user/${id}`)
      if (response.status === 200) {
        toast.success(response.data)
        getUsers()
      }
    }
  }
  console.log("data=>", data)
  return (
    <div>
      <div style={{ marginTop: "150px" }}>
        <Table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No.</th>
              <th style={{ textAlign: "center" }}>Name</th>
              <th style={{ textAlign: "center" }}>Email</th>
              <th style={{ textAlign: "center" }}>Contact</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                      <Link to={`/update/${item._id}`}>
                        <Button className="btn" variant="primary">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        className="btn"
                        variant="danger"
                        onClick={() => onDeleteUser(item._id)}
                      >
                        Delete
                      </Button>
                      <Link to={`/view/${item._id}`}>
                        <Button className="btn" variant="info">
                          View
                        </Button>
                      </Link>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default Home
