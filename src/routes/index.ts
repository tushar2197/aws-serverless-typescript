import express from "express";

import { authenticate } from "passport";
import { AuthRoutes } from "./auth";
import { UserRoutes } from "./user";
const router = express.Router();

const auth = authenticate("jwt", { session: false });

router.use("/auth", AuthRoutes);
router.use("/user", [auth], UserRoutes);

export default router;
