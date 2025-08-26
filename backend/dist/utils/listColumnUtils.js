const extractColumns = (listHeader) => listHeader.columns.map((column) => ({
    id: column._id,
    label: column.label
}));
export { extractColumns };
//# sourceMappingURL=listColumnUtils.js.map