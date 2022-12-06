import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const adminDetails = localStorage.getItem("admin")

const admin = JSON.parse(adminDetails)
let token
if (admin) {
  token = admin.token
} else {
  token = "invalid"
}

const initialState = {
  users: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
}

export const fetchUser = createAsyncThunk("users/fetchUsers", async () => {
  return await axios
    .get("http://localhost:5000/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
})
const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builders) => {
    builders.addCase(fetchUser.pending, (state) => {
      state.isLoading = true
    })
    builders.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.users = action.payload
    })
    builders.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false
      state.isSuccess = false
      state.message =
        action.error.message || "Something went wrong while fetching user"
    })
  },
})
export default userSlice.reducer
