import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import { createIndividualChat } from "../controllers/chats.controllers.js";

export const router = express.Router();

router.post("/chats/createIndividualChat", protectRoute, createIndividualChat);

router.get("/chats", protectRoute);
