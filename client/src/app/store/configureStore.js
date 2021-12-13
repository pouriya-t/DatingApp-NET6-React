import { useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { accountSlice } from "../../features/account/accountSlice";
import { userSlice } from "../../features/user/userSlice";

export const store = configureStore({
  reducer: {
    account: accountSlice.reducer,
    user: userSlice.reducer,
  },
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
