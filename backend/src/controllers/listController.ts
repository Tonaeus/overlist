import type { Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import List from "../models/listModel.js";
import ListHeader from "../models/listHeaderModel.js";
import ListBody from "../models/listBodyModel.js";
import { formatList } from "../utils/listUtils.js";

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

const updateList = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such list." });
    return;
  }

  let { label } = req.body;
  label = label?.trim();

  if (!label) {
    res.status(400).json({ error: "List label cannot be empty." });
    return;
  }

  try {
    const list = await List.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (!list) {
      res.status(404).json({ error: "No such list." });
      return;
    }

    res.status(200).json(label);
    return;
  }
  catch (error) {
    res.status(500).json({ error: "Failed to update list." });
    return;
  }
};

const updateLists = async (req: Request, res: Response) => {
  let { ids, directory_id } = req.body;

  if (!ids || !Array.isArray(ids) || ids.some((id) => !mongoose.Types.ObjectId.isValid(id))) {
    res.status(404).json({ error: "No such list(s)." });
    return;
  }

  if (directory_id !== "null" && (!directory_id || !mongoose.Types.ObjectId.isValid(directory_id))) {
    res.status(404).json({ error: "No such directory." });
    return;
  }

  directory_id = directory_id === "null" ? null : directory_id;

  try {
    const lists = await List.find({
      _id: { $in: ids }
    });

    if (!lists || ids.length !== lists.length) {
      res.status(404).json({ error: "No such list(s)." });
      return;
    }

    const updateResult = await List.updateMany(
      { _id: { $in: ids } },
      { $set: { directory_id } }
    );

    if (updateResult.modifiedCount !== ids.length) {
      throw new Error();
    }

    const updatedLists = await List.find({ _id: { $in: ids } });
    const formattedLists = await Promise.all(updatedLists.map(formatList));

    res.status(200).json(formattedLists);
    return;
  }
  catch (error) {
    res.status(500).json({ error: "Failed to update list(s)." });
    return;
  }
};

const deleteLists = async (req: Request, res: Response) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.some((id) => !mongoose.Types.ObjectId.isValid(id))) {
    res.status(404).json({ error: "No such list(s)." });
    return;
  }

  try {
    const lists = await List.find({
      _id: { $in: ids }
    });

    if (!lists || ids.length !== lists.length) {
      res.status(404).json({ error: "No such list(s)." });
      return;
    }

    const deleteResult = await List.deleteMany({ _id: { $in: ids } });
    const headerResult = await ListHeader.deleteMany({ list_id: { $in: ids } });
    const bodyResult = await ListBody.deleteMany({ list_id: { $in: ids } });

    if (
      deleteResult.deletedCount !== ids.length ||
      headerResult.deletedCount !== ids.length ||
      bodyResult.deletedCount !== ids.length
    ) {
      throw new Error();
    }

    const formattedLists = await Promise.all(lists.map(formatList));
    res.status(200).json(formattedLists);
    return;
  }
  catch (error) {
    res.status(500).json({ error: "Failed to delete list(s)." });
    return;
  }
};

const copyLists = async (req: Request, res: Response) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.some((id) => !mongoose.Types.ObjectId.isValid(id))) {
    res.status(404).json({ error: "No such list(s)." });
    return;
  }

  try {
    const lists = await List.find({
      _id: { $in: ids }
    });

    if (!lists || lists.length !== ids.length) {
      res.status(404).json({ error: "No such list(s)." });
      return;
    }

    const listHeaders = await ListHeader.find({
      list_id: { $in: ids }
    });

    if (!listHeaders || listHeaders.length !== ids.length) {
      throw new Error();
    }

    const listBodies = await ListBody.find({
      list_id: { $in: ids }
    });

    if (!listBodies || listBodies.length !== ids.length) {
      throw new Error();
    }

    const listsToCopy: any = [];
    const listHeadersToCopy: any = [];
    const listBodiesToCopy: any = [];

    ids.forEach(id => {
      const newId = new Types.ObjectId();
      const newList = lists.find(list => list._id.toString() === id);
      const newListHeader = listHeaders.find(listHeader => listHeader.list_id.toString() === id);
      const newListBody = listBodies.find(listBody => listBody.list_id.toString() === id);

      if (!newList || !newListHeader || !newListBody) {
        throw new Error();
      }

      listsToCopy.push({
        ...newList.toObject(),
        _id: newId,
        label: `Copy of ${newList.label}`
      });

      listHeadersToCopy.push({
        ...newListHeader.toObject(),
        _id: new Types.ObjectId(),
        list_id: newId.toString()
      })

      listBodiesToCopy.push({
        ...newListBody.toObject(),
        _id: new Types.ObjectId(),
        list_id: newId.toString()
      })
    });

    const newLists = await List.insertMany(listsToCopy);

    await ListHeader.insertMany(listHeadersToCopy);
    await ListBody.insertMany(listBodiesToCopy);

    const formattedLists = await Promise.all(newLists.map(formatList));
    res.status(200).json(formattedLists);
    return;
  }
  catch (error) {
    res.status(500).json({ error: "Failed to copy list(s)." });
    return;
  }
};

export {
  getList,
  getLists,
  createList,
  updateList,
  updateLists,
  deleteLists,
  copyLists,
};
