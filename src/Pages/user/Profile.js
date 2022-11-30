import React, { useEffect, useState } from "react"
import "./Profile.css"
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Button } from "react-bootstrap"

export default function Profile() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [image, setImage] = useState("")
  const [profilepic, setProfilepic] = useState("")

  const userDetails = localStorage.getItem("user")
  useEffect(() => {
    // setUserData(localStorage.getItem("user"))
    // console.log("user data = ", userData

    if (!userDetails) {
      toast.error("Unauthorized user route")
      setTimeout(() => {
        navigate("/user/home")
      }, 500)
    }
  }, [])
  // if (!userData) {
  //   toast.error("Unauthorized route")
  //   setTimeout(() => {
  //     navigate("/user/home")
  //   }, 500)
  // }
  //console.log("userDetails = ", userDetails)

  useEffect(() => {
    async function fetchData() {
      const user = JSON.parse(userDetails)
      const token = user.token
      const response = await axios.get("http://localhost:5000/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.data.success) {
        console.log(response.data.user)
        const data = response.data.user
        setEmail(data.email)
        setName(data.name)
        setPhone(data.phone)
        setProfilepic(data.profilepic)
        console.log("authorized")
        toast.success("Authorized")
      } else {
        console.log("Unauthorized")
        toast.error("Unauthorized route")
        setTimeout(() => {
          navigate("-1")
        }, 500)
      }
    }
    if (userDetails) fetchData()
  }, [])

  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append("file", image)
    formData.append("upload_preset", "ews1hedm")
    formData.append("cloud_name", "dsehj85r6")
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dsehj85r6/image/upload",
        {
          method: "POST",
          body: formData,
        }
      )
      const data = await response.json()
      const url = data.url
      if (data) {
        const userDetails = await localStorage.getItem("user")
        const user = JSON.parse(userDetails)
        const id = user.id
        console.log(user)
        const response = await axios.post("http://localhost:5000/uploadpic", {
          url,
          id,
        })
        console.log("res from upload back = ", response)
        setProfilepic(response.data.user.profilepic)
      }
      console.log(data)
    } catch (error) {}
  }

  return (
    <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
              <MDBRow className="g-0">
                <MDBCol
                  md="4"
                  className="gradient-custom text-center text-white"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }}
                >
                  <MDBCardImage
                    src={
                      profilepic
                        ? profilepic
                        : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    }
                    alt="Avatar"
                    className="my-5 "
                    style={{
                      maxWidth: "150px",
                      minWidth: "150px",
                      maxHeight: "150px",
                      minHeight: "150px",
                      objectFit: "cover",
                      overflow: "hidden",
                    }}
                    fluid
                  />
                  <MDBTypography tag="h5">{name}</MDBTypography>
                  <MDBCardText>Web Designer</MDBCardText>
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">
                          {email}
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">
                          {phone}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBTypography tag="h6">Action</MDBTypography>
                    <hr className="mt-0 mb-4" />

                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">
                          Update Profile Pic
                        </MDBTypography>
                        <MDBCardText className="text-muted">
                          <input
                            type="file"
                            name="image"
                            onChange={(e) => setImage(e.target.files[0])}
                          />
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3 my-auto">
                        <Button onClick={handleSubmit} variant="primary">
                          Upload
                        </Button>
                      </MDBCol>
                    </MDBRow>

                    <div className="d-flex justify-content-start">
                      <a href="#!">
                        <MDBIcon fab icon="facebook me-3" size="lg" />
                      </a>
                      <a href="#!">
                        <MDBIcon fab icon="twitter me-3" size="lg" />
                      </a>
                      <a href="#!">
                        <MDBIcon fab icon="instagram me-3" size="lg" />
                      </a>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  )
}
