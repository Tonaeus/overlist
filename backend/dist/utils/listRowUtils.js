import mongoose from "mongoose";
const formatRow = (row) => {
    const { _id, ...columns } = row;
    return {
        id: _id,
        ...columns
    };
};
const isValidRow = (row) => {
    if (typeof row !== 'object' || !row.hasOwnProperty('id'))
        return false;
    return Object.entries(row).every(([key, value]) => {
        if (key === 'id') {
            return typeof value === 'string' && mongoose.Types.ObjectId.isValid(value);
        }
        else {
            return typeof key === 'string' && mongoose.Types.ObjectId.isValid(key) && typeof value === 'string';
        }
    });
};
const extractRows = (listBody) => listBody.rows.map((row) => ({
    id: row._id,
    ...Object.fromEntries(Object.entries(row).filter(([key, _]) => mongoose.Types.ObjectId.isValid(key)))
}));
const processRows = (rows) => rows.map((row) => {
    const { id, ...columns } = row;
    const stringId = typeof id === 'string' ? id : String(id);
    return {
        _id: new mongoose.Types.ObjectId(stringId),
        ...columns
    };
});
export { formatRow, isValidRow, extractRows, processRows, };
//# sourceMappingURL=listRowUtils.js.map