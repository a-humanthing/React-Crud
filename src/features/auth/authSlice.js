import { createSlice } from "@reduxjs/toolkit"

//get user from local storage

const user = JSON.parse(localStorage.getItem("user"))
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}
//Register user

export const authSlice = createSlice({
  name: "auth",
  initialState,
  //below function can'nt be asynchronous
  reducers: {
    reset: (state) => {
      state.user = null
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ""
    },
    login: (state, action) => {
      state.user = action.payload
      state.isSuccess = true
    },
  },
  extraReducers: () => {},
  //for asynchronous functions add extrareducers
})

export const { reset, login } = authSlice.actions
export const selectUser = (state) => state.user.user
export default authSlice.reducer
