import express from "express";
import { addEnquiry } from "../contollers/EnquiryController.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Enquiries");
});

router.post("/", addEnquiry);

export default router;
