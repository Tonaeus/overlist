import type { Request, Response } from "express";
import mongoose from "mongoose";
import Directory from "../models/directoryModel.js";

const getDirectories = async (req: Request, res: Response) => {
  try {
    const directories = await Directory.find({}).sort({ label: 1 });

    const processedDirectories = directories.map(dir => ({
      id: dir._id,
      label: dir.label,
    }));

    res.status(200).json(processedDirectories);
    return;
  } 
  catch (error) {
    res.status(500).json({ error: "Failed to fetch directories." });
    return;
  }
};

const getDirectory = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: 'No such directory' });
    return;
  }

  try {
    const directory = await Directory.findById({ _id: id });
    
    if (!directory) {
      res.status(404).json({ error: 'No such directory' });
      return;
    }

    res.status(200).json(directory);
    return;
  } 
  catch (error) {
    res.status(500).json({ error: "Failed to fetch directory" });
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

  try {
    const directory = await Directory.create({ label });

    const processedDirectory = {
      id: directory._id,
      label: directory.label,
    };

    res.status(200).json(processedDirectory);
    return;
  } 
  catch (error) {
    res.status(500).json({ error: "Failed to create directory." });
    return;
  }
};

const deleteDirectory = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: 'No such directory' });
    return;
  }

  try {
    const directory = await Directory.findOneAndDelete({ _id: id });
    
    if (!directory) {
      res.status(404).json({ error: 'No such directory' });
      return;
    }

    res.status(200).json(directory);
    return;
  } 
  catch (error) {
    res.status(500).json({ error: "Failed to delete directory" });
    return;
  }
};

const updateDirectory = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such directory" });
    return;
  }

  try {
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
  } 
  catch (error) {
    res.status(500).json({ error: "Failed to update directory" });
    return;
  }
};

export {
  getDirectories,
  getDirectory,
  createDirectory,
  deleteDirectory,
  updateDirectory
};
