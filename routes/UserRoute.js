import express from "express";
import {
  getUserByToken,
  userLogin,
  userRegistration,
} from "../contollers/UserController.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Users APIs");
});

router.get("/:token", getUserByToken);

router.post("/", userRegistration);

router.post("/login", userLogin);

export default router;
