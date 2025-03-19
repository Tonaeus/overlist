import type { Response, NextFunction } from 'express';
import type { AuthRequest } from '../types/Auth.js';
import jwt, { type JwtPayload } from "jsonwebtoken";
import User from '../models/userModel.js';
import { SECRET } from '../configs/dotenvConfig.js';

const requireAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ error: "Authorization header is required." });
    return;
  }

  const token = authorization.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: "Token is required." });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET) as JwtPayload;

    if (!decoded || !decoded.id) {
      res.status(401).json({ error: "Token is invalid." });
      return;
    }

    const user = await User.findOne({ _id: decoded.id }).select("_id");

    if (!user) {
      res.status(401).json({ error: "User is not found." });
      return;
    }

    req.user = { id: user._id };

    next();
  }
  catch (error) {
    res.status(401).json({ error: "Request is not authorized." });
    return;
  }
};

export default requireAuth;
