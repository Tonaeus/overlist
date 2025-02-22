import type { Request, Response } from "express";
import mongoose from "mongoose";

import ListHeader from "../models/listHeaderModel.js";
import ListBody from "../models/listBodyModel.js";

import { getIdFromLabel, extractRows } from "../utils/listRowUtils.js";
import { extractColumns } from "../utils/listColumnUtils.js";

const getListRows = async (req: Request, res: Response) => {
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
  let { list_label } = req.params;
  list_label = list_label?.trim();

  if (!list_label) {
    res.status(400).json({ error: "List label cannot be empty." });
    return;
  }

  const list_id = await getIdFromLabel(list_label);

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

    const createResult = await ListBody.updateOne(
      { list_id: list_id },
      {
        $push: {
          columns: {
            $each: [newListRow],
          }
        }
      }
    );

    if (createResult.modifiedCount === 1) {
      res.status(200).json(newListRow);
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

export {
  getListRows,
  createListRow
};
