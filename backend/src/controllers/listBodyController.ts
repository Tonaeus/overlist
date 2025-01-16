import type { Request, Response } from "express";
import mongoose from "mongoose";
import ListBody from "../models/listBodyModel.js";

const getListBodies = async (req: Request, res: Response) => {
  try {
    const listBodies = await ListBody.find({});
    res.status(200).json(listBodies);
    return;
  } 
  catch (error) {
    res.status(500).json({ error: "Failed to fetch list bodies" });
    return;
  }
};

const getListBody = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such list body" });
    return;
  }

  try {
    const listBody = await ListBody.findById({ _id: id });

    if (!listBody) {
      res.status(404).json({ error: "No such list body" });
      return;
    }

    res.status(200).json(listBody);
    return;
  } 
  catch (error) {
    res.status(500).json({ error: "Failed to fetch list body" });
    return;
  }
};

const createListBody = async (req: Request, res: Response) => {
  const { rows, list_id } = req.body;

  let emptyFields: string[] = [];

  if (!rows || !Array.isArray(rows)) {
    emptyFields.push("rows");
  }

  if (!list_id) {
    emptyFields.push("list_id");
  }

  if (emptyFields.length > 0) {
    res.status(400).json({ error: "Please fill in all the fields", emptyFields });
    return;
  }

  try {
    const listBody = await ListBody.create({ rows, list_id });
    res.status(200).json(listBody);
    return;
  } 
  catch (error) {
    res.status(500).json({ error: "Failed to create list body" });
    return;
  }
};

const deleteListBody = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such list body" });
    return;
  }

  try {
    const listBody = await ListBody.findOneAndDelete({ _id: id });

    if (!listBody) {
      res.status(404).json({ error: "No such list body" });
      return;
    }

    res.status(200).json(listBody);
    return;
  } 
  catch (error) {
    res.status(500).json({ error: "Failed to delete list body" });
    return;
  }
};

const updateListBody = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such list body" });
    return;
  }

  try {
    const listBody = await ListBody.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (!listBody) {
      res.status(404).json({ error: "No such list body" });
      return;
    }

    res.status(200).json(listBody);
    return;
  } 
  catch (error) {
    res.status(500).json({ error: "Failed to update list body" });
    return;
  }
};

export {
  getListBodies,
  getListBody,
  createListBody,
  deleteListBody,
  updateListBody
};
