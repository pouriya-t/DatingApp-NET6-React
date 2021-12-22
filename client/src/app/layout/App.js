import { useCallback, useEffect, useState } from "react";
import HomePage from "../../features/home/HomePage";
import Navbar from "../components/Header/Navbar";
import { useAppDispatch } from "../store/configureStore";
import "./styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import MemberList from "../../features/members/MemberList";
import MemberDetails from "../../features/members/MemberDetails";
import Lists from "../../features/lists/Lists";
import Messages from "../../features/messages/Messages";
import PrivateRoute from "./PrivateRoute";
import ErrorDisplay from "../../features/errors/ErrorDisplay";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import UserProfile from "../../features/account/UserProfile";

function App() {
  const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp()
      .then(async () => await sleep())
      .finally(() => setLoading(false));
  }, [initApp]);

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage loading={loading} />} />
        <Route exact path="/server-error" element={<ServerError />} />
        <Route exact path="/error" element={<ErrorDisplay />} />
        {/* <Route element={<PrivateRoute roles={false} />}>
          <Route path="/members" element={<MemberList />} />
        </Route> */}
        <Route element={<PrivateRoute />}>
          <Route path="/lists" element={<Lists />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/members" element={<MemberList />} />
          <Route path="/members/:id" element={<MemberDetails />} />
          <Route path="/member/edit" element={<UserProfile />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
