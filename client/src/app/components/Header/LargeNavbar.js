import { Box, MenuItem } from "@mui/material";
import { NavLink } from "react-router-dom";
import UserLoginHeader from "./UserLoginHeader";

const styles = {
  fontWeight: "bold",
};
export default function LargeNavbar({ menuList, navStyles, userInfo }) {
  const combineStyle = {
    ...navStyles,
    ...styles,
  };
  return (
    <>
      <Box sx={{ display: { xs: "none", md: "flex" }, marginLeft: "20px" }}>
        {userInfo &&
          menuList.map((item, id) => (
            <MenuItem
              key={id}
              to={item.path}
              sx={combineStyle}
              component={NavLink}
            >
              {item.title}
            </MenuItem>
          ))}
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <UserLoginHeader />
    </>
  );
}
