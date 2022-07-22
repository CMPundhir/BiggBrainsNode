import express from "express";
import { FILES, readFile, updateFile, writeFile } from "./utils/FileRW.js";
import { isValid, isValidData, PATTERNS } from "./utils/ValidationUtil.js";
import myDb from "./database/db.js";
import Enquiry from "./models/Enquiry.js";

const app = express();
const port = 3000;

app.use(express.json({ limit: "1mb", extented: true }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/magic", (req, res) => {
  res.send("Node is magic!");
});

app.post("/enquiry", (req, res) => {
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
    updateFile(body, FILES.ENQUIRIES);
    res.status(200).json({ message: "Enquiry submitted successfully" });
  } else {
    res.status(403).json({ message: validRes.errors });
  }
});

app.listen(port, () => {
  console.log(`BiggBrainsNode app listening on port ${port}`);
  myDb.sync({ force: false });
});
