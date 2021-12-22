import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import { store } from "../../app/store/configureStore";

const initialState = {
  userList: null,
  userProfile: null,
  userDetails: null,
};

export const getUsersList = createAsyncThunk(
  "users/getUsersList",
  async (_, thunkAPI) => {
    try {
      return await agent.User.list();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "users/getUserDetails",
  async (username) => {
    const userList = store.getState().user?.userList;
    const userDetails = await userList.find(
      (user) => user.username === username
    );
    return userDetails;
  }
);

export const getUserProfile = createAsyncThunk(
  "users/getUserProfile",
  async (_, thunkAPI) => {
    try {
      const getUserName = store.getState().account?.userInfo.username;
      const userInfo = agent.User.user(getUserName);
      return userInfo;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "users/updateUserProfile",
  async (values, thunkAPI) => {
    try {
      return await agent.User.updateProfile(values);
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
    builder.addCase(getUsersList.fulfilled, (state, action) => {
      state.userList = action.payload;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.userProfile = action.payload;
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.userDetails = action.payload;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.userProfile = action.payload;
      toast.success("Your profile updated.");
    });
  },
});
