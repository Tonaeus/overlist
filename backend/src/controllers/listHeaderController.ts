import type { Request, Response } from "express";
import mongoose from "mongoose";
import ListHeader from "../models/listHeaderModel.js";
import { extractColumns } from "../utils/listHeaderUtils.js";

const getListHeader = async (req: Request, res: Response) => {
  const { list_id } = req.params;

  if (!list_id || !mongoose.Types.ObjectId.isValid(list_id)) {
    res.status(404).json({ error: 'No such list.' });
    return;
  }

  try {
    const listHeader = await ListHeader.findOne({ list_id: list_id });
    const listColumns = extractColumns(listHeader);

    res.status(200).json(listColumns);
    return;
  }
  catch (error) {
    res.status(500).json({ error: "Failed to fetch columns." });
    return;
  }
};

const createListHeader = async (req: Request, res: Response) => {
  const { list_id } = req.params;

  if (!list_id || !mongoose.Types.ObjectId.isValid(list_id)) {
    res.status(404).json({ error: "No such List." });
    return;
  }

  let { label } = req.body;
  label = label?.trim();

  if (!label) {
    res.status(400).json({ error: "Column label cannot be empty." });
    return;
  }

  try {
    const existingListColumn = await ListHeader.findOne({
      list_id: list_id,
      columns: { $elemMatch: { label: { $regex: `^${label}$`, $options: "i" } } }
    });

    if (existingListColumn) {
      res.status(400).json({ error: "Column label already exists." });
      return;
    }

    const updateResult = await ListHeader.updateOne(
      { list_id: list_id },
      {
        $push: {
          columns: {
            $each: [{ label: label }],
            $sort: { label: 1 }
          }
        }
      }
    );

    if (updateResult.modifiedCount === 1) {
      const listHeader = await ListHeader.findOne({ list_id: list_id });
      const listColumns = extractColumns(listHeader);

      res.status(200).json(listColumns);
      return;
    }
    else {
      throw new Error();
    }
  }
  catch (error) {
    res.status(500).json({ error: "Failed to create column." });
    return;
  }
};

const deleteListHeader = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such list header" });
    return;
  }

  try {
    const listHeader = await ListHeader.findOneAndDelete({ _id: id });

    if (!listHeader) {
      res.status(404).json({ error: "No such list header" });
      return;
    }

    res.status(200).json(listHeader);
    return;
  }
  catch (error) {
    res.status(500).json({ error: "Failed to delete list header" });
    return;
  }
};

const updateListHeader = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such list header" });
    return;
  }

  try {
    const listHeader = await ListHeader.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (!listHeader) {
      res.status(404).json({ error: "No such list header" });
      return;
    }

    res.status(200).json(listHeader);
    return;
  }
  catch (error) {
    res.status(500).json({ error: "Failed to update list header" });
    return;
  }
};

export {
  getListHeader,
  createListHeader,
  deleteListHeader,
  updateListHeader
};
