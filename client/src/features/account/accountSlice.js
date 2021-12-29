import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import { resetAllLikeStates } from "../lists/likeSlice";
import { resetAllUserStates } from "../members/userSlice";

const initialState = {
  userInfo: undefined,
  userProfile: null,
};

export const signInUser = createAsyncThunk(
  "account/signInUser",
  async (data, thunkAPI) => {
    try {
      const userData = await agent.Account.login(data);
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } catch (error) {
      toast.error(error.response.data);
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
    return JSON.parse(localStorage.getItem("user"));
  }
);

export const getUserProfile = createAsyncThunk(
  "users/getUserProfile",
  async (_, thunkAPI) => {
    try {
      const getUserName = thunkAPI.getState().account?.userInfo.username;
      const userInfo = await agent.User.user(getUserName);
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

export const uploadPhoto = createAsyncThunk(
  "account/uploadPhoto",
  async (data, thunkAPI) => {
    try {
      return await agent.Account.uploadPhoto(data);
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const isMainPhoto = createAsyncThunk(
  "account/isMainPhoto",
  async (id, thunkAPI) => {
    try {
      await agent.Account.setMainPhoto(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const deletePhoto = createAsyncThunk(
  "account/deletePhoto",
  async (id, thunkAPI) => {
    try {
      await agent.Account.deletePhoto(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const signOut = createAsyncThunk("account/signOut", (_, thunkAPI) => {
  localStorage.removeItem("user");
  thunkAPI.dispatch(resetAllUserStates());
  thunkAPI.dispatch(resetAllLikeStates());
});

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = { ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.userInfo = { ...action.payload };
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.userProfile = action.payload;
    });
    builder.addCase(uploadPhoto.fulfilled, (state, action) => {
      state.userProfile.photos.push(action.payload);
    });
    builder.addCase(isMainPhoto.fulfilled, (state, action) => {
      for (const photo in state.userProfile.photos) {
        if (state.userProfile.photos[photo].isMain) {
          state.userProfile.photos[photo].isMain = false;
        }

        if (state.userProfile.photos[photo].id === action.payload) {
          state.userProfile.photos[photo].isMain = true;
        }
      }
    });
    builder.addCase(deletePhoto.fulfilled, (state, action) => {
      state.userProfile.photos = state.userProfile.photos.filter(
        (p) => p.id !== action.payload
      );
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.userProfile = action.payload;
      toast.success("Your profile updated.");
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.userInfo = null;
      state.userProfile = null;
    });
    builder.addMatcher(
      isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled),
      (state, action) => {
        state.userInfo = action.payload;
      }
    );
    builder.addMatcher(isAnyOf(signInUser.rejected), (_, action) => {
      throw action.payload;
    });
  },
});

export const { setUser } = accountSlice.actions;
