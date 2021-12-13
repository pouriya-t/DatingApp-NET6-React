import { Box, MenuItem, Typography } from "@mui/material";
import UserLoginHeader from "./UserLoginHeader";

export default function LargeNavbar({ menuList }) {
  return (
    <>
      <Box sx={{ display: { xs: "none", md: "flex" }, marginLeft: "20px" }}>
        {menuList.map((menuItem) => (
          <MenuItem key={menuItem} size="large" color="inherit">
            <Typography sx={{ fontWeight: "bold" }} textAlign="center">
              {menuItem}
            </Typography>
          </MenuItem>
        ))}
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <UserLoginHeader />
    </>
  );
}
