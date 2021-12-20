import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Container, Grid, Tab } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import agent from "../../app/api/agent";
import MemberCard from "./MemberCard";
import MemberDescription from "./MemberDescription";
import MemberImages from "./MemberImages";

export default function MemberDetails() {
  const { state: currentUsername } = useLocation();
  const [user, setUser] = useState({});
  const [value, setValue] = useState("1");

  useEffect(() => {
    agent.User.user(currentUsername)
      .then((user) => setUser(user))
      .catch((error) => console.log(error));
  }, [currentUsername]);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <MemberCard user={user} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  variant="scrollable"
                  allowScrollButtonsMobile
                  indicatorColor="secondary"
                  textColor="secondary"
                  onChange={handleChange}
                >
                  <Tab
                    sx={styleTab}
                    label={`About ${user.username}`}
                    value="1"
                  />
                  <Tab sx={styleTab} label="Interests" value="2" />
                  <Tab sx={styleTab} label="Photos" value="3" />
                  <Tab sx={styleTab} label="Messages" value="4" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <MemberDescription user={user} />
              </TabPanel>
              <TabPanel value="2">Interstsss </TabPanel>
              <TabPanel value="3">
                <MemberImages photos={user.photos} />
              </TabPanel>
              <TabPanel value="4">Item 4</TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
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
