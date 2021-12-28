import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  Grid,
  NativeSelect,
  TextField,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { useState } from "react";
import { useAppSelector } from "../../app/store/configureStore";
import { resetUserParams, setUserParams } from "./userSlice";

export default function FilterMembers({
  dispatch,
  loading,
  setLoading,
  usersLoaded,
}) {
  const { userInfo } = useAppSelector((state) => state.account);
  const [gender, setGender] = useState(
    userInfo.gender === "male" ? "female" : "male"
  );
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(150);
  const [alignment, setAlignment] = useState("");

  const handleAlignment = (_, newAlignment) => {
    setAlignment(newAlignment);
  };

  async function handleSubmit() {
    setLoading("applyFilters" + !usersLoaded);
    dispatch(setUserParams({ gender, minAge, maxAge }));
    setLoading("applyFilters" + usersLoaded);
  }

  async function resetFilters() {
    setLoading("resetFilters" + !usersLoaded);
    dispatch(resetUserParams());
    setGender(userInfo.gender === "male" ? "female" : "male");
    setMinAge(18);
    setMaxAge(150);
    setLoading("resetFilters" + usersLoaded);
    setAlignment("");
  }

  async function handleLastActive() {
    setLoading("lastActive" + !usersLoaded);
    dispatch(setUserParams({ orderBy: "lastActive" }));
    setLoading("lastActive" + usersLoaded);
  }

  function handleNewestMembers() {
    setLoading("created" + !usersLoaded);
    dispatch(setUserParams({ orderBy: "created" }));
    setLoading("created" + usersLoaded);
  }

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      marginBottom="5vh"
    >
      <Grid item xs={6} sm={2}>
        <Typography>Age from</Typography>
        <TextField
          id="outlined-number"
          value={minAge}
          type="number"
          onInput={(e) => {
            if (e.target.value > 150 || e.target.value <= 0) {
              setMinAge(18);
            } else {
              setMinAge(e.target.value);
            }
          }}
        />
      </Grid>
      <Grid item xs={6} sm={2}>
        <Typography>Age to</Typography>
        <TextField
          id="outlined-number"
          value={maxAge}
          onInput={(e) => {
            if (e.target.value > 150 || e.target.value <= 0) {
              setMaxAge(150);
            } else {
              setMaxAge(e.target.value);
            }
          }}
          type="number"
        />
      </Grid>
      <Grid item xs={6} sm={2}>
        <Typography>Gender</Typography>
        <FormControl sx={{ width: "80%" }}>
          <NativeSelect
            onChange={(e) => setGender(e.target.value)}
            value={gender}
          >
            <option value="male">Man</option>
            <option value="female">Woman</option>
          </NativeSelect>
        </FormControl>
      </Grid>
      <Grid item xs={6} sm={2} sx={{ mt: 2 }}>
        <LoadingButton
          loading={loading === "applyFilters" + !usersLoaded}
          onClick={handleSubmit}
          color="success"
          variant="contained"
        >
          Apply filters
        </LoadingButton>
      </Grid>
      <Grid item xs={6} sm={2} sx={{ mt: 2 }}>
        <LoadingButton
          loading={loading === "resetFilters" + !usersLoaded}
          onClick={resetFilters}
          color="primary"
          variant="contained"
        >
          Reset filters
        </LoadingButton>
      </Grid>
      <Grid item xs={6} sm={2}>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          color="primary"
        >
          <ToggleButton
            sx={{
              backgroundColor: "#5f7fe8",
              color: "white",
              "&:hover": {
                backgroundColor: "#8ba4f7",
              },
            }}
            variant="contained"
            onClick={handleLastActive}
            value="left"
            aria-label="left aligned"
          >
            Last Actives
          </ToggleButton>
          <ToggleButton
            sx={{
              backgroundColor: "#5f7fe8",
              color: "white",
              "&:hover": {
                backgroundColor: "#8ba4f7",
              },
            }}
            value="right"
            aria-label="right aligned"
            onClick={handleNewestMembers}
            variant="contained"
          >
            Newest Members
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
}
