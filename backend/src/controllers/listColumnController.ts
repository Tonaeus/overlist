import type { Request, Response } from "express";
import mongoose from "mongoose";
import ListHeader from "../models/listHeaderModel.js";
import { extractColumns } from "../utils/listColumnUtils.js";

const getListColumns = async (req: Request, res: Response) => {
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

const createListColumn = async (req: Request, res: Response) => {
  const { list_id } = req.params;

  if (!list_id || !mongoose.Types.ObjectId.isValid(list_id)) {
    res.status(404).json({ error: "No such list." });
    return;
  }

  let { column_label } = req.body;
  column_label = column_label?.trim();

  if (!column_label) {
    res.status(400).json({ error: "Column label cannot be empty." });
    return;
  }

  try {
    const existingListColumn = await ListHeader.findOne({
      list_id: list_id,
      columns: { $elemMatch: { label: { $regex: `^${column_label}$`, $options: "i" } } }
    });

    if (existingListColumn) {
      res.status(400).json({ error: "Column label already exists." });
      return;
    }

    const createResult = await ListHeader.updateOne(
      { list_id: list_id },
      {
        $push: {
          columns: {
            $each: [{ label: column_label }],
            $sort: { label: 1 }
          }
        }
      }
    );

    if (createResult.modifiedCount === 1) {
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

const updateListColumn = async (req: Request, res: Response) => {
  const { list_id } = req.params;

  if (!list_id || !mongoose.Types.ObjectId.isValid(list_id)) {
    res.status(404).json({ error: "No such list." });
    return;
  }

  let { column_id, column_label } = req.body;
  column_label = column_label?.trim();

  if (!column_label) {
    res.status(400).json({ error: "Column label cannot be empty." });
    return;
  }

  if (!column_id || !mongoose.Types.ObjectId.isValid(column_id)) {
    res.status(404).json({ error: "No such column." });
    return;
  }

  try {
    const existingListColumn = await ListHeader.findOne({
      list_id: list_id,
      columns: { $elemMatch: { label: { $regex: `^${column_label}$`, $options: "i" } } }
    });

    if (existingListColumn) {
      res.status(400).json({ error: "Column label already exists." });
      return;
    }

    const updateResult = await ListHeader.updateOne(
      { list_id: list_id, "columns._id": column_id },
      { $set: { "columns.$.label": column_label } }
    );

    const sortResult = await ListHeader.updateOne(
      { list_id: list_id },
      {
        $push: {
          columns: {
            $each: [],
            $sort: { label: 1 } 
          }
        }
      }
    );

    if (updateResult.modifiedCount === 1 && sortResult.modifiedCount === 1) {
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
    res.status(500).json({ error: "Failed to update column." });
    return;
  }
};

const deleteListColumn = async (req: Request, res: Response) => {
  const { list_id } = req.params;

  if (!list_id || !mongoose.Types.ObjectId.isValid(list_id)) {
    res.status(404).json({ error: "No such list." });
    return;
  }

  let { column_id } = req.body;

  if (!column_id || !mongoose.Types.ObjectId.isValid(column_id)) {
    res.status(404).json({ error: "No such column." });
    return;
  }

  try {
    const deleteResult = await ListHeader.updateOne(
      { list_id: list_id, "columns._id": column_id },
      { $pull: { columns: { _id: column_id } } }
    );

    if (deleteResult.modifiedCount === 1) {
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
    res.status(500).json({ error: "Failed to delete column." });
    return;
  }
};

export {
  getListColumns,
  createListColumn,
  updateListColumn,
  deleteListColumn
};
