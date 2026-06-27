import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("/db.json");

  if (!response.ok) {
    throw new Error("Kullanıcı verileri alınamadı.");
  }

  const data = await response.json();
  return data.users;
});

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    toggleUserStatus: (state, action) => {
      const user = state.users.find((item) => item.id === action.payload);

      if (user) {
        user.status = user.status === "Aktif" ? "Pasif" : "Aktif";
      }
    },

    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { toggleUserStatus, deleteUser } = userSlice.actions;
export default userSlice.reducer;