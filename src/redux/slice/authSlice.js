import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  currentUser: null,
  token: null,
  message: null,
  isLoggedIn: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const newUser = action.payload;
      // payload berisi passwordHash, bukan password

      const exists = state.users.find((u) => u.email === newUser.email);
      if (exists) {
        state.error = "Email sudah terdaftar";
        return;
      }

      state.users.push(newUser);
      state.error = null;
    },

    loginSuccess: (state, action) => {
      const { token, message, success, ...user } = action.payload;

      if (!success) {
        state.error = "Login gagal";
        return;
      }

      state.currentUser = user;
      state.token = token;
      state.message = message;
      state.isLoggedIn = true;
      state.error = null;
    },

    loginFail: (state, action) => {
      state.error = action.payload;
      state.isLoggedIn = false;
      state.currentUser = null;
    },

    logoutUser: (state) => {
      state.currentUser = null;
      state.token = null;
      state.message = null;
      state.isLoggedIn = false;
      state.error = null;
    },
  },
});

export const { registerUser, loginSuccess, loginFail, logoutUser } =
  authSlice.actions;

export default authSlice.reducer;
