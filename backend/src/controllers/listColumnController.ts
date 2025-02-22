import type { Request, Response } from "express";
import mongoose from "mongoose";
import ListHeader from "../models/listHeaderModel.js";
import { getIdFromLabel, extractColumns } from "../utils/listColumnUtils.js";

const getListColumns = async (req: Request, res: Response) => {
  let { list_label } = req.params;
  list_label = list_label?.trim();

  if (!list_label) {
    res.status(400).json({ error: "List label cannot be empty." });
    return;
  }

  const list_id = await getIdFromLabel(list_label);

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

const createListColumn = async (req: Request, res: Response) => {
  let { list_label } = req.params;
  list_label = list_label?.trim();

  if (!list_label) {
    res.status(400).json({ error: "List label cannot be empty." });
    return;
  }

  const list_id = await getIdFromLabel(list_label);

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

export {
  getListColumns,
  createListColumn,
};
