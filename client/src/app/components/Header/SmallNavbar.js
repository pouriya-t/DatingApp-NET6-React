import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Menu, MenuItem, IconButton, Divider, Box, Paper } from "@mui/material";
import { NavLink } from "react-router-dom";
import UserLoginHeader from "./UserLoginHeader";

const styles = {
  fontWeight: "bold",
};
export default function SmallNavbar({ menuList, navStyles, userInfo }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const combineStyle = {
    ...navStyles,
    ...styles,
  };
  return (
    <>
      <IconButton sx={{ color: "#fff" }} onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ width: "80%" }}
        keepMounted
      >
        <Paper
          sx={{
            color: "#9c27b0",
            backgroundColor: "#e1e6f2",
          }}
        >
          {userInfo &&
            menuList.map((item, id) => (
              <MenuItem
                key={id}
                to={item.path}
                sx={combineStyle}
                onClick={handleClose}
                component={NavLink}
              >
                {item.title}
              </MenuItem>
            ))}
          <Divider />
          <Box sx={{ padding: "5px" }}>
            <UserLoginHeader />
          </Box>
        </Paper>
      </Menu>
    </>
  );
}
