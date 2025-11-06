import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios.js";
import { toast } from "react-hot-toast";

const initialState = {
  value: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async (token) => {
  const { data } = await api.get("/api/user/data", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.success ? data.user : null;
});

export const updateUser = createAsyncThunk(
  "user/update",
  async ({ userData, token }) => {
    try {
      const { data } = await api.post("/api/user/update", userData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      if (data.success) {
        return data.user;
      } else {
        throw new Error(data.message || 'Update failed');
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to update profile');
    }
  }
);

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
        state.value = action.payload
    }).addCase(updateUser.fulfilled, (state, action) => {
        state.value = action.payload
    })
  }
});

export default usersSlice.reducer;
