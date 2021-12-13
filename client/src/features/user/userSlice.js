import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";

const initialState = {
  userList: null,
  user: null,
};

export const getUserList = createAsyncThunk(
  "users/getUserList",
  async (_, thunkAPI) => {
    try {
      return await agent.User.list();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserList.fulfilled, (state, action) => {
      state.userList = action.payload;
    });
  },
});
