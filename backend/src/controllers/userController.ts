import type { Request, Response } from "express";
import type { Types } from "mongoose";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

import { SECRET } from "../configs/dotenvConfig.js";

const createToken = (id: Types.ObjectId) => {
  return jwt.sign({ id }, SECRET, { expiresIn: "7d" })
};

// Login user
const loginUser = async (req: Request, res: Response) => {
  const {username, password} = req.body;

  try {
    const user = await User.login(username, password);

    const token = createToken(user._id);

    res.status(200).json({ username, token })
    return;
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
      return;
    } else {
      res.status(500).json({ error: "Unknown error." });
      return;
    }
  }
};

// Signup user
const signupUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.signup(username, password);

    const token = createToken(user._id);

    res.status(200).json({ username, token })
    return;
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
      return;
    } else {
      res.status(500).json({ error: "Unknown error." });
      return;
    }
  }
};

export {
  loginUser,
  signupUser
}
