import express from "express";
import { isValidData, PATTERNS } from "../utils/ValidationUtil.js";
import Enquiry from "../models/Enquiry.js";

export const addEnquiry = async (req, res) => {
  const body = req.body;
  const validRes = isValidData([
    {
      value: body.name,
      regEx: PATTERNS.TEXT,
      error: "Please enter valid Name",
      isRequired: true,
    },
    {
      value: body.mob,
      regEx: PATTERNS.MOBILE,
      error: "Please enter valid Mobile Number",
      isRequired: true,
    },
    {
      value: body.email,
      regEx: PATTERNS.EMAIL,
      error: "Please enter valid Email",
      isRequired: true,
    },
    {
      value: body.country,
      regEx: PATTERNS.TEXT,
      error: "Please enter valid Country Name",
      isRequired: true,
    },
    {
      value: body.city,
      regEx: PATTERNS.TEXT,
      error: "Please enter valid City Name",
      isRequired: true,
    },
    {
      value: body.org,
      regEx: PATTERNS.TEXT,
      error: "Please enter valid Company/Organization Name",
      isRequired: false,
    },
    {
      value: body.msg,
      regEx: PATTERNS.TEXT,
      error: "Please enter valid message",
      isRequired: false,
    },
  ]);
  if (validRes.isValid) {
    body.created_at = Date();
    //updateFile(body, FILES.ENQUIRIES);
    try {
      const enq = await Enquiry.create({
        name: body.name,
        email: body.email,
        mob: body.mob,
      });
      res
        .status(200)
        .json({ message: "Enquiry submitted successfully", enquiry: enq });
    } catch (err) {
      res.status(200).json({ message: err });
    }
  } else {
    res.status(403).json({ message: validRes.errors });
  }
};
