import { useState, useEffect } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import SmallNavbar from "./SmallNavbar";
import LargeNavbar from "./LargeNavbar";

export default function Navbar() {
  const menuList = ["Matches", "Lists", "Messages"];
  const [isSmall, setIsSmall] = useState(false);
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
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ padding: "6px" }}>
          <Toolbar>
            <Typography variant="h4" noWrap component="div">
              MUI
            </Typography>

            {isSmall ? (
              <SmallNavbar menuList={menuList} />
            ) : (
              <LargeNavbar menuList={menuList} />
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
