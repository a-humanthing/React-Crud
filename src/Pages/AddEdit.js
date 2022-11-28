import React, { useEffect, useState } from "react"
import NavBar from "../Components/Nav/NavBar"
import axios from "axios"
import "./AddEdit.css"
import "react-toastify/dist/ReactToastify.css"
import { redirect, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useParams } from "react-router-dom"
const initialState = {
  name: "",
  email: "",
  phone: "",
}
const AddEdit = () => {
  const [state, setState] = useState(initialState)
  const { name, email, phone } = state

  const addUser = async (data) => {
    const response = await axios.post("http://localhost:5000/user", data)
    if (response.status === 200) {
      toast(response.data)
    }
  }

  const updateUser = async (data, id) => {
    const response = await axios.put(`http://localhost:5000/user/${id}`, data)
    if (response.status === 200) {
      toast.success(response.data)
    } else {
      toast.error("Something Went Wrong!")
    }
  }

  const navigate = useNavigate()
  const { id } = useParams()
  useEffect(() => {
    if (id) {
      getSingleUser(id)
    }
  }, [id])

  const getSingleUser = async (id) => {
    const response = await axios.get(`http://localhost:5000/user/${id}`)
    if (response.status === 200) {
      setState({ ...response.data })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !phone) {
      toast.error("Fields Can not be empty")
    } else {
      if (id) {
        updateUser(state, id)
      } else {
        addUser(state)
      }
      setTimeout(() => navigate("/"), 500)
    }
  }
  const handleInputChange = (e) => {
    let { name, value } = e.target
    setState({ ...state, [name]: value })
  }
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        onSubmit={handleSubmit}
        style={{ margin: "auto", padding: "15px", alignContent: "center" }}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter Name"
          onChange={handleInputChange}
          value={name}
        />
        <label htmlFor="name">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleInputChange}
          value={email}
        />
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          placeholder="Enter Phone"
          onChange={handleInputChange}
          value={phone}
        />
        <input type="submit" value={id ? "Update" : "Add"} />
      </form>
    </div>
  )
}

export default AddEdit
