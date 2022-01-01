import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";

const initialState = {
  messages: null,
  messageParams: initParams(),
  messagesLoaded: false,
  metaData: null,
  userMessages: null,
  userMessagesLoad: false,
};

function getAxiosParams(messageParams) {
  const params = new URLSearchParams();
  params.append("pageNumber", messageParams.pageNumber.toString());
  params.append("pageSize", messageParams.pageSize.toString());
  params.append("container", messageParams.container.toString());
  return params;
}

function initParams() {
  return {
    pageNumber: 1,
    pageSize: 5,
    container: "Inbox",
  };
}

export const getMessages = createAsyncThunk(
  "message/getMessages",
  async (_, thunkAPI) => {
    const params = getAxiosParams(thunkAPI.getState().message.messageParams);
    try {
      const response = await agent.Message.getMessages(params);
      thunkAPI.dispatch(setMetaData(response.metaData));
      return response.items;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const threadMessages = createAsyncThunk(
  "message/threadMessages",
  async (username, thunkAPI) => {
    try {
      return await agent.Message.getThreadMessages(username);
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);


export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessagesParams: (state, action) => {
      state.messagesLoaded = false;
      state.messageParams = {
        ...state.messageParams,
        ...action.payload,
        pageNumber: 1,
      };
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    setPageNumber: (state, action) => {
      state.messagesLoaded = false;
      state.messageParams = {
        ...state.messageParams,
        ...action.payload,
      };
    },
    resetAllMessageStates: (state) => {
      state.messages = null;
      state.messageParams = initParams();
      state.messagesLoaded = false;
      state.metaData = null;
      state.userMessages = null;
      state.userMessagesLoad = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
      state.messagesLoaded = true;
    });
    builder.addCase(threadMessages.pending, (state, action) => {
      state.userMessagesLoad = true;
    });
    builder.addCase(threadMessages.fulfilled, (state, action) => {
      state.userMessages = action.payload;
      state.userMessagesLoad = false;
    });
  },
});

export const {
  setMessagesParams,
  setMetaData,
  setPageNumber,
  resetAllMessageStates,
} = messageSlice.actions;
