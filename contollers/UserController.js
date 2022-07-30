import User from "../models/User.js";
import { isValidData, PATTERNS } from "../utils/ValidationUtil.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userRegistration = async (req, res) => {
  try {
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
        value: body.password,
        regEx: PATTERNS.PASSWORD,
        error: "Please enter valid password",
        isRequired: true,
      },
    ]);
    if (validRes.isValid) {
      const encryptedPassword = await bcrypt.hash(body.password, 10);
      const user = await User.create({
        name: body.name,
        email: body.email,
        mob: body.mob,
        psw: encryptedPassword,
      });
      res.status(200).json({
        message: "User submitted successfully",
        user: user,
      });
    } else {
      res.status(403).json({ message: validRes.errors });
    }
  } catch (e) {
    res.status(403).json({ message: e });
  }
};

export const userLogin = async (req, res) => {
  try {
    const body = req.body;
    const validRes = isValidData([
      {
        value: body.mob,
        regEx: PATTERNS.MOBILE,
        error: "Please enter valid Mobile Number",
        isRequired: true,
      },
      {
        value: body.password,
        regEx: PATTERNS.PASSWORD,
        error: "Please enter valid password",
        isRequired: true,
      },
    ]);
    if (validRes.isValid) {
      const user = await User.findOne({ where: { mob: body.mob } });
      const isValidPass = await bcrypt.compare(body.password, user.psw);
      if (!isValidPass) throw { message: "Invalid Password" };
      // timestamp of token creation
      const iat = Math.floor(Date.now() / 1000) - 30;
      // create a token
      const token = jwt.sign(
        { _id: user.id, iat: iat },
        process.env.TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      user.token = token;
      // UPDATE USER
      await user.save();
      res.status(200).json({
        message: "User found successfully",
        user: user,
      });
    } else {
      res.status(403).json({ message: validRes.errors });
    }
  } catch (e) {
    res.status(403).json({ message: e.message });
  }
};

export const getUserByToken = async (req, res) => {
  try {
    const token = req.params.token;
    const validRes = isValidData([
      {
        value: token,
        regEx: PATTERNS.LENGTH_MIN_10,
        error: "Invalid Token",
        isRequired: true,
      },
    ]);
    if (validRes.isValid) {
      const user = await User.findOne({ where: { token: token } });
      if (!user) throw { message: "User not found" };
      res.status(200).json({
        message: "User found successfully",
        user: user,
      });
    } else {
      res.status(403).json({ message: validRes.errors });
    }
  } catch (e) {
    res.status(403).json({ message: e.message });
  }
};
