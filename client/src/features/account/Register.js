import { LoadingButton } from "@mui/lab";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../app/store/configureStore";
import { registerUser } from "./accountSlice";

export default function Register({ setIsRegisterForm }) {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({ mode: "onChange" });

  async function onSubmit(data) {
    await dispatch(registerUser(data));
  }
  return (
    <Stack
      component="form"
      sx={{
        width: "25ch",
        border: "5px solid #19b3d2",
        borderRadius: "10px",
        padding: "5%",
      }}
      onSubmit={handleSubmit(onSubmit)}
      spacing={2}
    >
      <Typography sx={{ mb: 4 }} variant="h4">
        Register Form
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        type="text"
        {...register("username", { required: "Username is required" })}
        error={!!errors.username}
        helperText={errors?.username?.message}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        {...register("password", { required: "Password is required" })}
        error={!!errors.password}
        helperText={errors?.password?.message}
      />
      <Stack spacing={3} direction="row">
        <LoadingButton
          loading={isSubmitting}
          disabled={!isValid}
          variant="contained"
          type="submit"
          color="secondary"
        >
          Register
        </LoadingButton>

        <Button
          sx={{ width: "100px" }}
          variant="contained"
          onClick={() => setIsRegisterForm(false)}
        >
          Go Back
        </Button>
      </Stack>
    </Stack>
  );
}
