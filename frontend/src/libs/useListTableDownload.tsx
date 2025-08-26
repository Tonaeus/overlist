import type { ListTableColumn, ListTableRow } from "../types/ListTable";
import sanitize from "sanitize-filename";

type CsvColumn = {
  accessor: (row: ListTableRow) => string;
  name: string;
}

const useListTableDownload = () => {
  const escapeCsvCell = (cell: string) => {
    if (cell == null) {
      return "";
    }
    const sc = cell.toString().trim();
    if (sc === "" || sc === '""') {
      return sc;
    }
    if (
      sc.includes('"') ||
      sc.includes(",") ||
      sc.includes("\n") ||
      sc.includes("\r")
    ) {
      return '"' + sc.replace(/"/g, '""') + '"';
    }
    return sc;
  };

  const makeCsvData = (columns: CsvColumn[], rows: ListTableRow[]) => {
    return rows.reduce((csvString, rowItem) => {
      return (
        csvString +
        columns
          .map(({ accessor }) => escapeCsvCell(accessor(rowItem)))
          .join(",") +
        "\r\n"
      );
    }, columns.map(({ name }) => escapeCsvCell(name)).join(",") + "\r\n");
  };

  const downloadAsCsv = (columns: CsvColumn[], rows: ListTableRow[], filename: string) => {
    const csvData = makeCsvData(columns, rows);
    const csvFile = new Blob([csvData], { type: "text/csv" });
    const downloadLink = document.createElement("a");

    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const DownloadListTable = (label: string, columns: ListTableColumn[], rows: ListTableRow[]) => {
    const filename = sanitize(label + ".csv");
    
    const csvColumns: CsvColumn[] = columns.map((column: ListTableColumn) => ({
      accessor: (item: ListTableRow) => item[column.id],
      name: column.label
    }))

    downloadAsCsv(csvColumns, rows, filename);
  };

  return { DownloadListTable };
}

export default useListTableDownload;