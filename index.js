import express from "express";
import { FILES, readFile, updateFile, writeFile } from "./utils/FileRW.js";
import { isValid, isValidData, PATTERNS } from "./utils/ValidationUtil.js";
import myDb from "./database/db.js";
import User from "./models/User.js";
import helmet from "helmet";
import EnquiryRoute from "./routes/EnquiryRoute.js";
import UserRoute from "./routes/UserRoute.js";
import dotenv from "dotenv";

const app = express();
const port = 3000;

app.use(express.json({ limit: "1mb", extented: true }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));
/**
 * for security adding below things
 */
app.use(helmet());
/** Reduce Fingerprinting i.e. not telling hacker that we are using express */
app.disable("x-powered-by");

dotenv.config();

app.get("/", (req, res) => {
  res.send("Welcome to BiggBrains");
});

app.use("/api/enquiry", EnquiryRoute);
app.use("/api/user", UserRoute);

/** custom error handlers use right before listen */
// custom 404
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

// custom error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`BiggBrainsNode app listening on port ${port}`);
});

// myDb
//   .sync({ force: false })
//   .then((data) => {})
//   .catch((error) => {});
// User.sync({ force: false })
//   .then((data) => {
//     console.log("user sync => " + data);
//   })
//   .catch((error) => {
//     console.log("user sync error => " + error);
//   });
