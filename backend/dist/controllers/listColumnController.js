import mongoose from "mongoose";
import List from "../models/listModel.js";
import ListHeader from "../models/listHeaderModel.js";
import ListBody from "../models/listBodyModel.js";
import { extractColumns } from "../utils/listColumnUtils.js";
const getListColumns = async (req, res) => {
    const { list_id } = req.params;
    if (!list_id || !mongoose.Types.ObjectId.isValid(list_id)) {
        res.status(404).json({ error: 'No such list.' });
        return;
    }
    try {
        const uid = req.user?.id;
        const listHeader = await ListHeader.findOne({ list_id: list_id, uid });
        const listColumns = extractColumns(listHeader);
        res.status(200).json(listColumns);
        return;
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch columns." });
        return;
    }
};
const createListColumn = async (req, res) => {
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
        const uid = req.user?.id;
        const existingListColumn = await ListHeader.findOne({
            list_id: list_id,
            columns: { $elemMatch: { label: { $regex: `^${column_label}$` } } },
            uid
        });
        if (existingListColumn) {
            res.status(400).json({ error: "Column label already exists." });
            return;
        }
        const listHeader = await ListHeader.findOneAndUpdate({ list_id: list_id, uid }, {
            $push: {
                columns: {
                    $each: [{ label: column_label }]
                }
            }
        }, { new: true });
        if (!listHeader) {
            throw new Error();
        }
        const listColumns = extractColumns(listHeader);
        const newColumnId = listColumns[listColumns.length - 1].id;
        const listBody = await ListBody.findOne({ list_id: list_id, uid });
        if (!listBody) {
            throw new Error();
        }
        if (listBody.rows.length > 0) {
            listBody.rows = listBody.rows.map(row => ({ ...row, [newColumnId]: '' }));
            listBody.save();
        }
        const list = await List.findById(list_id);
        if (!list) {
            throw new Error();
        }
        list.update();
        res.status(200).json(listColumns);
        return;
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create column." });
        return;
    }
};
const updateListColumn = async (req, res) => {
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
        const uid = req.user?.id;
        const existingListColumn = await ListHeader.findOne({
            list_id: list_id,
            columns: { $elemMatch: { label: { $regex: `^${column_label}$` } } },
            uid
        });
        if (existingListColumn) {
            res.status(400).json({ error: "Column label already exists." });
            return;
        }
        const listHeader = await ListHeader.findOneAndUpdate({ list_id: list_id, "columns._id": column_id, uid }, { $set: { "columns.$.label": column_label } }, { new: true });
        if (!listHeader) {
            throw new Error();
        }
        const list = await List.findById(list_id);
        if (!list) {
            throw new Error();
        }
        list.update();
        const listColumns = extractColumns(listHeader);
        res.status(200).json(listColumns);
        return;
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update column." });
        return;
    }
};
const deleteListColumn = async (req, res) => {
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
        const uid = req.user?.id;
        const listHeader = await ListHeader.findOneAndUpdate({ list_id: list_id, "columns._id": column_id, uid }, { $pull: { columns: { _id: column_id } } }, { new: true });
        if (!listHeader) {
            throw new Error();
        }
        const listColumns = extractColumns(listHeader);
        const listBody = await ListBody.findOne({ list_id: list_id, uid });
        if (!listBody) {
            throw new Error();
        }
        if (listColumns.length === 0) {
            listBody.rows = [];
            await listBody.save();
        }
        if (listBody.rows.length > 0) {
            listBody.rows = listBody.rows.map(row => ({ ...row, [column_id]: undefined }));
            await listBody.save();
        }
        const list = await List.findById(list_id);
        if (!list) {
            throw new Error();
        }
        list.update();
        res.status(200).json(listColumns);
        return;
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete column." });
        return;
    }
};
export { getListColumns, createListColumn, updateListColumn, deleteListColumn };
//# sourceMappingURL=listColumnController.js.map