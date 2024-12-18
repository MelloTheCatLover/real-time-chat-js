import express from "express";
import {
  login,
  logout,
  signup,
  updateProfile,
  checkout,
} from "../controllers/authorization.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

export const router = express.Router();

router.post("/signup", signup);
router.post("/logout", protectRoute, logout);
router.post("/login", login);

router.put("/update-profile", protectRoute, updateProfile);
router.get("/checkout", protectRoute, checkout);
