import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, getOneUser, getUsers } from "./users.actions";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    error: false,
    loading: false,
    users: [],
    currentUser: null,
    oneUser: null,
  },
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(getOneUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getOneUser.fulfilled, (state, action) => {
        state.loading = false;
        state.oneUser = action.payload;
      });
  },
});

export default usersSlice.reducer;
export const { logout } = usersSlice.actions;
