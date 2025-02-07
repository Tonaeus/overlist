import type { Request, Response } from "express";
import mongoose from "mongoose";
import Directory from "../models/directoryModel.js";
import List from "../models/listModel.js";
import { formatDirectory } from "../utils/directoryUtils.js";

const getDirectories = async (req: Request, res: Response) => {
  try {
    const directories = await Directory.find({}).sort({ label: 1 });
    const formattedDirectories = directories.map(formatDirectory);

    res.status(200).json(formattedDirectories);
    return;
  }
  catch (error) {
    res.status(500).json({ error: "Failed to fetch directories." });
    return;
  }
};

const createDirectory = async (req: Request, res: Response) => {
  let { label } = req.body;
  label = label?.trim();

  if (!label) {
    res.status(400).json({ error: "Directory label cannot be empty." });
    return;
  }

  if (label.toLowerCase() === "none") {
    res.status(400).json({ error: `Directory label cannot be "None".` });
    return;
  }

  try {
    const existingDirectory = await Directory.findOne({
      label: { $regex: `^${label}$`, $options: "i" },
    });

    if (existingDirectory) {
      res.status(400).json({ error: "Directory label already exists." });
      return;
    }

    const directory = await Directory.create({ label });
    const formattedDirectory = formatDirectory(directory);

    res.status(200).json(formattedDirectory);
    return;
  }
  catch (error) {
    res.status(500).json({ error: "Failed to create directory." });
    return;
  }
};

const updateDirectory = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such directory." });
    return;
  }

  let { label } = req.body;
  label = label?.trim();

  if (!label) {
    res.status(400).json({ error: "Directory label cannot be empty." });
    return;
  }

  try {
    const existingDirectory = await Directory.findOne({
      label: { $regex: `^${label}$`, $options: "i" },
    });

    if (existingDirectory) {
      res.status(400).json({ error: "Directory label already exists." });
      return;
    }

    const directory = await Directory.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (!directory) {
      res.status(404).json({ error: "No such directory." });
      return;
    }

    const formattedDirectory = formatDirectory(directory);

    res.status(200).json(formattedDirectory);
    return;
  }
  catch (error) {
    res.status(500).json({ error: "Failed to update directory." });
    return;
  }
};

const deleteDirectory = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: 'No such directory.' });
    return;
  }

  try {
    const directory = await Directory.findOneAndDelete({ _id: id });

    if (!directory) {
      res.status(404).json({ error: 'No such directory.' });
      return;
    }

    const lists = await List.find({ directory_id: id });

    const updateResult = await List.updateMany(
      { directory_id: id }, 
      { $set: { directory_id: null } }
    );

    if (updateResult.modifiedCount !== lists.length) {
      throw new Error();
    }

    const formattedDirectory = formatDirectory(directory);

    res.status(200).json(formattedDirectory);
    return;
  }
  catch (error) {
    res.status(500).json({ error: "Failed to delete directory." });
    return;
  }
};

export {
  getDirectories,
  createDirectory,
  updateDirectory,
  deleteDirectory,
};
