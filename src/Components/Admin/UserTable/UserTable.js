import React, { useCallback, useEffect, useMemo, useState } from "react"
import NavBar from "../../Nav/NavBar"
import "./UserTable.css"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"
import axios from "axios"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { fetchUser } from "../../../features/admin/userSlice"
import UserModal from "../UserModal"
const UserTable = () => {
  //const [data, setData] = useState([])
  const adminDetails = localStorage.getItem("admin")
  const dispatch = useDispatch()
  const userdata = useSelector((state) => state.users)
  const [modal, setModal] = useState([])

  // console.log("userdata = ", userdata)

  useEffect(() => {
    dispatch(fetchUser())
  }, [adminDetails])

  useEffect(() => {
    console.log(modal)
  }, [modal])
  const onDeleteUser = async (id) => {
    if (window.confirm("Do you want delete?")) {
      const response = await axios.delete(`http://localhost:5000/user/${id}`)
      if (response.status === 200) {
        toast.success(response.data)
        dispatch(fetchUser())
        //getUsers()
      }
    }
  }
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const showModal = async (id) => {
    const response = await axios.get(`http://localhost:5000/user/${id}`)
    if (response.status === 200) {
      setModal(response.data)
      setShow(true)
      //dispatch(fetchUser())
      //getUsers()
    }
  }
  return (
    <div>
      {userdata.isLoading && (
        <div className="">
          <Spinner animation="border" />
          <h1>Loading...</h1>
        </div>
      )}
      {userdata.message.length > 1 ? (
        <div>
          <h3>{userdata.message}</h3>
        </div>
      ) : (
        <div style={{ margin: "50px" }}>
          {/* {show && <UserModal />} */}
          <Table className=" table-success table-striped">
            <thead>
              <tr className="table-dark">
                <th style={{ textAlign: "center" }}>No.</th>
                <th style={{ textAlign: "center" }}>Name</th>
                <th style={{ textAlign: "center" }}>Email</th>
                <th style={{ textAlign: "center" }}>Contact</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>

            <tbody>
              {userdata.users.users &&
                userdata.users.users.map((item, index) => {
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
                          <Button
                            className="btn"
                            variant="info"
                            // onClick={() => setShow(true)}
                          >
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
      )}
    </div>
  )
}

export default UserTable
