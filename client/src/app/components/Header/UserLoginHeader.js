import {
  Box,
  TextField,
  Select,
  Typography,
  Divider,
  MenuItem,
  Paper,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { signInUser, signOut } from "../../../features/account/accountSlice";

export default function UserLoginHeader() {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.account);
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      isSubmitting,
      //errors,
      isValid,
    },
  } = useForm({ mode: "onChange" });

  async function onSubmit(data, e) {
    try {
      await dispatch(signInUser(data));
      reset();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {userInfo?.username !== undefined ? (
        <>
          <Typography sx={{ mr: 2 }}>Welcome {userInfo.username}</Typography>
          <Select
            className={classes.select}
            inputProps={{
              classes: {
                icon: classes.icon,
                root: classes.root,
              },
            }}
            variant="standard"
          >
            <Paper>
              <MenuItem style={styles.loginSelected}>Account</MenuItem>
              <MenuItem style={styles.loginSelected}>Account 2</MenuItem>
              <Divider />
              <MenuItem
                className="logout-menuitem"
                style={styles.loginSelected}
                onClick={() => dispatch(signOut())}
              >
                Logout
              </MenuItem>
            </Paper>
          </Select>
        </>
      ) : (
        <>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              padding: "2px",
              backgroundColor: "#19b3d2",
              border: "none",
            }}
          >
            <TextField
              id="username"
              label="Username"
              variant="filled"
              type="text"
              InputProps={styles.disableUnderline}
              sx={styles.input}
              {...register("username", { required: "Username is required" })}
              // error={!!errors.username}
              // helperText={errors?.username?.message}
            />
            <TextField
              label="Password"
              variant="filled"
              type="password"
              InputProps={styles.disableUnderline}
              sx={styles.input}
              {...register("password", { required: "Password is required" })}
              // error={!!errors.password}
              // helperText={errors?.password?.message}
            />
            <LoadingButton
              loading={isSubmitting}
              disabled={!isValid}
              variant="contained"
              type="submit"
              color="secondary"
              sx={{ padding: "8px", marginLeft: "10px", margin: "10px" }}
            >
              Login
            </LoadingButton>
          </Box>
        </>
      )}
    </>
  );
}

const useStyles = makeStyles({
  select: {
    "&:before": {
      border: "none",
    },
    "&:after": {
      border: "none",
    },
    "&:not(.Mui-disabled):hover::before": {
      border: "none",
    },
  },
  icon: {
    fill: "white",
  },
  root: {
    color: "white",
  },
});

const styles = {
  input: {
    backgroundColor: "white",
    borderRadius: "10px",
    border: "none",
    margin: "4px",
  },
  disableUnderline: {
    disableUnderline: true,
  },
  loginSelected: {
    padding: "10px 30px 10px 30px",
    justifyContent: "center",
    backgroundColor: "white",
    borderBottom: "none",
  },
};
