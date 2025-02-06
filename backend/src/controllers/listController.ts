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
          created: '$createdAt',
          modified: '$updatedAt'
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

const createList = async (req: Request, res: Response) => {
  let { label } = req.body;
  label = label?.trim();

  if (!label) {
    res.status(400).json({ error: "List label cannot be empty." });
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

    const newList = await List.create({ label });

    const formattedList = {
      id: newList._id,
      label: newList.label,
      directory_label: "None",
      created: newList.createdAt,
      modified: newList.updatedAt,
    };

    res.status(200).json(formattedList);
    return;
  }
  catch (error) {
    res.status(500).json({ error: "Failed to create list." });
    return;
  }
};

const updateLists = async (req: Request, res: Response) => {
  const { ids, directory_id } = req.body;

  if (!ids || !Array.isArray(ids) || ids.some((id) => !mongoose.Types.ObjectId.isValid(id))) {
    res.status(400).json({ error: "No such list(s)." });
    return;
  }

  if (!directory_id || !mongoose.Types.ObjectId.isValid(directory_id)) {
    res.status(404).json({ error: "No such directory." });
    return;
  }

  try {
    const lists = await List.find({
      _id: { $in: ids }
    });

    if (ids.length !== lists.length) {
      res.status(404).json({ error: "No such list(s)." });
      return;
    }

    const updatedLists = await List.updateMany(
      { _id: { $in: ids } },
      { $set: { directory_id } }
    );

    if (updatedLists.modifiedCount === ids.length) {
      res.status(200).json(lists);
      return;
    }
    else {
      throw new Error();
    }
  }
  catch (error) {
    res.status(500).json({ error: "Failed to update list(s)." });
    return;
  }
};

const deleteLists = async (req: Request, res: Response) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.some((id) => !mongoose.Types.ObjectId.isValid(id))) {
    res.status(400).json({ error: "No such list(s)." });
    return;
  }

  try {
    const lists = await List.find({
      _id: { $in: ids }
    });

    if (ids.length !== lists.length) {
      res.status(404).json({ error: "No such list(s)." });
      return;
    }

    const deletedLists = await List.deleteMany({
      _id: { $in: ids }
    });

    if (deletedLists.deletedCount === ids.length) {
      res.status(200).json(lists);
      return;
    }
    else {
      throw new Error();
    }
  }
  catch (error) {
    res.status(500).json({ error: "Failed to delete list(s)." });
    return;
  }
};

export {
  getLists,
  createList,
  updateLists,
  deleteLists,
};
