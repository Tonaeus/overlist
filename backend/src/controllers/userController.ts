import type { Request, Response } from "express";
import User from "../models/userModel.js";

// Login user
const loginUser = async (req: Request, res: Response) => {
  res.json({ msg: 'login user' });
};

// Signup user
const signupUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    res.status(200).json({ email, user })
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
