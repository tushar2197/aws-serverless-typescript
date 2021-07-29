import express from "express";
import { User } from "../controller";
const router = express.Router();

router.put("/update-profile", User.update);
router.get("/get-profile", User.show);

export const UserRoutes = router;
