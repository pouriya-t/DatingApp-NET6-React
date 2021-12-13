import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Menu, MenuItem, IconButton, Divider, Box } from "@mui/material";
import UserLoginHeader from "./UserLoginHeader";

export default function SmallNavbar({ menuList }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton sx={{ color: "#fff" }} onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ width: "80%" }}
        keepMounted
      >
        {menuList.map((menuItem) => (
          <MenuItem onClick={handleClose} key={menuItem}>
            {menuItem}
          </MenuItem>
        ))}
        <Divider />
        <Box sx={{ padding: "5px", backgroundColor: "#19b3d2" }}>
          <UserLoginHeader />
        </Box>
      </Menu>
    </>
  );
}
