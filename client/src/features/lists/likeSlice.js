import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";

const initialState = {
  users: null,
  likeParams: initParams(),
  likesLoaded: false,
  metaData: null,
};

function getAxiosParams(likeParams) {
  const params = new URLSearchParams();
  params.append("pageNumber", likeParams.pageNumber.toString());
  params.append("pageSize", likeParams.pageSize.toString());
  params.append("predicate", likeParams.predicate.toString());
  return params;
}

function initParams() {
  return {
    pageNumber: 1,
    pageSize: 2,
    predicate: "likedBy",
  };
}

export const likesUser = createAsyncThunk(
  "like/likesUser",
  async (_, thunkAPI) => {
    const params = getAxiosParams(thunkAPI.getState().like.likeParams);
    try {
      const response = await agent.Like.getLikes(params);
      thunkAPI.dispatch(setMetaData(response.metaData));
      return response.items;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    setLikesParams: (state, action) => {
      state.likesLoaded = false;
      state.likeParams = {
        ...state.likeParams,
        ...action.payload,
        pageNumber: 1,
      };
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    setPageNumber: (state, action) => {
      state.likesLoaded = false;
      state.likeParams = {
        ...state.likeParams,
        ...action.payload,
      };
    },
    resetAllLikeStates: (state) => {
      state.users = null;
      state.likesLoaded = false;
      state.metaData = null;
      state.likeParams = initParams();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(likesUser.fulfilled, (state, action) => {
      state.users = action.payload;
      state.likesLoaded = true;
    });
  },
});

export const {
  setLikesParams,
  setMetaData,
  setPageNumber,
  resetAllLikeStates,
} = likeSlice.actions;
