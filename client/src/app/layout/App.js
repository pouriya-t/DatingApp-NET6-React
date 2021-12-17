import { useCallback, useEffect, useState } from "react";
import HomePage from "../../features/home/HomePage";
import Navbar from "../components/Header/Navbar";
import { useAppDispatch } from "../store/configureStore";
import "./styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MemberList from "../../features/members/MemberList";
import Lists from "../../features/lists/Lists";
import Messages from "../../features/messages/Messages";
import PrivateRoute from "./PrivateRoute";
import ErrorDisplay from "../../features/errors/ErrorDisplay";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";

function App() {
  const sleep = () => new Promise((resolve) => setTimeout(resolve, 2000));
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
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage loading={loading} />} />
          <Route exact path="/server-error" element={<ServerError />} />
          <Route exact path="/error" element={<ErrorDisplay />} />
          <Route element={<PrivateRoute roles={false} />}>
            <Route path="/members" element={<MemberList />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/lists" element={<Lists />} />
            <Route path="/messages" element={<Messages />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
