import { LoadingButton } from "@mui/lab";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../app/store/configureStore";
import { registerUser } from "./accountSlice";
import { registerValidation } from "./registerValidation";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Register({ setIsRegisterForm }) {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({ mode: "all", resolver: yupResolver(registerValidation) });

  async function onSubmit(data) {
    await dispatch(registerUser(data));
  }

  return (
    <Stack
      component="form"
      sx={{
        width: "30ch",
        border: "5px solid #19b3d2",
        borderRadius: "10px",
        padding: "5%",
        mb: 10,
      }}
      onSubmit={handleSubmit(onSubmit)}
      spacing={2}
    >
      <Typography sx={{ mb: 4 }} variant="h4">
        Register Form
      </Typography>
      <FormControl component="fieldset">
        <FormLabel
          component="legend"
          sx={{ fontWeight: "bold", fontSize: 20, mb: 1 }}
        >
          Gender
        </FormLabel>
        <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
          <Typography variant="h5" sx={{ mr: 1, mt: 0.5 }}>
            I am :{" "}
          </Typography>
          <FormControlLabel
            {...register("gender")}
            value="male"
            control={<Radio />}
            label="Male"
          />
          <FormControlLabel
            {...register("gender")}
            value="female"
            control={<Radio />}
            label="Female"
          />
        </RadioGroup>
      </FormControl>
      <TextField
        label="Username"
        variant="outlined"
        type="text"
        {...register("username")}
        error={!!errors.username}
        helperText={errors?.username?.message}
      />
      <TextField
        label="Known As"
        variant="outlined"
        type="text"
        {...register("knownAs")}
        error={!!errors.knownAs}
        helperText={errors?.knownAs?.message}
      />
      <TextField
        id="date"
        label="Birthday"
        type="date"
        defaultValue={new Date().toISOString().slice(0, 10)}
        {...register("dateOfBirth")}
        // sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
        error={!!errors.dateOfBirth}
        helperText={errors?.dateOfBirth?.message}
      />
      <TextField
        label="City"
        variant="outlined"
        type="text"
        {...register("city")}
        error={!!errors.city}
        helperText={errors?.city?.message}
      />
      <TextField
        label="Country"
        variant="outlined"
        type="text"
        {...register("country")}
        error={!!errors.country}
        helperText={errors?.country?.message}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors?.password?.message}
      />
      <TextField
        label="Confirm Password"
        variant="outlined"
        type="password"
        {...register("confirmPassword")}
        error={!!errors.confirmPassword}
        helperText={errors?.confirmPassword?.message}
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
