import type {useTableComponentProps} from "../types/TableComponent"

import { useState } from "react";

import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

import {
	SelectClickTypes,
	useRowSelect,
} from "@table-library/react-table-library/select";

const useHomeTableComponent = ({ rows, tableStyles }: useTableComponentProps) => {
	const theme = useTheme([
		getTheme(),
		tableStyles,
	]);

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

	return { search, setSearch, data, theme, select };
};

export default useHomeTableComponent;
