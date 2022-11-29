import React, { useState, useEffect } from "react"
import axios from "axios"
import "./View.css"
import { useNavigate, useParams } from "react-router-dom"
const View = () => {
  const [user, setUser] = useState("")
  const { id } = useParams()
  useEffect(() => {
    if (id) {
      console.log("called")
      getSingleUser(id)
    }
  }, [id])

  const navigate = useNavigate()

  const getSingleUser = async (id) => {
    const response = await axios.get(`http://localhost:5000/user/${id}`)
    if (response.status === 200) {
      console.log("o", response.data)
      setUser({ ...response.data })
    } else {
      console.log("something went wrong")
    }
  }
  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <h1>User Details</h1>
        </div>
        <div className="container">
          <strong>ID:</strong>
          <strong>{user._id}</strong>
          <br />
          <strong>Name:</strong>
          <strong>{user.name}</strong>
          <br />
          <strong>Email:</strong>
          <strong>{user.email}</strong>
          <br />
          <strong>Phone:</strong>
          <strong>{user.phone}</strong>
          <br />
          <button onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
    </div>
  )
}

export default View
