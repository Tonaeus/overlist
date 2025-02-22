import List from "../models/listModel.js";

const getIdFromLabel = async (label: string) => {
  const list = await List.findOne({ label: label });
  return list ? list._id : null;
}

const extractColumns = (listHeader: any) =>
  listHeader.columns.map((column: any) => 
    ({ 
      id: column._id, 
      label: column.label 
    }));

export {
  getIdFromLabel,
  extractColumns
};
