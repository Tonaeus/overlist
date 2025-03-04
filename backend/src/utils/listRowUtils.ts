const extractRows = (listBody: any) =>
  listBody.rows.map((row: any) =>
  ({
    id: row._id,
    column_id: row.column_id
  }));

export {
  extractRows
}
