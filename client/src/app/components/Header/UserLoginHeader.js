import Login from "../../../features/account/Login";
import SelectMenu from "./SelectMenu";
import { useAppSelector } from "../../store/configureStore";

export default function UserLoginHeader() {
  const { userInfo } = useAppSelector((state) => state.account);

  return <>{userInfo ? <SelectMenu userInfo={userInfo} /> : <Login />}</>;
}
