import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../app/store/configureStore";
import { signInUser } from "./accountSlice";

export default function Login() {
  const dispatch = useAppDispatch();
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

  async function onSubmit(data) {
    try {
      await dispatch(signInUser(data));
      reset();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        padding: "4px",
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
        color="secondary"
        type="submit"
        sx={{ paddingRight: "10px", marginLeft: "10px", margin: "10px" }}
      >
        Login
      </LoadingButton>
    </Box>
  );
}

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
};
