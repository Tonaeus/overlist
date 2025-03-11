import { useTableComponentProps } from "../types/TableComponent";

import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

import {
	SelectClickTypes,
	useRowSelect,
} from "@table-library/react-table-library/select";

const useListTableComponent = ({ rows, tableStyles }: useTableComponentProps) => {
	const theme = useTheme([
		getTheme(),
		tableStyles,
	]);

	const data = {
		nodes: rows
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

	return { data, theme, select };
};

export default useListTableComponent;
