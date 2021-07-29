import express from "express";
import { Auth } from "../controller";
import { validate } from "../middlewares/validations";
import { register, login } from "../middlewares/schema/auth";
const router = express.Router();

router.post("/register", [validate(register)], Auth.register, Auth.generateOtp);
router.post("/login", [validate(login)], Auth.login, Auth.generateOtp);
router.post("/verify-otp", [], Auth.verifyOtp);

export const AuthRoutes = router;
