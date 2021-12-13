import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";

const initialState = {
  userInfo: null,
};

export const signInUser = createAsyncThunk(
  "account/signInUser",
  async (data, thunkAPI) => {
    try {
      const userData = await agent.Account.login(data);
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const registerUser = createAsyncThunk(
  "account/registerUser",
  async (data, thunkAPI) => {
    try {
      const userData = await agent.Account.register(data);
      if (userData) {
        localStorage.setItem("user", JSON.stringify(userData));
        return userData;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "account/fetchCurrentUser",
  async () => {
    if (localStorage.getItem("user") !== null) {
      return JSON.parse(localStorage.getItem("user"));
    } else {
      return null;
    }
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    signOut: (state) => {
      state.userInfo = null;
      localStorage.removeItem("user");
    },
    setUser: (state, action) => {
      state.userInfo = { ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.userInfo = { ...action.payload };
    });
    builder.addMatcher(
      isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled),
      (state, action) => {
        state.userInfo = { ...action.payload };
      }
    );
  },
});

export const { setUser, signOut } = accountSlice.actions;
