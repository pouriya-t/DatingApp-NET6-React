import { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Container, Stack, Tab, Typography } from "@mui/material";
import TableAdminUsers from "./TableAdminUsers";

export default function Admin() {
  const [value, setValue] = useState("1");

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };
  return (
    <Container>
      <Typography variant="h3">Admin Panel</Typography>
      <Stack
        sx={{
          mt: 2,
          p: 2,
          borderRadius: 5,
          border: "1px solid gray",
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 2 }}>
            <TabList
              variant="scrollable"
              allowScrollButtonsMobile
              indicatorColor="secondary"
              textColor="secondary"
              onChange={handleChange}
            >
              <Tab sx={styleTab} label="User Management" value="1" />
              <Tab sx={styleTab} label="Photo Management" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <TableAdminUsers />
          </TabPanel>
          <TabPanel value="2">Second Item</TabPanel>
        </TabContext>
      </Stack>
    </Container>
  );
}

const styleTab = {
  fontWeight: 950,
  textTransform: "capitalize",
  "&.Mui-selected": {
    backgroundColor: "#e6f4f5",
    transition: "0.5s ease-in-out",
  },
};
