import React from "react";
import { CompactTable } from '@table-library/react-table-library/compact';

const ListTable = () => {
  let nodes = [
    {
      id: "0",
      name: "Shopping List",
      deadline: new Date(2020, 1, 15),
      type: "TASK",
      isComplete: true,
      nodes: 3,
    },
  ];

  let columns = [
    { label: "Task", renderCell: (item) => item.name },
    {
      label: "Deadline",
      renderCell: (item) =>
        item.deadline.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
    },
    { label: "Type", renderCell: (item) => item.type },
    {
      label: "Complete",
      renderCell: (item) => item.isComplete.toString(),
    },
    { label: "Tasks", renderCell: (item) => item.nodes },
  ];

  let data = { nodes };

  return <CompactTable columns={columns} data={data} />;
};

export default ListTable;
