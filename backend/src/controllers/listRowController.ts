import type { Request, Response } from "express";
import mongoose from "mongoose";

import ListHeader from "../models/listHeaderModel.js";
import ListBody from "../models/listBodyModel.js";

import { formatRow, isValidRow, extractRows, processRows } from "../utils/listRowUtils.js";
import { extractColumns } from "../utils/listColumnUtils.js";

const getListRows = async (req: Request, res: Response) => {
  const { list_id } = req.params;

  if (!list_id || !mongoose.Types.ObjectId.isValid(list_id)) {
    res.status(404).json({ error: 'No such list.' });
    return;
  }

  try {
    const listBody = await ListBody.findOne({ list_id: list_id });
    const listRows = extractRows(listBody);

    res.status(200).json(listRows);
    return;
  }
  catch (error) {
    res.status(500).json({ error: "Failed to fetch rows." });
    return;
  }
};

const createListRow = async (req: Request, res: Response) => {
  const { list_id } = req.params;

  if (!list_id || !mongoose.Types.ObjectId.isValid(list_id)) {
    res.status(404).json({ error: "No such list." });
    return;
  }

  try {
    const listHeader = await ListHeader.findOne({ list_id: list_id });
    const listColumns = extractColumns(listHeader);

    const newListRow = listColumns.reduce((acc: any, col: any) => {
      acc[col.id] = '';
      return acc;
    }, {});

    const newListRowWithId = { _id: new mongoose.Types.ObjectId(), ...newListRow };

    const createResult = await ListBody.updateOne(
      { list_id: list_id },
      {
        $push: {
          rows: {
            $each: [newListRowWithId],
          }
        }
      }
    );

    if (createResult.modifiedCount === 1) {
      res.status(200).json(formatRow(newListRowWithId));
      return;
    }
    else {
      throw new Error();
    }
  }
  catch (error) {
    res.status(500).json({ error: "Failed to create row." });
    return;
  }
};

const updateListRows = async (req: Request, res: Response) => {
  const { list_id } = req.params;

  if (!list_id || !mongoose.Types.ObjectId.isValid(list_id)) {
    res.status(404).json({ error: "No such list." });
    return;
  }

  const { rows } = req.body;

  try {
    if (!rows.every(isValidRow)) {
      throw Error();
    }

    const listBody = await ListBody.findOne({ list_id: list_id });

    if (!listBody) {
      res.status(404).json({ error: "No such list." });
      return;
    }

    listBody.rows = processRows(rows);
    await listBody.save();

    res.status(200).json({});
    return;
  }
  catch (error) {
    res.status(500).json({ error: "Failed to update row(s)." });
    return;
  }
};

const deleteListRows = async (req: Request, res: Response) => {
  const { list_id } = req.params;

  if (!list_id || !mongoose.Types.ObjectId.isValid(list_id)) {
    res.status(404).json({ error: "No such list." });
    return;
  }

  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.some((id) => !mongoose.Types.ObjectId.isValid(id))) {
    res.status(400).json({ error: "No such row(s)." });
    return;
  }

  try {
    const listBody = await ListBody.findOne({ list_id: list_id });

    if (!listBody) {
      res.status(404).json({ error: "No such list." });
      return;
    }

    const { rows } = listBody;

    if (!ids.every(id => rows.some(row => row._id?.toString() === id))) {
      res.status(404).json({ error: "No such row(s)." });
      return;
    }

    listBody.rows = rows.filter(row => !ids.includes(row._id?.toString()));
    await listBody.save();

    res.status(200).json({});
    return;
  }
  catch (error) {
    res.status(500).json({ error: "Failed to delete row(s)." });
    return;
  }
};

const copyListRows = async (req: Request, res: Response) => {
  const { list_id } = req.params;

  if (!list_id || !mongoose.Types.ObjectId.isValid(list_id)) {
    res.status(404).json({ error: "No such list." });
    return;
  }

  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.some((id) => !mongoose.Types.ObjectId.isValid(id))) {
    res.status(400).json({ error: "No such row(s)." });
    return;
  }

  try {
    const listBody = await ListBody.findOne({ list_id: list_id });

    if (!listBody) {
      res.status(404).json({ error: "No such list." });
      return;
    }

    const { rows } = listBody;

    if (!ids.every(id => rows.some(row => row._id?.toString() === id))) {
      res.status(404).json({ error: "No such row(s)." });
      return;
    }

    const rowsToCopy = rows.filter(row => ids.includes(row._id?.toString()));
    const copiedRows = rowsToCopy.map((row: any) => ({
      ...row.toObject(),
      _id: new mongoose.Types.ObjectId()
    }));

    listBody.rows = [...listBody.rows, ...copiedRows];
    await listBody.save();

    res.status(200).json(copiedRows);
    return;
  }
  catch (error) {
    res.status(500).json({ error: "Failed to delete row(s)." });
    return;
  }
};

export {
  getListRows,
  createListRow,
  updateListRows,
  deleteListRows,
  copyListRows,
};
