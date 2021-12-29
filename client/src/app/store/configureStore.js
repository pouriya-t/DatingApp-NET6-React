import { useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../../features/members/userSlice";
import { accountSlice } from "../../features/account/accountSlice";
import { likeSlice } from "../../features/lists/likeSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    account: accountSlice.reducer,
    like: likeSlice.reducer,
  },
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
