import * as yup from "yup";

export const registerValidation = yup.object({
  gender: yup.string().required("Gender is required"),
  knownAs: yup.string().required("Known As is required"),
  username: yup.string().required("Username is required"),
  dateOfBirth: yup.string().required("Birthday is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
