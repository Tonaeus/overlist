import mongoose from "mongoose";

const extractRows = (listBody: any) =>
  listBody.rows.map((row: any) => ({
    id: row._id,
    ...Object.fromEntries(
      Object.entries(row).filter(([key, _]) => mongoose.Types.ObjectId.isValid(key))
    )
  }));


const processRows = (rows: any[]) => rows.map((row: any) => {
  const { id, ...columns } = row;
  const stringId = typeof id === 'string' ? id : String(id);
  return {
    _id: new mongoose.Types.ObjectId(stringId),
    ...columns
  };
});

const isValidRows = (rows: any[]): boolean => {
  if (!Array.isArray(rows)) return false;

  return rows.every((row) => {
    if (typeof row !== 'object' || !row.hasOwnProperty('id')) return false;

    return Object.entries(row).every(([key, value]) => {
      if (key === 'id') {
        return typeof value === 'string' && mongoose.Types.ObjectId.isValid(value);
      } else {
        return typeof key === 'string' && mongoose.Types.ObjectId.isValid(key) && typeof value === 'string';
      }
    });
  });
};

export {
  extractRows,
  processRows,
  isValidRows
}
