import * as yup from "yup";

export const authValidator = yup.object({
  email: yup.string().required("Email required"),
  password: yup.string().required("Password is required"),
});

export const signupValidator = yup.object({
  email: yup.string().email("Invalid email format").required("Email required"),
  name: yup.string().required("Name is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  termsAndConditions: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("Terms and conditions must be accepted"),
});
