import type { Request, Response } from "express";
import mongoose from "mongoose";
import List from "../models/listModel.js";

const getLists = async (req: Request, res: Response) => {
  try {
    const lists = await List.aggregate([
      {
        $addFields: {
          directory_id: { $toObjectId: '$directory_id' }
        }
      },
      {
        $lookup: {
          from: 'directories',
          localField: 'directory_id',
          foreignField: '_id',
          as: 'directory'
        }
      },
      {
        $unwind: {
          path: '$directory',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $sort: { label: 1 }
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          label: 1,
          directory_label: { $ifNull: ['$directory.label', 'None'] },
          created: { $dateToString: { format: '%m/%d/%Y', date: '$createdAt' } },
          modified: { $dateToString: { format: '%m/%d/%Y', date: '$updatedAt' } }
        }
      }
    ]);

    res.status(200).json(lists);
    return;
  }
  catch (error) {
    res.status(500).json({ error: "Failed to fetch lists." });
    return;
  }
};

const getList = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such list." });
    return;
  }

  try {
    const list = await List.findById({ _id: id });

    if (!list) {
      res.status(404).json({ error: "No such list." });
      return;
    }

    res.status(200).json(list);
    return;
  }
  catch (error) {
    res.status(500).json({ error: "Failed to fetch list." });
    return;
  }
};

const createList = async (req: Request, res: Response) => {
  const { label } = req.body;

  let emptyFields: string[] = [];

  if (!label) {
    emptyFields.push("label");
  }

  if (emptyFields.length > 0) {
    res.status(400).json({ error: `Missing required fields: [${emptyFields.join(", ")}].` });
    return;
  }

  try {
    const existingList = await List.findOne({
      label: { $regex: `^${label}$`, $options: "i" },
    });

    if (existingList) {
      res.status(400).json({ error: "List label already exists." });
      return;
    }

    const list = await List.create({ label });
    res.status(200).json(list);
    return;
  }
  catch (error) {
    res.status(500).json({ error: "Failed to create list." });
    return;
  }
};

const deleteList = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such list" });
    return;
  }

  try {
    const list = await List.findOneAndDelete({ _id: id });

    if (!list) {
      res.status(404).json({ error: "No such list" });
      return;
    }

    res.status(200).json(list);
    return;
  }
  catch (error) {
    res.status(500).json({ error: "Failed to delete list" });
    return;
  }
};

const updateList = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such list" });
    return;
  }

  try {
    const list = await List.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (!list) {
      res.status(404).json({ error: "No such list" });
      return;
    }

    res.status(200).json(list);
    return;
  }
  catch (error) {
    res.status(500).json({ error: "Failed to update list" });
    return;
  }
};

export {
  getLists,
  getList,
  createList,
  deleteList,
  updateList
};
