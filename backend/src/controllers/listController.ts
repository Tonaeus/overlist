import type { Request, Response } from "express";
import mongoose from "mongoose";
import List from "../models/listModel.js";
import ListHeader from "../models/listHeaderModel.js";
import ListBody from "../models/listBodyModel.js";
import { formatList } from "../utils/listUtils.js";

const getLists = async (req: Request, res: Response) => {
  try {
    const lists = await List.find({}).sort({ label: 1 });
    const formattedLists = await Promise.all(lists.map(formatList));

    res.status(200).json(formattedLists);
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

    await ListHeader.create({ list_id: newList._id });
    await ListBody.create({ list_id: newList._id });

    const formattedList = await formatList(newList);

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

    const updateResult = await List.updateMany(
      { _id: { $in: ids } },
      { $set: { directory_id } }
    );

    if (updateResult.modifiedCount === ids.length) {
      const updatedLists = await List.find({ _id: { $in: ids } });
      const formattedLists = await Promise.all(updatedLists.map(formatList));

      res.status(200).json(formattedLists);
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

    const deleteResult = await List.deleteMany({
      _id: { $in: ids }
    });

    const headerResult = await ListHeader.deleteMany({ list_id: { $in: ids } });
    const bodyResult = await ListBody.deleteMany({ list_id: { $in: ids } });

    if (
      deleteResult.deletedCount === ids.length &&
      headerResult.deletedCount === ids.length && 
      bodyResult.deletedCount === ids.length
    ) {
      const formattedLists = await Promise.all(lists.map(formatList));
      res.status(200).json(formattedLists);
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
