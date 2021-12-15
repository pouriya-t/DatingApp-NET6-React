import { useState, useEffect } from "react";
import { AppBar, Box, MenuItem, Toolbar, Typography } from "@mui/material";
import SmallNavbar from "./SmallNavbar";
import LargeNavbar from "./LargeNavbar";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../store/configureStore";

const navStyles = {
  color: "inherit",
  textDecoration: "none",
  typography: "h6",
  "&:hover": { color: "grey.500" },
  "&.active": { color: "#0b1152", fontWeight: "bold" },
};

export default function Navbar() {
  const menuList = [
    { title: "Matches", path: "/members" },
    { title: "Lists", path: "/lists" },
    { title: "Messages", path: "/messages" },
  ];
  const [isSmall, setIsSmall] = useState(false);
  const { userInfo } = useAppSelector((state) => state.account);

  const windowSize = window.innerWidth;

  const handleResize = () => {
    if (window.innerWidth <= 1004) {
      setIsSmall(true);
    } else {
      setIsSmall(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize, true);
  }, [windowSize]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ padding: "6px" }}>
          <Toolbar>
            <MenuItem sx={navStyles} to="/" component={NavLink}>
              <Typography variant="h4">MUI</Typography>
            </MenuItem>
            {isSmall ? (
              <SmallNavbar
                userInfo={userInfo}
                menuList={menuList}
                navStyles={navStyles}
              />
            ) : (
              <LargeNavbar
                userInfo={userInfo}
                menuList={menuList}
                navStyles={navStyles}
              />
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}