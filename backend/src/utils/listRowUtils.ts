import List from "../models/listModel.js";

const getIdFromLabel = async (label: string) => {
  const list = await List.findOne({ label: label });
  return list ? list._id : null;
}

const extractRows = (listBody: any) =>
  listBody.rows.map((row: any) =>
  ({
    id: row._id,
    column_id: row.column_id
  }));

export {
  getIdFromLabel,
  extractRows
}
