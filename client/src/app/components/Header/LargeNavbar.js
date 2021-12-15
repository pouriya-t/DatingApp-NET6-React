import { Box, MenuItem } from "@mui/material";
import { NavLink } from "react-router-dom";
import UserLoginHeader from "./UserLoginHeader";

export default function LargeNavbar({ menuList, navStyles, userInfo }) {
  return (
    <>
      <Box sx={{ display: { xs: "none", md: "flex" }, marginLeft: "20px" }}>
        {userInfo &&
          menuList.map((item, id) => (
            <MenuItem
              key={id}
              to={item.path}
              sx={(navStyles, { fontWeight: "bold" })}
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
