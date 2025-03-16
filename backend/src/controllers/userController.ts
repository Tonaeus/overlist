import type { Request, Response } from "express";

// Login user
const loginUser = async (req: Request, res: Response) => {
  res.json({ msg: 'login user' });
}

// Signup user
const signupUser = async (req: Request, res: Response) => {
  res.json({ msg: 'login user' });
}

export {
  loginUser,
  signupUser
}
