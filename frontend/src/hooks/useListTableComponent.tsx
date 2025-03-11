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
		{
			...tableStyles,
			HeaderRow: `
				&.header-row {
					color: #495365;
				}
			`,
			HeaderCell: `
				&.header-cell:hover {
					background-color: #F4F5F6;
				}
				&:nth-of-type(1) {
					width: 38px;
        }
			`,
			Row: `
				&.row {
					color: #495365;
				}
				&.row:hover {
					color: #495365;
					background-color: #F4F5F6;
				}
				&.row-select-selected {
					background-color: #EFF6FF;
					font-weight: normal;
				}
			`,
			Cell: `
				&.cell {
				}
				&:nth-of-type(1) {
					width: 38px;
        }
			`,
		},
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
