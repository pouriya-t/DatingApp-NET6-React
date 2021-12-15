import { Button, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAppSelector } from "../../app/store/configureStore";
import Register from "../account/Register";

export default function HomePage() {
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  const { userInfo } = useAppSelector((state) => state.account);

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        marginTop="5%"
      >
        {isRegisterForm && !userInfo ? (
          <>
            <Register setIsRegisterForm={setIsRegisterForm} />
          </>
        ) : (
          <>
            <Typography variant="h2">Find your match</Typography>
            <Typography variant="h6">
              Come on to view your matches...
            </Typography>

            <Stack spacing={2} direction="row">
              {!userInfo && (
                <Button
                  variant="contained"
                  onClick={() => setIsRegisterForm(true)}
                >
                  Register
                </Button>
              )}
              <Button color="secondary" variant="contained">
                Learn More
              </Button>
            </Stack>
            <Grid item xs={6} md={8}>
              <p>xs=6 md=8</p>
            </Grid>
            <Grid item xs={6} md={8}>
              <p>xs=6 md=8</p>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}
