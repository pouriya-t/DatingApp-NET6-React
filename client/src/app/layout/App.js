import { useEffect } from "react";
import { fetchCurrentUser } from "../../features/account/accountSlice";
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

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route element={<PrivateRoute roles={false} />}>
            <Route path="/members" element={<MemberList />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/lists" element={<Lists />} />
            <Route path="/messages" element={<Messages />} />
          </Route>
          <Route path="/*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
