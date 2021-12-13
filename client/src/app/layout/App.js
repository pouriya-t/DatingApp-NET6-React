import { useEffect } from "react";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import HomePage from "../../features/home/HomePage";
import Navbar from "../components/Header/Navbar";
import { useAppDispatch } from "../store/configureStore";
import "./styles.css";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <HomePage />
    </>
  );
}

export default App;
