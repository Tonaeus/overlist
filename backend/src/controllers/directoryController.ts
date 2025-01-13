import type { Request, Response } from "express";

import Directory from "../models/directoryModel.js";
import mongoose from "mongoose";

const getDirectories = (req: Request, res: Response) => {
  res.status(501).json({ message: "Not implemented" });
};

const getDirectory = async (req: Request, res: Response) => {
  res.status(501).json({ message: "Not implemented" });
};

const createDirectory = async (req: Request, res: Response) => {
  res.status(501).json({ message: "Not implemented" });
};

const deleteDirectory = async (req: Request, res: Response) => {
  res.status(501).json({ message: "Not implemented" });
};

const updateDirectory = async (req: Request, res: Response) => {
  res.status(501).json({ message: "Not implemented" });
};

export {
  getDirectories,
  getDirectory,
  createDirectory,
  deleteDirectory,
  updateDirectory
};
