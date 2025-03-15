import type { useTableComponentProps } from "../types/TableComponent";

import { useState } from "react";

import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

import {
	SelectClickTypes,
	useRowSelect,
} from "@table-library/react-table-library/select";

import { useSort } from "@table-library/react-table-library/sort";

const useHomeTableComponent = ({
	rows,
	tableStyles,
}: useTableComponentProps) => {
	const theme = useTheme([getTheme(), tableStyles]);

	const [search, setSearch] = useState<string>("");

	const data = {
		nodes: rows.filter((item: any) =>
			item.label.toLowerCase().includes(search.toLowerCase())
		),
	};

	const select = useRowSelect(
		data,
		{
			onChange: undefined,
		},
		{
			clickType: SelectClickTypes.ButtonClick,
		}
	);

	const sort = useSort(
		data,
		{
			state: {
        sortKey: "Label",
        reverse: false,
      },
			onChange: () => {},
		},
		{
			sortIcon: {
				iconDefault: null,
				iconUp: null,
				iconDown: null,
			},
			sortFns: {
				Label: (row) => row.sort((a, b) => a.label.localeCompare(b.label)),
				Directory: (row) => row.sort((a, b) => a.directory_label.localeCompare(b.directory_label)),
				Created: (row) => row.sort((a, b) => new Date(String(a.created)).getTime() - new Date(String(b.created)).getTime()),
				Modified: (row) => row.sort((a, b) => new Date(String(a.modified)).getTime() - new Date(String(b.modified)).getTime()),				
			},
		}
	);

	return { search, setSearch, data, theme, select, sort };
};

export default useHomeTableComponent;
