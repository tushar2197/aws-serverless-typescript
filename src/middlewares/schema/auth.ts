import { User } from "../../models/user";
import * as yup from "yup";

export const register = yup.object().shape({
  mobileNo: yup
    .string()
    .required("Mobile number is required")
    .min(10, "Must be 10 digits")
    .max(10, "Must be 10 digits")
    .test("unique", "Mobile number already registered", async (value) => {
      let user = await User.findOne({ mobileNo: value });
      if (user) {
        return false;
      }
      return true;
    }),
});

export const login = yup.object().shape({
  mobileNo: yup
    .string()
    .required("Mobile number is required")
    .min(10, "Must be 10 digits")
    .max(10, "Must be 10 digits"),
});
