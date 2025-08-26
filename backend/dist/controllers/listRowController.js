import mongoose from "mongoose";
import List from "../models/listModel.js";
import ListHeader from "../models/listHeaderModel.js";
import ListBody from "../models/listBodyModel.js";
import { formatRow, isValidRow, extractRows, processRows } from "../utils/listRowUtils.js";
import { extractColumns } from "../utils/listColumnUtils.js";
const getListRows = async (req, res) => {
    const { list_id } = req.params;
    if (!list_id || !mongoose.Types.ObjectId.isValid(list_id)) {
        res.status(404).json({ error: 'No such list.' });
        return;
    }
    try {
        const uid = req.user?.id;
        const listBody = await ListBody.findOne({ list_id: list_id, uid });
        const listRows = extractRows(listBody);
        res.status(200).json(listRows);
        return;
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch rows." });
        return;
    }
};
const createListRow = async (req, res) => {
    const { list_id } = req.params;
    if (!list_id || !mongoose.Types.ObjectId.isValid(list_id)) {
        res.status(404).json({ error: "No such list." });
        return;
    }
    try {
        const uid = req.user?.id;
        const listHeader = await ListHeader.findOne({ list_id: list_id, uid });
        const listColumns = extractColumns(listHeader);
        if (listColumns.length === 0) {
            throw new Error();
        }
        const newListRow = listColumns.reduce((acc, col) => {
            acc[col.id] = '';
            return acc;
        }, {});
        const listBody = await ListBody.findOneAndUpdate({ list_id: list_id, uid }, {
            $push: {
                rows: {
                    $each: [newListRow],
                }
            }
        }, { new: true });
        if (!listBody) {
            throw new Error();
        }
        const list = await List.findById(list_id);
        if (!list) {
            throw new Error();
        }
        list.update();
        const listRows = extractRows(listBody);
        res.status(200).json(formatRow(listRows[listRows.length - 1]));
        return;
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create row." });
        return;
    }
};
const updateListRows = async (req, res) => {
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
        const uid = req.user?.id;
        const listBody = await ListBody.findOne({ list_id: list_id, uid });
        if (!listBody) {
            throw new Error();
        }
        listBody.rows = processRows(rows);
        await listBody.save();
        const list = await List.findById(list_id);
        if (!list) {
            throw new Error();
        }
        list.update();
        res.status(200).json({});
        return;
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update row(s)." });
        return;
    }
};
const deleteListRows = async (req, res) => {
    const { list_id } = req.params;
    if (!list_id || !mongoose.Types.ObjectId.isValid(list_id)) {
        res.status(404).json({ error: "No such list." });
        return;
    }
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.some((id) => !mongoose.Types.ObjectId.isValid(id))) {
        res.status(404).json({ error: "No such row(s)." });
        return;
    }
    try {
        const uid = req.user?.id;
        const listBody = await ListBody.findOne({ list_id: list_id, uid });
        if (!listBody) {
            throw new Error();
        }
        const { rows } = listBody;
        if (!ids.every(id => rows.some(row => row._id?.toString() === id))) {
            res.status(404).json({ error: "No such row(s)." });
            return;
        }
        listBody.rows = rows.filter(row => !ids.includes(row._id?.toString()));
        await listBody.save();
        const list = await List.findById(list_id);
        if (!list) {
            throw new Error();
        }
        list.update();
        res.status(200).json({});
        return;
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete row(s)." });
        return;
    }
};
const copyListRows = async (req, res) => {
    const { list_id } = req.params;
    if (!list_id || !mongoose.Types.ObjectId.isValid(list_id)) {
        res.status(404).json({ error: "No such list." });
        return;
    }
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.some((id) => !mongoose.Types.ObjectId.isValid(id))) {
        res.status(404).json({ error: "No such row(s)." });
        return;
    }
    try {
        const uid = req.user?.id;
        const listBody = await ListBody.findOne({ list_id: list_id, uid });
        if (!listBody) {
            throw new Error();
        }
        const { rows } = listBody;
        if (!ids.every(id => rows.some(row => row._id?.toString() === id))) {
            res.status(404).json({ error: "No such row(s)." });
            return;
        }
        const rowsToCopy = rows.filter(row => ids.includes(row._id?.toString()));
        const copiedRows = rowsToCopy.map((row) => ({
            ...row.toObject(),
            _id: new mongoose.Types.ObjectId()
        }));
        listBody.rows = [...listBody.rows, ...copiedRows];
        await listBody.save();
        const list = await List.findById(list_id);
        if (!list) {
            throw new Error();
        }
        list.update();
        res.status(200).json(copiedRows.map(formatRow));
        return;
    }
    catch (error) {
        res.status(500).json({ error: "Failed to copy row(s)." });
        return;
    }
};
const resetListRows = async (req, res) => {
    const { list_id } = req.params;
    if (!list_id || !mongoose.Types.ObjectId.isValid(list_id)) {
        res.status(404).json({ error: "No such list." });
        return;
    }
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.some((id) => !mongoose.Types.ObjectId.isValid(id))) {
        res.status(404).json({ error: "No such row(s)." });
        return;
    }
    try {
        const uid = req.user?.id;
        const listBody = await ListBody.findOne({ list_id: list_id, uid });
        if (!listBody) {
            throw new Error();
        }
        const { rows } = listBody;
        if (!ids.every(id => rows.some(row => row._id?.toString() === id))) {
            res.status(404).json({ error: "No such row(s)." });
            return;
        }
        listBody.rows = rows.map((row) => ids.includes(row._id?.toString())
            ? Object.fromEntries(Object.entries(row).map(([key, value]) => [key, key === '_id' ? value : '']))
            : row);
        await listBody.save();
        const list = await List.findById(list_id);
        if (!list) {
            throw new Error();
        }
        list.update();
        res.status(200).json({});
        return;
    }
    catch (error) {
        res.status(500).json({ error: "Failed to reset row(s)." });
        return;
    }
};
export { getListRows, createListRow, updateListRows, deleteListRows, copyListRows, resetListRows };
//# sourceMappingURL=listRowController.js.map