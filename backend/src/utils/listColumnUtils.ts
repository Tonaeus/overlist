const extractColumns = (listHeader: any) =>
  listHeader.columns.map((column: any) => 
    ({ 
      id: column._id, 
      label: column.label 
    }));

export {
  extractColumns
};
