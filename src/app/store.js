import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import userReducer from "../features/admin/userSlice"

export default configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
  },
})
