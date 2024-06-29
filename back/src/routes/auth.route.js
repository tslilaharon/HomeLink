import express from "express";
import {
  google,
  signOut,
  signin,
  signupUser,
  getUser,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/signin", signin);
router.post("/google", google);

router.get("/signout", signOut);
router.get("/getuser/:id", verifyToken, getUser);

export default router;
