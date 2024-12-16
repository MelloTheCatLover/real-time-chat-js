import express from "express";
import {
  login,
  logout,
  signup,
  updateProfile,
  checkout,
} from "../controllers/authorization.controller.js";

export const router = express.Router();

router.post("/signup", signup);

router.post("/logout", logout);

router.post("/login", login);

router.put("/update-profile", updateProfile);

router.get("/checkout", checkout);
