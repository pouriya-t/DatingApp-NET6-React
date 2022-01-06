import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import getRolesFromToken from "../../app/utils/getRolesFromToken";
import { resetAllAdminStates } from "../admin/adminSlice";
import { resetAllLikeStates } from "../lists/likeSlice";
import { resetAllUserStates } from "../members/userSlice";
import { resetAllMessageStates } from "../messages/messageSlice";
import {
  PresenceService,
  // createHubConnection,
  // stopHubConnection,
} from "../../app/services/hubServices/PresenceService";

export const presence = new PresenceService();

const initialState = {
  userInfo: null,
  userProfile: null,
};

export const signInUser = createAsyncThunk(
  "account/signInUser",
  async (data, thunkAPI) => {
    try {
      const userData = await agent.Account.login(data);
      localStorage.setItem("user", JSON.stringify(userData));
      presence.createHubConnection(userData);
      userData.roles = getRolesFromToken(userData.token);
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
      localStorage.setItem("user", JSON.stringify(userData));
      presence.createHubConnection(userData);
      userData.roles = getRolesFromToken(userData.token);
      return userData;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "account/fetchCurrentUser",
  async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      presence.createHubConnection(user);
      const userRoles = getRolesFromToken(user?.token);
      user.roles = userRoles;
    }
    return user;
  }
);

export const getUserProfile = createAsyncThunk(
  "account/getUserProfile",
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
  "account/updateUserProfile",
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
  try {
    localStorage.removeItem("user");
    presence.stopHubConnection();
    thunkAPI.dispatch(resetAllUserStates());
    thunkAPI.dispatch(resetAllLikeStates());
    thunkAPI.dispatch(resetAllMessageStates());
    thunkAPI.dispatch(resetAllAdminStates());
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
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
