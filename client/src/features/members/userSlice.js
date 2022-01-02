import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { store } from "../../app/store/configureStore";

const initialState = {
  userList: null,
  userDetails: null,
  userParams: initParams(),
  metaData: null,
  usersLoaded: false,
};

function getAxiosParams(userParams) {
  const params = new URLSearchParams();
  params.append("pageNumber", userParams.pageNumber.toString());
  params.append("pageSize", userParams.pageSize.toString());
  userParams.gender && params.append("gender", userParams.gender.toString());
  userParams.minAge && params.append("minAge", userParams.minAge.toString());
  userParams.maxAge && params.append("maxAge", userParams.maxAge.toString());
  userParams.orderBy && params.append("orderBy", userParams.orderBy.toString());
  return params;
}

export const getUsersList = createAsyncThunk(
  "users/getUsersList",
  async (_, thunkAPI) => {
    const params = getAxiosParams(thunkAPI.getState().user.userParams);
    try {
      const response = await agent.User.list(params);
      thunkAPI.dispatch(setMetaData(response.metaData));
      return response.items;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "users/getUserDetails",
  async (username, thunkAPI) => {
    const userList = store.getState().user?.userList;
    if (userList) {
      return userList.find((user) => user.username === username);
    } else {
      try {
        return await agent.User.user(username);
      } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.data });
      }
    }
  }
);

function initParams() {
  return {
    pageNumber: 1,
    pageSize: 4,
  };
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserParams: (state, action) => {
      state.usersLoaded = false;
      state.userParams = {
        ...state.userParams,
        ...action.payload,
        pageNumber: 1,
      };
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    setPageNumber: (state, action) => {
      state.usersLoaded = false;
      state.userParams = {
        ...state.userParams,
        ...action.payload,
      };
    },
    resetAllUserStates: (state) => {
      state.userList = null;
      state.userDetails = null;
      state.userParams = initParams();
      state.metaData = null;
      state.usersLoaded = false;
    },
    resetUserParams: (state) => {
      state.usersLoaded = false;
      state.userParams = initParams();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersList.fulfilled, (state, action) => {
      state.userList = action.payload;
      state.usersLoaded = true;
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.userDetails = action.payload;
    });
  },
});

export const {
  setMetaData,
  setPageNumber,
  setUserParams,
  resetUserParams,
  resetAllUserStates,
} = userSlice.actions;
