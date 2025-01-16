import type { Request, Response } from "express";
import mongoose from "mongoose";
import ListHeader from "../models/listHeaderModel.js";

const getListHeaders = async (req: Request, res: Response) => {
  try {
    const listHeaders = await ListHeader.find({});
    res.status(200).json(listHeaders);
    return;
  } 
  catch (error) {
    res.status(500).json({ error: "Failed to fetch list headers" });
    return;
  }
};

const getListHeader = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such list header" });
    return;
  }

  try {
    const listHeader = await ListHeader.findById({ _id: id });

    if (!listHeader) {
      res.status(404).json({ error: "No such list header" });
      return;
    }

    res.status(200).json(listHeader);
    return;
  } 
  catch (error) {
    res.status(500).json({ error: "Failed to fetch list header" });
    return;
  }
};

const createListHeader = async (req: Request, res: Response) => {
  const { columns, list_id } = req.body;

  let emptyFields: string[] = [];

  if (!columns || !Array.isArray(columns)) {
    emptyFields.push("columns");
  }

  if (!list_id) {
    emptyFields.push("list_id");
  }

  if (emptyFields.length > 0) {
    res.status(400).json({ error: "Please fill in all the fields", emptyFields });
    return;
  }

  try {
    const listHeader = await ListHeader.create({ columns, list_id });
    res.status(200).json(listHeader);
    return;
  } 
  catch (error) {
    res.status(500).json({ error: "Failed to create list header" });
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
  getListHeaders,
  getListHeader,
  createListHeader,
  deleteListHeader,
  updateListHeader
};
