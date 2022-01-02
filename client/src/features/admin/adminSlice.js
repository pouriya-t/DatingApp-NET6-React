import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";

const initialState = {
  usersWithRoles: null,
};

export const getUsersWithRoles = createAsyncThunk(
  "admin/getUsersWithRoles",
  async (_, thunkAPI) => {
    try {
      return await agent.Admin.getUsersWithRoles();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetAllAdminStates: (state) => {
      state.usersWithRoles = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersWithRoles.fulfilled, (state, action) => {
      state.usersWithRoles = action.payload;
    });
  },
});

export const { resetAllAdminStates } = adminSlice.actions;
