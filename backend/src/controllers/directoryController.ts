import type { Request, Response } from "express";

import Directory from "../models/directoryModel.js";
import mongoose from "mongoose";

const getDirectories = async (req: Request, res: Response) => {
  const directories = await Directory.find({}).sort({ label: 1 });

  res.status(200).json(directories);
  return;
};

const getDirectory = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: 'No such directory' });
    return;
  }

  const directory = await Directory.findById({ _id: id });

  if (!directory) {
    res.status(404).json({ error: 'No such directory' });
    return;
  }

  res.status(200).json(directory);
  return;
};

const createDirectory = async (req: Request, res: Response) => {
  const { label } = req.body;

  let emptyFields = [];

  if (!label) {
    emptyFields.push('label');
  }

  if (emptyFields.length > 0) {
    res.status(400).json({ error: "Please fill in all the fields", emptyFields });
    return;
  }

  try {
    const directory = await Directory.create({ label });
    res.status(200).json(directory);
    return;
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
    else {
      res.status(400).json({ error: "An unexpected error occurred" });
    }
    return;
  }
};

const deleteDirectory = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: 'No such directory' });
    return;
  }

  const directory = await Directory.findOneAndDelete({ _id: id });

  if (!directory) {
    res.status(404).json({ error: 'No such directory' });
    return;
  }

  res.status(200).json(directory);
  return;
};

const updateDirectory = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such directory" });
    return;
  }

  const directory = await Directory.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true } 
  );

  if (!directory) {
    res.status(404).json({ error: "No such directory" });
    return;
  }

  res.status(200).json(directory);
  return;
};

export {
  getDirectories,
  getDirectory,
  createDirectory,
  deleteDirectory,
  updateDirectory
};
