import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Container, Grid, Tab, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { getUserProfile } from "../user/userSlice";
import ProfileCard from "./ProfileCard";
import UserDescription from "./UserDescription";

export default function UserProfile() {
  const { userProfile } = useAppSelector((state) => state.user);
  const profileForm = useForm({ mode: "onChange" });
  const [value, setValue] = useState("1");
  const dispatch = useAppDispatch();
  const {
    reset,
    formState: { isDirty },
  } = profileForm;

  useEffect(() => {
    !userProfile && dispatch(getUserProfile());
    if (userProfile) {
      const { introduction, lookingFor, interests, city, country } =
        userProfile;
      reset({ introduction, lookingFor, interests, city, country });
    }
  }, [dispatch, reset, userProfile]);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  window.onbeforeunload = function () {
    if (isDirty) {
      return false;
    }
    return;
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h3" component="div">
            Your Profile
            <ProfileCard userProfile={userProfile} profileForm={profileForm} />
          </Typography>
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
                    label={`About ${userProfile?.username}`}
                    value="1"
                  />
                  <Tab sx={styleTab} label="Edit Photos" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <UserDescription profileForm={profileForm} />
              </TabPanel>
              <TabPanel value="2">Edit Photos </TabPanel>
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
