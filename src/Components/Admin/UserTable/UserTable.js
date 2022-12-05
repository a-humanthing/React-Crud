import React, { useCallback, useEffect, useMemo, useState } from "react"
import NavBar from "../../Nav/NavBar"
import "./UserTable.css"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import axios from "axios"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
const UserTable = () => {
  const [data, setData] = useState([])
  const adminDetails = localStorage.getItem("admin")

  useEffect(() => {
    if (adminDetails) getUsers()
  }, [])

  const getUsers = async () => {
    const admin = JSON.parse(adminDetails)
    const token = admin.token
    const response = await axios.get("http://localhost:5000/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (response.status == 200) {
      console.log("data=>", response.data)
      setData(response.data.users)
      toast.success("Authorized as admin")
    } else {
      toast.error("You have to login as Admin")
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
                      <Link to={`/admin/update/${item._id}`}>
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
                      <Link to={`/admin/view/${item._id}`}>
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

export default UserTable
