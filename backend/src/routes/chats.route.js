import express from "express";
import {
  createIndividualChat,
  createGroupChat,
  getAllChats,
  sendMessage,
  getMessages,
} from "../controllers/chats.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

export const router = express.Router();

router.post("/chats/createIndividualChat", protectRoute, createIndividualChat);
router.post("/chats/createIndividualChat", protectRoute, createIndividualChat);
router.post("/chats/createGroupChat", protectRoute, createGroupChat);
router.get("/chats", protectRoute, getAllChats);

router.post("/messages", protectRoute, sendMessage);
router.post("/getMessages", protectRoute, getMessages);
